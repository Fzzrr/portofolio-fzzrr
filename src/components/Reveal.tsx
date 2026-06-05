"use client";

import { useEffect, useRef, useState } from "react";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /** Stagger entrance with a small delay (Tailwind delay utility). */
  delay?: 0 | 75 | 150 | 225 | 300;
  /** Render element tag. Defaults to a div. */
  as?: "div" | "li" | "article";
}

const delayClass: Record<NonNullable<RevealProps["delay"]>, string> = {
  0: "",
  75: "delay-75",
  150: "delay-150",
  225: "delay-200",
  300: "delay-300",
};

// Fades + slides children in once they scroll into view (IntersectionObserver).
export default function Reveal({
  children,
  className = "",
  delay = 0,
  as: Tag = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as React.Ref<never>}
      className={`transition-all duration-700 ease-out motion-reduce:transition-none ${
        visible
          ? "translate-y-0 opacity-100"
          : "translate-y-6 opacity-0 motion-reduce:translate-y-0 motion-reduce:opacity-100"
      } ${delayClass[delay]} ${className}`}
    >
      {children}
    </Tag>
  );
}
