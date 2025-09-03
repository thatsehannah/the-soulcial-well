"use client";

import { ExperienceItem } from "@/utils/types";
import { useEffect, useState } from "react";
import { getImagesFromStorage } from "@/utils/getImagesFromStorage";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

type UpcomingExperienceProps = {
  experiences: ExperienceItem[];
};

const UpcomingExperience = () => {};

const UpcomingExperiences = ({ experiences }: UpcomingExperienceProps) => {
  const [images, setImages] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentUpcomingExperience: ExperienceItem = experiences[currentIndex];

  useEffect(() => {
    const fetchImages = async () => {
      const urls = await getImagesFromStorage(
        currentUpcomingExperience.storageBucket!
      );
      setImages(urls);
    };

    fetchImages();
  }, [currentUpcomingExperience]);

  return (
    <div className='bg-main-foreground px-12 py-24'>
      <div className='mb-8'>
        <p className='lg:text-6xl text-5xl text-white text-center'>
          Upcoming Events
        </p>
      </div>
      <div className='flex lg:flex-row flex-col lg:my-8 my-4 w-full lg:gap-12 justify-center items-center'>
        <div className='text-xl lg:leading-9 leading-7 lg:w-1/2 w-full lg:px-12 px-0 pt-4'>
          <p className='lg:text-6xl text-5xl mb-12 text-primary'>
            {currentUpcomingExperience.title}
          </p>
          <p className='text-white whitespace-pre-wrap'>
            {currentUpcomingExperience.upcomingDescription}
          </p>
          <Button className='flex justify-center items-center gap-2 text-2xl text-black mt-12 p-6'>
            <a
              href={currentUpcomingExperience.linkToRsvp!}
              target='_blank'
            >
              RSVP
            </a>
            <ArrowRight className='h-22 w-22' />
          </Button>
        </div>
        <Image
          src={currentUpcomingExperience.flyerUrl!}
          alt='flyer'
          height={500}
          width={450}
          quality={100}
          className='rounded-xl'
        />
      </div>
    </div>
  );
};

export default UpcomingExperiences;
