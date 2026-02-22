"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Send, CheckCircle } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || status !== "idle") return;
    setStatus("loading");
    setTimeout(() => setStatus("success"), 1300);
  };

  return (
    <section className="py-20 lg:py-32 bg-base-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative card bg-base-200 border border-primary/12 overflow-hidden"
        >
          {/* BG glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/4 via-transparent to-accent/3 pointer-events-none" />
          <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-primary/5 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 rounded-full bg-accent/4 blur-3xl pointer-events-none" />

          <div className="card-body items-center text-center py-16 lg:py-24 px-6 lg:px-20 relative z-10">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="text-[10px] uppercase tracking-[0.28em] text-primary font-semibold mb-3"
            >
              Ne rien manquer
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.22, duration: 0.6 }}
              className="font-display font-bold text-base-content leading-tight mb-4"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
            >
              Restez dans
              <span className="italic font-light text-primary"> la boucle</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-sm text-base-content/45 leading-relaxed max-w-sm mb-10"
            >
              Une sélection personnalisée des meilleurs événements chaque semaine, selon vos goûts.
            </motion.p>

            <motion.form
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.38 }}
              onSubmit={handleSubmit}
              className="w-full max-w-md"
            >
              {status !== "success" ? (
                <div className="join w-full">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="votre@email.com"
                    className="input input-bordered join-item flex-1 bg-base-300 border-primary/18 focus:border-primary/50 focus:outline-none text-sm"
                    required
                    disabled={status === "loading"}
                  />
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="btn btn-primary join-item text-xs uppercase tracking-widest font-semibold gap-2 px-6 min-w-[140px] shadow-lg shadow-primary/25"
                  >
                    {status === "loading" ? (
                      <span className="loading loading-spinner loading-xs" />
                    ) : (
                      <>S&apos;abonner <Send size={13} /></>
                    )}
                  </button>
                </div>
              ) : (
                <motion.div
                  initial={{ scale: 0.85, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex items-center justify-center gap-3 bg-primary/10 border border-primary/25 rounded-2xl px-6 py-4 w-full"
                >
                  <CheckCircle size={18} className="text-primary" />
                  <span className="text-primary text-sm font-medium">Merci ! Vous êtes inscrit(e).</span>
                </motion.div>
              )}
            </motion.form>

            <p className="text-[10px] uppercase tracking-[0.18em] text-base-content/18 mt-4">
              Pas de spam · Désinscription en 1 clic
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
