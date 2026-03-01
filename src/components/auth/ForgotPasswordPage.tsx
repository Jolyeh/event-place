"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import {
  Zap, Mail, Lock, Eye, EyeOff, ArrowLeft,
  ArrowRight, Check, RefreshCw, ShieldCheck,
  Sparkles, KeyRound, CheckCircle,
} from "lucide-react";

// ─── Password strength helper ────────────────────────────────────────────────
function getStrength(pw: string) {
  if (!pw) return { score: 0, label: "", color: "" };
  let s = 0;
  if (pw.length >= 8)           s++;
  if (pw.length >= 12)          s++;
  if (/[A-Z]/.test(pw))         s++;
  if (/[0-9]/.test(pw))         s++;
  if (/[^a-zA-Z0-9]/.test(pw)) s++;
  if (s <= 1) return { score: s, label: "Faible",    color: "bg-error" };
  if (s <= 2) return { score: s, label: "Correct",   color: "bg-warning" };
  if (s <= 3) return { score: s, label: "Bon",       color: "bg-info" };
  return       { score: s, label: "Excellent", color: "bg-success" };
}

// ─── Visual background per step ──────────────────────────────────────────────
const STEP_BG: Record<number, { img: string; quote: string; author: string }> = {
  1: {
    img: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=900&q=80",
    quote: "Chaque accès perdu est une\nporte vers un nouveau départ.",
    author: "Service de sécurité Event Place",
  },
  2: {
    img: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=900&q=80",
    quote: "Votre identité, protégée\npar un code éphémère.",
    author: "Authentification à deux facteurs",
  },
  3: {
    img: "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=900&q=80",
    quote: "Un nouveau mot de passe,\nune nouvelle sérénité.",
    author: "Sécurité renforcée",
  },
};

