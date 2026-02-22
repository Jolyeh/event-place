import Navbar from "@/src/components/layout/Navbar";
import BookingPage from "@/src/components/pages/BookingPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Réserver — Event Place",
  description: "Finalisez votre réservation en quelques étapes sécurisées.",
};

export default function Page() {
  return (
    <>
      <Navbar />
      <BookingPage />
    </>
  );
}
