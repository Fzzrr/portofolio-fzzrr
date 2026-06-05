"use client";

import { useEffect, useState, type ComponentType } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Home, User, Wrench, FolderOpen, Briefcase, Mail, ArrowUpRight } from "lucide-react";
import { site } from "@/content/site";

// Icon shown for each section in the scrolled icon-sidebar.
const NAV_ICONS: Record<string, ComponentType<{ size?: number }>> = {
  "/about": User,
  "/skills": Wrench,
  "/projects": FolderOpen,
  "/experience": Briefcase,
  "/contact": Mail,
};

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on Escape or once the viewport grows to desktop.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  // Sections shown in the sidebar (everything except the contact CTA).
  const sidebarItems = site.nav.filter((item) => item.href !== "/contact");

  return (
    <>
      {/* Backdrop behind the open mobile menu — tap to close */}
      <button
        type="button"
        aria-hidden
        tabIndex={-1}
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-40 bg-neutral-950/50 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* â”€â”€ Top bar (hidden on desktop once scrolled) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <div
        className={`fixed top-4 z-50 flex w-full justify-center px-4 transition-all duration-300 ${
          scrolled
            ? "md:pointer-events-none md:-translate-y-20 md:opacity-0"
            : ""
        }`}
      >
        <nav
          className={`relative flex w-full max-w-5xl items-center justify-between rounded-full px-4 py-3 text-sm text-white transition-all duration-300 sm:px-6 ${
            scrolled || open
              ? "border border-neutral-800 bg-neutral-950/80 backdrop-blur-md"
              : "border border-transparent bg-transparent"
          }`}
        >
          {/* Brand */}
          <Link
            href="/"
            aria-label={`${site.username} - home`}
            className="group flex items-center gap-2"
          >
            <span className="grid h-7 w-7 place-items-center rounded-lg bg-white text-xs font-bold text-black shadow-sm transition-transform duration-300 group-hover:-rotate-6">
              {site.username.charAt(0).toUpperCase()}
            </span>
            <span className="font-mono text-sm font-semibold tracking-tight text-neutral-200 transition-colors group-hover:text-white">
              {site.username}
            </span>
          </Link>

          {/* Desktop links (center) */}
          <div className="hidden items-center gap-7 md:absolute md:left-1/2 md:flex md:-translate-x-1/2">
            {site.nav.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`group relative transition-colors hover:text-white ${
                    isActive ? "text-white" : "text-neutral-400"
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-px w-full origin-left bg-neutral-200 transition-transform duration-300 ease-out ${
                      isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </Link>
              );
            })}
          </div>

          {/* Desktop CTA */}
          <Link
            href="/#contact"
            className="group hidden items-center gap-1.5 rounded-full bg-white px-4 py-2 font-medium text-black shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_30px_-10px_rgba(255,255,255,0.6)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950 md:inline-flex"
          >
            Get in touch
            <ArrowUpRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </Link>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
            className="text-neutral-300 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 md:hidden"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>

          {/* Mobile dropdown */}
          <div
            inert={!open}
            className={`absolute inset-x-0 top-[calc(100%+0.5rem)] flex max-h-[calc(100vh-6rem)] origin-top flex-col gap-1 overflow-y-auto overscroll-contain rounded-3xl border border-neutral-800 bg-neutral-950/95 p-3 shadow-xl backdrop-blur-md transition-all duration-300 ease-out md:hidden ${
              open
                ? "translate-y-0 scale-100 opacity-100"
                : "pointer-events-none -translate-y-2 scale-95 opacity-0"
            }`}
          >
            {site.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`rounded-xl px-4 py-2.5 transition-colors hover:bg-neutral-800 hover:text-white ${
                  pathname === item.href
                    ? "bg-neutral-800 text-white"
                    : "text-neutral-300"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/#contact"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-white px-4 py-2.5 text-center font-medium text-black transition-colors hover:bg-neutral-200"
            >
              Get in touch
            </Link>
          </div>
        </nav>
      </div>

      {/* â”€â”€ Icon sidebar (desktop only, slides in once scrolled) â”€â”€â”€â”€ */}
      <div className="fixed left-0 top-1/2 z-50 hidden -translate-y-1/2 md:block">
        <aside
          className={`ml-4 flex flex-col items-center gap-3 transition-all duration-300 ${
            scrolled
              ? "translate-x-0 opacity-100"
              : "pointer-events-none -translate-x-24 opacity-0"
          }`}
        >
          <nav className="flex flex-col items-center gap-1 rounded-2xl border border-neutral-800 bg-neutral-950/80 p-1.5 shadow-xl backdrop-blur-md">
            {sidebarItems.map((item) => {
              return (
                <SidebarIcon
                  key={item.href}
                  href={item.href}
                  label={item.label}
                  Icon={NAV_ICONS[item.href] ?? Home}
                  active={pathname === item.href}
                />
              );
            })}
          </nav>

          {/* Separated contact CTA */}
          <div className="rounded-2xl border border-neutral-800 bg-neutral-950/80 p-1.5 shadow-xl backdrop-blur-md">
            <SidebarIcon
              href="/#contact"
              label="Get in touch"
              Icon={Mail}
              active={false}
              accent
            />
          </div>
        </aside>
      </div>
    </>
  );
}

// A single icon button in the sidebar, with a hover tooltip showing its label.
function SidebarIcon({
  href,
  label,
  Icon,
  active,
  accent,
}: {
  href: string;
  label: string;
  Icon: ComponentType<{ size?: number }>;
  active: boolean;
  accent?: boolean;
}) {
  return (
    <Link
      href={href}
      aria-label={label}
      className={`group relative grid h-11 w-11 place-items-center rounded-xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 ${
        accent
          ? "bg-white text-black hover:bg-neutral-200"
          : active
            ? "bg-neutral-800 text-white"
            : "text-neutral-400 hover:bg-neutral-800/70 hover:text-white"
      }`}
    >
      <Icon size={20} />
      {/* tooltip */}
      <span className="pointer-events-none absolute left-full ml-3 whitespace-nowrap rounded-md border border-neutral-800 bg-neutral-900 px-2 py-1 text-xs text-neutral-200 opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100">
        {label}
      </span>
    </Link>
  );
}
