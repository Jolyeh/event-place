"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { Heart, MapPin, Calendar, ArrowUpRight, Plus } from "lucide-react";
import Link from "next/link";

const saved = [
  {
    id: 1,
    title: "Gala de Charité Étoiles du Sud",
    category: "Gala",
    emoji: "🍾",
    date: "8 Mars 2025",
    location: "Cannes",
    price: "250€",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&q=70",
  },
  {
    id: 2,
    title: "Festival Électronique Nuit Blanche",
    category: "Festival",
    emoji: "🎪",
    date: "18–21 Mars",
    location: "Strasbourg",
    price: "65€",
    image: "https://images.unsplash.com/photo-1485841938031-1bf81239b815?w=400&q=70",
  },
  {
    id: 3,
    title: "Sunrise Yoga — Côte d'Azur",
    category: "Bien-être",
    emoji: "🌿",
    date: "14 Mars 2025",
    location: "Nice",
    price: "12€",
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&q=70",
  },
  {
    id: 4,
    title: "Festival Taste of Bordeaux",
    category: "Gastronomie",
    emoji: "👨‍🍳",
    date: "10 Avr 2025",
    location: "Bordeaux",
    price: "Gratuit",
    image: "https://images.unsplash.com/photo-1551818255-e6e10975bc17?w=400&q=70",
  },
  {
    id: 5,
    title: "Récital de Piano — Salle Pleyel",
    category: "Concert",
    emoji: "🎵",
    date: "25 Avr 2025",
    location: "Paris",
    price: "32€",
    image: "https://images.unsplash.com/photo-1552422535-c45813c61732?w=400&q=70",
  },
  {
    id: 6,
    title: "Marathon de Lyon Prestige",
    category: "Sport",
    emoji: "⚽",
    date: "30 Mars 2025",
    location: "Lyon",
    price: "35€",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=70",
  },
];

export default function ProfileSaved() {
  const [removed, setRemoved] = useState<number[]>([]);

  const toggle = (id: number) => {
    setRemoved(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const visible = saved.filter(s => !removed.includes(s.id));

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-base-content/40">
          <span className="font-semibold text-base-content">{visible.length}</span> événements sauvegardés
        </p>
        <Link href="/" className="btn btn-outline btn-primary btn-sm rounded-full gap-2 text-xs uppercase tracking-wider">
          <Plus size={13} />
          Explorer
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <AnimatePresence>
          {visible.map((ev, i) => (
            <motion.div
              key={ev.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: i * 0.06, duration: 0.35 }}
              whileHover={{ y: -4 }}
              className="card bg-base-200 border border-primary/8 hover:border-primary/25 overflow-hidden group transition-colors duration-200"
            >
              <figure className="relative h-40 overflow-hidden">
                <Image src={ev.image} alt={ev.title} fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, 33vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-base-100/60 via-transparent to-transparent" />

                {/* Category */}
                <div className="absolute top-3 left-3">
                  <span className="badge bg-base-100/80 backdrop-blur-sm border-primary/20 text-primary text-[9px] uppercase tracking-wider py-2 px-2">
                    {ev.emoji} {ev.category}
                  </span>
                </div>

                {/* Unsave button */}
                <button
                  onClick={() => toggle(ev.id)}
                  className="absolute top-3 right-3 btn btn-circle btn-xs bg-base-100/80 backdrop-blur-sm border-0 hover:bg-error/20 group/heart"
                >
                  <Heart size={12} className="text-error fill-error group-hover/heart:scale-125 transition-transform duration-200" />
                </button>
              </figure>

              <div className="card-body p-4 gap-2">
                <h4 className="font-display text-sm font-bold text-base-content group-hover:text-primary transition-colors duration-200 line-clamp-2 leading-snug">
                  {ev.title}
                </h4>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 text-base-content/35">
                    <Calendar size={10} className="text-primary/50" />
                    <span className="text-[10px]">{ev.date}</span>
                  </div>
                  <div className="flex items-center gap-1 text-base-content/35">
                    <MapPin size={10} className="text-primary/50" />
                    <span className="text-[10px]">{ev.location}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-primary/8 mt-1">
                  <span className="text-sm font-bold text-primary">{ev.price}</span>
                  <Link href="/evenements/1" className="btn btn-primary btn-xs rounded-full gap-1 text-[9px] uppercase tracking-wider px-3 shadow-sm shadow-primary/20">
                    Réserver <ArrowUpRight size={10} />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Add more card */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Link href="/"
            className="card bg-base-200 border-2 border-dashed border-primary/12 hover:border-primary/35 hover:bg-primary/5 h-full min-h-[240px] flex items-center justify-center transition-all duration-200 group"
          >
            <div className="flex flex-col items-center gap-3 text-center p-6">
              <div className="w-12 h-12 rounded-2xl bg-primary/8 border border-primary/15 flex items-center justify-center group-hover:bg-primary/15 transition-colors duration-200">
                <Plus size={22} className="text-primary/50" />
              </div>
              <div>
                <p className="text-sm font-medium text-base-content/35">Découvrir plus</p>
                <p className="text-[11px] text-base-content/20 mt-0.5">Explorer les événements</p>
              </div>
            </div>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
