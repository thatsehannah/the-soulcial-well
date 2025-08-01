import type { Metadata } from "next";
import "./globals.css";
import NavbarWrapper from "@/components/NavbarWrapper";

export const metadata: Metadata = {
  title: "The Soulcial Well",
  description: "Bringing back community",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className='antialiased bg-main-bg text-main-foreground font-main relative'>
        <NavbarWrapper />
        {children}
      </body>
    </html>
  );
}
