import Navbar from "@/src/components/layout/Navbar";
import PrivacyPage from "@/src/components/pages/PrivacyPage";
import type { Metadata } from "next";


export const metadata: Metadata = {
    title: "Confidentialité — Event Place",
    description: "Politique de confidentialité Event Place - Comment nous traitons vos données personnelles."
};
export default function Page() {
    return (
        <>
            <Navbar />
            <PrivacyPage />
        </>
    );
}
