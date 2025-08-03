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
        At The Soulcial Well, our core values drive everything we do. They
        reflect our commitment to holistic well-being, personal growth, and
        meaningful connections, ensuring that each experience empowers and
        supports you on your journey.
      </p>
      <div className='grid lg:grid-cols-3 grid-cols-1 gap-4 lg:gap-12 xl:gap-4 xl:mt-8 mt-4'>
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
