"use client";

import { navLinks } from "@/utils/navLinks";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
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
  const menuTl = useRef<gsap.core.Timeline | null>(null);

  useGSAP(() => {
    navTl.current = gsap.timeline({ paused: true });

    navTl.current
      .to(
        topBar.current,
        { y: 8, width: 28, rotate: 45, duration: 0.3, ease: "power2.inOut" },
        0,
      )
      .to(
        middleBar.current,
        { opacity: 0, duration: 0.2, ease: "power2.inOut" },
        0,
      )
      .to(
        bottomBar.current,
        { y: -8, width: 28, rotate: -45, duration: 0.3, ease: "power2.inOut" },
        0,
      );
  }, []);

  useGSAP(() => {
    menuTl.current = gsap.timeline({ paused: true });

    menuTl.current
      .to(".menu", {
        opacity: 1,
        duration: 0.25,
        ease: "power2.inOut",
        display: "block",
      })
      .to(".menu-item", {
        opacity: 1,
        stagger: 0.1,
        duration: 0.1,
        ease: "power2.inOut",
      });
  }, []);

  const handleClick = () => {
    setIsOpen(() => {
      const newIsOpen = !isOpen;
      if (newIsOpen) {
        navTl.current?.play();
        menuTl.current?.play();
      } else {
        navTl.current?.reverse();
        menuTl.current?.reverse();
      }

      return newIsOpen;
    });
  };

  return (
    <nav className='relative'>
      <div className='bg-dark-green lg:w-3/4 w-[95vw] z-20 shadow-lg h-18 rounded-[3rem] flex justify-between px-8 py-2 absolute top-4 left-0 right-0 mx-auto'>
        <div className='flex flex-col items-center justify-center'>
          <Link
            href='/'
            className='flex items-center justify-center title ml-6 mt-2'
          >
            <Image
              src='/assets/logo-color.svg'
              alt='logo'
              height={60}
              width={60}
              quality={100}
              className='absolute'
            />
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
        <div className='opacity-0 absolute -z-10 h-fit bg-primary/20 backdrop-blur-lg lg:w-1/4 w-1/2 top-18 right-8 rounded-b-3xl menu hidden'>
          <div className='flex gap-12 flex-col py-10 px-8'>
            {navLinks.map((item, idx) => {
              const isActive = currentPath === item.link;

              return (
                <Link
                  href={item.link}
                  className={`opacity-0 text-2xl lg:hover:scale-110 transition-all ease-linear font-bold w-fit ${
                    isActive
                      ? "bg-primary text-main-foreground w-full -ml-4 rounded-lg px-4 py-3 shadow-lg"
                      : "bg-none text-dark-green"
                  } menu-item`}
                  key={idx}
                  onClick={handleClick}
                >
                  <p>{item.text}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
