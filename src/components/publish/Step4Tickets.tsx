"use client";

import { motion, AnimatePresence } from "motion/react";
import { Plus, Trash2, Ticket, Info } from "lucide-react";

export interface TicketCategory {
  id: string;
  name: string;
  price: string;
  quantity: string;
  description: string;
}

interface Step4Props {
  data: {
    isFree: boolean;
    tickets: TicketCategory[];
    saleStart: string;
    saleEnd: string;
  };
  onChange: (field: string, value: boolean | string | TicketCategory[]) => void;
}

function genId() {
  return Math.random().toString(36).slice(2, 9);
}

export default function Step4Tickets({ data, onChange }: Step4Props) {
  const addTicket = () => {
    const newTicket: TicketCategory = {
      id: genId(),
      name: "",
      price: "",
      quantity: "",
      description: "",
    };
    onChange("tickets", [...data.tickets, newTicket]);
  };

  const updateTicket = (id: string, field: keyof TicketCategory, value: string) => {
    onChange(
      "tickets",
      data.tickets.map((t) => (t.id === id ? { ...t, [field]: value } : t))
    );
  };

  const removeTicket = (id: string) => {
    onChange(
      "tickets",
      data.tickets.filter((t) => t.id !== id)
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col gap-8"
    >
      {/* Free toggle */}
      <div className="flex items-center justify-between p-4 bg-base-300 rounded-2xl border border-primary/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
            <Ticket size={18} className="text-primary" />
          </div>
          <div>
            <div className="text-sm font-semibold text-base-content">Événement gratuit</div>
            <div className="text-[11px] text-base-content/35">Aucun billet payant requis</div>
          </div>
        </div>
        <input
          type="checkbox"
          className="toggle toggle-primary"
          checked={data.isFree}
          onChange={(e) => onChange("isFree", e.target.checked)}
        />
      </div>

      {/* Ticket categories */}
      <AnimatePresence>
        {!data.isFree && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35 }}
            className="flex flex-col gap-4 overflow-hidden"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-base-content/50">
                Catégories de billets <span className="text-primary">*</span>
              </h3>
              <button
                type="button"
                onClick={addTicket}
                className="btn btn-primary btn-xs rounded-full gap-1.5 text-[10px] uppercase tracking-wider shadow-md shadow-primary/20"
              >
                <Plus size={12} />
                Ajouter
              </button>
            </div>

            {data.tickets.length === 0 && (
              <div className="border-2 border-dashed border-primary/12 rounded-2xl p-8 flex flex-col items-center gap-3 bg-base-300">
                <Ticket size={28} className="text-base-content/15" />
                <p className="text-sm text-base-content/30 text-center">
                  Aucune catégorie de billet.<br />
                  <button
                    type="button"
                    onClick={addTicket}
                    className="text-primary hover:underline"
                  >
                    Créez votre première catégorie
                  </button>
                </p>
              </div>
            )}

            <AnimatePresence>
              {data.tickets.map((ticket, i) => (
                <motion.div
                  key={ticket.id}
                  initial={{ opacity: 0, y: -12, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="card bg-base-300 border border-primary/12 hover:border-primary/25 transition-colors duration-200"
                >
                  <div className="card-body p-5 gap-4">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-primary/15 border border-primary/20 flex items-center justify-center text-[10px] font-bold text-primary">
                          {i + 1}
                        </div>
                        <span className="text-[10px] uppercase tracking-widest text-base-content/30">
                          Catégorie #{i + 1}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeTicket(ticket.id)}
                        className="btn btn-ghost btn-xs text-error/40 hover:text-error rounded-full"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>

                    {/* Fields */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="form-control gap-1.5">
                        <label className="label-text text-[10px] uppercase tracking-wider text-base-content/35">
                          Nom du billet <span className="text-primary">*</span>
                        </label>
                        <input
                          type="text"
                          value={ticket.name}
                          onChange={(e) => updateTicket(ticket.id, "name", e.target.value)}
                          placeholder="Ex : Standard, VIP, Early Bird…"
                          className="input input-bordered input-sm bg-base-200 border-primary/15 focus:border-primary/50 focus:outline-none text-sm rounded-xl placeholder:text-base-content/20 h-10"
                        />
                      </div>

                      <div className="form-control flex flex-col gap-1.5">
                        <label className="label-text text-[10px] uppercase tracking-wider text-base-content/35">
                          Prix (€) <span className="text-primary">*</span>
                        </label>
                        <div className="join">
                          <span className="join-item bg-primary/10 border border-primary/20 px-3 flex items-center text-primary font-semibold text-sm rounded-l-xl">
                            €
                          </span>
                          <input
                            type="number"
                            min={0}
                            step={0.01}
                            value={ticket.price}
                            onChange={(e) => updateTicket(ticket.id, "price", e.target.value)}
                            placeholder="0.00"
                            className="input input-bordered input-sm join-item bg-base-200 border-primary/15 border-l-0 focus:border-primary/50 focus:outline-none text-sm flex-1 placeholder:text-base-content/20 h-10 rounded-r-xl"
                          />
                        </div>
                      </div>

                      <div className="form-control gap-1.5">
                        <label className="label-text text-[10px] uppercase tracking-wider text-base-content/35">
                          Quantité disponible <span className="text-primary">*</span>
                        </label>
                        <input
                          type="number"
                          min={1}
                          value={ticket.quantity}
                          onChange={(e) => updateTicket(ticket.id, "quantity", e.target.value)}
                          placeholder="100"
                          className="input input-bordered input-sm bg-base-200 border-primary/15 focus:border-primary/50 focus:outline-none text-sm rounded-xl placeholder:text-base-content/20 h-10"
                        />
                      </div>

                      <div className="form-control gap-1.5">
                        <label className="label-text text-[10px] uppercase tracking-wider text-base-content/35">
                          Description courte
                        </label>
                        <input
                          type="text"
                          value={ticket.description}
                          onChange={(e) => updateTicket(ticket.id, "description", e.target.value)}
                          placeholder="Accès général, places assises…"
                          className="input input-bordered input-sm bg-base-200 border-primary/15 focus:border-primary/50 focus:outline-none text-sm rounded-xl placeholder:text-base-content/20 h-10"
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="divider divider-neutral opacity-40 my-0" />

      {/* Sale period */}
      <div className="form-control gap-3">
        <h3 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-base-content/50">
          Période de vente
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="form-control gap-1.5">
            <label className="label-text text-[10px] uppercase tracking-wider text-base-content/35">
              Ouverture des ventes
            </label>
            <input
              type="date"
              value={data.saleStart}
              onChange={(e) => onChange("saleStart", e.target.value)}
              className="input input-bordered bg-base-300 border-primary/15 focus:border-primary/50 focus:outline-none text-sm rounded-xl h-11"
            />
          </div>
          <div className="form-control gap-1.5">
            <label className="label-text text-[10px] uppercase tracking-wider text-base-content/35">
              Clôture des ventes
            </label>
            <input
              type="date"
              value={data.saleEnd}
              onChange={(e) => onChange("saleEnd", e.target.value)}
              className="input input-bordered bg-base-300 border-primary/15 focus:border-primary/50 focus:outline-none text-sm rounded-xl h-11"
            />
          </div>
        </div>
      </div>

      {/* Commission info */}
      <div className="alert bg-primary/8 border border-primary/15 rounded-2xl p-4">
        <Info size={16} className="text-primary shrink-0" />
        <div className="text-xs text-base-content/50 leading-relaxed">
          <span className="font-semibold text-primary">Commission Event Place : 5%</span> sur chaque billet vendu.
          Aucun abonnement, aucun frais fixe. Virements automatiques sous 48h après chaque événement.
        </div>
      </div>
    </motion.div>
  );
}
