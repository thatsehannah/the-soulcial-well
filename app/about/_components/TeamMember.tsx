import { TeamMemberInfo } from "@/utils/types";
import Image from "next/image";

type TeamMemberProps = {
  member: TeamMemberInfo;
  index: number;
};

const TeamMember = ({ member, index }: TeamMemberProps) => {
  const isEvenSection = index % 2 === 0;
  const fontColor = isEvenSection ? "main-foreground" : "white";
  const backgroundColor = isEvenSection ? "bg-primary" : "bg-dark-green";

  const {
    imageSrc,
    honorific,
    firstName,
    lastName,
    title,
    aboutMeSubtitle,
    bio,
  } = member;

  return (
    <article>
      <div className='grid lg:grid-cols-3 grid-cols-1'>
        <div className={`${backgroundColor} flex flex-col justify-center p-8`}>
          <div className='overflow-hidden mb-9 flex justify-center'>
            <Image
              src={imageSrc}
              alt='leadership member photo'
              height={395}
              width={395}
              className='object-cover'
              quality={100}
              sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            />
          </div>
          <div className='mb-6 text-center'>
            <p className={`text-2xl text-${fontColor}`}>
              <span className='font-bold'>{honorific}</span>{" "}
              <span className='font-script text-5xl'>{firstName}</span>{" "}
              {lastName}
            </p>
            <p className={`text-xl text-${fontColor}`}>{title}</p>
          </div>
          <hr className={`bg-${fontColor} h-[1px] lg:h-0 border-0`} />
          {/* <div className='mt-12 ml-6 flex flex-col gap-2'>
            <p className={`text-lg text-${fontColor}`}>Connect with me</p>
            <div className={`flex gap-4 fill-${fontColor} stroke-${fontColor}`}>
              <Mail className={`text-${fontColor}`} />
            </div>
          </div> */}
        </div>
        <div
          className={`flex flex-col gap-2 p-8 lg:col-span-2 justify-center lg:bg-main-bg ${backgroundColor}`}
        >
          <p
            className={`font-bold text-2xl xl:text-primary-foreground text-${fontColor} mb-6`}
          >
            {aboutMeSubtitle}
          </p>
          <div className='flex flex-col gap-4 xl:w-3/4 w-full pb-12'>
            <p
              className={`text-xl whitespace-pre-wrap lg:text-primary-foreground text-${fontColor}`}
            >
              {bio}
            </p>
          </div>
          {/* <div className='mt-8'>
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
          </div> */}
        </div>
      </div>
    </article>
  );
};

export default TeamMember;
