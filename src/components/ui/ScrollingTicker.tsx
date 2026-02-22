"use client";

import { motion } from "motion/react";

const items = [
  "Concert", "Exposition", "Conférence", "Gala",
  "Festival", "Sport", "Bien-être", "Gastronomie",
  "Théâtre", "Cinéma", "Formation", "Culture",
];

export default function ScrollingTicker() {
  return (
    <div className="bg-primary py-5 overflow-hidden relative">
      <div className="flex animate-scroll-left whitespace-nowrap">
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-1 text-primary-content text-xs font-semibold uppercase tracking-widest mx-6 shrink-0"
          >
            {item}
            <span className="text-primary-content/40 ml-4">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
