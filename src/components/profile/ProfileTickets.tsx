"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { QrCode, Download, MapPin, Calendar, ChevronRight, Clock } from "lucide-react";

const tickets = [
  {
    id: 1,
    title: "Orchestre Philharmonique de Paris",
    subtitle: "Soirée Beethoven",
    date: "15 Mars 2025",
    time: "20h30",
    location: "Philharmonie de Paris",
    image: "https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=300&q=70",
    category: "Concert",
    price: "75€",
    status: "upcoming",
    ref: "EVT-8821-A2",
    seat: "Orchestre · Rang D · Siège 14",
  },
  {
    id: 2,
    title: "Summit IA & Innovation 2025",
    date: "22 Mars 2025",
    time: "09h00",
    location: "Paris La Défense",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=300&q=70",
    category: "Conférence",
    price: "180€",
    status: "upcoming",
    ref: "EVT-9045-B1",
    seat: "Accès complet · 2 jours",
  },
  {
    id: 3,
    title: "Festival Jazz de Paris 2024",
    date: "12 Nov 2024",
    time: "19h00",
    location: "Théâtre du Châtelet",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&q=70",
    category: "Concert",
    price: "55€",
    status: "past",
    ref: "EVT-7210-C3",
    seat: "Balcon · Rang B · Siège 22",
  },
  {
    id: 4,
    title: "Lumière Perpétuelle — Vernissage",
    date: "5 Oct 2024",
    time: "18h00",
    location: "Palais de Tokyo",
    image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=300&q=70",
    category: "Exposition",
    price: "18€",
    status: "past",
    ref: "EVT-6830-A1",
    seat: "Accès général",
  },
  {
    id: 5,
    title: "Dom Juan — Comédie-Française",
    date: "20 Sep 2024",
    time: "20h00",
    location: "Salle Richelieu, Paris",
    image: "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?w=300&q=70",
    category: "Théâtre",
    price: "32€",
    status: "past",
    ref: "EVT-6540-D4",
    seat: "Parterre · Rang F · Siège 8",
  },
];

const FILTERS = [
  { id: "all", label: "Tous", count: tickets.length },
  { id: "upcoming", label: "À venir", count: tickets.filter(t => t.status === "upcoming").length },
  { id: "past", label: "Passés", count: tickets.filter(t => t.status === "past").length },
];

export default function ProfileTickets() {
  const [filter, setFilter] = useState("all");
  const [expanded, setExpanded] = useState<number | null>(null);

  const filtered = filter === "all" ? tickets : tickets.filter(t => t.status === filter);

  return (
    <div>
      {/* Filter bar */}
      <div className="flex items-center gap-2 mb-6">
        {FILTERS.map(f => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`btn btn-sm rounded-full gap-2 text-xs uppercase tracking-wider transition-all duration-200 ${
              filter === f.id
                ? "btn-primary shadow-md shadow-primary/20"
                : "btn-ghost border border-primary/12 text-base-content/40 hover:border-primary/35 hover:text-primary"
            }`}
          >
            {f.label}
            <span className={`badge badge-xs py-1.5 px-1.5 font-bold ${
              filter === f.id ? "bg-primary-content/20 text-primary-content border-0" : "bg-base-300 border-0 text-base-content/30"
            }`}>{f.count}</span>
          </button>
        ))}
      </div>

      {/* Tickets list */}
      <div className="flex flex-col gap-4">
        <AnimatePresence>
          {filtered.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ delay: i * 0.07, duration: 0.4 }}
              className={`card bg-base-200 border transition-all duration-200 overflow-hidden ${
                t.status === "upcoming"
                  ? "border-primary/15 hover:border-primary/30"
                  : "border-base-content/6 hover:border-base-content/12"
              }`}
            >
              <div className="flex items-stretch">
                {/* Left color bar */}
                <div className={`w-1 shrink-0 ${t.status === "upcoming" ? "bg-gradient-to-b from-primary to-accent" : "bg-base-300"}`} />

                {/* Image */}
                <div className={`relative w-20 sm:w-28 shrink-0 overflow-hidden ${t.status === "past" ? "opacity-50 grayscale" : ""}`}>
                  <Image src={t.image} alt={t.title} fill className="object-cover" sizes="112px" />
                </div>

                {/* Content */}
                <div className="flex-1 p-4 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="badge badge-outline border-primary/20 text-primary/60 text-[9px] uppercase tracking-wider py-1 px-2">
                          {t.category}
                        </span>
                        {t.status === "upcoming" && (
                          <span className="badge badge-success bg-success/10 border-success/20 text-success text-[9px] uppercase tracking-wider py-1 px-2">
                            À venir
                          </span>
                        )}
                      </div>
                      <h4 className="font-display text-sm sm:text-base font-bold text-base-content leading-tight truncate">
                        {t.title}
                      </h4>
                      {t.subtitle && <p className="font-display text-xs italic text-primary/50">{t.subtitle}</p>}
                    </div>
                    <div className="text-right shrink-0">
                      <div className="font-bold text-sm text-primary">{t.price}</div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3 mt-2">
                    <div className="flex items-center gap-1 text-base-content/40">
                      <Calendar size={11} className="text-primary/50" />
                      <span className="text-[11px]">{t.date}</span>
                    </div>
                    <div className="flex items-center gap-1 text-base-content/40">
                      <Clock size={11} className="text-primary/50" />
                      <span className="text-[11px]">{t.time}</span>
                    </div>
                    <div className="flex items-center gap-1 text-base-content/40">
                      <MapPin size={11} className="text-primary/50" />
                      <span className="text-[11px] truncate">{t.location}</span>
                    </div>
                  </div>

                  {/* Seat + ref */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mt-3 pt-3 border-t border-primary/8">
                    <div>
                      <span className="text-[10px] text-base-content/25 font-mono">#{t.ref}</span>
                      <span className="text-[10px] text-base-content/35 ml-3">{t.seat}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      {t.status === "upcoming" && (
                        <>
                          <button className="btn btn-primary btn-xs rounded-full gap-1 text-[10px] uppercase tracking-wider shadow-sm shadow-primary/20">
                            <QrCode size={11} />
                            QR Code
                          </button>
                          <button className="btn btn-ghost btn-xs rounded-full gap-1 text-[10px] text-base-content/40 border border-primary/12 hover:border-primary/30">
                            <Download size={11} />
                          </button>
                        </>
                      )}
                      {t.status === "past" && (
                        <>
                          <button className="btn btn-ghost btn-xs rounded-full text-[10px] text-base-content/30 border border-base-content/10 hover:border-primary/25 hover:text-primary">
                            Revoir
                          </button>
                          <button className="btn btn-outline btn-xs rounded-full text-[10px] border-primary/20 text-primary/60 hover:bg-primary/8">
                            Laisser un avis
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
