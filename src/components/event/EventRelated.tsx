"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { Calendar, MapPin, Star, ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { events } from "@/src/lib/data";
import EventCard from "../ui/EventCard";

const related = events;

export default function EventRelated() {
  return (
    <section>
      <div className="flex items-end justify-between mb-8">
        <div>
          <p className="text-[10px] uppercase tracking-[0.28em] text-primary font-semibold mb-2">
            Dans la même veine
          </p>
          <h2 className="font-display font-bold text-base-content leading-tight"
            style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)" }}>
            Vous pourriez
            <span className="italic font-light text-primary"> aussi aimer</span>
          </h2>
        </div>
        <Link href="/"
          className="btn btn-outline btn-primary btn-sm rounded-full gap-2 text-xs uppercase tracking-widest hidden sm:flex"
        >
          Voir tout <ArrowRight size={13} />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {related.map((ev, i) => (
          <motion.div
            key={ev.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -5 }}
          >
            <EventCard
              key={ev.id}
              event={ev}
              delay={i * 0.06}
              variant={"default"}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
