"use client";

import { motion } from "motion/react";
import { CheckCircle, ArrowRight, LayoutDashboard, Check } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function SuccessScreen() {
  const [copied, setCopied] = useState(false);
  const shareUrl = "https://Event Place.fr/events/votre-evenement-2025";

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center text-center py-8 lg:py-12"
    >
      {/* Animated ring */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative mb-8"
      >
        <div className="w-24 h-24 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shadow-2xl shadow-primary/20">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <Check size={44} className="text-primary" fill="currentColor" />
          </motion.div>
        </div>
        {/* Pulse rings */}
        <div className="absolute inset-0 rounded-full border border-primary/15 animate-ping" />
        <div className="absolute -inset-3 rounded-full border border-primary/8" />
        <div className="absolute -inset-6 rounded-full border border-primary/4" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.5 }}
      >
        <div className="badge badge-outline border-warning/30 text-warning text-[10px] uppercase tracking-[0.2em] py-2.5 px-4 mb-5 gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-warning animate-pulse" />
          En cours de validation
        </div>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.42, duration: 0.5 }}
        className="font-display font-bold text-base-content mb-3"
        style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}
      >
        Événement{" "}
        <span className="italic font-light text-primary">soumis !</span>
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.52 }}
        className="text-base-content/45 text-sm leading-relaxed max-w-md mb-10"
      >
        Votre événement a été soumis avec succès. Notre équipe le validera sous{" "}
        <strong className="text-primary">24 heures</strong>. Vous serez notifié par e-mail dès la publication.
      </motion.p>

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.78 }}
        className="flex flex-col sm:flex-row gap-3 w-full max-w-md"
      >
        <Link
          href="/"
          className="btn btn-primary p-3 flex-1 rounded-full gap-2 uppercase tracking-widest font-semibold shadow-lg shadow-primary/25"
        >
          <LayoutDashboard size={14} />
          Tableau de bord
          <ArrowRight size={13} />
        </Link>
      </motion.div>
    </motion.div>
  );
}
