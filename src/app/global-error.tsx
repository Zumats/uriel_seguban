"use client";

type GlobalErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  return (
    <html lang="en">
      <body>
        <main className="flex min-h-screen items-center justify-center bg-black px-6 text-white">
          <div className="max-w-md space-y-4 text-center">
            <h2 className="text-2xl font-semibold">Critical app error</h2>
            <p className="text-sm text-zinc-300">
              {error?.message || "A fatal error occurred while rendering the app."}
            </p>
            <button
              type="button"
              onClick={reset}
              className="rounded-md bg-white px-4 py-2 text-sm font-medium text-black"
            >
              Reload app
            </button>
          </div>
        </main>
      </body>
    </html>
  );
}
