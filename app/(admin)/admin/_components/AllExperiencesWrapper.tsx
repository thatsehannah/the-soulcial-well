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
import LoadingIndicator from "../../../../components/LoadingIndicator";
import { Button } from "@/components/ui/button";

//this will make this page dynamic and fetch for experiences on every page request
export const dynamic = "force-dynamic";

const AllExperiencesWrapper = () => {
  const [allExperiences, setAllExperiences] = useState<ExperienceItem[]>([]);
  const [activeItem, setActiveItem] = useState<ExperienceItem | undefined>(
    undefined,
  );
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [errorFetchingExp, setErrorFetchingExp] = useState("");

  const getExperiences = async () => {
    setLoading(true);
    setErrorFetchingExp("");

    const result = await fetchExperiences();

    if (!result.data && result.errorMessage) {
      setErrorFetchingExp(result.errorMessage);
    }

    if (result.data) {
      setAllExperiences(result.data);
    }

    setLoading(false);
  };

  useEffect(() => {
    getExperiences();
  }, []);

  if (errorFetchingExp.length > 0) {
    return (
      <section className='flex flex-col justify-center items-center gap-1 w-full'>
        <p className='font-bold text-xl'>{errorFetchingExp}</p>
        <Button onClick={getExperiences}>Retry</Button>
      </section>
    );
  }

  if (loading) {
    return (
      <section className='mx-auto'>
        <LoadingIndicator className='w-16 h-16' />
      </section>
    );
  }

  if (allExperiences.length === 0) {
    return (
      <section className='mx-auto'>
        <p className='font-bold text-xl'>No experiences found.</p>
      </section>
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
            refreshAll={getExperiences}
          />
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default AllExperiencesWrapper;
