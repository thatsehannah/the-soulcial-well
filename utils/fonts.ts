import { Faustina, Parisienne } from "next/font/google";

export const faustina = Faustina({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-faustina",
});

export const parisienne = Parisienne({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-parisienne",
  weight: "400",
});
