import type { Metadata } from "next";
import "./globals.css";
import NavbarWrapper from "@/components/NavbarWrapper";
import { Toaster } from "@/components/ui/sonner";
import { Faustina, Parisienne } from "next/font/google";

export const metadata: Metadata = {
  title: "The Soulcial Well",
  description: "Bringing back community",
  openGraph: {
    title: "The Soulcial Well",
    description: "Bringing back community",
    url: "https://www.thesoulcialwell.org",
    images: [
      {
        url: "https://www.thesoulcialwell.org/about-landing.svg",
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
    images: ["https://www.thesoulcialwell.org/about-landing.svg"],
  },
  icons: {
    icon: "./favicon.ico",
  },
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
      </body>
    </html>
  );
}
