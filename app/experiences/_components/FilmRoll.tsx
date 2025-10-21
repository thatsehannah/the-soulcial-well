"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, Video } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

type FilmRollProps = {
  mediaUrls: string[];
  title: string;
};

const FilmRoll = ({ mediaUrls, title }: FilmRollProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogCurrentIndex, setDialogCurrentIndex] = useState(0);

  const showNextMedia = (index: number) => {
    const newIndex = (index + mediaUrls.length) % mediaUrls.length;

    setDialogCurrentIndex(newIndex);
  };

  const mediaShown = mediaUrls[dialogCurrentIndex];

  if (mediaUrls.length === 0) {
    return (
      <div>
        <p>Failed to load media</p>
      </div>
    );
  }

  return (
    <div className='relative'>
      <div className='flex flex-col lg:w-auto md:w-[40%] w-[90%] md:h-180 h-200 overflow-y-scroll border-b-[32px] border-t-[16px] border-main-foreground rounded-lg'>
        <div>
          {mediaUrls.map((url, index) => {
            if (url.includes(".mp4")) {
              return (
                <div
                  key={index}
                  className='relative'
                >
                  <Video
                    className='absolute top-5 right-5 stroke-white'
                    size={18}
                  />
                  <video
                    src={url}
                    onClick={(e) => {
                      e.preventDefault();
                      setIsDialogOpen(true);
                      setDialogCurrentIndex(mediaUrls.indexOf(url));
                    }}
                    className='border-[12px] object-cover cursor-pointer border-main-foreground w-full lg:w-80 h-80'
                  />
                </div>
              );
            }

            return (
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
                    setDialogCurrentIndex(mediaUrls.indexOf(url));
                  }}
                />
              </div>
            );
          })}
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
                onClick={() => showNextMedia(dialogCurrentIndex - 1)}
              />
              <div className='w-full'>
                {mediaShown.includes(".mp4") ? (
                  <video
                    src={mediaShown}
                    controls
                    playsInline
                  />
                ) : (
                  <div className='relative h-[28rem] w-full'>
                    <Image
                      src={mediaShown}
                      className='rounded-md object-contain'
                      alt='event-img'
                      quality={100}
                      fill
                      sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                    />
                  </div>
                )}
              </div>
              <ChevronRight
                className='cursor-pointer hover:scale-125 transition-all ease-in-out duration-200'
                size={40}
                onClick={() => {
                  showNextMedia(dialogCurrentIndex + 1);
                }}
              />
            </div>
            <div className='flex gap-3 w-80% overflow-scroll'>
              {mediaUrls.map((mediaUrl, index) => {
                if (mediaUrl.includes(".mp4")) {
                  return (
                    <video
                      src={mediaUrl}
                      className={`${dialogCurrentIndex === index ? "border-4 border-dark-green" : ""} rounded-sm cursor-pointer object-cover`}
                      key={index}
                      width={85}
                      height={75}
                      onClick={(e) => {
                        e.preventDefault();
                        setDialogCurrentIndex(index);
                      }}
                    />
                  );
                }
                return (
                  <Image
                    key={index}
                    src={mediaUrl}
                    alt='img-thumbnail'
                    className={`${dialogCurrentIndex === index ? "border-4 border-dark-green" : ""} rounded-sm cursor-pointer object-cover aspect-square`}
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
