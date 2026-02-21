"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { LogOut } from "lucide-react";
import Image from "next/image";
import React from "react";

const Sidebar = () => {
  const { logout } = useAuth();

  return (
    <div className='w-[18rem] bg-neutral-200 border-r fixed h-full flex flex-col'>
      <div className='bg-main-bg h-auto p-4 flex flex-col justify-center border-b border-neutral-300'>
        <div className='flex items-center mb-3'>
          <div>
            <div>
              <p className='text-2xl text-primary tracking-[-.08em]'>The</p>
            </div>
            <div className='flex items-center text-center -mt-4'>
              <p className='text-4xl text-primary'>
                <span className='font-script text-primary-foreground text-5xl'>
                  soul
                </span>
                cial well{" "}
              </p>
            </div>
          </div>
          <div className='relative flex items-center justify-center h-10 w-10 mt-4'>
            <Image
              src='/assets/logo-default.svg'
              alt='icon'
              fill
              quality={100}
            />
          </div>
        </div>
        <p className='font-main font-medium text-lg'>Admin Panel</p>
      </div>
      <div className='flex-1'>
        <div className='flex flex-col justify-between items-center h-full py-4'>
          <div className='flex-1 flex justify-center'>Buttons</div>
          <div className='flex justify-center items-center'>
            <Button
              className='text-center cursor-pointer'
              onClick={logout}
            >
              <LogOut />
              <span className='text-lg'>Log Out</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
