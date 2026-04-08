import { checkForUpcomingExperiences } from "@/actions/experiences";
import ConvoPopUp from "./_components/ConvoPopUp";
import Hero from "./_sections/Hero";

const Home = async () => {
  const result = await checkForUpcomingExperiences();

  return (
    <main>
      <Hero upcomingEvents={result} />
      <ConvoPopUp />
    </main>
  );
};

export default Home;
