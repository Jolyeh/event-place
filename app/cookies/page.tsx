import Navbar from "@/src/components/layout/Navbar";
import CookiesPage from "@/src/components/pages/CookiesPage";
import type { Metadata } from "next";


export const metadata: Metadata = {
    title: "Cookies — Event Place",
    description: "Politique de cookies Event Place et gestion de vos préférences."
};
export default function Page() {
    return (
        <>
            <Navbar />
            <CookiesPage />
        </>
    );
}
