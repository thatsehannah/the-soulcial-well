import type { Metadata } from "next";
import "./globals.css";

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
      <body className='antialiased bg-main-bg text-main-foreground font-main'>
        {children}
      </body>
    </html>
  );
}
