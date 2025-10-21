"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

type FilmRollProps = {
  imageUrls: string[];
  title: string;
};

const FilmRoll = ({ imageUrls, title }: FilmRollProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogCurrentIndex, setDialogCurrentIndex] = useState(0);

  const showNextImage = (index: number) => {
    const newIndex = (index + imageUrls.length) % imageUrls.length;

    setDialogCurrentIndex(newIndex);
  };

  const imageShown = imageUrls[dialogCurrentIndex];

  return (
    <div className='relative'>
      <div className='flex flex-col lg:w-auto md:w-[40%] w-[90%] md:h-180 h-200 overflow-y-scroll border-b-[32px] border-t-[16px] border-main-foreground rounded-lg'>
        <div className=''>
          {imageUrls.map((url, index) => (
            <div
              className='border-[12px] relative border-main-foreground w-full lg:w-80 h-80'
              key={index}
            >
              <Image
                src={url}
                className='object-cover cursor-pointer'
                alt='event-img'
                fill
                sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                quality={100}
                onClick={() => {
                  setIsDialogOpen(true);
                  setDialogCurrentIndex(imageUrls.indexOf(url));
                }}
              />
            </div>
          ))}
          <div />
        </div>
      </div>
      <Dialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      >
        <DialogContent className='min-w-[60%]'>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
          <div className='flex flex-col items-center justify-center'>
            <div className='flex items-center justify-center gap-4 w-full mb-8'>
              <ChevronLeft
                className='cursor-pointer hover:scale-125 transition-all ease-in-out duration-200'
                size={40}
                onClick={() => showNextImage(dialogCurrentIndex - 1)}
              />
              <div className='relative h-[28rem] w-full'>
                <Image
                  src={imageShown}
                  className='rounded-md object-contain'
                  alt='event-img'
                  quality={100}
                  fill
                  sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                />
              </div>
              <ChevronRight
                className='cursor-pointer hover:scale-125 transition-all ease-in-out duration-200'
                size={40}
                onClick={() => {
                  showNextImage(dialogCurrentIndex + 1);
                }}
              />
            </div>
            <div className='flex gap-3 w-80% overflow-scroll'>
              {imageUrls.map((imgUrl, index) => {
                return (
                  <Image
                    key={index}
                    src={imgUrl}
                    alt='img-thumbnail'
                    className={`${dialogCurrentIndex === index ? "border-4 border-dark-green" : ""} rounded-sm cursor-pointer object-cover`}
                    quality={100}
                    width={85}
                    height={75}
                    onClick={() => {
                      setDialogCurrentIndex(index);
                    }}
                  />
                );
              })}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FilmRoll;
