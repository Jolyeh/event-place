"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, LayoutGrid, List, Search } from "lucide-react";
import { events, categories } from "@/src/lib/data";
import EventCard from "../ui/EventCard";
import FeaturedEventCard from "../ui/FeaturedEventCard";
import SectionHeader from "../ui/SectionHeader";
import Link from "next/link";


export default function EventsGrid() {
  const [activeCategory, setActiveCategory] = useState("Tous");
  const [layout, setLayout] = useState<"grid" | "list">("grid");

  const featured = events.find((e) => e.featured);
  const filtered =
    activeCategory === "Tous"
      ? events.filter((e) => !e.featured)
      : events.filter((e) => e.category === activeCategory && !e.featured);

  return (
    <section id="events" className="py-20 lg:py-32 bg-base-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header row */}
        <div className="flex lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <SectionHeader
            title="Événements"
            titleAccent="en vedette"
          />
          <Link href="/en-vedette"
            className="btn btn-outline btn-primary rounded-full gap-2 text-xs uppercase tracking-widest shrink-0 self-start lg:self-auto mb-12 lg:mb-16"
          >
            Voir tout
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Featured */}
        {featured && activeCategory === "Tous" && (
          <div className="mb-10">
            <FeaturedEventCard event={featured} />
          </div>
        )}

        {/* Filter bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => setActiveCategory(cat.name)}
                className={`btn btn-sm rounded-full gap-1.5 text-xs uppercase tracking-wider transition-all duration-200 ${activeCategory === cat.name
                  ? "btn-primary shadow-md shadow-primary/25"
                  : "btn-ghost border border-primary/12 text-base-content/40 hover:border-primary/35 hover:text-primary hover:bg-primary/8"
                  }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Layout toggle */}
          <div className="flex items-center bg-base-200 rounded-full p-1 border border-primary/10 shrink-0">
            <button
              onClick={() => setLayout("grid")}
              className={`btn btn-xs btn-circle transition-all duration-200 ${layout === "grid" ? "btn-primary" : "btn-ghost text-base-content/30"}`}
            >
              <LayoutGrid size={13} />
            </button>
            <button
              onClick={() => setLayout("list")}
              className={`btn btn-xs btn-circle transition-all duration-200 ${layout === "list" ? "btn-primary" : "btn-ghost text-base-content/30"}`}
            >
              <List size={13} />
            </button>
          </div>
        </div>

        {/* Cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeCategory}-${layout}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className={
              layout === "grid"
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
                : "flex flex-col gap-3"
            }
          >
            {filtered.length > 0 ? (
              filtered.map((event, i) => (
                <Link href={`/evenements/${event.id}`} key={event.id} className="block">
                  <EventCard
                    key={event.id}
                    event={event}
                    delay={i * 0.06}
                    variant={layout === "list" ? "compact" : "default"}
                  />
                </Link>

              ))
            ) : (
              <div className="col-span-full text-center py-16">
                <div className="text-4xl mb-3"> <Search /> </div>
                <p className="text-base-content/40 text-sm">Aucun événement dans cette catégorie pour le moment.</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Load more */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex justify-center mt-12"
        >
          <Link href="/evenements" className="btn btn-outline btn-primary rounded-full gap-2 text-xs uppercase tracking-widest px-10">
            Charger plus
            <ArrowRight size={14} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
