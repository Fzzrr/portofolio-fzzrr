/* ============================================================================
 *  YOUR PORTFOLIO CONTENT  —  edit this one file to fill in everything.
 *  ----------------------------------------------------------------------------
 *  This is the only file you need to touch to add your text, images and links.
 *  Each field is commented. Images go in the /public folder (see notes below).
 * ========================================================================== */

export type SocialType = "github" | "linkedin" | "email" | "instagram" | "x";

export type Project = {
  title: string;
  /** Short label shown as a pill, e.g. "Full-stack", "Machine Learning". */
  category: string;
  description: string;
  /** Tech chips shown at the bottom of the card. */
  tags: string[];
  /**
   * Card image. Put the file in /public (e.g. /public/projects/wastranusa.png)
   * and reference it as "/projects/wastranusa.png".
   * Leave as "" to show a clean gradient placeholder instead.
   */
  image?: string;
  /** External live demo link. Leave "" to hide the button. */
  liveUrl?: string;
  /** Source code link. Leave "" to hide the button. */
  repoUrl?: string;
  /** Featured projects render as a wider, highlighted card. */
  featured?: boolean;
};

export type Experience = {
  /** Which timeline column this belongs to. */
  kind: "work" | "education" | "project" | "other";
  role: string;
  org: string;
  /** e.g. "2024 — Present" */
  period: string;
  description: string;
  /** Optional org/school logo in /public (e.g. "/logos/wastranusa.png"). */
  logo?: string;
  /** Optional tech chips — handy for project entries. */
  tags?: string[];
  /**
   * Long-form detail paragraphs. When present, the entry becomes expandable
   * on the full /experience page (the home page keeps the default look).
   */
  details?: string[];
  /**
   * Proof photos shown in the expanded view. Put files in /public
   * (e.g. "/experience/ptpn/1.jpg") and list the paths here.
   */
  gallery?: string[];
};

export type Social = {
  type: SocialType;
  label: string;
  /** For email use "mailto:you@example.com". Everything else is a normal URL. */
  href: string;
};

