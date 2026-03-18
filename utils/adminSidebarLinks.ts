import AddNewExperience from "@/app/(admin)/admin/_views/AddNewExperience";
import EditExperiences from "@/app/(admin)/admin/_views/EditExperiences";
import Landing from "@/app/(admin)/admin/_views/Landing";
import { Edit, Home, Plus } from "lucide-react";

export const adminViews = {
  landing: { label: "Home", component: Landing, icon: Home },
  addNewExperience: {
    label: "Add New Experience",
    component: AddNewExperience,
    icon: Plus,
  },
  editExperiences: {
    label: "Edit Experiences",
    component: EditExperiences,
    icon: Edit,
  },
} as const;

export type ViewKey = keyof typeof adminViews;
