import LeadershipMember from "../_components/LeadershipMember";
import { staffInfo } from "../_data/staffInfo.ts";

const Leadership = () => {
  return (
    <section>
      {staffInfo.map((staff, idx) => {
        const {
          imageSrc,
          honorific,
          firstName,
          lastName,
          title,
          connections,
          aboutMeSubtitle,
          recentEducation,
          aboutText,
        } = staff;

        return (
          <LeadershipMember
            key={idx}
            imageSrc={imageSrc}
            honorific={honorific}
            firstName={firstName}
            lastName={lastName}
            title={title}
            connections={connections}
            aboutMeSubtitle={aboutMeSubtitle}
            recentEducation={recentEducation}
            aboutText={aboutText}
          />
        );
      })}
    </section>
  );
};

export default Leadership;
