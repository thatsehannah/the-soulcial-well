import { candidConversationsMasterlist } from "./dailyCandidConvoMasterlist";

export const getRandomCandidConvoQuestion = () => {
  const categories = candidConversationsMasterlist.flatMap((item) =>
    Object.keys(item)
  );
  const randomCategory =
    categories[Math.floor(Math.random() * categories.length)];

  const allQuestions = candidConversationsMasterlist.find(
    (list) => randomCategory in list
  )![randomCategory];

  return allQuestions[Math.floor(Math.random() * allQuestions.length)];
};
