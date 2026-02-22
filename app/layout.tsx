import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Event Place — Découvrez des événements inoubliables",
  description:
    "La plateforme d'événements premium. Concerts, expositions, conférences, galas — réservez vos prochaines expériences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" data-theme="event-night" className="h-full" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-full`}
      >
        <ToastContainer
          position="top-right"
          autoClose={3000}
          theme="colored"
        />
        {children}
      </body>
    </html>
  );
}
