"use client";

import { motion } from "motion/react";
import { Search, Ticket, Sparkles } from "lucide-react";
import SectionHeader from "../ui/SectionHeader";

const steps = [
  {
    num: "01",
    Icon: Search,
    title: "Explorez",
    desc: "Parcourez des milliers d'événements filtrés par catégorie, ville, date et budget. Notre algorithme vous recommande selon vos préférences.",
  },
  {
    num: "02",
    Icon: Ticket,
    title: "Réservez",
    desc: "Choisissez vos billets en quelques clics. Paiement sécurisé, confirmation instantanée et e-ticket directement sur votre téléphone.",
  },
  {
    num: "03",
    Icon: Sparkles,
    title: "Vivez",
    desc: "Présentez votre QR code à l'entrée et profitez pleinement. Partagez vos souvenirs et découvrez votre prochain coup de cœur.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20 lg:py-32 bg-base-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Comment"
          titleAccent="ça fonctionne ?"
          centered
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.14, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -5, transition: { duration: 0.25 } }}
              className="card bg-base-300 border border-primary/8 hover:border-primary/25 p-8 text-center transition-colors duration-300 group relative overflow-hidden"
            >
              {/* Large number BG */}
              <div className="font-display text-7xl lg:text-8xl font-bold text-primary/5 group-hover:text-primary/10 leading-none absolute top-4 right-4 transition-colors duration-300 select-none">
                {step.num}
              </div>

              {/* Icon */}
              <div className="flex justify-center mb-5 relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all duration-300 shadow-lg shadow-primary/10 group-hover:shadow-primary/30">
                  <step.Icon
                    size={24}
                    className="text-primary group-hover:text-primary-content transition-colors duration-300"
                  />
                </div>
              </div>

              <h3 className="font-display text-2xl font-bold text-base-content mb-3 group-hover:text-primary transition-colors duration-200 relative z-10">
                {step.title}
              </h3>
              <p className="text-sm text-base-content/45 leading-relaxed relative z-10">
                {step.desc}
              </p>

              {/* Connector arrow on mobile */}
              {i < steps.length - 1 && (
                <div className="mt-6 flex justify-center md:hidden relative z-10 opacity-30">
                  <div className="w-px h-6 bg-primary" />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="flex justify-center mt-12"
        >
          <a href="#events" className="btn btn-primary rounded-full text-xs uppercase tracking-widest font-semibold px-12 shadow-xl shadow-primary/25">
            Commencer maintenant
          </a>
        </motion.div>
      </div>
    </section>
  );
}
