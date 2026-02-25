"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft, ArrowRight, Check, Shield, Lock,
  Ticket, CreditCard, User, Mail, Phone,
  MapPin, Calendar, Clock, ChevronDown,
  Star, Zap, QrCode, Download, X, ChevronRight,
  Eye, EyeOff, Info, AlertCircle, Sparkles
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────
interface TicketCategory {
  id: string;
  name: string;
  price: number;
  description: string;
  perks: string[];
  available: number;
  total: number;
  color: string;
}

// ─── Event data (static mock) ─────────────────────────────────────────────────
const EVENT = {
  id: 1,
  title: "Orchestre Philharmonique de Paris",
  subtitle: "Soirée Beethoven — Symphonie n°9",
  date: "Samedi 15 Mars 2025",
  time: "20h30",
  endTime: "22h45",
  location: "Philharmonie de Paris",
  address: "221 av. Jean-Jaurès, Paris 19e",
  category: "Concert classique",
  emoji: "🎵",
  image: "https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=800&q=80",
  rating: 4.9,
  reviews: 847,
};

const TICKET_CATEGORIES: TicketCategory[] = [
  {
    id: "standard",
    name: "Standard",
    price: 45,
    description: "Placement libre, zone debout ou assise selon disponibilité",
    perks: ["Accès général à la salle", "Programme de la soirée"],
    available: 312,
    total: 500,
    color: "border-base-content/15",
  },
  {
    id: "cat1",
    name: "Catégorie 1",
    price: 75,
    description: "Placement numéroté, vue optimale sur la scène",
    perks: ["Siège numéroté", "Vue panoramique", "Accès prioritaire"],
    available: 67,
    total: 200,
    color: "border-primary/30",
  },
  {
    id: "vip",
    name: "VIP Prestige",
    price: 150,
    description: "Loge privée, champagne & programme dédicacé",
    perks: ["Loge privée", "Champagne offert", "Programme dédicacé", "Accès backstage"],
    available: 8,
    total: 20,
    color: "border-accent/40",
  },
];

const STEPS = [
  { id: 1, label: "Billets", icon: Ticket },
  { id: 2, label: "Coordonnées", icon: User },
  { id: 3, label: "Paiement", icon: CreditCard },
  { id: 4, label: "Confirmation", icon: Check },
];

