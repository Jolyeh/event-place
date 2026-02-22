"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  FileText, CalendarDays, Image, Ticket, Settings,
  ArrowLeft, ArrowRight, Save, Send, ChevronRight,
} from "lucide-react";

import StepSidebar from "./StepSidebar";
import Step1Infos from "./Step1Infos";
import Step2DateTime from "./Step2DateTime";
import Step3Media from "./Step3Media";
import Step4Tickets, { TicketCategory } from "./Step4Tickets";
import Step5Options from "./Step5Options";
import SuccessScreen from "./SuccessScreen";

// ─── Types ────────────────────────────────────────────────────────────────────

interface FormData {
  // Step 1
  title: string;
  category: string;
  categoryEmoji: string;
  description: string;
  language: string;
  // Step 2
  dateStart: string;
  timeStart: string;
  dateEnd: string;
  timeEnd: string;
  multiDay: boolean;
  venue: string;
  address: string;
  city: string;
  capacity: string;
  isOnline: boolean;
  onlineUrl: string;
  // Step 3
  coverImage: string | null;
  gallery: string[];
  videoUrl: string;
  // Step 4
  isFree: boolean;
  tickets: TicketCategory[];
  saleStart: string;
  saleEnd: string;
  // Step 5
  tags: string[];
  isPublic: boolean;
  requiresRegistration: boolean;
  showCapacity: boolean;
  allowRefunds: boolean;
  ageRestriction: string;
  contactEmail: string;
  website: string;
}

const INITIAL: FormData = {
  title: "", category: "", categoryEmoji: "", description: "", language: "fr",
  dateStart: "", timeStart: "", dateEnd: "", timeEnd: "",
  multiDay: false, venue: "", address: "", city: "", capacity: "",
  isOnline: false, onlineUrl: "",
  coverImage: null, gallery: [], videoUrl: "",
  isFree: false, tickets: [], saleStart: "", saleEnd: "",
  tags: [], isPublic: true, requiresRegistration: false,
  showCapacity: true, allowRefunds: true,
  ageRestriction: "", contactEmail: "", website: "",
};

// ─── Step config ──────────────────────────────────────────────────────────────

