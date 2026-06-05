import { Mail, ArrowUpRight } from "lucide-react";
import { site, type Social } from "@/content/site";
import SectionHeading from "./SectionHeading";
import SocialIcon from "./SocialIcon";
import Reveal from "./Reveal";

// A readable handle from a social URL, e.g. "github.com/Fzzrr".
const handleFor = (s: Social) =>
  s.type === "email"
    ? s.href.replace(/^mailto:/, "")
    : s.href.replace(/^https?:\/\//, "").replace(/\/$/, "");

export default function Contact() {
  const { contact, socials } = site;
  // Email has its own dedicated card, so keep it out of the social rows.
  const links = socials.filter((s) => s.href && s.type !== "email");
  // Opens Gmail's web compose pre-filled — reliable even without a mail app.
  const composeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
    contact.email,
  )}`;

  return (
    <section
      id="contact"
      className="scroll-mt-24 border-t border-neutral-800 py-24"
    >
      <Reveal>
        <SectionHeading
          eyebrow="Get in touch"
          title={contact.heading}
          subtitle={contact.text}
        />
      </Reveal>

      <Reveal>
        <div className="grid gap-4 md:grid-cols-2">
          {/* Primary email call-to-action */}
          <a
            href={composeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-neutral-800 bg-gradient-to-br from-neutral-900 to-neutral-950 p-8 transition-all hover:border-neutral-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950"
          >
            {/* Soft glow that brightens on hover */}
            <span
              aria-hidden
              className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/5 blur-3xl transition-opacity duration-500 group-hover:opacity-80"
            />
            <div className="relative">
              <span className="inline-grid h-12 w-12 place-items-center rounded-2xl border border-neutral-800 bg-neutral-950 text-white">
                <Mail size={22} aria-hidden />
              </span>
              <p className="mt-6 text-xs font-medium uppercase tracking-widest text-neutral-500">
                Email
              </p>
              <p className="mt-1 break-all font-mono text-lg text-neutral-100">
                {contact.email}
              </p>
            </div>
            <span className="relative mt-10 inline-flex items-center gap-2 text-sm font-semibold text-white">
              Send me a message
              <ArrowUpRight
                size={16}
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </span>
          </a>

          {/* Social links */}
          <div className="flex flex-col gap-3">
            {links.map((s) => (
              <a
                key={s.type}
                href={s.href}
                target={s.type === "email" ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="group flex flex-1 items-center gap-4 rounded-2xl border border-neutral-800 bg-neutral-900/40 p-4 transition-all hover:border-neutral-600 hover:bg-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-neutral-800 bg-neutral-950 text-neutral-300 transition-colors group-hover:border-neutral-600 group-hover:text-white">
                  <SocialIcon type={s.type} size={20} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-neutral-200">
                    {s.label}
                  </p>
                  <p className="truncate text-xs text-neutral-500">
                    {handleFor(s)}
                  </p>
                </div>
                <ArrowUpRight
                  size={16}
                  className="shrink-0 text-neutral-600 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white"
                />
              </a>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
