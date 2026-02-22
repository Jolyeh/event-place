"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { MapPin, Calendar, Heart, Star, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import type { Event } from "@/src/lib/data";

interface EventCardProps {
  event: Event;
  delay?: number;
  variant?: "default" | "compact" | "horizontal";
}

export default function EventCard({ event, delay = 0, variant = "default" }: EventCardProps) {
  const [liked, setLiked] = useState(false);

  if (variant === "compact") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-center gap-4 p-3 rounded-2xl bg-base-200 border border-primary/8 hover:border-primary/25 transition-all duration-300 cursor-pointer group"
      >
        <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0">
          <Image src={event.image} alt={event.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" sizes="64px" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[10px] uppercase tracking-wider text-primary mb-0.5">{event.categoryEmoji} {event.category}</div>
          <div className="text-sm font-semibold text-base-content truncate group-hover:text-primary transition-colors duration-200">{event.title}</div>
          <div className="text-xs text-base-content/40 mt-0.5">{event.date} · {event.city}</div>
        </div>
        <div className="text-right shrink-0">
          <div className="text-sm font-bold text-primary">{event.price}</div>
          <button className="btn btn-primary btn-xs rounded-full mt-1 text-[10px] uppercase tracking-wider">
            Voir
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      className="card bg-base-200 border border-primary/8 hover:border-primary/30 overflow-hidden cursor-pointer group transition-colors duration-300 hover:shadow-2xl hover:shadow-primary/10"
    >
      {/* Image */}
      <figure className="relative h-52 overflow-hidden">
        <motion.div
          whileHover={{ scale: 1.06 }}
          transition={{ duration: 0.55 }}
          className="absolute inset-0"
        >
          <Image
            src={event.image}
            alt={event.title}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </motion.div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-base-100/70 via-transparent to-transparent" />

        {/* Category badge */}
        <div className="absolute top-3 left-3">
          <span className="badge bg-base-100/80 backdrop-blur-md border-primary/25 text-primary text-[10px] uppercase tracking-widest py-2.5 px-2.5 font-medium">
            {event.categoryEmoji} {event.category}
          </span>
        </div>

        {/* Tag */}
        {event.tag && (
          <div className="absolute top-3 right-10">
            <span className="badge badge-primary text-[9px] uppercase tracking-wider py-2 px-2">
              {event.tag}
            </span>
          </div>
        )}

        {/* Like */}
        <button
          onClick={(e) => { e.stopPropagation(); setLiked(!liked); }}
          className="absolute top-3 right-3 btn btn-circle btn-xs bg-base-100/75 backdrop-blur-sm border-0 hover:bg-base-100"
        >
          <Heart size={12} className={`transition-all duration-200 ${liked ? "text-primary fill-primary scale-125" : "text-base-content/40"}`} />
        </button>

        {/* City bottom */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1 text-base-content/60">
          <MapPin size={11} className="text-primary/60" />
          <span className="text-[11px]">{event.city}</span>
        </div>
      </figure>

      <div className="card-body p-4 gap-2">
        {/* Date */}
        <div className="flex items-center gap-1.5 text-primary">
          <Calendar size={11} />
          <span className="text-[10px] font-medium uppercase tracking-widest">{event.date}{event.time && ` · ${event.time}`}</span>
        </div>

        {/* Title */}
        <div>
          <h3 className="font-display text-base font-bold text-base-content group-hover:text-primary transition-colors duration-200 leading-snug line-clamp-2">
            {event.title}
          </h3>
          {event.subtitle && (
            <p className="font-display text-sm italic text-primary/60 mt-0.5">{event.subtitle}</p>
          )}
        </div>

        {/* Location */}
        <div className="flex items-center gap-1 text-base-content/35">
          <MapPin size={11} />
          <span className="text-xs">{event.location}</span>
        </div>

        {/* Rating */}
        {event.rating && (
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={10}
                className={i < Math.floor(event.rating!) ? "text-warning fill-warning" : "text-base-content/15"}
              />
            ))}
            <span className="text-[11px] text-base-content/35 ml-1">{event.rating}</span>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-primary/8 mt-1">
          <div>
            <div className="text-[9px] uppercase tracking-wider text-base-content/25 mb-0.5">À partir de</div>
            <span className="text-primary font-bold text-sm">{event.price}</span>
          </div>
          <button className="btn btn-primary btn-sm rounded-full gap-1 text-[10px] uppercase tracking-wider px-4 shadow-md shadow-primary/25 group-hover:shadow-primary/40 transition-shadow duration-200">
            Réserver
            <ArrowUpRight size={11} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
