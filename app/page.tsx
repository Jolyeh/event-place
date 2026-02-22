import Footer from "@/src/components/layout/Footer";
import Navbar from "@/src/components/layout/Navbar";
import CategoriesSection from "@/src/components/sections/CategoriesSection";
import EventsGrid from "@/src/components/sections/EventsGrid";
import Hero from "@/src/components/sections/Hero";
import HowItWorks from "@/src/components/sections/HowItWorks";
import Newsletter from "@/src/components/sections/Newsletter";
import OrganizerCTA from "@/src/components/sections/OrganizerCTA";
import StatsBar from "@/src/components/sections/StatsBar";
import Testimonials from "@/src/components/sections/Testimonials";
import ScrollingTicker from "@/src/components/ui/ScrollingTicker";

export default function Home() {
    
    return (
        <main className="min-h-screen">
            <Navbar />
            <Hero />
            <StatsBar />
            <ScrollingTicker />
            <EventsGrid />
            <CategoriesSection />
            <HowItWorks />
            <Testimonials />
            <OrganizerCTA />
            <Newsletter />
            <Footer />
        </main>
    )
}