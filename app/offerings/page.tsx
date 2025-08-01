import Navbar from "@/components/Navbar";
import Image from "next/image";
import React from "react";

const OfferingPill = ({ text }: { text: string }) => {
  return (
    <div className='text-center lg:text-xl text-lg lg:p-3 p-2 bg-primary w-96 font-bold rounded-4xl'>
      {text}
    </div>
  );
};

const Offerings = () => {
  const offerings = [
    "Wellness Workshops",
    "Self-Care Events",
    "Community Building Experiences",
    "Specialized Programs",
    "Wellness Consultations",
    "Personalized Coaching",
    "Group Therapy & Support Circles",
  ];

  return (
    <main>
      <Navbar />
      <section className='grid lg:grid-cols-2 grid-cols-1 gap-2 w-full lg:p-32 p-16'>
        <div className='flex flex-col justify-center items-center p-8'>
          <p className='relative text-7xl text-center mb-12 text-main-foreground after:bg-[url("/assets/underline-stroke-brown.svg")] after:absolute after:left-0 lg:after:-bottom-9 after:-bottom-9 after:w-full after:h-13 after:bg-no-repeat after:bg-contain after:bg-center'>
            Offerings
          </p>
          <div className='flex flex-col gap-3 mt-6'>
            {offerings.map((offering, idx) => (
              <OfferingPill
                text={offering}
                key={idx}
              />
            ))}
          </div>
        </div>
        <div>
          <Image
            src='/assets/offerings.svg'
            alt='offerings image'
            height={600}
            width={600}
          />
        </div>
      </section>
    </main>
  );
};

export default Offerings;
