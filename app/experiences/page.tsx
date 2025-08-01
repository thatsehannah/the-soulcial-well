import Image from "next/image";
import React from "react";
import Experience from "./_components/Experience";
import { experienceData } from "./_data/experienceData";
import Navbar from "@/components/Navbar";

const ExperiencesPage = () => {
  const experiences = experienceData;

  return (
    <main className='bg-[#f2f4e6]'>
      <Navbar />
      <section className='pt-12 flex flex-col justify-center items-center h-[100vh]'>
        <p className='lg:text-9xl text-8xl text-center font-script'>
          Experiences
        </p>
        <div className='grid grid-cols-1 lg:grid-cols-3 lg:my-8 my-4 w-3/4 lg:p-8 p-2 items-center lg:gap-12'>
          <div className='relative mx-auto my-auto'>
            <Image
              src='/assets/experiences-camera.png'
              alt='camera'
              height={400}
              width={400}
            />
          </div>

          <div className='col-span-2 lg:p-12 p-6'>
            <p className='text-main-foreground lg:text-3xl text-lg text-center lg:text-start'>
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
          index={index}
          key={index}
        />
      ))}
    </main>
  );
};

export default ExperiencesPage;
