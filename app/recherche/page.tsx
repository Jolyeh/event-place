import Navbar from "@/src/components/layout/Navbar";
import SearchPage from "@/src/components/pages/SearchPage";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Recherche — Event Place", description: "Recherchez parmi des milliers d'événements sur Event Place." };
export default function Page() { return (<><Navbar /><SearchPage /></>); }
