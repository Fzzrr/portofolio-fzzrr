import Link from "next/link";
import { Mail } from "lucide-react";
import { site } from "@/content/site";
import SocialIcon from "./SocialIcon";
import Reveal from "./Reveal";

export default function Contact({ showMore = true }: { showMore?: boolean }) {
  const { contact, socials } = site;

  return (
    <section
      id="contact"
      className="scroll-mt-24 border-t border-neutral-800 py-24"
    >
      <Reveal className="flex flex-col items-center text-center">
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
          {contact.heading}
        </h2>
        <p className="mt-4 max-w-md text-neutral-400">{contact.text}</p>

        <a
          href={`mailto:${contact.email}`}
          className="group mt-8 flex items-center gap-2 rounded-full bg-white px-8 py-4 font-bold text-black transition-all hover:bg-neutral-200 hover:shadow-lg hover:shadow-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950"
        >
          <Mail
            size={20}
            className="transition-transform duration-300 group-hover:-translate-y-0.5"
          />{" "}
          Send me an email
        </a>

        <div className="mt-8 flex items-center gap-2">
          {socials
            .filter((s) => s.href)
            .map((s) => (
              <a
                key={s.type}
                href={s.href}
                target={s.type === "email" ? undefined : "_blank"}
                rel="noopener noreferrer"
                aria-label={s.label}
                className="rounded-full border border-neutral-800 p-3 text-neutral-400 transition-all hover:-translate-y-0.5 hover:border-neutral-600 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400"
              >
                <SocialIcon type={s.type} size={20} />
              </a>
            ))}
        </div>

        {showMore && (
          <Link
            href="/contact"
            className="mt-8 inline-flex items-center gap-2 rounded-full border border-neutral-700 px-5 py-2 text-sm font-medium text-neutral-200 transition-colors hover:bg-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400"
          >
            Selengkapnya
          </Link>
        )}
      </Reveal>
    </section>
  );
}
