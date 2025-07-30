import { TeamMemberInfo } from "@/utils/types";
import { Mail } from "lucide-react";
import Image from "next/image";

type TeamMemberProps = {
  member: TeamMemberInfo;
  index: number;
};

const TeamMember = ({ member, index }: TeamMemberProps) => {
  const isEvenSection = index % 2 === 0;
  const fontColor = isEvenSection ? "main-foreground" : "white";

  const {
    imageSrc,
    honorific,
    firstName,
    lastName,
    title,
    connections,
    aboutMeSubtitle,
    recentEducation,
    bio,
  } = member;

  return (
    <article className='border-b-2 border-white'>
      <div className='grid lg:grid-cols-3 grid-cols-1'>
        <div
          className={`${
            isEvenSection ? "bg-primary" : "bg-dark-green"
          } flex flex-col justify-center p-8`}
        >
          <div className='relative overflow-hidden mb-4 flex justify-center'>
            <Image
              src={imageSrc}
              alt='leadership member photo'
              height={400}
              width={400}
              className='object-cover'
            />
          </div>
          <div className='mb-6 text-center'>
            <p className={`text-2xl text-${fontColor}`}>
              <span className='font-bold text-[28px]'>{honorific}</span>{" "}
              <span className='font-script text-[34px]'>{firstName}</span>{" "}
              {lastName}
            </p>
            <p className={`text-[18px] text-${fontColor}`}>{title}</p>
          </div>
          <hr className='text-white' />
          <div className='mt-12 ml-6 flex flex-col gap-2'>
            <p className={`text-[12px] text-${fontColor}`}>Connect with me</p>
            <div className={`flex gap-4 fill-${fontColor} stroke-${fontColor}`}>
              <Mail className={`text-${fontColor}`} />
            </div>
          </div>
        </div>
        <div className='flex flex-col gap-2 p-8 lg:col-span-2'>
          <p className='font-script text-5xl text-center'>About Me</p>
          <p className='font-bold text-[1rem]'>{aboutMeSubtitle}</p>
          <div className='flex flex-col gap-4 lg:w-3/4 w-full'>
            <p className='text-lg whitespace-pre-wrap'>{bio}</p>
          </div>
          <div className='mt-8'>
            <hr className='text-dark-green lg:w-2/3 w-full mb-4' />
            <p className='font-bold'>Education</p>
            <div className='flex gap-12 mt-4'>
              <p>{recentEducation.year}</p>
              <div className='flex flex-col gap-2 mr-12'>
                <p className='font-bold'>{recentEducation.degree}</p>
                <p>{recentEducation.school}</p>
              </div>
              <div
                className={`flex ${
                  isEvenSection
                    ? "bg-dark-green text-white"
                    : "bg-primary text-main-foreground"
                } justify-center items-center w-55`}
              >
                Resume
              </div>
            </div>
            <hr className='text-dark-green lg:w-2/3 w-full mt-4' />
          </div>
        </div>
      </div>
    </article>
  );
};

export default TeamMember;
