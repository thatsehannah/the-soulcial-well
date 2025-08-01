"use client";

import { navLinks } from "@/utils/navLinks";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Menu, Sparkles, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useRef, useState } from "react";

const Navbar = () => {
  const currentPath = usePathname();

  const [isOpen, setIsOpen] = useState(false);

  const topBar = useRef<HTMLDivElement>(null);
  const middleBar = useRef<HTMLDivElement>(null);
  const bottomBar = useRef<HTMLDivElement>(null);
  const navTl = useRef<gsap.core.Timeline | null>(null);

  useGSAP(() => {
    navTl.current = gsap.timeline({ paused: true });

    navTl.current
      .to(
        topBar.current,
        { y: 8, width: 28, rotate: 45, duration: 0.3, ease: "power2.inOut" },
        0
      )
      .to(
        middleBar.current,
        { opacity: 0, duration: 0.2, ease: "power2.inOut" },
        0
      )
      .to(
        bottomBar.current,
        { y: -8, width: 28, rotate: -45, duration: 0.3, ease: "power2.inOut" },
        0
      );
  }, []);

  const handleClick = () => {
    setIsOpen((prev) => {
      const newIsOpen = !prev;
      if (newIsOpen) {
        navTl.current?.play();
      } else {
        navTl.current?.reverse();
      }

      return newIsOpen;
    });
  };

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
      <div
        className='flex flex-col justify-center items-center gap-[6px] lg:hover:cursor-pointer'
        onClick={handleClick}
      >
        <div
          ref={topBar}
          className='bg-primary h-0.5 w-9 rounded-full'
        />
        <div
          ref={middleBar}
          className='bg-primary h-0.5 w-9 rounded-full'
        />
        <div
          ref={bottomBar}
          className='bg-primary h-0.5 w-9 rounded-full'
        />
      </div>
      <div className='z-20 h-screen bg-primary/20 backdrop-blur-lg w-1/4 absolute top-0 -right-[100%] pl-10'>
        <div className='w-full place-items-end mt-12 pr-5 lg:hover:cursor-pointer'>
          <X className='border-2 rounded-lg p-1 w-8 h-8' />
        </div>
        <div className='flex gap-16 flex-col mt-12'>
          {navLinks.map((item, idx) => {
            const isActive = currentPath === item.link;

            return (
              <Link
                href={item.link}
                className={`text-4xl lg:hover:scale-110 transition-all ease-linear font-bold w-fit ${
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
