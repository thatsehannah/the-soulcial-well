"use client";

import { Sparkles } from "lucide-react";
import React from "react";
import LinkButton from "../_components/LinkButton";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import { useGSAP } from "@gsap/react";
import Image from "next/image";

const Hero = () => {
  useGSAP(() => {
    const titleSplit = new SplitText(".title", { type: "chars, words" });
    const timeline = gsap.timeline({
      ease: "power1.inOut",
    });

    gsap.from(".left-arm", {
      left: -900,
      duration: 2.2,
      ease: "power1.inOut",
    });

    gsap.from(".right-arm", {
      right: -900,
      duration: 2.2,
      ease: "power1.inOut",
    });

    timeline
      .from(titleSplit.chars, {
        opacity: 0,
        yPercent: -50,
        duration: 0.8,
        delay: 1.6,
        ease: "expo.out",
        stagger: 0.05,
      })
      .from(".sparkles", {
        opacity: 0,
        scale: 1.2,
        duration: 0.6,
      })
      .from(".subtitle", {
        opacity: 0,
        yPercent: 100,
        duration: 0.8,
      })
      .to(".linkButton", {
        duration: 0.95,
        opacity: 1,
        stagger: 0.08,
        ease: "bounce",
      });
  });

  return (
    <section className='flex flex-col justify-around lg:justify-between h-[100vh] p-4 relative'>
      <div className='absolute left-0 xl:top-[38%] lg:top-[36%] top-[43%] w-[44vw] xl:h-66 lg:h-48 h-20 left-arm'>
        <Image
          src='/assets/leftarm.png'
          alt='left arm'
          fill
          quality={100}
        />
      </div>
      <div className='absolute right-0 xl:top-[27%] lg:top-[27%] top-[39%] w-[46vw] xl:h-68 lg:h-48 h-20 right-arm'>
        <Image
          src='/assets/rightarm.png'
          alt='left arm'
          fill
          quality={100}
        />
      </div>
      <div>
        <div className='w-full flex justify-center gap-1 title'>
          <p className='xl:text-8xl text-6xl font-medium text-primary tracking-[-.08em]'>
            The Soulcial
          </p>
          <Sparkles className='text-primary ml-2 w-7 xl:w-12 h-7 xl:h-12 fill-primary sparkles' />
        </div>
        <div className='text-center title'>
          <p className='xl:text-8xl text-6xl font-script text-primary'>Well</p>
        </div>
        <div className='text-center mt-6 lg:mt-4 subtitle'>
          <p className='xl:text-3xl text-2xl text-primary-foreground tracking-tighter'>
            Bringing back community
          </p>
        </div>
      </div>
      <div className='grid grid-cols-2 place-items-center gap-8 mb-8 '>
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
          text='contact'
          link='/contact'
        />
      </div>
    </section>
  );
};

export default Hero;
