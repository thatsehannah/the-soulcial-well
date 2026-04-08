import React from "react";
import { coreValues } from "../_data/coreValues";
import CoreValue from "../_components/CoreValue";

const SoulcialWellCoreValues = () => {
  return (
    <section className='px-12 pt-16 pb-16'>
      <p className='text-5xl lg:text-6xl text-center text-primary'>
        Our Core <span className='font-script'>Values</span>
      </p>
      <p className='mt-6 text-center text-xl'>
        Everything we do is rooted in these six values. They show up in every
        experience, every conversation, and every space we create.
      </p>
      <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 lg:gap-12 xl:gap-4 xl:mt-8 mt-4'>
        {coreValues.map((value, idx) => {
          const { title, imageSrc, text } = value;

          return (
            <CoreValue
              key={idx}
              title={title}
              imageSrc={imageSrc}
              text={text}
            />
          );
        })}
      </div>
    </section>
  );
};

export default SoulcialWellCoreValues;
