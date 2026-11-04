import "@/styles/globals.css";

import "leaflet/dist/leaflet.css";
import { Bricolage_Grotesque, DM_Sans } from "next/font/google";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CartShell from "@/components/cart/CartShell";

export const metadata = {
  title: "100 Peptides Research | Premium Research Peptides",
  description:
    "Explore research peptides at 100 Peptides Research. Browse BPC-157, TB-500, GHK-Cu, CJC-1295, and more compounds for laboratory research use only.",
  keywords: [
    "100 Peptides Research",
    "Research Peptides",
    "Laboratory Research Peptides",
    "BPC-157",
    "TB-500",
    "GHK-Cu",
    "CJC-1295",
    "Peptide Research",
  ],
};
const headingFont = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});

const bodyFont = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${headingFont.variable} ${bodyFont.variable}`}>
      <body className="antialiased">
        <CartShell>
          <Header />
          {children}
          <Footer />
        </CartShell>
      </body>
    </html>
  );
}
