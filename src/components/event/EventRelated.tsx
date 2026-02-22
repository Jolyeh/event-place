"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { Calendar, MapPin, Star, ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";

const related = [
  {
    id: 2,
    title: "Récital de Piano — Salle Pleyel",
    category: "Concert",
    emoji: "🎵",
    date: "25 Avr 2025",
    location: "Paris",
    price: "32€",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1552422535-c45813c61732?w=400&q=75",
  },
  {
    id: 3,
    title: "Nuit Jazz au Duc des Lombards",
    category: "Concert",
    emoji: "🎷",
    date: "18 Mars 2025",
    location: "Paris",
    price: "28€",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&q=75",
  },
  {
    id: 4,
    title: "Opéra de Paris — La Traviata",
    category: "Opéra",
    emoji: "🎭",
    date: "5 Avr 2025",
    location: "Palais Garnier",
    price: "65€",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?w=400&q=75",
  },
  {
    id: 5,
    title: "Concert Symphonique — Debussy",
    category: "Concert",
    emoji: "🎵",
    date: "12 Avr 2025",
    location: "Lyon",
    price: "40€",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1571935441005-3ce2a4ac0a55?w=400&q=75",
  },
];

export default function EventRelated() {
  return (
    <section>
      <div className="flex items-end justify-between mb-8">
        <div>
          <p className="text-[10px] uppercase tracking-[0.28em] text-primary font-semibold mb-2">
            Dans la même veine
          </p>
          <h2 className="font-display font-bold text-base-content leading-tight"
            style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)" }}>
            Vous pourriez
            <span className="italic font-light text-primary"> aussi aimer</span>
          </h2>
        </div>
        <Link href="/"
          className="btn btn-outline btn-primary btn-sm rounded-full gap-2 text-xs uppercase tracking-widest hidden sm:flex"
        >
          Voir tout <ArrowRight size={13} />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {related.map((ev, i) => (
          <motion.div
            key={ev.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -5 }}
            className="card bg-base-200 border border-primary/8 hover:border-primary/25 overflow-hidden group cursor-pointer transition-colors duration-200 hover:shadow-xl hover:shadow-primary/8"
          >
            <figure className="relative h-40 overflow-hidden">
              <Image
                src={ev.image}
                alt={ev.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-base-100/60 via-transparent to-transparent" />
              <div className="absolute top-2 left-2">
                <span className="badge bg-base-100/80 backdrop-blur-sm border-primary/20 text-primary text-[9px] uppercase tracking-wider py-1.5 px-2">
                  {ev.emoji} {ev.category}
                </span>
              </div>
            </figure>

            <div className="card-body p-4 gap-2">
              <h4 className="font-display text-sm font-bold text-base-content group-hover:text-primary transition-colors duration-200 line-clamp-2 leading-snug">
                {ev.title}
              </h4>
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} size={9}
                    className={j < Math.floor(ev.rating) ? "text-warning fill-warning" : "text-base-content/10"}
                  />
                ))}
                <span className="text-[10px] text-base-content/30 ml-1">{ev.rating}</span>
              </div>
              <div className="flex items-center gap-2 text-base-content/35">
                <div className="flex items-center gap-1">
                  <Calendar size={10} className="text-primary/50" />
                  <span className="text-[10px]">{ev.date}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin size={10} className="text-primary/50" />
                  <span className="text-[10px]">{ev.location}</span>
                </div>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-primary/8 mt-1">
                <span className="text-sm font-bold text-primary">{ev.price}</span>
                <Link href={`/evenements/${ev.id}`} className="btn btn-primary btn-xs rounded-full gap-1 text-[9px] uppercase tracking-wider shadow-sm shadow-primary/20">
                  Réserver <ArrowUpRight size={10} />
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
