"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import {
  LayoutDashboard, Ticket, Heart, Settings, LogOut,
  MapPin, Calendar, Star, CheckCircle, Bell, Plus,
  Edit3, Camera, ChevronRight, TrendingUp
} from "lucide-react";
import ProfileOverview from "./ProfileOverview";
import ProfileTickets from "./ProfileTickets";
import ProfileSaved from "./ProfileSaved";
import ProfileSettings from "./ProfileSettings";
import Link from "next/link";

const TABS = [
  { id: "overview", label: "Vue d'ensemble", icon: LayoutDashboard },
  { id: "tickets", label: "Mes billets", icon: Ticket, badge: 8 },
  { id: "saved", label: "Sauvegardés", icon: Heart, badge: 12 },
  { id: "settings", label: "Paramètres", icon: Settings },
];

const USER = {
  name: "Sophie Martin",
  handle: "@sophie.martin",
  location: "Paris, France",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80",
  cover: "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=1200&q=70",
  role: "Membre Prestige",
  verified: true,
  joinDate: "Membre depuis mars 2023",
  stats: [
    { label: "Événements", value: "47", icon: Calendar },
    { label: "Dépensés", value: "1 840€", icon: TrendingUp },
    { label: "Sauvegardés", value: "12", icon: Heart },
    { label: "Note moy.", value: "4.9", icon: Star },
  ],
};

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-base-100 pt-16">
      {/* Cover banner */}
      <div className="relative h-40 sm:h-52 lg:h-60 overflow-hidden">
        <Image src={USER.cover} alt="cover" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-base-100 via-base-100/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-transparent" />
      </div>

      {/* Profile header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative -mt-14 sm:-mt-16 pb-0 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          {/* Avatar + info */}
          <div className="flex items-end gap-4">
            {/* Avatar */}
            <div className="relative shrink-0">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl border-4 border-base-100 overflow-hidden bg-base-200 shadow-2xl shadow-black/40">
                <Image src={USER.avatar} alt={USER.name} width={112} height={112} className="object-cover w-full h-full" />
              </div>
              <button className="absolute -bottom-1 -right-1 btn btn-primary btn-circle btn-xs shadow-md shadow-primary/30">
                <Camera size={11} />
              </button>
              {/* Online dot */}
              <div className="absolute top-1 right-1 w-3.5 h-3.5 rounded-full bg-success border-2 border-base-100" />
            </div>

            {/* Name + meta */}
            <div className="pb-1">
              <div className="flex items-center gap-2 mb-0.5">
                <h1 className="font-display text-xl sm:text-2xl font-bold text-base-content">{USER.name}</h1>
                {USER.verified && (
                  <CheckCircle size={16} className="text-primary fill-primary/20" />
                )}
              </div>
              <p className="text-xs text-base-content/40">{USER.handle}</p>
              <div className="flex items-center gap-3 mt-1.5">
                <div className="flex items-center gap-1 text-base-content/35">
                  <MapPin size={11} className="text-primary/50" />
                  <span className="text-[11px]">{USER.location}</span>
                </div>
                <span className="badge badge-primary badge-outline text-[9px] uppercase tracking-wider py-1.5 px-2 gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  {USER.role}
                </span>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2 pb-1">
            <button className="btn btn-ghost btn-sm rounded-full border border-primary/15 hover:border-primary/40 gap-2 text-xs uppercase tracking-wider text-base-content/50">
              <Bell size={14} />
            </button>
            <Link href="/publier" className="btn btn-primary btn-sm rounded-full gap-2 text-xs uppercase tracking-widest shadow-md shadow-primary/30">
              <Plus size={13} />
              Événement
            </Link>
          </div>
        </div>

        {/* Stats strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 mb-0">
          {USER.stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              className="card bg-base-200 border border-primary/8 hover:border-primary/25 p-4 flex flex-row items-center gap-3 transition-colors duration-200"
            >
              <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                <s.icon size={16} className="text-primary" />
              </div>
              <div>
                <div className="font-display text-xl font-bold text-primary leading-none">{s.value}</div>
                <div className="text-[10px] uppercase tracking-wider text-base-content/30 mt-0.5">{s.label}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 mt-6 border-b border-primary/10 overflow-x-auto pb-px scrollbar-hide">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 text-xs font-semibold uppercase tracking-wider whitespace-nowrap border-b-2 transition-all duration-200 relative -mb-px ${activeTab === tab.id
                  ? "border-primary text-primary"
                  : "border-transparent text-base-content/35 hover:text-base-content/60 hover:border-primary/20"
                }`}
            >
              <tab.icon size={13} />
              {tab.label}
              {tab.badge && (
                <span className={`badge badge-xs py-1.5 px-1.5 font-bold ${activeTab === tab.id ? "badge-primary" : "bg-base-300 text-base-content/30 border-0"
                  }`}>
                  {tab.badge}
                </span>
              )}
            </button>
          ))}

          {/* Logout at the end */}
          <Link href="/authentification" className="ml-auto flex items-center gap-1.5 px-4 py-3 text-[10px] uppercase tracking-wider text-base-content/25 hover:text-error transition-colors duration-200 whitespace-nowrap">
            <LogOut size={12} />
            Déconnexion
          </Link>
        </div>

        {/* Tab content */}
        <div className="py-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === "overview" && <ProfileOverview />}
              {activeTab === "tickets" && <ProfileTickets />}
              {activeTab === "saved" && <ProfileSaved />}
              {activeTab === "settings" && <ProfileSettings />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
