import Image from "next/image";
import React from "react";

type FilmRollProps = {
  images: string[];
};

const FilmRoll = ({ images }: FilmRollProps) => {
  return (
    <div className='flex flex-col lg:w-auto w-2/3 h-200 overflow-y-scroll border-b-[32px] border-t-[16px] border-main-foreground rounded-lg'>
      <div className=''>
        {images.map((img, index) => (
          <div
            className='border-[12px] relative border-main-foreground w-full lg:w-80 h-80'
            key={index}
          >
            <Image
              src={img}
              className='object-cover'
              alt='event-img'
              fill
            />
          </div>
        ))}
        <div />
      </div>
    </div>
  );
};

export default FilmRoll;
