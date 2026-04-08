"use client";

import Image from "next/image";
import React, { useRef } from "react";
import { ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

gsap.registerPlugin(ScrollTrigger);

const SoulcialWellOrigins = () => {
  const imageRef = useRef(null);

  useGSAP(() => {
    gsap.from(imageRef.current, {
      opacity: 0,
      duration: 1,
      delay: 0.5,
      scrollTrigger: {
        trigger: imageRef.current,
        start: "top bottom",
      },
    });
  }, []);

  return (
    <section className='xl:p-32 pt-8 pb-12 px-4'>
      <div className='grid grid-cols-1 xl:grid-cols-3 xl:mt-8 mt-4 w-full lg:gap-12 xl:p-8 p-2'>
        <div className='grid gap-6 text-xl col-span-2 xl:px-24 p-6'>
          <p className='text-5xl lg:text-6xl text-center mb-8'>
            How We <span className='font-script'>Started</span>
          </p>
          <div
            ref={imageRef}
            className='xl:hidden flex justify-center items-center mb-8'
          >
            <Image
              src='/assets/origins.svg'
              alt='cross with logo inside'
              height={500}
              width={500}
              quality={100}
            />
          </div>
          <p>
            I started The Soulcial Well because I kept watching people suffer
            quietly in a world full of noise. As a psychologist, I understood
            the science behind loneliness: the cortisol spikes, the immune
            suppression, the shortened lifespan. But I also understood something
            harder to quantify. People just don&apos;t need information about
            connection. They need to experience it.
          </p>
          <p>
            So I built something. Not a clinic. Not a class. A community where
            people could in as strangers and leave feeling genuinely seen. A
            space where the experience itself was the intervention and we
            didn&apos;t just talk about wellness, we designed it.
          </p>
          <p>
            What started as small, intentional gathering grew into a framework
            called Candid Conversations, now activated in parks, universities,
            corporate spaces, and on stage of the American Psychological
            Association&apos;s national conference. The format changes. The
            mission stays the same: skip the small talk, build real connection,
            heal together.
          </p>
        </div>
        <div className='flex justify-center items-center xl:col-span-1'>
          <div
            ref={imageRef}
            className='xl:flex hidden'
          >
            <Image
              src='/assets/origins.svg'
              alt='cross with logo inside'
              height={500}
              width={500}
              quality={100}
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SoulcialWellOrigins;
