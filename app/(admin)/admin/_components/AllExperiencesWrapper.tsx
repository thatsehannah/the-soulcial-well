"use client";

import { fetchExperiences } from "@/utils/clientActions";
import { ExperienceItem } from "@/utils/types";
import React, { useEffect, useState } from "react";
import ExistingExperienceCard from "./ExistingExperienceCard";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import ExistingExperienceForm from "./ExistingExperienceForm";
import LoadingIndicator from "./LoadingIndicator";

//this will make this page dynamic and fetch for experiences on every page request
export const dynamic = "force-dynamic";

const AllExperiencesWrapper = () => {
  const [allExperiences, setAllExperiences] = useState<ExperienceItem[]>([]);
  const [activeItem, setActiveItem] = useState<ExperienceItem | undefined>(
    undefined,
  );
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    const getExperiences = async () => {
      const data = await fetchExperiences();
      setAllExperiences(data);
      setLoading(false);
    };

    getExperiences();
  }, [loading]);

  if (loading) {
    return (
      <div className='mx-auto'>
        <LoadingIndicator className='w-16 h-16' />
      </div>
    );
  }

  return (
    <section className='w-full'>
      <div className='grid grid-cols-3 gap-y-6'>
        {allExperiences.map((item) => (
          <ExistingExperienceCard
            data={item}
            loading={loading}
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
        <DialogContent className='min-w-[90%]'>
          <DialogTitle className='text-2xl font-normal'>
            <span className='font-main font-bold'>
              &lsquo;{activeItem?.title}&rsquo;
            </span>{" "}
            Experience
          </DialogTitle>
          <DialogDescription>
            Edit the data to update this experience
          </DialogDescription>
          <ExistingExperienceForm
            existingExperience={activeItem!}
            closePopUp={() => setIsFormOpen(false)}
            refreshAll={() => setLoading(true)}
          />
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default AllExperiencesWrapper;
