import Image from "next/image";
import React from "react";

const Connect = () => {
  return (
    <main>
      <section className='grid lg:grid-cols-2 grid-cols-1 gap-2 w-full lg:p-32 py-40 px-16'>
        <div className='flex justify-center items-center lg:p-8 relative'>
          <Image
            src='/assets/connect.svg'
            alt='connect image'
            height={600}
            width={600}
          />
        </div>
        <div className='flex flex-col justify-center items-center p-8'>
          <p className='relative text-4xl lg:text-7xl text-center text-primary after:bg-[url("/assets/underline-stroke-brown.svg")] after:absolute after:left-0 lg:after:-bottom-13 after:-bottom-9 after:w-full after:h-13 after:bg-no-repeat after:bg-contain after:bg-center'>
            Connect With Us
          </p>
          <div className='flex flex-col gap-2 text-center text-lg font-bold mt-20'>
            <p>PO Box 568, Anywhere, USA 12345</p>
            <p>Telephone: (123) 456-7890</p>
            <p>Mobile: (123) 456-7890</p>
            <p>Email: thesoulcialwell@gmail.com</p>
          </div>
          <div className='flex flex-col justify-center items-center py-4 bg-main-foreground rounded-xl h-auto w-sm mt-8 text-white text-lg'>
            <p className='text-2xl text-primary font-bold mb-2'>Office Hours</p>
            <p>Monday: 8am - 7pm</p>
            <p>Tuesday: 8am - 5pm</p>
            <p>Wednesday: 8am - 5pm</p>
            <p>Thursday: 8am - 7pm</p>
            <p>Friday: 8am - 5pm</p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Connect;
