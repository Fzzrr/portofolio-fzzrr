import { ArrowUpRight, FileDown } from "lucide-react";
import { FaLinkedin } from "react-icons/fa6";
import { site } from "@/content/site";
import SocialIcon from "./SocialIcon";
import HeroAvatar from "./HeroAvatar";
import TypingGreeting from "./TypingGreeting";

export default function Hero() {
  const { hero, socials } = site;

  return (
    <section className="relative pt-36 pb-20 md:pt-44">
      {/* soft glow backdrop */}
      <div
        aria-hidden
        className="animate-blob pointer-events-none absolute -top-32 left-1/2 h-96 w-[42rem] -translate-x-1/2 rounded-full bg-neutral-500/15 blur-[120px]"
      />

      <div className="relative flex flex-col-reverse items-start gap-12 md:flex-row md:items-center md:justify-between">
        <div className="flex-1">
          {hero.available && (
            <span className="fade-up mb-6 inline-flex items-center gap-2 rounded-full border border-neutral-700 bg-neutral-800/60 px-3 py-1 text-sm font-medium text-neutral-200">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-neutral-300 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-neutral-300" />
              </span>
              {hero.availabilityText}
            </span>
          )}

          <h1 className="fade-up fade-up-2">
            <span className="mb-2 block text-2xl font-medium tracking-tight text-neutral-400 md:text-3xl">
              <TypingGreeting />
              <span className="text-neutral-500">, I&apos;m</span>
            </span>
            <span className="block text-5xl font-bold leading-[1.05] tracking-tighter md:text-7xl">
              <span className="text-shimmer bg-clip-text text-transparent">
                {hero.headline}
              </span>
            </span>
          </h1>

          <p className="fade-up fade-up-3 mt-6 max-w-2xl text-lg leading-relaxed text-neutral-400">
            {hero.tagline}
          </p>

          <div className="fade-up fade-up-4 mt-10 flex flex-wrap items-center gap-4">
            <a
              href={hero.linkedinUrl || "#"}
              target={hero.linkedinUrl ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="group flex items-center gap-2 rounded-full bg-white px-6 py-3 font-medium text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-neutral-200 hover:shadow-[0_10px_30px_-10px_rgba(255,255,255,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950"
            >
              <FaLinkedin size={18} />
              LinkedIn
              <ArrowUpRight
                size={18}
                className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>

            <a
              href={hero.resumeUrl || "#"}
              target={hero.resumeUrl ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full border border-neutral-700 px-6 py-3 font-medium text-neutral-200 transition-colors hover:border-neutral-500 hover:bg-neutral-800"
            >
              <FileDown size={18} /> Curriculum Vitae (CV)
            </a>

            <div className="flex items-center gap-1 pl-2">
              {socials
                .filter((s) => s.href && s.type !== "email")
                .map((s) => (
                  <a
                    key={s.type}
                    href={s.href}
                    target={s.type === "email" ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="rounded-full p-2 text-neutral-400 transition-all hover:-translate-y-0.5 hover:bg-neutral-800 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400"
                  >
                    <SocialIcon type={s.type} size={22} />
                  </a>
                ))}
            </div>
          </div>
        </div>

        {hero.avatar && <HeroAvatar src={hero.avatar} alt={site.name} />}
      </div>
    </section>
  );
}
