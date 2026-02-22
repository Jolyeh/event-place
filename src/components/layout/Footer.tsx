"use client";

import { motion } from "motion/react";
import { Zap, Instagram, Twitter, Linkedin, Youtube, ArrowUpRight } from "lucide-react";
import Link from "next/link";

const cols = {
  Explorer: ["Acceuil", "Evénements", "Comment ça fonctionne ?", "Organisateur"],
  Organisateurs: ["Publier un événement", "Tableau de bord", "Tarifs & commission", "Support"],
  Entreprise: ["À propos", "Blog", "Carrières", "Partenaires"],
};

const socials = [
  { Icon: Instagram, href: "#" },
  { Icon: Twitter, href: "#" },
  { Icon: Linkedin, href: "#" },
  { Icon: Youtube, href: "#" },
];

export default function Footer() {
  return (
    <footer className="bg-base-200 border-t border-primary/8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Main grid */}
        <div className="py-16 grid grid-cols-2 lg:grid-cols-5 gap-10">

          {/* Brand */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-5 group w-fit">
              <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/30 group-hover:scale-105 transition-transform duration-200">
                <Zap size={18} className="text-primary-content" fill="currentColor" />
              </div>
              <span className="font-display text-2xl font-bold tracking-wide text-primary">Event Place</span>
            </Link>
            <p className="text-sm text-base-content/40 leading-relaxed max-w-xs mb-6">
              La plateforme événementielle qui connecte les passionnés aux expériences qui comptent vraiment.
            </p>
            {/* Socials */}
            <div className="flex gap-2">
              {socials.map(({ Icon, href }, i) => (
                <motion.a
                  key={i}
                  href={href}
                  whileHover={{ y: -2 }}
                  className="btn btn-circle btn-sm btn-ghost border border-primary/15 hover:border-primary/40 hover:text-primary text-base-content/30 transition-colors duration-200"
                >
                  <Icon size={14} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Link cols */}
          {Object.entries(cols).map(([title, items], ci) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: ci * 0.08, duration: 0.5 }}
            >
              <h4 className="text-[10px] font-semibold uppercase tracking-[0.22em] text-primary/75 mb-4">
                {title}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-sm text-base-content/40 hover:text-primary transition-colors duration-200 flex items-center gap-1 group"
                    >
                      {item}
                      <ArrowUpRight
                        size={11}
                        className="opacity-0 group-hover:opacity-100 -translate-y-0.5 translate-x-0.5 transition-all duration-200"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-primary/6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-base-content/20">
            © 2025 Event Place. Tous droits réservés.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {["Confidentialité", "Cookies", "Mentions légales"].map((l) => (
              <a key={l} href="#" className="text-xs text-base-content/20 hover:text-base-content/50 transition-colors duration-200">
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
