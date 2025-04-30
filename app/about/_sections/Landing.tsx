import Image from "next/image";
import React from "react";

const Landing = () => {
  return (
    <section className='p-12 h-[100vh]'>
      <p className='text-4xl lg:text-6xl text-center'>
        How We <span className='font-script'>Started</span>
      </p>
      <div className='grid grid-cols-1 lg:grid-cols-3 mt-12 w-full gap-12 p-8'>
        <div className='flex justify-center items-center col-span-1'>
          <div className='lg:block hidden'>
            <Image
              src='/about-landing.svg'
              alt='cross with logo inside'
              height={500}
              width={500}
            />
          </div>
        </div>
        <div className='grid gap-4 text-xl col-span-2 px-30'>
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
          <p className='text-center'>
            ✨ Rethink self-care. Reconnect with yourself. Thrive in community.
            ✨
          </p>
        </div>
      </div>
    </section>
  );
};

export default Landing;
