"use client";

import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import {
  Briefcase,
  GraduationCap,
  FolderGit2,
  Globe,
  ChevronDown,
  ZoomIn,
  X,
  type LucideIcon,
} from "lucide-react";
import { useLenis } from "lenis/react";
import type { Experience as ExperienceEntry } from "@/content/site";

const iconFor: Record<ExperienceEntry["kind"], LucideIcon> = {
  work: Briefcase,
  education: GraduationCap,
  project: FolderGit2,
  other: Globe,
};

interface ExperienceItemProps {
  item: ExperienceEntry;
  /** When true (full /experience page), entries with details/photos expand on click. */
  expandable?: boolean;
}

export default function ExperienceItem({
  item,
  expandable = false,
}: ExperienceItemProps) {
  const [open, setOpen] = useState(false);
  const [activePhoto, setActivePhoto] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const lenis = useLenis();
  const Icon = iconFor[item.kind];

  const hasDetails =
    (item.details?.length ?? 0) > 0 || (item.gallery?.length ?? 0) > 0;
  const interactive = expandable && hasDetails;

  const closePhoto = useCallback(() => {
    setVisible(false);
    window.setTimeout(() => setActivePhoto(null), 300);
  }, []);

  // Fade/zoom the lightbox in once it has mounted.
  useEffect(() => {
    if (!activePhoto) return;
    const id = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(id);
  }, [activePhoto]);

  // While the lightbox is open: lock page scroll and close on Escape.
  useEffect(() => {
    if (!activePhoto) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closePhoto();
    };
    document.addEventListener("keydown", onKey);
    lenis?.stop();
    return () => {
      document.removeEventListener("keydown", onKey);
      lenis?.start();
    };
  }, [activePhoto, lenis, closePhoto]);

  // Logo node + role/org/period/description/tags — identical to the home look.
  const header = (
    <>
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
        <p className="text-sm font-medium text-neutral-300">{item.org}</p>
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

      {interactive && (
        <ChevronDown
          size={18}
          aria-hidden
          className={`mt-1 shrink-0 text-neutral-500 transition-transform duration-300 group-hover:text-neutral-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      )}
    </>
  );

  return (
    <>
      <li className="group relative flex flex-col rounded-2xl p-4 transition-all duration-300 hover:-translate-y-0.5 hover:bg-neutral-900/50 hover:shadow-[0_8px_30px_-12px_rgba(0,0,0,0.7)]">
        {interactive ? (
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            className="flex gap-4 text-left focus-visible:outline-none"
          >
            {header}
          </button>
        ) : (
          <div className="flex gap-4">{header}</div>
        )}

        {/* Expandable detail + proof photos (full page only) */}
        {interactive && (
          <div
            className={`grid transition-all duration-300 ease-out ${
              open
                ? "mt-4 grid-rows-[1fr] opacity-100"
                : "grid-rows-[0fr] opacity-0"
            }`}
          >
            <div className="overflow-hidden">
              <div className="border-t border-neutral-800/80 pt-4 sm:pl-[60px]">
                {item.details && item.details.length > 0 && (
                  <ul className="space-y-2">
                    {item.details.map((point, idx) => (
                      <li
                        key={idx}
                        className="relative pl-5 text-sm leading-relaxed text-neutral-400 before:absolute before:left-0 before:top-2 before:h-1.5 before:w-1.5 before:rounded-full before:bg-neutral-600"
                      >
                        {point}
                      </li>
                    ))}
                  </ul>
                )}

                {item.gallery && item.gallery.length > 0 && (
                  <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {item.gallery.map((src) => (
                      <button
                        key={src}
                        type="button"
                        onClick={() => setActivePhoto(src)}
                        className="group/photo relative aspect-[4/3] overflow-hidden rounded-lg bg-neutral-900 ring-1 ring-neutral-800 transition-all duration-300 hover:ring-neutral-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400"
                      >
                        <Image
                          src={src}
                          alt={`${item.org} — ${item.role}`}
                          fill
                          sizes="(max-width: 640px) 50vw, 33vw"
                          className="object-contain p-1 transition-transform duration-500 group-hover/photo:scale-105"
                        />
                        <span className="pointer-events-none absolute inset-0 grid place-items-center bg-neutral-950/0 transition-colors duration-300 group-hover/photo:bg-neutral-950/40">
                          <ZoomIn
                            size={20}
                            className="scale-90 text-white opacity-0 transition-all duration-300 group-hover/photo:scale-100 group-hover/photo:opacity-100"
                          />
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </li>

      {/* Lightbox — portalled to the body so timeline transforms don't clip it */}
      {activePhoto &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            onClick={closePhoto}
            className={`fixed inset-0 z-[80] flex items-center justify-center bg-neutral-950/85 p-4 backdrop-blur-sm transition-opacity duration-300 sm:p-8 ${
              visible ? "opacity-100" : "opacity-0"
            }`}
          >
            <button
              type="button"
              onClick={closePhoto}
              aria-label="Close image"
              className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full border border-neutral-700 bg-neutral-900/80 text-neutral-200 backdrop-blur-md transition-colors hover:border-neutral-500 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400"
            >
              <X size={18} />
            </button>

            <div
              onClick={(e) => e.stopPropagation()}
              className={`relative transition-all duration-300 ease-out ${
                visible ? "scale-100 opacity-100" : "scale-95 opacity-0"
              }`}
            >
              <Image
                src={activePhoto}
                alt={`${item.org} — ${item.role}`}
                width={1400}
                height={1000}
                sizes="90vw"
                className="h-auto max-h-[85vh] w-auto max-w-[90vw] rounded-xl object-contain shadow-2xl ring-1 ring-white/10"
              />
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
