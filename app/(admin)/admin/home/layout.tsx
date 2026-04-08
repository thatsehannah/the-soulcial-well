"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import React, { ReactNode, useEffect } from "react";
import Sidebar from "../_components/Sidebar";

const AdminHomeLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user && !loading) {
      router.push("/admin");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        Loading...
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <main className='flex'>
      <Sidebar />
      <section
        id='content'
        className='h-screen flex-1 flex ml-[12rem] mr-8 lg:ml-[20rem]'
      >
        {children}
      </section>
    </main>
  );
};

export default AdminHomeLayout;
