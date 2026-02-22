"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { ArrowRight, BarChart2, Users, Zap, Shield } from "lucide-react";
import Link from "next/link";

const perks = [
  { Icon: BarChart2, label: "Analytics temps réel" },
  { Icon: Users, label: "850K+ participants" },
  { Icon: Zap, label: "Commission 5% seulement" },
  { Icon: Shield, label: "Paiements sécurisés" },
];

export default function OrganizerCTA() {
  return (
    <section id="organisateurs" className="py-20 lg:py-32 bg-base-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="card lg:card-side bg-base-300 border border-primary/15 overflow-hidden hover:border-primary/30 transition-colors duration-300 min-h-[420px]"
        >
          {/* Image */}
          <figure className="relative lg:w-[45%] h-64 lg:h-auto overflow-hidden shrink-0">
            <Image
              src="https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800&q=80"
              alt="Organisateur d'événements"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 45vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-base-300/50 hidden lg:block" />

            {/* Floating stat card - Ajout de w-fit et z-10 */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              /* w-fit et h-fit sont essentiels pour compacter la carte */
              /* flex-col et items-start assurent que le contenu ne s'étire pas */
              className="absolute bottom-5 left-5 z-10 w-fit h-fit flex flex-col items-start card bg-base-100/90 backdrop-blur-md border border-primary/20 p-4 shadow-2xl"
            >
              <div className="text-[9px] uppercase tracking-widest text-base-content/35 mb-1 leading-none">
                Revenus ce mois
              </div>
              <div className="font-display text-2xl font-bold text-primary leading-tight">
                +12 400€
              </div>
            </motion.div>
          </figure>

          {/* Content */}
          <div className="card-body lg:w-[55%] p-8 lg:p-12 justify-center gap-6">
            <div>
              <p className="text-[10px] uppercase tracking-[0.28em] text-primary mb-3 font-semibold">
                Pour les organisateurs
              </p>
              <h2 className="font-display font-bold text-base-content leading-tight mb-4"
                style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.8rem)" }}>
                Publiez vos événements,
                <br />
                <span className="italic font-light text-primary">touchez des milliers.</span>
              </h2>
              <p className="text-sm text-base-content/45 leading-relaxed max-w-lg">
                Rejoignez la communautés organisateurs qui font confiance à Event Place pour vendre leurs billets, gérer leurs événements et analyser leurs performances.
              </p>
            </div>

            {/* Perks */}
            <div className="flex flex-wrap gap-2">
              {perks.map(({ Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 border border-primary/18 bg-primary/6 text-base-content/55 text-xs px-3 py-2 rounded-full"
                >
                  <Icon size={12} className="text-primary" />
                  {label}
                </div>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/authentification" className="btn btn-primary rounded-2xl gap-2 text-xs uppercase tracking-widest font-semibold px-8 shadow-xl shadow-primary/25">
                Devenir organisateur
                <ArrowRight size={14} />
              </Link>
              {/* <button className="btn btn-ghost btn-outline rounded-2xl text-xs uppercase tracking-widest border-primary/15 hover:border-primary/35 hover:bg-primary/8">
                En savoir plus
              </button> */}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
