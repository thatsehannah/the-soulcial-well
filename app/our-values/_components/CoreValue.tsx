import { CoreValueItem } from "@/utils/types";
import Image from "next/image";
import React from "react";

type CoreValueProps = CoreValueItem;

const CoreValue = ({ title, imageSrc, text }: CoreValueProps) => {
  return (
    <div className='flex flex-col items-center pt-8 pb-4'>
      <div className='w-65 h-65 flex justify-center items-center mb-2 p-2'>
        <Image
          src={imageSrc}
          alt={`${title} core value`}
          height={350}
          width={350}
          className='object-cover'
        />
      </div>
      <p className='text-primary font-bold text-2xl capitalize'>{title}</p>
      <hr className='bg-main-foreground w-48 my-3 border-0 h-[2px]' />
      <p className='text-[1rem] w-3/4 text-center leading-5'>{text}</p>
    </div>
  );
};

export default CoreValue;
