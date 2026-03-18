import { Faustina, Parisienne, Roboto_Flex } from "next/font/google";

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

export const robotoflex = Roboto_Flex({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-robotoflex",
});
