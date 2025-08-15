"use client";

import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { getRandomCandidConvoQuestion } from "@/utils/getRandomCandidConvoQuestion";
// import Image from "next/image";
import React, { useEffect, useState } from "react";

const ConvoPopUp = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dailyQuestion, setDailyQuestion] = useState("");
  const [showQuestion, setShowQuestion] = useState(false);

  const dialogTimeout = () => {
    const timeout = setTimeout(() => {
      setIsOpen(true);
    }, 6500);

    return () => clearTimeout(timeout);
  };

  const handleOnCheckedChange = (checked: boolean) => {
    setShowQuestion(checked);
    sessionStorage.setItem("showQuestion", checked ? "false" : "true");
  };

  useEffect(() => {
    const ssShowQuestion = sessionStorage.getItem("showQuestion");
    if (ssShowQuestion && ssShowQuestion === "true") {
      dialogTimeout();
    }

    const lsQotd = localStorage.getItem("qotd");
    if (lsQotd) {
      setDailyQuestion(lsQotd);
    }
  }, []);

  useEffect(() => {
    const resetPopUpExpiry = () => {
      sessionStorage.setItem("showQuestion", "true");
      const currentTime = new Date(Date.now());
      const targetTime = new Date(currentTime).setHours(23, 59, 0, 0);

      //making this implementation flexible in the event i want to change the target time in the future
      if (Date.now() > targetTime) {
        const nextDay = new Date(currentTime);
        nextDay.setDate(currentTime.getDate() + 1);

        localStorage.setItem(
          "popUpExpiry",
          nextDay.setHours(23, 59, 0, 0).toString()
        ); // Setting expiry time for next day
      } else {
        localStorage.setItem("popUpExpiry", targetTime.toString()); // Setting expiry time for current day
      }

      //getting random question
      const randomQuestion = getRandomCandidConvoQuestion();
      setDailyQuestion(randomQuestion);
      localStorage.setItem("qotd", randomQuestion);

      dialogTimeout();
    };

    if (localStorage.getItem("popUpExpiry") === null) {
      resetPopUpExpiry();
    }

    const currentExpiryTime = localStorage.getItem("popUpExpiry");
    if (currentExpiryTime && Date.now() >= parseInt(currentExpiryTime)) {
      resetPopUpExpiry();
    }
  }, []);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <DialogContent className='lg:min-w-[60%] lg:max-h-[90%] 2xl:min-w-[45%] 2xl:max-h-[70%] flex border-4 border-primary p-0'>
        <div className='w-1/2 lg:block hidden overflow-hidden rounded-tl-md rounded-bl-md'>
          <div className='w-full h-full overflow-hidden relative'>
            <video
              src='/assets/pop-up-video.mp4'
              autoPlay
              loop
              muted
              className='h-full w-full object-cover'
              preload='metadata'
              playsInline
            />
            {/* <Image
              src='/assets/pop-up-image2.svg'
              alt='pop up image'
              fill
              quality={100}
              className='object-cover'
              priority
            /> */}
          </div>
        </div>
        <div className='lg:w-1/2 p-6 flex flex-col justify-center'>
          <DialogHeader className='text-start'>
            <DialogTitle className='font-normal text-3xl mb-3'>
              Your Daily{" "}
              <span className='font-script font-bold'>
                Candid Conversation
              </span>{" "}
            </DialogTitle>
            <DialogDescription className='text-lg text-dark-green'>
              Thank you for visiting. Take a moment to think about the following
              reflection question - just for you!
            </DialogDescription>
          </DialogHeader>
          <p className='lg:text-4xl text-3xl font-bold lg:my-12 my-10 text-center'>
            {dailyQuestion}
          </p>
          <DialogFooter className='flex flex-row'>
            <Checkbox
              id='checkbox'
              checked={showQuestion}
              onCheckedChange={handleOnCheckedChange}
            />
            <Label htmlFor='checkbox'>Don&apos;t show me again today!</Label>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConvoPopUp;
