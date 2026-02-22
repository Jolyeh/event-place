import EventDetailPage from "@/src/components/event/EventDetailPage";
import Footer from "@/src/components/layout/Footer";
import Navbar from "@/src/components/layout/Navbar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Orchestre Philharmonique de Paris — Event Place",
  description: "Réservez vos billets pour l'Orchestre Philharmonique de Paris.",
};

export default function Page() {
  return (
    <>
      <Navbar />
      <EventDetailPage />
      <Footer />
    </>
  );
}
