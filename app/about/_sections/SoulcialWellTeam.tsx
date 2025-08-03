import TeamMember from "../_components/TeamMember";
import { teamMemberInfo } from "../_data/teamMembers";

const SoulcialWellTeam = () => {
  return (
    <main>
      <p className='text-5xl lg:text-6xl text-center mb-4'>
        Meet <span className='font-script'>The Team</span>
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
    </main>
  );
};

export default SoulcialWellTeam;
