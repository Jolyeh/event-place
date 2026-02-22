import Navbar from "@/src/components/layout/Navbar";
import SupportPage from "@/src/components/pages/SupportPage";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Support — Event Place", description: "Centre d'aide Event Place. FAQ, chat en direct et formulaire de contact." };
export default function Page() { return (<><Navbar /><SupportPage /></>); }
