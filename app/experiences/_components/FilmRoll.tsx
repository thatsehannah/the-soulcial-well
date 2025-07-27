import Image from "next/image";
import React from "react";

type FilmRollProps = {
  images: string[];
};

const FilmRoll = ({ images }: FilmRollProps) => {
  return (
    <div className='flex flex-col w-100 overflow-y-scroll'>
      {images.map((img, index) => (
        <div
          className='border-[12px] relative border-main-foreground w-80 h-80'
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
    </div>
  );
};

export default FilmRoll;
