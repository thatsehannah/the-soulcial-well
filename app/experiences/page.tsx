import Image from "next/image";
import React from "react";
import Experience from "./_components/Experience";
import { experienceData } from "./_data/experienceData";

const ExperiencesPage = () => {
  const experiences = experienceData;

  return (
    <main className='bg-[#f2f4e6] h-full'>
      <section className='pt-12 flex flex-col justify-center items-center'>
        <p className='text-7xl lg:text-8xl text-center font-script'>
          Experiences
        </p>
        <div className='grid grid-cols-1 lg:grid-cols-3 lg:my-8 my-4 w-3/4 lg:p-8 p-2 items-center lg:gap-12'>
          <div className='relative mx-auto my-auto lg:block hidden'>
            <Image
              src='/assets/experiences-camera.png'
              alt='camera'
              height={400}
              width={400}
            />
          </div>

          <div className='col-span-2 lg:p-12 p-6'>
            <p className='text-[#ddd520] lg:text-3xl text-lg font-bold lg:font-normal text-center lg:text-start'>
              Each{" "}
              <em>
                <b>Soulcial Well</b>
              </em>{" "}
              experience is more than just an event - it&apos;s a moment of
              community, joy, and self-discovery. Click on any icon below to
              revisit the vibes, view highlights, and feel the energy from past
              gatherings. Your next favorite memory might just be one click
              away.
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
