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
      const currentTime = Date.now();
      const targetTime = new Date(currentTime).setHours(23, 59, 0, 0);
      console.log("Target time: " + targetTime);

      console.log("expiry calculation: " + (targetTime - currentTime));
      const expiryTime = currentTime + (targetTime - currentTime).toString();
      console.log("Getting ready to set expiryTime: " + expiryTime);

      localStorage.setItem("popUpExpiry", expiryTime);
      const timeout = setTimeout(() => {
        setIsOpen(true);
      }, 6500);

      return () => clearTimeout(timeout);
    };

    if (localStorage.getItem("popUpExpiry") === null) {
      resetPopUpExpiry();
    }

    const expiryTime = localStorage.getItem("popUpExpiry");
    if (expiryTime && Date.now().toString() >= expiryTime) {
      console.log(Date.now().toString() + " > " + expiryTime);
      console.log("Removing expiryTime: " + expiryTime);
      localStorage.removeItem("popUpExpiry");
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
