import Footer from "@/src/components/layout/Footer";
import Navbar from "@/src/components/layout/Navbar";
import CGUPage from "@/src/components/pages/CGUPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Conditions Générales d'Utilisation — Event Place",
  description: "Les CGU d'Event Place définissent les règles d'utilisation de la plateforme pour tous les utilisateurs et organisateurs.",
};

export default function Page() {
  return (
    <>
      <Navbar />
      <CGUPage />
      <Footer />
    </>
  );
}
