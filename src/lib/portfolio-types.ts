export type WorkCategory = "web" | "slides" | "logo" | "poster" | "writing";

export type Work = {
  slug: string;
  title: string;
  description: string;
  year: number;
  tags?: string[];
  tools?: string[];
  captions?: string[];
  team?: { name: string; role: string };
  liveUrl?: string;
  repoUrl?: string;
  kind?: "brand-guideline" | "ppt";
  writing?: {
    type: "puisi" | "kalimat-kiasan" | "lainnya";
    date?: string;
    body: string;
  };
  hidden?: boolean;
};

export type Photo = {
  title: string;
  meaning: string;
  location?: string;
  takenAt?: string;
  camera?: string;
  image: string;
  ratio?: string;
  hidden?: boolean;
};

export type WorkPage = {
  src?: string;
  title: string;
  caption?: string;
};

export type ShowcaseWork = Work & {
  category: WorkCategory;
  cover?: string;
  pages: WorkPage[];
};

export type ShowcasePhoto = Photo & {
  src?: string;
};

export type ShowcaseData = Record<WorkCategory, ShowcaseWork[]> & {
  photos: ShowcasePhoto[];
};
