"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { adminViews, ViewKey } from "@/utils/adminSidebarLinks";
import { LogOut } from "lucide-react";
import Image from "next/image";
import React from "react";

type SidebarProps = {
  activeView: ViewKey;
  onViewChange: (view: ViewKey) => void;
};

const Sidebar = ({ activeView, onViewChange }: SidebarProps) => {
  const { logout } = useAuth();

  return (
    <aside className='w-[18rem] bg-neutral-100 border-r fixed h-full flex flex-col'>
      <div className='bg-main-bg h-auto p-4 flex flex-col justify-center border-b border-neutral-300'>
        <div className='flex items-center mb-3'>
          <div>
            <div>
              <p className='text-2xl text-primary tracking-[-.08em] font-main'>
                The
              </p>
            </div>
            <div className='flex items-center text-center -mt-4'>
              <p className='text-4xl text-primary font-main'>
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
        <p className='font-admin font-medium text-lg'>Admin Panel</p>
      </div>
      <div className='flex-1'>
        <div className='flex flex-col justify-between items-center h-full pb-6'>
          <nav className='flex-1 flex flex-col gap-1 w-full'>
            {Object.entries(adminViews).map(([key, view]) => (
              <button
                key={key}
                onClick={() => onViewChange(key as ViewKey)}
                className={`flex items-center gap-3 w-full cursor-pointer ${activeView === key ? "bg-dark-green text-secondary font-bold" : "bg-neutral-300 font-light"} p-4 font-admin`}
              >
                <span>{<view.icon />}</span>
                <p className='text-[1rem]'>{view.label}</p>
              </button>
            ))}
          </nav>
          <div className='flex justify-center items-center w-full px-4'>
            <Button
              className='text-center cursor-pointer w-full'
              onClick={logout}
            >
              <LogOut />
              <span className='text-lg'>Log Out</span>
            </Button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
