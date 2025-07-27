import React from "react";
import FilmRoll from "./FilmRoll";

type ExperienceProps = {
  title: string;
  description: string;
};

const Experience = ({ title, description }: ExperienceProps) => {
  const formatTitle = (rawTitle: string) => {
    //for titles with a comma
    const splitTitleWithComma = rawTitle.split(",");

    if (splitTitleWithComma.length > 1) {
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
      <div>{formatTitle(title)}</div>
      <div className='grid grid-cols-1 lg:grid-cols-6 lg:mt-8 mt-4 lg:w-2/3 w-full lg:gap-12 lg:p-8 p-2 justify-center items-center mx-auto my-auto'>
        <FilmRoll />

        <div className='gap-4 text-3xl lg:col-span-5 lg:px-30 p-6'>
          <p className='text-white whitespace-pre-wrap'>{description}</p>
        </div>
      </div>
    </section>
  );
};

export default Experience;
