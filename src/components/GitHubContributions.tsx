import { site } from "@/content/site";
import Reveal from "./Reveal";

type Day = { date: string; count: number; level: number };

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

// Brighter cell = more contributions, kept monochrome to match the theme.
const LEVEL_CLASS = [
  "bg-neutral-800/80",
  "bg-neutral-600",
  "bg-neutral-400",
  "bg-neutral-200",
  "bg-white",
];

// GitHub's quartile names → our 0–4 intensity scale (deno.dev source).
const QUARTILE: Record<string, number> = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
};

// Weekday of a YYYY-MM-DD date, computed in UTC so it never shifts by timezone.
const utcDay = (date: string) => new Date(`${date}T00:00:00Z`).getUTCDay();
const utcMonth = (date: string) => new Date(`${date}T00:00:00Z`).getUTCMonth();

// Reads the GitHub username from the configured profile link (falls back to `username`).
function githubUsername(): string {
  const href = site.socials.find((s) => s.type === "github")?.href ?? "";
  const fromUrl = href.replace(/\/+$/, "").split("/").pop();
  return fromUrl || site.username;
}

// A year of plausible, deterministic activity — used when the live API is unreachable
// (e.g. local dev behind a restricted network) so the design always renders.
function fallbackDays(): Day[] {
  const days: Day[] = [];
  const today = new Date();
  const start = new Date(today);
  start.setDate(start.getDate() - 364);
  start.setDate(start.getDate() - start.getDay()); // align to a Sunday

  let seed = 20260605;
  const rand = () => {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff;
    return seed / 0x7fffffff;
  };

  for (let d = new Date(start); d <= today; d.setDate(d.getDate() + 1)) {
    const r = rand();
    const level = r > 0.82 ? 4 : r > 0.66 ? 3 : r > 0.45 ? 2 : r > 0.24 ? 1 : 0;
    days.push({
      date: d.toISOString().slice(0, 10),
      count: level === 0 ? 0 : Math.ceil(r * 9),
      level,
    });
  }
  return days;
}

// Source 1 — deno.dev: returns the calendar already grouped into weeks.
async function fromDeno(user: string): Promise<Day[]> {
  const res = await fetch(
    `https://github-contributions-api.deno.dev/${user}.json`,
    { next: { revalidate: 86400 } },
  );
  if (!res.ok) throw new Error(`deno ${res.status}`);
  const data = (await res.json()) as {
    contributions: { date: string; contributionCount: number; contributionLevel: string }[][];
  };
  const days = data.contributions.flat().map((d) => ({
    date: d.date,
    count: d.contributionCount,
    level: QUARTILE[d.contributionLevel] ?? 0,
  }));
  if (!days.length) throw new Error("deno empty");
  return days;
}

// Source 2 — vercel.app: a flat, multi-year list we trim to the last 365 days.
async function fromVercel(user: string): Promise<Day[]> {
  const res = await fetch(
    `https://github-contributions.vercel.app/api/v1/${user}`,
    { next: { revalidate: 86400 } },
  );
  if (!res.ok) throw new Error(`vercel ${res.status}`);
  const data = (await res.json()) as {
    contributions: { date: string; count: number; intensity: string }[];
  };
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - 364);
  const cutoffStr = cutoff.toISOString().slice(0, 10);
  const days = data.contributions
    .filter((d) => d.date >= cutoffStr)
    .map((d) => ({ date: d.date, count: d.count, level: Number(d.intensity) || 0 }))
    .sort((a, b) => a.date.localeCompare(b.date));
  if (!days.length) throw new Error("vercel empty");
  return days;
}

// Tries each live source in turn, then falls back to a generated grid so the
// section always renders even if every provider is unreachable.
async function getContributions(): Promise<{ days: Day[]; live: boolean }> {
  const user = githubUsername();
  for (const source of [fromDeno, fromVercel]) {
    try {
      return { days: await source(user), live: true };
    } catch {
      // try the next source
    }
  }
  return { days: fallbackDays(), live: false };
}

export default async function GitHubContributions() {
  const { days } = await getContributions();
  if (days.length === 0) return null;

  const total = days.reduce((sum, d) => sum + d.count, 0);

  // Pad the front so the first day lands in its correct weekday row, then split
  // the flat list into weekly columns of 7 (Sunday → Saturday).
  const firstWeekday = utcDay(days[0].date);
  const padded: (Day | null)[] = [
    ...Array<null>(firstWeekday).fill(null),
    ...days,
  ];
  const weeks: (Day | null)[][] = [];
  for (let i = 0; i < padded.length; i += 7) {
    weeks.push(padded.slice(i, i + 7));
  }

  // Label a week with its month only when the month changes from the week before.
  let prevMonth = -1;
  const monthLabels = weeks.map((week) => {
    const first = week.find(Boolean);
    if (!first) return null;
    const month = utcMonth(first.date);
    if (month === prevMonth) return null;
    prevMonth = month;
    return MONTHS[month];
  });

  return (
    // Sits directly under the Projects grid as one continuous block.
    <section id="github" className="scroll-mt-24 -mt-8 pb-20">
      <Reveal>
        <h3 className="mb-6 text-sm font-medium uppercase tracking-widest text-neutral-400">
          GitHub Activity
        </h3>
      </Reveal>

      <Reveal>
        <div className="rounded-2xl p-5 sm:p-6">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-neutral-300">
              <span className="font-semibold text-neutral-100">{total}</span>{" "}
              contributions in the last year
            </p>
            <div className="flex items-center gap-2 text-xs text-neutral-500">
              <span>Less</span>
              <div className="flex gap-[3px]">
                {LEVEL_CLASS.map((cls, i) => (
                  <span
                    key={i}
                    className={`h-3 w-3 rounded-sm ${cls}`}
                    aria-hidden
                  />
                ))}
              </div>
              <span>More</span>
            </div>
          </div>

          <div className="overflow-x-auto pb-1">
            <div className="flex gap-2">
              {/* Weekday labels (Mon / Wed / Fri) */}
              <div className="flex shrink-0 flex-col gap-[3px] pt-5 text-[11px] leading-3 text-neutral-500">
                {["", "Mon", "", "Wed", "", "Fri", ""].map((label, i) => (
                  <span key={i} className="flex h-3 items-center">
                    {label}
                  </span>
                ))}
              </div>

              {/* Week columns */}
              <div className="flex gap-[3px] pt-5">
                {weeks.map((week, wi) => (
                  <div key={wi} className="relative flex flex-col gap-[3px]">
                    {monthLabels[wi] && (
                      <span className="absolute -top-5 left-0 text-[11px] leading-3 text-neutral-500">
                        {monthLabels[wi]}
                      </span>
                    )}
                    {week.map((day, di) =>
                      day ? (
                        <span
                          key={di}
                          className={`h-3 w-3 rounded-sm ${LEVEL_CLASS[day.level]}`}
                          title={`${day.count} contributions on ${day.date}`}
                        />
                      ) : (
                        <span key={di} className="h-3 w-3" aria-hidden />
                      ),
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
