import type { ReactNode } from "react";

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  action,
  titleClassName = "text-3xl font-bold tracking-tight md:text-4xl",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  /** Optional element (e.g. a "view all" link) aligned to the right of the heading. */
  action?: ReactNode;
  /** Override the title typography (e.g. for a more compact section header). */
  titleClassName?: string;
}) {
  return (
    <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-2xl">
        {eyebrow && (
          <span className="mb-3 inline-block text-sm font-medium uppercase tracking-widest text-neutral-300">
            {eyebrow}
          </span>
        )}
        <h2 className={titleClassName}>{title}</h2>
        {subtitle && (
          <p className="mt-3 text-base leading-relaxed text-neutral-400">{subtitle}</p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
