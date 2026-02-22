"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Zap, Eye, EyeOff, Check, ArrowRight, Chrome, Github,
  Mail, Lock, User, Phone, Calendar, ChevronRight
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

// ─── Password strength ────────────────────────────────────────────────────────
function getStrength(pw: string): { score: number; label: string; color: string } {
  if (!pw) return { score: 0, label: "", color: "" };
  let score = 0;
  if (pw.length >= 8) score++;
  if (pw.length >= 12) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^a-zA-Z0-9]/.test(pw)) score++;
  if (score <= 1) return { score, label: "Faible", color: "bg-error" };
  if (score <= 3) return { score, label: "Moyen", color: "bg-warning" };
  return { score, label: "Fort", color: "bg-success" };
}

// ─── Left Panel ───────────────────────────────────────────────────────────────
function LeftPanel({ mode }: { mode: "signin" | "signup" }) {
  const features = [
    "Accès à 12 000+ événements",
    "Billetterie sécurisée & e-ticket",
    "Alertes personnalisées",
    "Historique & gestion des billets",
  ];
  return (
    <div className="hidden lg:flex flex-col w-[45%] shrink-0 relative overflow-hidden bg-base-200">
      {/* BG image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=900&q=80"
          alt="bg"
          fill
          className="object-cover opacity-20"
          priority
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-base-100/90 via-base-200/70 to-primary/10" />
      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: "linear-gradient(rgba(124,58,237,1) 1px, transparent 1px), linear-gradient(to right, rgba(124,58,237,1) 1px, transparent 1px)",
        backgroundSize: "48px 48px"
      }} />

      <div className="relative z-10 flex flex-col justify-between h-full p-10 xl:p-14">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group w-fit">
          <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/40">
            <Zap size={18} className="text-primary-content" fill="currentColor" />
          </div>
          <span className="font-display text-2xl font-bold text-primary tracking-wide">Event Place</span>
        </Link>

        {/* Main content */}
        <div>
          <AnimatePresence mode="wait">
            <motion.div
              key={mode}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-[10px] uppercase tracking-[0.28em] text-primary font-semibold mb-4">
                {mode === "signup" ? "Créez votre compte" : "Bon retour parmi nous"}
              </p>
              <h2 className="font-display font-bold text-base-content leading-[0.95] mb-6"
                style={{ fontSize: "clamp(2rem,4vw,3.2rem)" }}>
                {mode === "signup" ? (
                  <>Vivez les meilleurs<br /><span className="italic font-light text-primary">événements.</span></>
                ) : (
                  <>Content de vous<br /><span className="italic font-light text-primary">revoir.</span></>
                )}
              </h2>
              <p className="text-sm text-base-content/45 leading-relaxed max-w-sm mb-10">
                {mode === "signup"
                  ? "Rejoignez 850 000 passionnés et ne ratez plus jamais un événement qui compte."
                  : "Connectez-vous pour accéder à vos billets, favoris et recommandations personnalisées."}
              </p>

              {/* Features */}
              <div className="flex flex-col gap-3">
                {features.map((f, i) => (
                  <motion.div
                    key={f}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.07 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-5 h-5 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center shrink-0">
                      <Check size={10} className="text-primary" />
                    </div>
                    <span className="text-sm text-base-content/55">{f}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Social proof */}
        <div className="flex items-center gap-4 pt-6 border-t border-primary/10">
          <div className="flex -space-x-2">
            {[
              "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&q=80",
              "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80",
              "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80",
              "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&q=80",
            ].map((src, i) => (
              <div key={i} className="w-8 h-8 rounded-full border-2 border-base-200 overflow-hidden">
                <Image src={src} alt="" width={32} height={32} className="object-cover" />
              </div>
            ))}
          </div>
          <div>
            <p className="text-xs font-semibold text-base-content/60">850 000+ membres</p>
            <p className="text-[10px] text-base-content/30">Rejoignez la communauté</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Auth Page ───────────────────────────────────────────────────────────
export default function AuthPage() {
  const [mode, setMode] = useState<"signin" | "signup">("signup");
  const [showPw, setShowPw] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [step, setStep] = useState<1 | 2>(1); // signup: step 1 = account, step 2 = profile
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    email: "", password: "", confirm: "",
    firstName: "", lastName: "", phone: "", birthdate: "",
    agreeTerms: false, agreeNewsletter: false,
  });

  const set = (field: string, val: string | boolean) =>
    setForm((p) => ({ ...p, [field]: val }));

  const strength = getStrength(form.password);

  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "signup" && step === 1) { setStep(2); return; }
    setLoading(true);
    setTimeout(() => setLoading(false), 1800);

    router.replace("/profile");
  };

  const switchMode = (m: "signin" | "signup") => {
    setMode(m);
    setStep(1);
    setForm({ email: "", password: "", confirm: "", firstName: "", lastName: "", phone: "", birthdate: "", agreeTerms: false, agreeNewsletter: false });
  };

  return (
    <div className="min-h-screen flex bg-base-100">
      <LeftPanel mode={mode} />

      {/* Right: form */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        {/* Mobile top bar */}
        <div className="lg:hidden flex items-center justify-between px-6 py-5 border-b border-primary/10">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center">
              <Zap size={15} className="text-primary-content" fill="currentColor" />
            </div>
            <span className="font-display text-xl font-bold text-primary">Event Place</span>
          </Link>
        </div>

        <div className="flex-1 flex items-center justify-center p-6 lg:p-10">
          <div className="w-full max-w-[420px]">

            {/* Mode tabs */}
            <div className="flex bg-base-200 rounded-2xl p-1 mb-8 border border-primary/10">
              {(["signup", "signin"] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => switchMode(m)}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-widest transition-all duration-300 ${mode === m
                    ? "bg-primary text-primary-content shadow-lg shadow-primary/25"
                    : "text-base-content/40 hover:text-base-content/70"
                    }`}
                >
                  {m === "signup" ? "Inscription" : "Connexion"}
                </button>
              ))}
            </div>

            {/* Step indicator (signup only) */}
            <AnimatePresence>
              {mode === "signup" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-6"
                >
                  <div className="flex items-center gap-2 mb-1">
                    {[1, 2].map((s) => (
                      <div key={s} className="flex items-center gap-2 flex-1">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 transition-all duration-300 ${step > s ? "bg-primary text-primary-content" :
                          step === s ? "bg-primary text-primary-content ring-2 ring-primary/30 ring-offset-2 ring-offset-base-100" :
                            "bg-base-300 text-base-content/25"
                          }`}>
                          {step > s ? <Check size={11} /> : s}
                        </div>
                        <span className={`text-[10px] uppercase tracking-wider ${step >= s ? "text-primary" : "text-base-content/25"}`}>
                          {s === 1 ? "Compte" : "Profil"}
                        </span>
                        {s < 2 && <div className="flex-1 h-px bg-base-300 mx-1" />}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Header */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`${mode}-${step}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35 }}
                className="mb-7"
              >
                <h1 className="font-display text-2xl font-bold text-base-content mb-1">
                  {mode === "signin" ? "Se connecter" :
                    step === 1 ? "Créer un compte" : "Votre profil"}
                </h1>
                <p className="text-sm text-base-content/40">
                  {mode === "signin" ? "Heureux de vous revoir 👋" :
                    step === 1 ? "Renseignez vos identifiants de connexion." : "Quelques infos supplémentaires."}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* OAuth buttons (only on step 1) */}
            <AnimatePresence>
              {(mode === "signin" || step === 1) && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="grid grid-cols-2 gap-3 mb-5">
                    <button className="btn btn-outline border-base-content/12 hover:border-primary/30 hover:bg-primary/8 rounded-xl gap-2 text-xs font-medium text-base-content/50 hover:text-base-content/80 transition-all duration-200">
                      <svg width="16" height="16" viewBox="0 0 24 24">
                        <path fill="#EA4335" d="M5.26 9.77A7.22 7.22 0 0 1 12 4.8c1.73 0 3.3.62 4.53 1.64l3.38-3.37C17.76 1.19 15.07 0 12 0 7.5 0 3.67 2.7 1.84 6.63l3.42 3.14z" />
                        <path fill="#34A853" d="M16.04 18.01A7.13 7.13 0 0 1 12 19.2a7.21 7.21 0 0 1-6.73-4.6l-3.44 2.65C3.65 21.29 7.5 24 12 24c2.99 0 5.65-1.11 7.72-2.94l-3.68-3.05z" />
                        <path fill="#4A90E2" d="M19.72 21.06C21.83 19.07 23.2 16.19 23.2 12c0-.74-.1-1.52-.26-2.24H12v4.57h6.34a5.38 5.38 0 0 1-2.32 3.52l3.7 3.21z" />
                        <path fill="#FBBC05" d="M5.27 14.6A7.25 7.25 0 0 1 4.8 12c0-.9.15-1.77.43-2.59L1.81 6.27A11.94 11.94 0 0 0 0 12c0 1.99.49 3.86 1.35 5.5l3.92-2.9z" />
                      </svg>
                      Google
                    </button>
                    <button className="btn btn-outline border-base-content/12 hover:border-primary/30 hover:bg-primary/8 rounded-xl gap-2 text-xs font-medium text-base-content/50 hover:text-base-content/80 transition-all duration-200">
                      <Github size={16} />
                      GitHub
                    </button>
                  </div>

                  <div className="flex items-center gap-3 mb-5">
                    <div className="flex-1 h-px bg-base-content/8" />
                    <span className="text-[10px] uppercase tracking-widest text-base-content/25">ou</span>
                    <div className="flex-1 h-px bg-base-content/8" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`fields-${mode}-${step}`}
                  initial={{ opacity: 0, x: step === 2 ? 20 : 0 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: step === 2 ? -20 : 0 }}
                  transition={{ duration: 0.35 }}
                  className="flex flex-col gap-4"
                >
                  {/* STEP 1 / SIGNIN fields */}
                  {(mode === "signin" || step === 1) && (
                    <>
                      <div className="form-control gap-1.5">
                        <label className="label-text text-[10px] uppercase tracking-[0.2em] text-base-content/40 font-semibold">
                          Adresse e-mail <span className="text-primary">*</span>
                        </label>
                        <div className="relative">
                          <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-primary/40" />
                          <input
                            type="email"
                            required
                            value={form.email}
                            onChange={(e) => set("email", e.target.value)}
                            placeholder="vous@exemple.fr"
                            className="input input-bordered w-full pl-10 bg-base-200 border-primary/15 focus:border-primary/50 focus:outline-none text-sm rounded-xl h-11 placeholder:text-base-content/20"
                          />
                        </div>
                      </div>

                      <div className="form-control gap-1.5">
                        <label className="label-text text-[10px] uppercase tracking-[0.2em] text-base-content/40 font-semibold">
                          Mot de passe <span className="text-primary">*</span>
                        </label>
                        <div className="relative">
                          <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-primary/40" />
                          <input
                            type={showPw ? "text" : "password"}
                            required
                            value={form.password}
                            onChange={(e) => set("password", e.target.value)}
                            placeholder={mode === "signup" ? "Min. 8 caractères" : "Votre mot de passe"}
                            className="input input-bordered w-full pl-10 pr-11 bg-base-200 border-primary/15 focus:border-primary/50 focus:outline-none text-sm rounded-xl h-11 placeholder:text-base-content/20"
                          />
                          <button type="button" onClick={() => setShowPw(!showPw)}
                            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-base-content/30 hover:text-primary transition-colors">
                            {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                          </button>
                        </div>
                        {/* Strength bar (signup only) */}
                        {mode === "signup" && form.password && (
                          <div className="flex gap-1 mt-1">
                            {[1, 2, 3, 4, 5].map((i) => (
                              <div key={i} className={`flex-1 h-1 rounded-full transition-all duration-300 ${i <= strength.score ? strength.color : "bg-base-300"
                                }`} />
                            ))}
                            <span className={`text-[10px] ml-1 font-medium ${strength.score <= 1 ? "text-error" : strength.score <= 3 ? "text-warning" : "text-success"
                              }`}>{strength.label}</span>
                          </div>
                        )}
                      </div>

                      {mode === "signup" && (
                        <div className="form-control gap-1.5">
                          <label className="label-text text-[10px] uppercase tracking-[0.2em] text-base-content/40 font-semibold">
                            Confirmer le mot de passe <span className="text-primary">*</span>
                          </label>
                          <div className="relative">
                            <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-primary/40" />
                            <input
                              type={showConfirm ? "text" : "password"}
                              value={form.confirm}
                              onChange={(e) => set("confirm", e.target.value)}
                              placeholder="Répétez votre mot de passe"
                              className={`input input-bordered w-full pl-10 pr-11 bg-base-200 border-primary/15 focus:border-primary/50 focus:outline-none text-sm rounded-xl h-11 placeholder:text-base-content/20 ${form.confirm && form.confirm !== form.password ? "border-error/40" : ""
                                }`}
                            />
                            <button type="button" onClick={() => setShowConfirm(!showConfirm)}
                              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-base-content/30 hover:text-primary transition-colors">
                              {showConfirm ? <EyeOff size={15} /> : <Eye size={15} />}
                            </button>
                          </div>
                          {form.confirm && form.confirm !== form.password && (
                            <p className="text-[11px] text-error mt-0.5">Les mots de passe ne correspondent pas.</p>
                          )}
                        </div>
                      )}

                      {mode === "signin" && (
                        <div className="flex justify-end -mt-1">
                          <a href="#" className="text-xs text-primary/60 hover:text-primary transition-colors">
                            Mot de passe oublié ?
                          </a>
                        </div>
                      )}
                    </>
                  )}

                  {/* STEP 2 fields (signup only) */}
                  {mode === "signup" && step === 2 && (
                    <>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="form-control gap-1.5">
                          <label className="label-text text-[10px] uppercase tracking-[0.2em] text-base-content/40 font-semibold">
                            Prénom <span className="text-primary">*</span>
                          </label>
                          <div className="relative">
                            <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-primary/40" />
                            <input
                              type="text"
                              required
                              value={form.firstName}
                              onChange={(e) => set("firstName", e.target.value)}
                              placeholder="Jean"
                              className="input input-bordered w-full pl-10 bg-base-200 border-primary/15 focus:border-primary/50 focus:outline-none text-sm rounded-xl h-11 placeholder:text-base-content/20"
                            />
                          </div>
                        </div>
                        <div className="form-control gap-1.5">
                          <label className="label-text text-[10px] uppercase tracking-[0.2em] text-base-content/40 font-semibold">
                            Nom <span className="text-primary">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            value={form.lastName}
                            onChange={(e) => set("lastName", e.target.value)}
                            placeholder="Dupont"
                            className="input input-bordered w-full bg-base-200 border-primary/15 focus:border-primary/50 focus:outline-none text-sm rounded-xl h-11 placeholder:text-base-content/20"
                          />
                        </div>
                      </div>

                      <div className="form-control gap-1.5">
                        <label className="label-text text-[10px] uppercase tracking-[0.2em] text-base-content/40 font-semibold">
                          Téléphone
                        </label>
                        <div className="relative">
                          <Phone size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-primary/40" />
                          <input
                            type="tel"
                            value={form.phone}
                            onChange={(e) => set("phone", e.target.value)}
                            placeholder="+33 6 00 00 00 00"
                            className="input input-bordered w-full pl-10 bg-base-200 border-primary/15 focus:border-primary/50 focus:outline-none text-sm rounded-xl h-11 placeholder:text-base-content/20"
                          />
                        </div>
                      </div>

                      <div className="form-control gap-1.5">
                        <label className="label-text text-[10px] uppercase tracking-[0.2em] text-base-content/40 font-semibold">
                          Date de naissance
                        </label>
                        <div className="relative">
                          <Calendar size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-primary/40" />
                          <input
                            type="date"
                            value={form.birthdate}
                            onChange={(e) => set("birthdate", e.target.value)}
                            className="input input-bordered w-full pl-10 bg-base-200 border-primary/15 focus:border-primary/50 focus:outline-none text-sm rounded-xl h-11"
                          />
                        </div>
                      </div>

                      {/* Category preferences */}
                      <div className="form-control gap-2">
                        <label className="label-text text-[10px] uppercase tracking-[0.2em] text-base-content/40 font-semibold">
                          Vos centres d&apos;intérêt
                        </label>
                        <div className="flex flex-wrap gap-1.5">
                          {["🎵 Concerts", "🎨 Art", "💼 Conférences", "⚽ Sport", "🍾 Galas", "🎪 Festivals", "🌿 Bien-être", "🎭 Théâtre"].map((cat) => (
                            <button
                              key={cat}
                              type="button"
                              className="btn btn-xs rounded-full border border-primary/15 bg-transparent text-base-content/40 hover:border-primary/50 hover:text-primary hover:bg-primary/8 text-[10px] uppercase tracking-wider transition-all duration-200"
                            >
                              {cat}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Agreements */}
                      <div className="flex flex-col gap-2 mt-1">
                        <label className="flex items-start gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            className="checkbox checkbox-primary checkbox-sm mt-0.5 rounded"
                            checked={form.agreeTerms}
                            onChange={(e) => set("agreeTerms", e.target.checked)}
                            required
                          />
                          <span className="text-xs text-base-content/40 leading-relaxed">
                            J&apos;accepte les <a href="#" className="text-primary hover:underline">Conditions d&apos;utilisation</a> et la <a href="#" className="text-primary hover:underline">Politique de confidentialité</a> <span className="text-primary">*</span>
                          </span>
                        </label>
                        <label className="flex items-start gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            className="checkbox checkbox-primary checkbox-sm mt-0.5 rounded"
                            checked={form.agreeNewsletter}
                            onChange={(e) => set("agreeNewsletter", e.target.checked)}
                          />
                          <span className="text-xs text-base-content/40">
                            Recevoir les actualités et recommandations Event Place
                          </span>
                        </label>
                      </div>
                    </>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading || (mode === "signup" && step === 2 && !form.agreeTerms)}
                className="btn btn-primary w-full rounded-xl gap-2 text-xs uppercase tracking-widest font-semibold h-12 shadow-lg shadow-primary/25 mt-1 disabled:opacity-40"
              >
                {loading ? (
                  <span className="loading loading-spinner loading-sm" />
                ) : (
                  <>
                    {mode === "signin" ? "Se connecter" :
                      step === 1 ? "Continuer" : "Créer mon compte"}
                    <ArrowRight size={14} />
                  </>
                )}
              </button>
            </form>

            {/* Back link for step 2 */}
            {mode === "signup" && step === 2 && (
              <button
                type="button"
                onClick={() => setStep(1)}
                className="btn btn-ghost btn-sm w-full rounded-xl text-xs text-base-content/30 hover:text-base-content/60 mt-2"
              >
                ← Retour
              </button>
            )}

            {/* Switch mode link */}
            <p className="text-center text-xs text-base-content/30 mt-6">
              {mode === "signup" ? "Déjà un compte ? " : "Pas encore de compte ? "}
              <button
                type="button"
                onClick={() => switchMode(mode === "signup" ? "signin" : "signup")}
                className="text-primary hover:text-accent transition-colors font-semibold"
              >
                {mode === "signup" ? "Se connecter" : "S'inscrire gratuitement"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
