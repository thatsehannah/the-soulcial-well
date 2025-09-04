"use client";

import { ExperienceItem } from "@/utils/types";
import { useState } from "react";
import { CircleArrowLeft, CircleArrowRight } from "lucide-react";
import UpcomingExperience from "./UpcomingExperience";

type UpcomingExperiencesProps = {
  experiences: ExperienceItem[];
};

const UpcomingExperiences = ({ experiences }: UpcomingExperiencesProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const upcomingExperiencesLength = experiences.length;

  let isNextButtonVisible = false;
  if (
    upcomingExperiencesLength > 0 &&
    currentIndex != upcomingExperiencesLength - 1
  ) {
    isNextButtonVisible = true;
  }

  let isPrevButtonVisible = false;
  if (upcomingExperiencesLength > 0 && currentIndex > 0) {
    isPrevButtonVisible = true;
  }

  const currentUpcomingExperience = experiences[currentIndex];

  return (
    <div className='bg-main-foreground px-12 py-24'>
      <div className='mb-8'>
        <p className='lg:text-6xl text-5xl text-white text-center font-script'>
          Upcoming Experiences
        </p>
      </div>
      <div className='flex items-center justify-center relative'>
        {isPrevButtonVisible && (
          <div className='absolute lg:block lg:left-0 -left-[12%]'>
            <CircleArrowLeft
              color='white'
              className='hover:scale-110 hover:fill-primary hover:cursor-pointer transition-all ease-in-out duration-300 lg:w-10 w-8 lg:h-10 h-8'
              onClick={() => setCurrentIndex((prevState) => prevState - 1)}
            />
          </div>
        )}
        <UpcomingExperience experience={currentUpcomingExperience} />
        {isNextButtonVisible && (
          <div className='absolute lg:block lg:right-0 -right-[12%]'>
            <CircleArrowRight
              color='white'
              className='hover:scale-110 hover:fill-primary hover:cursor-pointer transition-all ease-in-out duration-300 lg:w-10 w-8 lg:h-10 h-8'
              onClick={() => setCurrentIndex((prevState) => prevState + 1)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default UpcomingExperiences;
