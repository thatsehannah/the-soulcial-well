import React from "react";
import SoulcialWellOverview from "./_sections/SoulcialWellOverview";
import SoulcialWellOrigins from "./_sections/SoulciallWellOrigins";
import SoulcialWellTeam from "./_sections/SoulcialWellTeam";
import SoulcialWellPurpose from "./_sections/SoulcialWellPurpose";
import SoulcialWellCoreValues from "./_sections/SoulcialWellCoreValues";

const About = () => {
  return (
    <main>
      <SoulcialWellOverview />
      <SoulcialWellOrigins />
      <SoulcialWellPurpose />
      <SoulcialWellCoreValues />
      <SoulcialWellTeam />
    </main>
  );
};

export default About;
