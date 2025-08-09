"use client";

import Image from "next/image";
import React from "react";

const SoulcialWellOrigins = () => {
  return (
    <section className='xl:p-32 pt-8 pb-12 px-4 bg-[#f2f4e6]'>
      <div className='grid grid-cols-1 xl:grid-cols-3 xl:mt-8 mt-4 w-full lg:gap-12 xl:p-8 p-2'>
        <div className='grid gap-4 text-xl col-span-2 xl:px-30 p-6'>
          <p className='text-5xl lg:text-6xl text-center mb-8'>
            How We <span className='font-script'>Started</span>
          </p>
          <div
            id='origins-img'
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
            At The Soulcial Well, we believe that self-care is more than solo
            rituals—it’s about meaningful connection, shared experiences, and
            holistic well-being. We create immersive, interactive experiences
            that blend mental wellness, social connection, and personal growth,
            making self-care engaging, dynamic, and fun.
          </p>
          <p>
            Our approach is rooted in the idea that true well-being thrives in
            community. Through thoughtfully designed events, creative
            activities, and transformative conversations, we provide spaces
            where people feel seen, heard, and empowered. Whether it’s deep
            reflection, playful exploration, or offbeat conversations, we
            challenge the idea that self-care has to be routine—because wellness
            should be felt, not just practiced.
          </p>
          <p>
            At The Soulcial Well, we bridge the gap between self-discovery and
            social connection, ensuring that no one has to navigate their
            journey alone. Ready to refill your well? Join us and experience
            self-care in a whole new way.
          </p>
        </div>
        <div className='flex justify-center items-center xl:col-span-1'>
          <div className='xl:flex hidden'>
            <Image
              src='/assets/origins.svg'
              alt='cross with logo inside'
              height={500}
              width={500}
              quality={100}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SoulcialWellOrigins;
