import Image from "next/image";
import { formatTitle } from "../_utils/formatTitle";
import { Button } from "@/components/ui/button";
import { ExperienceItem } from "@/utils/types";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

type UpcomingExperienceProps = {
  experience: ExperienceItem;
};

const UpcomingExperience = ({ experience }: UpcomingExperienceProps) => {
  const { upcomingDescription, linkToRsvp, flyerUrl } = experience;

  useGSAP(() => {
    gsap.fromTo(
      ".up-title",
      { opacity: 0, yPercent: -100 },
      { opacity: 1, duration: 0.8, yPercent: 0 }
    );

    gsap.fromTo(
      ".up-image",
      { opacity: 0, xPercent: 100 },
      { opacity: 1, duration: 0.8, xPercent: 0 }
    );

    gsap.fromTo(".up-button", { opacity: 0 }, { opacity: 1, duration: 0.8 });
    gsap.fromTo(
      ".up-description",
      { opacity: 0 },
      { opacity: 1, duration: 0.8 }
    );
  }, [experience]);

  return (
    <div className='flex lg:flex-row flex-col lg:my-8 my-4 w-full lg:gap-12 justify-center items-center'>
      <div className='text-xl lg:leading-9 leading-7 lg:w-1/2 w-full lg:px-12 px-0 pt-4 flex flex-col lg:items-start items-center justify-center'>
        <div className='lg:text-6xl text-5xl lg:mb-12 mb-8 text-primary up-title text-shadow-lg'>
          {formatTitle(experience.title)}
        </div>
        <div className='lg:hidden block h-[410px] w-[290px] relative lg:mb-12 mb-8'>
          <Image
            src={flyerUrl!}
            alt='flyer'
            fill
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            quality={100}
            className='rounded-xl shadow-2xl absolute up-image'
            priority
          />
        </div>
        <p className='text-white whitespace-pre-wrap up-description lg:text-start text-center lg:text-xl text-lg'>
          {upcomingDescription}
        </p>
        {linkToRsvp && (
          <Button className='flex justify-center items-center gap-2 text-2xl text-black lg:mt-12 mt-8 p-6 hover:scale-110 hover:cursor-pointer hover:shadow-2xl transition-all ease-in-out duration-300 up-button'>
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

export default UpcomingExperience;
