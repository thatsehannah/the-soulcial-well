import Image from "next/image";
import React from "react";

const Purpose = () => {
  return (
    <section className='flex lg:flex-row flex-col'>
      <div className='lg:w-1/2 w-full flex flex-col items-center justify-center lg:p-32 pt-16 pb-12 px-12 gap-18'>
        <p className='relative text-5xl lg:text-6xl after:bg-[url("/assets/underline-stroke-yellow.svg")] after:absolute after:left-0 after:-bottom-9 after:w-full after:h-13 after:bg-no-repeat after:bg-contain after:bg-center'>
          Our <span className='font-script'>Mission</span>
        </p>
        <div className='lg:w-56 w-48 lg:h-56 h-48 relative'>
          <Image
            src='/assets/our-mission.png'
            alt='4 piece puzzle'
            fill
          />
        </div>
        <p className='text-xl text-justify'>
          We believe healing was never meant to happen in isolation. At The
          Soulcial Well, we design immersive, psychologically grounded
          experiences that bring people together, skip the small talk, and build
          the kind of connection that actually changes how you move through the
          world.
        </p>
      </div>
      <div className='lg:w-1/2 w-full flex flex-col items-center justify-center bg-primary lg:p-32 pt-16 pb-12 px-12 gap-8'>
        <p className='relative text-5xl lg:text-6xl after:bg-[url("/assets/circle-stroke.svg")] after:absolute lg:after:-left-16 after:-left-13 lg:after:-top-15 after:-top-16 after:w-[155%] after:h-45 after:bg-no-repeat after:bg-contain after:bg-center'>
          Our <span className='font-script'>Vision</span>
        </p>
        <div className='lg:w-56 w-52 lg:h-56 h-52 relative'>
          <Image
            src='/assets/our-vision.png'
            alt='eyeball'
            fill
          />
        </div>
        <p className='text-xl text-justify'>
          A world where community is medicine. Where no one has to navigate
          their journey in isolation, and where the antidote to loneliness is as
          simple as one honest conversation.
        </p>
      </div>
    </section>
  );
};

export default Purpose;
