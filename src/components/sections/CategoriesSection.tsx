"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import SectionHeader from "../ui/SectionHeader";

const cats = [
  { name: "Concerts & Musique", count: "2 840", image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&q=75", span: "col-span-2 row-span-2" },
  { name: "Conférences", count: "1 200", image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=400&q=70", span: "" },
  { name: "Sports", count: "3 100", image: "https://images.unsplash.com/photo-1575539665066-5bde00b9a3e0?w=400&q=70", span: "" },
  { name: "Art & Expositions", count: "980", image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=400&q=70", span: "" },
  { name: "Théâtre", count: "650", image: "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?w=400&q=70", span: "" },
];

export default function CategoriesSection() {
  return (
    <section className="py-20 lg:py-32 bg-base-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex lg:flex-row lg:items-end justify-between gap-6 mb-12 lg:mb-16">
          <SectionHeader title="Toutes les" titleAccent="catégories" />
          <motion.button
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="btn btn-outline btn-primary rounded-full gap-2 text-xs uppercase tracking-widest self-start lg:self-auto shrink-0 mb-12 lg:mb-16"
          >
            Voir tous <ArrowUpRight size={14} />
          </motion.button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 auto-rows-[160px] lg:auto-rows-[180px]">
          {cats.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              whileHover={{ scale: 1.02 }}
              className={`relative rounded-2xl overflow-hidden cursor-pointer group ${cat.span}`}
            >
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                sizes="(max-width: 640px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-base-100/90 via-base-100/20 to-transparent" />
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-all duration-300" />

              {/* Arrow */}
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-200 -translate-y-1 group-hover:translate-y-0">
                <div className="btn btn-primary btn-circle btn-xs shadow-lg shadow-primary/30">
                  <ArrowUpRight size={11} />
                </div>
              </div>

              {/* Info */}
              <div className="absolute bottom-4 left-4">
                <div className="font-display font-bold text-base-content text-sm lg:text-base leading-tight">{cat.name}</div>
                <div className="text-[10px] uppercase tracking-wider text-base-content/40 mt-0.5">{cat.count} événements</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
