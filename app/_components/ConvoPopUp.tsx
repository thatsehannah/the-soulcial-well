"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React, { useEffect, useRef, useState } from "react";

const ConvoPopUp = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dialogRef = useRef(null);

  useEffect(() => {
    if (localStorage.getItem("visitedToday") === null) {
      const timeout = setTimeout(() => {
        setIsOpen(true);
      }, 6500);

      return () => clearTimeout(timeout);
    }
  }, []);

  useEffect(() => {
    const previousVisitor = localStorage.getItem(
      "visitedToday"
    ) as unknown as boolean;
    console.log("Checking previous visitor...");

    if (previousVisitor === null) {
      console.log("Setting visitedToday...");

      localStorage.setItem("visitedToday", "true");
      return;
    }
  }, []);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <DialogContent
        ref={dialogRef}
        className='min-w-[80%] border-4 border-primary text-center'
      >
        <DialogHeader>
          <DialogTitle className='font-normal lg:text-3xl text-3xl'>
            Your Daily{" "}
            <span className='font-script font-bold'>Candid Conversation</span>
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
