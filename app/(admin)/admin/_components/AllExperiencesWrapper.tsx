"use client";

import { fetchExperiences } from "@/utils/clientActions";
import { ExperienceItem } from "@/utils/types";
import React, { useEffect, useState } from "react";
import ExistingExperienceCard from "./ExistingExperienceCard";

const AllExperiencesWrapper = () => {
  const [allExperiences, setAllExperiences] = useState<ExperienceItem[]>([]);
  const [activeItem, setActiveItem] = useState<ExperienceItem | undefined>(
    undefined,
  );

  useEffect(() => {
    const getExperiences = async () => {
      const data = await fetchExperiences();
      console.log(data);
      setAllExperiences(data);
    };

    getExperiences();
  }, []);

  return (
    <div>
      <p>Currently Active Item: {activeItem?.title}</p>
      <div className='grid grid-cols-4 gap-8'>
        {allExperiences.map((item) => (
          <ExistingExperienceCard
            data={item}
            onClick={() => setActiveItem(item)}
            key={item.storageFolder!}
          />
        ))}
      </div>
    </div>
  );
};

export default AllExperiencesWrapper;
