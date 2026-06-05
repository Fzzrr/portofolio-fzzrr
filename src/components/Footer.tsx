import { site } from "@/content/site";

export default function Footer() {
  const text = site.footer.replace("{year}", String(new Date().getFullYear()));

  return (
    <footer className="border-t border-neutral-900 py-8">
      <p className="text-center text-sm text-neutral-500">{text}</p>
    </footer>
  );
}
