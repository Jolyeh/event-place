"use client";

import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import { categories, events } from "@/src/lib/data";

const CAT_DATA = [
  { name: "Concert",      emoji: "🎵", img: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=75", desc: "Classique, rock, jazz, électro — tous les styles en live.", gradient: "from-purple-900/80" },
  { name: "Conférence",   emoji: "💼", img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=75", desc: "Tech, business, science — les esprits qui font avancer le monde.", gradient: "from-blue-900/80" },
  { name: "Exposition",   emoji: "🎨", img: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800&q=75", desc: "Art contemporain, photographie, design — émerveillez vos sens.", gradient: "from-amber-900/70" },
  { name: "Gala",         emoji: "🍾", img: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=75", desc: "Soirées de prestige, galas de charité, dîners d'exception.", gradient: "from-slate-900/80" },
  { name: "Festival",     emoji: "🎪", img: "https://images.unsplash.com/photo-1485841938031-1bf81239b815?w=800&q=75", desc: "Multi-jours, scènes multiples, ambiance unique garantie.", gradient: "from-pink-900/70" },
  { name: "Sport",        emoji: "⚽", img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=75", desc: "Compétitions, marathons, matchs en direct — vibrez en tribune.", gradient: "from-green-900/75" },
  { name: "Gastronomie",  emoji: "👨‍🍳", img: "https://images.unsplash.com/photo-1551818255-e6e10975bc17?w=800&q=75", desc: "Dégustations, ateliers culinaires, marchés gourmands.", gradient: "from-orange-900/75" },
  { name: "Bien-être",    emoji: "🌿", img: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=75", desc: "Yoga, méditation, retraites — reconnectez-vous à l'essentiel.", gradient: "from-teal-900/70" },
];

const TRENDING_CATS = ["Concert", "Festival", "Gala"];

export default function CategoriesPage() {
  const getCatCount = (name: string) => events.filter(e => e.category === name).length;

  return (
    <div className="min-h-screen bg-base-100 pt-[68px]">

      {/* ── Header ── */}
      <div className="relative bg-base-200 border-b border-primary/10 py-14 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/6 to-transparent" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-px h-6 bg-primary/50" />
              <span className="text-[10px] uppercase tracking-[0.28em] text-primary">Toutes les catégories</span>
            </div>
            <h1 className="font-display font-bold text-base-content mb-3" style={{ fontSize: "clamp(2rem, 5vw, 3rem)" }}>
              Explorez par <span className="italic font-light text-primary">univers</span>
            </h1>
            <p className="text-sm text-base-content/42 max-w-xl leading-relaxed">
              Chaque catégorie est une porte ouverte sur une expérience unique. Concerts intimes, galas de prestige, expos d&apos;avant-garde — votre prochaine émotion commence ici.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* ── Trending strip ── */}
        <div className="flex items-center gap-3 mb-8">
          <span className="text-[10px] uppercase tracking-[0.22em] text-base-content/30">Tendance :</span>
          {TRENDING_CATS.map(cat => {
            const c = CAT_DATA.find(d => d.name === cat);
            return (
              <Link key={cat} href={`/categories/${cat.toLowerCase()}`} className="badge badge-outline border-primary/20 text-primary/60 hover:border-primary/50 hover:text-primary text-[10px] uppercase tracking-wider py-2 px-3 gap-1.5 transition-all duration-200">
                {c?.emoji} {cat}
                <span className="text-primary/30">↗</span>
              </Link>
            );
          })}
        </div>

        {/* ── Main mosaic grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {CAT_DATA.map((cat, i) => {
            const count = getCatCount(cat.name) || Math.floor(Math.random() * 400) + 50;
            const isBig = i === 0 || i === 5;
            const isTrending = TRENDING_CATS.includes(cat.name);

            return (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.45 }}
                className={`${isBig ? "sm:col-span-2" : ""}`}
              >
                <Link href={`/categories/${cat.name.toLowerCase()}`}>
                  <div className={`relative overflow-hidden rounded-2xl border border-primary/10 hover:border-primary/35 group cursor-pointer transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 ${isBig ? "h-64" : "h-48"}`}>
                    {/* Image */}
                    <motion.div
                      whileHover={{ scale: 1.06 }}
                      transition={{ duration: 0.6 }}
                      className="absolute inset-0"
                    >
                      <Image src={cat.img} alt={cat.name} fill className="object-cover" sizes={isBig ? "66vw" : "33vw"} />
                    </motion.div>

                    {/* Gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-t ${cat.gradient} to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-300`} />
                    <div className="absolute inset-0 bg-gradient-to-t from-base-100/60 to-transparent" />

                    {/* Content */}
                    <div className="absolute inset-0 p-5 flex flex-col justify-end">
                      {isTrending && (
                        <span className="badge badge-warning text-[9px] uppercase tracking-wider py-1 px-2 self-start mb-2">
                          🔥 Tendance
                        </span>
                      )}
                      <div className="text-3xl mb-1.5">{cat.emoji}</div>
                      <h2 className="font-display text-xl font-bold text-white leading-none mb-1 group-hover:text-primary transition-colors duration-300">
                        {cat.name}
                      </h2>
                      {isBig && (
                        <p className="text-xs text-white/55 leading-relaxed mb-2 line-clamp-2">{cat.desc}</p>
                      )}
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] text-white/45 uppercase tracking-wider">{count}+ événements</span>
                        <div className="w-7 h-7 rounded-full bg-primary/0 group-hover:bg-primary flex items-center justify-center border border-white/20 group-hover:border-primary transition-all duration-300">
                          <ArrowRight size={12} className="text-white/40 group-hover:text-primary-content transition-colors duration-300" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* ── Full list view ── */}
        <div className="mb-12">
          <h2 className="font-display text-2xl font-bold text-base-content mb-6">
            Toutes les <span className="italic font-light text-primary">catégories</span>
          </h2>
          <div className="flex flex-col gap-2">
            {CAT_DATA.map((cat, i) => {
              const count = getCatCount(cat.name) || Math.floor(Math.random() * 400) + 50;
              return (
                <motion.div
                  key={cat.name}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link href={`/categories/${cat.name.toLowerCase()}`}>
                    <div className="flex items-center gap-4 p-4 bg-base-200 border border-primary/8 hover:border-primary/28 rounded-2xl group cursor-pointer transition-all duration-200 hover:shadow-md hover:shadow-primary/6">
                      <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0">
                        <Image src={cat.img} alt="" fill className="object-cover group-hover:scale-110 transition-transform duration-400" sizes="56px" />
                      </div>
                      <div className="text-2xl w-8 text-center">{cat.emoji}</div>
                      <div className="flex-1">
                        <h3 className="text-sm font-bold text-base-content group-hover:text-primary transition-colors duration-200">{cat.name}</h3>
                        <p className="text-[11px] text-base-content/35 mt-0.5 line-clamp-1">{cat.desc}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="font-display font-bold text-primary text-base">{count}+</div>
                        <div className="text-[10px] uppercase tracking-wider text-base-content/25">événements</div>
                      </div>
                      <ChevronRight size={15} className="text-base-content/18 group-hover:text-primary transition-colors duration-200 shrink-0" />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
