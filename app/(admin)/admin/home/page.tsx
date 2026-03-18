"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Sidebar from "../_components/Sidebar";
import { adminViews, ViewKey } from "@/utils/adminSidebarLinks";

const AdminHome = () => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [activeView, setActiveView] = useState<ViewKey>("landing");
  const ActiveViewComponent = adminViews[activeView].component;

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
      <Sidebar
        activeView={activeView}
        onViewChange={setActiveView}
      />
      <section
        id='content'
        className='h-screen flex-1 flex ml-[12rem] mr-8 lg:ml-[20rem]'
      >
        <ActiveViewComponent />
      </section>
    </main>
  );
};

export default AdminHome;
