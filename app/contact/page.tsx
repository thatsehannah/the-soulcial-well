import Image from "next/image";
import React from "react";

const Contact = () => {
  return (
    <main>
      <section className='grid lg:grid-cols-2 grid-cols-1 gap-2 w-full lg:p-32 p-16'>
        <div className='flex justify-center items-center lg:p-8 relative'>
          <div>
            <Image
              src='/assets/contact.svg'
              alt='contact image'
              height={600}
              width={600}
            />
          </div>
        </div>
        <div className='flex flex-col justify-center items-center p-8'>
          <p className='text-4xl lg:text-7xl text-center mb-6 text-primary'>
            Contact Us
          </p>
          <div className='flex flex-col gap-2 text-center text-lg font-bold'>
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

export default Contact;
