import React from "react";
import AllExperiencesWrapper from "../_components/AllExperiencesWrapper";

const EditExperiences = () => {
  return (
    <main className='mt-24 flex-1'>
      <div className='flex flex-col'>
        <h1 className='text-4xl font-bold mb-2'>Edit Experiences</h1>
        <h3 className='font-light'>
          Update previous Soulcial Well experiences.
        </h3>
        <div className='flex mt-8'>
          <AllExperiencesWrapper />
        </div>
      </div>
    </main>
  );
};

export default EditExperiences;
