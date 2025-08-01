"use client";

import { navLinks } from "@/utils/navLinks";
import { Menu, Sparkles, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Navbar = () => {
  const currentPath = usePathname();

  return (
    <div className='bg-dark-green lg:w-3/4 w-[95vw] z-10 shadow-2xl h-18 rounded-[3rem] mt-8 mx-auto flex justify-between px-8 py-2'>
      <div className='flex flex-col items-center justify-center'>
        <Link
          href='/'
          className='w-full flex justify-center gap-2 title'
        >
          <p className='text-2xl font-medium text-primary tracking-[-.08em]'>
            The Soulcial <span className='font-script'>Well</span>
          </p>
          <Sparkles className='text-primary w-3 h-3 fill-primary ml-1' />
        </Link>
      </div>
      <div className='flex items-center'>
        <Menu className='text-primary h-12 w-12' />
      </div>
      <div className='z-20 h-screen bg-primary/20 backdrop-blur-md w-1/4 absolute top-0 right-0 pl-10'>
        <div className='w-full place-items-end mt-12 pr-5'>
          <X className='border-2 rounded-lg p-1 w-8 h-8' />
        </div>
        <div className='flex gap-16 flex-col mt-12'>
          {navLinks.map((item, idx) => {
            const isActive = currentPath === item.link;

            return (
              <Link
                href={item.link}
                className={`text-3xl lg:hover:scale-110 transition-all ease-linear font-bold w-fit ${
                  isActive
                    ? "bg-primary text-main-foreground rounded-full p-3 text-4xl"
                    : "bg-none text-dark-green"
                }`}
                key={idx}
              >
                <p>{item.text}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
