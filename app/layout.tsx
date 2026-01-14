import type { Metadata } from "next";
import "./globals.css";
import NavbarWrapper from "@/components/NavbarWrapper";
import { Toaster } from "@/components/ui/sonner";
import { Faustina, Parisienne } from "next/font/google";
import ScrollToTopButton from "./_components/ScrollToTopButton";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "The Soulcial Well",
  description: "Bringing back community",
  openGraph: {
    title: "The Soulcial Well",
    description: "Bringing back community",
    url: "https://www.thesoulcialwell.org",
    images: [
      {
        url: "https://www.thesoulcialwell.org/open-graph.png",
        width: 1200,
        height: 640,
        alt: "The Soulcial Well",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Soulcial Well",
    description: "Bringing back community",
    images: ["https://www.thesoulcialwell.org/open-graph.png"],
  },
  icons: {
    icon: "./favicon.ico",
    shortcut: "https://www.thesoulcialwell.org/open-graph.png",
    apple: "https://www.thesoulcialwell.org/open-graph.png",
  },
  keywords: [
    "self care",
    "holistic wellness",
    "candid conversations",
    "social wellness",
    "meaningful connections",
    "personal growth",
    "intentional community",
    "self exploration",
    "deep conversations",
    "combatting lonliness",
    "belonging",
    "shared self-care activities",
    "immersive events",
    "self care experiences",
    "wilma elliott",
    "wilma elliott-hannah",
    "dr. wilma elliott",
    "dr. wilma",
    "dr. wilma elliott-hannah",
    "dr. wil",
    "dr. wilma elliott-hannah psyd",
    "wilma elliott-hannah psyd",
    "experiential",
    "adult learning principles",
    "community",
    "program designer",
    "adult learning",
    "lonliness",
    "",
  ],
};

const faustina = Faustina({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-faustina",
});

const parisienne = Parisienne({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-parisienne",
  weight: "400",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang='en'
      className={`${faustina.variable} ${parisienne.variable} antialiased`}
    >
      <body className='bg-main-bg text-main-foreground font-main relative'>
        <NavbarWrapper />
        {children}
        <Toaster
          position='top-center'
          richColors
        />
        <ScrollToTopButton />
        <Footer />
      </body>
    </html>
  );
}
