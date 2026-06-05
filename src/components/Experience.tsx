import Image from "next/image";
import {
  Briefcase,
  GraduationCap,
  FolderGit2,
  Globe,
  type LucideIcon,
} from "lucide-react";
import { site, type Experience as ExperienceEntry } from "@/content/site";
import SectionHeading from "./SectionHeading";
import MoreLink from "./MoreLink";
import Reveal from "./Reveal";

// An entry counts as ongoing when its period mentions "Present" (or similar).
const isOngoing = (period: string) =>
  /present|sekarang|now|current|ongoing/i.test(period);

const iconFor: Record<ExperienceEntry["kind"], LucideIcon> = {
  work: Briefcase,
  education: GraduationCap,
  project: FolderGit2,
  other: Globe,
};

export default function Experience({ showMore = true }: { showMore?: boolean }) {
  const experiences: ExperienceEntry[] = site.experience;

  // Section hides itself when there are no entries.
  if (experiences.length === 0) return null;

  // Home shows only ongoing entries; the full /experience page shows everything.
  const onHome = (items: ExperienceEntry[]) =>
    showMore ? items.filter((e) => isOngoing(e.period)) : items;

  const byKind = (kind: ExperienceEntry["kind"]) =>
    onHome(experiences.filter((e) => e.kind === kind));

  const groups = [
    { label: "Work", items: byKind("work") },
    { label: "Education", items: byKind("education") },
    { label: "Team Projects", items: byKind("project") },
    { label: "Other", items: byKind("other") },
  ].filter((group) => group.items.length > 0);

  // On home, link to the full page when finished entries are hidden.
  const hasMore = experiences.some((e) => !isOngoing(e.period));

  return (
    <section id="experience" className="scroll-mt-24 py-20">
      <Reveal>
        <SectionHeading
          eyebrow={showMore ? "What I Do Now" : "Where I've Been"}
          title="Experience"
          subtitle={
            showMore
              ? "What I'm currently focused on — the roles, studies, and projects keeping me busy right now."
              : "A complete timeline of my journey — from internships and product development to my Informatics studies at Universitas Padjadjaran."
          }
          action={
            showMore && hasMore ? <MoreLink href="/experience" /> : undefined
          }
        />
      </Reveal>

      {/* One long, centered vertical timeline — grouped by kind. */}
      <div className="mx-auto flex max-w-3xl flex-col gap-14">
        {groups.map((group) => (
          <Reveal key={group.label}>
            <h3 className="mb-5 text-sm font-medium uppercase tracking-widest text-neutral-400">
              {group.label}
            </h3>

            <ol className="relative flex flex-col gap-2">
              {/* Connecting rail running through the logo nodes */}
              <span
                aria-hidden
                className="absolute bottom-8 left-[34px] top-8 w-px bg-gradient-to-b from-transparent via-neutral-800 to-transparent"
              />

              {group.items.map((item, i) => {
                const Icon = iconFor[item.kind];
                return (
                  <li
                    key={i}
                    className="group relative flex gap-4 rounded-2xl p-4 transition-all duration-300 hover:-translate-y-0.5 hover:bg-neutral-900/50 hover:shadow-[0_8px_30px_-12px_rgba(0,0,0,0.7)]"
                  >
                    {/* Logo node sitting on the rail */}
                    <div className="relative z-10 grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-xl bg-neutral-900 text-neutral-400 ring-1 ring-neutral-800 transition-all duration-300 group-hover:scale-105 group-hover:text-white group-hover:ring-neutral-600">
                      {item.logo ? (
                        <Image
                          src={item.logo}
                          alt={item.org}
                          width={44}
                          height={44}
                          className="h-full w-full object-contain p-1.5"
                        />
                      ) : (
                        <Icon size={18} aria-hidden />
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                        <h4 className="font-semibold text-neutral-100 transition-colors group-hover:text-white">
                          {item.role}
                        </h4>
                        <span className="whitespace-nowrap text-sm text-neutral-500 transition-colors group-hover:text-neutral-400">
                          {item.period}
                        </span>
                      </div>
                      <p className="text-sm font-medium text-neutral-300">
                        {item.org}
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-neutral-400">
                        {item.description}
                      </p>
                      {item.tags && item.tags.length > 0 && (
                        <ul className="mt-3 flex flex-wrap gap-1.5">
                          {item.tags.map((tag) => (
                            <li
                              key={tag}
                              className="rounded-md bg-neutral-900/60 px-2 py-0.5 font-mono text-xs text-neutral-400 ring-1 ring-neutral-800 transition-colors group-hover:bg-neutral-800/60 group-hover:text-neutral-300"
                            >
                              {tag}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </li>
                );
              })}
            </ol>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
