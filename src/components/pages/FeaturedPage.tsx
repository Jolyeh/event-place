"use client";

import { useState } from "react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import {
  Star, Calendar, MapPin, Users, Sparkles, ArrowRight,
  Heart, Play, Trophy, Flame, Crown,
  Share2
} from "lucide-react";
import { events } from "@/src/lib/data";
import EventCard from "../ui/EventCard";

const FEATURED = events.filter(e => e.featured || e.tag);
const ALL_CURATED = [
  ...events,
  { id: 20, title: "Gala d'Ouverture — Opéra de Paris", subtitle: "Soirée de prestige", category: "Gala", categoryEmoji: "🍾", date: "1 Avr 2025", time: "20h00", location: "Palais Garnier", city: "Paris", price: "350€", priceNum: 350, image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80", rating: 4.9, tag: "Prestige", featured: true },
  { id: 21, title: "Coldplay World Tour 2025", subtitle: "Music of the Spheres", category: "Concert", categoryEmoji: "🎵", date: "5 Juin 2025", time: "20h30", location: "Stade de France", city: "Paris", price: "89€", priceNum: 89, image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80", rating: 5.0, tag: "Sold out bientôt", featured: true },
  { id: 22, title: "Roland-Garros — Demi-finales", subtitle: "Open de France", category: "Sport", categoryEmoji: "⚽", date: "6 Juin 2025", time: "11h00", location: "Stade Roland-Garros", city: "Paris", price: "220€", priceNum: 220, image: "https://images.unsplash.com/photo-1544919982-b61976f0ba43?w=800&q=80", rating: 4.8, tag: "Limité", featured: true },
];

const COLLECTIONS = [
  { id: "trending", label: "Tendance", icon: Flame, color: "text-warning", desc: "Les plus réservés en ce moment" },
  { id: "prestige", label: "Prestige", icon: Crown, color: "text-accent", desc: "Expériences d'exception" },
  { id: "sport", label: "Sport & Outdoor", icon: Trophy, color: "text-success", desc: "Adrénaline garantie" },
];

export default function FeaturedPage() {
  const [liked, setLiked] = useState<number[]>([]);
  const [activeCollection, setActiveCollection] = useState("trending");

  const toggleLike = (id: number) => setLiked(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]);

  const hero = ALL_CURATED.find(e => e.featured) ?? ALL_CURATED[0];
  const rest = ALL_CURATED.filter(e => e.featured && e.id !== hero.id).slice(0, 5);

  return (
    <div className="min-h-screen bg-base-100 pt-[68px]">

      {/* ── Big hero featured ── */}
      <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
        <Image src={hero.image} alt={hero.title} fill priority className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-base-100/95 via-base-100/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-base-100/80 via-transparent to-transparent" />

        {/* Floating orbs */}
        <div className="absolute top-20 right-40 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-10 right-20 w-48 h-48 bg-accent/8 rounded-full blur-2xl" />

        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-xl"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="badge badge-primary text-[10px] uppercase tracking-[0.2em] py-2.5 px-4 gap-1.5">
                  <Sparkles size={10} fill="currentColor" />
                  Événement de la semaine
                </span>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => <Star key={i} size={12} className="text-warning fill-warning" />)}
                  <span className="text-xs text-base-content/50 ml-1">{hero.rating}</span>
                </div>
              </div>

              <h1 className="font-display font-bold text-base-content leading-tight mb-2" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
                {hero.title}
              </h1>
              {hero.subtitle && (
                <p className="font-display text-lg italic text-primary/70 mb-4">{hero.subtitle}</p>
              )}

              <div className="flex flex-wrap gap-4 mb-6 text-sm text-base-content/50">
                <div className="flex items-center gap-1.5"><Calendar size={13} className="text-primary/60" />{hero.date}{hero.time ? ` · ${hero.time}` : ""}</div>
                <div className="flex items-center gap-1.5"><MapPin size={13} className="text-primary/60" />{hero.location}, {hero.city}</div>
                <div className="flex items-center gap-1.5"><Users size={13} className="text-primary/60" />{hero.capacity ?? "Places limitées"}</div>
              </div>

              <div className="flex items-center gap-3">
                <Link href={`/reserver/${hero.id}`} className="btn btn-primary rounded-full gap-2 text-xs uppercase tracking-widest font-semibold px-8 shadow-xl shadow-primary/30">
                  Réserver
                  <ArrowRight size={14} />
                </Link>
                <button className="btn btn-circle btn-outline border-primary/30 hover:border-primary hover:bg-primary/10 text-primary transition-all duration-200">
                  <Share2 size={16} fill="currentColor" />
                </button>
                <button
                  onClick={() => toggleLike(hero.id)}
                  className={`btn btn-circle border transition-all duration-200 ${liked.includes(hero.id) ? "bg-primary/10 border-primary/30 text-primary" : "btn-ghost border-primary/20 text-base-content/40 hover:text-primary"}`}
                >
                  <Heart size={16} fill={liked.includes(hero.id) ? "currentColor" : "none"} />
                </button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Right thumbnails strip */}
        <div className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-2">
          {rest.slice(0, 3).map((ev, i) => (
            <motion.div
              key={ev.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
            >
              <Link href={`/evenements/${ev.id}`} className="flex items-center gap-3 bg-base-100/80 backdrop-blur-md border border-primary/15 rounded-2xl p-3 w-64 hover:border-primary/40 hover:bg-base-100/95 transition-all duration-200 group">
                <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0">
                  <Image src={ev.image} alt="" fill className="object-cover group-hover:scale-110 transition-transform duration-300" sizes="48px" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-base-content truncate group-hover:text-primary transition-colors">{ev.title}</p>
                  <p className="text-[10px] text-base-content/35 mt-0.5">{ev.date} · {ev.city}</p>
                  <p className="text-[10px] text-primary font-bold mt-0.5">{ev.price}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">

        {/* ── Stats strip ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-16">
          {[
            { label: "Événements en vedette", value: "48", icon: Sparkles },
            { label: "Ventes cette semaine", value: "12 400", icon: Flame },
            { label: "Note moyenne", value: "4.8 ★", icon: Star },
            { label: "Organisateurs certifiés", value: "240", icon: Crown },
          ].map(({ label, value, icon: Icon }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="card bg-base-200 border border-primary/8 hover:border-primary/22 p-5 text-center transition-colors duration-200"
            >
              <Icon size={20} className="text-primary mx-auto mb-2" />
              <div className="font-display text-2xl font-bold text-primary">{value}</div>
              <div className="text-[10px] uppercase tracking-wider text-base-content/30 mt-1">{label}</div>
            </motion.div>
          ))}
        </div>

        {/* ── Collections ── */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-px h-8 bg-gradient-to-b from-transparent via-primary/50 to-transparent" />
            <span className="text-[10px] uppercase tracking-[0.25em] text-primary">Nos sélections</span>
          </div>
          <h2 className="font-display text-3xl font-bold text-base-content mb-8">
            Collections <span className="italic font-light text-primary">thématiques</span>
          </h2>

          <div className="flex gap-3 mb-8 overflow-x-auto pb-1">
            {COLLECTIONS.map(col => (
              <button
                key={col.id}
                onClick={() => setActiveCollection(col.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider whitespace-nowrap border transition-all duration-200 ${activeCollection === col.id
                    ? "bg-primary border-primary text-primary-content shadow-md shadow-primary/25"
                    : "border-primary/15 bg-base-200 text-base-content/45 hover:border-primary/35 hover:text-primary"
                  }`}
              >
                <col.icon size={13} />
                {col.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {ALL_CURATED.slice(0, 6).map((ev, i) => (
              <motion.div
                key={ev.id}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="card bg-base-200 border border-primary/8 hover:border-primary/30 overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-primary/8"
              >
                <EventCard
                  key={ev.id}
                  event={ev}
                  delay={i * 0.06}
                  variant={"default"}
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── CTA band ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="card bg-gradient-to-br from-primary/15 via-primary/8 to-transparent border border-primary/20 p-8 sm:p-12 text-center overflow-hidden relative"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
          <div className="relative z-10">
            <Sparkles size={32} className="text-primary mx-auto mb-4 opacity-60" />
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-base-content mb-3">
              Ne manquez plus <span className="italic font-light text-primary">aucun événement</span>
            </h2>
            <p className="text-sm text-base-content/45 mb-7 max-w-lg mx-auto leading-relaxed">
              Activez les alertes personnalisées et recevez les meilleures sélections selon vos goûts directement dans votre boîte mail.
            </p>
            <div className="flex justify-center gap-3 flex-wrap">
              <Link href="/evenements" className="btn btn-outline border-primary/30 hover:bg-primary/8 rounded-full text-xs uppercase tracking-widest text-primary px-10">
                Explorer tout
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
