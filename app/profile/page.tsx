import Navbar from "@/src/components/layout/Navbar";
import ProfilePage from "@/src/components/profile/ProfilePage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mon Profil — Event Place",
  description: "Gérez votre profil, vos billets et vos événements sauvegardés.",
};

export default function Page() {
  return (
    <div>
      <Navbar />
      <ProfilePage />
    </div>
  );
}
