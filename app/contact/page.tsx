"use client";

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
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const contactSchema = yup.object({
  name: yup.string().required("Please enter your name"),
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Please enter your email"),
  service: yup.string().required("Please select a service"),
  message: yup.string().required("Please enter your message"),
});

const Contact = () => {
  const form = useForm({ resolver: yupResolver(contactSchema) });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    clearErrors,
  } = form;
  const selectedService = watch("service");

  const onSubmit = (data: yup.InferType<typeof contactSchema>) => {
    //TODO: hook up render email to send emails
    console.log(data);
    form.reset();
  };

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
          <p className='relative text-5xl lg:text-6xl text-center text-primary after:bg-[url("/assets/underline-stroke-brown.svg")] after:absolute after:left-0 after:-bottom-8 after:w-full after:h-13 after:bg-no-repeat after:bg-contain after:bg-center'>
            Contact <span className='font-script'>Us</span>
          </p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-col p-8 bg-main-foreground rounded-4xl h-fit lg:w-xl w-full text-lg mt-20'>
              <div>
                <Input
                  type='text'
                  placeholder='Name'
                  className='bg-main-bg placeholder:font-script placeholder:text-xl text-black'
                  {...register("name")}
                />
                {errors.name && (
                  <p className='font-bold text-destructive'>
                    {errors.name.message}
                  </p>
                )}
              </div>
              <div>
                <Input
                  type='email'
                  placeholder='Email'
                  className='bg-main-bg mt-3 placeholder:font-script placeholder:text-xl text-black'
                  {...register("email")}
                />
                {errors.email && (
                  <p className='font-bold text-destructive'>
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div>
                <Select
                  value={selectedService ?? ""}
                  onValueChange={(value) => {
                    setValue("service", value);
                    clearErrors("service");
                  }}
                >
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
                {errors.service && (
                  <p className='font-bold text-destructive'>
                    {errors.service.message}
                  </p>
                )}
              </div>
              <div>
                <Textarea
                  className='bg-main-bg mt-15 placeholder:font-script placeholder:text-xl text-black'
                  placeholder='Tell us more...'
                  {...register("message")}
                />
                {errors.message && (
                  <p className='font-bold text-destructive'>
                    {errors.message.message}
                  </p>
                )}
              </div>
              <Button
                type='submit'
                className='mt-4 w-fit'
              >
                Submit
              </Button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
};

export default Contact;
