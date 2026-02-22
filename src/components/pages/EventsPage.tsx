"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import {
  Search, SlidersHorizontal, Grid3X3, List, ChevronDown,
  MapPin, Calendar, Star, Heart, X, ArrowRight, Sparkles
} from "lucide-react";
import { events, categories } from "@/src/lib/data";

const CITIES = ["Toutes les villes", "Paris", "Lyon", "Bordeaux", "Strasbourg", "Cannes", "Nice"];
const PRICE_RANGES = [
  { label: "Tous les prix", min: 0, max: 9999 },
  { label: "Gratuit", min: 0, max: 0 },
  { label: "< 30€", min: 1, max: 30 },
  { label: "30 – 100€", min: 30, max: 100 },
  { label: "> 100€", min: 100, max: 9999 },
];
const SORTS = [
  { label: "Pertinence", value: "relevance" },
  { label: "Date croissante", value: "date_asc" },
  { label: "Prix croissant", value: "price_asc" },
  { label: "Prix décroissant", value: "price_desc" },
  { label: "Mieux notés", value: "rating" },
];

// Extend events with more mock entries
const ALL_EVENTS = [
  ...events,
  { id: 9, title: "Forum Design & UX 2025", category: "Conférence", categoryEmoji: "💼", date: "2 Avr 2025", time: "09h00", location: "Station F", city: "Paris", price: "90€", priceNum: 90, image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600&q=75", rating: 4.6 },
  { id: 10, title: "Nuit Blanche Strasbourg", category: "Festival", categoryEmoji: "🎪", date: "21 Mars 2025", time: "20h00", location: "Centre-ville", city: "Strasbourg", price: "Gratuit", priceNum: 0, image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&q=75", rating: 4.8 },
  { id: 11, title: "Salon du Vin de Bordeaux", category: "Gastronomie", categoryEmoji: "👨‍🍳", date: "15 Avr 2025", time: "11h00", location: "Cité du Vin", city: "Bordeaux", price: "25€", priceNum: 25, image: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=600&q=75", rating: 4.7 },
  { id: 12, title: "Opéra Carmen — Gala de Prestige", category: "Gala", categoryEmoji: "🍾", date: "10 Avr 2025", time: "20h00", location: "Opéra de Lyon", city: "Lyon", price: "120€", priceNum: 120, image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=75", rating: 4.9, tag: "Prestige" },
];

export default function EventsPage() {
  const [search, setSearch] = useState("");
  const [activeCat, setActiveCat] = useState("Tous");
  const [activeCity, setActiveCity] = useState("Toutes les villes");
  const [priceRange, setPriceRange] = useState(0);
  const [sort, setSort] = useState("relevance");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [liked, setLiked] = useState<number[]>([]);

  const filtered = useMemo(() => {
    let list = [...ALL_EVENTS];
    if (search) list = list.filter(e => e.title.toLowerCase().includes(search.toLowerCase()) || e.city.toLowerCase().includes(search.toLowerCase()));
    if (activeCat !== "Tous") list = list.filter(e => e.category === activeCat);
    if (activeCity !== "Toutes les villes") list = list.filter(e => e.city === activeCity);
    const pr = PRICE_RANGES[priceRange];
    list = list.filter(e => e.priceNum >= pr.min && e.priceNum <= pr.max);
    if (sort === "price_asc") list.sort((a, b) => a.priceNum - b.priceNum);
    if (sort === "price_desc") list.sort((a, b) => b.priceNum - a.priceNum);
    if (sort === "rating") list.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
    return list;
  }, [search, activeCat, activeCity, priceRange, sort]);

  const toggleLike = (id: number) => setLiked(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]);

  const clearFilters = () => {
    setSearch(""); setActiveCat("Tous"); setActiveCity("Toutes les villes"); setPriceRange(0);
  };
  const hasFilters = search || activeCat !== "Tous" || activeCity !== "Toutes les villes" || priceRange !== 0;

  return (
    <div className="min-h-screen bg-base-100 pt-[68px]">

      {/* ── Hero banner ── */}
      <div className="relative bg-base-200 border-b border-primary/10 py-12 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="badge badge-outline border-primary/25 text-primary text-[10px] uppercase tracking-[0.25em] py-2 px-4 gap-1.5 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              {ALL_EVENTS.length} événements disponibles
            </div>
            <h1 className="font-display font-bold text-base-content mb-3" style={{ fontSize: "clamp(2rem, 5vw, 3rem)" }}>
              Explorer tous les <span className="italic font-light text-primary">événements</span>
            </h1>
            <p className="text-sm text-base-content/45 max-w-xl">
              Concerts, expositions, conférences, galas — trouvez l&apos;expérience qui vous correspond parmi notre sélection.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* ── Search + controls bar ── */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          {/* Search */}
          <div className="relative flex-1">
            <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/30 pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Rechercher un événement, une ville..."
              className="input input-bordered w-full pl-11 pr-10 bg-base-200 border-primary/15 focus:border-primary/50 focus:outline-none text-sm rounded-xl h-11 placeholder:text-base-content/25"
            />
            {search && (
              <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/30 hover:text-primary">
                <X size={15} />
              </button>
            )}
          </div>

          {/* Filters toggle */}
          <button
            onClick={() => setFiltersOpen(!filtersOpen)}
            className={`btn btn-sm rounded-xl gap-2 text-xs uppercase tracking-wider h-11 px-5 border transition-all duration-200 ${
              filtersOpen || hasFilters
                ? "btn-primary shadow-md shadow-primary/20"
                : "btn-ghost border-primary/15 text-base-content/50 hover:border-primary/35 hover:text-primary"
            }`}
          >
            <SlidersHorizontal size={14} />
            Filtres
            {hasFilters && <span className="badge badge-xs bg-primary-content/30 border-0 text-primary-content font-bold">!</span>}
          </button>

          {/* Sort */}
          <div className="relative">
            <select
              value={sort}
              onChange={e => setSort(e.target.value)}
              className="select select-bordered select-sm bg-base-200 border-primary/15 focus:border-primary/50 focus:outline-none text-sm rounded-xl h-11 min-h-0 pr-10 appearance-none pl-4"
            >
              {SORTS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
            </select>
            <ChevronDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-base-content/30" />
          </div>

          {/* View toggle */}
          <div className="flex bg-base-200 border border-primary/10 rounded-xl p-1 gap-1">
            <button onClick={() => setView("grid")} className={`btn btn-xs rounded-lg ${view === "grid" ? "btn-primary" : "btn-ghost text-base-content/30"}`}>
              <Grid3X3 size={13} />
            </button>
            <button onClick={() => setView("list")} className={`btn btn-xs rounded-lg ${view === "list" ? "btn-primary" : "btn-ghost text-base-content/30"}`}>
              <List size={13} />
            </button>
          </div>
        </div>

        {/* ── Expanded filters ── */}
        <AnimatePresence>
          {filtersOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden mb-6"
            >
              <div className="card bg-base-200 border border-primary/10 p-5 flex flex-col gap-5">
                {/* Categories */}
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-base-content/35 mb-3">Catégorie</p>
                  <div className="flex flex-wrap gap-2">
                    {categories.map(cat => (
                      <button
                        key={cat.name}
                        onClick={() => setActiveCat(cat.name)}
                        className={`badge py-3 px-3 text-[11px] gap-1.5 cursor-pointer transition-all duration-200 ${
                          activeCat === cat.name
                            ? "badge-primary border-primary shadow-md shadow-primary/15"
                            : "badge-outline border-primary/12 text-base-content/45 hover:border-primary/35 hover:text-primary"
                        }`}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* City */}
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-base-content/35 mb-3">Ville</p>
                    <div className="flex flex-wrap gap-2">
                      {CITIES.map(city => (
                        <button
                          key={city}
                          onClick={() => setActiveCity(city)}
                          className={`badge py-2.5 px-3 text-[11px] cursor-pointer transition-all duration-200 ${
                            activeCity === city
                              ? "badge-primary border-primary"
                              : "badge-outline border-primary/12 text-base-content/45 hover:border-primary/35"
                          }`}
                        >
                          <MapPin size={9} /> {city}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Price */}
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-base-content/35 mb-3">Tarif</p>
                    <div className="flex flex-wrap gap-2">
                      {PRICE_RANGES.map((pr, i) => (
                        <button
                          key={pr.label}
                          onClick={() => setPriceRange(i)}
                          className={`badge py-2.5 px-3 text-[11px] cursor-pointer transition-all duration-200 ${
                            priceRange === i
                              ? "badge-primary border-primary"
                              : "badge-outline border-primary/12 text-base-content/45 hover:border-primary/35"
                          }`}
                        >
                          {pr.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {hasFilters && (
                  <button onClick={clearFilters} className="btn btn-ghost btn-xs gap-1.5 text-error/60 hover:text-error rounded-full self-start text-[10px] uppercase tracking-wider border border-error/15 hover:border-error/35">
                    <X size={11} /> Réinitialiser les filtres
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Category chips (always visible) ── */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-hide">
          {categories.map(cat => (
            <button
              key={cat.name}
              onClick={() => setActiveCat(cat.name)}
              className={`shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 border ${
                activeCat === cat.name
                  ? "bg-primary/12 border-primary/30 text-primary"
                  : "border-primary/8 bg-base-200 text-base-content/40 hover:border-primary/25 hover:text-primary"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* ── Results count ── */}
        <div className="flex items-center justify-between mb-5">
          <p className="text-sm text-base-content/40">
            <strong className="text-primary">{filtered.length}</strong> événement{filtered.length !== 1 ? "s" : ""} trouvé{filtered.length !== 1 ? "s" : ""}
          </p>
          {hasFilters && (
            <button onClick={clearFilters} className="text-[11px] text-primary/60 hover:text-primary flex items-center gap-1 transition-colors">
              <X size={11} /> Effacer les filtres
            </button>
          )}
        </div>

        {/* ── Events grid/list ── */}
        <AnimatePresence mode="wait">
          {filtered.length === 0 ? (
            <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center py-24 text-center">
              <div className="text-5xl mb-4 opacity-20">🔍</div>
              <h3 className="font-display text-xl font-bold text-base-content/30 mb-2">Aucun événement trouvé</h3>
              <p className="text-sm text-base-content/25 mb-6">Essayez d&apos;élargir vos critères de recherche.</p>
              <button onClick={clearFilters} className="btn btn-primary btn-sm rounded-full px-8 text-xs uppercase tracking-widest">
                Tout afficher
              </button>
            </motion.div>
          ) : view === "grid" ? (
            <motion.div key="grid" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filtered.map((ev, i) => (
                <motion.div
                  key={ev.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  className="card bg-base-200 border border-primary/8 hover:border-primary/28 overflow-hidden group cursor-pointer transition-colors duration-300"
                >
                  <Link href={`/evenements/${ev.id}`}>
                    <figure className="relative h-44 overflow-hidden">
                      <motion.div whileHover={{ scale: 1.06 }} transition={{ duration: 0.5 }} className="absolute inset-0">
                        <Image src={ev.image} alt={ev.title} fill className="object-cover" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" />
                      </motion.div>
                      <div className="absolute inset-0 bg-gradient-to-t from-base-200/80 to-transparent" />
                      <div className="absolute top-3 left-3 right-3 flex items-start justify-between">
                        <span className="badge bg-base-100/80 backdrop-blur-sm border-primary/18 text-primary text-[9px] uppercase tracking-wider py-1.5 px-2">
                          {ev.categoryEmoji} {ev.category}
                        </span>
                        {ev.tag && (
                          <span className="badge badge-warning text-warning-content text-[9px] uppercase tracking-wider py-1.5 px-2">{ev.tag}</span>
                        )}
                      </div>
                      <button
                        onClick={e => { e.preventDefault(); toggleLike(ev.id); }}
                        className="absolute top-3 right-3 btn btn-circle btn-xs bg-base-100/70 backdrop-blur-sm border-0 opacity-0 group-hover:opacity-100 transition-all duration-200"
                      >
                        <Heart size={11} className={liked.includes(ev.id) ? "text-error fill-error" : "text-base-content/40"} fill={liked.includes(ev.id) ? "currentColor" : "none"} />
                      </button>
                    </figure>
                    <div className="card-body p-4 gap-1.5">
                      <div className="flex items-center gap-1.5 text-primary">
                        <Calendar size={10} />
                        <span className="text-[10px] uppercase tracking-widest">{ev.date}</span>
                      </div>
                      <h3 className="font-display text-sm font-bold text-base-content group-hover:text-primary transition-colors duration-200 line-clamp-2 leading-snug">{ev.title}</h3>
                      <div className="flex items-center gap-1 text-base-content/32">
                        <MapPin size={10} /><span className="text-[11px] truncate">{ev.location}, {ev.city}</span>
                      </div>
                      {ev.rating && (
                        <div className="flex items-center gap-1">
                          <Star size={10} className="text-warning fill-warning" />
                          <span className="text-[11px] text-base-content/45">{ev.rating}</span>
                        </div>
                      )}
                      <div className="flex items-center justify-between pt-2 border-t border-primary/8 mt-1">
                        <span className="font-display font-bold text-primary text-sm">{ev.price}</span>
                        <span className="btn btn-primary btn-xs rounded-full text-[9px] uppercase tracking-wider shadow-sm shadow-primary/20">
                          Voir <ArrowRight size={10} />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-3">
              {filtered.map((ev, i) => (
                <motion.div
                  key={ev.id}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                >
                  <Link href={`/evenements/${ev.id}`}>
                    <div className="card bg-base-200 border border-primary/8 hover:border-primary/28 overflow-hidden flex-row group transition-colors duration-200 hover:shadow-lg hover:shadow-primary/8">
                      <div className="relative w-28 sm:w-44 shrink-0 overflow-hidden">
                        <Image src={ev.image} alt={ev.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="176px" />
                      </div>
                      <div className="p-4 flex flex-col justify-between flex-1 gap-2">
                        <div>
                          <div className="flex items-center gap-2 mb-1.5">
                            <span className="badge badge-outline border-primary/18 text-primary text-[9px] uppercase tracking-wider py-1 px-2">{ev.categoryEmoji} {ev.category}</span>
                            {ev.tag && <span className="badge badge-warning text-[9px] py-1">{ev.tag}</span>}
                          </div>
                          <h3 className="font-display text-base font-bold text-base-content group-hover:text-primary transition-colors duration-200 line-clamp-1">{ev.title}</h3>
                          <div className="flex flex-wrap gap-3 mt-1.5">
                            <div className="flex items-center gap-1 text-base-content/35"><Calendar size={11} className="text-primary/40" /><span className="text-xs">{ev.date}{ev.time ? ` · ${ev.time}` : ""}</span></div>
                            <div className="flex items-center gap-1 text-base-content/35"><MapPin size={11} className="text-primary/40" /><span className="text-xs">{ev.location}, {ev.city}</span></div>
                            {ev.rating && <div className="flex items-center gap-1"><Star size={11} className="text-warning fill-warning" /><span className="text-xs text-base-content/45">{ev.rating}</span></div>}
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="font-display font-bold text-primary text-lg">{ev.price}</span>
                          <span className="btn btn-primary btn-sm rounded-full gap-1.5 text-[10px] uppercase tracking-wider shadow-md shadow-primary/20">Réserver <ArrowRight size={12} /></span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
