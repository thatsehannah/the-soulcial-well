"use client";

import { ExperienceItem } from "@/utils/types";
import { format } from "date-fns";
import { Edit } from "lucide-react";
import Image from "next/image";
import React from "react";

type ExistingExperienceCardProps = {
  data: ExperienceItem;
  onClick: () => void;
};

const ExistingExperienceCard = ({
  data,
  onClick,
}: ExistingExperienceCardProps) => {
  const { title, date, flyerUrl } = data;
  const thumbnailSrc = flyerUrl === "" ? "/assets/TSWLOGO2025.png" : flyerUrl!;

  return (
    <div className='flex gap-4 border border-neutral-200 rounded-md p-4 bg-neutral-50 flex-1 w-93 2xl:w-108'>
      <div className=''>
        <div className='relative h-40 w-40'>
          <Image
            src={thumbnailSrc}
            alt={`${title}'s thumbnail`}
            fill
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            className='rounded-md border border-neutral-900 object-cover'
          />
        </div>
      </div>
      <div className='flex flex-col justify-between'>
        <div>
          <p className='text-xl font-bold font-main'>{title}</p>
          <p className='text-sm font-light font-main'>{format(date, "PPP")}</p>
        </div>
        <div
          className='flex gap-2 justify-center items-center cursor-pointer w-fit'
          onClick={onClick}
        >
          <p className='text-sm'>Edit</p>
          <Edit
            size={14}
            className='stroke-2 '
          />
        </div>
      </div>
    </div>
  );
};

export default ExistingExperienceCard;
