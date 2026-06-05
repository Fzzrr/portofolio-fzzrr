import type { CSSProperties } from 'react';
import {
  FaBootstrap,
  FaCss3Alt,
  FaHtml5,
  FaJsSquare,
  FaPhp,
  FaPython,
} from 'react-icons/fa';
import {
  SiLaravel,
  SiNextdotjs,
  SiNumpy,
  SiPandas,
  SiPrisma,
  SiReact,
  SiScikitlearn,
  SiSupabase,
  SiTailwindcss,
  SiTensorflow,
  SiVercel,
} from 'react-icons/si';

const skills = [
  {
    name: 'HTML',
    icon: FaHtml5,
    iconColor: '#E34F26',
  },
  {
    name: 'CSS',
    icon: FaCss3Alt,
    iconColor: '#1572B6',
  },
  {
    name: 'JavaScript',
    icon: FaJsSquare,
    iconColor: '#F7DF1E',
  },
  {
    name: 'Next.js',
    icon: SiNextdotjs,
    iconColor: '#F5F5F5',
  },
  {
    name: 'React',
    icon: SiReact,
    iconColor: '#61DAFB',
  },
  {
    name: 'Python',
    icon: FaPython,
    iconColor: '#3776AB',
  },
  {
    name: 'TensorFlow',
    icon: SiTensorflow,
    iconColor: '#FF6F00',
  },
  {
    name: 'Scikit-learn',
    icon: SiScikitlearn,
    iconColor: '#F7931E',
  },
  {
    name: 'Pandas',
    icon: SiPandas,
    iconColor: '#150458',
  },
  {
    name: 'PHP',
    icon: FaPhp,
    iconColor: '#777BB4',
  },
  {
    name: 'Laravel',
    icon: SiLaravel,
    iconColor: '#FF2D20',
  },
  {
    name: 'Tailwind CSS',
    icon: SiTailwindcss,
    iconColor: '#06B6D4',
  },
  {
    name: 'Bootstrap',
    icon: FaBootstrap,
    iconColor: '#7952B3',
  },
  {
    name: 'NumPy',
    icon: SiNumpy,
    iconColor: '#013243',
  },
  {
    name: 'Vercel',
    icon: SiVercel,
    iconColor: '#F5F5F5',
  },
  {
    name: 'Prisma',
    icon: SiPrisma,
    iconColor: '#00D1B2',
  },
  {
    name: 'Supabase',
    icon: SiSupabase,
    iconColor: '#3ECF8E',
  },
];

type Skill = (typeof skills)[number];

// Satu baris marquee berisi chip ikon + nama; arah bisa dibalik.
function MarqueeRow({ items, reverse }: { items: Skill[]; reverse?: boolean }) {
  return (
    <div className="arsenal-marquee relative overflow-x-clip py-2">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-neutral-950 to-transparent sm:w-24" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-neutral-950 to-transparent sm:w-24" />

      <div
        className={`flex w-max items-center gap-3 arsenal-marquee-track ${
          reverse ? "arsenal-marquee-track--reverse" : ""
        }`}
      >
        {[...items, ...items].map((skill, index) => (
          <div
            key={`${skill.name}-${index}`}
            aria-hidden={index >= items.length ? "true" : undefined}
            style={{ "--brand": skill.iconColor } as CSSProperties}
            className="group flex shrink-0 items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.02] py-2 pl-2 pr-4 text-neutral-300 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/[0.05] hover:text-white hover:shadow-[0_10px_30px_-12px_var(--brand)]"
          >
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-neutral-900 ring-1 ring-white/10 transition-all duration-300 group-hover:ring-white/25">
              <skill.icon
                className="h-5 w-5 transition-transform duration-300 group-hover:scale-110"
                aria-hidden="true"
                style={{ color: skill.iconColor }}
              />
            </span>
            <span className="whitespace-nowrap text-sm font-medium">
              {skill.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function TechnicalArsenalSwiper() {
  const half = Math.ceil(skills.length / 2);

  return (
    <div className="space-y-3">
      <MarqueeRow items={skills.slice(0, half)} />
      <MarqueeRow items={skills.slice(half)} reverse />
    </div>
  );
}