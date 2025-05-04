import SvgFacebook from "@/components/Facebook";
import SvgInstagram from "@/components/Instagram";
import SvgX from "@/components/X";
import { TeamMemberInfo } from "@/utils/types";
import { Mail } from "lucide-react";
import Image from "next/image";

type TeamMemberProps = TeamMemberInfo;

const TeamMember = ({
  aboutMeSubtitle,
  imageSrc,
  honorific,
  firstName,
  lastName,
  title,
  bio,
  recentEducation,
}: TeamMemberProps) => {
  const splitBio = bio.split("\n");

  return (
    <article className='border-b-2 border-white'>
      <div className='grid lg:grid-cols-3 grid-cols-1'>
        <div className='bg-primary flex flex-col justify-center p-8'>
          <div className='overflow-hidden mb-4'>
            <Image
              src={imageSrc}
              alt='leadership member photo'
              height={400}
              width={400}
              className='object-cover'
            />
          </div>
          <div className='mb-6'>
            <p className='text-2xl'>
              <span className='font-bold text-[28px]'>{honorific}</span>{" "}
              <span className='font-script text-[34px]'>{firstName}</span>{" "}
              {lastName}
            </p>
            <p className='text-[18px]'>{title}</p>
          </div>
          <hr className='text-white' />
          <div className='mt-12 ml-6 flex flex-col gap-2'>
            <p className='text-[12px]'>Connect with me</p>
            <div className='flex gap-4'>
              <Mail className='h-4 w-4' />
              <SvgInstagram className='h-4 w-4 stroke-main-foreground fill-main-foreground' />
              <SvgX className='h-4 w-4 stroke-main-foreground fill-main-foreground' />
              <SvgFacebook className='h-4 w-4 stroke-main-foreground fill-main-foreground' />
            </div>
          </div>
        </div>
        <div className='flex flex-col gap-2 p-8 lg:col-span-2'>
          <p className='font-script text-5xl'>About Me</p>
          <p className='font-bold text-[1rem]'>{aboutMeSubtitle}</p>
          <div className='flex flex-col gap-4 w-3/4'>
            {splitBio.map((line, idx) => {
              return (
                <p
                  key={idx}
                  className='text-lg'
                >
                  {line}
                </p>
              );
            })}
          </div>
          <div className='mt-8'>
            <hr className='text-dark-green w-2/3 mb-4' />
            <p className='font-bold'>Education</p>
            <div className='flex gap-12 mt-4'>
              <p>{recentEducation.year}</p>
              <div className='flex flex-col gap-2 mr-12'>
                <p className='font-bold'>{recentEducation.degree}</p>
                <p>{recentEducation.school}</p>
              </div>
              <div className='flex bg-dark-green justify-center items-center text-white w-55'>
                Resume
              </div>
            </div>
            <hr className='text-dark-green w-2/3 mt-4' />
          </div>
        </div>
      </div>
    </article>
  );
};

export default TeamMember;
