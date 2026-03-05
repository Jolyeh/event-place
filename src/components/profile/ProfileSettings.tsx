"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check, Lock, Eye, EyeOff, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ProfileSettings() {
  const router = useRouter();

  const [savedPassword, setSavedPassword] = useState(false);
  const [showOldPw, setShowOldPw] = useState(false);
  const [showNewPw, setShowNewPw] = useState(false);
  const [loadingPassword, setLoadingPassword] = useState(false);
  const [errorPassword, setErrorPassword] = useState<string | null>(null);

  const [pwForm, setPwForm] = useState({
    oldPw: "",
    newPw: "",
    confirmPw: "",
  });

  const setPw = (f: string, v: string) => setPwForm(p => ({ ...p, [f]: v }));

  const handleSavePassword = async () => {
    setErrorPassword(null);

    if (!pwForm.oldPw || !pwForm.newPw || !pwForm.confirmPw) {
      setErrorPassword("Veuillez remplir tous les champs");
      return;
    }
    if (pwForm.newPw !== pwForm.confirmPw) {
      setErrorPassword("Les mots de passe ne correspondent pas");
      return;
    }

    setLoadingPassword(true);
    try {
      const res = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword: pwForm.oldPw,
          newPassword: pwForm.newPw,
          confirmPassword: pwForm.confirmPw,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erreur lors du changement");
      setSavedPassword(true);
      setPwForm({ oldPw: "", newPw: "", confirmPw: "" });
      setTimeout(() => setSavedPassword(false), 2500);
    } catch (err: unknown) {
      setErrorPassword(err instanceof Error ? err.message : "Erreur serveur");
    } finally {
      setLoadingPassword(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/authentification");
  };

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

      <AnimatePresence>
        {savedPassword && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 right-6 z-50 alert bg-success/10 border border-success/25 text-success shadow-xl rounded-2xl py-3 px-4 flex items-center gap-2"
          >
            <Check size={15} />
            <span className="text-sm font-medium">Mot de passe mis à jour !</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="card bg-base-200 border border-primary/8 mb-5">
        <div className="card-body p-6 gap-5">
          <div className="flex items-center gap-2 pb-1 border-b border-primary/8">
            <Lock size={15} className="text-primary" />
            <h3 className="font-display text-base font-bold text-base-content">Sécurité &amp; Connexion</h3>
          </div>

          <div className="form-control gap-1.5">
            <label className="label-text text-[10px] uppercase tracking-[0.2em] text-base-content/40 font-semibold">
              Ancien mot de passe
            </label>
            <div className="relative">
              <input
                type={showOldPw ? "text" : "password"}
                value={pwForm.oldPw}
                onChange={e => setPw("oldPw", e.target.value)}
                placeholder="********"
                className="input input-bordered w-full pr-11 bg-base-300 border-primary/15 focus:border-primary/50 focus:outline-none text-sm rounded-xl h-11 placeholder:text-base-content/20"
              />
              <button type="button" onClick={() => setShowOldPw(!showOldPw)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-base-content/30 hover:text-primary transition-colors">
                {showOldPw ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          <div className="form-control gap-1.5">
            <label className="label-text text-[10px] uppercase tracking-[0.2em] text-base-content/40 font-semibold">
              Nouveau mot de passe
            </label>
            <div className="relative">
              <input
                type={showNewPw ? "text" : "password"}
                value={pwForm.newPw}
                onChange={e => setPw("newPw", e.target.value)}
                placeholder="********"
                className="input input-bordered w-full pr-11 bg-base-300 border-primary/15 focus:border-primary/50 focus:outline-none text-sm rounded-xl h-11 placeholder:text-base-content/20"
              />
              <button type="button" onClick={() => setShowNewPw(!showNewPw)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-base-content/30 hover:text-primary transition-colors">
                {showNewPw ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          <div className="form-control gap-1.5">
            <label className="label-text text-[10px] uppercase tracking-[0.2em] text-base-content/40 font-semibold">
              Confirmer le nouveau mot de passe
            </label>
            <input
              type="password"
              value={pwForm.confirmPw}
              onChange={e => setPw("confirmPw", e.target.value)}
              placeholder="********"
              className={`input input-bordered w-full bg-base-300 focus:outline-none text-sm rounded-xl h-11 placeholder:text-base-content/20 ${
                pwForm.confirmPw && pwForm.confirmPw !== pwForm.newPw
                  ? "border-error/40"
                  : "border-primary/15 focus:border-primary/50"
              }`}
            />
            {pwForm.confirmPw && pwForm.confirmPw !== pwForm.newPw && (
              <p className="text-[11px] text-error">Les mots de passe ne correspondent pas</p>
            )}
          </div>

          <AnimatePresence>
            {errorPassword && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2.5 bg-error/10 border border-error/25 text-error rounded-xl px-4 py-3"
              >
                <AlertCircle size={14} className="shrink-0" />
                <span className="text-xs font-medium">{errorPassword}</span>
              </motion.div>
            )}
          </AnimatePresence>

          <button
            onClick={handleSavePassword}
            disabled={loadingPassword}
            className="btn btn-primary w-full rounded-xl gap-2 text-xs uppercase tracking-widest font-semibold h-12 shadow-lg shadow-primary/25 disabled:opacity-50"
          >
            {loadingPassword
              ? <><span className="loading loading-spinner loading-sm" /> Mise à jour…</>
              : "Changer le mot de passe"
            }
          </button>

          <button
            onClick={handleLogout}
            className="btn btn-error btn-soft w-full rounded-xl gap-2 text-xs uppercase tracking-widest font-semibold h-12"
          >
            Déconnexion
          </button>
        </div>
      </div>
    </div>
  );
}