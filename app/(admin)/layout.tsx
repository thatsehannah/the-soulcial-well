import { AuthProvider } from "@/context/AuthContext";
import { faustina, parisienne } from "@/utils/fonts";
import { Metadata } from "next";
import React, { ReactNode } from "react";
import "../globals.css";

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
        className={`${faustina.variable} ${parisienne.variable} antialiased`}
      >
        <body className='bg-main-bg text-main-foreground font-main relative'>
          {children}
        </body>
      </html>
    </AuthProvider>
  );
}
