import Footer from "@/src/components/layout/Footer";
import Navbar from "@/src/components/layout/Navbar";
import CategoriesPage from "@/src/components/pages/CategoriesPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Catégories — Event Place",
    description: "Explorez les événements par catégorie : concerts, expositions, galas, sport et plus."
};
export default function Page() {
    return (
        <>
            <Navbar />
            <CategoriesPage />
            <Footer />
        </>
    );
}
