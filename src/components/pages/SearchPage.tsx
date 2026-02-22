"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import {
  Search, X, Clock, TrendingUp, Filter, Calendar,
  MapPin, Star, ArrowRight, Sparkles, Zap
} from "lucide-react";
import { events, categories } from "@/src/lib/data";

const RECENT = ["Festival jazz Paris", "Yoga Nice", "Conférences IA 2025", "Gala Cannes"];
const TRENDING_SEARCHES = ["Coldplay 2025", "Roland Garros", "Festival électronique", "Exposition impressionnisme", "Marathon Lyon"];

const EXTENDED = [
  ...events,
  { id: 30, title: "Nuit des étoiles — Planétarium", category: "Exposition", categoryEmoji: "🎨", date: "20 Mars", location: "Planétarium de Paris", city: "Paris", price: "15€", priceNum: 15, image: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=600&q=75", rating: 4.7 },
  { id: 31, title: "Marché de Noël Strasbourg", category: "Festival", categoryEmoji: "🎪", date: "Dec 2025", location: "Place Kléber", city: "Strasbourg", price: "Gratuit", priceNum: 0, image: "https://images.unsplash.com/photo-1543935804-91c96a8ee7cf?w=600&q=75", rating: 4.9 },
  { id: 32, title: "Atelier Pâtisserie Lenôtre", category: "Gastronomie", categoryEmoji: "👨‍🍳", date: "5 Avr", location: "École Lenôtre", city: "Paris", price: "150€", priceNum: 150, image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=75", rating: 4.8 },
];

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("Tous");
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { inputRef.current?.focus(); }, []);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    let list = EXTENDED.filter(e =>
      e.title.toLowerCase().includes(q) ||
      e.category.toLowerCase().includes(q) ||
      e.city.toLowerCase().includes(q) ||
      e.location.toLowerCase().includes(q)
    );
    if (activeFilter !== "Tous") list = list.filter(e => e.category === activeFilter);
    return list;
  }, [query, activeFilter]);

  const hasQuery = query.trim().length > 0;

  return (
    <div className="min-h-screen bg-base-100 pt-[68px]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">

        {/* ── Big search bar ── */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/30">
              <Zap size={17} className="text-primary-content" fill="currentColor" />
            </div>
            <h1 className="font-display text-xl font-bold text-base-content">
              Rechercher un <span className="italic font-light text-primary">événement</span>
            </h1>
          </div>

          <div className={`relative transition-all duration-300 ${focused ? "shadow-2xl shadow-primary/15" : ""}`}>
            <Search size={18} className={`absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none transition-colors duration-200 ${focused ? "text-primary" : "text-base-content/30"}`} />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setTimeout(() => setFocused(false), 200)}
              placeholder="Titre, catégorie, ville, artiste..."
              className={`input input-bordered w-full pl-12 pr-12 bg-base-200 text-base-content focus:outline-none text-sm h-14 rounded-2xl placeholder:text-base-content/22 transition-all duration-300 ${
                focused ? "border-primary/60" : "border-primary/15"
              }`}
            />
            {query && (
              <button onClick={() => setQuery("")} className="absolute right-4 top-1/2 -translate-y-1/2 btn btn-circle btn-ghost btn-xs text-base-content/30 hover:text-primary">
                <X size={16} />
              </button>
            )}
          </div>
        </motion.div>

        {/* ── No query: suggestions ── */}
        <AnimatePresence mode="wait">
          {!hasQuery ? (
            <motion.div
              key="suggestions"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col gap-8"
            >
              {/* Recent searches */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Clock size={13} className="text-primary/50" />
                  <h2 className="text-[10px] uppercase tracking-[0.22em] text-base-content/35">Recherches récentes</h2>
                </div>
                <div className="flex flex-wrap gap-2">
                  {RECENT.map(term => (
                    <button key={term} onClick={() => setQuery(term)}
                      className="flex items-center gap-2 px-4 py-2 bg-base-200 border border-primary/10 hover:border-primary/35 hover:text-primary rounded-full text-sm text-base-content/50 transition-all duration-200 group">
                      <Clock size={11} className="text-base-content/20 group-hover:text-primary/40" />
                      {term}
                      <X size={11} className="text-base-content/15 hover:text-error ml-1" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Trending searches */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp size={13} className="text-primary/50" />
                  <h2 className="text-[10px] uppercase tracking-[0.22em] text-base-content/35">Tendances</h2>
                </div>
                <div className="flex flex-col gap-2">
                  {TRENDING_SEARCHES.map((term, i) => (
                    <motion.button
                      key={term}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06 }}
                      onClick={() => setQuery(term)}
                      className="flex items-center gap-4 py-3 px-4 bg-base-200 border border-primary/8 hover:border-primary/28 rounded-xl text-left group transition-all duration-200"
                    >
                      <span className="font-display text-sm font-bold text-primary/30 w-6 text-center">{i + 1}</span>
                      <TrendingUp size={13} className="text-base-content/20 group-hover:text-primary/50 transition-colors" />
                      <span className="text-sm text-base-content/55 group-hover:text-primary transition-colors">{term}</span>
                      <ArrowRight size={13} className="ml-auto text-base-content/15 group-hover:text-primary transition-colors" />
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Quick category access */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles size={13} className="text-primary/50" />
                  <h2 className="text-[10px] uppercase tracking-[0.22em] text-base-content/35">Explorer par catégorie</h2>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {categories.filter(c => c.name !== "Tous").map((cat, i) => (
                    <motion.button
                      key={cat.name}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.05 }}
                      onClick={() => { setQuery(cat.name); setActiveFilter(cat.name); }}
                      className="flex flex-col items-center gap-1.5 py-4 px-2 bg-base-200 border border-primary/8 hover:border-primary/30 hover:bg-primary/5 rounded-2xl transition-all duration-200 group"
                    >
                      
                      <span className="text-[10px] uppercase tracking-wider text-base-content/40 group-hover:text-primary text-center leading-tight">{cat.name}</span>
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : (
            /* ── Results ── */
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Filter tabs */}
              <div className="flex gap-2 mb-5 overflow-x-auto pb-1 scrollbar-hide">
                {["Tous", ...categories.filter(c => c.name !== "Tous").map(c => c.name)].map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveFilter(cat)}
                    className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-medium border transition-all duration-200 ${
                      activeFilter === cat
                        ? "bg-primary border-primary text-primary-content shadow-md shadow-primary/20"
                        : "border-primary/10 bg-base-200 text-base-content/40 hover:border-primary/30"
                    }`}
                  >
                    {cat}
                    {cat !== "Tous" && (
                      <span className="ml-1.5 opacity-60 text-[9px]">
                        ({EXTENDED.filter(e => e.category === cat && e.title.toLowerCase().includes(query.toLowerCase())).length})
                      </span>
                    )}
                  </button>
                ))}
              </div>

              {/* Result count */}
              <p className="text-xs text-base-content/35 mb-5">
                {results.length} résultat{results.length !== 1 ? "s" : ""} pour{" "}
                <strong className="text-primary">&ldquo;{query}&rdquo;</strong>
              </p>

              {results.length === 0 ? (
                <div className="flex flex-col items-center py-16 text-center">
                  <div className="text-5xl mb-4 opacity-20">🔍</div>
                  <h3 className="font-display text-xl font-bold text-base-content/30 mb-2">Aucun résultat</h3>
                  <p className="text-sm text-base-content/22 mb-6">Essayez d&apos;autres mots-clés ou parcourez nos catégories.</p>
                  <button onClick={() => { setQuery(""); setActiveFilter("Tous"); }} className="btn btn-primary btn-sm rounded-full px-8">
                    Nouvelle recherche
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  {results.map((ev, i) => (
                    <motion.div
                      key={ev.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <Link href={`/evenements/${ev.id}`}>
                        <div className="flex gap-4 p-4 bg-base-200 border border-primary/8 hover:border-primary/30 rounded-2xl group transition-all duration-200 hover:shadow-lg hover:shadow-primary/6">
                          <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden shrink-0">
                            <Image src={ev.image} alt="" fill className="object-cover group-hover:scale-110 transition-transform duration-400" sizes="80px" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="badge badge-outline border-primary/15 text-primary text-[9px] uppercase tracking-wider py-1 px-2 gap-1">
                                {ev.categoryEmoji} {ev.category}
                              </span>
                            </div>
                            <h3 className="text-sm font-bold text-base-content group-hover:text-primary transition-colors duration-200 line-clamp-1">
                              {ev.title}
                            </h3>
                            <div className="flex flex-wrap gap-3 mt-1.5 text-base-content/35">
                              <div className="flex items-center gap-1"><Calendar size={10} className="text-primary/40" /><span className="text-[11px]">{ev.date}</span></div>
                              <div className="flex items-center gap-1"><MapPin size={10} className="text-primary/40" /><span className="text-[11px]">{ev.city}</span></div>
                              {ev.rating && <div className="flex items-center gap-1"><Star size={10} className="text-warning fill-warning" /><span className="text-[11px]">{ev.rating}</span></div>}
                            </div>
                          </div>
                          <div className="flex flex-col items-end justify-between shrink-0">
                            <span className="font-display font-bold text-primary text-sm">{ev.price}</span>
                            <span className="btn btn-primary btn-xs rounded-full text-[9px] uppercase tracking-wider gap-1 shadow-sm shadow-primary/20">
                              Voir <ArrowRight size={9} />
                            </span>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
