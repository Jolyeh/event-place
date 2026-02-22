"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { Star, Quote } from "lucide-react";
import SectionHeader from "../ui/SectionHeader";

const testimonials = [
  {
    name: "Sophie Martin",
    role: "Amatrice de concerts",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&q=80",
    text: "Event Place m'a permis de découvrir des événements que je n'aurais jamais trouvés ailleurs. L'interface est sublime et la réservation ultra-rapide !",
    stars: 5,
    event: "Orchestre Philharmonique",
  },
  {
    name: "Thomas Leclerc",
    role: "Organisateur d'événements",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&q=80",
    text: "La plateforme idéale pour les organisateurs. Les outils de gestion sont puissants et notre visibilité a explosé depuis notre inscription. Résultats au rendez-vous.",
    stars: 5,
    event: "Summit IA 2025",
  },
  {
    name: "Amina Ouali",
    role: "Passionnée d'art contemporain",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&q=80",
    text: "Je réserve toutes mes expositions via Event Place. Le suivi des événements sauvegardés et les alertes de disponibilité sont vraiment un plus précieux.",
    stars: 5,
    event: "Lumière Perpétuelle",
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 lg:py-32 bg-base-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Ce qu'ils disent"
          title="Ils nous font"
          titleAccent="confiance"
          centered
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.12, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -5, transition: { duration: 0.25 } }}
              className="card bg-base-200 border border-primary/8 hover:border-primary/25 p-6 transition-all duration-300 hover:shadow-xl hover:shadow-primary/8 flex flex-col"
            >
              {/* Quote */}
              <Quote size={28} className="text-primary/20 mb-4 shrink-0" fill="currentColor" />

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.stars }).map((_, j) => (
                  <Star key={j} size={13} className="text-warning fill-warning" />
                ))}
              </div>

              {/* Text */}
              <p className="text-sm text-base-content/55 leading-relaxed flex-1 mb-5">
                &ldquo;{t.text}&rdquo;
              </p>

              {/* Event tag */}
              <div className="mb-5">
                <span className="badge badge-outline border-primary/20 text-primary/50 text-[10px] uppercase tracking-wider py-2 px-3">
                  {t.event}
                </span>
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-primary/8">
                <div className="avatar">
                  <div className="w-10 rounded-full ring-2 ring-primary/20 ring-offset-1 ring-offset-base-200">
                    <Image
                      src={t.avatar}
                      alt={t.name}
                      width={40}
                      height={40}
                      className="rounded-full object-cover"
                    />
                  </div>
                </div>
                <div>
                  <div className="text-sm font-semibold text-base-content">{t.name}</div>
                  <div className="text-[11px] text-base-content/35">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
