import Navbar from "@/src/components/layout/Navbar";
import PublishFlow from "@/src/components/publish/PublishFlow";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Publier un événement — Event Place",
  description: "Créez et publiez votre événement sur Event Place. Atteignez des milliers de participants.",
};

export default function PublierPage() {
  return (
    <div>
      <Navbar />
      <PublishFlow />
    </div>
  );
}
