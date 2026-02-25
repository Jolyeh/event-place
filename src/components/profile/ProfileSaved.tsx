"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { Heart, MapPin, Calendar, ArrowUpRight, Plus } from "lucide-react";
import Link from "next/link";
import { events } from "@/src/lib/data";
import EventCard from "../ui/EventCard";

const saved = events;

export default function ProfileSaved() {
  const [removed, setRemoved] = useState<number[]>([]);

  const toggle = (id: number) => {
    setRemoved(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const visible = saved.filter(s => !removed.includes(s.id));

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-base-content/40">
          <span className="font-semibold text-base-content">{visible.length}</span> événements sauvegardés
        </p>
        <Link href="/evenements" className="btn btn-outline btn-primary btn-sm rounded-full gap-2 text-xs uppercase tracking-wider">
          <Plus size={13} />
          Explorer
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <AnimatePresence>
          {visible.map((ev, i) => (
            <motion.div
              key={ev.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: i * 0.06, duration: 0.35 }}
              whileHover={{ y: -4 }}
            >
              <EventCard
                key={ev.id}
                event={ev}
                delay={i * 0.06}
                variant={"default"}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
