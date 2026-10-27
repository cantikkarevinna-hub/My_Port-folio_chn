export type NavItem = {
  label: string;
  href: string;
};

export type ProjectItem = {
  id: string;
  title: string;
  category: "Photography" | "Art & Design";
  description: string;
  image: string;
  tools: string[];
  highlights: string[];
};

export type GearItem = {
  id: string;
  name: string;
  image: string;
};

export const navItems: NavItem[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Contact", href: "#contact" },
];

export const heroWords = ["Photographer", "Art Enthusiast", "Nature Lover"];

export const aboutStats = [
  { label: "PHOTOS", value: 4800, suffix: "+" },
  { label: "DESIGNS", value: 120, suffix: "+" },
  { label: "CAMERAS", value: 8, suffix: "" },
];

export const photographyProjects: ProjectItem[] = [
  {
    id: "forest-morning",
    title: "Forest Morning",
    category: "Photography",
    description: "Momen tenang di hutan saat kabut menyapa matahari dan mengubah tanah menjadi lukisan yang hidup.",
    image: "/images/photography-01.svg",
    tools: ["Sony A7 IV", "24-70mm", "Lightroom"],
    highlights: ["Soft sunrise mood", "Layered forest depth", "Atmospheric natural tones"],
  },
  {
    id: "mountain-mist",
    title: "Mountain Mist",
    category: "Photography",
    description: "Langkah lambat di medan tinggi, di antara kabut dan angin yang membawa cerita alam yang tenang.",
    image: "/images/photography-02.svg",
    tools: ["Canon R5", "50mm", "Photoshop"],
    highlights: ["High-contrast peaks", "Misty layers", "Crisp mountain silhouettes"],
  },
  {
    id: "golden-hour",
    title: "Golden Hour",
    category: "Photography",
    description: "Warna hangat senja menciptakan kedalaman, emosi, dan ritme yang terasa alami pada setiap frame.",
    image: "/images/photography-03.svg",
    tools: ["Fujifilm X-T4", "35mm", "Lightroom"],
    highlights: ["Warm color grade", "Golden haze", "Story-led composition"],
  },
  {
    id: "ocean-waves",
    title: "Ocean Waves",
    category: "Photography",
    description: "Gelombang dan cahaya laut dikuak dalam komposisi yang menggambarkan ritme dan kebebasan.",
    image: "/images/photography-04.svg",
    tools: ["Sony A7R IV", "70-200mm", "Capture One"],
    highlights: ["Wave motion", "Airy horizon line", "Dynamic contrast"],
  },
  {
    id: "wildflowers",
    title: "Wildflowers",
    category: "Photography",
    description: "Detail kecil dari bunga liar yang mengingatkan betapa indahnya keseimbangan yang sederhana.",
    image: "/images/photography-05.svg",
    tools: ["Canon EOS R", "90mm Macro", "Lightroom"],
    highlights: ["Macro detail", "Soft texture", "Nature storytelling"],
  },
  {
    id: "night-sky",
    title: "Night Sky",
    category: "Photography",
    description: "Keheningan malam, bintang, dan emosi yang datang begitu perlahan dari langit yang luas.",
    image: "/images/photography-06.svg",
    tools: ["Nikon Z6", "24mm", "Photoshop"],
    highlights: ["Long exposure", "Moonlit contrast", "Night calm"],
  },
];

export const artDesignProjects: ProjectItem[] = [
  {
    id: "illustration-piece",
    title: "Illustration Piece",
    category: "Art & Design",
    description: "Sebuah eksplorasi visual yang memadukan narasi alam dan bentuk organik dalam satu komposisi modern.",
    image: "/images/art-design-01.svg",
    tools: ["Procreate", "Illustrator", "Photoshop"],
    highlights: ["Organic curves", "Concept art", "Editorial style"],
  },
  {
    id: "poster-design",
    title: "Poster Design",
    category: "Art & Design",
    description: "Desain poster dengan ritme visual yang kuat, menangkap esensi inspirasi serta makna dalam satu frame.",
    image: "/images/art-design-02.svg",
    tools: ["Canva", "Illustrator", "Figma"],
    highlights: ["Bold type system", "Layered composition", "Brand narrative"],
  },
  {
    id: "brand-concept",
    title: "Brand Concept",
    category: "Art & Design",
    description: "Konsep visual untuk brand yang mengutamakan misi, nuansa, dan pengalaman personal yang membekas.",
    image: "/images/art-design-03.svg",
    tools: ["Figma", "Photoshop", "After Effects"],
    highlights: ["Identity system", "Moodboard thinking", "Modern storytelling"],
  },
];

export const portfolioItems = [...photographyProjects, ...artDesignProjects];

export const gearItems: GearItem[] = [
  { id: "camera-1", name: "Camera 1", image: "/images/gear-01.svg" },
  { id: "camera-2", name: "Camera 2", image: "/images/gear-02.svg" },
  { id: "lens-1", name: "Lens 1", image: "/images/gear-03.svg" },
  { id: "lens-2", name: "Lens 2", image: "/images/gear-04.svg" },
  { id: "lightroom", name: "Lightroom", image: "/images/gear-05.svg" },
  { id: "photoshop", name: "Photoshop", image: "/images/gear-06.svg" },
  { id: "procreate", name: "Procreate", image: "/images/gear-07.svg" },
  { id: "canva", name: "Canva", image: "/images/gear-08.svg" },
  { id: "tripod", name: "Tripod", image: "/images/gear-09.svg" },
  { id: "filter", name: "Filters", image: "/images/gear-10.svg" },
];

export const socialLinks = [
  { platform: "LinkedIn", handle: "@username", href: "https://linkedin.com" },
  { platform: "Instagram", handle: "@username", href: "https://instagram.com" },
  { platform: "YouTube", handle: "@username", href: "https://youtube.com" },
  { platform: "GitHub", handle: "@username", href: "https://github.com" },
  { platform: "TikTok", handle: "@username", href: "https://tiktok.com" },
  { platform: "Pinterest", handle: "@username", href: "https://pinterest.com" },
  { platform: "Behance", handle: "@username", href: "https://behance.net" },
];

export const defaultComments = [
  {
    id: "pinned-comment",
    name: "Ari D.",
    text: "Karya-karyanya punya rasa yang hangat dan sangat memikat. Visualnya terasa hidup dan penuh cerita.",
    likes: 24,
    liked: true,
    pinned: true,
  },
  {
    id: "comment-2",
    name: "Fira K.",
    text: "Detail alam yang ditampilkan sangat natural. Nggak pernah gagal bikin saya ingin keluar dan menyalakan kamera lagi.",
    likes: 11,
    liked: false,
    pinned: false,
  },
  {
    id: "comment-3",
    name: "Rian M.",
    text: "Desainnya rapi dan mood-nya elegan. Sangat cocok untuk portfolio artis yang menekankan visual storytelling.",
    likes: 18,
    liked: false,
    pinned: false,
  },
];
