import Image from "next/image";
import React from "react";
import UpcomingExperiences from "./_components/UpcomingExperiences";
import { fetchAllExperiences } from "@/utils/serverActions";
import dynamicComponent from "next/dynamic";
import LoadingIndicator from "@/components/LoadingIndicator";

//this will make this page dynamic and fetch for experiences on every page request
export const dynamic = "force-dynamic";

const Experience = dynamicComponent(() => import("./_components/Experience"), {
  loading: () => <LoadingIndicator />,
});

const ExperiencesPage = async () => {
  const allExperiences = await fetchAllExperiences();

  //getting past experiences
  const pastExperiences = allExperiences.filter(
    (item) => item.upcoming === false && item.description !== "",
  );

  //getting upcoming experiences
  const upcomingExperiences = allExperiences.filter(
    (item) => item.upcoming === true && item.upcomingDescription !== "",
  );

  return (
    <main>
      <section className='flex flex-col justify-center items-center lg:p-32 py-40 px-16 bg-[#f2f4e6]'>
        <p className='md:text-8xl text-7xl text-center font-script'>
          Experiences
        </p>
        <div className='grid grid-cols-1 lg:grid-cols-3 lg:my-8 my-4 items-center lg:gap-22 '>
          <div className='relative mx-auto my-auto lg:h-68 md:h-40 h-45 lg:w-90 md:w-60 w-45'>
            <Image
              src='/assets/experiences.svg'
              alt='camera'
              fill
              quality={100}
            />
          </div>

          <div className='col-span-2 lg:p-12 py-6 grid gap-6'>
            <p className='text-main-foreground lg:text-2xl text-xl text-center lg:text-start'>
              Every Soulcial Well experience is designed with intention. No two
              look exactly the same — we have gathered on the BeltLine, in
              university spaces, at brunches, in open fields, and on national
              conference stages. But underneath every activation is the same
              arc: grounding, experience, reflection, connection, and a takeaway
              that travels home with you.
            </p>
            <p className='text-main-foreground lg:text-2xl text-xl text-center lg:text-start'>
              That consistency is not an accident. It is the Candid Conversation
              framework at work — a mode of storytelling that meets people where
              they are, in whatever setting makes sense, and creates the
              conditions for something real to happen. Every experience gives
              people a way to share who they are, where they come from, and what
              they carry — and to be genuinely received by the people around
              them.
            </p>
            <p className='text-main-foreground lg:text-2xl text-xl text-center lg:text-start'>
              Browse below to see what that looks like across audiences, cities,
              and formats.
            </p>
          </div>
        </div>
      </section>
      {allExperiences.length === 0 && (
        <div className='p-8 text-center'>
          <p className='text-4xl font-bold mb-4'>Oh no!</p>
          <p className='text-[1rem] font-light'>
            This is not normal, and we&apos;re working to get our experiences
            available again for your viewing pleasure.
          </p>
        </div>
      )}
      {upcomingExperiences.length > 0 && (
        <section id='upcoming'>
          <UpcomingExperiences experiences={upcomingExperiences} />
        </section>
      )}

      {pastExperiences.map((exp, index) => (
        <section key={index}>
          <Experience
            item={exp}
            index={index}
          />
        </section>
      ))}
    </main>
  );
};

export default ExperiencesPage;
