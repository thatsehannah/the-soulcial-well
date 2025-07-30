import TeamMember from "../_components/TeamMember";
import { teamMemberInfo } from "../_data/teamMembers";

const SoulcialWellTeam = () => {
  return (
    <main>
      <p className='text-4xl lg:text-6xl text-center mb-4'>
        Meet <span className='font-script'>The Team</span>
      </p>
      {teamMemberInfo.map((member, idx) => {
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
          <TeamMember
            key={idx}
            imageSrc={imageSrc}
            honorific={honorific}
            firstName={firstName}
            lastName={lastName}
            title={title}
            connections={connections}
            aboutMeSubtitle={aboutMeSubtitle}
            recentEducation={recentEducation}
            bio={bio}
          />
        );
      })}
    </main>
  );
};

export default SoulcialWellTeam;
