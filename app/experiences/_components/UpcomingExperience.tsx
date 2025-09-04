"use client";

import { ExperienceItem } from "@/utils/types";
import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CircleArrowLeft, CircleArrowRight } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

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
      <div className='text-xl lg:leading-9 leading-7 lg:w-1/2 w-full lg:px-12 px-0 pt-4'>
        <p className='lg:text-6xl text-5xl mb-12 text-primary title text-shadow-lg'>
          {experience.title}
        </p>
        <p className='text-white whitespace-pre-wrap up-description'>
          {upcomingDescription}
        </p>
        {linkToRsvp && (
          <Button className='flex justify-center items-center gap-2 text-2xl text-black mt-12 p-6 hover:scale-110 hover:cursor-pointer hover:shadow-2xl transition-all ease-in-out duration-300 button'>
            <a
              href={linkToRsvp!}
              target='_blank'
            >
              RSVP
            </a>
          </Button>
        )}
      </div>
      <Image
        src={flyerUrl!}
        alt='flyer'
        height={500}
        width={450}
        quality={100}
        className='rounded-xl shadow-2xl image'
        priority
      />
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
      <div className='flex justify-between items-center'>
        {isPrevButtonVisible && (
          <CircleArrowLeft
            size={42}
            color='white'
            className={`hover:scale-110 hover:fill-primary hover:cursor-pointer transition-all ease-in-out duration-300 ${isPrevButtonVisible ? "visible" : "invisible"}`}
            onClick={() => setCurrentIndex((prevState) => prevState - 1)}
          />
        )}
        <UpcomingExperience experience={currentUpcomingExperience} />
        {isNextButtonVisible && (
          <CircleArrowRight
            size={42}
            color='white'
            className='hover:scale-110 hover:fill-primary hover:cursor-pointer transition-all ease-in-out duration-300'
            onClick={() => setCurrentIndex((prevState) => prevState + 1)}
          />
        )}
      </div>
    </div>
  );
};

export default UpcomingExperiences;
