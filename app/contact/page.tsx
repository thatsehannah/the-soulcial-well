import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { services } from "@/utils/services";
import Image from "next/image";
import React from "react";

const Contact = () => {
  return (
    <main className='xl:p-32 pt-38 pb-12 px-7'>
      <section className='grid lg:grid-cols-2 grid-cols-1 gap-2 w-full'>
        <div className='flex justify-center items-center lg:p-8 relative'>
          <Image
            src='/assets/connect.svg'
            alt='connect image'
            height={600}
            width={600}
            quality={100}
          />
        </div>
        <div className='flex flex-col justify-center items-center p-8'>
          <p className='relative text-5xl lg:text-6xl text-center text-primary after:bg-[url("/assets/underline-stroke-brown.svg")] after:absolute after:left-0 lg:after:-bottom-13 after:-bottom-9 after:w-full after:h-13 after:bg-no-repeat after:bg-contain after:bg-center'>
            Contact <span className='font-script'>Us</span>
          </p>
          <div className='flex flex-col p-8 bg-main-foreground rounded-4xl h-fit lg:w-xl w-full text-lg mt-20'>
            <Input
              type='text'
              placeholder='Name'
              className='bg-main-bg placeholder:font-script placeholder:text-xl text-black'
            />
            <Input
              type='email'
              placeholder='Email'
              className='bg-main-bg mt-3 placeholder:font-script placeholder:text-xl text-black'
            />
            <Select>
              <SelectTrigger className='w-full mt-3 bg-main-bg data-[placeholder]:font-script data-[placeholder]:text-xl text-black'>
                <SelectValue
                  className='text-black'
                  placeholder='Service interested in'
                />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel className='font-script text-xl'>
                    Services
                  </SelectLabel>
                  {services.map((svc, idx) => (
                    <SelectItem
                      value={svc}
                      key={idx}
                    >
                      {svc}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <Textarea
              className='bg-main-bg mt-15 placeholder:font-script placeholder:text-xl text-black'
              placeholder='Tell us more...'
            />
            <Button className='mt-4 w-fit'>Submit</Button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;
