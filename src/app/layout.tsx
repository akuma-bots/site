import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "NÊMESIS — O HUB do competitivo",
  description: "Plataforma competitiva comunitária: rankings, equipes, partidas InHouse e eventos."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen font-body">
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
