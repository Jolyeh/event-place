"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import {
  LayoutDashboard, Settings,
  MapPin, Calendar, Heart, Star,
  CheckCircle, Bell, Plus, Camera, TrendingUp,
  Mail,
} from "lucide-react";
import ProfileOverview from "./ProfileOverview";
import ProfileSettings from "./ProfileSettings";
import Link from "next/link";

const TABS = [
  { id: "overview", label: "Vue d'ensemble", icon: LayoutDashboard },
  { id: "settings", label: "Paramètres", icon: Settings },
];

const DEFAULT_COVER = "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=1200&q=70";
const DEFAULT_AVATAR = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80";

type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  npi: string;
  cip: string;
  role: string;
  image: string | null;
  createdAt: string;
};

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => setUser(data.user ?? null))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const fullName = user ? `${user.firstName} ${user.lastName}` : "—";
  const joinDate = user
    ? `Membre depuis ${new Date(user.createdAt).toLocaleDateString("fr-FR", { month: "long", year: "numeric" })}`
    : "";
  const avatar = user?.image ?? DEFAULT_AVATAR;

  const stats = [
    { label: "Événements", value: "—", icon: Calendar },
    { label: "Dépensés",   value: "—", icon: TrendingUp },
    { label: "Sauvegardés",value: "—", icon: Heart },
    { label: "Note moy.",  value: "—", icon: Star },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-base-100 flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-100 pt-16">
      {/* Cover */}
      <div className="relative h-40 sm:h-52 lg:h-60 overflow-hidden">
        <Image src={DEFAULT_COVER} alt="cover" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-linear-to-t from-base-100 via-base-100/30 to-transparent" />
        <div className="absolute inset-0 bg-linear-to-r from-primary/10 via-transparent to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile header */}
        <div className="relative -mt-14 sm:-mt-16 pb-0 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div className="flex items-end gap-4">
            {/* Avatar */}
            <div className="relative shrink-0">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl border-4 border-base-100 overflow-hidden bg-base-200 shadow-2xl shadow-black/40">
                <Image src={avatar} alt={fullName} width={112} height={112} className="object-cover w-full h-full" />
              </div>
              <button className="absolute -bottom-1 -right-1 btn btn-primary btn-circle btn-xs shadow-md shadow-primary/30">
                <Camera size={11} />
              </button>
              <div className="absolute top-1 right-1 w-3.5 h-3.5 rounded-full bg-success border-2 border-base-100" />
            </div>

            {/* Name + meta */}
            <div className="pb-1">
              <div className="flex items-center gap-2 mb-0.5">
                <h1 className="font-display text-xl sm:text-2xl font-bold text-base-content">{fullName}</h1>
                <CheckCircle size={16} className="text-primary fill-primary/20" />
              </div>
              <div className="flex items-center gap-3 mt-1.5">
                <div className="flex items-center gap-1 text-base-content/35">
                  <Mail size={11} className="text-primary/50" />
                  <span className="text-[11px]">{user?.email}</span>
                </div>
                
              </div>
              <p className="text-[11px] text-base-content/30 mt-1">{joinDate}</p>
            </div>
          </div>

          {/* Actions */}
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

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
          {stats.map((s, i) => (
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
              className={`flex items-center gap-2 px-4 py-3 text-xs font-semibold uppercase tracking-wider whitespace-nowrap border-b-2 transition-all duration-200 relative -mb-px ${
                activeTab === tab.id
                  ? "border-primary text-primary"
                  : "border-transparent text-base-content/35 hover:text-base-content/60 hover:border-primary/20"
              }`}
            >
              <tab.icon size={13} />
              {tab.label}
            </button>
          ))}
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
              {activeTab === "settings" && <ProfileSettings />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}