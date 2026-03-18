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
  getFlyerUrl,
  updateExperience,
  uploadFilesInBatches,
} from "@/utils/clientActions";
import { ExperienceItem } from "@/utils/types";
import { format } from "date-fns";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

type ExistingExperienceFormProps = {
  existingExperience: ExperienceItem;
  closePopUp: () => void;
  refreshAll: () => void;
};

type EditFormInput = {
  title: string;
  location: string;
  date: Date;
  pastDescription: string;
  upcoming: string;
  upcomingDescription: string;
  flyer: File;
  images: FileList;
};

const ExistingExperienceForm = ({
  existingExperience,
  closePopUp,
  refreshAll,
}: ExistingExperienceFormProps) => {
  const { title, location, date, description, upcoming, upcomingDescription } =
    existingExperience;

  const {
    register,
    formState: { dirtyFields, isDirty },
    setValue,
    handleSubmit,
    control,
  } = useForm<EditFormInput>({
    defaultValues: {
      title,
      location,
      date,
      pastDescription: description,
      upcoming: upcoming ? "true" : "false",
      upcomingDescription,
      flyer: undefined,
      images: undefined,
    },
  });

  const handleFormSubmit = async (formData: EditFormInput) => {
    try {
      const updates: Partial<ExperienceItem> = {};

      //including this in updates for updating correct doc
      updates.storageFolder = existingExperience.storageFolder;

      if (dirtyFields.flyer) {
        const result = await getFlyerUrl(
          formData.flyer,
          existingExperience.storageFolder!,
        );
        updates.flyerUrl = result.data;
      }

      if (dirtyFields.images) {
        const imagesToUpload = Array.from(formData.images);
        await uploadFilesInBatches(
          imagesToUpload,
          existingExperience.storageFolder!,
        );
      }

      if (dirtyFields.date) updates.date = formData.date;
      if (dirtyFields.upcoming) updates.upcoming = formData.upcoming === "true";
      if (dirtyFields.upcomingDescription)
        updates.upcomingDescription = formData.upcomingDescription;
      if (dirtyFields.pastDescription)
        updates.description = formData.pastDescription;

      const result = await updateExperience(updates);
      toast.success(<p className='text-lg'>{result.successMessage}</p>);
      closePopUp();
      refreshAll();
    } catch (error) {
      console.error(error);
      const errorMessage =
        error instanceof Error ? error.message : "An error occured";
      toast.error(<p className='text-lg'>{errorMessage}</p>);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <div className='grid grid-rows-1 grid-cols-3 gap-8'>
        <div className='flex flex-1 flex-col gap-2'>
          <Label
            className='text-[1rem]'
            htmlFor='title'
          >
            Title
          </Label>
          <Input
            className='rounded-md text-dark-green text-[1rem] font-semibold cursor-not-allowed'
            type='text'
            id='title'
            {...register("title")}
            disabled
          />
        </div>
        <div className='flex flex-1 flex-col gap-2'>
          <Label
            className='text-[1rem]'
            htmlFor='location'
          >
            Location
          </Label>
          <Input
            className='rounded-md text-dark-green text-[1rem] font-semibold cursor-not-allowed'
            type='text'
            id='location'
            {...register("location")}
            disabled
          />
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
        </div>
      </div>
      <div className='grid grid-rows-1 grid-cols-3 gap-8 mt-6'>
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
        </div>
        <div className='flex flex-1 flex-col gap-2'>
          <Label
            className='text-[1rem]'
            htmlFor='upcomingDescription'
          >
            Upcoming Description
          </Label>
          <Textarea
            className='rounded-md text-dark-green text-[1rem] font-semibold'
            id='upcomingDescription'
            {...register("upcomingDescription")}
          />
        </div>
        <div className='flex flex-1 flex-col gap-2'>
          <Label
            className='text-[1rem]'
            htmlFor='pastDescription'
          >
            Past Description
          </Label>
          <Textarea
            className='rounded-md text-dark-green text-[1rem] font-semibold'
            id='pastDescription'
            {...register("pastDescription")}
          />
        </div>
      </div>
      <div className='grid grid-rows-1 grid-cols-3 gap-8 mt-6'>
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
                setValue("flyer", file, { shouldDirty: true });
              }
            }}
          />
        </div>
        <div className='flex flex-1 flex-col gap-2'>
          <Label
            className='text-[1rem]'
            htmlFor='images'
          >
            Upload Images From Event
          </Label>
          <Input
            type='file'
            accept='image/*'
            multiple
            className='w-fit text-center rounded-md text-dark-green'
            id='images'
            onChange={(e) => {
              const files = e.target.files;
              if (files && files.length > 0) {
                setValue("images", files, { shouldDirty: true });
              }
            }}
          />
        </div>
      </div>
      <Button
        type='submit'
        className='mt-8 cursor-pointer'
        disabled={!isDirty}
      >
        Add
      </Button>
    </form>
  );
};

export default ExistingExperienceForm;
