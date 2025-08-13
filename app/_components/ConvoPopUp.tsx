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
import React, { useEffect, useState } from "react";

const ConvoPopUp = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dailyQuestion, setDailyQuestion] = useState("");
  const [keepShowing, setKeepShowing] = useState(false);

  useEffect(() => {
    const resetPopUpExpiry = () => {
      const currentTime = new Date(Date.now());
      let expiryTime: number;

      const targetTime = new Date(currentTime).setHours(8, 30, 0, 0);

      //making this implementation flexible in the event i want to change the target time in the future
      if (Date.now() > targetTime) {
        const nextDay = new Date(currentTime);
        nextDay.setDate(currentTime.getDate() + 1);
        expiryTime = nextDay.setHours(8, 30, 0, 0); // Setting expiry time for next day
      } else {
        expiryTime = targetTime; // Setting expiry time for current day
      }

      localStorage.setItem("popUpExpiry", expiryTime.toString());

      //getting random question
      setDailyQuestion(getRandomCandidConvoQuestion());
      const timeout = setTimeout(() => {
        setIsOpen(true);
      }, 6500);

      return () => clearTimeout(timeout);
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
      <DialogContent className='min-w-[50%] border-4 border-primary text-center'>
        <DialogHeader>
          <DialogTitle className='font-normal lg:text-3xl text-3xl'>
            Your Daily{" "}
            <span className='font-script font-bold'>Candid Conversation</span>{" "}
            ❤️
          </DialogTitle>
          <DialogDescription className='text-lg'>
            Thank you for visiting. Take a moment to think about the following
            reflection question - just for you!
          </DialogDescription>
        </DialogHeader>
        <p className='lg:text-5xl text-3xl font-bold'>{dailyQuestion}</p>
        <DialogFooter>
          <Checkbox
            id='checkbox'
            checked={keepShowing}
          />
          <Label htmlFor='checkbox'>Don&apos;t show me again today!</Label>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConvoPopUp;
