import Link from "next/link";
import { ArrowRight } from "lucide-react";

// "View more" link with a sliding arrow and a left-to-right underline on hover.
export default function MoreLink({
  href,
  label = "See more",
}: {
  href: string;
  label?: string;
}) {
  return (
    <Link
      href={href}
      className="group relative inline-flex items-center gap-1.5 pb-0.5 text-sm font-medium text-neutral-300 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950"
    >
      {label}
      <ArrowRight
        size={16}
        className="transition-transform duration-200 group-hover:translate-x-1"
      />
      <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-white transition-transform duration-300 ease-out group-hover:scale-x-100" />
    </Link>
  );
}
