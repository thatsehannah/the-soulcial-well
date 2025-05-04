import Image from "next/image";
import React from "react";

const MissionVision = () => {
  return (
    <section className='flex lg:flex-row flex-col lg:h-[100vh]'>
      <div className='lg:w-1/2 w-full flex flex-col items-center justify-center p-20 gap-12'>
        <p className='text-5xl lg:text-6xl'>
          Our <span className='font-script'>Mission</span>
        </p>
        <div className='lg:w-56 w-48 lg:h-56 h-48 relative'>
          <Image
            src='/assets/our-mission.png'
            alt='4 piece puzzle'
            fill
          />
        </div>
        <p className='text-lg'>
          At The Soulcial Well, we believe that self-care is more powerful when
          shared. We create immersive self-care and holistic wellness
          experiences that blend connection, community, personal growth, and
          creativity. Through thoughtfully curated events, we provide safe,
          engaging spaces where people can connect, recharge, and cultivate
          meaningful relationships that enhance their well-being.
        </p>
      </div>
      <div className='lg:w-1/2 w-full flex flex-col items-center justify-center p-20 bg-primary gap-12'>
        <p className='text-5xl lg:text-6xl'>
          Our <span className='font-script'>Vision</span>
        </p>
        <div className='lg:w-56 w-48 lg:h-56 h-48 relative'>
          <Image
            src='/assets/our-vision.png'
            alt='eyeball'
            fill
          />
        </div>
        <p className='text-lg text-white'>
          Our vision is to create a transformative community that inspires and
          uplifts individuals from all walks of life. Through impactful events,
          rejuvenating retreats, and supportive workshops, The Soulcial Well
          strives to be a beacon of mental wellness, where people can connect,
          heal, and grow. We aim to foster a future where happiness, personal
          growth, and meaningful connections are within reach for all, and
          everyone feels empowered to thrive in their own journey.
        </p>
      </div>
    </section>
  );
};

export default MissionVision;
