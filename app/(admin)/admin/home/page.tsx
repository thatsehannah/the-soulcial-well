"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import AdminNavbar from "../_components/AdminNavbar";

const AdminHome = () => {
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
    <main className='xl:p-32 pt-38 pb-12 px-7 relative h-screen w-screen'>
      <AdminNavbar />
      <section>
        <div className='w-full'>
          <h1 className='text-4xl font-bold'>Grand Rising, Wilma 😃</h1>
        </div>
      </section>
      <section id='content'></section>
    </main>
  );
};

export default AdminHome;
