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
    <section className='xl:p-32 pt-8 pb-12 px-4 bg-[#f2f4e6]'>
      <div className='grid grid-cols-1 xl:grid-cols-3 xl:mt-8 mt-4 w-full lg:gap-12 xl:p-8 p-2'>
        <div className='grid gap-4 text-xl col-span-2 xl:px-30 p-6'>
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
            The Soulcial Well began as a simple but powerful idea: what if
            self-care didn’t have to be so isolating? As a mental health
            professional deeply invested in community, healing, and holistic
            wellness, I created The Soulcial Well to bridge the gap between
            emotional growth and social connection.
          </p>
          <p>
            What started as small, intentional gatherings—rooted in candid
            conversations, creativity, and joyful experiences—quickly grew into
            a movement. Each event blends mental, emotional, physical, and
            creative well-being with meaningful interaction, proving that
            healing doesn’t always have to be heavy. Sometimes it looks like
            laughter over a game of pickleball, reflection during a
            candle-making session, or shared insight through a deck of
            conversation cards.
          </p>
          <p>
            The Soulcial Well continues to grow, but our mission remains the
            same: to hold space for people to explore themselves, connect with
            others, and care for their whole selves—together.
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
