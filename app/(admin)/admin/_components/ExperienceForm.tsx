"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { createNewExperience, getFlyerUrl } from "@/utils/clientActions";
import { ExperienceItem } from "@/utils/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { format } from "date-fns";
import { Info } from "lucide-react";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as yup from "yup";

type ExperienceFormProps = {
  mode: "add" | "edit";
  data?: ExperienceItem;
};

const newExperienceSchema = yup.object({
  title: yup.string().required("Please enter title"),
  date: yup.date().required("Please enter date of experience"),
  location: yup.string().required("Please enter a location"),
  description: yup.string().required("Please enter a description"),
  linkToRsvp: yup.string().required("Please enter the url to RSVP"),
  upcoming: yup.string().required("Please select 'Yes' or 'No'"),
  flyer: yup.mixed().test("required", "Please upload a flyer", (value) => {
    return value && value instanceof File;
  }),
  storageFolder: yup.string().required("Please enter storage bucket name"),
});

const ExperienceForm = ({ mode, data }: ExperienceFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    reset,
  } = useForm({
    resolver: yupResolver(newExperienceSchema),
  });

  type FormData = yup.InferType<typeof newExperienceSchema>;

  const defaultUpcomingValue = data?.upcoming
    ? (data.upcoming as unknown as string)
    : undefined;

  const handleNewExperienceFormSubmit = async (data: FormData) => {
    try {
      // 1. upload image to storage and get url
      const flyerUrl = await getFlyerUrl(
        data.flyer as File,
        data.storageFolder,
      );

      // 2. create ExperienceItem object (transform data.upcoming to boolean)
      const { title, location, date, description, linkToRsvp, storageFolder } =
        data;
      const upcoming = data.upcoming === "true";
      const newExperienceItem: ExperienceItem = {
        title,
        location,
        date,
        upcoming,
        upcomingDescription: upcoming ? description : "",
        description: !upcoming ? description : "",
        linkToRsvp,
        flyerUrl,
        storageFolder,
      };

      // 3. call create experience api
      const message = await createNewExperience(newExperienceItem);
      console.log(message);
      // 4. send toast message
      toast.success(<p className='text-lg'>{message}</p>);
      // 5. reset form
      reset();
    } catch (error) {
      console.log(error);
      const errorMessage =
        error instanceof Error ? error.message : "An error occured";
      toast.error(<p className='text-lg'>{errorMessage}</p>);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleNewExperienceFormSubmit)}
      className='w-full'
    >
      <div className='grid grid-rows-1 grid-cols-3 gap-8'>
        <div className='flex flex-1 flex-col gap-2'>
          <Label className='text-[1rem]'>Title</Label>
          <Input
            data-invalid
            className='rounded-md text-dark-green text-[1rem] font-semibold '
            type='text'
            {...register("title")}
          />
          {errors.title && (
            <p className='text-sm text-destructive'>{errors.title.message}</p>
          )}
        </div>
        <div className='flex flex-1 flex-col gap-2'>
          <Label className='text-[1rem]'>Location</Label>
          <Input
            data-invalid
            className='rounded-md text-dark-green text-[1rem] font-semibold'
            type='text'
            {...register("location")}
          />
          {errors.location && (
            <p className='text-sm text-destructive'>
              {errors.location.message}
            </p>
          )}
        </div>
        <div className='flex flex-1 flex-col gap-2'>
          <Label className='text-[1rem]'>Date</Label>
          <Controller
            control={control}
            name='date'
            render={({ field }) => (
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant='outline'
                    data-empty={!field.value}
                    className='data-[empty=true]:text-muted-foreground w-2/3 justify-between text-left font-semibold text-dark-green h-12'
                  >
                    {field.value ? (
                      format(field.value, "PPP")
                    ) : (
                      <span>Select a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className='w-auto p-0'
                  align='start'
                >
                  <Calendar
                    mode='single'
                    selected={field.value}
                    onSelect={field.onChange}
                    defaultMonth={field.value}
                  />
                </PopoverContent>
              </Popover>
            )}
          />
          {errors.date && (
            <p className='text-sm text-destructive'>{errors.date.message}</p>
          )}
        </div>
      </div>
      <div className='grid grid-rows-1 grid-cols-3 mt-6 gap-8'>
        <div className='flex flex-col gap-2'>
          <Label className='text-[1rem]'>Is This Event Upcoming?</Label>
          <Controller
            control={control}
            name='upcoming'
            render={({ field }) => (
              <RadioGroup
                className='w-fit'
                defaultValue={defaultUpcomingValue}
                onValueChange={field.onChange}
                value={field.value}
              >
                <div className='flex items-center gap-4'>
                  <RadioGroupItem
                    value='true'
                    id='option-one'
                    className='text-dark-green'
                  />
                  <Label htmlFor='option-one'>Yes</Label>
                </div>
                <div className='flex items-center gap-4'>
                  <RadioGroupItem
                    value='false'
                    id='option-two'
                  />

                  <Label htmlFor='option-two'>No</Label>
                </div>
              </RadioGroup>
            )}
          />
          {errors.upcoming && (
            <p className='text-sm text-destructive'>
              {errors.upcoming.message}
            </p>
          )}
        </div>
        <div className='flex flex-1 flex-col gap-2'>
          <Label className='text-[1rem]'>Description</Label>
          <Textarea
            className='rounded-md text-dark-green text-[1rem] font-semibold'
            {...register("description")}
          />
          {errors.description && (
            <p className='text-sm text-destructive'>
              {errors.description.message}
            </p>
          )}
        </div>
      </div>
      {mode === "add" && (
        <div className='grid grid-rows-1 grid-cols-3 mt-6 gap-8'>
          <div className='flex flex-1 flex-col gap-2'>
            <Label className='text-[1rem]'>Upload Flyer</Label>
            <Input
              type='file'
              accept='image/*'
              className='w-fit text-center rounded-md text-dark-green'
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setValue("flyer", file);
                }
              }}
            />
            {errors.flyer && (
              <p className='text-sm text-destructive'>{errors.flyer.message}</p>
            )}
          </div>
          <div className='flex flex-1 flex-col gap-2'>
            <Label className='text-[1rem]'>Link to RSVP</Label>
            <Input
              className='rounded-md text-dark-green text-[1rem] font-semibold w-3/4'
              type='text'
              {...register("linkToRsvp")}
            />
            {errors.linkToRsvp && (
              <p className='text-sm text-destructive'>
                {errors.linkToRsvp.message}
              </p>
            )}
          </div>
          <div className='flex flex-1 flex-col gap-2'>
            <div className='flex items-center gap-2'>
              <Label className='text-[1rem]'>DB Document Name</Label>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info
                    size={16}
                    className='text-neutral-500'
                  />
                </TooltipTrigger>
                <TooltipContent className='bg-neutral-200 border border-neutral-600'>
                  <p className='text-sm text-neutral-700'>
                    Important! Use dashes (-) for spaces. Do not use any other
                    symbols (&,$,*,%, etc.). <br />
                    Make sure the name is all lowercase. Example:
                    brushes-balance, hue-you-friendsgiving
                  </p>
                </TooltipContent>
              </Tooltip>
            </div>
            <Input
              className='rounded-md text-dark-green text-[1rem] font-semibold'
              type='text'
              {...register("storageFolder")}
            />
          </div>
        </div>
      )}
      <Button
        type='submit'
        className='mt-8 cursor-pointer'
      >
        Add
      </Button>
    </form>
  );
};

export default ExperienceForm;
