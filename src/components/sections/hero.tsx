"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { File, Github, Linkedin } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { usePreloader } from "../preloader";
import { BlurIn, BoxReveal } from "../reveal-animations";
import ScrollDownIcon from "../scroll-down-icon";
import { SiGithub, SiLinkedin } from "react-icons/si";
import { config } from "@/data/config";
import Image from "next/image";

const HeroSection = () => {
  const { isLoading } = usePreloader();
  const authorParts = config.author.split(" ");
  const firstLine = authorParts.slice(0, 1).join(" ");
  const secondLine = authorParts.slice(1).join(" ");

  return (
    <section id="hero" className={cn("relative w-full h-screen")}>
      <div className="grid md:grid-cols-2">
        <div
          className={cn(
            "h-[calc(100dvh-3rem)] md:h-[calc(100dvh-4rem)] z-[2]",
            "col-span-1",
            "flex flex-col justify-start md:justify-center items-center md:items-start",
            "pt-36 sm:pt-0 sm:pb-32 md:p-24 lg:p-40 xl:p-48"
          )}
        >
          {!isLoading && (
            <>
              <div className="md:flex md:items-end md:gap-6">
                <div>
                  <BlurIn delay={0.7}>
                    <p
                      className={cn(
                        "md:self-start mt-2 md:mt-4 font-thin text-xs sm:text-sm text-slate-500 dark:text-zinc-400 ml-2 md:ml-3",
                        "cursor-default font-display sm:text-lg md:text-xl whitespace-nowrap bg-clip-text "
                      )}
                    >
                      Hi, I am
                      <br className="md:hidden" />
                    </p>
                  </BlurIn>
                  <BlurIn delay={1}>
                    <Tooltip delayDuration={300}>
                      <TooltipTrigger asChild>
                        <h1
                          className={cn(
                            "font-thin text-transparent text-slate-800 ml-1 text-left leading-[0.95]",
                            "cursor-default text-edge-outline font-display break-words max-w-[92vw] md:max-w-none",
                            "text-[clamp(2.8rem,15vw,6.5rem)] md:text-7xl lg:text-8xl"
                          )}
                        >
                          {firstLine}
                          {secondLine ? <br className="hidden md:block" /> : null}
                          {secondLine}
                        </h1>
                      </TooltipTrigger>
                      <TooltipContent
                        side="top"
                        className="dark:bg-white dark:text-black"
                      >
                        theres something waiting for you in devtools
                      </TooltipContent>
                    </Tooltip>
                  </BlurIn>
                  <BlurIn delay={1.2}>
                    <p
                      className={cn(
                        "md:self-start md:mt-4 font-thin text-sm text-slate-500 dark:text-zinc-400 ml-2 md:ml-3",
                        "cursor-default font-display sm:text-lg md:text-xl whitespace-nowrap bg-clip-text "
                      )}
                    >
                      Portfolio
                    </p>
                  </BlurIn>
                </div>
              </div>
              <div className="mt-8 md:ml-2 flex flex-col gap-3">
                <div className="flex items-center gap-4">
                  <BlurIn delay={1.8}>
                    <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-white/20 shadow-lg flex-shrink-0">
                      <Image
                        src="/assets/profile-circular.png"
                        alt="Uriel Seguban"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </BlurIn>
                  <Link
                    href={"/assets/resume/uriel-nobela-seguban-resume.html"}
                    target="_blank"
                    className="flex-1"
                  >
                    <BoxReveal delay={2} width="100%" >
                      <Button className="flex items-center gap-2 w-full">
                        <File size={24} />
                        <p>Resume</p>
                      </Button>
                    </BoxReveal>
                  </Link>
                </div>
                <div className="md:self-start flex gap-3">
                  <Tooltip delayDuration={300}>
                    <TooltipTrigger asChild>
                      <Link href={"#contact"}>
                        <Button
                          variant={"outline"}
                          className="block w-full overflow-hidden"
                        >
                          Hire Me
                        </Button>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent side="bottom">
                      <p>pls 🥹 🙏</p>
                    </TooltipContent>
                  </Tooltip>
                  <Link
                    href={config.social.github}
                    target="_blank"
                  >
                    <Button variant={"outline"}>
                      <SiGithub size={24} />
                    </Button>
                  </Link>
                  <Link
                    href={config.social.linkedin}
                    target="_blank"
                  >
                    <Button variant={"outline"}>
                      <SiLinkedin size={24} />
                    </Button>
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
        <div className="grid col-span-1"></div>
      </div>
      <div className="absolute bottom-10 left-[50%] translate-x-[-50%]">
        <ScrollDownIcon />
      </div>
    </section>
  );
};

export default HeroSection;
