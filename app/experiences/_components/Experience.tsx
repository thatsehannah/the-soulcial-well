import React from "react";
import FilmRoll from "./FilmRoll";

type ExperienceProps = {
  title: string;
  description: string;
};

const Experience = ({ title, description }: ExperienceProps) => {
  const formatText = (text: string) => {
    const splitText = text.split(" ");

    if (splitText[1] === "&" || splitText[1] === "+") {
      return (
        <p className='text-6xl text-white text-center'>
          {splitText[0]} {splitText[1]}{" "}
          <span className='font-script text-main-foreground'>
            {splitText.slice(2)}
          </span>
        </p>
      );
    }

    return (
      <p className='text-6xl text-white text-center'>
        {splitText[0]}{" "}
        <span className='font-script text-main-foreground'>
          {splitText.slice(1).join(" ")}
        </span>
      </p>
    );
  };

  return (
    <section className='bg-primary p-12'>
      <div>{formatText(title)}</div>
      <div className='grid grid-cols-1 lg:grid-cols-3 lg:mt-8 mt-4 lg:w-2/3 w-full lg:gap-12 lg:p-8 p-2 justify-center items-center mx-auto my-auto'>
        <FilmRoll />

        <div className='grid gap-4 text-3xl col-span-2 lg:px-30 p-6'>
          <p className='text-white'>{description}</p>
        </div>
      </div>
    </section>
  );
};

export default Experience;
