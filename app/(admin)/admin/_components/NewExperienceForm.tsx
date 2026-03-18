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
import {
  createNewExperience,
  getFlyerUrl,
  uploadFilesInBatches,
} from "@/utils/clientActions";
import { checkIfStorageFolderExists } from "@/utils/serverActions";
import { ExperienceItem } from "@/utils/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { format, isAfter, isBefore } from "date-fns";
import { Info } from "lucide-react";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as yup from "yup";

const newExperienceSchema = yup.object({
  title: yup.string().required("Please enter title"),
  date: yup
    .date()
    .required("Please enter date of experience")
    .when("upcoming", {
      is: "false",
      then: (schema) =>
        schema.test(
          "required",
          "You marked this event as past, but the date selected is in the future.",
          (value) => {
            if (isAfter(value, new Date())) return false;

            return true;
          },
        ),
    })
    .when("upcoming", {
      is: "true",
      then: (schema) =>
        schema.test(
          "required",
          "You marked this event as upcoming, but the date selected is before today.",
          (value) => {
            if (isBefore(value, new Date())) return false;

            return true;
          },
        ),
    }),
  location: yup.string().required("Please enter a location"),
  upcoming: yup.string().required("Please select 'Yes' or 'No'"),
  description: yup.string().required("Please enter a description"),
  storageFolder: yup
    .string()
    .required("Please enter the name of your choice")
    .test("required", "This ID already exists.", async (value) => {
      const folderExist = await checkIfStorageFolderExists(value);
      if (folderExist) {
        return false;
      }

      return true;
    }),
  flyer: yup.mixed().when("upcoming", {
    is: "true",
    then: (schema) =>
      schema.test("required", "Please upload a flyer", (value) => {
        return value && value instanceof File;
      }),
    otherwise: (schema) => schema.notRequired(),
  }),
  linkToRsvp: yup.string().when("upcoming", {
    is: "true",
    then: (schema) => schema.required("Please enter the url to RSVP"),
    otherwise: (schema) => schema.notRequired(),
  }),
  images: yup.mixed().when("upcoming", {
    is: "false",
    then: (schema) =>
      schema.test(
        "required",
        "Please select the photos from your event",
        (value) => {
          if (!value) return false;

          if (value instanceof FileList) {
            return value.length > 0;
          }

          return false;
        },
      ),
    otherwise: (schema) => schema.notRequired(),
  }),
});

type FormInput = yup.InferType<typeof newExperienceSchema>;

const NewExperienceForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
    setValue,
    reset,
    watch,
    clearErrors,
  } = useForm({
    resolver: yupResolver(newExperienceSchema),
    mode: "onSubmit",
    defaultValues: {
      upcoming: "",
      flyer: undefined,
      images: undefined,
    },
  });

  const upcomingValue = watch("upcoming");

  const handleFormSubmit = async (data: FormInput) => {
    if (data.upcoming === "true") {
      submitUpcomingExperience(data);
    } else {
      submitPastExperience(data);
    }
  };

  const submitUpcomingExperience = async (data: FormInput) => {
    try {
      const {
        title,
        location,
        date,
        description,
        linkToRsvp,
        storageFolder,
        upcoming,
        flyer,
      } = data;

      const gfuResult = await getFlyerUrl(flyer as File, storageFolder!);
      const flyerUrl = gfuResult.data;

      const newUpcomingExperienceItem: ExperienceItem = {
        title,
        location,
        date,
        upcoming: upcoming === "true",
        upcomingDescription: description,
        description: "",
        linkToRsvp,
        flyerUrl,
        storageFolder,
      };

      const cneResult = await createNewExperience(newUpcomingExperienceItem);
      toast.success(<p className='text-sm'>{cneResult.successMessage}</p>);
      reset();
    } catch (error) {
      console.log(error);
      const errorMessage =
        error instanceof Error ? error.message : "An error occured";
      toast.error(<p className='text-sm'>{errorMessage}</p>);
    }
  };

  const submitPastExperience = async (data: FormInput) => {
    try {
      const {
        title,
        location,
        date,
        description,
        storageFolder,
        images,
        upcoming,
      } = data;

      // type assertions (as) are compile-time only. They don't change the actual value
      // const imagesToUpload = images as unknown as File[];
      const imagesToUpload = Array.from(images as FileList);

      await uploadFilesInBatches(imagesToUpload, storageFolder);

      const newPastExperienceItem: ExperienceItem = {
        title,
        location,
        date,
        upcoming: upcoming === "true",
        upcomingDescription: "",
        description: description,
        linkToRsvp: "",
        flyerUrl: "",
        storageFolder,
      };

      const result = await createNewExperience(newPastExperienceItem);
      toast.success(<p className='text-sm'>{result.successMessage}</p>);
      reset();
    } catch (error) {
      console.log(error);
      const errorMessage =
        error instanceof Error ? error.message : "An error occured";
      toast.error(<p className='text-sm'>{errorMessage}</p>);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className='w-full'
    >
      <div className='mb-6'>
        <div className='flex flex-col gap-2'>
          <Label
            className='text-[1rem]'
            htmlFor='upcoming'
          >
            Is This Event Upcoming?
          </Label>
          <Controller
            control={control}
            name='upcoming'
            render={({ field }) => (
              <RadioGroup
                className='w-fit'
                onValueChange={field.onChange}
                value={field.value}
                id='upcoming'
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
      </div>
      {upcomingValue !== "" && (
        <div>
          <div className='grid grid-rows-1 grid-cols-3 gap-8'>
            <div className='flex flex-1 flex-col gap-2'>
              <Label
                className='text-[1rem]'
                htmlFor='title'
              >
                Title
              </Label>
              <Input
                data-invalid
                className='rounded-md text-dark-green text-[1rem] font-semibold '
                type='text'
                id='title'
                {...register("title")}
              />
              {errors.title && (
                <p className='text-sm text-destructive'>
                  {errors.title.message}
                </p>
              )}
            </div>
            <div className='flex flex-1 flex-col gap-2'>
              <Label
                className='text-[1rem]'
                htmlFor='location'
              >
                Location
              </Label>
              <Input
                data-invalid
                className='rounded-md text-dark-green text-[1rem] font-semibold'
                type='text'
                id='location'
                {...register("location")}
              />
              {errors.location && (
                <p className='text-sm text-destructive'>
                  {errors.location.message}
                </p>
              )}
            </div>
            <div className='flex flex-1 flex-col gap-2'>
              <Label
                className='text-[1rem]'
                htmlFor='date'
              >
                Date
              </Label>
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
                        id='date'
                      />
                    </PopoverContent>
                  </Popover>
                )}
              />
              {errors.date && (
                <p className='text-sm text-destructive'>
                  {errors.date.message}
                </p>
              )}
            </div>
          </div>
          <div className='grid grid-rows-1 grid-cols-3 mt-16 gap-8'>
            <div className='flex flex-1 flex-col gap-2'>
              <Label
                className='text-[1rem]'
                htmlFor='description'
              >
                Description
              </Label>
              <Textarea
                className='rounded-md text-dark-green text-[1rem] font-semibold'
                id='description'
                {...register("description")}
              />
              {errors.description && (
                <p className='text-sm text-destructive'>
                  {errors.description.message}
                </p>
              )}
            </div>
            <div className='flex flex-1 flex-col gap-8'>
              <div className='flex flex-1 flex-col gap-2'>
                <div className='flex items-center gap-2'>
                  <Label
                    className='text-[1rem]'
                    htmlFor='storageFolder'
                  >
                    Experience ID
                  </Label>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info
                        size={16}
                        className='text-neutral-500'
                      />
                    </TooltipTrigger>
                    <TooltipContent className='bg-neutral-200 border border-neutral-600'>
                      <p className='text-sm text-neutral-700'>
                        Important! Use dashes (-) for spaces. Do not use any
                        other symbols (&,$,*,%, etc.). <br />
                        Make sure the name is all lowercase. Example:
                        brushes-balance, hue-you-friendsgiving
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <Input
                  className='rounded-md text-dark-green text-[1rem] font-semibold'
                  type='text'
                  id='storageFolder'
                  {...register("storageFolder")}
                />
                {errors.storageFolder && (
                  <p className='text-sm text-destructive'>
                    {errors.storageFolder.message}
                  </p>
                )}
              </div>
              {upcomingValue === "true" && (
                <div className='flex flex-1 flex-col gap-2'>
                  <Label
                    className='text-[1rem]'
                    htmlFor='linkToRsvp'
                  >
                    Link to RSVP
                  </Label>
                  <Input
                    className='rounded-md text-dark-green text-[1rem] font-semibold w-3/4'
                    type='text'
                    id='linkToRsvp'
                    {...register("linkToRsvp")}
                  />
                  {errors.linkToRsvp && (
                    <p className='text-sm text-destructive'>
                      {errors.linkToRsvp.message}
                    </p>
                  )}
                </div>
              )}
            </div>
            {upcomingValue === "true" && (
              <div className='grid grid-rows-1 grid-cols-3 gap-8'>
                <div className='flex flex-1 flex-col gap-2'>
                  <Label
                    className='text-[1rem]'
                    htmlFor='flyer'
                  >
                    Upload Flyer
                  </Label>
                  <Input
                    type='file'
                    accept='image/*'
                    className='w-fit text-center rounded-md text-dark-green'
                    id='flyer'
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setValue("flyer", file);
                        clearErrors("flyer");
                      }
                    }}
                  />
                  {errors.flyer && (
                    <p className='text-sm text-destructive'>
                      {errors.flyer.message}
                    </p>
                  )}
                </div>
              </div>
            )}
            {upcomingValue === "false" && (
              <div className='flex flex-1 flex-col gap-2'>
                <Label
                  className='text-[1rem]'
                  htmlFor='images'
                >
                  Upload Images From Event
                </Label>
                <Input
                  type='file'
                  accept='image/*,video/*'
                  multiple
                  className='w-fit text-center rounded-md text-dark-green'
                  id='images'
                  onChange={(e) => {
                    const files = e.target.files;
                    if (files && files.length > 0) {
                      setValue("images", files);
                      clearErrors("images");
                    }
                  }}
                />
                {errors.images && (
                  <p className='text-sm text-destructive'>
                    {errors.images.message}
                  </p>
                )}
              </div>
            )}
          </div>

          <Button
            type='submit'
            className='mt-8 cursor-pointer'
            disabled={isSubmitting}
          >
            Add
          </Button>
        </div>
      )}
    </form>
  );
};

export default NewExperienceForm;
