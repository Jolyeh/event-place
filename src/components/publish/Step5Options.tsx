"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { Tag, Eye, UserCheck, Users, RefreshCcw, Lock, Globe, X, Info } from "lucide-react";

interface Step5Props {
  data: {
    tags: string[];
    isPublic: boolean;
    requiresRegistration: boolean;
    showCapacity: boolean;
    allowRefunds: boolean;
    ageRestriction: string;
    contactEmail: string;
    website: string;
  };
  onChange: (field: string, value: string | boolean | string[]) => void;
}

const suggestedTags = [
  "musique live", "famille", "extérieur", "networking", "afterwork",
  "gratuit", "prestige", "international", "bien-être", "culture",
];

export default function Step5Options({ data, onChange }: Step5Props) {
  const [tagInput, setTagInput] = useState("");

  const addTag = (tag: string) => {
    const trimmed = tag.trim().toLowerCase();
    if (!trimmed || data.tags.includes(trimmed) || data.tags.length >= 10) return;
    onChange("tags", [...data.tags, trimmed]);
    setTagInput("");
  };

  const removeTag = (tag: string) => {
    onChange("tags", data.tags.filter((t) => t !== tag));
  };

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === "Enter" || e.key === ",") && tagInput.trim()) {
      e.preventDefault();
      addTag(tagInput);
    }
  };

  const toggleOptions = [
    {
      field: "isPublic",
      value: data.isPublic,
      icon: <Globe size={15} className="text-primary" />,
      label: "Événement public",
      desc: "Visible par tous les utilisateurs d'Event Place",
    },
    {
      field: "requiresRegistration",
      value: data.requiresRegistration,
      icon: <UserCheck size={15} className="text-primary" />,
      label: "Inscription requise",
      desc: "Les participants doivent créer un compte pour réserver",
    },
    {
      field: "showCapacity",
      value: data.showCapacity,
      icon: <Users size={15} className="text-primary" />,
      label: "Afficher les places restantes",
      desc: "Crée un sentiment d'urgence et favorise les réservations",
    },
    {
      field: "allowRefunds",
      value: data.allowRefunds,
      icon: <RefreshCcw size={15} className="text-primary" />,
      label: "Autoriser les remboursements",
      desc: "Jusqu'à 48h avant le début de l'événement",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col gap-8"
    >
      {/* Tags */}
      {/* Tags */}
      <div className="form-control gap-3">
        <div className="flex items-center justify-between">
          <label className="label-text text-[10px] font-semibold uppercase tracking-[0.2em] text-base-content/50 flex items-center gap-2">
            <Tag size={12} className="text-primary/50" />
            Tags
          </label>
          <span className="text-[10px] text-base-content/25">{data.tags.length}/10</span>
        </div>

        {/* Tag input - AJUSTÉ : min-h, flex-wrap et overflow-hidden pour le responsive */}
        <div className="input input-bordered w-full bg-base-300 border-primary/15 focus-within:border-primary/50 rounded-xl min-h-[44px] h-auto flex flex-wrap gap-1.5 items-center px-3 py-2 transition-colors duration-200 overflow-hidden">
          {data.tags.map((tag) => (
            <span
              key={tag}
              className="badge badge-primary badge-outline text-[10px] uppercase tracking-wider gap-1 py-2 px-2 shrink-0"
            >
              {tag}
              <button type="button" onClick={() => removeTag(tag)} className="hover:text-error transition-colors">
                <X size={9} />
              </button>
            </span>
          ))}
          {data.tags.length < 10 && (
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleTagKeyDown}
              placeholder={data.tags.length === 0 ? "Ajoutez des tags…" : ""}
              // AJUSTÉ : flex-1 et min-w pour que l'input se comporte bien sur mobile
              className="bg-transparent outline-none text-sm flex-1 min-w-[60px] placeholder:text-base-content/20"
            />
          )}
        </div>

        {/* Suggested tags - AJUSTÉ : overflow-x-auto pour ne pas casser la largeur sur mobile */}
        <div className="flex flex-col items-start mt-3 gap-1.5 w-full">
          <span className="text-[10px] uppercase tracking-wider text-base-content/20 shrink-0">Suggestions :</span>
          <div className="flex flex-wrap gap-1.5 overflow-x-auto no-scrollbar pb-1">
            {suggestedTags
              .filter((t) => !data.tags.includes(t))
              .slice(0, 10) // Plus de suggestions car on peut scroller
              .map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => addTag(tag)}
                  className="badge badge-outline border-primary/12 text-base-content/30 hover:border-primary/40 hover:text-primary hover:bg-primary/8 text-[10px] py-2 px-2.5 cursor-pointer transition-all duration-200 whitespace-nowrap"
                >
                  + {tag}
                </button>
              ))}
          </div>
        </div>
      </div>

      <div className="divider divider-neutral opacity-40 my-0" />

      {/* Visibility & options toggles */}
      <div className="flex flex-col gap-3">
        <h3 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-base-content/50 flex items-center gap-2">
          <Eye size={12} className="text-primary/50" />
          Visibilité &amp; options
        </h3>

        {toggleOptions.map(({ field, value, icon, label, desc }) => (
          <div
            key={field}
            className="flex items-center justify-between p-4 bg-base-300 border border-primary/8 hover:border-primary/20 rounded-2xl transition-colors duration-200"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                {icon}
              </div>
              <div>
                <div className="text-sm font-medium text-base-content/80">{label}</div>
                <div className="text-[11px] text-base-content/30 mt-0.5">{desc}</div>
              </div>
            </div>
            <input
              type="checkbox"
              className="toggle toggle-primary toggle-sm shrink-0"
              checked={!!value}
              onChange={(e) => onChange(field, e.target.checked)}
            />
          </div>
        ))}
      </div>

      <div className="divider divider-neutral opacity-40 my-0" />

      {/* Additional fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="form-control gap-2">
          <label className="label-text text-[10px] font-semibold uppercase tracking-[0.2em] text-base-content/50 flex items-center gap-2">
            Restriction d&apos;âge
          </label>
          <select
            value={data.ageRestriction}
            onChange={(e) => onChange("ageRestriction", e.target.value)}
            className="select select-bordered w-full bg-base-300 border-primary/15 focus:border-primary/50 focus:outline-none text-sm rounded-xl"
          >
            <option value="">Aucune restriction</option>
            <option value="16+">16 ans et plus</option>
            <option value="18+">18 ans et plus</option>
            <option value="21+">21 ans et plus</option>
          </select>
        </div>

        <div className="form-control gap-2">
          <label className="label-text text-[10px] font-semibold uppercase tracking-[0.2em] text-base-content/50">
            E-mail de contact
          </label>
          <input
            type="email"
            value={data.contactEmail}
            onChange={(e) => onChange("contactEmail", e.target.value)}
            placeholder="contact@monorganisation.fr"
            className="input input-bordered w-full bg-base-300 border-primary/15 focus:border-primary/50 focus:outline-none text-sm rounded-xl placeholder:text-base-content/20"
          />
        </div>

        <div className="form-control gap-2 sm:col-span-2">
          <label className="label-text text-[10px] font-semibold uppercase tracking-[0.2em] text-base-content/50">
            Site web
          </label>
          <input
            type="url"
            value={data.website}
            onChange={(e) => onChange("website", e.target.value)}
            placeholder="https://www.votre-site.fr"
            className="input input-bordered w-full bg-base-300 border-primary/15 focus:border-primary/50 focus:outline-none text-sm rounded-xl h-11 placeholder:text-base-content/20"
          />
        </div>
      </div>

      {/* Info reminder */}
      <div className="alert bg-base-300 border border-primary/10 rounded-2xl p-4">
        <Info size={15} className="text-primary/50 shrink-0" />
        <p className="text-xs text-base-content/40 leading-relaxed">
          Votre événement sera examiné par notre équipe sous <strong className="text-base-content/60">2h</strong> avant d&apos;être publié sur la plateforme. Vous serez notifié par e-mail dès la validation.
        </p>
      </div>
    </motion.div>
  );
}
