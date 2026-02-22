"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Ticket, Shield, ChevronDown, Check, Calendar, Clock, ArrowRight, Lock } from "lucide-react";

interface TicketType {
  id: string;
  name: string;
  price: number;
  available: number;
}

interface Props {
  tickets: TicketType[];
  spotsLeft: number;
  date: string;
  time: string;
}

export default function EventTicketPanel({ tickets, spotsLeft, date, time }: Props) {
  const [selected, setSelected] = useState<string>(tickets[0].id);
  const [qty, setQty] = useState(1);
  const [step, setStep] = useState<"select" | "confirm" | "success">("select");

  const currentTicket = tickets.find(t => t.id === selected)!;
  const subtotal = currentTicket.price * qty;
  const fee = Math.round(subtotal * 0.05 * 100) / 100;
  const total = subtotal + fee;

  const handleBook = () => {
    setStep("confirm");
  };

  const handleConfirm = () => {
    setStep("success");
  };

  if (step === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="card bg-base-200 border border-primary/20 shadow-2xl shadow-primary/10"
      >
        <div className="card-body p-6 items-center text-center gap-4">
          <div className="w-16 h-16 rounded-full bg-success/10 border border-success/25 flex items-center justify-center">
            <Check size={28} className="text-success" />
          </div>
          <div>
            <h3 className="font-display text-xl font-bold text-base-content mb-1">Réservation confirmée !</h3>
            <p className="text-xs text-base-content/40">Votre billet a été envoyé par e-mail.</p>
          </div>
          <div className="w-full p-3 bg-base-300 rounded-xl text-center">
            <div className="text-[10px] uppercase tracking-widest text-base-content/30 mb-1">Référence</div>
            <div className="font-mono text-sm font-bold text-primary">#EVT-9999-A1</div>
          </div>
          <button onClick={() => setStep("select")} className="btn btn-ghost btn-sm rounded-full text-xs text-base-content/30">
            Nouvelle réservation
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="card bg-base-200 border border-primary/15 shadow-2xl shadow-black/20"
    >
      <div className="card-body p-6 gap-5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Ticket size={16} className="text-primary" />
            <h3 className="font-display text-lg font-bold text-base-content">Billetterie</h3>
          </div>
          <div className="flex items-center gap-1 text-success text-xs font-medium">
            <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
            {spotsLeft} places
          </div>
        </div>

        {/* Date reminder */}
        <div className="flex items-center gap-3 p-3 bg-base-300 rounded-xl border border-primary/8">
          <Calendar size={14} className="text-primary/60 shrink-0" />
          <div>
            <div className="text-xs font-semibold text-base-content">{date}</div>
            <div className="flex items-center gap-1 text-[11px] text-base-content/40 mt-0.5">
              <Clock size={10} />
              {time}
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {step === "select" && (
            <motion.div
              key="select"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col gap-4"
            >
              {/* Ticket type selector */}
              <div className="form-control gap-2">
                <label className="label-text text-[10px] uppercase tracking-[0.2em] text-base-content/40 font-semibold">
                  Catégorie de billet
                </label>
                <div className="flex flex-col gap-2">
                  {tickets.map(t => (
                    <button
                      key={t.id}
                      onClick={() => setSelected(t.id)}
                      className={`flex items-center justify-between p-3 rounded-xl border text-left transition-all duration-200 ${
                        selected === t.id
                          ? "border-primary bg-primary/10"
                          : "border-primary/10 bg-base-300 hover:border-primary/30"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                          selected === t.id ? "border-primary bg-primary" : "border-base-content/20"
                        }`}>
                          {selected === t.id && <Check size={9} className="text-primary-content" />}
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-base-content">{t.name}</div>
                          <div className="text-[10px] text-base-content/30">{t.available} disponibles</div>
                        </div>
                      </div>
                      <span className="font-bold text-primary text-sm">{t.price}€</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="form-control gap-2">
                <label className="label-text text-[10px] uppercase tracking-[0.2em] text-base-content/40 font-semibold">
                  Quantité
                </label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQty(q => Math.max(1, q - 1))}
                    className="btn btn-circle btn-sm bg-base-300 border border-primary/15 hover:border-primary/40 hover:bg-primary/10 text-base-content font-bold"
                  >
                    −
                  </button>
                  <span className="text-lg font-bold text-base-content w-8 text-center">{qty}</span>
                  <button
                    onClick={() => setQty(q => Math.min(8, q + 1))}
                    className="btn btn-circle btn-sm bg-base-300 border border-primary/15 hover:border-primary/40 hover:bg-primary/10 text-base-content font-bold"
                  >
                    +
                  </button>
                  <span className="text-xs text-base-content/30 ml-1">max 8</span>
                </div>
              </div>

              {/* Price breakdown */}
              <div className="flex flex-col gap-2 p-3 bg-base-300 rounded-xl border border-primary/8">
                <div className="flex justify-between text-xs text-base-content/50">
                  <span>{currentTicket.price}€ × {qty}</span>
                  <span>{subtotal}€</span>
                </div>
                <div className="flex justify-between text-xs text-base-content/40">
                  <span>Frais de service (5%)</span>
                  <span>{fee}€</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-base-content border-t border-primary/10 pt-2 mt-1">
                  <span>Total</span>
                  <span className="text-primary">{total.toFixed(2)}€</span>
                </div>
              </div>

              {/* CTA */}
              <button
                onClick={handleBook}
                className="btn btn-primary w-full rounded-xl gap-2 text-xs uppercase tracking-widest font-semibold h-12 shadow-lg shadow-primary/30"
              >
                <Ticket size={15} />
                Réserver — {total.toFixed(2)}€
              </button>
            </motion.div>
          )}

          {step === "confirm" && (
            <motion.div
              key="confirm"
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              className="flex flex-col gap-4"
            >
              <div className="p-4 bg-base-300 rounded-xl border border-primary/10 flex flex-col gap-2">
                <div className="text-[10px] uppercase tracking-widest text-base-content/30 mb-1">Récapitulatif</div>
                <div className="flex justify-between text-xs">
                  <span className="text-base-content/50">{currentTicket.name}</span>
                  <span className="text-base-content">× {qty}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-base-content border-t border-primary/10 pt-2">
                  <span>Total TTC</span>
                  <span className="text-primary">{total.toFixed(2)}€</span>
                </div>
              </div>

              {/* Payment form minimal */}
              <div className="flex flex-col gap-3">
                <div className="form-control gap-1.5">
                  <label className="label-text text-[10px] uppercase tracking-[0.2em] text-base-content/35 font-semibold">Numéro de carte</label>
                  <input type="text" placeholder="•••• •••• •••• ••••" className="input input-bordered bg-base-300 border-primary/15 focus:border-primary/50 focus:outline-none text-sm rounded-xl h-11 placeholder:text-base-content/20" />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="form-control gap-1.5">
                    <label className="label-text text-[10px] uppercase tracking-[0.2em] text-base-content/35 font-semibold">Expiration</label>
                    <input type="text" placeholder="MM / AA" className="input input-bordered bg-base-300 border-primary/15 focus:border-primary/50 focus:outline-none text-sm rounded-xl h-11 placeholder:text-base-content/20" />
                  </div>
                  <div className="form-control gap-1.5">
                    <label className="label-text text-[10px] uppercase tracking-[0.2em] text-base-content/35 font-semibold">CVV</label>
                    <input type="text" placeholder="•••" className="input input-bordered bg-base-300 border-primary/15 focus:border-primary/50 focus:outline-none text-sm rounded-xl h-11 placeholder:text-base-content/20" />
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setStep("select")}
                  className="btn btn-ghost btn-sm rounded-xl border border-base-content/10 flex-none text-xs text-base-content/40"
                >
                  ←
                </button>
                <button
                  onClick={handleConfirm}
                  className="btn btn-primary flex-1 rounded-xl gap-2 text-xs uppercase tracking-widest font-semibold shadow-lg shadow-primary/25"
                >
                  <Lock size={13} />
                  Payer {total.toFixed(2)}€
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Trust badges */}
        <div className="flex items-center justify-center gap-3 pt-2 border-t border-primary/8">
          <div className="flex items-center gap-1 text-base-content/25">
            <Shield size={11} className="text-success/50" />
            <span className="text-[10px] uppercase tracking-wider">Paiement sécurisé</span>
          </div>
          <span className="text-base-content/15">·</span>
          <div className="flex items-center gap-1 text-base-content/25">
            <Check size={11} className="text-primary/40" />
            <span className="text-[10px] uppercase tracking-wider">Remboursable</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
