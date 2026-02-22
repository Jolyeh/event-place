"use client";

import { motion } from "motion/react";
import { Info } from "lucide-react";

const categories = [
  { name: "Concert" },
  { name: "Conférence" },
  { name: "Exposition" },
  { name: "Sport" },
  { name: "Théâtre" },
  { name: "Gala" },
  { name: "Festival" },
  { name: "Gastronomie" },
  { name: "Bien-être" },
  { name: "Cinéma" },
  { name: "Formation" },
  { name: "Autre" },
];

interface Step1Props {
  data: {
    title: string;
    category: string;
    categoryEmoji: string;
    description: string;
    language: string;
  };
  onChange: (field: string, value: string) => void;
}

export default function Step1({ data, onChange }: Step1Props) {
  const charLeft = 2000 - data.description.length;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col gap-8"
    >
      {/* Titre */}
      <div className="form-control flex flex-col w-full gap-2">
        <label className="label pb-0">
          <span className="label-text text-[10px] font-semibold uppercase tracking-[0.2em] text-base-content/50">
            Titre de l&apos;événement <span className="text-primary">*</span>
          </span>
          <span className="label-text-alt text-[10px] text-base-content/25">
            {data.title.length}/80
          </span>
        </label>
        <input
          type="text"
          maxLength={80}
          value={data.title}
          onChange={(e) => onChange("title", e.target.value)}
          placeholder="Ex : Festival de Jazz du Vieux-Port 2025"
          className="input input-bordered w-full bg-base-300 border-primary/15 focus:border-primary/50 focus:outline-none text-sm placeholder:text-base-content/20 rounded-xl h-12"
        />
        <p className="text-[11px] text-base-content/30 flex items-center gap-1.5">
          <Info size={11} className="text-primary/40 shrink-0" />
          Un titre clair et précis augmente la visibilité de votre événement.
        </p>
      </div>

      {/* Catégorie */}
      <div className="form-control gap-3">
        <label className="label pb-0">
          <span className="label-text text-[10px] font-semibold uppercase tracking-[0.2em] text-base-content/50">
            Catégorie <span className="text-primary">*</span>
          </span>
        </label>
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
          {categories.map((cat) => {
            const isSelected = data.category === cat.name;
            return (
              <button
                key={cat.name}
                type="button"
                onClick={() => {
                  onChange("category", cat.name);
                }}
                className={`flex flex-col items-center gap-1.5 py-3 px-2 rounded-xl border text-xs font-medium transition-all duration-200 ${isSelected
                    ? "border-primary bg-primary/12 text-primary shadow-md shadow-primary/15"
                    : "border-primary/10 bg-base-300 text-base-content/40 hover:border-primary/30 hover:text-base-content/70 hover:bg-primary/5"
                  }`}
              >
                <span className="text-[10px] uppercase tracking-wide leading-none text-center">
                  {cat.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Description */}
      <div className="form-control flex flex-col w-full gap-2">
        <label className="label pb-0">
          <span className="label-text text-[10px] font-semibold uppercase tracking-[0.2em] text-base-content/50">
            Description <span className="text-primary">*</span>
          </span>
          <span
            className={`label-text-alt text-[10px] ${charLeft < 200 ? "text-warning" : "text-base-content/25"}`}
          >
            {charLeft} caractères restants
          </span>
        </label>
        <textarea
          rows={6}
          maxLength={2000}
          value={data.description}
          onChange={(e) => onChange("description", e.target.value)}
          placeholder="Décrivez votre événement : programme, intervenants, ambiance, informations pratiques…"
          className="textarea textarea-bordered w-full bg-base-300 border-primary/15 focus:border-primary/50 focus:outline-none text-sm placeholder:text-base-content/20 rounded-xl resize-none leading-relaxed"
        />
      </div>

      {/* Langue */}
      <div className="form-control flex flex-col w-full gap-2">
        <label className="label pb-0">
          <span className="label-text text-[10px] font-semibold uppercase tracking-[0.2em] text-base-content/50">
            Langue principale
          </span>
        </label>
        <select
          value={data.language}
          onChange={(e) => onChange("language", e.target.value)}
          className="select w-full select-bordered bg-base-300 border-primary/15 focus:border-primary/50 focus:outline-none text-sm rounded-xl"
        >
          <option value="fr">Français</option>
          <option value="en">English</option>
          <option value="es">Español</option>
          <option value="de">Deutsch</option>
          <option value="it">Italiano</option>
        </select>
      </div>
    </motion.div>
  );
}
