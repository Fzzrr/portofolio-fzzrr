import { MapPin, GraduationCap, Target, Mail, type LucideIcon } from "lucide-react";
import { site } from "@/content/site";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

// Ikon per fakta, dipetakan dari label (case-insensitive).
const factIcons: Record<string, LucideIcon> = {
  location: MapPin,
  education: GraduationCap,
  focus: Target,
  email: Mail,
};

export default function About() {
  const { about } = site;

  return (
    <section id="about" className="scroll-mt-24 py-20">
      <Reveal>
        <SectionHeading eyebrow="Who I am" title={about.heading} />
      </Reveal>

      <Reveal delay={75} className="grid gap-10 md:grid-cols-5">
        <div className="space-y-4 md:col-span-3">
          {about.paragraphs.map((p, i) => (
            <p key={i} className="text-lg leading-relaxed text-neutral-300">
              {p}
            </p>
          ))}
        </div>

        <dl className="flex h-fit flex-col gap-2.5 md:col-span-2 md:-mt-14 md:self-center">
          {about.facts.map((f) => {
            const Icon = factIcons[f.label.toLowerCase()] ?? Target;
            const isEmail = f.label.toLowerCase() === "email";

            return (
              <div
                key={f.label}
                className="group relative flex items-center gap-4 overflow-hidden rounded-xl border border-neutral-800/70 bg-neutral-900/30 px-4 py-3.5 transition-all duration-300 hover:border-neutral-700 hover:bg-neutral-900/60"
              >
                {/* Accent bar yang tumbuh di sisi kiri saat hover */}
                <span className="pointer-events-none absolute left-0 top-1/2 h-0 w-0.5 -translate-y-1/2 rounded-full bg-white transition-all duration-300 group-hover:h-7" />

                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-neutral-800/70 text-neutral-400 ring-1 ring-white/5 transition-all duration-300 group-hover:text-white group-hover:ring-white/15">
                  <Icon size={18} strokeWidth={2} aria-hidden />
                </span>

                <div className="min-w-0">
                  <dt className="text-[10px] font-medium uppercase tracking-[0.2em] text-neutral-500">
                    {f.label}
                  </dt>
                  <dd className="mt-0.5 text-sm font-medium leading-snug text-neutral-200">
                    {isEmail ? (
                      <a
                        href={`mailto:${f.value}`}
                        className="break-all underline-offset-4 transition-colors hover:text-white hover:underline focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400"
                      >
                        {f.value}
                      </a>
                    ) : (
                      f.value
                    )}
                  </dd>
                </div>
              </div>
            );
          })}
        </dl>
      </Reveal>
    </section>
  );
}