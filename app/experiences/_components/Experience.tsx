import React from "react";
import FilmRoll from "./FilmRoll";

type ExperienceProps = {
  title: string;
  description: string;
  images: string[];
};

const Experience = ({ title, description, images }: ExperienceProps) => {
  const formatTitle = (rawTitle: string) => {
    //for titles with a comma
    if (rawTitle.indexOf(",") !== -1) {
      const splitTitleWithComma = rawTitle.split(",");

      return (
        <p className='text-6xl text-white text-center'>
          {splitTitleWithComma[0]}
          {", "}
          <span className='font-script text-main-foreground'>
            {splitTitleWithComma[1]}
          </span>
        </p>
      );
    }

    const splitTitle = rawTitle.split(" ");

    if (splitTitle[1] === "&" || splitTitle[1] === "+") {
      return (
        <p className='text-6xl text-white text-center'>
          {splitTitle[0]} {splitTitle[1]}{" "}
          <span className='font-script text-main-foreground'>
            {splitTitle.slice(2)}
          </span>
        </p>
      );
    }

    return (
      <p className='text-6xl text-white text-center'>
        {splitTitle[0]}{" "}
        <span className='font-script text-main-foreground'>
          {splitTitle.slice(1).join(" ")}
        </span>
      </p>
    );
  };

  return (
    <section className='bg-primary p-12'>
      <div className='mb-8'>{formatTitle(title)}</div>
      <div className='flex lg:my-8 my-4 w-full lg:gap-12 justify-center'>
        <FilmRoll images={images} />
        <div className='text-3xl w-1/2 lg:px-12 p-6'>
          <p className='text-white whitespace-pre-wrap'>{description}</p>
        </div>
      </div>
    </section>
  );
};

export default Experience;
