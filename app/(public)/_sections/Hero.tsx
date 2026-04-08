"use client";

import React from "react";
import LinkButton from "../_components/LinkButton";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import { useGSAP } from "@gsap/react";
import Image from "next/image";

//this will make this page dynamic and fetch for experiences on every page request
// export const dynamic = "force-dynamic";

type HeroProps = {
  upcomingEvents: boolean;
};

const Hero = ({ upcomingEvents }: HeroProps) => {
  useGSAP(() => {
    document.fonts.ready.then(() => {
      const taglineSplit = new SplitText(".tagline", {
        type: "chars, words",
      });

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
        .from(".heroTitle", {
          opacity: 0,
          yPercent: -50,
          duration: 0.8,
          delay: 1.6,
          ease: "expo.out",
          overflow: "visible",
        })
        .from(
          ".logo",
          {
            opacity: 0,
            yPercent: 50,
            duration: 0.8,
          },
          "<",
        )
        .from(taglineSplit.chars, {
          opacity: 0,
          yPercent: 100,
          duration: 0.4,
          stagger: 0.05,
        })
        .from(".sub-tagline", {
          opacity: 0,
          yPercent: 100,
          duration: 0.6,
        })
        .to(
          ".linkButton",
          {
            duration: 0.95,
            opacity: 1,
            stagger: 0.08,
            ease: "bounce",
          },
          "<",
        );
      if (upcomingEvents) {
        gsap.fromTo(
          ".upcoming-badge",
          {
            opacity: 0,
            scale: 1.4,
            ease: "expo.inOut",
          },
          {
            opacity: 1,
            duration: 0.7,
            delay: 6,
            scale: 1,
            ease: "expo.inOut",
          },
        );
      }
    });
  }, [upcomingEvents]);

  return (
    <section className='flex flex-col p-4 relative'>
      <div className='absolute left-0 xl:top-[34%] lg:top-[32%] md:top-[38%] top-[35%] w-[43vw] 2xl:h-65 xl:h-60 lg:h-48 md:h-34 h-22 left-arm'>
        <Image
          src='/assets/leftarm.png'
          alt='left arm'
          fill
          quality={100}
        />
      </div>
      <div className='absolute right-0 2xl:top-[24%] xl:top-[26%] lg:top-[26%] md:top-[35%] top-[32%] w-[43vw] 2xl:h-63 xl:h-56 lg:h-40 md:h-27 h-22 right-arm'>
        <Image
          src='/assets/rightarm.png'
          alt='left arm'
          fill
          quality={100}
        />
      </div>
      <div className='w-fit mx-auto xl:mt-3 p-2'>
        <div className='w-full gap-1'>
          <p className='xl:text-5xl text-3xl text-primary tracking-[-.08em] ml-5 heroTitle'>
            The
          </p>
        </div>
        <div className='flex items-center text-center -mt-5'>
          <p className='xl:text-7xl text-5xl text-primary heroTitle'>
            <span className='font-script text-primary-foreground xl:text-8xl text-6xl will-change-transform'>
              soul
            </span>
            cial well{" "}
          </p>
          <div className='relative xl:h-22 h-14 xl:w-22 w-14 logo'>
            <Image
              src='/assets/logo-default.svg'
              alt='icon'
              fill
              quality={100}
            />
          </div>
        </div>
      </div>
      <div className='text-center mt-4'>
        <p className='tagline xl:text-3xl text-2xl text-primary-foreground tracking-tighter'>
          Community is the cure
        </p>
        <p className='sub-tagline xl:text-xl text-lg text-primary-foreground font-light mt-2'>
          Loneliness is a public health crisis. We&apos;re doing something about
          it.
        </p>
      </div>
      <div className='grid grid-cols-1 place-items-center lg:gap-5 gap-6 mb-6 mt-40 lg:mt-52 xl:mt-64'>
        <LinkButton
          text='offerings'
          link='/offerings'
        />
        <LinkButton
          text='about us'
          link='/about'
        />
        <LinkButton
          text='Candid Conversations'
          link='/framework'
        />
        <LinkButton
          text='experiences'
          link='/experiences'
          badge={upcomingEvents}
          badgeUrl='/experiences#upcoming'
          tooltipText='A new experience is coming soon!'
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
