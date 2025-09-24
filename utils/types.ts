export type TeamMemberInfo = {
  imageSrc: string;
  honorific?: string;
  firstName: string;
  lastName: string;
  title: string;
  connections: {
    email?: string;
    instagramProfile?: string;
    xProfile?: string;
    facebookProfile?: string;
    linkedInProfile?: string;
  };
  aboutMeSubtitle: string;
  recentEducation: {
    year: string;
    degree: string;
    school: string;
  };
  linkToResume?: string;
  bio: string;
};

export type CoreValueItem = {
  imageSrc: string;
  title: string;
  text: string;
};

export type ExperienceItem = {
  title: string;
  description: string;
  storageFolder?: string;
  upcoming: boolean;
  upcomingDescription?: string;
  flyerUrl?: string;
  linkToRsvp?: string;
};

export type NewMessage = {
  name: string;
  email: string;
  service: string;
  message: string;
};
