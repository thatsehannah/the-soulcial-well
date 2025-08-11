"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React, { useEffect, useState } from "react";

const ConvoPopUp = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const resetPopUpExpiry = () => {
      const currentTime = new Date(Date.now());
      let expiryTime: number;

      //making this implementation flexible in the event i want to change the target time in the future
      const targetTime = new Date(currentTime).setHours(23, 59, 0, 0);

      if (Date.now() > targetTime) {
        const nextDay = new Date(currentTime).setDate(
          currentTime.getDate() + 1
        );
        expiryTime = new Date(nextDay).setHours(23, 59, 0, 0); // Settign expiry time for next day
      } else {
        expiryTime = targetTime; // Setting expiry time for current day
      }

      localStorage.setItem("popUpExpiry", expiryTime.toString());
      const timeout = setTimeout(() => {
        setIsOpen(true);
      }, 6500);

      return () => clearTimeout(timeout);
    };

    if (localStorage.getItem("popUpExpiry") === null) {
      resetPopUpExpiry();
    }

    const expiryTime = localStorage.getItem("popUpExpiry");
    if (expiryTime && Date.now() >= parseInt(expiryTime)) {
      resetPopUpExpiry();
    }
  }, []);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <DialogContent className='min-w-[80%] border-4 border-primary text-center'>
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
        <p className='lg:text-5xl text-3xl font-bold'>
          What&apos;s a version of me do I secretly miss?
        </p>
      </DialogContent>
    </Dialog>
  );
};

export default ConvoPopUp;
