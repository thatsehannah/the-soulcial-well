import React from "react";
import { coreValues } from "../_data/coreValues";
import CoreValue from "../_components/CoreValue";

const CoreValues = () => {
  return (
    <section className='p-12'>
      <p className='text-4xl lg:text-6xl text-center text-primary'>
        Our Core <span className='font-script'>Values</span>
      </p>
      <p className='mt-6 text-center text-2xl lg:text-3xl'>
        At The Soulcial Well, our core values drive everything we do. They
        reflect our commitment to holistic well-being, personal growth, and
        meaningful connections, ensuring that each experience empowers and
        supports you on your journey.
      </p>
      <div className='grid lg:grid-cols-3 grid-cols-1 gap-4 mt-8'>
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

export default CoreValues;
