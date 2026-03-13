import { ExperienceItem } from "@/utils/types";
import React from "react";

type ExistingExperienceFormProps = {
  data: ExperienceItem;
};

const ExistingExperienceForm = ({ data }: ExistingExperienceFormProps) => {
  console.log(data);
  return <div>ExistingExperienceForm</div>;
};

export default ExistingExperienceForm;
