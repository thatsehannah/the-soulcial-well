import Image from "next/image";
import React from "react";
import Experience from "./_components/Experience";
import { experienceData } from "./_data/experienceData";

const ExperiencesPage = () => {
  const experiences = experienceData;

  return (
    <main className='bg-[#f2f4e6] h-dvh'>
      <section className='pt-12 flex flex-col justify-center items-center'>
        <p className='text-4xl lg:text-8xl text-center font-script'>
          Experiences
        </p>
        <div className='grid grid-cols-1 lg:grid-cols-3 lg:my-8 my-4 w-3/4 lg:gap-12 lg:p-8 p-2 justify-center items-center'>
          <div className='relative flex justify-center items-center col-span-1'>
            <Image
              src='/assets/experiences-camera.png'
              alt='camera'
              height={300}
              width={300}
            />
          </div>

          <div className='grid gap-4 text-3xl col-span-2 lg:px-12 p-6'>
            <p className='text-[#ddd520]'>
              Each Soulcial Well experience is more than just an event -
              it&apos;s a moment of community, joy, and self-discovery. Click on
              any icon below to revisit the vibes, view highlights, and feel the
              energy from past gatherings. Your next favorite memory might just
              be one click away.
            </p>
          </div>
        </div>
      </section>
      {experiences.map((exp, index) => (
        <Experience
          title={exp.title}
          description={exp.description}
          images={exp.images}
          key={index}
        />
      ))}
    </main>
  );
};

export default ExperiencesPage;
