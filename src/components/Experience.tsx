import { site, type Experience as ExperienceEntry } from "@/content/site";
import SectionHeading from "./SectionHeading";
import MoreLink from "./MoreLink";
import ExperienceItem from "./ExperienceItem";
import Reveal from "./Reveal";

// An entry counts as ongoing when its period mentions "Present" (or similar).
const isOngoing = (period: string) =>
  /present|sekarang|now|current|ongoing/i.test(period);

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

              {group.items.map((item, i) => (
                <ExperienceItem
                  key={i}
                  item={item}
                  expandable={!showMore}
                />
              ))}
            </ol>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
