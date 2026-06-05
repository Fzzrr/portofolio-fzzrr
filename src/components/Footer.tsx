import { site } from "@/content/site";
import SocialIcon from "./SocialIcon";

export default function Footer() {
  const text = site.footer.replace("{year}", String(new Date().getFullYear()));
  const socials = site.socials.filter((s) => s.href && s.type !== "email");

  return (
    <footer className="border-t border-neutral-900 py-8">
      <div className="flex flex-col items-center gap-5 sm:flex-row sm:justify-between">
        <p className="text-sm text-neutral-500">{text}</p>

        <div className="flex items-center gap-4">
          {socials.map((s) => (
            <a
              key={s.type}
              href={s.href}
              target={s.type === "email" ? undefined : "_blank"}
              rel="noopener noreferrer"
              aria-label={s.label}
              className="text-neutral-500 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400"
            >
              <SocialIcon type={s.type} size={18} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
