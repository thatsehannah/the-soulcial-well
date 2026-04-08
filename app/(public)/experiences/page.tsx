import { ExperienceItem } from "@/utils/types";
import ExperiencesPageContent from "./_components/ExperiencesPageContent";
import { fetchExperiences } from "@/actions/experiences";

const ExperiencesPage = async () => {
  const experiences = await fetchExperiences();

  const pastExperiences = experiences.filter(
    (item: ExperienceItem) =>
      item.upcoming === false && item.description !== "",
  );
  const upcomingExperiences = experiences.filter(
    (item: ExperienceItem) =>
      item.upcoming === true && item.upcomingDescription !== "",
  );

  return (
    <ExperiencesPageContent
      pastExperiences={pastExperiences}
      upcomingExperiences={upcomingExperiences}
    />
  );
};

export default ExperiencesPage;
