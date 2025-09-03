"use client";

import { ExperienceItem } from "@/utils/types";
import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

type UpcomingExperienceProps = {
  experiences: ExperienceItem[];
};

const UpcomingExperience = ({ experience }: { experience: ExperienceItem }) => {
  const { upcomingDescription, linkToRsvp, flyerUrl } = experience;

  return (
    <div className='flex lg:flex-row flex-col lg:my-8 my-4 w-full lg:gap-12 justify-center items-center'>
      <div className='text-xl lg:leading-9 leading-7 lg:w-1/2 w-full lg:px-12 px-0 pt-4'>
        <p className='lg:text-6xl text-5xl mb-12 text-primary'>
          {experience.title}
        </p>
        <p className='text-white whitespace-pre-wrap'>{upcomingDescription}</p>
        <Button className='flex justify-center items-center gap-2 text-2xl text-black mt-12 p-6'>
          <a
            href={linkToRsvp!}
            target='_blank'
          >
            RSVP
          </a>
          <ArrowRight className='h-22 w-22' />
        </Button>
      </div>
      <Image
        src={flyerUrl!}
        alt='flyer'
        height={500}
        width={450}
        quality={100}
        className='rounded-xl'
      />
    </div>
  );
};

const UpcomingExperiences = ({ experiences }: UpcomingExperienceProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentUpcomingExperience: ExperienceItem = experiences[currentIndex];

  return (
    <div className='bg-main-foreground px-12 py-24'>
      <div className='mb-8'>
        <p className='lg:text-6xl text-5xl text-white text-center'>
          Upcoming Events
        </p>
      </div>
      <UpcomingExperience experience={currentUpcomingExperience} />
    </div>
  );
};

export default UpcomingExperiences;
