import Image from "next/image";
import React from "react";
import Experience from "./_components/Experience";
import { experienceData } from "./_data/experienceData";

const ExperiencesPage = () => {
  //only getting the experiences that have photos in the storage bucket in firebase
  const experiences = experienceData.filter(
    (item) => item.storageBucket !== undefined
  );

  return (
    <main>
      <section className='flex flex-col justify-center items-center lg:p-32 py-40 px-16 bg-[#f2f4e6]'>
        <p className='lg:text-8xl text-7xl text-center font-script'>
          Experiences
        </p>
        <div className='grid grid-cols-1 lg:grid-cols-3 lg:my-8 my-4 items-center lg:gap-22 '>
          <div className='relative mx-auto my-auto lg:h-68 h-62 lg:w-90 w-68'>
            <Image
              src='/assets/experiences.svg'
              alt='camera'
              fill
              quality={100}
            />
          </div>

          <div className='col-span-2 lg:p-12 py-6'>
            <p className='text-main-foreground lg:text-2xl text-lg text-center lg:text-start'>
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
        <div key={index}>
          <Experience
            item={exp}
            index={index}
          />
        </div>
      ))}
    </main>
  );
};

export default ExperiencesPage;