const STEPS = [
  { id: 1, label: "Informations", sublabel: "Titre, catégorie, description", icon: <FileText size={14} /> },
  { id: 2, label: "Date & Lieu", sublabel: "Quand et où", icon: <CalendarDays size={14} /> },
  { id: 3, label: "Médias", sublabel: "Affiche et photos", icon: <Image size={14} /> },
  { id: 4, label: "Billetterie", sublabel: "Prix et catégories", icon: <Ticket size={14} /> },
  { id: 5, label: "Options", sublabel: "Visibilité et extras", icon: <Settings size={14} /> },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getProgress(step: number): number {
  return Math.round((step / STEPS.length) * 100);
}

function formatPreviewDate(dateStart: string, timeStart: string): string {
  if (!dateStart) return "";
  try {
    const d = new Date(dateStart);
    const day = d.toLocaleDateString("fr-FR", { day: "numeric", month: "short" });
    return timeStart ? `${day} · ${timeStart}` : day;
  } catch {
    return dateStart;
  }
}

function getMinPrice(isFree: boolean, tickets: TicketCategory[]): string {
  if (isFree) return "Gratuit";
  if (!tickets.length) return "—";
  const prices = tickets.map((t) => parseFloat(t.price)).filter((p) => !isNaN(p));
  if (!prices.length) return "—";
  const min = Math.min(...prices);
  return `À partir de ${min.toFixed(2).replace(".00", "")}€`;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function PublishFlow() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<FormData>(INITIAL);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = useCallback(
    (field: string, value: string | boolean | string[] | null | TicketCategory[]) => {
      setData((prev) => ({ ...prev, [field]: value }));
    },
    []
  );


  const handleSubmit = () => {
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const canGoNext = (): boolean => {
    if (step === 1) return data.title.length >= 3 && !!data.category && data.description.length >= 10;
    if (step === 2) return !!data.dateStart && !!data.timeStart && (data.isOnline ? !!data.onlineUrl : !!data.venue && !!data.city);
    if (step === 3) return !!data.coverImage;
    if (step === 4) return data.isFree || data.tickets.length > 0;
    return true;
  };

  // Derived preview values
  const preview = {
    title: data.title,
    category: data.category,
    categoryEmoji: data.categoryEmoji,
    date: formatPreviewDate(data.dateStart, data.timeStart),
    location: data.isOnline ? "En ligne" : data.venue || data.city,
    price: getMinPrice(data.isFree, data.tickets),
    image: data.coverImage,
  };

  // Step validation pills
  const stepStatus = STEPS.map((s) => {
    if (s.id < step) return "done";
    if (s.id === step) return "active";
    return "locked";
  });

  return (
    <div className="min-h-screen bg-base-100 pt-[68px]">
      {submitted ? (
        <div className="max-w-2xl mx-auto px-4 py-12">
          <SuccessScreen />
        </div>
      ) : (
        <div className="flex min-h-[calc(100vh-68px)]">

          {/* Left sidebar */}
          <StepSidebar
            steps={STEPS}
            current={step}
            progress={getProgress(step)}
            preview={preview}
          />

          {/* Main form area */}
          <div className="flex-1 flex flex-col">

            {/* Mobile step header */}
            <div className="lg:hidden bg-base-200 border-b border-primary/10 px-4 py-3 w-full">
              {/* Header (Progress bar) */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] uppercase tracking-[0.2em] text-primary font-semibold">
                  Étape {step}/{STEPS.length}
                </span>
                <span className="text-[10px] uppercase tracking-wider text-base-content/25">
                  {getProgress(step)}%
                </span>
              </div>

              <div className="h-1 bg-base-300 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                  animate={{ width: `${getProgress(step)}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>

              {/* Mobile step pills - VERSION PLEINE LARGEUR */}
              <div className="flex w-full gap-1 mt-4">
                {STEPS.map((s) => {
                  const status = stepStatus[s.id - 1];
                  const isActive = status === "active";

                  return (
                    <div
                      key={s.id}
                      className={`
                        flex items-center justify-center gap-1.5 py-2 rounded-lg transition-all duration-300
                        /* C'est ici que la magie opère pour la largeur : */
                        flex-1 min-w-0 
                        ${isActive
                          ? "bg-primary/10 border border-primary/30 text-primary"
                          : "bg-transparent text-base-content/20"
                        }
                      `}
                    >
                      {/* Cercle avec le numéro */}
                      <span
                        className={`w-4 h-4 rounded-full flex items-center justify-center font-bold text-[9px] shrink-0 ${status === "done" ? "bg-primary text-primary-content" :
                          isActive ? "bg-primary text-primary-content shadow-sm" :
                            "bg-base-300 text-base-content/30"
                          }`}
                      >
                        {status === "done" ? "✓" : s.id}
                      </span>

                      {/* Label : On l'affiche seulement s'il est actif OU sur grand mobile, 
              sinon ça va casser la largeur sur les petits écrans */}
                      <span className={`text-[9px] uppercase font-bold truncate ${isActive ? "block" : "hidden sm:block"}`}>
                        {s.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Form content */}
            <div className="flex-1 overflow-y-auto">
              <div className="max-w-2xl mx-auto px-4 sm:px-8 py-10">

                {/* Step header */}
                <motion.div
                  key={`header-${step}`}
                  initial={{ opacity: 0, y: -12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="mb-8"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="badge badge-outline border-primary/25 text-primary text-[9px] uppercase tracking-[0.2em] py-2 px-3 gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      Étape {step} sur {STEPS.length}
                    </span>
                  </div>
                  <h1 className="font-display font-bold text-base-content leading-tight"
                    style={{ fontSize: "clamp(1.5rem, 4vw, 2.2rem)" }}>
                    {step === 1 && <>Informations <span className="italic font-light text-primary">essentielles</span></>}
                    {step === 2 && <>Date <span className="italic font-light text-primary">&amp; Lieu</span></>}
                    {step === 3 && <>Médias <span className="italic font-light text-primary">&amp; Visuels</span></>}
                    {step === 4 && <><span className="italic font-light text-primary">Billetterie</span></>}
                    {step === 5 && <>Options <span className="italic font-light text-primary">&amp; Publication</span></>}
                  </h1>
                  <p className="text-sm text-base-content/40 mt-1">
                    {step === 1 && "Définissez les informations clés qui décrivent votre événement."}
                    {step === 2 && "Indiquez quand et où se déroule votre événement."}
                    {step === 3 && "Ajoutez des visuels attractifs pour attirer les participants."}
                    {step === 4 && "Configurez vos catégories de billets et leurs tarifs."}
                    {step === 5 && "Peaufinez les derniers détails avant de publier."}
                  </p>
                </motion.div>

                {/* Animated step panels */}
                <AnimatePresence mode="wait">
                  <div key={`step-${step}`}>
                    {step === 1 && (
                      <Step1Infos
                        data={{
                          title: data.title,
                          category: data.category,
                          categoryEmoji: data.categoryEmoji,
                          description: data.description,
                          language: data.language,
                        }}
                        onChange={handleChange}
                      />
                    )}
                    {step === 2 && (
                      <Step2DateTime
                        data={{
                          dateStart: data.dateStart,
                          timeStart: data.timeStart,
                          dateEnd: data.dateEnd,
                          timeEnd: data.timeEnd,
                          multiDay: data.multiDay,
                          venue: data.venue,
                          address: data.address,
                          city: data.city,
                          capacity: data.capacity,
                          isOnline: data.isOnline,
                          onlineUrl: data.onlineUrl,
                        }}
                        onChange={handleChange}
                      />
                    )}
                    {step === 3 && (
                      <Step3Media
                        data={{
                          coverImage: data.coverImage,
                          gallery: data.gallery,
                          videoUrl: data.videoUrl,
                        }}
                        onChange={handleChange}
                      />
                    )}
                    {step === 4 && (
                      <Step4Tickets
                        data={{
                          isFree: data.isFree,
                          tickets: data.tickets,
                          saleStart: data.saleStart,
                          saleEnd: data.saleEnd,
                        }}
                        onChange={handleChange}
                      />
                    )}
                    {step === 5 && (
                      <Step5Options
                        data={{
                          tags: data.tags,
                          isPublic: data.isPublic,
                          requiresRegistration: data.requiresRegistration,
                          showCapacity: data.showCapacity,
                          allowRefunds: data.allowRefunds,
                          ageRestriction: data.ageRestriction,
                          contactEmail: data.contactEmail,
                          website: data.website,
                        }}
                        onChange={handleChange}
                      />
                    )}
                  </div>
                </AnimatePresence>

                {/* Navigation bar */}
                <div className="flex items-center justify-between gap-4 mt-10 pt-6 border-t border-primary/10">
                  {/* Back */}
                  <button
                    type="button"
                    onClick={() => setStep((s) => Math.max(1, s - 1))}
                    disabled={step === 1}
                    className="btn btn-ghost rounded-full gap-2 text-xs uppercase tracking-widest border border-base-content/10 hover:border-primary/30 disabled:opacity-25 disabled:cursor-not-allowed"
                  >
                    <ArrowLeft size={14} />
                    Retour
                  </button>

                  <div className="flex items-center gap-2 ml-auto">

                    {/* Next / Submit */}
                    {step < STEPS.length ? (
                      <button
                        type="button"
                        onClick={() => setStep((s) => s + 1)}
                        disabled={!canGoNext()}
                        className="btn btn-primary rounded-full gap-2 text-xs uppercase tracking-widest font-semibold px-7 disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        Continuer
                        <ArrowRight size={14} />
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={handleSubmit}
                        className="btn btn-primary rounded-full gap-2 text-xs uppercase tracking-widest font-semibold px-8 animate-pulse hover:animate-none"
                      >
                        <Send size={14} />
                        Publier
                      </button>
                    )}
                  </div>
                </div>

                {/* Validation hint */}
                <AnimatePresence>
                  {!canGoNext() && step < STEPS.length && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="text-[11px] text-base-content/30 text-right mt-3 flex items-center justify-end gap-1.5">
                        <ChevronRight size={10} className="text-warning/60" />
                        {step === 1 && "Complétez le titre, la catégorie et la description pour continuer."}
                        {step === 2 && "La date, l'heure de début et le lieu sont requis."}
                        {step === 3 && "Ajoutez une image principale pour continuer."}
                        {step === 4 && "Activez « Gratuit » ou créez au moins une catégorie de billet."}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
