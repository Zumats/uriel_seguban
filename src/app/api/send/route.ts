import { EmailTemplate } from "@/components/email-template";
import { config } from "@/data/config";
import { Resend } from "resend";
import { z } from "zod";
import { getContactsDb } from "@/lib/sqlite";

export const runtime = "nodejs";

const ContactSchema = z.object({
  fullName: z.string().min(2, "Full name is invalid!"),
  email: z.string().email({ message: "Email is invalid!" }),
  message: z.string().min(10, "Message is too short!"),
});

function getResend() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("Missing RESEND_API_KEY - email will not be sent, only saved to database");
    return null;
  }
  return new Resend(apiKey);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("Contact form submission:", body);

    const {
      success: zodSuccess,
      data: zodData,
      error: zodError,
    } = ContactSchema.safeParse(body);

    if (!zodSuccess) {
      return Response.json({ error: zodError?.message }, { status: 400 });
    }

    // 1. Save to SQLite database (when sqlite module is available)
    let savedToDatabase = false;
    let rowId: number | string | null = null;
    try {
      const db = getContactsDb();
      const stmt = db.prepare(
        "INSERT INTO contacts (fullName, email, message) VALUES (?, ?, ?)"
      );
      const result = stmt.run(zodData.fullName, zodData.email, zodData.message);
      rowId = result.lastInsertRowid ?? null;
      savedToDatabase = true;
      console.log("Contact saved to database:", result);
    } catch (dbError) {
      console.warn("SQLite unavailable, skipping DB save:", dbError);
    }

    // 2. Try to send email (if API key exists)
    let emailSent = false;
    let emailError = null;
    const resend = getResend();
    
    if (resend) {
      try {
        const { data: resendData, error: resendError } = await resend.emails.send({
          from: "Portfolio <onboarding@resend.dev>",
          to: [config.email],
          subject: "Contact me from portfolio",
          react: EmailTemplate({
            fullName: zodData.fullName,
            email: zodData.email,
            message: zodData.message,
          }),
        });

        if (resendError) {
          console.error("Resend Error:", resendError);
          emailError = resendError.message;
        } else {
          emailSent = true;
          console.log("Email sent successfully:", resendData);
        }
      } catch (emailErr: any) {
        console.error("Email sending failed:", emailErr);
        emailError = emailErr.message;
      }
    }

    return Response.json({
      success: true,
      id: rowId,
      message: emailSent 
        ? "Message saved and email sent successfully!" 
        : (savedToDatabase ? "Message saved to database!" : "Message received!")
            + (emailError ? ` (Email failed: ${emailError})` : ""),
      emailSent,
      savedToDatabase,
    });
  } catch (error: any) {
    console.error("API Error:", error);
    return Response.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
