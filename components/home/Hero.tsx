import Image from "next/image";
import React from "react";

const Hero = () => {
  return (
    <section className='h-[100vh]'>
      <Image
        src='/herobg.png'
        alt='hands reaching'
        fill
      />
    </section>
  );
};

export default Hero;
