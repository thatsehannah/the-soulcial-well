"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";

const SoulcialWellOverview = () => {
  useGSAP(() => {
    gsap.to("#overview-img", {
      opacity: 1,
      duration: 1,
      delay: 0.5,
    });
  }, []);

  return (
    <section className='xl:p-32 pt-30 pb-12 px-4 border border-green-500'>
      <div className='grid grid-cols-1 xl:grid-cols-3 xl:mt-8 mt-4 w-full lg:gap-12 xl:p-8 p-2'>
        <div
          id='overview-img'
          className='xl:flex hidden justify-center items-center xl:col-span-1 opacity-0'
        >
          <Image
            src='/assets/overview.svg'
            alt='cross with attendees image inside'
            height={500}
            width={500}
            priority
          />
        </div>
        <div className='grid gap-4 text-xl xl:col-span-2 xl:px-24 p-6'>
          <p className='text-5xl lg:text-6xl text-center mb-8'>
            At The <span className='font-script'>Soulcial Well</span>
          </p>
          <div className='xl:hidden flex justify-center items-center mb-8'>
            <Image
              src='/assets/overview.svg'
              alt='cross with attendees image inside'
              height={500}
              width={500}
            />
          </div>
          <p>
            Loneliness isn&apos;t just uncomfortable. It is a public health
            crisis with real mental and physical consequences. At The Soulcial
            Well, we exist to close that gap. We create immersive,
            experientially designed spaces where people skip the small talk and
            get to the real deal, because healing is more powerful when it
            happens in community.
          </p>

          <p className='text-center'>
            ✨ We don&apos;t talk about connection. We design it. ✨
          </p>
        </div>
      </div>
    </section>
  );
};

export default SoulcialWellOverview;
