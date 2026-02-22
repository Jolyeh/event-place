"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Ticket, Shield, ChevronDown, Check, Calendar, Clock, ArrowRight, Lock } from "lucide-react";
import Link from "next/link";

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

  const currentTicket = tickets.find(t => t.id === selected)!;
  const subtotal = currentTicket.price * qty;
  const fee = Math.round(subtotal * 0.05 * 100) / 100;
  const total = subtotal + fee;

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
                    className={`flex items-center justify-between p-3 rounded-xl border text-left transition-all duration-200 ${selected === t.id
                        ? "border-primary bg-primary/10"
                        : "border-primary/10 bg-base-300 hover:border-primary/30"
                      }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${selected === t.id ? "border-primary bg-primary" : "border-base-content/20"
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
            <Link
              href={`/reserver/${selected}`}
              className="btn btn-primary w-full rounded-xl gap-2 text-xs uppercase tracking-widest font-semibold h-12 shadow-lg shadow-primary/30"
            >
              <Ticket size={15} />
              Réserver — {total.toFixed(2)}€
            </Link>
          </motion.div>
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
