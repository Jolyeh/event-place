import ForgotPasswordPage from "@/src/components/auth/ForgotPasswordPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mot de passe oublié — Event Place",
  description: "Réinitialisez votre mot de passe Event Place en quelques secondes.",
};

export default function Page() {
  return <ForgotPasswordPage />;
}
