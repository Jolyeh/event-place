"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Zap, Search, Bell } from "lucide-react";
import Link from "next/link";

const links = [
  { label: "Explorer", href: "/" },
  { label: "Catégories", href: "#catgories" },
  { label: "Evènements", href: "#events" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-base-100/90 backdrop-blur-2xl border-b border-primary/10 shadow-2xl shadow-black/30"
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
            <span className="font-display text-2xl font-bold tracking-wide text-primary sm:block">
              Event Place
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="px-4 py-2 rounded-full text-xs font-medium uppercase tracking-widest text-base-content/50 hover:text-primary hover:bg-primary/8 transition-all duration-200"
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <Link href="#searchBtn" className="btn btn-ghost btn-circle btn-sm text-base-content/40 hover:text-primary hidden sm:flex">
              <Search size={18} />
            </Link>
            {/* <button className="btn btn-ghost btn-circle btn-sm text-base-content/40 hover:text-primary hidden sm:flex relative">
              <Bell size={18} />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-error border-2 border-base-100" />
            </button> */}
            <Link
              href="#organisateurs"
              className="btn btn-primary btn-sm rounded-full text-xs uppercase tracking-widest font-semibold shadow-lg shadow-primary/30 hidden lg:flex"
            >
              Connexion
            </Link>

            {/* Mobile toggle */}
            <button
              onClick={() => setOpen(!open)}
              className="btn btn-ghost btn-circle btn-sm lg:hidden"
            >
              <AnimatePresence mode="wait">
                {open ? (
                  <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                    <X size={20} />
                  </motion.div>
                ) : (
                  <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                    <Menu size={20} />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden bg-base-200/98 backdrop-blur-2xl border-t border-primary/10 overflow-hidden"
          >
            <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
              {links.map((l, i) => (
                <motion.a
                  key={l.label}
                  href={l.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  onClick={() => setOpen(false)}
                  className="px-4 py-3 rounded-xl text-sm uppercase tracking-widest text-base-content/60 hover:text-primary hover:bg-primary/10 transition-all duration-200"
                >
                  {l.label}
                </motion.a>
              ))}
              <div className="pt-3 border-t border-base-content/8 flex gap-2 mt-2">
                <button className="btn btn-primary btn-sm flex-1 rounded-full text-xs uppercase tracking-widest font-semibold">
                  Connexion
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
