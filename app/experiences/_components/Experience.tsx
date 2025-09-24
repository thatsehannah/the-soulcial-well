"use client";

import React, { useEffect, useState } from "react";
import FilmRoll from "./FilmRoll";
import { ExperienceItem } from "@/utils/types";
import { formatTitle } from "../_utils/formatTitle";
import { fetchPhotosFromStorage } from "@/utils/fetchPhotosFromStorage";

type ExperienceProps = {
  item: ExperienceItem;
  index: number;
};

const Experience = ({ item, index }: ExperienceProps) => {
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const isEvenSection = index % 2 === 0;

  useEffect(() => {
    const fetchImages = async () => {
      const response = await fetchPhotosFromStorage(item.storageFolder!);
      setImageUrls(response);
    };

    fetchImages();
  }, [item.storageFolder]);

  return (
    <section
      className={`${
        isEvenSection ? "bg-primary" : "bg-dark-green"
      } px-12 py-24`}
    >
      <div className='mb-8 text-center'>
        {formatTitle(item.title, isEvenSection)}
      </div>
      <div className='flex lg:flex-row flex-col lg:my-8 my-4 w-full lg:gap-12 justify-center items-center'>
        <FilmRoll imageUrls={imageUrls} />
        <div className='text-xl lg:leading-9 leading-7 lg:w-1/2 w-full lg:px-12 px-0 pt-4'>
          <p
            className={`${
              isEvenSection ? "text-main-foreground" : "text-white"
            } whitespace-pre-wrap`}
          >
            {item.description}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Experience;
