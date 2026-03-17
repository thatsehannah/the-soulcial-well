"use client";

import React, { ReactNode, useEffect, useState } from "react";
import FilmRoll from "./FilmRoll";
import { ExperienceItem } from "@/utils/types";
import { formatTitle } from "../_utils/formatTitle";
import { fetchPhotosFromStorage } from "@/utils/clientActions";
import { MessageSquareWarning } from "lucide-react";
import LoadingIndicator from "@/components/LoadingIndicator";

type ExperienceProps = {
  item: ExperienceItem;
  index: number;
};

const Experience = ({ item, index }: ExperienceProps) => {
  const [mediaUrls, setMediaUrls] = useState<string[]>([]);
  const [mediaLoaded, setMediaLoaded] = useState<boolean>(false);
  const [errorFetchingPhotos, setErrorFetchingPhotos] = useState(false);
  const isEvenSection = index % 2 === 0;

  useEffect(() => {
    setErrorFetchingPhotos(false);
    const fetchMedia = async () => {
      const response = await fetchPhotosFromStorage(item.storageFolder!);

      if (response.data) {
        const result = response.data;
        const media = result.filter((imageUrl) => imageUrl !== item.flyerUrl);
        setMediaUrls(media);
        setMediaLoaded(true);
      } else {
        setErrorFetchingPhotos(true);
      }
      setErrorFetchingPhotos(true);
    };

    fetchMedia();
  }, [item.storageFolder, item.flyerUrl]);

  const showDateLocation = (
    date: Date,
    location: string,
    isEvenSection: boolean,
  ): ReactNode => {
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();
    const textColor = isEvenSection ? "text-main-foreground" : "text-white";

    return (
      <p
        className={`${textColor} lg:text-xl text-sm font-light lg:tracking-[0.2em] tracking-widest uppercase`}
      >
        {`${month} ${year} - ${location}`}
      </p>
    );
  };

  return (
    <section
      className={`${
        isEvenSection ? "bg-primary" : "bg-dark-green"
      } px-12 lg:py-24 py-12`}
    >
      <div className='mb-4 text-center'>
        {formatTitle(item.title, isEvenSection)}
      </div>
      <div className='mb-8 text-center'>
        {showDateLocation(item.date, item.location, isEvenSection)}
      </div>

      <div className='flex lg:flex-row flex-col lg:my-8 my-4 w-full lg:gap-12 justify-center items-center'>
        {mediaLoaded ? (
          <FilmRoll
            mediaUrls={mediaUrls}
            title={item.title}
          />
        ) : errorFetchingPhotos ? (
          <div
            className={`flex items-center justify-center gap-2 ${
              isEvenSection ? "text-main-foreground" : "text-white"
            } whitespace-pre-wrap lg:text-start text-center italic`}
          >
            <MessageSquareWarning />
            <p>Could not load media</p>
          </div>
        ) : (
          <LoadingIndicator />
        )}
        <div className='lg:text-xl text-lg lg:leading-9 leading-7 lg:w-1/2 w-full lg:px-12 px-0 pt-4'>
          <p
            className={`${
              isEvenSection ? "text-main-foreground" : "text-white"
            } whitespace-pre-wrap lg:text-start text-center`}
          >
            {item.description}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Experience;
