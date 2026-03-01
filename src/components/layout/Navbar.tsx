"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Zap, Search, Sun, Moon } from "lucide-react";
import Link from "next/link";

const links = [
  { label: "Explorer", href: "/" },
  { label: "Catégories", href: "/categories" },
  { label: "Evènements", href: "/evenements" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState("night");

  useEffect(() => {
    // Récupérer le thème au chargement (night par défaut)
    const savedTheme = localStorage.getItem("theme") || "night";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);

    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleThemeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTheme = e.target.checked ? "light" : "night";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-base-100/90 backdrop-blur-2xl border-b border-primary/10 shadow-2xl shadow-black/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/40 group-hover:scale-105 transition-transform duration-200">
              <Zap size={18} className="text-primary-content" fill="currentColor" />
            </div>
            <span className="font-display text-2xl font-bold tracking-wide text-primary">
              Event Place
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {links.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className="px-4 py-2 rounded-full text-xs font-medium uppercase tracking-widest text-base-content/50 hover:text-primary hover:bg-primary/8 transition-all duration-200"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            
            {/* THEME CONTROLLER */}
            <label className="btn btn-ghost btn-circle btn-sm swap swap-rotate text-base-content/40 hover:text-primary">
              <input 
                type="checkbox" 
                className="theme-controller" 
                value="light" 
                onChange={handleThemeChange}
                checked={theme === "light"}
              />
              <Sun size={18} className="swap-off" />
              <Moon size={18} className="swap-on" />
            </label>

            <Link href="/recherche" className="btn btn-ghost btn-circle btn-sm text-base-content/40 hover:text-primary hidden sm:flex">
              <Search size={18} />
            </Link>

            <Link
              href="/authentification"
              className="btn btn-primary btn-sm rounded-xl text-xs uppercase tracking-widest font-semibold shadow-lg shadow-primary/30 hidden lg:flex px-6"
            >
              Connexion
            </Link>

            {/* Mobile toggle */}
            <button
              onClick={() => setOpen(!open)}
              className="btn btn-ghost btn-circle btn-sm lg:hidden text-base-content/60"
            >
              <AnimatePresence mode="wait">
                {open ? (
                  <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                    <X size={22} />
                  </motion.div>
                ) : (
                  <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                    <Menu size={22} />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu (LE RETOUR) */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden bg-base-200/98 backdrop-blur-2xl border-t border-primary/10 overflow-hidden"
          >
            <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col gap-1">
              {links.map((l, i) => (
                <motion.div
                  key={l.label}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-widest text-base-content/60 hover:text-primary hover:bg-primary/5 flex items-center justify-between group transition-all"
                  >
                    {l.label}
                    <Zap size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
                  </Link>
                </motion.div>
              ))}

              <div className="pt-6 border-t border-base-content/5 flex flex-col gap-3 mt-4">
                <Link 
                  href="/recherche" 
                  onClick={() => setOpen(false)}
                  className="btn btn-outline border-primary/20 hover:bg-primary/5 hover:border-primary text-primary btn-md rounded-2xl flex justify-between px-6"
                >
                  <span className="text-xs uppercase tracking-[0.2em] font-bold">Recherche</span>
                  <Search size={18} />
                </Link>
                <Link 
                  href="/authentification" 
                  onClick={() => setOpen(false)}
                  className="btn btn-primary btn-md rounded-xl text-xs uppercase tracking-[0.2em] font-bold shadow-lg shadow-primary/20"
                >
                  Connexion
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}