import React from "react";
import NewExperienceForm from "../_components/NewExperienceForm";

const AddNewExperience = () => {
  return (
    <main className='mt-24 flex-1'>
      <div className='flex flex-col'>
        <h1 className='text-4xl font-bold mb-2'>Add A New Experience</h1>
        <h3 className='font-light'>
          Add a past or upcoming Soulcial Well experience.
        </h3>
        <div className='flex mt-8'>
          <NewExperienceForm />
        </div>
      </div>
    </main>
  );
};

export default AddNewExperience;
