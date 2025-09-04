"use client";

import { ExperienceItem } from "@/utils/types";
import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CircleArrowLeft, CircleArrowRight } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { formatTitle } from "../_utils/formatTitle";

type UpcomingExperienceProps = {
  experiences: ExperienceItem[];
};

const UpcomingExperience = ({ experience }: { experience: ExperienceItem }) => {
  const { upcomingDescription, linkToRsvp, flyerUrl } = experience;

  useGSAP(() => {
    gsap.fromTo(
      ".title",
      { opacity: 0, yPercent: -100 },
      { opacity: 1, duration: 0.8, yPercent: 0 }
    );

    gsap.fromTo(
      ".image",
      { opacity: 0, xPercent: 100 },
      { opacity: 1, duration: 0.8, xPercent: 0 }
    );

    gsap.fromTo(".button", { opacity: 0 }, { opacity: 1, duration: 0.8 });
    gsap.fromTo(
      ".up-description",
      { opacity: 0 },
      { opacity: 1, duration: 0.8 }
    );
  }, [experience]);

  return (
    <div className='flex lg:flex-row flex-col lg:my-8 my-4 w-full lg:gap-12 justify-center items-center'>
      <div className='text-xl lg:leading-9 leading-7 lg:w-1/2 w-full lg:px-12 px-0 pt-4 flex flex-col lg:items-start items-center justify-center'>
        <div className='lg:text-6xl text-5xl lg:mb-12 mb-8 text-primary title text-shadow-lg'>
          {formatTitle(experience.title)}
        </div>
        <div className='lg:hidden block h-[410px] w-[290px] relative lg:mb-12 mb-8'>
          <Image
            src={flyerUrl!}
            alt='flyer'
            fill
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            quality={100}
            className='rounded-xl shadow-2xl absolute image'
            priority
          />
        </div>
        <p className='text-white whitespace-pre-wrap up-description'>
          {upcomingDescription}
        </p>
        {linkToRsvp && (
          <Button className='flex justify-center items-center gap-2 text-2xl text-black lg:mt-12 mt-8 p-6 hover:scale-110 hover:cursor-pointer hover:shadow-2xl transition-all ease-in-out duration-300 button'>
            <a
              href={linkToRsvp!}
              target='_blank'
            >
              RSVP
            </a>
          </Button>
        )}
      </div>
      <div className='lg:block hidden h-[550px] w-[450px] relative'>
        <Image
          src={flyerUrl!}
          alt='flyer'
          fill
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          quality={100}
          className='rounded-xl shadow-2xl absolute image'
          priority
        />
      </div>
    </div>
  );
};

const UpcomingExperiences = ({ experiences }: UpcomingExperienceProps) => {
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

  const currentUpcomingExperience: ExperienceItem = experiences[currentIndex];

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
