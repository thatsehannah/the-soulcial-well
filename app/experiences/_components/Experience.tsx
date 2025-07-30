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
    const baseClass = "lg:text-6xl text-5xl text-white text-center";
    const spanClass = `font-script ${
      isEvenSection ? "text-main-foreground" : "text-primary"
    } `;

    //for titles with a comma
    if (rawTitle.indexOf(",") !== -1) {
      const splitTitleWithComma = rawTitle.split(",");

      return (
        <p className={baseClass}>
          {splitTitleWithComma[0]}
          {", "}
          <span className={spanClass}>{splitTitleWithComma[1]}</span>
        </p>
      );
    }

    const splitTitle = rawTitle.split(" ");

    if (splitTitle[1] === "&" || splitTitle[1] === "+") {
      return (
        <p className={baseClass}>
          {splitTitle[0]} {splitTitle[1]}{" "}
          <span className={spanClass}>{splitTitle.slice(2)}</span>
        </p>
      );
    }

    return (
      <p className={baseClass}>
        {splitTitle[0]}{" "}
        <span className={spanClass}>{splitTitle.slice(1).join(" ")}</span>
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
      <div className='flex lg:flex-row flex-col lg:my-8 my-4 w-full lg:gap-12 justify-center items-center'>
        <FilmRoll images={images} />
        <div className='lg:text-[28px] lg:leading-9 leading-7 text-lg lg:w-1/2 w-full lg:px-12 p-6'>
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
