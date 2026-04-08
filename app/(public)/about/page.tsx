import React from "react";
import Overview from "./_sections/Overview";
import Origins from "./_sections/Origins";
import Founder from "./_sections/Team";
import Purpose from "./_sections/Purpose";
import CoreValues from "./_sections/CoreValues";

const About = () => {
  return (
    <main>
      <Overview />
      <Origins />
      <Purpose />
      <CoreValues />
      <Founder />
    </main>
  );
};

export default About;
