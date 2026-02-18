"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const AdminHome = () => {
  const { user, loading, logout } = useAuth();
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
    <main className='min-h-screen'>
      <div>Dashboard</div>
      <Button
        className='text-center cursor-pointer'
        onClick={logout}
      >
        Log Out
      </Button>
    </main>
  );
};

export default AdminHome;
