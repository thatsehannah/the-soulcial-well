import TeamMember from "./_components/TeamMember";
import { teamMemberInfo } from "./_data/teamMemberInfo";

const TheTeamPage = () => {
  return (
    <main>
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

export default TheTeamPage;
