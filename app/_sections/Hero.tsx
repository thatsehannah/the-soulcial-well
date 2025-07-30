"use client";

import { Sparkles } from "lucide-react";
import React from "react";
import LinkButton from "../_components/LinkButton";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import { useGSAP } from "@gsap/react";

const Hero = () => {
  useGSAP(() => {
    const titleSplit = new SplitText(".title", { type: "chars, words" });
    const timeline = gsap.timeline({
      ease: "power1.inOut",
    });

    timeline
      .from(titleSplit.chars, {
        opacity: 0,
        yPercent: -50,
        duration: 1.2,
        ease: "expo.out",
        stagger: 0.05,
      })
      .from(".subtitle", {
        opacity: 0,
        yPercent: 100,
        duration: 0.8,
      })
      .to(".linkButton", {
        duration: 1,
        opacity: 1,
        stagger: 0.1,
        ease: "power1.inOut",
      });
  });

  return (
    <section className='flex flex-col justify-around lg:justify-between h-[100vh] p-4 bg-[url(/herobg.png)] bg-center bg-no-repeat bg-contain lg:bg-cover'>
      <div>
        <div className='w-full flex justify-center gap-2 title'>
          <p className='text-6xl lg:text-8xl font-medium text-primary tracking-[-.08em]'>
            The Soulcial
          </p>
          <Sparkles className='text-primary w-7 lg:w-13 h-7 lg:h-13 fill-primary' />
        </div>
        <div className='text-center title'>
          <p className='text-6xl lg:text-8xl font-script text-primary'>Well</p>
        </div>
        <div className='text-center mt-6 subtitle'>
          <p className='text-2xl lg:text-4xl text-primary-foreground tracking-tighter'>
            Bringing back community
          </p>
        </div>
      </div>
      <div className='grid grid-cols-2 place-items-center gap-8'>
        <LinkButton
          text='home'
          link='/'
        />
        <LinkButton
          text='offerings'
          link='/offerings'
        />
        <LinkButton
          text='about us'
          link='/about'
        />
        <LinkButton
          text='soul tools'
          link='/soul-tools'
        />
        <LinkButton
          text='experiences'
          link='/experiences'
        />
        <LinkButton
          text='connect'
          link='/connect'
        />
      </div>
    </section>
  );
};

export default Hero;
