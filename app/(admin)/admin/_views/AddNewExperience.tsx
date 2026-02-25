import React from "react";
import ExperienceForm from "../_components/ExperienceForm";

const AddNewExperience = () => {
  return (
    <main className='mt-24 flex-1'>
      <div className='flex flex-col'>
        <h1 className='text-4xl font-bold'>Add A New Experience</h1>
        <div className='flex mt-8'>
          <ExperienceForm mode='add' />
        </div>
      </div>
    </main>
  );
};

export default AddNewExperience;
