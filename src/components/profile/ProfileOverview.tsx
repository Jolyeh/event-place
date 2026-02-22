"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { Calendar, MapPin, ArrowRight, TrendingUp } from "lucide-react";
import Link from "next/link";

const upcoming = [
  {
    id: 1,
    title: "Orchestre Philharmonique de Paris",
    date: "15 Mars 2025 · 20h30",
    location: "Philharmonie de Paris",
    image: "https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=200&q=70",
    category: "Concert",
    status: "Confirmé",
    ticketRef: "#EVT-8821",
  },
  {
    id: 2,
    title: "Summit IA & Innovation 2025",
    date: "22 Mars 2025 · 09h00",
    location: "Paris La Défense",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=200&q=70",
    category: "Conférence",
    status: "Confirmé",
    ticketRef: "#EVT-9045",
  },
  {
    id: 3,
    title: "Festival Taste of Bordeaux",
    date: "10 Avr 2025 · 12h00",
    location: "Quais de Bordeaux",
    image: "https://images.unsplash.com/photo-1551818255-e6e10975bc17?w=200&q=70",
    category: "Gastronomie",
    status: "En attente",
    ticketRef: "#EVT-9312",
  },
];

const months = ["Jan", "Fév", "Mar", "Avr", "Mai", "Jun", "Jul", "Aoû", "Sep", "Oct", "Nov", "Déc"];
const activityData = [2, 1, 4, 2, 6, 3, 5, 1, 3, 7, 4, 8];
const maxVal = Math.max(...activityData);

const favCategories = [
  { name: "Concert", emoji: "🎵", count: 22, pct: 46 },
  { name: "Conférence", emoji: "💼", count: 11, pct: 23 },
  { name: "Exposition", emoji: "🎨", count: 7, pct: 15 },
  { name: "Gala", emoji: "🍾", count: 4, pct: 9 },
  { name: "Sport", emoji: "⚽", count: 3, pct: 7 },
];

export default function ProfileOverview() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

      {/* Left: Upcoming + Chart */}
      <div className="lg:col-span-2 flex flex-col gap-6">

        {/* Upcoming events */}
        <div className="card bg-base-200 border border-primary/8">
          <div className="card-body p-5 gap-4">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-lg font-bold text-base-content">
                Prochains <span className="italic font-light text-primary">événements</span>
              </h3>
              <button className="btn btn-ghost btn-xs gap-1 text-primary/60 hover:text-primary text-[10px] uppercase tracking-wider rounded-full">
                Voir tout <ArrowRight size={11} />
              </button>
            </div>

            <div className="flex flex-col gap-3">
              {upcoming.map((ev, i) => (
                <motion.div
                  key={ev.id}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-center gap-4 p-3 rounded-xl bg-base-300 border border-primary/6 hover:border-primary/20 transition-colors duration-200 cursor-pointer group"
                >
                  {/* Date box */}
                  <div className="w-10 shrink-0 text-center">
                    <div className="text-[9px] uppercase tracking-wider text-primary/60 leading-none">
                      {ev.date.split(" ")[1]}
                    </div>
                    <div className="font-display text-xl font-bold text-primary leading-none mt-0.5">
                      {ev.date.split(" ")[0]}
                    </div>
                  </div>

                  <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0">
                    <Image src={ev.image} alt={ev.title} width={40} height={40} className="object-cover w-full h-full" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-base-content group-hover:text-primary transition-colors duration-200 truncate">
                      {ev.title}
                    </p>
                    <div className="flex items-center gap-3 mt-0.5">
                      <div className="flex items-center gap-1 text-base-content/35">
                        <MapPin size={10} className="text-primary/40" />
                        <span className="text-[11px] truncate max-w-[160px]">{ev.location}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-1 shrink-0">
                    <span className={`badge text-[9px] uppercase tracking-wider py-1.5 px-2 ${
                      ev.status === "Confirmé"
                        ? "badge-success bg-success/10 border-success/25 text-success"
                        : "badge-warning bg-warning/10 border-warning/25 text-warning"
                    }`}>
                      {ev.status}
                    </span>
                    <span className="text-[10px] text-base-content/25 font-mono">{ev.ticketRef}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Activity chart */}
        <div className="card bg-base-200 border border-primary/8">
          <div className="card-body p-5 gap-4">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-lg font-bold text-base-content">
                Activité <span className="italic font-light text-primary">2024</span>
              </h3>
              <div className="flex items-center gap-1.5 text-success text-xs">
                <TrendingUp size={13} />
                <span>+34% vs 2023</span>
              </div>
            </div>

            <div className="flex items-end gap-2 h-28">
              {activityData.map((val, i) => (
                <motion.div
                  key={i}
                  className="flex-1 flex flex-col items-center gap-1"
                  initial={{ opacity: 0, scaleY: 0 }}
                  animate={{ opacity: 1, scaleY: 1 }}
                  transition={{ delay: i * 0.06, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  style={{ transformOrigin: "bottom" }}
                >
                  <div
                    className="w-full rounded-t-md bg-gradient-to-t from-primary to-accent transition-all duration-300 hover:opacity-90"
                    style={{ height: `${(val / maxVal) * 100}%`, minHeight: "4px" }}
                  />
                  <span className="text-[9px] text-base-content/25">{months[i]}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right column */}
      <div className="flex flex-col gap-6">
        {/* Bio */}
        <div className="card bg-base-200 border border-primary/8">
          <div className="card-body p-5 gap-4">
            <h3 className="font-display text-base font-bold text-base-content">À propos</h3>
            <p className="text-sm text-base-content/50 leading-relaxed">
              Passionnée de musique classique et d&apos;art contemporain. Je découvre Paris à travers ses scènes et ses galeries.
            </p>
            <div className="flex items-center gap-1.5 text-base-content/30 text-xs">
              <Calendar size={11} className="text-primary/40" />
              Membre depuis mars 2023
            </div>
          </div>
        </div>

        {/* Fav categories */}
        <div className="card bg-base-200 border border-primary/8">
          <div className="card-body p-5 gap-4">
            <h3 className="font-display text-base font-bold text-base-content">
              Catégories <span className="italic font-light text-primary">favorites</span>
            </h3>
            <div className="flex flex-col gap-3">
              {favCategories.map((cat, i) => (
                <motion.div
                  key={cat.name}
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-center gap-3"
                >
                  <span className="text-base shrink-0">{cat.emoji}</span>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs text-base-content/60">{cat.name}</span>
                      <span className="text-[10px] text-base-content/30">{cat.count}</span>
                    </div>
                    <div className="h-1 bg-base-300 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${cat.pct}%` }}
                        transition={{ delay: 0.3 + i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                      />
                    </div>
                  </div>
                  <span className="text-[10px] text-primary font-semibold">{cat.pct}%</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick link: Publish */}
        <Link href="/publier" className="card bg-primary/10 border border-primary/20 hover:border-primary/40 hover:bg-primary/15 transition-all duration-200 group">
          <div className="card-body p-5 flex-row items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center shrink-0">
              <Calendar size={18} className="text-primary" />
            </div>
            <div className="flex-1">
              <div className="text-sm font-semibold text-primary mb-0.5">Publier un événement</div>
              <div className="text-[11px] text-base-content/35">Devenez organisateur</div>
            </div>
            <ArrowRight size={15} className="text-primary/40 group-hover:translate-x-1 transition-transform duration-200" />
          </div>
        </Link>
      </div>
    </div>
  );
}
