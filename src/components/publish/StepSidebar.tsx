"use client";

import { motion, AnimatePresence } from "motion/react";
import { Check, Zap, Calendar, MapPin, Image } from "lucide-react";

export interface StepInfo {
  id: number;
  label: string;
  sublabel: string;
  icon: React.ReactNode;
}

interface StepSidebarProps {
  steps: StepInfo[];
  current: number;
  progress: number;
  preview: {
    title: string;
    category: string;
    categoryEmoji: string;
    date: string;
    location: string;
    price: string;
    image: string | null;
  };
}

export default function StepSidebar({ steps, current, progress, preview }: StepSidebarProps) {
  return (
    <aside className="hidden lg:flex flex-col w-72 xl:w-80 shrink-0 border-r border-primary/10 min-h-[calc(100vh-68px)] sticky top-[68px] self-start">

      {/* Progress */}
      <div className="px-6 py-5 border-t border-primary/8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-[10px] uppercase tracking-widest text-base-content/25">Progression</span>
          <span className="text-xs font-bold text-primary">{progress}%</span>
        </div>
        <div className="h-1.5 bg-base-300 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
      </div>

      {/* Live preview card */}
      <div className="px-4 pb-6">
        <p className="text-[10px] uppercase tracking-[0.22em] text-base-content/25 mb-3 px-2">
          Aperçu de la carte
        </p>
        <div className="card bg-base-300 border border-primary/12 overflow-hidden">
          {/* Image zone */}
          <figure className="relative h-28 bg-base-100 overflow-hidden">
            <AnimatePresence>
              {preview.image ? (
                <motion.img
                  key="img"
                  src={preview.image}
                  alt="preview"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full h-full object-cover"
                />
              ) : (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="w-full h-full flex flex-col items-center justify-center gap-1"
                >
                  <div className="text-2xl opacity-20"><Image/></div>
                  <span className="text-[9px] uppercase tracking-wider text-base-content/15">
                    Aperçu affiche
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Category badge */}
            <div className="absolute top-2 left-2">
              <span className="badge bg-base-100/80 backdrop-blur-sm border-primary/20 text-primary text-[9px] uppercase tracking-wider py-1.5 px-2">
                {preview.categoryEmoji} {preview.category || "Catégorie"}
              </span>
            </div>
          </figure>

          <div className="p-3 flex flex-col gap-1.5">
            <AnimatePresence mode="wait">
              <motion.p
                key={preview.title}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-display text-sm font-bold text-base-content line-clamp-2 leading-snug"
              >
                {preview.title || "Titre de votre événement"}
              </motion.p>
            </AnimatePresence>

            <div className="flex items-center gap-1 text-base-content/35">
              <Calendar size={10} className="text-primary/50" />
              <span className="text-[10px]">{preview.date || "Date à définir"}</span>
            </div>
            <div className="flex items-center gap-1 text-base-content/35">
              <MapPin size={10} className="text-primary/50" />
              <span className="text-[10px] truncate">{preview.location || "Lieu à définir"}</span>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-primary/8 mt-0.5">
              <span className="text-primary font-bold text-xs">{preview.price || "—"}</span>
              <span className="badge badge-outline border-primary/20 text-base-content/25 text-[9px] py-1">
                Brouillon
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Steps */}
      <nav className="flex-1 px-4 py-6 flex flex-col gap-1">
        {steps.map((step, i) => {
          const isDone = current > step.id;
          const isActive = current === step.id;
          const isLocked = current < step.id;

          return (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
              className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 ${isActive
                  ? "bg-primary/10 border border-primary/25"
                  : isDone
                    ? "bg-primary/5 border border-primary/10"
                    : "border border-transparent"
                }`}
            >
              {/* Circle */}
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold transition-all duration-300 ${isDone
                    ? "bg-primary text-primary-content"
                    : isActive
                      ? "bg-primary text-primary-content shadow-md shadow-primary/40"
                      : "bg-base-300 border border-base-content/10 text-base-content/25"
                  }`}
              >
                {isDone ? <Check size={14} /> : <span>{step.id}</span>}
              </div>

              {/* Labels */}
              <div className="flex-1 min-w-0">
                <div
                  className={`text-xs font-semibold uppercase tracking-wider transition-colors duration-200 ${isActive ? "text-primary" : isDone ? "text-base-content/60" : "text-base-content/25"
                    }`}
                >
                  {step.label}
                </div>
                <div className={`text-[10px] mt-0.5 truncate ${isActive ? "text-base-content/40" : "text-base-content/20"}`}>
                  {step.sublabel}
                </div>
              </div>

              {/* Active icon */}
              {isActive && (
                <span className="text-primary/50 shrink-0">{step.icon}</span>
              )}
            </motion.div>
          );
        })}
      </nav>
    </aside>
  );
}
