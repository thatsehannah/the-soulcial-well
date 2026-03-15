import { AuthProvider } from "@/context/AuthContext";
import { faustina, parisienne, robotoflex } from "@/utils/fonts";
import { Metadata } from "next";
import React, { ReactNode } from "react";
import "../globals.css";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Admin - The Soulcial Well",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <AuthProvider>
      <html
        lang='en'
        className={`${faustina.variable} ${parisienne.variable} ${robotoflex.variable} antialiased`}
      >
        <body className='bg-main-bg text-main-foreground font-admin relative'>
          {children}
          <Toaster
            position='bottom-right'
            richColors
          />
        </body>
      </html>
    </AuthProvider>
  );
}
