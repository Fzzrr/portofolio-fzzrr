"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { site, type Project } from "@/content/site";
import SectionHeading from "./SectionHeading";
import MoreLink from "./MoreLink";
import Reveal from "./Reveal";

function ProjectCard({
  project,
  featured = project.featured,
}: {
  project: Project;
  /** Override the wide "featured" layout (e.g. off on the full listing page). */
  featured?: boolean;
}) {
  const { title, category, description, tags, image, liveUrl, repoUrl } = project;

  // Move the spotlight gradient to follow the cursor inside the card.
  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--x", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--y", `${e.clientY - rect.top}px`);
  };

  return (
    <article
      onMouseMove={onMove}
      className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900/40 transition-all duration-300 hover:-translate-y-1 hover:border-neutral-700 hover:bg-neutral-900 hover:shadow-2xl hover:shadow-white/5 ${
        featured ? "md:col-span-2 md:flex-row" : ""
      }`}
    >
      {/* Cursor-following spotlight */}
      <div
        aria-hidden
        className="card-spotlight pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />

      {/* Thumbnail (or gradient placeholder) */}
      <div
        className={`relative overflow-hidden bg-neutral-950 ${
          featured ? "md:w-1/2" : ""
        }`}
      >
        <div className={`relative ${featured ? "h-56 md:h-full" : "h-44"}`}>
          {image ? (
            <Image
              src={image}
              alt={title}
              fill
              sizes={featured ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 100vw, 33vw"}
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-neutral-800 via-neutral-900 to-neutral-950">
              <span className="text-4xl font-bold text-neutral-700 transition-transform duration-500 group-hover:scale-110">
                {title.charAt(0)}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Body */}
      <div className={`relative z-20 flex flex-1 flex-col p-6 ${featured ? "md:p-8" : ""}`}>
        <div className="mb-3 flex items-start justify-between gap-3">
          <h3 className="text-xl font-bold">{title}</h3>
          <span className="shrink-0 rounded-full bg-neutral-800 px-2.5 py-1 text-xs font-medium text-neutral-300">
            {category}
          </span>
        </div>

        <p className="mb-6 text-sm leading-relaxed text-neutral-400">
          {description}
        </p>

        <div className="mt-auto flex flex-wrap items-center gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded bg-neutral-800 px-2 py-1 text-xs text-neutral-400 transition-colors group-hover:bg-neutral-800/80"
            >
              {tag}
            </span>
          ))}
        </div>

        {(liveUrl || repoUrl) && (
          <div className="mt-5 flex items-center gap-4 border-t border-neutral-800 pt-4">
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-sm font-medium text-neutral-200 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900 rounded"
              >
                Live demo <ArrowUpRight size={15} />
              </a>
            )}
            {repoUrl && (
              <a
                href={repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-sm font-medium text-neutral-400 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900 rounded"
              >
                <FaGithub size={15} /> Code
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
}

export default function Projects({ showMore = true }: { showMore?: boolean }) {
  // Home page shows a preview of 3; the full /projects page shows everything.
  const projects = showMore ? site.projects.slice(0, 3) : site.projects;

  return (
    <section id="projects" className="scroll-mt-24 py-20">
      <Reveal>
        <SectionHeading
          eyebrow="Selected work"
          title="Featured projects"
          subtitle="A few things I've built. More on my GitHub."
          action={
            showMore && site.projects.length > 3 ? (
              <MoreLink href="/projects" />
            ) : undefined
          }
        />
      </Reveal>
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project, i) => {
          // Only highlight the featured card on the home preview, so the
          // full /projects listing stays a uniform grid.
          const featured = showMore && project.featured;
          return (
            <Reveal
              key={`${project.title}-${i}`}
              delay={((i % 3) * 75) as 0 | 75 | 150}
              className={`h-full ${featured ? "md:col-span-2" : ""}`}
            >
              <ProjectCard project={project} featured={featured} />
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
