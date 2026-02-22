import AuthPage from "@/src/components/auth/AuthPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inscription — Event Place",
  description: "Créez votre compte Event Place et accédez à des milliers d'événements.",
};

export default function Page() {
  return <AuthPage />;
}
