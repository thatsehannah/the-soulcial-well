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
import { ExperienceItem } from "@/utils/types";
import { format } from "date-fns";
import React, { useState } from "react";

type ExperienceFormProps = {
  mode: "add" | "edit";
  data?: ExperienceItem;
};

const ExperienceForm = ({ mode, data }: ExperienceFormProps) => {
  const [title, setTitle] = useState(data?.title || "");
  const [date, setDate] = useState<Date | undefined>(data?.date || undefined);
  const [isUpcoming, setIsUpcoming] = useState(
    (data?.upcoming as unknown as string) || "true",
  );

  return (
    <form className='w-full'>
      <div className='flex gap-8'>
        <div className='flex flex-1 flex-col gap-2'>
          <Label className='text-[1rem]'>Title</Label>
          <Input
            className='rounded-md text-dark-green text-[1rem] font-semibold'
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className='flex flex-1 flex-col gap-2'>
          <Label className='text-[1rem]'>Location</Label>
          <Input
            className='rounded-md text-dark-green text-[1rem] font-semibold'
            type='text'
          />
        </div>
        <div className='flex flex-1 flex-col gap-2'>
          <Label className='text-[1rem]'>Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant='outline'
                data-empty={!date}
                className='data-[empty=true]:text-muted-foreground w-2/3 justify-between text-left font-semibold text-dark-green h-12'
              >
                {date ? format(date, "PPP") : <span>Select a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className='w-auto p-0'
              align='start'
            >
              <Calendar
                mode='single'
                selected={date}
                onSelect={setDate}
                defaultMonth={date}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <div className='flex mt-4 gap-8'>
        <div className='flex flex-col gap-2'>
          <Label className='text-[1rem]'>Is This Event Upcoming?</Label>
          <RadioGroup
            defaultValue='comfortable'
            className='w-fit'
            value={isUpcoming}
            onValueChange={setIsUpcoming}
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
          <Label className='text-[1rem]'>Description</Label>
          <Textarea className='rounded-md text-dark-green text-[1rem] font-semibold' />
        </div>
      </div>
    </form>
  );
};

export default ExperienceForm;
