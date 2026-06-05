"use client";

import { useEffect, useState } from "react";

// Greetings cycled by the typewriter, in a few languages.
const GREETINGS = [
  "Hi",
  "Halo",
  "Hola",
  "Bonjour",
  "Ciao",
  "Hallo",
  "Olá",
  "你好",
  "こんにちは",
  "안녕하세요",
];

// Typewriter that types/deletes greetings across languages, with a blinking caret.
export default function TypingGreeting() {
  const [display, setDisplay] = useState(GREETINGS[0]);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduced) return; // keep the static first greeting

    let word = 0;
    let char = GREETINGS[0].length;
    let deleting = true; // start by deleting the initial word
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      const current = GREETINGS[word];

      if (deleting) {
        char -= 1;
        setDisplay(current.slice(0, char));
        if (char === 0) {
          deleting = false;
          word = (word + 1) % GREETINGS.length;
          timer = setTimeout(tick, 320);
          return;
        }
        timer = setTimeout(tick, 55);
      } else {
        char += 1;
        setDisplay(current.slice(0, char));
        if (char === current.length) {
          deleting = true;
          timer = setTimeout(tick, 1500); // hold the full word
          return;
        }
        timer = setTimeout(tick, 110);
      }
    };

    timer = setTimeout(tick, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <span>
      {display}
      <span
        aria-hidden
        className="animate-caret ml-[3px] inline-block h-[0.75em] w-[3px] -translate-y-[0.02em] rounded-full bg-neutral-500 align-middle"
      />
    </span>
  );
}
