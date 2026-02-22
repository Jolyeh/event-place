"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Search, SlidersHorizontal, MapPin, Calendar } from "lucide-react";
import { categories } from "@/src/lib/data";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.16, 1, 0.3, 1] as const // <--- Ajoute ça ici
    }
  },
};

export default function Hero() {

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-20">

      {/* BG layers – all tailwind */}
      <div className="absolute inset-0 bg-gradient-to-br from-base-100 via-base-100 to-secondary/30" />
      <div className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full bg-primary/6 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-accent/4 blur-3xl pointer-events-none" />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(oklch(var(--p)) 1px, transparent 1px), linear-gradient(to right, oklch(var(--p)) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Floating orbs */}
      <div className="absolute top-1/4 right-1/4 w-4 h-4 rounded-full bg-primary/40 blur-sm animate-float pointer-events-none" />
      <div className="absolute bottom-1/3 left-1/5 w-2 h-2 rounded-full bg-accent/60 blur-sm animate-float pointer-events-none" style={{ animationDelay: "1.5s" }} />
      <div className="absolute top-2/3 right-1/3 w-3 h-3 rounded-full bg-primary/30 blur-sm animate-float pointer-events-none" style={{ animationDelay: "2.5s" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-15 lg:py-15">
        <motion.div variants={container} initial="hidden" animate="show">

          {/* Badge */}
          <motion.div variants={item} className="mb-7">
            <span className="inline-flex items-center gap-2 border border-primary/25 bg-primary/8 text-primary text-[10px] font-semibold uppercase tracking-[0.22em] py-2 px-4 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Plateforme événementielle
            </span>
          </motion.div>

          {/* Headline */}
          <motion.div variants={item} className="mb-8">
            <h1 className="font-display font-bold leading-[0.9] text-base-content mb-2"
              style={{ fontSize: "clamp(3rem, 10vw, 5.5rem)" }}>
              Vivez l'instant
            </h1>
            <h1 className="font-display font-light italic leading-[0.9] text-primary"
              style={{ fontSize: "clamp(3rem, 10vw, 5.5rem)" }}>
              présent.
            </h1>
          </motion.div>

          {/* Subtext */}
          <motion.p variants={item} className="text-base-content/45 text-base lg:text-lg leading-relaxed max-w-lg mb-10">
            Des milliers d&apos;événements soigneusement sélectionnés — concerts, expositions, conférences, galas — réservez vos prochaines expériences.
          </motion.p>

          {/* Search */}
          <motion.div variants={item} className="mb-10 max-w-2xl">
            <div className="flex flex-col sm:flex-row gap-3">
              <div id="searchBtn" className="flex-1 flex items-center border border-primary/20 rounded-2xl px-4 gap-3 focus-within:border-primary/50 transition-colors duration-200 hover:border-primary/35">
                <Search size={16} className="text-primary/50 shrink-0" />
                <input
                  type="text"
                  placeholder="Rechercher un événement, un artiste..."
                  className="bg-transparent border-none outline-none text-sm py-4 flex-1 placeholder:text-base-content/25 w-full"
                />
                <div className="divider divider-horizontal m-0 hidden sm:flex h-6 self-center" />
                <div className="hidden sm:flex items-center gap-2 text-base-content/30 shrink-0">
                  <MapPin size={14} className="text-primary/40" />
                  <input
                    type="text"
                    placeholder="Ville"
                    className="bg-transparent border-none outline-none text-sm w-20 placeholder:text-base-content/25"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <button className="btn btn-primary btn-lg py-7 rounded-2xl gap-2 text-xs uppercase tracking-widest font-semibold flex-1 sm:flex-none px-8 shadow-lg shadow-primary/30">
                  <Search size={15} />
                  Rechercher
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
      >
        <span className="text-[9px] uppercase tracking-[0.25em] text-base-content/15">Défiler</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-10 bg-gradient-to-b from-primary/40 to-transparent"
        />
      </motion.div>
    </section>
  );
}
