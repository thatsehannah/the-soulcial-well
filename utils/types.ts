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