// ─── Step 1 — Ticket selection ────────────────────────────────────────────────
function StepTickets({
  selected,
  setSelected,
  qty,
  setQty,
}: {
  selected: string;
  setSelected: (v: string) => void;
  qty: number;
  setQty: (v: number) => void;
}) {
  const [showMap, setShowMap] = useState(false);
  const ticket = TICKET_CATEGORIES.find((t) => t.id === selected)!;

  return (
    <div className="flex flex-col gap-7">
      {/* Category cards */}
      <div>
        <h2 className="font-display text-xl font-bold text-base-content mb-1">
          Choisissez votre <span className="italic font-light text-primary">catégorie</span>
        </h2>
        <p className="text-xs text-base-content/38 mb-5">Sélectionnez le type de billet qui vous convient.</p>

        <div className="flex flex-col gap-3">
          {TICKET_CATEGORIES.map((cat) => {
            const isSelected = selected === cat.id;
            const pct = (cat.available / cat.total) * 100;
            const isLow = cat.available <= 15;
            const isSoldOut = cat.available === 0;

            return (
              <motion.button
                key={cat.id}
                onClick={() => !isSoldOut && setSelected(cat.id)}
                disabled={isSoldOut}
                whileTap={{ scale: 0.995 }}
                className={`text-left rounded-2xl border-2 p-5 transition-all duration-250 relative overflow-hidden ${isSelected
                  ? "border-primary bg-primary/8 shadow-lg shadow-primary/12"
                  : isSoldOut
                    ? "border-base-content/6 opacity-40 cursor-not-allowed bg-base-200"
                    : "border-primary/10 bg-base-200 hover:border-primary/30 hover:bg-primary/4 cursor-pointer"
                  }`}
              >
                {/* Selected glow */}
                {isSelected && (
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/6 to-transparent pointer-events-none" />
                )}

                <div className="relative flex items-start gap-4">
                  {/* Radio */}
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 transition-all duration-200 ${isSelected ? "border-primary bg-primary" : "border-base-content/20 bg-transparent"
                      }`}
                  >
                    {isSelected && <div className="w-2 h-2 rounded-full bg-primary-content" />}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3 mb-1.5">
                      <div className="flex items-center gap-2.5">
                        <span className={`font-display text-base font-bold leading-none ${isSelected ? "text-base-content" : "text-base-content/75"}`}>
                          {cat.name}
                        </span>
                        {cat.id === "vip" && (
                          <span className="badge bg-accent/15 border border-accent/25 text-accent text-[9px] uppercase tracking-wider py-1 px-2 gap-1">
                            <Sparkles size={8} fill="currentColor" /> Premium
                          </span>
                        )}
                        {isLow && !isSoldOut && (
                          <span className="badge badge-warning text-warning-content text-[9px] uppercase tracking-wider py-1 px-2">
                            {cat.available} restants
                          </span>
                        )}
                      </div>
                      <div className="text-right shrink-0">
                        <span className={`font-display text-xl font-bold ${isSelected ? "text-primary" : "text-base-content/65"}`}>
                          {cat.price}€
                        </span>
                        <div className="text-[10px] text-base-content/28 mt-0.5">/ personne</div>
                      </div>
                    </div>

                    <p className="text-xs text-base-content/42 mb-2.5 leading-relaxed">{cat.description}</p>

                    {/* Perks */}
                    <div className="flex flex-wrap gap-1.5">
                      {cat.perks.map((p) => (
                        <span
                          key={p}
                          className={`flex items-center gap-1 text-[10px] px-2 py-1 rounded-lg border ${isSelected
                            ? "border-primary/20 bg-primary/8 text-primary/70"
                            : "border-base-content/8 bg-base-300 text-base-content/35"
                            }`}
                        >
                          <Check size={9} className={isSelected ? "text-primary" : "text-base-content/25"} />
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Quantity */}
      <div className="card bg-base-200 border border-primary/10 p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-semibold text-base-content">Nombre de billets</h3>
            <p className="text-[11px] text-base-content/35 mt-0.5">Maximum 10 par commande</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setQty(Math.max(1, qty - 1))}
              className="btn btn-sm btn-circle bg-base-300 border border-primary/15 hover:border-primary/40 hover:bg-primary/10 text-base-content/50 hover:text-primary transition-all duration-200 text-lg font-bold"
            >
              −
            </button>
            <span className="font-display text-2xl font-bold text-primary w-8 text-center tabular-nums">
              {qty}
            </span>
            <button
              onClick={() => setQty(Math.min(10, qty + 1))}
              className="btn btn-sm btn-circle bg-base-300 border border-primary/15 hover:border-primary/40 hover:bg-primary/10 text-base-content/50 hover:text-primary transition-all duration-200 text-lg font-bold"
            >
              +
            </button>
          </div>
        </div>

        {/* Mini total preview */}
        <div className="flex items-center justify-between pt-4 border-t border-primary/8">
          <div className="flex items-center gap-2 text-xs text-base-content/40">
            <Ticket size={12} className="text-primary/40" />
            {ticket.name} × {qty}
          </div>
          <span className="font-display text-lg font-bold text-primary">
            {ticket.price * qty}€
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── Step 2 — Contact info ────────────────────────────────────────────────────
function StepContact({
  form,
  setForm,
  errors,
}: {
  form: Record<string, string>;
  setForm: (f: Record<string, string>) => void;
  errors: Record<string, string>;
}) {
  const set = (k: string, v: string) => setForm({ ...form, [k]: v });

  const fields = [
    { key: "firstName", label: "Prénom", type: "text", ph: "Sophie", half: true },
    { key: "lastName", label: "Nom", type: "text", ph: "Martin", half: true },
    { key: "email", label: "Adresse e-mail", type: "email", ph: "sophie@exemple.fr", half: false },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="font-display text-xl font-bold text-base-content mb-1">
          Vos <span className="italic font-light text-primary">coordonnées</span>
        </h2>
        <p className="text-xs text-base-content/38">
          Vos billets seront envoyés à l&apos;adresse e-mail renseignée.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {fields.map(({ key, label, type, ph, half }) => (
          <div key={key} className={`form-control gap-1.5 ${half ? "col-span-1" : "col-span-2"}`}>
            <label className="text-[10px] uppercase tracking-wider text-base-content/38">
              {label}
              {key !== "phone" && <span className="text-primary ml-0.5">*</span>}
            </label>
            <div className="relative">
              <input
                type={type}
                value={form[key] ?? ""}
                onChange={(e) => set(key, e.target.value)}
                placeholder={ph}
                className={`input input-bordered w-full bg-base-200 focus:outline-none text-sm rounded-xl h-11 placeholder:text-base-content/18 transition-colors duration-200 ${errors[key]
                  ? "border-error/60 focus:border-error/80"
                  : "border-primary/12 focus:border-primary/50"
                  }`}
              />
            </div>
            {errors[key] && (
              <p className="text-[10px] text-error flex items-center gap-1">
                <AlertCircle size={10} /> {errors[key]}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* RGPD note */}
      <div className="flex items-start gap-2.5 text-[11px] text-base-content/30 leading-relaxed">
        <Info size={12} className="text-primary/30 mt-0.5 shrink-0" />
        <span>
          Vos données sont traitées par Event Place uniquement pour la gestion de votre réservation.{" "}
          <Link href="/confidentialite" className="text-primary/60 hover:text-primary underline transition-colors">
            Politique de confidentialité
          </Link>
        </span>
      </div>
    </div>
  );
}

// ─── Step 3 — Payment ─────────────────────────────────────────────────────────
function StepPayment({
  payForm,
  setPayForm,
  payErrors,
}: {
  payForm: Record<string, string>;
  setPayForm: (f: Record<string, string>) => void;
  payErrors: Record<string, string>;
}) {
  const [method, setMethod] = useState<"moov" | "mtn" | "celtis">("moov");
  const set = (k: string, v: string) => setPayForm({ ...payForm, [k]: v });

  const PAYMENT_METHODS = [
    { id: "moov", label: "Moov money" },
    { id: "mtn", label: "Mtn money" },
    { id: "celtis", label: "Celtis cash" },
  ] as const;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="font-display text-xl font-bold text-base-content mb-1">
          Mode de <span className="italic font-light text-primary">paiement</span>
        </h2>
        <p className="text-xs text-base-content/38">Paiement 100% sécurisé — FedaPay.</p>
      </div>

      {/* Method selector */}
      <div className="flex gap-2">
        {PAYMENT_METHODS.map((m) => (
          <button
            key={m.id}
            onClick={() => setMethod(m.id)}
            className={`flex-1 flex flex-col items-center gap-1.5 py-3 px-2 rounded-2xl border-2 text-center transition-all duration-200 ${method === m.id
              ? "border-primary bg-primary/8 shadow-md shadow-primary/10"
              : "border-primary/10 bg-base-200 hover:border-primary/25"
              }`}
          >
            <span
              className={`text-[10px] uppercase tracking-wider font-semibold ${method === m.id ? "text-primary" : "text-base-content/35"
                }`}
            >
              {m.label}
            </span>
          </button>
        ))}
      </div>

      {/* form */}
      <AnimatePresence mode="wait">
        <motion.div
          key="card"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col gap-4"
        >
          {/* fields */}
          <div className="form-control gap-1.5">
            <label className="text-[10px] uppercase tracking-wider text-base-content/38">
              Numéro de payement <span className="text-primary">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                inputMode="numeric"
                value={payForm.number ?? ""}
                onChange={(e) => set("number", e.target.value)}
                placeholder="0190000000"
                maxLength={10}
                className={`input input-bordered w-full bg-base-200 focus:outline-none text-sm rounded-xl h-11 font-mono tracking-widest placeholder:text-base-content/18 placeholder:font-sans placeholder:tracking-normal ${payErrors.number ? "border-error/60" : "border-primary/12 focus:border-primary/50"
                  }`}
              />
            </div>
            {payErrors.number && <p className="text-[10px] text-error">{payErrors.number}</p>}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// ─── Step 4 — Confirmation ────────────────────────────────────────────────────
function StepConfirmation({ ticket, qty }: { ticket: TicketCategory; qty: number }) {
  const [copied, setCopied] = useState(false);
  const ref = "EVT-2025-" + Math.floor(Math.random() * 9000 + 1000);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center text-center gap-6"
    >
      {/* Success animation */}
      <div className="relative">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.15, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="w-24 h-24 rounded-full bg-primary/10 border-2 border-primary/25 flex items-center justify-center shadow-2xl shadow-primary/15"
        >
          <Check size={40} className="text-primary" strokeWidth={2.5} />
        </motion.div>
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1.5, opacity: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="absolute inset-0 rounded-full border-2 border-primary/20"
        />
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 2, opacity: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="absolute inset-0 rounded-full border border-primary/10"
        />
      </div>

      <div>
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          <div className="badge badge-outline border-primary/25 text-primary text-[10px] uppercase tracking-[0.2em] py-2 px-5 gap-2 mb-3">
            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Réservation confirmée
          </div>
          <h2 className="font-display text-2xl font-bold text-base-content mb-1">
            C&apos;est tout bon,{" "}
            <span className="italic font-light text-primary">profitez bien !</span>
          </h2>
          <p className="text-sm text-base-content/42 max-w-sm leading-relaxed">
            Vos billets ont été envoyés par e-mail. Présentez le QR code à l&apos;entrée.
          </p>
        </motion.div>
      </div>

      {/* Ticket card */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
        className="w-full max-w-sm"
      >
        <div className="relative rounded-3xl overflow-hidden border border-primary/20 shadow-2xl shadow-primary/15">
          {/* Top section — event info */}
          <div className="bg-gradient-to-br from-primary/15 via-primary/8 to-transparent p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-xl overflow-hidden border border-primary/20 shrink-0">
                <Image
                  src={EVENT.image}
                  alt={EVENT.title}
                  width={48}
                  height={48}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="text-left">
                <p className="text-xs font-bold text-base-content line-clamp-1">{EVENT.title}</p>
                <p className="text-[10px] text-base-content/40 mt-0.5 line-clamp-1">{EVENT.subtitle}</p>
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2 text-[11px] text-base-content/50">
                <Calendar size={11} className="text-primary/50" />{EVENT.date} · {EVENT.time}
              </div>
              <div className="flex items-center gap-2 text-[11px] text-base-content/50">
                <MapPin size={11} className="text-primary/50" />{EVENT.location}
              </div>
            </div>
          </div>

          {/* Ticket divider */}
          <div className="relative h-0 flex items-center">
            <div className="absolute left-0 right-0 border-t border-dashed border-primary/15" />
            <div className="absolute -left-3 w-6 h-6 rounded-full bg-base-100 border border-primary/15" />
            <div className="absolute -right-3 w-6 h-6 rounded-full bg-base-100 border border-primary/15" />
          </div>

          {/* Bottom section — ticket details */}
          <div className="bg-base-200 p-5">
            <div className="grid grid-cols-3 gap-3 mb-4">
              {[
                { label: "Catégorie", value: ticket.name },
                { label: "Quantité", value: `×${qty}` },
                { label: "Total payé", value: `${Math.round(ticket.price * qty * 1.05)}€` },
              ].map(({ label, value }) => (
                <div key={label} className="text-center">
                  <div className="text-[9px] uppercase tracking-wider text-base-content/28 mb-0.5">{label}</div>
                  <div className="text-sm font-bold text-base-content">{value}</div>
                </div>
              ))}
            </div>

            {/* QR */}
            <div className="flex flex-col items-center gap-2">
              <div className="w-28 h-28 bg-white rounded-xl p-2 shadow-md">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=96x96&data=${ref}&bgcolor=ffffff&color=0d0d1a&margin=0`}
                  alt="QR Code"
                  className="w-full h-full"
                />
              </div>
              <div className="flex items-center gap-2 bg-primary/8 border border-primary/15 rounded-full px-3 py-1.5">
                <span className="font-mono text-xs text-primary font-bold tracking-widest">{ref}</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Main BookingPage ─────────────────────────────────────────────────────────
export default function BookingPage() {
  const [step, setStep] = useState(1);
  const [selectedTicket, setSelectedTicket] = useState("cat1");
  const [qty, setQty] = useState(2);
  const [loading, setLoading] = useState(false);
  const [contactForm, setContactForm] = useState<Record<string, string>>({});
  const [payForm, setPayForm] = useState<Record<string, string>>({});
  const [contactErrors, setContactErrors] = useState<Record<string, string>>({});
  const [payErrors, setPayErrors] = useState<Record<string, string>>({});

  const ticket = TICKET_CATEGORIES.find((t) => t.id === selectedTicket)!;
  const subtotal = ticket.price * qty;
  const commission = Math.round(subtotal * 0.05 * 100) / 100;
  const total = subtotal + commission;

  // Scroll top on step change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step]);

  const validateContact = () => {
    const e: Record<string, string> = {};
    if (!contactForm.firstName?.trim()) e.firstName = "Prénom requis";
    if (!contactForm.lastName?.trim()) e.lastName = "Nom requis";
    if (!contactForm.email?.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = "E-mail invalide";
    setContactErrors(e);
    return Object.keys(e).length === 0;
  };

  const validatePayment = () => {
    const e: Record<string, string> = {};
    const num = (payForm.number ?? "").replace(/\s/g, "");
    if (num.length !== 10) e.number = "Numéro invalide (10 chiffres)";
    setPayErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = () => {
    if (step === 2 && !validateContact()) return;
    if (step === 3) {
      if (!validatePayment()) return;
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setStep(4);
      }, 1800);
      return;
    }
    setStep((s) => Math.min(4, s + 1));
  };

  const canGoNext = step !== 1 || (selectedTicket && qty > 0);

  return (
    <div className="min-h-screen sm:px-20 lg:px-80 bg-base-100 pt-17">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* ── Top back link ── */}
        {step < 4 && (
          <Link
            href={`/evenements/${EVENT.id}`}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-base-content/35 hover:text-primary transition-colors duration-200 mb-7 group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform duration-200" />
            Retour à l&apos;événement
          </Link>
        )}

        <div className="">

          {/* ── LEFT — Form area ── */}
          <div className="lg:col-span-3">

            {/* Step progress */}
            {step < 4 && (
              <div className="flex items-center gap-0 mb-8">
                {STEPS.map((s, i) => {
                  const isDone = step > s.id;
                  const isActive = step === s.id;
                  const isLast = i === STEPS.length - 1;

                  return (
                    <div key={s.id} className="flex items-center flex-1 last:flex-none">
                      <div className="flex flex-col items-center gap-1.5">
                        <div
                          className={`w-9 h-9 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${isDone
                            ? "bg-primary border-primary"
                            : isActive
                              ? "bg-primary/10 border-primary shadow-lg shadow-primary/25"
                              : "bg-base-200 border-base-content/10"
                            }`}
                        >
                          {isDone ? (
                            <Check size={15} className="text-primary-content" strokeWidth={2.5} />
                          ) : (
                            <s.icon size={15} className={isActive ? "text-primary" : "text-base-content/20"} />
                          )}
                        </div>
                        <span
                          className={`text-[10px] uppercase tracking-wider font-semibold whitespace-nowrap ${isActive ? "text-primary" : isDone ? "text-base-content/45" : "text-base-content/20"
                            }`}
                        >
                          {s.label}
                        </span>
                      </div>

                      {!isLast && (
                        <div className="flex-1 h-px mx-2 mt-[-18px]">
                          <div
                            className={`h-full transition-all duration-500 ${step > s.id ? "bg-primary" : "bg-base-content/8"
                              }`}
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {/* Form steps */}
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: step < 4 ? 24 : 0, scale: step === 4 ? 0.98 : 1 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
              >
                {step === 1 && (
                  <StepTickets
                    selected={selectedTicket}
                    setSelected={setSelectedTicket}
                    qty={qty}
                    setQty={setQty}
                  />
                )}
                {step === 2 && (
                  <StepContact
                    form={contactForm}
                    setForm={setContactForm}
                    errors={contactErrors}
                  />
                )}
                {step === 3 && (
                  <StepPayment
                    payForm={payForm}
                    setPayForm={setPayForm}
                    payErrors={payErrors}
                  />
                )}
                {step === 4 && <StepConfirmation ticket={ticket} qty={qty} />}
              </motion.div>
            </AnimatePresence>

            {/* Navigation buttons */}
            {step < 4 && (
              <div className={`flex items-center gap-3 mt-8 ${step === 1 ? "justify-end" : "justify-between"}`}>
                {step > 1 && (
                  <button
                    onClick={() => setStep((s) => s - 1)}
                    className="btn btn-ghost rounded-full gap-2 text-xs uppercase tracking-wider text-base-content/40 hover:text-base-content/70 border border-primary/10 hover:border-primary/30 px-6"
                  >
                    <ArrowLeft size={13} /> Retour
                  </button>
                )}

                <button
                  onClick={handleNext}
                  disabled={!canGoNext || loading}
                  className="btn btn-primary rounded-full gap-2 text-xs uppercase tracking-widest font-semibold px-10 h-12 shadow-xl shadow-primary/25 disabled:opacity-50 ml-auto"
                >
                  {loading ? (
                    <>
                      <span className="loading loading-spinner loading-sm" />
                      Traitement en cours...
                    </>
                  ) : step === 3 ? (
                    <>
                      <Lock size={14} />
                      Payer {total.toFixed(0)}€
                    </>
                  ) : (
                    <>
                      Continuer
                      <ArrowRight size={14} />
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
