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
import { referralOptions, services } from "@/utils/services";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { NewMessage } from "@/utils/types";
import { sendBatchEmails } from "@/utils/sendBatchEmails";
import { toast } from "sonner";

const contactSchema = yup.object({
  name: yup.string().required("Please enter your name"),
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Please enter your email"),
  service: yup.string().required("Please select a service"),
  referral: yup.string().required("Please select a type"),
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
    reset,
  } = form;
  const selectedService = watch("service");
  const selectedReferral = watch("referral");

  const onSubmit = async (data: NewMessage) => {
    try {
      const response = await sendBatchEmails(data);
      toast.success(<p className='text-sm'>{response?.message}</p>, {
        description: response?.description,
      });
      reset();
      clearErrors();
    } catch (error) {
      toast.error(<p className='text-sm'>Oh no!</p>, {
        description:
          error instanceof Error ? error.message : "An unknown error occurred.",
      });
    }
  };

  return (
    <main className='xl:p-32 pt-38 pb-12 px-7'>
      <section className='grid lg:grid-cols-2 grid-cols-1 gap-4 w-full'>
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
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='h-fit lg:w-xl w-full'
          >
            <div className='flex flex-col p-8 bg-main-foreground rounded-4xl text-lg mt-20'>
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
                  className='bg-main-bg lg:mt-3 mt-5 placeholder:font-script placeholder:text-xl text-black'
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
                  <SelectTrigger className='w-full lg:mt-3 mt-5 bg-main-bg data-[placeholder]:font-script data-[placeholder]:text-xl text-black'>
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
                <Select
                  value={selectedReferral ?? ""}
                  onValueChange={(value) => {
                    setValue("referral", value);
                    clearErrors("referral");
                  }}
                >
                  <SelectTrigger className='w-full lg:mt-3 mt-5 bg-main-bg data-[placeholder]:font-script data-[placeholder]:text-xl text-black'>
                    <SelectValue
                      className='text-black'
                      placeholder='How did you hear about us?'
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel className='font-script text-xl'>
                        Options
                      </SelectLabel>
                      {referralOptions.map((opt, idx) => (
                        <SelectItem
                          value={opt}
                          key={idx}
                        >
                          {opt}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {errors.referral && (
                  <p className='font-bold text-destructive'>
                    {errors.referral.message}
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
