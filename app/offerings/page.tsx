"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import React from "react";

const OfferingPill = ({ text }: { text: string }) => {
  return (
    <div className='text-center lg:text-xl text-lg lg:p-3 p-2 bg-primary lg:w-96 w-80 font-bold rounded-4xl'>
      {text}
    </div>
  );
};

const Offerings = () => {
  const offerings = [
    "Wellness Workshops",
    "Self-Care Events",
    "Community Building Experiences",
    "Specialized Programs",
    "Wellness Consultations",
    "Personalized Coaching",
    "Group Therapy & Support Circles",
  ];

  useGSAP(() => {
    gsap.from("#offering-pill", {
      duration: 1.2,
      display: "hidden",
      opacity: 0,
      stagger: 0.08,
      ease: "bounce",
    });

    gsap.from("#offering-image", {
      opacity: 0,
      delay: 0.5,
      ease: "power1.inOut",
    });
  });

  return (
    <main className='xl:p-32 pt-38 pb-12 px-7'>
      <section className='grid lg:grid-cols-2 grid-cols-1 gap-2 w-full'>
        <div className='flex flex-col justify-center items-center p-8'>
          <p className='relative text-5xl lg:text-6xl text-center mb-12 text-main-foreground after:bg-[url("/assets/underline-stroke-yellow.svg")] after:absolute after:left-0 lg:after:-bottom-9 after:-bottom-9 after:w-full after:h-13 after:bg-no-repeat after:bg-contain after:bg-center'>
            Offerings
          </p>
          <div className='flex flex-col gap-3 mt-6'>
            {offerings.map((offering, idx) => (
              <div
                key={idx}
                id='offering-pill'
                className='block'
              >
                <OfferingPill text={offering} />
              </div>
            ))}
          </div>
        </div>
        <div className='flex justify-center items-center lg:p-8 relative'>
          <Image
            id='offering-image'
            src='/assets/offerings.svg'
            alt='offerings image'
            height={600}
            width={600}
          />
        </div>
      </section>
    </main>
  );
};

export default Offerings;
