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
import { ExperienceItem } from "@/utils/types";
import { format } from "date-fns";
import React from "react";

type ExistingExperienceFormProps = {
  data: ExperienceItem;
};

const ExistingExperienceForm = ({ data }: ExistingExperienceFormProps) => {
  const { title, location, date, description, upcoming, upcomingDescription } =
    data;
  const defaultUpcoming = upcoming ? "true" : "false";

  return (
    <form action=''>
      <div className='grid grid-rows-1 grid-cols-3 gap-8'>
        <div className='flex flex-1 flex-col gap-2'>
          <Label className='text-[1rem]'>Title</Label>
          <Input
            className='rounded-md text-dark-green text-[1rem] font-semibold cursor-not-allowed'
            type='text'
            defaultValue={title}
            disabled
          />
        </div>
        <div className='flex flex-1 flex-col gap-2'>
          <Label className='text-[1rem]'>Location</Label>
          <Input
            className='rounded-md text-dark-green text-[1rem] font-semibold cursor-not-allowed'
            type='text'
            defaultValue={location}
            disabled
          />
        </div>
        <div className='flex flex-1 flex-col gap-2'>
          <Label className='text-[1rem]'>Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant='outline'
                className='data-[empty=true]:text-muted-foreground w-2/3 justify-between text-left font-semibold text-dark-green h-12'
              >
                {date ? format(date, "PPP") : <span>Select a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className='w-auto p-0'
              align='start'
            >
              <Calendar mode='single' />
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <div className='grid grid-rows-1 grid-cols-3 gap-8 mt-6'>
        <div className='flex flex-col gap-2'>
          <Label className='text-[1rem]'>Is This Event Upcoming?</Label>

          <RadioGroup
            className='w-fit'
            // onValueChange={field.onChange}
            defaultChecked
            value={defaultUpcoming}
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
        </div>
        <div className='flex flex-1 flex-col gap-2'>
          <Label className='text-[1rem]'>Upcoming Description</Label>
          <Textarea
            className='rounded-md text-dark-green text-[1rem] font-semibold'
            defaultValue={upcomingDescription}
          />
        </div>
        <div className='flex flex-1 flex-col gap-2'>
          <Label className='text-[1rem]'>Past Description</Label>
          <Textarea
            className='rounded-md text-dark-green text-[1rem] font-semibold'
            defaultValue={description}
          />
        </div>
      </div>
      <div className='grid grid-rows-1 grid-cols-3 gap-8 mt-6'>
        <div className='flex flex-1 flex-col gap-2'>
          <Label className='text-[1rem]'>Upload Flyer</Label>
          <Input
            type='file'
            accept='image/*'
            className='w-fit text-center rounded-md text-dark-green'
            // onChange={(e) => {
            //   const file = e.target.files?.[0];
            //   if (file) {
            //     setValue("flyer", file);
            //   }
            // }}
          />
        </div>
        <div className='flex flex-1 flex-col gap-2'>
          <Label className='text-[1rem]'>Upload Photos</Label>
          <Input
            type='file'
            accept='image/*'
            multiple
            className='w-fit text-center rounded-md text-dark-green'
            // onChange={(e) => {
            //   const files = e.target.files;
            //   if (files && files.length > 0) {
            //     setValue("images", files);
            //   }
            // }}
          />
        </div>
      </div>
      <Button
        type='submit'
        className='mt-8 cursor-pointer'
      >
        Add
      </Button>
    </form>
  );
};

export default ExistingExperienceForm;
