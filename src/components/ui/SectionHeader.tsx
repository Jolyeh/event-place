"use client";

import { motion } from "motion/react";

interface SectionHeaderProps {
  title: string;
  titleAccent?: string;
  description?: string;
  centered?: boolean;
}

export default function SectionHeader({
  title,
  titleAccent,
  description,
  centered = false,
}: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`${centered ? "text-center" : ""} mb-12 lg:mb-16`}
    >
      <h2 className="font-display font-bold text-base-content leading-[0.95]"
        style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
        {title}
        {titleAccent && (
          <>
            <br />
            <span className="font-light italic text-primary">{titleAccent}</span>
          </>
        )}
      </h2>
      {description && (
        <p className={`text-base-content/45 text-sm lg:text-base leading-relaxed mt-4 ${centered ? "max-w-xl mx-auto" : "max-w-xl"}`}>
          {description}
        </p>
      )}
    </motion.div>
  );
}
