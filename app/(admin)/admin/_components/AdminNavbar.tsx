"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import React from "react";

const AdminNavbar = () => {
  const { logout } = useAuth();

  return (
    <nav className='bg-dark-green lg:w-3/4 w-[95vw] z-20 shadow-lg h-18 rounded-[3rem] flex items-center absolute top-4 left-0 right-0 mx-auto'>
      <div className='flex justify-between items-center px-8 lg:px-12 py-2 w-full'>
        <div className='flex items-center'>
          <div className=''>
            <div>
              <p className='text-[1rem] text-primary tracking-[-.08em]'>The</p>
            </div>
            <div className='flex items-center text-center -mt-3'>
              <p className='text-2xl text-primary'>
                <span className='font-script text-secondary text-3xl'>
                  soul
                </span>
                cial well{" "}
              </p>
            </div>
          </div>
          <div className='relative flex items-center justify-center h-9 w-9 mt-1'>
            <Image
              src='/assets/logo-color.svg'
              alt='icon'
              fill
              quality={100}
            />
          </div>
        </div>
        <div className='flex justify-center items-center'>
          <Button
            className='text-center cursor-pointer'
            onClick={logout}
          >
            Log Out
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
