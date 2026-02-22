"use client";

import { motion } from "motion/react";
import { Calendar, MapPin, Users, ArrowRight, Star, Ticket } from "lucide-react";
import Image from "next/image";
import type { Event } from "@/src/lib/data";

export default function FeaturedEventCard({ event }: { event: Event }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="card lg:card-side bg-base-200 border border-primary/15 hover:border-primary/35 overflow-hidden group transition-colors duration-300 hover:shadow-2xl hover:shadow-primary/15"
    >
      {/* Image */}
      <figure className="relative lg:w-[55%] h-64 lg:h-auto overflow-hidden shrink-0">
        <motion.div
          whileHover={{ scale: 1.04 }}
          transition={{ duration: 0.65 }}
          className="absolute inset-0"
        >
          <Image
            src={event.image}
            alt={event.title}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 55vw"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-base-200/40 hidden lg:block" />
        <div className="absolute inset-0 bg-gradient-to-t from-base-200/70 via-transparent to-transparent lg:hidden" />

        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          <span className="badge badge-primary gap-1.5 text-[10px] uppercase tracking-widest py-3 px-3 shadow-lg shadow-primary/30 font-semibold">
            <Star size={9} fill="currentColor" />
            En vedette
          </span>
          <span className="badge bg-base-100/80 backdrop-blur-md border-primary/20 text-primary text-[10px] uppercase tracking-wider py-3 px-3">
            {event.categoryEmoji} {event.category}
          </span>
        </div>

        {/* Bottom meta on image */}
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between lg:hidden">
          <div className="flex items-center gap-1.5 text-base-content/70">
            <MapPin size={12} className="text-primary/70" />
            <span className="text-xs">{event.location}, {event.city}</span>
          </div>
        </div>
      </figure>

      {/* Content */}
      <div className="card-body lg:w-[45%] p-6 lg:p-10 justify-between">
        <div>
          {/* Stars */}
          <div className="flex items-center gap-1 mb-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={13} className="text-warning fill-warning" />
            ))}
            <span className="text-xs text-base-content/35 ml-2">{event.rating} · 847 avis</span>
          </div>

          {/* Title */}
          <h2 className="font-display text-2xl lg:text-4xl font-bold text-base-content group-hover:text-primary transition-colors duration-300 leading-tight mb-2">
            {event.title}
          </h2>
          {event.subtitle && (
            <p className="font-display text-lg lg:text-xl italic text-primary/60 mb-4">{event.subtitle}</p>
          )}

          {/* Description */}
          {event.description && (
            <p className="text-sm text-base-content/45 leading-relaxed mb-6 line-clamp-3">
              {event.description}
            </p>
          )}

          {/* Divider */}
          <div className="border-t border-primary/10 my-5" />

          {/* Meta grid */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="flex items-start gap-2">
              <Calendar size={14} className="text-primary mt-0.5 shrink-0" />
              <div>
                <div className="text-[10px] uppercase tracking-wider text-base-content/25 mb-0.5">Date</div>
                <div className="text-xs text-base-content/65">{event.date}{event.time && ` · ${event.time}`}</div>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <MapPin size={14} className="text-primary mt-0.5 shrink-0" />
              <div>
                <div className="text-[10px] uppercase tracking-wider text-base-content/25 mb-0.5">Lieu</div>
                <div className="text-xs text-base-content/65">{event.location}</div>
              </div>
            </div>
            {event.capacity && (
              <div className="flex items-start gap-2">
                <Users size={14} className="text-primary mt-0.5 shrink-0" />
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-base-content/25 mb-0.5">Capacité</div>
                  <div className="text-xs text-base-content/65">{event.capacity} places</div>
                </div>
              </div>
            )}
            <div className="flex items-start gap-2">
              <Ticket size={14} className="text-primary mt-0.5 shrink-0" />
              <div>
                <div className="text-[10px] uppercase tracking-wider text-base-content/25 mb-0.5">Places</div>
                <div className="text-xs text-primary">127 restantes</div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="flex sm:flex-row items-end justify-between sm:items-center gap-4">
          <div>
            <div className="text-[10px] uppercase tracking-wider text-base-content/25 mb-0.5">À partir de</div>
            <div className="font-display text-2xl lg:text-3xl font-bold text-primary">{event.price}</div>
          </div>
          <button className="btn btn-primary rounded-2xl gap-2 px-8 flex-1 sm:flex-none text-xs uppercase tracking-widest font-semibold shadow-xl shadow-primary/30">
            Réserver maintenant
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
