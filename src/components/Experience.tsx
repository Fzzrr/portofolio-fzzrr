import Image from "next/image";
import {
  Briefcase,
  GraduationCap,
  FolderGit2,
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

  const columns = [
    { label: "Work", items: byKind("work") },
    { label: "Education", items: byKind("education") },
    { label: "Team Projects", items: byKind("project") },
  ].filter((col) => col.items.length > 0);

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
              ? undefined
              : "A complete timeline of my journey — from internships and product development to my Informatics studies at Universitas Padjadjaran."
          }
          action={
            showMore && hasMore ? <MoreLink href="/experience" /> : undefined
          }
        />
      </Reveal>

      {/* Home stacks the columns into one long list; the full page uses a grid. */}
      <div
        className={
          showMore
            ? "flex flex-col gap-12"
            : "grid gap-x-12 gap-y-12 md:grid-cols-2 lg:grid-cols-3"
        }
      >
        {columns.map((col) => (
          <Reveal key={col.label}>
            <h3 className="mb-6 text-sm font-medium uppercase tracking-widest text-neutral-400">
              {col.label}
            </h3>
            <ol className="flex flex-col gap-6">
              {col.items.map((item, i) => {
                const Icon = iconFor[item.kind];
                return (
                  <li key={i} className="group flex gap-4">
                    {/* Org/school logo or project thumbnail (icon placeholder until set) */}
                    <div className="grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900 text-neutral-400 transition-colors duration-300 group-hover:border-neutral-700 group-hover:text-white">
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
                        <h4 className="font-semibold text-neutral-100">
                          {item.role}
                        </h4>
                        <span className="text-sm text-neutral-500">
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
                              className="rounded-md border border-neutral-800 bg-neutral-900/60 px-2 py-0.5 font-mono text-xs text-neutral-400"
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
