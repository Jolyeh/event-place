"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { CheckCircle, Star, Calendar, ArrowUpRight, MessageCircle } from "lucide-react";

interface OrganizerProps {
  organizer: {
    name: string;
    avatar: string;
    eventCount: number;
    rating: number;
    verified: boolean;
  };
}

const recentEvents = [
  {
    title: "Soirée Ravel & Debussy",
    date: "Janv. 2025",
    image: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=120&q=70",
  },
  {
    title: "Nuit Symphonique",
    date: "Déc. 2024",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=120&q=70",
  },
  {
    title: "Gala de Fin d'Année",
    date: "Nov. 2024",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=120&q=70",
  },
];

export default function EventOrganizer({ organizer }: OrganizerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="card bg-base-200 border border-primary/10 hover:border-primary/20 transition-colors duration-200"
    >
      <div className="card-body p-6 gap-5">
        <h3 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-base-content/40">
          Organisé par
        </h3>

        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <h4 className="font-display text-base font-bold text-base-content">{organizer.name}</h4>
              </div>
              <div className="flex items-center gap-3 text-xs text-base-content/40">
                <div className="flex items-center gap-1">
                  <Calendar size={11} className="text-primary/50" />
                  <span>{organizer.eventCount} événements</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star size={11} className="text-warning fill-warning" />
                  <span>{organizer.rating}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent events */}
        <div className="border-t border-primary/8 pt-4">
          <p className="text-[10px] uppercase tracking-wider text-base-content/25 mb-3">Derniers événements</p>
          <div className="flex gap-2 overflow-auto">
            {recentEvents.map((ev) => (
              <div key={ev.title} className="flex items-center gap-2 flex-1 p-2 bg-base-300 rounded-xl border border-primary/6 hover:border-primary/20 cursor-pointer transition-colors duration-200">
                <div className="relative w-8 h-8 rounded-lg overflow-hidden shrink-0">
                  <Image src={ev.image} alt={ev.title} fill className="object-cover" sizes="32px" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] font-medium text-base-content/60 truncate">{ev.title}</p>
                  <p className="text-[9px] text-base-content/30">{ev.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
