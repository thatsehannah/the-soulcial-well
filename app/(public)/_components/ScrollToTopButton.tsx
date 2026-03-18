"use client";

import gsap from "gsap";
import { ScrollToPlugin } from "gsap/all";
import { ArrowBigUpDash } from "lucide-react";
import React, { useEffect, useState } from "react";

gsap.registerPlugin(ScrollToPlugin);

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    gsap.to(window, {
      duration: 2,
      scrollTo: { y: 0 },
      ease: "power2.inOut",
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 1200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  });

  return (
    <ArrowBigUpDash
      onClick={scrollToTop}
      className={`stroke-primary stroke-[1.5px] fixed ${isVisible ? "opacity-100 right-6" : "opacity-0 -right-6"} rounded-full shadow-2xl absolute bottom-5 cursor-pointer p-2 text-center hover:scale-110 transition-normal duration-200 border-main-bg border-[1px] h-13 w-13 bg-main-foreground`}
    />
  );
};

export default ScrollToTopButton;
