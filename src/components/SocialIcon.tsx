import { FaGithub, FaLinkedin, FaInstagram, FaXTwitter } from "react-icons/fa6";
import { HiOutlineMail } from "react-icons/hi";
import type { SocialType } from "@/content/site";

const map = {
  github: FaGithub,
  linkedin: FaLinkedin,
  instagram: FaInstagram,
  x: FaXTwitter,
  email: HiOutlineMail,
} as const;

export default function SocialIcon({
  type,
  size = 20,
  className,
}: {
  type: SocialType;
  size?: number;
  className?: string;
}) {
  const Icon = map[type] ?? HiOutlineMail;
  return <Icon size={size} className={className} aria-hidden="true" />;
}
