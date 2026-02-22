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

// ─── Seat map SVG (schematic) ─────────────────────────────────────────────────
function SeatMap({ selectedCategory }: { selectedCategory: string }) {
  const rows = ["A", "B", "C", "D", "E", "F", "G", "H", "J", "K"];
  const seatsPerRow = 14;

  const getSeatClass = (row: string, seat: number) => {
    const isVip = ["A", "B"].includes(row) && seat >= 5 && seat <= 10;
    const isCat1 = ["C", "D", "E"].includes(row) || (["A", "B"].includes(row) && !isVip);
    const isOccupied = Math.random() < 0.3;
    const isSelected = selectedCategory === "vip" && isVip && !isOccupied;
    const isHighlighted =
      (selectedCategory === "vip" && isVip) ||
      (selectedCategory === "cat1" && isCat1) ||
      (selectedCategory === "standard" && !isVip && !isCat1);

    if (isOccupied) return "fill-base-content/15 cursor-not-allowed";
    if (isHighlighted) {
      if (selectedCategory === "vip") return "fill-accent/70 hover:fill-accent cursor-pointer transition-colors";
      if (selectedCategory === "cat1") return "fill-primary/60 hover:fill-primary cursor-pointer transition-colors";
      return "fill-base-content/30 hover:fill-base-content/50 cursor-pointer transition-colors";
    }
    return "fill-base-content/8 cursor-not-allowed";
  };

  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[340px]">
        {/* Stage */}
        <div className="relative mb-6">
          <div className="h-10 rounded-xl bg-gradient-to-r from-primary/20 via-primary/35 to-primary/20 border border-primary/25 flex items-center justify-center">
            <span className="text-[10px] uppercase tracking-[0.25em] text-primary font-semibold">Scène</span>
          </div>
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-3/4 h-3 bg-gradient-to-b from-primary/10 to-transparent rounded-b-full blur-sm" />
        </div>

        {/* Seats */}
        <div className="flex flex-col gap-1.5">
          {rows.map((row) => (
            <div key={row} className="flex items-center gap-2">
              <span className="text-[9px] uppercase font-mono text-base-content/20 w-3 text-center shrink-0">{row}</span>
              <div className="flex gap-1 flex-1 justify-center">
                {Array.from({ length: seatsPerRow }, (_, i) => i + 1).map((seat) => {
                  const cls = getSeatClass(row, seat);
                  const gap = seat === 7 ? "ml-3" : "";
                  return (
                    <div
                      key={seat}
                      className={`w-4 h-3.5 rounded-sm ${cls} ${gap}`}
                      title={`${row}${seat}`}
                    />
                  );
                })}
              </div>
              <span className="text-[9px] uppercase font-mono text-base-content/20 w-3 text-center shrink-0">{row}</span>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-5 mt-5 flex-wrap">
          {[
            { cls: "bg-accent/70", label: "VIP" },
            { cls: "bg-primary/60", label: "Catégorie 1" },
            { cls: "bg-base-content/30", label: "Standard" },
            { cls: "bg-base-content/12", label: "Occupé" },
          ].map(({ cls, label }) => (
            <div key={label} className="flex items-center gap-1.5">
              <div className={`w-3.5 h-2.5 rounded-sm ${cls}`} />
              <span className="text-[10px] text-base-content/35 uppercase tracking-wider">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

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
                className={`text-left rounded-2xl border-2 p-5 transition-all duration-250 relative overflow-hidden ${
                  isSelected
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
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 transition-all duration-200 ${
                      isSelected ? "border-primary bg-primary" : "border-base-content/20 bg-transparent"
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
                          className={`flex items-center gap-1 text-[10px] px-2 py-1 rounded-lg border ${
                            isSelected
                              ? "border-primary/20 bg-primary/8 text-primary/70"
                              : "border-base-content/8 bg-base-300 text-base-content/35"
                          }`}
                        >
                          <Check size={9} className={isSelected ? "text-primary" : "text-base-content/25"} />
                          {p}
                        </span>
                      ))}
                    </div>

                    {/* Availability bar */}
                    <div className="mt-3">
                      <div className="h-1 bg-base-300 rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full rounded-full ${pct > 50 ? "bg-success/50" : pct > 20 ? "bg-warning/60" : "bg-error/60"}`}
                          initial={{ width: 0 }}
                          animate={{ width: `${pct}%` }}
                          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        />
                      </div>
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

      {/* Seat map toggle */}
      <div>
        <button
          onClick={() => setShowMap(!showMap)}
          className="flex items-center gap-2 text-xs text-primary/60 hover:text-primary transition-colors uppercase tracking-wider font-semibold mb-3"
        >
          <MapPin size={13} />
          {showMap ? "Masquer" : "Voir"} le plan de salle
          <ChevronDown
            size={13}
            className={`transition-transform duration-300 ${showMap ? "rotate-180" : ""}`}
          />
        </button>

        <AnimatePresence>
          {showMap && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35 }}
              className="overflow-hidden"
            >
              <div className="card bg-base-200 border border-primary/10 p-5">
                <SeatMap selectedCategory={selected} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
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
    { key: "firstName", label: "Prénom", type: "text", ph: "Sophie", icon: User, half: true },
    { key: "lastName", label: "Nom", type: "text", ph: "Martin", icon: User, half: true },
    { key: "email", label: "Adresse e-mail", type: "email", ph: "sophie@exemple.fr", icon: Mail, half: false },
    { key: "phone", label: "Téléphone (optionnel)", type: "tel", ph: "+33 6 12 34 56 78", icon: Phone, half: false },
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
        {fields.map(({ key, label, type, ph, icon: Icon, half }) => (
          <div key={key} className={`form-control gap-1.5 ${half ? "col-span-1" : "col-span-2"}`}>
            <label className="text-[10px] uppercase tracking-wider text-base-content/38">
              {label}
              {key !== "phone" && <span className="text-primary ml-0.5">*</span>}
            </label>
            <div className="relative">
              <Icon
                size={13}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-base-content/22 pointer-events-none"
              />
              <input
                type={type}
                value={form[key] ?? ""}
                onChange={(e) => set(key, e.target.value)}
                placeholder={ph}
                className={`input input-bordered w-full pl-9 bg-base-200 focus:outline-none text-sm rounded-xl h-11 placeholder:text-base-content/18 transition-colors duration-200 ${
                  errors[key]
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

      {/* Newsletter opt-in */}
      <label className="flex items-start gap-3 cursor-pointer card bg-base-200 border border-primary/8 hover:border-primary/20 p-4 transition-colors duration-200">
        <input type="checkbox" className="checkbox checkbox-primary checkbox-sm mt-0.5 rounded-lg shrink-0" defaultChecked />
        <div>
          <span className="text-sm text-base-content/65 font-medium">Recevoir des alertes événements</span>
          <p className="text-xs text-base-content/35 mt-0.5 leading-relaxed">
            Sélection hebdomadaire personnalisée selon vos préférences. Désabonnement en un clic.
          </p>
        </div>
      </label>

      {/* RGPD note */}
      <div className="flex items-start gap-2.5 text-[11px] text-base-content/30 leading-relaxed">
        <Info size={12} className="text-primary/30 mt-0.5 shrink-0" />
        <span>
          Vos données sont traitées par Eventify SAS uniquement pour la gestion de votre réservation.{" "}
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
  const [method, setMethod] = useState<"card" | "paypal" | "apple">("card");
  const [showCVV, setShowCVV] = useState(false);
  const set = (k: string, v: string) => setPayForm({ ...payForm, [k]: v });

  // Format card number with spaces
  const formatCard = (val: string) =>
    val
      .replace(/\D/g, "")
      .slice(0, 16)
      .replace(/(.{4})/g, "$1 ")
      .trim();

  const formatExpiry = (val: string) => {
    const clean = val.replace(/\D/g, "").slice(0, 4);
    if (clean.length > 2) return clean.slice(0, 2) + "/" + clean.slice(2);
    return clean;
  };

  const PAYMENT_METHODS = [
    { id: "card", label: "Carte bancaire", emoji: "💳" },
    { id: "paypal", label: "PayPal", emoji: "🅿️" },
    { id: "apple", label: "Apple Pay", emoji: "🍎" },
  ] as const;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="font-display text-xl font-bold text-base-content mb-1">
          Mode de <span className="italic font-light text-primary">paiement</span>
        </h2>
        <p className="text-xs text-base-content/38">Paiement 100% sécurisé — chiffrement SSL 256 bits.</p>
      </div>

      {/* Method selector */}
      <div className="flex gap-2">
        {PAYMENT_METHODS.map((m) => (
          <button
            key={m.id}
            onClick={() => setMethod(m.id)}
            className={`flex-1 flex flex-col items-center gap-1.5 py-3 px-2 rounded-2xl border-2 text-center transition-all duration-200 ${
              method === m.id
                ? "border-primary bg-primary/8 shadow-md shadow-primary/10"
                : "border-primary/10 bg-base-200 hover:border-primary/25"
            }`}
          >
            <span className="text-xl">{m.emoji}</span>
            <span
              className={`text-[10px] uppercase tracking-wider font-semibold ${
                method === m.id ? "text-primary" : "text-base-content/35"
              }`}
            >
              {m.label}
            </span>
          </button>
        ))}
      </div>

      {/* Card form */}
      <AnimatePresence mode="wait">
        {method === "card" && (
          <motion.div
            key="card"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col gap-4"
          >
            {/* Visual card preview */}
            <div
              className="relative h-40 rounded-2xl overflow-hidden p-5 flex flex-col justify-between"
              style={{
                background:
                  "linear-gradient(135deg, #1e1b4b 0%, #4c1d95 50%, #7C3AED 100%)",
              }}
            >
              <div className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: "radial-gradient(circle at 80% 20%, rgba(255,255,255,0.15) 0%, transparent 60%)",
                }}
              />
              {/* Chip */}
              <div className="flex items-center justify-between relative z-10">
                <div className="w-9 h-7 rounded-md bg-gradient-to-br from-yellow-300 to-yellow-500 flex items-center justify-center shadow-md">
                  <div className="w-5 h-3.5 rounded-sm border border-yellow-600/40 bg-yellow-400/60" />
                </div>
                <div className="flex gap-1">
                  {["●", "●", "●"].map((d, i) => (
                    <div key={i} className="w-4 h-4 rounded-full bg-white/15" />
                  ))}
                  <div className="w-4 h-4 rounded-full bg-white/35" />
                </div>
              </div>

              {/* Number */}
              <div className="relative z-10">
                <div className="font-mono text-base text-white/90 tracking-widest mb-2">
                  {payForm.cardNumber
                    ? payForm.cardNumber
                    : "•••• •••• •••• ••••"}
                </div>
                <div className="flex items-end justify-between">
                  <div>
                    <div className="text-[9px] text-white/35 uppercase tracking-wider mb-0.5">Titulaire</div>
                    <div className="text-xs text-white/80 font-semibold uppercase tracking-wider">
                      {payForm.cardName || "NOM PRÉNOM"}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[9px] text-white/35 uppercase tracking-wider mb-0.5">Expire</div>
                    <div className="text-xs text-white/80 font-mono">
                      {payForm.expiry || "MM/YY"}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card fields */}
            <div className="form-control gap-1.5">
              <label className="text-[10px] uppercase tracking-wider text-base-content/38">
                Numéro de carte <span className="text-primary">*</span>
              </label>
              <div className="relative">
                <CreditCard size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-base-content/22 pointer-events-none" />
                <input
                  type="text"
                  inputMode="numeric"
                  value={payForm.cardNumber ?? ""}
                  onChange={(e) => set("cardNumber", formatCard(e.target.value))}
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                  className={`input input-bordered w-full pl-9 bg-base-200 focus:outline-none text-sm rounded-xl h-11 font-mono tracking-widest placeholder:text-base-content/18 placeholder:font-sans placeholder:tracking-normal ${
                    payErrors.cardNumber ? "border-error/60" : "border-primary/12 focus:border-primary/50"
                  }`}
                />
              </div>
              {payErrors.cardNumber && <p className="text-[10px] text-error">{payErrors.cardNumber}</p>}
            </div>

            <div className="form-control gap-1.5">
              <label className="text-[10px] uppercase tracking-wider text-base-content/38">
                Titulaire de la carte <span className="text-primary">*</span>
              </label>
              <input
                type="text"
                value={payForm.cardName ?? ""}
                onChange={(e) => set("cardName", e.target.value.toUpperCase())}
                placeholder="SOPHIE MARTIN"
                className={`input input-bordered w-full bg-base-200 focus:outline-none text-sm rounded-xl h-11 uppercase tracking-wider placeholder:text-base-content/18 placeholder:normal-case placeholder:tracking-normal ${
                  payErrors.cardName ? "border-error/60" : "border-primary/12 focus:border-primary/50"
                }`}
              />
              {payErrors.cardName && <p className="text-[10px] text-error">{payErrors.cardName}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="form-control gap-1.5">
                <label className="text-[10px] uppercase tracking-wider text-base-content/38">
                  Date d&apos;expiration <span className="text-primary">*</span>
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  value={payForm.expiry ?? ""}
                  onChange={(e) => set("expiry", formatExpiry(e.target.value))}
                  placeholder="MM/AA"
                  maxLength={5}
                  className={`input input-bordered w-full bg-base-200 focus:outline-none text-sm rounded-xl h-11 font-mono tracking-widest placeholder:text-base-content/18 placeholder:font-sans placeholder:tracking-normal ${
                    payErrors.expiry ? "border-error/60" : "border-primary/12 focus:border-primary/50"
                  }`}
                />
                {payErrors.expiry && <p className="text-[10px] text-error">{payErrors.expiry}</p>}
              </div>

              <div className="form-control gap-1.5">
                <label className="text-[10px] uppercase tracking-wider text-base-content/38">
                  CVV / CVC <span className="text-primary">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showCVV ? "text" : "password"}
                    inputMode="numeric"
                    value={payForm.cvv ?? ""}
                    onChange={(e) => set("cvv", e.target.value.replace(/\D/g, "").slice(0, 4))}
                    placeholder="•••"
                    maxLength={4}
                    className={`input input-bordered w-full pr-10 bg-base-200 focus:outline-none text-sm rounded-xl h-11 font-mono tracking-widest placeholder:font-sans placeholder:tracking-normal ${
                      payErrors.cvv ? "border-error/60" : "border-primary/12 focus:border-primary/50"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowCVV(!showCVV)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/25 hover:text-primary transition-colors"
                  >
                    {showCVV ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
                {payErrors.cvv && <p className="text-[10px] text-error">{payErrors.cvv}</p>}
              </div>
            </div>

            {/* Save card */}
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" className="checkbox checkbox-primary checkbox-sm rounded-lg" />
              <span className="text-xs text-base-content/45">Sauvegarder cette carte pour mes prochains achats</span>
            </label>
          </motion.div>
        )}

        {(method === "paypal" || method === "apple") && (
          <motion.div
            key={method}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="card bg-base-200 border border-primary/10 p-8 text-center"
          >
            <div className="text-4xl mb-3">
              {method === "paypal" ? "🅿️" : "🍎"}
            </div>
            <p className="text-sm text-base-content/50 mb-5">
              Vous serez redirigé vers{" "}
              {method === "paypal" ? "PayPal" : "Apple Pay"} pour finaliser votre paiement.
            </p>
            <div className="badge badge-outline border-success/25 text-success text-[10px] uppercase tracking-wider py-2 px-4 gap-1.5">
              <Shield size={10} /> Paiement sécurisé
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Security badges */}
      <div className="flex items-center justify-center gap-6 py-2">
        {[
          { icon: Lock, label: "SSL 256 bits" },
          { icon: Shield, label: "3D Secure" },
          { icon: CreditCard, label: "PCI-DSS" },
        ].map(({ icon: Icon, label }) => (
          <div key={label} className="flex items-center gap-1.5 text-base-content/25">
            <Icon size={12} className="text-success/50" />
            <span className="text-[10px] uppercase tracking-wider">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Step 4 — Confirmation ────────────────────────────────────────────────────
function StepConfirmation({ ticket, qty }: { ticket: TicketCategory; qty: number }) {
  const [copied, setCopied] = useState(false);
  const ref = "EVT-2025-" + Math.floor(Math.random() * 9000 + 1000);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

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
          className="w-24 h-24 rounded-full bg-success/10 border-2 border-success/25 flex items-center justify-center shadow-2xl shadow-success/15"
        >
          <Check size={40} className="text-success" strokeWidth={2.5} />
        </motion.div>
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1.5, opacity: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="absolute inset-0 rounded-full border-2 border-success/20"
        />
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 2, opacity: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="absolute inset-0 rounded-full border border-success/10"
        />
      </div>

      <div>
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          <div className="badge badge-outline border-success/25 text-success text-[10px] uppercase tracking-[0.2em] py-2 px-5 gap-2 mb-3">
            <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
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
                <button
                  onClick={handleCopy}
                  className="text-primary/50 hover:text-primary transition-colors"
                >
                  {copied ? <Check size={11} className="text-success" /> : <QrCode size={11} />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="flex gap-3 w-full max-w-sm"
      >
        <button className="btn btn-outline border-primary/20 hover:border-primary/50 hover:bg-primary/8 rounded-full flex-1 gap-2 text-[10px] uppercase tracking-wider text-primary">
          <Download size={13} />
          PDF
        </button>
        <Link href="/profile?tab=tickets" className="btn btn-primary rounded-full flex-1 gap-2 text-[10px] uppercase tracking-widest shadow-lg shadow-primary/25">
          <Ticket size={13} />
          Mes billets
        </Link>
      </motion.div>

      {/* What next */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="w-full max-w-sm"
      >
        <div className="card bg-base-200 border border-primary/8 p-4 text-left">
          <p className="text-[10px] uppercase tracking-[0.2em] text-base-content/28 mb-3">Prochaines étapes</p>
          {[
            { n: 1, text: "Vérifiez vos e-mails — vos billets sont en route", done: true },
            { n: 2, text: "Ajoutez la date à votre agenda", done: false },
            { n: 3, text: "Arrivez 15 min avant — ouverture des portes à 19h45", done: false },
          ].map(({ n, text, done }) => (
            <div key={n} className="flex items-start gap-3 py-2.5 border-b border-primary/6 last:border-0">
              <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5 ${done ? "bg-success/15 border border-success/25 text-success" : "bg-primary/10 border border-primary/20 text-primary"}`}>
                {done ? <Check size={10} /> : n}
              </div>
              <p className="text-xs text-base-content/45 leading-snug">{text}</p>
            </div>
          ))}
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
    const num = (payForm.cardNumber ?? "").replace(/\s/g, "");
    if (num.length !== 16) e.cardNumber = "Numéro invalide (16 chiffres)";
    if (!payForm.cardName?.trim()) e.cardName = "Nom requis";
    const exp = payForm.expiry ?? "";
    if (!exp.match(/^\d{2}\/\d{2}$/)) e.expiry = "Format MM/AA";
    if ((payForm.cvv ?? "").length < 3) e.cvv = "CVV invalide";
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
    <div className="min-h-screen bg-base-100 pt-[68px]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

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

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">

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
                          className={`w-9 h-9 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                            isDone
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
                          className={`text-[10px] uppercase tracking-wider font-semibold whitespace-nowrap ${
                            isActive ? "text-primary" : isDone ? "text-base-content/45" : "text-base-content/20"
                          }`}
                        >
                          {s.label}
                        </span>
                      </div>

                      {!isLast && (
                        <div className="flex-1 h-px mx-2 mt-[-18px]">
                          <div
                            className={`h-full transition-all duration-500 ${
                              step > s.id ? "bg-primary" : "bg-base-content/8"
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

          {/* ── RIGHT — Order summary ── */}
          {step < 4 && (
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.5 }}
                className="sticky top-24 flex flex-col gap-4"
              >
                {/* Event card */}
                <div className="card bg-base-200 border border-primary/10 overflow-hidden">
                  <figure className="relative h-36 overflow-hidden">
                    <Image
                      src={EVENT.image}
                      alt={EVENT.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 40vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-base-200/90 to-transparent" />
                    <div className="absolute top-3 left-3">
                      <span className="badge bg-base-100/80 backdrop-blur-sm border-primary/18 text-primary text-[9px] uppercase tracking-wider py-1.5 px-2">
                        {EVENT.emoji} {EVENT.category}
                      </span>
                    </div>
                    <div className="absolute bottom-3 left-3 right-3">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={10} className="text-warning fill-warning" />
                        ))}
                        <span className="text-[10px] text-white/60 ml-1">{EVENT.rating} · {EVENT.reviews} avis</span>
                      </div>
                    </div>
                  </figure>

                  <div className="card-body p-4 gap-2">
                    <h3 className="font-display text-sm font-bold text-base-content leading-snug">{EVENT.title}</h3>
                    <p className="text-[11px] italic text-primary/55">{EVENT.subtitle}</p>
                    <div className="flex flex-col gap-1.5 mt-1">
                      <div className="flex items-center gap-2 text-[11px] text-base-content/40">
                        <Calendar size={11} className="text-primary/40" />
                        {EVENT.date} · {EVENT.time}
                      </div>
                      <div className="flex items-center gap-2 text-[11px] text-base-content/40">
                        <Clock size={11} className="text-primary/40" />
                        Durée ~2h15 · Fin vers {EVENT.endTime}
                      </div>
                      <div className="flex items-center gap-2 text-[11px] text-base-content/40">
                        <MapPin size={11} className="text-primary/40" />
                        {EVENT.location}, {EVENT.address}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Order breakdown */}
                <div className="card bg-base-200 border border-primary/10 p-5">
                  <h4 className="text-[10px] uppercase tracking-[0.22em] text-base-content/35 mb-4">
                    Récapitulatif
                  </h4>

                  {/* Ticket summary */}
                  <div className="flex items-center gap-3 mb-4 pb-4 border-b border-primary/8">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                      <Ticket size={16} className="text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-base-content">{ticket.name}</div>
                      <div className="text-[10px] text-base-content/35 mt-0.5">{qty} billet{qty > 1 ? "s" : ""} × {ticket.price}€</div>
                    </div>
                    <div className="font-display font-bold text-primary shrink-0">{subtotal}€</div>
                  </div>

                  {/* Breakdown rows */}
                  <div className="flex flex-col gap-2.5 mb-4 pb-4 border-b border-primary/8">
                    <div className="flex justify-between text-xs text-base-content/45">
                      <span>Sous-total</span>
                      <span>{subtotal}€</span>
                    </div>
                    <div className="flex justify-between text-xs text-base-content/45">
                      <span className="flex items-center gap-1">
                        Frais de service (5%)
                        <span className="tooltip tooltip-right" data-tip="Couvre les frais de traitement et de sécurisation">
                          <Info size={10} className="text-base-content/25 cursor-help" />
                        </span>
                      </span>
                      <span>{commission}€</span>
                    </div>
                  </div>

                  {/* Total */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-base-content">Total TTC</span>
                    <span className="font-display text-2xl font-bold text-primary">{total.toFixed(0)}€</span>
                  </div>
                </div>

                {/* Guarantees */}
                <div className="flex flex-col gap-2">
                  {[
                    { icon: Shield, text: "Remboursement garanti jusqu'à 48h avant" },
                    { icon: Lock, text: "Paiement 100% sécurisé — SSL 256 bits" },
                    { icon: Zap, text: "Billets instantanés par e-mail" },
                  ].map(({ icon: Icon, text }) => (
                    <div key={text} className="flex items-center gap-2.5 text-[11px] text-base-content/35">
                      <Icon size={12} className="text-success/50 shrink-0" />
                      {text}
                    </div>
                  ))}
                </div>

                {/* Promo code */}
                <details className="group">
                  <summary className="flex items-center gap-2 text-[11px] text-primary/50 hover:text-primary cursor-pointer transition-colors uppercase tracking-wider list-none select-none">
                    <span>Vous avez un code promo ?</span>
                    <ChevronRight size={12} className="group-open:rotate-90 transition-transform duration-200" />
                  </summary>
                  <div className="mt-3 flex gap-2">
                    <input
                      type="text"
                      placeholder="Code promo"
                      className="input input-bordered input-sm flex-1 bg-base-300 border-primary/12 focus:border-primary/50 focus:outline-none text-sm rounded-xl h-10 uppercase tracking-wider placeholder:normal-case placeholder:tracking-normal"
                    />
                    <button className="btn btn-sm btn-outline border-primary/20 hover:border-primary/50 hover:bg-primary/8 rounded-xl text-primary text-xs uppercase tracking-wider px-4">
                      OK
                    </button>
                  </div>
                </details>
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
