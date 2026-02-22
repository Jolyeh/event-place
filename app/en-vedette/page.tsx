import Footer from "@/src/components/layout/Footer";
import Navbar from "@/src/components/layout/Navbar";
import FeaturedPage from "@/src/components/pages/FeaturedPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Événements en vedette — Event Place",
    description: "Les événements les plus exclusifs, soigneusement sélectionnés par Event Place."
};
export default function Page() {
    return (
        <>
            <Navbar />
            <FeaturedPage />
            <Footer />
        </>
    );
}
