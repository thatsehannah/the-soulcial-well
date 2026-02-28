"use client";

import React, { useEffect, useState } from "react";
import LinkButton from "../_components/LinkButton";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { checkForUpcomingExperiences } from "@/utils/clientActions";

//this will make this page dynamic and fetch for experiences on every page request
export const dynamic = "force-dynamic";

const Hero = () => {
  const [upcomingEvents, setUpcomingEvents] = useState(false);

  useEffect(() => {
    const anyUpcomingEvents = async () => {
      const result = await checkForUpcomingExperiences();

      setUpcomingEvents(result);
    };

    anyUpcomingEvents();

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

  useGSAP(() => {
    document.fonts.ready.then(() => {
      const subtitleSplit = new SplitText(".subtitle", {
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
        .from(subtitleSplit.chars, {
          opacity: 0,
          yPercent: 100,
          duration: 0.4,
          stagger: 0.05,
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
    });
  }, []);

  return (
    <section className='flex flex-col justify-around lg:justify-between h-[100vh] p-4 relative'>
      <div className='absolute left-0 xl:top-[36%] lg:top-[36%] md:top-[38%] top-[43%] w-[43vw] 2xl:h-65 xl:h-55 lg:h-48 md:h-34 h-20 left-arm'>
        <Image
          src='/assets/leftarm.png'
          alt='left arm'
          fill
          quality={100}
        />
      </div>
      <div className='absolute right-0 2xl:top-[24%] lg:top-[27%] md:top-[35%] top-[39%] w-[43vw] 2xl:h-63 xl:h-50 lg:h-48 md:h-27 h-20 right-arm'>
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
        <div className='text-center mt-6 lg:mt-8'>
          <p className='subtitle xl:text-3xl text-2xl text-primary-foreground tracking-tighter'>
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
