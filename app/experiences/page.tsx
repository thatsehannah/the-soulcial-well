import Image from "next/image";
import React, { Fragment } from "react";
import Experience from "./_components/Experience";
import { experienceData } from "./_data/experienceData";
import UpcomingExperience from "./_components/UpcomingExperience";

const ExperiencesPage = () => {
  //only getting the experiences that have photos in the storage bucket in firebase
  const pastExperiences = experienceData.filter(
    (item) => item.storageBucket !== undefined && item.upcoming === false
  );

  //getting upcoming experiences
  const upcomingExperiences = experienceData.filter(
    (item) => item.storageBucket !== undefined && item.upcoming === true
  );

  return (
    <main>
      <section className='flex flex-col justify-center items-center lg:p-32 py-40 px-16 bg-[#f2f4e6]'>
        <p className='md:text-8xl text-7xl text-center font-script'>
          Experiences
        </p>
        <div className='grid grid-cols-1 lg:grid-cols-3 lg:my-8 my-4 items-center lg:gap-22 '>
          <div className='relative mx-auto my-auto lg:h-68 md:h-40 h-45 lg:w-90 md:w-60 w-45'>
            <Image
              src='/assets/experiences.svg'
              alt='camera'
              fill
              quality={100}
              priority
            />
          </div>

          <div className='col-span-2 lg:p-12 py-6'>
            <p className='text-main-foreground lg:text-2xl text-xl text-center lg:text-start'>
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
      <section>
        <UpcomingExperience experiences={upcomingExperiences} />
      </section>
      {pastExperiences.map((exp, index) => (
        <Fragment key={index}>
          <Experience
            item={exp}
            index={index}
          />
        </Fragment>
      ))}
    </main>
  );
};

export default ExperiencesPage;
