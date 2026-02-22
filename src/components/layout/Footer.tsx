"use client";

import { motion } from "motion/react";
import { Zap, Instagram, Twitter, Linkedin, Youtube, ArrowUpRight } from "lucide-react";
import Link from "next/link";

// Mapping précis basé sur ton arborescence de dossiers
const footerLinks = {
  Explorer: [
    { label: "Accueil", href: "/" },
    { label: "Événements", href: "/evenements" },
    { label: "En vedette", href: "/en-vedette" },
    { label: "Recherche", href: "/recherche" },
  ],
  Organisateurs: [
    { label: "Publier un événement", href: "/publier" },
    { label: "Authentification", href: "/authentification" },
    { label: "Profil organisateur", href: "/profile" },
    { label: "Support", href: "/support" },
  ],
  Entreprise: [
    { label: "À propos", href: "/support" }, // Redirection vers support à défaut d'une page dédiée
    { label: "Confidentialité", href: "/confidentialite" },
    { label: "Cookies", href: "/cookies" },
    { label: "Mentions légales", href: "/mentions-legales" },
  ],
};

const socials = [
  { Icon: Instagram, href: "https://instagram.com" },
  { Icon: Twitter, href: "https://twitter.com" },
  { Icon: Linkedin, href: "https://linkedin.com" },
  { Icon: Youtube, href: "https://youtube.com" },
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
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -2 }}
                  className="btn btn-circle btn-sm btn-ghost border border-primary/15 hover:border-primary/40 hover:text-primary text-base-content/30 transition-colors duration-200"
                >
                  <Icon size={14} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Link cols */}
          {Object.entries(footerLinks).map(([title, items], ci) => (
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
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-sm text-base-content/40 hover:text-primary transition-colors duration-200 flex items-center gap-1 group w-fit"
                    >
                      {item.label}
                      <ArrowUpRight
                        size={11}
                        className="opacity-0 group-hover:opacity-100 -translate-y-0.5 translate-x-0.5 transition-all duration-200"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-primary/6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-base-content/20">
            © 2026 Event Place. Tous droits réservés.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { label: "Confidentialité", href: "/confidentialite" },
              { label: "Cookies", href: "/cookies" },
              { label: "Mentions légales", href: "/mentions-legales" }
            ].map((l) => (
              <Link 
                key={l.label} 
                href={l.href} 
                className="text-xs text-base-content/20 hover:text-base-content/50 transition-colors duration-200"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}