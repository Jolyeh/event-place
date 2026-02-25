"use client";

import { useState } from "react";
import { motion } from "motion/react";
import Image from "next/image";
import {
  ArrowLeft, Heart, Share2, Star, MapPin, Calendar, Clock,
  Users, Ticket, ChevronRight, Check, ExternalLink, Play
} from "lucide-react";
import EventGallery from "./EventGallery";
import EventTicketPanel from "./EventTicketPanel";
import EventOrganizer from "./EventOrganizer";
import EventRelated from "./EventRelated";

const EVENT = {
  id: 1,
  title: "Orchestre Philharmonique de Paris",
  subtitle: "Soirée Beethoven & Brahms",
  category: "Concert classique",
  date: "Samedi 15 Mars 2025",
  time: "20h30 — 23h00",
  location: "Philharmonie de Paris",
  address: "221, avenue Jean-Jaurès, 75019 Paris",
  capacity: "2 400",
  spotsLeft: 127,
  rating: 4.9,
  reviewCount: 847,
  image: "https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=1400&q=85",
  gallery: [
    "https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=600&q=75",
    "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&q=75",
    "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=600&q=75",
    "https://images.unsplash.com/photo-1571935441005-3ce2a4ac0a55?w=600&q=75",
  ],
  description: `Plongez au cœur de la grande musique symphonique lors d'une soirée d'exception organisée par l'Orchestre Philharmonique de Paris.

Sous la direction du maestro Gustavo Dudamel, l'un des chefs les plus charismatiques de notre époque, le programme met à l'honneur deux monuments de la musique romantique : la magistrale Symphonie n°7 de Beethoven et le somptueux Concerto pour violon de Brahms, interprété par la virtuose Hilary Hahn.

La Philharmonie de Paris, avec sa salle principale d'une acoustique incomparable, offre un cadre à la hauteur de ce programme de prestige.`,
  program: [
    { time: "20h00", item: "Ouverture des portes" },
    { time: "20h30", item: "Symphonie n°7 en la majeur, Op. 92 — Ludwig van Beethoven" },
    { time: "21h15", item: "Entracte (20 minutes)" },
    { time: "21h35", item: "Concerto pour violon en ré majeur, Op. 77 — Johannes Brahms" },
    { time: "23h00", item: "Fin du concert" },
  ],
  tags: ["classique", "symphonique", "beethoven", "brahms", "prestige"],
  tickets: [
    { id: "cat1", name: "Catégorie A — Orchestre", price: 95, available: 45 },
    { id: "cat2", name: "Catégorie B — Mezzanine", price: 75, available: 62 },
    { id: "cat3", name: "Catégorie C — Balcon", price: 45, available: 20 },
  ],
  organizer: {
    name: "Orchestre Philharmonique de Paris",
    avatar: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=100&q=80",
    eventCount: 124,
    rating: 4.9,
    verified: true,
  },
};

