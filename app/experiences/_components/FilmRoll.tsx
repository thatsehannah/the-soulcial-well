import Image from "next/image";
import React from "react";

type FilmRollProps = {
  imageUrls: string[];
};

const FilmRoll = ({ imageUrls }: FilmRollProps) => {
  return (
    <div className='flex flex-col lg:w-auto md:w-[40%] w-[90%] md:h-180 h-200 overflow-y-scroll border-b-[32px] border-t-[16px] border-main-foreground rounded-lg'>
      <div className=''>
        {imageUrls.map((url, index) => (
          <div
            className='border-[12px] relative border-main-foreground w-full lg:w-80 h-80'
            key={index}
          >
            <Image
              src={url}
              className='object-cover'
              alt='event-img'
              fill
              sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
              quality={100}
            />
          </div>
        ))}
        <div />
      </div>
    </div>
  );
};

export default FilmRoll;
