"use client";

import { ExperienceItem } from "@/utils/types";
import React, { useState } from "react";
import ExistingExperienceCard from "./ExistingExperienceCard";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ExistingExperienceForm from "./ExistingExperienceForm";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { deleteExperience } from "@/actions/experiences";
import { deleteStorageFolder } from "@/actions/storage";

type EditExperiencesContentProps = {
  experiences: ExperienceItem[];
};

//this will make this page dynamic and fetch for experiences on every page request
// export const dynamic = "force-dynamic";

const EditExperiencesContent = ({
  experiences,
}: EditExperiencesContentProps) => {
  const [activeItem, setActiveItem] = useState<ExperienceItem | undefined>(
    undefined,
  );
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

  const deleteActiveExperience = async (experience: ExperienceItem) => {
    try {
      console.log("Deleting experience: ", experience.title);

      const isExperienceDeleted = await deleteExperience(
        experience.storageFolder!,
      );
      const isStorageFolderDeleted = await deleteStorageFolder(
        experience.storageFolder!,
      );

      if (isExperienceDeleted && isStorageFolderDeleted) {
        toast.success(
          <p className='text-sm'>
            {experience.title} was deleted successfully!
          </p>,
        );
      }

      setIsDeleteConfirmOpen(false);
      setIsFormOpen(false);
    } catch (error) {
      console.error(error);
      const errorMessage =
        error instanceof Error ? error.message : "An error occured";
      toast.error(<p className='text-sm'>{errorMessage}</p>);
    }
  };

  if (experiences.length === 0) {
    return (
      <section className='mx-auto mt-8'>
        <p className='font-bold text-xl'>No experiences found.</p>
      </section>
    );
  }

  return (
    <section className='mt-8 w-full'>
      <div className='grid grid-cols-3 gap-y-6'>
        {experiences.map((item) => (
          <ExistingExperienceCard
            data={item}
            onClick={() => {
              setActiveItem(item);
              setIsFormOpen(true);
            }}
            key={item.storageFolder!}
          />
        ))}
      </div>
      <Dialog
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
      >
        <DialogContent
          className='min-w-[90%]'
          showCloseButton={false}
        >
          <div className='flex justify-between'>
            <DialogTitle className='text-2xl font-normal'>
              <span className='font-main font-bold'>
                &lsquo;{activeItem?.title}&rsquo;
              </span>{" "}
              Experience
            </DialogTitle>
            <Button
              variant='destructive'
              className='cursor-pointer'
              onClick={() => setIsDeleteConfirmOpen(true)}
            >
              Delete
            </Button>
          </div>
          <DialogDescription>
            Edit the data to update this experience
          </DialogDescription>
          <ExistingExperienceForm
            existingExperience={activeItem!}
            closePopUp={() => setIsFormOpen(false)}
          />
        </DialogContent>
      </Dialog>
      <Dialog
        open={isDeleteConfirmOpen}
        onOpenChange={setIsDeleteConfirmOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure you want to delete?</DialogTitle>
            <DialogDescription>
              This action is not reversible.
            </DialogDescription>
          </DialogHeader>
          <div className='flex gap-2 justify-center items-center w-full'>
            <Button onClick={() => deleteActiveExperience(activeItem!)}>
              Yes
            </Button>
            <DialogClose asChild>
              <Button variant='outline'>No</Button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default EditExperiencesContent;
