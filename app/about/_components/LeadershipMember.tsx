import SvgFacebook from "@/components/Facebook";
import SvgInstagram from "@/components/Instagram";
import SvgX from "@/components/X";
import { Mail } from "lucide-react";
import Image from "next/image";

type LeadershipMemberProps = {
  imageSrc: string;
  honorific?: string;
  firstName: string;
  lastName: string;
  title: string;
  connections: {
    email?: string;
    instagramProfile?: string;
    xProfile?: string;
    facebookProfile?: string;
    linkedinProfile?: string;
  };
  aboutMeSubtitle: string;
  recentEducation: {
    year: string;
    degree: string;
    school: string;
  };
  // linkToResume: string;
  aboutText: string;
};

const LeadershipMember = ({
  aboutMeSubtitle,
  imageSrc,
  honorific,
  firstName,
  lastName,
  title,
  aboutText,
}: LeadershipMemberProps) => {
  return (
    <article>
      <div className='grid lg:grid-cols-3 grid-cols-1 items-center'>
        <div className='bg-primary flex flex-col justify-center p-8'>
          <div className='overflow-hidden'>
            <Image
              src={imageSrc}
              alt='leadership member photo'
              height={400}
              width={400}
              className='object-cover -mb-81'
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
          <div className='mt-12 flex flex-col gap-2'>
            <p className='text-[12px]'>Connect with me</p>
            <div className='flex gap-4'>
              <Mail className='h-4 w-4' />
              <SvgInstagram className='h-4 w-4 stroke-main-foreground fill-main-foreground' />
              <SvgX className='h-4 w-4 stroke-main-foreground fill-main-foreground' />
              <SvgFacebook className='h-4 w-4 stroke-main-foreground fill-main-foreground' />
            </div>
          </div>
        </div>
        <div className='flex flex-col gap-4 p-8 lg:col-span-2'>
          <p className='font-script text-3xl'>About Me</p>
          <p className='font-bold text-[1rem]'>{aboutMeSubtitle}</p>
          <p className='text-[1rem]'>{aboutText}</p>
        </div>
      </div>
    </article>
  );
};

export default LeadershipMember;