export default function EventDetailPage() {
  const [liked, setLiked] = useState(false);
  const [activeTab, setActiveTab] = useState<"description" | "program" | "venue">("description");

  return (
    <div className="min-h-screen bg-base-100 pt-16">
      {/* Hero image */}
      <div className="relative h-[50vh] sm:h-[55vh] lg:h-[65vh] overflow-hidden">
        <Image
          src={EVENT.image}
          alt={EVENT.title}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-base-100 via-base-100/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-base-100/40 to-transparent" />

        {/* Back + actions overlay */}
        <div className="absolute top-6 left-0 right-0 flex items-center justify-between px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          {/* <Link href="/"
            className="btn btn-sm bg-base-100/70 backdrop-blur-md border-primary/15 hover:border-primary/40 gap-2 text-xs uppercase tracking-wider rounded-full"
          >
            <ArrowLeft size={13} />
            Retour
          </Link> */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setLiked(!liked)}
              className="btn btn-circle btn-sm bg-base-100/70 backdrop-blur-md border-primary/15 hover:border-error/30"
            >
              <Heart size={15} className={liked ? "text-primary fill-primary" : "text-base-content/60"} />
            </button>
            <button className="btn btn-circle btn-sm bg-base-100/70 backdrop-blur-md border-primary/15 hover:border-primary/40">
              <Share2 size={15} className="text-base-content/60" />
            </button>
          </div>
        </div>

        {/* Category badge on image */}
        <div className="absolute bottom-8 left-4 sm:left-8">
          <span className="badge bg-base-100/80 backdrop-blur-md border-primary/25 text-primary text-[10px] uppercase tracking-widest py-2.5 px-3 font-semibold">
            {EVENT.category}
          </span>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-10">

          {/* LEFT — details */}
          <div className="flex-1 min-w-0">
            {/* Title + rating */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="font-display font-bold text-base-content leading-tight mb-2"
                style={{ fontSize: "clamp(1.8rem,5vw,3rem)" }}>
                {EVENT.title}
              </h1>
              <p className="font-display text-xl italic text-primary/70 mb-4">{EVENT.subtitle}</p>

              {/* Rating + reviews */}
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <div className="flex items-center gap-1.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={14} className={i < Math.floor(EVENT.rating) ? "text-warning fill-warning" : "text-base-content/15"} />
                  ))}
                  <span className="text-sm font-semibold text-base-content ml-1">{EVENT.rating}</span>
                  <span className="text-sm text-base-content/35">({EVENT.reviewCount} avis)</span>
                </div>
                <div className="flex items-center gap-1 text-primary text-sm">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  <span className="font-medium">{EVENT.spotsLeft} places restantes</span>
                </div>
              </div>
            </motion.div>

            {/* Key info grid */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8"
            >
              {[
                { Icon: Calendar, label: "Date", value: EVENT.date },
                { Icon: Clock, label: "Heure", value: EVENT.time },
                { Icon: MapPin, label: "Lieu", value: EVENT.location },
                { Icon: Users, label: "Capacité", value: `${EVENT.capacity} pers.` },
              ].map(({ Icon, label, value }) => (
                <div key={label} className="flex flex-col gap-1.5 p-3 bg-base-200 border border-primary/8 rounded-xl">
                  <div className="flex items-center gap-1.5">
                    <Icon size={12} className="text-primary/60" />
                    <span className="text-[9px] uppercase tracking-widest text-base-content/30">{label}</span>
                  </div>
                  <span className="text-xs font-semibold text-base-content leading-snug">{value}</span>
                </div>
              ))}
            </motion.div>

            {/* Tabs */}
            <div className="flex items-center gap-1 border-b border-primary/10 mb-6">
              {(["description", "program", "venue"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-3 text-xs font-semibold uppercase tracking-wider border-b-2 -mb-px transition-all duration-200 ${
                    activeTab === tab
                      ? "border-primary text-primary"
                      : "border-transparent text-base-content/35 hover:text-base-content/60 hover:border-primary/20"
                  }`}
                >
                  {tab === "description" ? "Description" : tab === "program" ? "Programme" : "Lieu"}
                </button>
              ))}
            </div>

            {/* Tab content */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-8"
            >
              {activeTab === "description" && (
                <div className="text-sm text-base-content/60 leading-relaxed space-y-4">
                  {EVENT.description.split("\n\n").map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {EVENT.tags.map(tag => (
                      <span key={tag} className="badge badge-outline border-primary/15 text-base-content/35 text-[10px] uppercase tracking-wider py-2 px-3">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "program" && (
                <div className="flex flex-col gap-0">
                  {EVENT.program.map((p, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.07 }}
                      className="flex gap-4 pb-5 relative"
                    >
                      {/* Timeline line */}
                      {i < EVENT.program.length - 1 && (
                        <div className="absolute left-[30px] top-7 w-px h-full bg-primary/12" />
                      )}
                      <div className="w-14 shrink-0 text-right">
                        <span className="text-[11px] text-primary font-semibold">{p.time}</span>
                      </div>
                      <div className="w-4 h-4 rounded-full border-2 border-primary bg-base-100 shrink-0 mt-0.5 z-10" />
                      <div className="flex-1 pt-0">
                        <span className="text-sm text-base-content/70 leading-snug">{p.item}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {activeTab === "venue" && (
                <div className="flex flex-col gap-4">
                  <div className="p-4 bg-base-200 border border-primary/8 rounded-2xl">
                    <h4 className="font-semibold text-base-content mb-1">{EVENT.location}</h4>
                    <p className="text-sm text-base-content/45 mb-3">{EVENT.address}</p>
                    <a href="#" className="btn btn-outline btn-primary btn-sm rounded-full gap-2 text-xs uppercase tracking-wider">
                      <ExternalLink size={12} />
                      Voir sur Google Maps
                    </a>
                  </div>
                  {/* Map placeholder */}
                  <div className="h-48 bg-base-200 border border-primary/8 rounded-2xl overflow-hidden relative">
                    <Image
                      src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&q=60"
                      alt="map"
                      fill
                      className="object-cover opacity-40"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="flex flex-col items-center gap-2 text-base-content/40">
                        <MapPin size={28} className="text-primary" />
                        <span className="text-xs uppercase tracking-wider">Philharmonie de Paris</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>

            {/* Gallery */}
            <EventGallery images={EVENT.gallery} />

            {/* Organizer */}
            <div className="mt-8">
              <EventOrganizer organizer={EVENT.organizer} />
            </div>
          </div>

          {/* RIGHT — ticket panel (sticky) */}
          <div className="lg:w-96 shrink-0">
            <div className="sticky top-24">
              <EventTicketPanel tickets={EVENT.tickets} spotsLeft={EVENT.spotsLeft} date={EVENT.date} time={EVENT.time} />
            </div>
          </div>
        </div>

        {/* Related events */}
        <div className="mt-16 border-t border-primary/8 pt-12">
          <EventRelated />
        </div>
      </div>
    </div>
  );
}
