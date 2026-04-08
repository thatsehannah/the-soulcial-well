import { Edit, Home, Plus } from "lucide-react";

export const adminViews = {
  landing: { label: "Home", href: "/admin/home", icon: Home },
  addNewExperience: {
    label: "Add New Experience",
    href: "/admin/home/add-new-experience",
    icon: Plus,
  },
  editExperiences: {
    label: "Edit Experiences",
    href: "/admin/home/edit-experiences",
    icon: Edit,
  },
} as const;
