import TeamMember from "../_components/TeamMember";
import { teamMemberInfo } from "../_data/teamMembers";

// currently, client is the only team member but could possibly grow in the future so the team member language can stay for now
const Team = () => {
  return (
    <section>
      <p className='text-5xl lg:text-6xl text-center mb-4'>
        Meet <span className='font-script'>The Founder</span>
      </p>
      {teamMemberInfo.map((member, idx) => {
        return (
          <TeamMember
            key={idx}
            member={member}
            index={idx}
          />
        );
      })}
    </section>
  );
};

export default Team;
