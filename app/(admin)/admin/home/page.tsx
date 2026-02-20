"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import AdminNavbar from "../_components/AdminNavbar";

const AdminHome = () => {
  const [quote, setQuote] = useState("");
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user && !loading) {
      router.push("/admin");
    }
  }, [user, loading, router]);

  useEffect(() => {
    const getQuote = async () => {
      const response = await fetch("/api/quotes");

      if (response.ok) {
        const data = await response.json();
        setQuote(data);
      }
    };

    getQuote();
  }, []);

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
          <h1 className='text-4xl font-bold'>Hello, Wilma 😃</h1>
          <p className='text-[1rem] lg:text-xl italic mt-4'>{`"${quote}"`}</p>
        </div>
      </section>
      <section id='content'></section>
    </main>
  );
};

export default AdminHome;