export const site = {
  /* ---- Basics ----------------------------------------------------------- */
  name: "Farhan Zia Rizky",
  /** Username for the navbar logo (e.g. "username.dev"). Full name stays in `name`. */
  username: "Fzzrr",
  /** Short role, used in the navbar logo area and metadata. */
  role: "Informatics Student & Software Engineer",
  /** Browser tab title + SEO. */
  meta: {
    title: "Fzzrr | Portfolio",
    description:
      "Informatics student and software engineer building full-stack web apps, ML models, etc.",
  },

  /* ---- Navigation ------------------------------------------------------- */
  /** Each href should match a route path (e.g. "/projects"). */
  nav: [
    { label: "Home", href: "/" },
    { label: "Projects", href: "/projects" },
    { label: "Experience", href: "/experience" },
  ],

  /* ---- Hero ------------------------------------------------------------- */
  hero: {
    /** Set false to hide the green "available" badge. */
    available: true,
    availabilityText: "Available for new opportunities",
    greeting: "Hi, I'm",
    /** Big headline — usually your name. */
    headline: "Farhan Zia Rizky",
    tagline:
      "I am an Computer Science student. I build full-stack web applications, exploring Artificial Intelligence, machine learning, Data Science, and Deep Learning.",
    /** Your LinkedIn profile URL (link coming soon — leave "" for a placeholder). */
    linkedinUrl: "https://www.linkedin.com/in/farhanziarizky/",
    /** Your CV: a /public path (e.g. /cv.pdf) or external link. "" = placeholder. */
    resumeUrl: "https://drive.google.com/file/d/1qzlPbPbSpsO4-Nw8NECjuJ_PzqM770eu/view?usp=sharing",
    /**
     * Profile image shown on the right of the hero.
     * Put your file in /public (e.g. /public/avatar.png) and reference it here.
     * Leave "" to hide the image entirely.
     */
    avatar: "/farhan.png",
  },

  /* ---- About ------------------------------------------------------------ */
  about: {
    heading: "About me",
    /** One paragraph per array item. */
    paragraphs: [
      "I'm a passionate developer who enjoys turning ideas into polished, usable products. My main focus is full-stack web development, but I love experimenting with machine learning and deep learning in artificial intelligence too.",
      "When I'm not coding, you'll find me exploring new tools, contributing to projects, and learning whatever's next.",
    ],
    /** Quick facts shown as a small grid. Add or remove freely. */
    facts: [
      { label: "Location", value: "Indonesia" },
      { label: "Education", value: "Informatics, Universitas Padjadjaran" },
      { label: "Focus", value: "Web · Machine Learning · Data Science" },
      { label: "Email", value: "farhanziarizky@gmail.com" },
    ],
  },

  /* ---- Skills ----------------------------------------------------------- */
  /** The animated icon row is configured in src/components/Skills.tsx
   *  (icons need imports, so they live there). This heading is editable. */
  skills: {
    heading: "Tech Stack",
    subheading: "Tools and technologies I use and learn on my journey.",
  },

  /* ---- Projects --------------------------------------------------------- */
  projects: [
    {
      title: "WastraNusa",
      category: "Full-stack",
      description:
        "A comprehensive web platform built with Next.js and Prisma. Managed complete product backlog, QA, and development cycles.",
      tags: ["Next.js", "Prisma", "PostgreSQL", "Tailwind CSS", "Vercel"],
      image: "/project/WastraNusa.png",
      liveUrl: "https://wastranusa.vercel.app/",
      repoUrl: "https://github.com/Fzzrr/retail-forecast",
      featured: true,
    },
    {
      title: "Inventory Sales Forecasting",
      category: "Machine Learning",
      description:
        "Predictive models using LSTM and XGBoost to forecast inventory needs n-days ahead, reducing overstock and shortages.",
      tags: ["Python", "LSTM", "XGBoost", "Pandas", "Matplotlib", "TensorFlow"],
      image: "/project/RetailForecast.png",
      liveUrl: "https://retail-forcasting.streamlit.app/",
      repoUrl: "https://github.com/Fzzrr/retail-forecast",
      featured: false,
    },
    {
      title: "ChemLab VR",
      category: "VR / Game Dev",
      description:
        "An interactive VR chemistry lab simulation built in Unity, allowing students to safely conduct experiments and visualize molecular interactions.",
      tags: ["Unity", "C#", "VR"],
      image: "/project/ChemLab.png",
      liveUrl: "",
      repoUrl: "https://github.com/Kurtz17/ChemLab",
      featured: false,
    },
    {
      title: "Sleep Guard",
      category: "AI / Machine Learning",
      description:
        "A smart sleep monitoring system using IoT sensors and machine learning algorithms to detect and prevent sleep disorders.",
      tags: ["Python", "TensorFlow", "IoT"],
      image: "/project/SleepGuard.png",
      liveUrl: "",
      repoUrl: "https://github.com/Fzzrr/SleepGuard",
      featured: false,
    },
    {
      title: "Retail Decision Support System",
      category: "AI / Machine Learning",
      description:
        "A smart system for providing data-driven insights to support retail decision-making.",
      tags: ["Python", "Pandas", "Streamlit", "Scikit-learn"],
      image: "/project/RetailDSS.png",
      liveUrl: "",
      repoUrl: "https://github.com/Fzzrr/SleepGuard",
      featured: false,
    },
    {
      title: "BandCamp Data Warehouse",
      category: "AI / Machine Learning",
      description:
        "A data warehouse for analyzing and visualizing BandCamp sales data.",
      tags: ["Python", "SQLite", "Streamlit"],
      image: "/project/BandCamp.png",
      liveUrl: "",
      repoUrl: "https://github.com/Fzzrr/bandcamp-data-warehouse",
      featured: false,
    },
  ] satisfies Project[],

  /* ---- Experience (optional) -------------------------------------------- */
  /** Leave the array empty ( [] ) to hide the whole Experience section. */
  experience: [
    {
      kind: "work",
      role: "Software Developer Intern",
      org: "PTPN IV Regional III",
      period: "July 2025 - August 2025",
      description:
        "Led the product backlog, QA, and full development cycle of a Laravel platform from concept to launch.",
      logo: "/experience/reg3.png",
      details: [
        "Joined the regional IT team to build an internal Laravel web platform end to end — from gathering requirements with stakeholders through to deployment.",
        "Owned the product backlog and ran QA across the development cycle, coordinating features, bug fixes, and releases with the team.",
      ],
      // Add proof photos to /public (e.g. /public/experience/ptpn/) and list
      // the paths here to show them in the expanded view. Example:
      // gallery: ["/experience/ptpn/1.jpg", "/experience/ptpn/2.jpg"],
      gallery: ["/experience/activity/reg3/certificate.png", "/experience/activity/reg3/photo.jpeg"],
    },
    {
      kind: "education",
      role: "Computer Science",
      org: "Universitas Padjadjaran",
      period: "2023 — Present",
      description:
        "Focusing on full-stack development, machine learning, and software engineering.",
      logo: "/experience/unpad.png",
      details: [
        "Pursuing a Computer Science degree with a focus on full-stack web development, machine learning, and software engineering.",
        "Engaged in coursework and projects spanning data structures, databases, AI, and collaborative software development.",
      ],
      gallery: [],
    },
    {
      kind: "education",
      role: "Natural Science",
      org: "MAN 2 Kota Pekanbaru",
      period: "2020 — 2023",
      description:
        "Graduated from the Natural Science (MIPA) program with a foundation in math and science.",
      logo: "/experience/man2.png",
      details: [
        "Completed senior high school in the Natural Science (MIPA) track, building a strong base in mathematics and the sciences.",
        "Began exploring programming and web development independently outside the classroom.",
      ],
      gallery: [],
    },
    /* Projects — standalone project experience, separate from the Projects
       cards section above. The home page shows the first couple; the full
       /experience page shows all. `logo` and `tags` are optional. */
    {
      kind: "project",
      role: "Project Manager & Lead Developer",
      org: "WastraNusa",
      period: "2026",
      description:
        "Led a team building WastraNusa, a Next.js & Prisma web platform, as project manager and lead developer.",
      logo: "/experience/wastranusa.png",
      details: [
        "Led the team as project manager and lead developer, owning planning, the product backlog, and delivery from concept to launch.",
        "Coordinated development and QA across the project lifecycle, keeping features and releases on track.",
      ],
      gallery: [],
    },
    {
      kind: "project",
      role: "Unity Engineer",
      org: "ChemLab VR",
      period: "2026",
      description:
        "Interactive VR chemistry lab in Unity for safe, visual molecular experiments.",
      logo: "/experience/chemlab-logo.png",
      details: [
        "Developed an interactive VR chemistry lab in Unity, letting students run experiments safely and visualize molecular interactions.",
        "Implemented interaction systems and 3D scenes to deliver an immersive, hands-on learning experience.",
      ],
      gallery: [],
    },
    /* Other — activities, programs and involvements outside work/study. */
    {
      kind: "other",
      role: "Delegate",
      org: "Leaders.Id",
      period: "2025",
      description:
        "Selected as a delegate exploring regional collaboration, leadership, and youth development across ASEAN.",
      logo: "/experience/leadersid.png",
      details: [
        "Selected as a delegate for a program focused on regional collaboration, leadership, and youth development across ASEAN.",
        "Took part in sessions, discussions, and networking with delegates from across the region.",
      ],
      gallery: ["/experience/activity/ays/photo1.jpeg", "/experience/activity/ays/photo3.jpeg"],
    },
  ] satisfies Experience[],

  /* ---- Socials & contact ------------------------------------------------ */
  socials: [
    { type: "github", label: "GitHub", href: "https://github.com/Fzzrr" },
    {
      type: "linkedin",
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/farhanziarizky/",
    },
    {
      type: "email",
      label: "Email",
      href: "mailto:farhanziarizky@gmail.com",
    },
    {
      type: "instagram",
      label: "Instagram",
      href: "https://www.instagram.com/farhanziaarizky/",
    },
  ] satisfies Social[],

  contact: {
    heading: "Let's build something",
    text: "Currently open for new opportunities and collaborations. Feel free to reach out — I usually reply within a day.",
    /** Used by the big email button. */
    email: "farhanziarizky@gmail.com",
  },

  /** Shown in the footer. {year} is replaced automatically. */
  footer: "© {year} Fzzrr.",
};

export type Site = typeof site;
