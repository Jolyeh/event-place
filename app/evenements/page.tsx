import Navbar from "@/src/components/layout/Navbar";
import EventsPage from "@/src/components/pages/EventsPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Événements — Event Place",
    description: "Explorez tous les événements disponibles sur Event Place."
};

export default function Page() {
    return (
        <><Navbar />
            <EventsPage />
        </>
    );
}
