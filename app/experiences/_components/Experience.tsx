import React from "react";
import FilmRoll from "./FilmRoll";

type ExperienceProps = {
  title: string;
  description: string;
  images: string[];
  index: number;
};

const Experience = ({ title, description, images, index }: ExperienceProps) => {
  const isEvenSection = index % 2 === 0;

  const formatTitle = (rawTitle: string) => {
    //for titles with a comma
    if (rawTitle.indexOf(",") !== -1) {
      const splitTitleWithComma = rawTitle.split(",");

      return (
        <p className='lg:text-6xl text-5xl text-white text-center'>
          {splitTitleWithComma[0]}
          {", "}
          <span
            className={`font-script ${
              isEvenSection ? "text-main-foreground" : "text-primary"
            } `}
          >
            {splitTitleWithComma[1]}
          </span>
        </p>
      );
    }

    const splitTitle = rawTitle.split(" ");

    if (splitTitle[1] === "&" || splitTitle[1] === "+") {
      return (
        <p className='lg:text-6xl text-5xl text-white text-center'>
          {splitTitle[0]} {splitTitle[1]}{" "}
          <span
            className={`font-script ${
              isEvenSection ? "text-main-foreground" : "text-primary"
            } `}
          >
            {splitTitle.slice(2)}
          </span>
        </p>
      );
    }

    return (
      <p className='lg:text-6xl text-5xl text-white text-center'>
        {splitTitle[0]}{" "}
        <span
          className={`font-script ${
            isEvenSection ? "text-main-foreground" : "text-primary"
          } `}
        >
          {splitTitle.slice(1).join(" ")}
        </span>
      </p>
    );
  };

  return (
    <section
      className={`${
        isEvenSection ? "bg-primary" : "bg-dark-green"
      } px-12 py-24`}
    >
      <div className='mb-8'>{formatTitle(title)}</div>
      <div className='flex lg:flex-row flex-col lg:my-8 my-4 w-full lg:gap-12 justify-center lg:items-start items-center'>
        <FilmRoll images={images} />
        <div className='lg:text-2xl text-lg lg:w-1/2 w-full lg:px-12 p-6'>
          <p
            className={`${
              isEvenSection ? "text-main-foreground" : "text-white"
            } whitespace-pre-wrap font-medium`}
          >
            {description}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Experience;