// ─── OTP Input ───────────────────────────────────────────────────────────────
function OtpInput({
  value,
  onChange,
  error,
}: {
  value: string;
  onChange: (v: string) => void;
  error?: string;
}) {
  const refs = useRef<(HTMLInputElement | null)[]>([]);
  const digits = value.split("").concat(Array(6).fill("")).slice(0, 6);

  const handleKey = (i: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      if (!digits[i] && i > 0) refs.current[i - 1]?.focus();
      const next = digits.map((d, idx) => (idx === i ? "" : d)).join("");
      onChange(next);
    }
  };

  const handleChange = (i: number, v: string) => {
    const char = v.replace(/\D/g, "").slice(-1);
    const next = digits.map((d, idx) => (idx === i ? char : d)).join("");
    onChange(next);
    if (char && i < 5) refs.current[i + 1]?.focus();
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const paste = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (paste) {
      onChange(paste.padEnd(6, ""));
      refs.current[Math.min(paste.length, 5)]?.focus();
    }
    e.preventDefault();
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex gap-2.5">
        {digits.map((d, i) => (
          <input
            key={i}
            ref={(el) => { refs.current[i] = el; }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={d}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKey(i, e)}
            onPaste={handlePaste}
            className={`w-11 h-14 text-center text-xl font-bold font-mono rounded-2xl border-2 bg-base-300 focus:outline-none transition-all duration-200 text-base-content
              ${d ? "border-primary shadow-lg shadow-primary/15" : error ? "border-error/50" : "border-primary/15"}
              focus:border-primary focus:bg-primary/5 focus:shadow-lg focus:shadow-primary/20`}
          />
        ))}
      </div>
      {error && (
        <p className="text-[11px] text-error text-center">{error}</p>
      )}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function ForgotPasswordPage() {
  const [step, setStep]         = useState(1);
  const [email, setEmail]       = useState("");
  const [otp, setOtp]           = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm]   = useState("");
  const [showPw, setShowPw]     = useState(false);
  const [showCf, setShowCf]     = useState(false);
  const [loading, setLoading]   = useState(false);
  const [resent, setResent]     = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [errors, setErrors]     = useState<Record<string, string>>({});
  const [done, setDone]         = useState(false);

  const strength = getStrength(password);
  const bg = STEP_BG[step];

  // Countdown for resend
  useEffect(() => {
    if (countdown <= 0) return;
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown]);

  const startCountdown = () => setCountdown(60);

  // ── Validate step 1 ──
  const validateEmail = () => {
    const e: Record<string, string> = {};
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      e.email = "Adresse e-mail invalide";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // ── Validate step 2 ──
  const validateOtp = () => {
    const e: Record<string, string> = {};
    if (otp.replace(/\s/g, "").length < 6)
      e.otp = "Le code doit contenir 6 chiffres";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // ── Validate step 3 ──
  const validatePassword = () => {
    const e: Record<string, string> = {};
    if (password.length < 8) e.password = "8 caractères minimum";
    if (strength.score < 2)  e.password = "Mot de passe trop faible";
    if (password !== confirm) e.confirm = "Les mots de passe ne correspondent pas";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // ── Submit per step ──
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (step === 1) {
      if (!validateEmail()) return;
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setStep(2);
        startCountdown();
      }, 1200);
      return;
    }

    if (step === 2) {
      if (!validateOtp()) return;
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setStep(3);
      }, 900);
      return;
    }

    if (step === 3) {
      if (!validatePassword()) return;
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setDone(true);
      }, 1400);
    }
  };

  const handleResend = () => {
    if (countdown > 0) return;
    setResent(true);
    startCountdown();
    setTimeout(() => setResent(false), 3000);
  };

  // ── Password match indicator ──
  const pwMatch = confirm.length > 0 && password === confirm;
  const pwMismatch = confirm.length > 0 && password !== confirm;

  return (
    <div className="min-h-screen bg-base-100 flex">

      {/* ══ LEFT — Visual panel ══════════════════════════════════════════════ */}
      <div className="hidden lg:flex lg:w-[45%] xl:w-[42%] relative flex-col justify-between overflow-hidden">
        {/* Background image */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={bg.img}
              alt=""
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        </AnimatePresence>

        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-base-100 via-base-100/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-base-100/30 to-transparent" />

        {/* Floating orbs */}
        <div className="absolute top-1/4 right-10 w-48 h-48 rounded-full bg-primary/12 blur-3xl pointer-events-none animate-float" />
        <div className="absolute bottom-1/3 left-8 w-32 h-32 rounded-full bg-accent/10 blur-2xl pointer-events-none" />

        {/* Top — Logo */}
        <div className="relative z-10 p-8">
          <Link href="/" className="inline-flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-lg shadow-primary/30">
              <Zap size={18} fill="white" className="text-white" />
            </div>
            <span className="font-display text-xl font-bold text-base-content tracking-tight">
              Event Place
            </span>
          </Link>
        </div>

        {/* Bottom — Quote */}
        <div className="relative z-10 p-8 pb-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="w-8 h-0.5 bg-primary/50 mb-4" />
              <p className="font-display text-xl font-bold italic text-base-content/80 leading-snug mb-3 whitespace-pre-line">
                {bg.quote}
              </p>
              <div className="flex items-center gap-2">
                <ShieldCheck size={12} className="text-primary/50" />
                <span className="text-[11px] text-base-content/35 uppercase tracking-wider">{bg.author}</span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ══ RIGHT — Form panel ═══════════════════════════════════════════════ */}
      <div className="flex-1 flex flex-col min-h-screen overflow-y-auto">

        {/* Mobile logo bar */}
        <div className="lg:hidden flex items-center justify-between px-5 py-4 border-b border-primary/8">
          <Link href="/" className="inline-flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-md shadow-primary/25">
              <Zap size={15} fill="white" className="text-white" />
            </div>
            <span className="font-display text-lg font-bold text-base-content">Event Place</span>
          </Link>
          <Link href="/inscription" className="text-xs text-base-content/35 hover:text-primary transition-colors uppercase tracking-wider">
            Se connecter
          </Link>
        </div>

        {/* Form content */}
        <div className="flex-1 flex items-center justify-center px-6 sm:px-10 py-12">
          <div className="w-full max-w-[420px]">

            {/* Back link */}
            {!done && (
              <motion.div
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                className="mb-8"
              >
                <Link
                  href={step === 1 ? "/authentification" : "#"}
                  onClick={step > 1 ? (e) => { e.preventDefault(); setStep((s) => s - 1); } : undefined}
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-base-content/30 hover:text-primary transition-colors duration-200 group"
                >
                  <ArrowLeft size={13} className="group-hover:-translate-x-0.5 transition-transform duration-200" />
                  {step === 1 ? "Retour à la connexion" : "Étape précédente"}
                </Link>
              </motion.div>
            )}

            {/* ── DONE state ── */}
            <AnimatePresence mode="wait">
              {done ? (
                <motion.div
                  key="done"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col items-center text-center"
                >
                  {/* Animated success icon */}
                  <div className="relative mb-7">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.1, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                      className="w-24 h-24 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center"
                    >
                      <CheckCircle size={42} className="text-primary" strokeWidth={1.5} />
                    </motion.div>
                    {/* Pulse rings */}
                    {[1, 2].map((i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 1, opacity: 0.4 }}
                        animate={{ scale: 1.8 + i * 0.4, opacity: 0 }}
                        transition={{ delay: 0.2 + i * 0.18, duration: 1.2, ease: "easeOut" }}
                        className="absolute inset-0 rounded-full border border-primary/25"
                      />
                    ))}
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    <div className="badge badge-outline border-primary/25 text-primary text-[10px] uppercase tracking-[0.2em] py-2 px-5 gap-2 mb-5">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                      Mot de passe mis à jour
                    </div>

                    <h1 className="font-display text-3xl font-bold text-base-content mb-2 leading-tight">
                      C&apos;est tout bon,{" "}
                      <em className="italic font-light text-primary">
                        bienvenue&nbsp;!
                      </em>
                    </h1>
                    <p className="text-sm text-base-content/42 leading-relaxed mb-8 max-w-xs mx-auto">
                      Votre mot de passe a été réinitialisé avec succès. Vous pouvez maintenant vous connecter.
                    </p>

                    {/* Security tip */}
                    <div className="card bg-base-200 border border-primary/10 p-4 text-left mb-7">
                      <div className="flex items-start gap-3">
                        <ShieldCheck size={16} className="text-primary/50 shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs font-semibold text-base-content/60 mb-1">Conseil de sécurité</p>
                          <p className="text-[11px] text-base-content/35 leading-relaxed">
                            Si vous n&apos;êtes pas à l&apos;origine de cette demande, sécurisez votre adresse e-mail immédiatement et contactez notre support.
                          </p>
                        </div>
                      </div>
                    </div>

                    <Link
                      href="/authentification"
                      className="btn btn-primary w-full rounded-xl gap-2 text-xs uppercase tracking-widest font-semibold h-12 shadow-xl shadow-primary/25"
                    >
                      Se connecter maintenant
                      <ArrowRight size={14} />
                    </Link>
                  </motion.div>
                </motion.div>

              ) : (
                /* ── Step forms ── */
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
                >
                  {/* ──── STEP 1 — Email ──── */}
                  {step === 1 && (
                    <>
                      {/* Header */}
                      <div className="mb-8">
                        <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-5 shadow-lg shadow-primary/10">
                          <KeyRound size={22} className="text-primary" />
                        </div>
                        <h1 className="font-display text-3xl font-bold text-base-content mb-2 leading-tight">
                          Mot de passe{" "}
                          <em className="italic font-light text-primary">oublié&nbsp;?</em>
                        </h1>
                        <p className="text-sm text-base-content/42 leading-relaxed">
                          Pas de panique. Entrez votre adresse e-mail et nous vous enverrons un code de vérification.
                        </p>
                      </div>

                      {/* Form */}
                      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                        <div className="form-control gap-2">
                          <label className="text-[10px] uppercase tracking-wider text-base-content/38">
                            Adresse e-mail <span className="text-primary">*</span>
                          </label>
                          <div className="relative">
                            <input
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              onFocus={() => setErrors({})}
                              placeholder="sophie@exemple.fr"
                              autoFocus
                              className={`input input-bordered w-full bg-base-200 focus:outline-none text-sm h-12 rounded-xl placeholder:text-base-content/18 transition-colors duration-200 ${
                                errors.email
                                  ? "border-error/60 focus:border-error/80"
                                  : "border-primary/12 focus:border-primary/50"
                              }`}
                            />
                          </div>
                          {errors.email && (
                            <p className="text-[11px] text-error flex items-center gap-1.5">
                              <span className="w-1 h-1 rounded-full bg-error inline-block" />
                              {errors.email}
                            </p>
                          )}
                        </div>

                        {/* Info note */}
                        <div className="flex items-start gap-3 bg-base-200 border border-primary/10 rounded-xl p-3.5">
                          <Sparkles size={14} className="text-primary/50 shrink-0 mt-0.5" />
                          <p className="text-[11px] text-base-content/38 leading-relaxed">
                            Un code à 6 chiffres valable <strong className="text-base-content/55">15 minutes</strong> sera envoyé à votre adresse. Pensez à vérifier vos spams.
                          </p>
                        </div>

                        <button
                          type="submit"
                          disabled={loading || !email}
                          className="btn btn-primary w-full rounded-xl gap-2 text-xs uppercase tracking-widest font-semibold h-12 shadow-xl shadow-primary/25 disabled:opacity-50 mt-1"
                        >
                          {loading ? (
                            <><span className="loading loading-spinner loading-sm" /> Envoi en cours…</>
                          ) : (
                            <>Envoyer le code <ArrowRight size={14} /></>
                          )}
                        </button>
                      </form>

                      {/* Back to login */}
                      <p className="text-center text-xs text-base-content/30 mt-7">
                        Vous vous souvenez de votre mot de passe ?{" "}
                        <Link href="/inscription" className="text-primary hover:underline font-semibold">
                          Se connecter
                        </Link>
                      </p>
                    </>
                  )}

                  {/* ──── STEP 2 — OTP code ──── */}
                  {step === 2 && (
                    <>
                      {/* Header */}
                      <div className="mb-8">
                        <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/25 flex items-center justify-center mb-5 shadow-lg shadow-primary/10">
                          <Mail size={22} className="text-primary" />
                        </div>
                        <h1 className="font-display text-3xl font-bold text-base-content mb-2 leading-tight">
                          Entrez le{" "}
                          <em className="italic font-light text-primary">code secret</em>
                        </h1>
                        <p className="text-sm text-base-content/42 leading-relaxed mb-2">
                          Nous avons envoyé un code à 6 chiffres à :
                        </p>
                        <div className="inline-flex items-center gap-2 bg-base-200 border border-primary/15 rounded-full px-4 py-1.5">
                          <Mail size={12} className="text-primary/60" />
                          <span className="text-sm font-semibold text-primary/80">{email}</span>
                        </div>
                      </div>

                      <form onSubmit={handleSubmit} className="flex flex-col items-start gap-6">
                        {/* OTP input */}
                        <div className="flex flex-col items-start gap-2">
                          <label className="text-[10px] uppercase tracking-wider text-base-content/38 text-center">
                            Code de vérification
                          </label>
                          <OtpInput value={otp} onChange={setOtp} error={errors.otp} />
                        </div>

                        {/* Countdown + resend */}
                        <div className="flex flex-col items-center gap-3">
                          {countdown > 0 ? (
                            <p className="text-[11px] text-base-content/30">
                              Nouveau code disponible dans{" "}
                              <span className="font-mono font-bold text-primary/60 tabular-nums">
                                {String(Math.floor(countdown / 60)).padStart(2, "0")}:
                                {String(countdown % 60).padStart(2, "0")}
                              </span>
                            </p>
                          ) : (
                            <button
                              type="button"
                              onClick={handleResend}
                              className="flex items-center gap-1.5 text-xs text-primary/60 hover:text-primary transition-colors uppercase tracking-wider"
                            >
                              <RefreshCw size={12} className={resent ? "animate-spin" : ""} />
                              {resent ? "Code envoyé !" : "Renvoyer le code"}
                            </button>
                          )}

                          {resent && (
                            <motion.p
                              initial={{ opacity: 0, y: 4 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="text-[11px] text-success flex items-start gap-1.5"
                            >
                              <Check size={11} /> Code renvoyé à {email}
                            </motion.p>
                          )}
                        </div>
                        <button
                          type="submit"
                          disabled={loading || otp.replace(/\s/g, "").length < 6}
                          className="btn btn-primary w-full rounded-xl gap-2 text-xs uppercase tracking-widest font-semibold h-12 shadow-xl shadow-primary/25 disabled:opacity-50"
                        >
                          {loading ? (
                            <><span className="loading loading-spinner loading-sm" /> Vérification…</>
                          ) : (
                            <>Vérifier le code <ArrowRight size={14} /></>
                          )}
                        </button>
                      </form>
                    </>
                  )}

                  {/* ──── STEP 3 — New password ──── */}
                  {step === 3 && (
                    <>
                      {/* Header */}
                      <div className="mb-8">
                        <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/25 flex items-center justify-center mb-5 shadow-lg shadow-primary/10">
                          <Lock size={22} className="text-primary" />
                        </div>
                        <h1 className="font-display text-3xl font-bold text-base-content mb-2 leading-tight">
                          Nouveau{" "}
                          <em className="italic font-light text-primary">mot de passe</em>
                        </h1>
                        <p className="text-sm text-base-content/42 leading-relaxed">
                          Choisissez un mot de passe fort et mémorable. Il doit différer de l&apos;ancien.
                        </p>
                      </div>

                      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                        {/* New password */}
                        <div className="form-control gap-2">
                          <label className="text-[10px] uppercase tracking-wider text-base-content/38">
                            Nouveau mot de passe <span className="text-primary">*</span>
                          </label>
                          <div className="relative">
                            <input
                              type={showPw ? "text" : "password"}
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              onFocus={() => setErrors((prev) => ({ ...prev, password: "" }))}
                              placeholder="Minimum 8 caractères"
                              autoFocus
                              className={`input input-bordered w-full pr-11 bg-base-200 focus:outline-none text-sm h-12 rounded-xl placeholder:text-base-content/18 transition-colors duration-200 ${
                                errors.password
                                  ? "border-error/60 focus:border-error/80"
                                  : "border-primary/12 focus:border-primary/50"
                              }`}
                            />
                            <button
                              type="button"
                              onClick={() => setShowPw(!showPw)}
                              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-base-content/25 hover:text-primary transition-colors"
                            >
                              {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                            </button>
                          </div>

                          {/* Strength bar */}
                          {password && (
                            <motion.div
                              initial={{ opacity: 0, y: -4 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="flex flex-col mt-3 gap-1.5"
                            >
                              <div className="flex gap-1">
                                {[1, 2, 3, 4].map((i) => (
                                  <motion.div
                                    key={i}
                                    className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                                      i <= strength.score ? strength.color : "bg-base-300"
                                    }`}
                                    initial={{ scaleX: 0 }}
                                    animate={{ scaleX: i <= strength.score ? 1 : 0 }}
                                    transition={{ delay: i * 0.05, duration: 0.3 }}
                                    style={{ transformOrigin: "left" }}
                                  />
                                ))}
                              </div>
                              <div className="flex items-center justify-between">
                                <p className={`text-[10px] font-semibold uppercase tracking-wider ${
                                  strength.score <= 1 ? "text-error"
                                  : strength.score <= 2 ? "text-warning"
                                  : strength.score <= 3 ? "text-info"
                                  : "text-success"
                                }`}>
                                  {strength.label}
                                </p>
                                <p className="text-[10px] text-base-content/25">
                                  {password.length} caractères
                                </p>
                              </div>
                            </motion.div>
                          )}

                          {errors.password && (
                            <p className="text-[11px] text-error flex items-center gap-1.5">
                              <span className="w-1 h-1 rounded-full bg-error inline-block" />
                              {errors.password}
                            </p>
                          )}
                        </div>


                        {/* Confirm password */}
                        <div className="form-control gap-2">
                          <label className="text-[10px] uppercase tracking-wider text-base-content/38">
                            Confirmer le mot de passe <span className="text-primary">*</span>
                          </label>
                          <div className="relative">
                            <input
                              type={showCf ? "text" : "password"}
                              value={confirm}
                              onChange={(e) => setConfirm(e.target.value)}
                              onFocus={() => setErrors((prev) => ({ ...prev, confirm: "" }))}
                              placeholder="Répétez le mot de passe"
                              className={`input input-bordered w-full pr-11 bg-base-200 focus:outline-none text-sm h-12 rounded-xl placeholder:text-base-content/18 transition-colors duration-200 ${
                                pwMismatch
                                  ? "border-error/60 focus:border-error/80"
                                  : pwMatch
                                  ? "border-success/50 focus:border-success/70"
                                  : "border-primary/12 focus:border-primary/50"
                              }`}
                            />
                            {/* Eye toggle */}
                            <button
                              type="button"
                              onClick={() => setShowCf(!showCf)}
                              className="absolute right-10 top-1/2 -translate-y-1/2 text-base-content/22 hover:text-primary transition-colors"
                            >
                              {showCf ? <EyeOff size={15} /> : <Eye size={15} />}
                            </button>
                            {/* Match indicator */}
                            <AnimatePresence>
                              {pwMatch && (
                                <motion.div
                                  initial={{ scale: 0, opacity: 0 }}
                                  animate={{ scale: 1, opacity: 1 }}
                                  exit={{ scale: 0, opacity: 0 }}
                                  className="absolute right-3.5 top-1/2 -translate-y-1/2"
                                >
                                  <Check size={15} className="text-success" strokeWidth={2.5} />
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                          {errors.confirm && (
                            <p className="text-[11px] text-error flex items-center gap-1.5">
                              <span className="w-1 h-1 rounded-full bg-error inline-block" />
                              {errors.confirm}
                            </p>
                          )}
                          {pwMatch && (
                            <p className="text-[11px] text-success flex items-center gap-1.5">
                              <Check size={10} /> Les mots de passe correspondent
                            </p>
                          )}
                        </div>

                        <button
                          type="submit"
                          disabled={loading || !password || !confirm}
                          className="btn btn-primary w-full rounded-xl gap-2 text-xs uppercase tracking-widest font-semibold h-12 shadow-xl shadow-primary/25 disabled:opacity-50 mt-1"
                        >
                          {loading ? (
                            <><span className="loading loading-spinner loading-sm" /> Mise à jour…</>
                          ) : (
                            <><Lock size={14} /> Enregistrer</>
                          )}
                        </button>
                      </form>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </div>
      </div>
    </div>
  );
}
