import Footer from "@/src/components/layout/Footer";
import Navbar from "@/src/components/layout/Navbar";
import MentionsLegalesPage from "@/src/components/pages/MentionsLegalesPage";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Mentions légales — Event Place", description: "Informations légales sur Event Place SAS, éditeur du site Event Place.fr." };
export default function Page() { return (<><Navbar /><MentionsLegalesPage /><Footer /></>); }
