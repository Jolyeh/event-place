"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "motion/react";

const stats = [
  { value: 12000, display: "12K+", label: "Événements actifs" },
  { value: 340, display: "340", label: "Villes couvertes" },
  { value: 850, display: "850K+", label: "Participants" },
  { value: 98, display: "98%", label: "Satisfaction" },
];

function AnimatedNumber({ display, value }: { display: string; value: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [shown, setShown] = useState("0");

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const end = value;
    const duration = 1600;
    const step = Math.ceil(end / 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setShown(display);
        clearInterval(timer);
      } else {
        const n = start >= 1000 ? (start / 1000).toFixed(0) + "K" : String(start);
        setShown(n + (display.endsWith("+") ? "+" : display.endsWith("%") ? "%" : ""));
      }
    }, duration / 60);
    return () => clearInterval(timer);
  }, [inView, value, display]);

  return <span ref={ref}>{shown || "0"}</span>;
}

export default function StatsBar() {
  return (
    <section className=" border-y border-primary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.09, duration: 0.5 }}
              className={`flex flex-col items-center text-center py-8 px-4 gap-1 ${
                i < stats.length - 1 ? "border-r border-primary/8" : ""
              } ${i === 2 ? "sm:border-r-0 lg:border-r" : ""} ${i >= 3 ? " lg:flex" : ""}`}
            >
              <div className="font-display text-3xl font-bold text-primary">
                <AnimatedNumber display={s.display} value={s.value} />
              </div>
              <div className="text-[10px] uppercase tracking-[0.18em] text-base-content/25 mt-0.5">
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
