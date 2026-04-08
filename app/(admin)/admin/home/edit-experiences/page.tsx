import React from "react";
import EditExperiencesContent from "../../_components/EditExperiencesContent";
import { fetchExperiences } from "@/actions/experiences";

const EditExperiencesView = async () => {
  const experiences = await fetchExperiences();

  return (
    <main className='mt-24 flex-1'>
      <div className='flex flex-col'>
        <h1 className='text-4xl font-bold mb-2'>Edit Experiences</h1>
        <h3 className='font-light'>
          Update previous Soulcial Well experiences.
        </h3>
        <EditExperiencesContent experiences={experiences} />
      </div>
    </main>
  );
};

export default EditExperiencesView;
