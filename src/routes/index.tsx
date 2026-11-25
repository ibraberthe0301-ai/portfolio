import { useEffect, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

type PortfolioImage = { src: string; alt: string };

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ibrahim Berthé — Portfolio" },
      {
        name: "description",
        content: "Portfolio of Ibrahim Berthé: IT Support & Backend Developer",
      },
    ],
  }),
  component: Index,
});

const LANG_KEY = "portfolio-lang";
type Lang = "fr" | "en";

const translations: Record<Lang, Record<string, string>> = {
  fr: {
    navProjects: "Projets",
    navHardware: "Matériel",
    navExperience: "Expérience",
    navEducation: "Formation",
    navContact: "Contact",
    langFr: "FR",
    langEn: "EN",
    heroStatus: "Ouvert au travail",
    heroTitle: "Ibrahim Berthé",
    heroSubtitle: "Technicien support informatique & Développeur Backend Junior",
    heroDesc:
      "Je suis Ibrahim, étudiant en Technologie informatique à Gatineau, spécialisé dans les backends sécurisés, les plateformes IoT et l'automatisation d'infrastructure — et le genre de personne qui ouvre le matériel quand il est en panne. Que je construise des API en Java et Node.js, que j'automatise des environnements Linux et Windows avec Docker et PowerShell, ou que je dessoude un condensateur défectueux sur une carte d'alimentation, j'aime comprendre les systèmes du code jusqu'au circuit.",
    heroSeeProjects: "Voir les projets",
    heroContactMe: "Me contacter",
    skillsSectionLabel: "00 — compétences",
    skillsSectionTitle: "Compétences",
    projectsSectionLabel: "01 — logiciels & infrastructure",
    projectsSectionTitle: "Projets personnels et scolaires",
    experienceSectionLabel: "03 — travail",
    experienceSectionTitle: "Expériences",
    expFilterAll: "Tout",
    expFilterTech: "Tech & IT",
    expFilterField: "Service client & Terrain",
    expViewPhotos: "Voir les photos",
    expHidePhotos: "Masquer les photos",
    expShowDetails: "▼ Détails",
    expHideDetails: "▲ Moins",
    hardwareSectionLabel: "02 — dépannage matériel",
    hardwareSectionTitle: "Réparations matérielles",
    educationSectionLabel: "04 — certifications",
    educationSectionTitle: "Formation & Certifications",
    eduLanguages: "Langues",
    eduShowDetails: "▼ Voir les détails",
    eduHideDetails: "▲ Masquer les détails",
    eduNoDetail: "Aucun détail supplémentaire pour ce diplôme.",
    contactSectionLabel: "05 — contact",
    contactSectionTitle: "Contact",
    contactTitle: "Travaillons ensemble.",
    contactDesc:
      "À la recherche d'un stage en support informatique ou développement backend. Références disponibles sur demande.",
    contactFullName: "Nom complet",
    contactEmail: "Courriel",
    contactMessage: "Message",
    contactPlaceholderName: "Votre nom",
    contactPlaceholderEmail: "vous@exemple.com",
    contactPlaceholderMessage: "Écrivez votre message ici...",
    contactSendMessage: "Envoyer le message",
    contactSending: "Envoi en cours...",
    contactSuccess: "✓ Message envoyé avec succès ! Je vous reviens rapidement.",
    contactDirect: "Ou directement à",
    contactPhone: "343 558 8409",
    contactCopied: "Copié !",
    contactOpenGitHub: "Ouvrir GitHub",
    contactOpenLinkedIn: "Ouvrir LinkedIn",
    contactGatineau: "Gatineau, QC",
    contactTimezone: "UTC-5 · Disponible",
    contactFooter: "© {{year}} Ibrahim Berthé",
  },
  en: {
    navProjects: "Projects",
    navHardware: "Hardware",
    navExperience: "Experience",
    navEducation: "Education",
    navContact: "Contact",
    langFr: "FR",
    langEn: "EN",
    heroStatus: "Open to work",
    heroTitle: "Ibrahim Berthé",
    heroSubtitle: "IT Support Technician & Junior Backend Developer",
    heroDesc:
      "I'm Ibrahim, a Computer Technology student in Gatineau focused on secure backends, IoT platforms, and infrastructure automation—and the kind of person who opens up the hardware when it breaks. Whether I'm building APIs in Java and Node.js, automating Linux and Windows environments with Docker and PowerShell, or desoldering a bad capacitor on a power board, I like understanding systems from the code down to the circuit.",
    heroSeeProjects: "See projects",
    heroContactMe: "Contact me",
    skillsSectionLabel: "00 — skills",
    skillsSectionTitle: "Skills",
    projectsSectionLabel: "01 — software & infrastructure",
    projectsSectionTitle: "Personal & School Projects",
    experienceSectionLabel: "03 — work",
    experienceSectionTitle: "Experiences",
    expFilterAll: "All",
    expFilterTech: "Tech & IT",
    expFilterField: "Customer & Field",
    expViewPhotos: "View photos",
    expHidePhotos: "Hide photos",
    expShowDetails: "▼ Show details",
    expHideDetails: "▲ Hide details",
    hardwareSectionLabel: "02 — hands-on troubleshooting",
    hardwareSectionTitle: "Hardware repairs",
    educationSectionLabel: "04 — credentials",
    educationSectionTitle: "Educations & Certificates",
    eduLanguages: "Languages",
    eduShowDetails: "▼ View details",
    eduHideDetails: "▲ Hide details",
    eduNoDetail: "No additional details for this diploma.",
    contactSectionLabel: "05 — contact",
    contactSectionTitle: "Contact",
    contactTitle: "Let's work together.",
    contactDesc:
      "Looking for an internship in IT support or backend development. References available on request.",
    contactFullName: "Full Name",
    contactEmail: "Email",
    contactMessage: "Message",
    contactPlaceholderName: "Your name",
    contactPlaceholderEmail: "you@example.com",
    contactPlaceholderMessage: "Write your message here...",
    contactSendMessage: "Send Message",
    contactSending: "Sending...",
    contactSuccess: "✓ Message sent successfully! I'll get back to you shortly.",
    contactDirect: "Or directly at",
    contactPhone: "343 558 8409",
    contactCopied: "Copied!",
    contactOpenGitHub: "Open GitHub",
    contactOpenLinkedIn: "Open LinkedIn",
    contactGatineau: "Gatineau, QC",
    contactTimezone: "UTC-5 · Available",
    contactFooter: "© {{year}} Ibrahim Berthé",
  },
};

function useLang() {
  const [lang, setLang] = useState<Lang>("fr");

  useEffect(() => {
    const stored = localStorage.getItem(LANG_KEY) as Lang | null;
    if (stored === "fr" || stored === "en") {
      setLang(stored);
    } else {
      setLang(navigator.language.startsWith("fr") ? "fr" : "en");
    }
  }, []);

  const set = (next: Lang) => {
    setLang(next);
    localStorage.setItem(LANG_KEY, next);
  };

  return { lang, set };
}

function t(key: string, lang: Lang) {
  return translations[lang][key] ?? key;
}

function get<T>(val: { en: T; fr: T }, lang: Lang): T {
  return val[lang];
}

const skills: Record<string, string[]> = {
  "Frontend & Mobile": [
    "JavaScript",
    "TypeScript",
    "React",
    "Tailwind CSS",
    "HTML / CSS",
    "Android",
    "Recharts",
  ],
  "Backend & Databases": [
    "Java",
    "Spring Boot",
    "Spring Data JPA",
    "Node.js",
    "Express",
    "Python",
    "PostgreSQL",
    "SQL",
    "REST",
    "JWT",
    "Firebase Admin SDK",
    "Retrofit 2 / OkHttp",
  ],
  "DevOps & Version Control": [
    "Docker",
    "Docker Compose",
    "Git",
    "GitHub",
    "GitLab",
    "CI/CD Pipelines",
  ],
  "Systems & IT Administration": [
    "PowerShell",
    "WinRM",
    "WS-Management",
    "Microsoft 365",
    "IT Infrastructure",
    "Auto Attendant",
  ],
  "Quality & Testing": [
    "Unit Testing",
    "SonarQube",
    "Debugging",
    "Technical Documentation",
    "Pitchdeck",
  ],
  "Support & Languages": [
    "Technical Support",
    "Customer Relations",
    "Field Support",
    "English",
    "French",
  ],
};

const projects = [
  {
    n: "01",
    title: "TaskTogether",
    sub: "Collaborative task manager — Mobile + Cloud",
    goal: "Enterprise-grade simulation built for fault tolerance and strict workspace isolation (multi-tenant).",
    blocks: [
      [
        "Android",
        "Async REST calls with Retrofit 2 / OkHttp — no UI thread blocking; OkHttp interceptor injects the JWT on every request.",
      ],
      [
        "Spring Boot",
        "Containerized microservices-style API with a custom OncePerRequestFilter validating tokens through the Firebase Admin SDK.",
      ],
      ["Security", "Per-workspace access control preventing any cross-workspace data exposure."],
      [
        "DevOps",
        "PostgreSQL persistence; API + database orchestrated with Docker Compose for a reproducible environment.",
      ],
    ],
    images: [] as PortfolioImage[],
    tags: ["Java", "Spring Boot 3", "Firebase Auth", "JWT", "PostgreSQL", "Docker"],
  },
  {
    n: "02",
    title: "ColdGuard",
    sub: "IoT cold-chain monitoring platform — SaaS simulation",
    goal: "Industrial SaaS aligned with HACCP-style compliance, multi-site operations and analytics.",
    blocks: [
      [
        "Dashboards",
        "Modular React + TypeScript UI with Recharts time-series highlighting thermal drift and early warnings.",
      ],
      [
        "Auth & RBAC",
        "Stateless JWT auth; Admin / Manager / User roles enforced at route and business-logic levels.",
      ],
      [
        "Data model",
        "Relational PostgreSQL schema for sites, zones, sensors and measurement history.",
      ],
      ["Predictive", "Thermal risk scoring layer to anticipate failures and reduce downtime."],
    ],
    images: [] as PortfolioImage[],
    tags: ["React", "TypeScript", "TanStack Router", "Node.js", "Express", "PostgreSQL"],
  },
  {
    n: "03",
    title: "Windows Lab Orchestration",
    sub: "Automated remote control — final practical exam, team of 3",
    goal: "Enterprise-style automation eliminating repetitive IT support tasks.",
    blocks: [
      [
        "Setup",
        "Static IP networking, ExecutionPolicy, secured WinRM / WS-Management and tuned TrustedHosts.",
      ],
      [
        "Modular scripts",
        "File-system admin, disk-space alerts, safe process termination and network connectivity audits.",
      ],
      [
        "Traceability",
        "Structured logs and CSV exports as execution evidence for faster troubleshooting.",
      ],
    ],
    images: [] as PortfolioImage[],
    tags: ["PowerShell", "WinRM", "WS-Management", "Logging"],
  },
  {
    n: "04",
    title: "UniDesk 360",
    sub: "Full-Stack IT Service Desk Platform — Capstone Project",
    goal: "Built and maintained with a three-person team as a school capstone — a practical IT service desk for support tickets, incident tracking, and daily operational queues.",
    blocks: [
      [
        "Support workflow",
        "Ticket triage, status updates, and request resolution made clear and fast for technicians.",
      ],
      [
        "Full-stack",
        "React 18, TypeScript, Vite and Tailwind CSS frontend on a Spring Boot (Java 21) backend with PostgreSQL.",
      ],
      [
        "Open-source",
        "Multi-service environment orchestrated locally with Docker Compose; builds and checks automated through Bitbucket Pipelines — no commercial SaaS dependencies.",
      ],
    ],
    images: [] as PortfolioImage[],
    tags: [
      "React 18",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "Spring Boot",
      "Java 21",
      "PostgreSQL",
      "Docker Compose",
      "Bitbucket Pipelines",
    ],
  },
];

const hardware = [
  {
    title: "Laptop screen replacement",
    text: "Replaced a broken LCD panel end-to-end: disassembly, connector handling, reassembly and validation.",
    links: ["https://youtube.com/shorts/YejJ7glTexs"],
    images: [
      {
        src: "/images/Brokeen_computers_screen.jpeg",
        alt: "Broken laptop screen before replacement",
      },
      { src: "/images/New_screen.jpeg", alt: "Replacement screen ready for installation" },
    ],
  },
  {
    title: "TV repair via signal bypass",
    text: "Diagnosed a black-screen / protection-mode failure from a damaged LVDS ribbon; isolated faulty CLK lines with dielectric tape to restore the display.",
    links: ["https://youtube.com/shorts/1wo4bpRyisQ", "https://youtube.com/shorts/r6C2QrciRho"],
    images: [
      { src: "/images/Opening_tv.jpeg", alt: "Opening the television for diagnosis" },
      { src: "/images/Open_tv_wit_me.jpeg", alt: "Television opened during repair" },
      { src: "/images/opened_tv_1.jpeg", alt: "Television components during repair" },
    ],
  },
  {
    title: "Glitching PC — random shutdowns",
    text: "Root-cause elimination traced the issue to an intermittent contact from a misplaced display cable. Fixed without replacing parts.",
    links: [],
    images: [
      { src: "/images/Glitching_screen.jpeg", alt: "Glitching display before troubleshooting" },
      {
        src: "/images/Inside_Glitching_screen.jpeg",
        alt: "Inside the display during troubleshooting",
      },
      { src: "/images/fixed_Glitching_screen.jpeg", alt: "Display working after the repair" },
    ],
  },
  {
    title: "Urban display monitor restoration",
    text: "Recovered discarded monitors; HDMI dropping after ~3s pointed to a bloated electrolytic capacitor. Diagnosed and fixed.",
    links: ["https://youtube.com/shorts/Sg9uiSc2h_M"],
    images: [
      {
        src: "/images/Condensateur_Monitor.jpeg",
        alt: "Monitor capacitor inspected during diagnosis",
      },
      {
        src: "/images/Fixed_Bloated_Capacitors.jpeg",
        alt: "Monitor with the faulty capacitors repaired",
      },
      { src: "/images/Fixed_Monitors.jpeg", alt: "Restored monitor after repair" },
    ],
  },
];

const experience = [
  {
    role: { en: "Junior Software Developer", fr: "Développeur Logiciel Junior" },
    org: { en: "Karwisoft AI · Remote (Ottawa)", fr: "Karwisoft AI · Télétravail (Ottawa)" },
    date: { en: "Oct 2026 – Present", fr: "Oct 2026 – Présent" },
    detail: {
      en: "Integrated an AI-powered coding copilot and code analyzer to assist with code analysis, technical diagnostics, automated recommendations, and development workflows.",
      fr: "Intégré un copilote de codage et un analyseur de code basés sur l'IA pour assister l'analyse du code, les diagnostics techniques, les recommandations automatisées et les flux de travail de développement.",
    },
    visual: {
      en: "React · TypeScript · Spring Boot · Node.js · Docker · PostgreSQL",
      fr: "React · TypeScript · Spring Boot · Node.js · Docker · PostgreSQL",
    },
    images: [
      {
        src: "/images/Internship_Karwisoft.jpeg",
        alt: "Karwisoft AI internship",
      },
    ] as PortfolioImage[],
    points: {
      en: [
        "Configured AI-assisted Git diagnostics and telemetry monitoring, enabling repository analysis, anomaly detection, risk assessment, and secure processing of development metrics.",
        "Integrated AI-assisted analysis into development tools, enabling developers to trigger code diagnostics and repository assessments directly through a dashboard and else.",
        "Engineered and deployed scalable full-stack applications (React, TypeScript, Spring Boot, Node.js), managing secure environment variables (Docker Compose, .env) and seamless production releases using containerization (Docker).",
        "Enforced code quality and enterprise security, executing automated vulnerability scans and static code analysis (SonarQube) while maintaining strict proprietary data confidentiality.",
        "Optimized software reliability and workflows, writing unit and integration tests (JUnit) and refactoring legacy codebases (PostgreSQL, Java) to ensure long-term maintainability.",
        "Collaborated in agile development teams, utilizing version control (GitLab, Git) and participating in code reviews and sprint ceremonies to track issues and deliver features efficiently.",
      ],
      fr: [
        "Configuré des diagnostics Git assistés par IA et une surveillance télémétrique, permettant l'analyse de dépôts, la détection d'anomalies, l'évaluation des risques et le traitement sécurisé des métriques de développement.",
        "Intégré l'analyse assistée par IA aux outils de développement, permettant aux développeurs de déclencher des diagnostics de code et des évaluations de dépôts directement depuis un tableau de bord.",
        "Conçu et déployé des applications full-stack scalables (React, TypeScript, Spring Boot, Node.js), gérant les variables d'environnement sécurisées (Docker Compose, .env) et des mises en production fluides via conteneurisation (Docker).",
        "Assuré la qualité du code et la sécurité entreprise, exécutant des scans automatisés de vulnérabilités et l'analyse statique du code (SonarQube) tout en maintenant une stricte confidentialité des données propriétaires.",
        "Optimisé la fiabilité logicielle et les flux de travail, écrivant des tests unitaires et d'intégration (JUnit) et refactorisant des codebases legacy (PostgreSQL, Java) pour assurer une maintenabilité à long terme.",
        "Collaboré au sein d'équipes de développement agiles, utilisant le versioning (GitLab, Git) et participant aux revues de code et cérémonies de sprint pour suivre les problèmes et délivrer des fonctionnalités efficacement.",
      ],
    },
  },
  {
    role: {
      en: "Intern — IT Support Technician & Junior Developer",
      fr: "Stagiaire — Technicien Support & Développeur Junior",
    },
    org: {
      en: "Africa Development Network · Ottawa, ON",
      fr: "Africa Development Network · Ottawa, ON",
    },
    date: { en: "Sept 2026 – Present", fr: "Sept 2026 – Présent" },
    detail: {
      en: "Hands-on IT support combined with junior development and scripting work.",
      fr: "Support informatique pratique combiné à du développement junior et du scripting.",
    },
    visual: {
      en: "IT support · development · automation",
      fr: "Support · développement · automatisation",
    },
    images: [
      {
        src: "/images/Interne_Maintenance1.jpg",
        alt: "Internal maintenance work",
      },
      {
        src: "/images/Interne_Maintenance2.jpg",
        alt: "Internal maintenance work",
      },
      {
        src: "/images/Intern_PC_Dell_Components_Testing.jpeg",
        alt: "Dell PC component testing",
      },
      {
        src: "/images/Intern_PC_Dell_Components_Testing2.jpeg",
        alt: "Dell PC component testing",
      },
      {
        src: "/images/Intern_PC_Forgetten_Passwor1.jpeg",
        alt: "Password recovery on internal PC",
      },
      {
        src: "/images/Intern_PC_Forgetten_Passwor2.jpg",
        alt: "Password recovery on internal PC",
      },
      {
        src: "/images/Intern_PC_Forgetten_Passwor3.jpeg",
        alt: "Password recovery on internal PC",
      },
      {
        src: "/images/Intern_PC_Forgetten_Passwor4.jpeg",
        alt: "Password recovery on internal PC",
      },
      {
        src: "/images/Intern_PC_Forgetten_Passwor5.jpeg",
        alt: "Password recovery on internal PC",
      },
      {
        src: "/images/Intern_PC_Forgetten_Passwor6.jpeg",
        alt: "Password recovery on internal PC",
      },
      {
        src: "/images/Intern_PC_Forgetten_Passwor7.jpeg",
        alt: "Password recovery on internal PC",
      },
      {
        src: "/images/Intern_PC_Forgetten_Passwor8.jpg",
        alt: "Password recovery on internal PC",
      },
    ] as PortfolioImage[],
    points: {
      en: [
        "Resolve hardware, software and network support tickets.",
        "Develop, test and debug features across internal applications.",
        "Automate repetitive IT tasks with scripts and maintain technical documentation.",
      ],
      fr: [
        "Résoudre les tickets de support matériel, logiciel et réseau.",
        "Développer, tester et déboguer des fonctionnalités sur des applications internes.",
        "Automatiser les tâches informatiques répétitives avec des scripts et maintenir la documentation technique.",
      ],
    },
  },
  {
    role: { en: "Delivery Driver", fr: "Livreur" },
    org: { en: "DoorDash · Ottawa", fr: "DoorDash · Ottawa" },
    date: { en: "Oct 2023 – Present", fr: "Oct 2023 – Présent" },
    detail: {
      en: "Independent delivery work requiring consistent service and real-time route decisions.",
      fr: "Travail de livraison indépendant nécessitant un service constant et des décisions de route en temps réel.",
    },
    visual: { en: "Golden Dasher · elite status", fr: "Golden Dasher · statut élite" },
    images: [
      {
        src: "/images/DoorDash_delivery.jpeg",
        alt: "DoorDash delivery",
      },
    ] as PortfolioImage[],
    points: {
      en: [
        "Real-time route optimization under strict time constraints.",
        "“Golden Dasher” elite status — consistent high performance, fully autonomous.",
      ],
      fr: [
        "Optimisation de route en temps réel sous contraintes de temps strictes.",
        "“Golden Dasher” statut élite — performance constante élevée, entièrement autonome.",
      ],
    },
  },
  {
    role: {
      en: "Windows Surface Cleaning Technician",
      fr: "Technicien de Nettoyage de Surfaces Vitrées",
    },
    org: { en: "Collège Pro · Ottawa", fr: "Collège Pro · Ottawa" },
    date: { en: "May 2025 – Aug 2025", fr: "Mai 2025 – Août 2025" },
    detail: {
      en: "Field work focused on safe job-site practices, client outreach and exterior window cleaning.",
      fr: "Travail de terrain axé sur les pratiques de sécurité sur chantier, la prospection client et le nettoyage de fenêtres extérieur.",
    },
    visual: {
      en: "Field work · safety · client service",
      fr: "Terrain · sécurité · service client",
    },
    images: [
      {
        src: "/images/Windows_Cleaning_Technicien.jpeg",
        alt: "Window cleaning technician at work",
      },
      {
        src: "/images/Windows_Cleaning_Technicien_2.jpeg",
        alt: "Window cleaning work at a job site",
      },
    ],
    points: {
      en: [
        "Job-site safety assessment and risk management, including height work.",
        "Bilingual field prospecting and client acquisition.",
      ],
      fr: [
        "Évaluation de la sécurité sur chantier et gestion des risques, y compris le travail en hauteur.",
        "Prospection de terrain bilingue et acquisition client.",
      ],
    },
  },
  {
    role: { en: "Remote Appointment Setter", fr: "Prise de Rendez-vous à Distance" },
    org: { en: "NR Immobilier · Remote (France)", fr: "NR Immobilier · Remote (France)" },
    date: { en: "Jan 2025 – May 2025", fr: "Jan 2025 – Mai 2025" },
    detail: {
      en: "Remote prospect qualification through messaging and coordination with the sales team.",
      fr: "Qualification de prospects à distance par messagerie et coordination avec l'équipe commerciale.",
    },
    visual: {
      en: "Remote · multi-channel outreach · CRM",
      fr: "Remote · prospection multi-canal · CRM",
    },
    images: [] as PortfolioImage[],
    points: {
      en: [
        "Multi-channel prospect qualification (SMS, email, DMs).",
        "CRM workflow administration and closer calendar coordination.",
      ],
      fr: [
        "Qualification multi-canal de prospects (SMS, email, DMs).",
        "Administration du flux de travail CRM et coordination du calendrier des closers.",
      ],
    },
  },
  {
    role: { en: "Customer Service Specialist", fr: "Spécialiste du Service Client" },
    org: { en: "Mission Uniforme · Gatineau", fr: "Mission Uniforme · Gatineau" },
    date: { en: "Oct 2023 – May 2025", fr: "Oct 2023 – Mai 2025" },
    detail: {
      en: "Customer-facing retail work supporting clients, stock replenishment and deliveries.",
      fr: "Travail de vente en face-à-face soutenant les clients, le réapprovisionnement et les livraisons.",
    },
    visual: {
      en: "In-store service · inventory · logistics",
      fr: "Service en magasin · inventaire · logistique",
    },
    images: [] as PortfolioImage[],
    points: {
      en: [
        "Solution-first support in person and by phone.",
        "Merchandising, stock replenishment and delivery logistics.",
      ],
      fr: [
        "Support orienté solution en personne et par téléphone.",
        "Merchandising, réapprovisionnement et logistique de livraison.",
      ],
    },
  },
];

const education = [
  {
    title: { en: "DEC, Computer Technology", fr: "DEC, Technologie informatique" },
    school: "Collège Universel · Gatineau",
    date: "Jan 2024 – Dec 2026",
  },
  {
    title: {
      en: "Professional Technician Accreditation",
      fr: "Accréditation de Technicien Professionnel",
    },
    school: "Collège Pro · Ottawa",
    date: "Apr 2025",
  },
  {
    title: { en: "Bachelor 1, Management Science", fr: "Bachelor 1, Sciences de la Gestion" },
    school: "EPHEP Smart School · Bamako",
    date: "Nov 2022 – Jun 2023",
  },
  {
    title: { en: "French Proficiency Test (TCF)", fr: "Test de Compétence en Français (TCF)" },
    school: "Centre Culturel Français · Bamako",
    date: "Sep 2022",
  },
  {
    title: { en: "High School Diploma in Science", fr: "Baccalauréat en Sciences" },
    school: "Mali",
    date: "Sep 2019 – Jul 2022",
  },
];

const certs = [
  {
    title: { en: "RCR / DEA Level C", fr: "RCR / DEA Niveau C" },
    school: "Red Cross · Jan 2026",
    frSchool: "Croix-Rouge · Jan 2026",
  },
  {
    title: { en: "Certified", fr: "Certifié" },
    school: "In progress",
    frSchool: "En cours",
  },
];

const eduDetails: Record<string, Record<Lang, string>> = {
  "DEC, Computer Technology": {
    en: "Networks, programming (Java, Python), databases (SQL/PostgreSQL), Linux/Windows system administration, fundamental cybersecurity.",
    fr: "Réseaux, programmation (Java, Python), bases de données (SQL/PostgreSQL), administration système Linux/Windows, cybersécurité fondamentale.",
  },
  "Professional Technician Accreditation": {
    en: "Hardware troubleshooting, PC assembly, OS installation, preventive maintenance, workplace safety.",
    fr: "Dépannage matériel, assemblage PC, installation d'OS, maintenance préventive, sécurité au travail.",
  },
  "Bachelor 1, Management Science": {
    en: "Project management, accounting, marketing, human resources, business economics.",
    fr: "Gestion de projet, comptabilité, marketing, ressources humaines, économie d'entreprise.",
  },
  "French Proficiency Test (TCF)": {
    en: "French language proficiency assessment (CECR): oral/written comprehension and expression.",
    fr: "Évaluation du niveau de français (CECR) : compréhension orale/écrite, expression orale/écrite.",
  },
  "High School Diploma in Science": {
    en: "Mathematics, physics-chemistry, life and earth sciences, biology.",
    fr: "Mathématiques, physique-chimie, sciences de la vie et de la terre, biologie.",
  },
};

const certDetails: Record<string, Record<Lang, string>> = {
  "RCR / DEA Level C": {
    en: "Cardiopulmonary resuscitation and automated external defibrillator — level C (adult, child, infant).",
    fr: "Réanimation cardiorespiratoire et défibrillateur externe automatisé — niveau C (adulte, enfant, nourrisson).",
  },
  Certified: {
    en: "IT troubleshooting, operating systems, network administration, cybersecurity, customer service. Coursera/Google credits.",
    fr: "Dépannage informatique, systèmes d'exploitation, administration réseau, sécurité informatique, service client. Crédits Coursera/Google.",
  },
};

const photoNotes: Record<string, Record<Lang, string>> = {
  "Junior Software Developer": {
    en: "Additional screenshots and internal tooling can't be shared due to company privacy and confidentiality policies.",
    fr: "Des captures d'écran supplémentaires et les outils internes ne peuvent pas être partagés en raison des politiques de confidentialité de l'entreprise.",
  },
};

const langLevels: Record<string, Record<Lang, string>> = {
  French: { en: "Native (C2)", fr: "Natif (C2)" },
  English: { en: "Fluent (B2/C1)", fr: "Courant (B2/C1)" },
  Bambara: { en: "Native", fr: "Natif" },
};

function ScrollReveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -80px 0px" },
    );

    const el = ref.current;
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-450 ease-out ${
        visible ? "scroll-reveal-visible" : "scroll-reveal"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      setProgress(height > 0 ? (winScroll / height) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return progress;
}

function SectionTitle({ id, label, title }: { id: string; label: string; title: string }) {
  return (
    <div id={id} className="mb-8 scroll-mt-24">
      <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
        // {label}
      </p>
      <h2 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">{title}</h2>
    </div>
  );
}

function Index() {
  const { lang, set: setLang } = useLang();
  const scrollProgress = useScrollProgress();
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [formError, setFormError] = useState("");

  const [expFilter, setExpFilter] = useState("All");
  const [expandedRoles, setExpandedRoles] = useState<Set<number>>(new Set([0, 1]));
  const [expandedProjects, setExpandedProjects] = useState<Set<string>>(new Set());
  const [activeRoleIndex, setActiveRoleIndex] = useState<number | null>(null);
  const [lightbox, setLightbox] = useState<{
    open: boolean;
    images: { src: string; alt: string }[];
  }>({
    open: false,
    images: [],
  });
  const [eduExpanded, setEduExpanded] = useState<Set<string>>(new Set());
  const [langProficiency, setLangProficiency] = useState<string | null>(null);
  const [contactGlow, setContactGlow] = useState<{ x: number; y: number } | null>(null);
  const [copyTooltip, setCopyTooltip] = useState<{ id: string; shown: boolean } | null>(null);
  const [nameValid, setNameValid] = useState(true);
  const [emailValid, setEmailValid] = useState(true);
  const [messageCount, setMessageCount] = useState(0);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus("submitting");
    setFormError("");

    const formData = new FormData(e.currentTarget);
    const payload = {
      access_key: import.meta.env["VITE_WEB3FORMS_ACCESS_KEY"],
      subject: t("contactSendMessage", lang),
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      message: formData.get("message") as string,
      botcheck: formData.get("botcheck") as string,
    };

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setFormStatus("success");
        (e.currentTarget as HTMLFormElement).reset();
        setMessageCount(0);
      } else {
        setFormStatus("error");
        setFormError(
          data.message || t("contactSuccess", lang) === data.message
            ? "Erreur lors de l'envoi. Réessayez."
            : "Error sending. Try again.",
        );
        setTimeout(() => setFormStatus("idle"), 4000);
      }
    } catch {
      setFormStatus("error");
      setFormError(
        lang === "fr"
          ? "Impossible de contacter le serveur. Réessayez plus tard."
          : "Impossible de contacter le serveur. Réessayez plus tard.",
      );
      setTimeout(() => setFormStatus("idle"), 4000);
    }
  };

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameValid(e.target.value.trim().length > 0);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailValid(validateEmail(e.target.value));
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessageCount(e.target.value.length);
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopyTooltip({ id, shown: true });
    setTimeout(() => setCopyTooltip(null), 1800);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setContactGlow({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const nav = [
    ["projects", t("navProjects", lang)],
    ["hardware", t("navHardware", lang)],
    ["experience", t("navExperience", lang)],
    ["education", t("navEducation", lang)],
    ["contact", t("navContact", lang)],
  ];

  return (
    <div className="min-h-screen" lang={lang}>
      <div className="scroll-bar" style={{ width: `${scrollProgress}%` }} />
      <header className="sticky top-0 z-20 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <img
              src="/images/Icone_Portfolio.jpg"
              alt="Logo"
              className="w-7 h-7 rounded-lg object-cover border border-primary/30 shadow-card hover:border-primary hover:shadow-card transition-all duration-200"
            />
            <a href="#top" className="font-mono text-sm font-semibold">
              <span className="text-primary">~/</span>ibrahim
              <span className="caret text-primary">_</span>
            </a>
          </div>
          <nav className="hidden gap-6 font-mono text-sm text-muted-foreground md:flex">
            {nav.map(([id, l]) => (
              <a key={id} href={`#${id}`} className="transition-colors hover:text-primary">
                {l}
              </a>
            ))}
            <button
              type="button"
              onClick={() => setLang(lang === "fr" ? "en" : "fr")}
              className="rounded-full border border-border px-3 py-1 text-xs font-mono transition-colors hover:border-primary hover:text-primary"
              aria-label="Switch language"
            >
              {lang === "fr" ? t("langFr", lang) : t("langEn", lang)} |{" "}
              {lang === "fr" ? t("langEn", lang) : t("langFr", lang)}
            </button>
          </nav>
        </div>
      </header>

      <main id="top" className="mx-auto max-w-6xl px-6">
        <section className="grid items-center gap-12 py-20 md:grid-cols-[1.4fr_1fr] md:py-28">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-xs text-muted-foreground">
              <span className="size-2 rounded-full bg-primary pulse-slow" /> {t("heroStatus", lang)}
            </p>
            <h1 className="mt-6 text-5xl font-semibold leading-[1.08] tracking-tight md:text-7xl">
              Ibrahim <span className="text-primary">Berthé</span>
            </h1>
            <p className="mt-4 font-mono text-accent">{t("heroSubtitle", lang)}</p>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground">{t("heroDesc", lang)}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#projects"
                className="rounded-lg bg-primary px-5 py-3 font-medium text-primary-foreground shadow-card transition-all hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-card-hover"
              >
                {t("heroSeeProjects", lang)}
              </a>
              <a
                href="mailto:ibraberthe0301@gmail.com"
                className="rounded-lg border px-5 py-3 font-medium transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:bg-primary/5 hover:text-primary"
              >
                {t("heroContactMe", lang)}
              </a>
            </div>
          </div>
          <img
            src="/images/Black_&_White_Profil.jpeg"
            alt="Ibrahim Berthé"
            className="aspect-[4/5] w-full rounded-xl object-cover shadow-card"
          />
        </section>

        <section className="border-y py-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Object.entries(skills).map(([cat, list], i) => (
            <ScrollReveal key={cat} delay={i * 60}>
              <div className="break-inside-avoid rounded-xl border bg-card p-5 shadow-card hover:-translate-y-1 hover:border-primary/50 transition-all duration-200 ease-out">
                <p className="mb-4 font-mono text-xs uppercase tracking-widest text-primary">
                  {cat}
                </p>
                <div className="flex flex-wrap gap-2">
                  {list.map((s) => (
                    <span
                      key={s}
                      className="inline-block px-3 py-1.5 rounded-md border border-border text-xs font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground whitespace-nowrap"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </section>

        <section className="py-24">
          <SectionTitle
            id="projects"
            label={t("projectsSectionLabel", lang)}
            title={t("projectsSectionTitle", lang)}
          />
          <div className="space-y-8">
            {projects.map((p, i) => (
              <ScrollReveal key={p.n} delay={i * 80}>
                <article className="grid gap-8 rounded-xl border bg-card p-6 shadow-card hover:-translate-y-1 hover:border-primary/50 transition-all duration-200 ease-out md:grid-cols-[1fr_1.3fr] md:p-10">
                  <div>
                    <p className="font-mono text-5xl font-semibold text-primary/45">{p.n}</p>
                    <h3 className="mt-2 text-2xl font-semibold">{p.title}</h3>
                    <p className="text-sm font-medium text-accent">{p.sub}</p>
                    <p className="mt-4 text-muted-foreground">{p.goal}</p>
                    <div className="mt-5 flex flex-wrap gap-1.5">
                      {p.tags.map((t) => (
                        <span key={t} className="tag">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <button
                      type="button"
                      onClick={() =>
                        setExpandedProjects((prev) => {
                          const next = new Set(prev);
                          if (next.has(p.n)) next.delete(p.n);
                          else next.add(p.n);
                          return next;
                        })
                      }
                      className="mt-6 block rounded-md font-mono text-xs text-primary transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    >
                      {expandedProjects.has(p.n)
                        ? t("expHidePhotos", lang)
                        : t("expViewPhotos", lang)}
                    </button>
                    <div
                      className={`mt-2 overflow-hidden transition-all duration-300 ease-out ${
                        expandedProjects.has(p.n)
                          ? "max-h-[2000px] opacity-100"
                          : "max-h-0 opacity-0"
                      }`}
                    >
                      {p.images.length > 0 ? (
                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                          {p.images.map((image) => (
                            <img
                              key={image.src}
                              src={image.src}
                              alt={image.alt}
                              loading="lazy"
                              className="aspect-video w-full rounded-lg border object-cover shadow-card cursor-pointer hover:border-primary/50 transition-colors"
                              onClick={() => setLightbox({ open: true, images: p.images })}
                            />
                          ))}
                        </div>
                      ) : (
                        <p className="text-xs italic text-muted-foreground">
                          {lang === "fr" ? "Photos à venir." : "Photos coming soon."}
                        </p>
                      )}
                    </div>
                    <ul className="space-y-4">
                      {p.blocks.map(([h, t]) => (
                        <li key={h} className="border-l-2 border-primary/30 pl-4">
                          <p className="font-mono text-sm font-semibold text-primary">{h}</p>
                          <p className="mt-1 text-sm leading-normal text-muted-foreground">{t}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </section>

        <section className="py-12">
          <SectionTitle
            id="hardware"
            label={t("hardwareSectionLabel", lang)}
            title={t("hardwareSectionTitle", lang)}
          />
          <ScrollReveal delay={100}>
            <div className="grid gap-6 md:grid-cols-2">
              {hardware.map((h) => (
                <article
                  key={h.title}
                  className="rounded-xl border bg-card p-6 shadow-card hover:-translate-y-1 hover:border-primary/50 transition-all duration-200 ease-out"
                >
                  {h.images.length > 0 && (
                    <div className="mb-5 grid gap-3 sm:grid-cols-2">
                      {h.images.map((image) => (
                        <img
                          key={image.src}
                          src={image.src}
                          alt={image.alt}
                          loading="lazy"
                          className="aspect-video w-full rounded-lg border object-cover"
                        />
                      ))}
                    </div>
                  )}
                  <h3 className="text-xl font-semibold">{h.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{h.text}</p>
                  {h.links.length > 0 && (
                    <div className="mt-4 flex gap-4 font-mono text-xs">
                      {h.links.map((l, i) => (
                        <a
                          key={l}
                          href={l}
                          target="_blank"
                          rel="noreferrer"
                          className="text-accent hover:underline"
                        >
                          ▶ video {h.links.length > 1 ? i + 1 : ""}
                        </a>
                      ))}
                    </div>
                  )}
                </article>
              ))}
            </div>
          </ScrollReveal>
        </section>

        <section className="py-24">
          <SectionTitle
            id="experience"
            label={t("experienceSectionLabel", lang)}
            title={t("experienceSectionTitle", lang)}
          />
          <ScrollReveal delay={120}>
            <div className="space-y-8">
              <div className="flex flex-wrap gap-2">
                {[
                  { key: "All", label: t("expFilterAll", lang) },
                  { key: "Tech & IT", label: t("expFilterTech", lang) },
                  { key: "Customer & Field", label: t("expFilterField", lang) },
                ].map((f) => (
                  <button
                    key={f.key}
                    type="button"
                    onClick={() => setExpFilter(f.key)}
                    aria-pressed={expFilter === f.key}
                    className={`rounded-full border px-4 py-1.5 text-xs font-mono font-medium transition-all duration-200 ${
                      expFilter === f.key
                        ? "bg-primary text-primary-foreground border-primary shadow-card"
                        : "border-border text-muted-foreground hover:border-primary/50 hover:bg-primary/5"
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>

              <div className="w-full relative border-l border-border/60 pl-6">
                <div
                  className="absolute inset-0 w-full bg-gradient-to-b from-primary/20 via-transparent to-transparent pointer-events-none"
                  style={{
                    maskImage: `linear-gradient(to bottom, transparent 0%, transparent var(--progress), black var(--progress), black 100%)`,
                    WebkitMaskImage: `linear-gradient(to bottom, transparent 0%, transparent var(--progress), black var(--progress), black 100%)`,
                  }}
                />
                {experience.map((e, index) => {
                  const isTech = index <= 1;
                  const category = isTech ? "Tech & IT" : "Customer & Field";
                  const show = expFilter === "All" || category === expFilter;
                  if (!show) return null;
                  const isActive = activeRoleIndex === index;
                  const isExpanded = expandedRoles.has(index);
                  return (
                    <li key={e.role.en} className="w-full relative mb-6" data-index={index}>
                      <button
                        type="button"
                        onClick={() => {
                          setActiveRoleIndex(index);
                          setExpandedRoles((prev) => {
                            const next = new Set(prev);
                            if (next.has(index)) next.delete(index);
                            else next.add(index);
                            return next;
                          });
                        }}
                        aria-expanded={isExpanded}
                        aria-controls={`exp-details-${index}`}
                        className="flex items-start gap-3 w-full py-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded-lg text-left"
                      >
                        <span
                          className={`absolute left-[-5px] top-2 z-10 size-2.5 rounded-full border-2 transition-all duration-300 ${
                            isActive || isExpanded
                              ? "bg-primary border-primary scale-110 shadow-[0_0_12px_rgba(34,211,238,0.5)]"
                              : "border-primary/40 bg-background group-hover:border-primary"
                          }`}
                        />
                        <div className="flex-1 min-w-0 rounded-lg p-3 border border-border/60 bg-card hover:border-primary/50 transition-all duration-200">
                          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 text-left">
                            <div className="flex-1 min-w-0">
                              <span className="block font-mono text-xs text-muted-foreground">
                                {get(e.date, lang)}
                              </span>
                              <span className="mt-1 block text-lg font-semibold">
                                {get(e.role, lang)}
                              </span>
                              <span className="block text-sm text-accent">{get(e.org, lang)}</span>
                            </div>
                            <span
                              className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[10px] font-mono font-medium transition-colors whitespace-nowrap ${
                                isTech
                                  ? "border-primary/40 bg-primary/5 text-primary"
                                  : "border-accent/40 bg-accent/5 text-accent"
                              }`}
                            >
                              {category}
                            </span>
                          </div>
                          <ul className="mt-2 list-none space-y-1 text-sm text-muted-foreground">
                            <li className="flex items-start gap-2">
                              <span className="mt-0.5 flex-shrink-0 text-primary">▪</span>
                              {get(e.detail, lang)}
                            </li>
                            {get(e.points, lang).map((p) => (
                              <li key={p} className="flex items-start gap-2">
                                <span className="mt-0.5 flex-shrink-0 text-primary">▪</span>
                                {p}
                              </li>
                            ))}
                          </ul>
                          <p className="mt-3 inline-flex rounded-full border border-primary/30 bg-primary/5 px-3 py-1 font-mono text-xs text-primary">
                            {get(e.visual, lang)}
                          </p>

                          <div className="mt-3 pt-3 border-t border-border/40">
                            {e.images.length > 0 && (
                              <>
                                <button
                                  type="button"
                                  onClick={(ev) => {
                                    ev.stopPropagation();
                                    setExpandedRoles((prev) => {
                                      const next = new Set(prev);
                                      if (next.has(index)) next.delete(index);
                                      else next.add(index);
                                      return next;
                                    });
                                  }}
                                  className="mt-2 block rounded-md font-mono text-xs text-primary transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                                >
                                  {isExpanded ? t("expHidePhotos", lang) : t("expViewPhotos", lang)}
                                </button>
                                <div
                                  id={`exp-details-${index}`}
                                  className={`mt-2 overflow-hidden transition-all duration-300 ease-out ${
                                    isExpanded ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
                                  }`}
                                >
                                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                                    {e.images.map((image) => (
                                      <img
                                        key={image.src}
                                        src={image.src}
                                        alt={image.alt}
                                        loading="lazy"
                                        className="aspect-video w-full rounded-lg border object-cover shadow-card cursor-pointer hover:border-primary/50 transition-colors"
                                        onClick={(ev) => {
                                          ev.stopPropagation();
                                          setLightbox({ open: true, images: e.images });
                                        }}
                                      />
                                    ))}
                                  </div>
                                  {photoNotes[e.role.en]?.[lang] && (
                                    <p className="mt-3 text-xs italic text-muted-foreground">
                                      {photoNotes[e.role.en][lang]}
                                    </p>
                                  )}
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      </button>
                    </li>
                  );
                })}
              </div>
            </div>
          </ScrollReveal>
        </section>

        <section className="py-12">
          <SectionTitle
            id="education"
            label={t("educationSectionLabel", lang)}
            title={t("educationSectionTitle", lang)}
          />
          <ScrollReveal delay={140}>
            <div className="grid gap-10 md:grid-cols-[1.5fr_1fr]">
              <ul className="divide-y rounded-xl border bg-card">
                {education.map((edu, i) => {
                  const titleKey = edu.title.en;
                  const title = get(edu.title, lang);
                  const isOpen = eduExpanded.has(titleKey);
                  return (
                    <li
                      key={titleKey}
                      className="flex flex-col justify-between gap-1 p-5 md:flex-row md:items-center transition-all duration-200"
                    >
                      <button
                        type="button"
                        onClick={() => {
                          setEduExpanded((prev) => {
                            const next = new Set(prev);
                            if (next.has(titleKey)) next.delete(titleKey);
                            else next.add(titleKey);
                            return next;
                          });
                        }}
                        aria-expanded={isOpen}
                        aria-controls={`edu-details-${i}`}
                        className={`flex items-center justify-between w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 transition-all duration-200 ${
                          isOpen
                            ? "border-primary/40 bg-primary/5"
                            : "border-border/60 hover:border-primary/40 hover:bg-primary/5"
                        }`}
                      >
                        <div>
                          <p className="font-semibold">{title}</p>
                          <p className="text-sm text-muted-foreground">{edu.school}</p>
                        </div>
                        <p className="font-mono text-xs text-primary">{edu.date}</p>
                        <span className="ml-4 text-[10px] text-muted-foreground">
                          {isOpen ? t("eduHideDetails", lang) : t("eduShowDetails", lang)}
                        </span>
                      </button>
                      {isOpen && (
                        <div
                          id={`edu-details-${i}`}
                          className="mt-4 pt-4 border-t border-border/40 pl-8 md:pl-0"
                        >
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {eduDetails[titleKey]?.[lang] ?? t("eduNoDetail", lang)}
                          </p>
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>

              <div className="space-y-6">
                {certs.map((cert, i) => {
                  const titleKey = cert.title.en;
                  const title = get(cert.title, lang);
                  const school = lang === "fr" ? cert.frSchool : cert.school;
                  const isGoogle = titleKey.includes("Google");
                  const isOpen = eduExpanded.has(titleKey);
                  return (
                    <div
                      key={titleKey}
                      className={`rounded-xl border bg-card p-5 transition-all duration-200 ${
                        isOpen
                          ? "border-primary/40 bg-primary/5 shadow-card"
                          : "border-border/60 hover:border-primary/40 hover:bg-primary/5 hover:shadow-card"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div>
                          <p className="font-semibold">{title}</p>
                          <p className="font-mono text-xs text-accent">{school}</p>
                        </div>
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-medium border ${
                            isGoogle
                              ? "border-accent/40 bg-accent/5 text-accent"
                              : "border-border text-muted-foreground"
                          }`}
                        >
                          {isGoogle && (
                            <span
                              className="size-1.5 rounded-full bg-accent pulse-slow"
                              aria-label={lang === "fr" ? "En cours" : "In progress"}
                            />
                          )}
                          {isGoogle
                            ? lang === "fr"
                              ? "En cours"
                              : "In progress"
                            : lang === "fr"
                              ? "Certifié"
                              : "Certified"}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setEduExpanded((prev) => {
                            const next = new Set(prev);
                            if (next.has(titleKey)) next.delete(titleKey);
                            else next.add(titleKey);
                            return next;
                          });
                        }}
                        aria-expanded={isOpen}
                        className="w-full text-left text-xs font-mono text-primary hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary mt-2"
                      >
                        {isOpen ? t("eduHideDetails", lang) : t("eduShowDetails", lang)}
                      </button>
                      {isOpen && (
                        <div className="mt-3 pt-3 border-t border-border/40">
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {certDetails[titleKey]?.[lang] ?? ""}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}

                <div
                  className={`rounded-xl border bg-card p-5 transition-all duration-200 border-border/60 hover:border-primary/40 hover:bg-primary/5 hover:shadow-card`}
                >
                  <p className="mb-3 font-mono text-xs uppercase tracking-widest text-primary">
                    {t("eduLanguages", lang)}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["French", "English", "Bambara"].map((langName) => {
                      const active = langProficiency === langName;
                      return (
                        <button
                          key={langName}
                          type="button"
                          onClick={() => setLangProficiency(active ? null : langName)}
                          className={`inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 text-xs font-mono transition-all duration-200 ${
                            active
                              ? "bg-primary text-primary-foreground border-primary shadow-card"
                              : "border-border text-muted-foreground hover:border-primary/50 hover:bg-primary/5"
                          }`}
                        >
                          <span>{langName}</span>
                          {active && (
                            <span className="text-[10px]">
                              {get(langLevels[langName] ?? { en: "", fr: "" }, lang)}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </section>

        <section id="contact" className="scroll-mt-24 py-20">
          <ScrollReveal delay={160}>
            <div
              className="relative rounded-2xl border bg-card p-10 text-center shadow-card md:p-16 max-w-2xl mx-auto group"
              onMouseMove={handleMouseMove}
              style={
                contactGlow
                  ? ({
                      "--glow-x": `${contactGlow.x}px`,
                      "--glow-y": `${contactGlow.y}px`,
                    } as React.CSSProperties)
                  : undefined
              }
            >
              <div
                className="absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none"
                style={{
                  background: `radial-gradient(600px circle at var(--glow-x) var(--glow-y), rgba(34, 211, 238, 0.15), transparent 40%)`,
                }}
              />
              <p className="font-mono text-sm text-muted-foreground">
                {t("contactSectionLabel", lang)}
              </p>
              <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
                {t("contactTitle", lang)}
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
                {t("contactDesc", lang)}
              </p>

              <form onSubmit={handleSubmit} className="mt-10 space-y-4 text-left">
                <div className="space-y-2">
                  <label
                    htmlFor="contact-name"
                    className={`block font-mono text-sm transition-colors ${nameValid ? "text-foreground" : "text-destructive"}`}
                  >
                    {t("contactFullName", lang)}
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    required
                    onChange={handleNameChange}
                    className={`w-full rounded-lg border px-4 py-2.5 text-sm text-foreground outline-none transition-colors ${
                      nameValid
                        ? "border-border focus:border-primary focus:ring-1 focus:ring-primary"
                        : "border-destructive focus:border-destructive focus:ring-1 focus:ring-destructive"
                    } bg-background`}
                    placeholder={t("contactPlaceholderName", lang)}
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="contact-email"
                    className={`block font-mono text-sm transition-colors ${emailValid ? "text-foreground" : "text-destructive"}`}
                  >
                    {t("contactEmail", lang)}
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    onChange={handleEmailChange}
                    className={`w-full rounded-lg border px-4 py-2.5 text-sm text-foreground outline-none transition-colors ${
                      emailValid
                        ? "border-border focus:border-primary focus:ring-1 focus:ring-primary"
                        : "border-destructive focus:border-destructive focus:ring-1 focus:ring-destructive"
                    } bg-background`}
                    placeholder={t("contactPlaceholderEmail", lang)}
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="contact-message"
                    className="block font-mono text-sm text-foreground"
                  >
                    {t("contactMessage", lang)}
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    required
                    onChange={handleMessageChange}
                    className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                    placeholder={t("contactPlaceholderMessage", lang)}
                  />
                  <p className="text-[10px] text-right text-muted-foreground">
                    {messageCount} / 500
                  </p>
                </div>

                {/* Anti-spam honeypot exigé par Web3Forms */}
                <div className="hidden">
                  <input name="botcheck" type="checkbox" tabIndex={-1} aria-hidden="true" />
                </div>

                {formStatus === "error" && (
                  <p className="text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-lg px-3 py-2">
                    {formError}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={formStatus === "submitting"}
                  className={`w-full rounded-lg px-5 py-3 font-medium text-sm transition-all duration-200 ${
                    formStatus === "submitting"
                      ? "bg-primary/20 text-primary/60 cursor-not-allowed border border-primary/30"
                      : "bg-primary text-primary-foreground shadow-card hover:bg-primary/90 hover:shadow-card-hover hover:-translate-y-0.5 active:scale-[0.98]"
                  }`}
                >
                  {formStatus === "submitting" ? (
                    <>
                      <span className="inline-block w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                      {t("contactSending", lang)}
                    </>
                  ) : (
                    t("contactSendMessage", lang)
                  )}
                </button>

                {formStatus === "success" && (
                  <p className="mt-2 text-sm text-accent bg-accent/10 border border-accent/20 rounded-lg px-3 py-2 transition-all duration-300 ease-out">
                    {t("contactSuccess", lang)}
                  </p>
                )}
              </form>

              <p className="mt-10 font-mono text-xs text-muted-foreground">
                {t("contactDirect", lang)}{" "}
                <span
                  onClick={() => copyToClipboard("ibraberthe0301@gmail.com", "email")}
                  onMouseEnter={() => setCopyTooltip({ id: "email", shown: true })}
                  onMouseLeave={() => setCopyTooltip(null)}
                  className="text-primary cursor-pointer hover:underline relative"
                >
                  ibraberthe0301@gmail.com
                  {copyTooltip?.id === "email" && copyTooltip.shown && (
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 rounded bg-primary text-primary-foreground text-[10px] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                      {t("contactCopied", lang)}
                    </span>
                  )}
                </span>
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3 font-mono text-sm">
                <button
                  onClick={() => copyToClipboard("+13435588409", "phone")}
                  onMouseEnter={() => setCopyTooltip({ id: "phone", shown: true })}
                  onMouseLeave={() => setCopyTooltip(null)}
                  className={`tag relative ${copyTooltip?.id === "phone" && copyTooltip.shown ? "text-primary" : ""}`}
                >
                  {t("contactPhone", lang)}
                  {copyTooltip?.id === "phone" && copyTooltip.shown && (
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 rounded bg-primary text-primary-foreground text-[10px] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                      {t("contactCopied", lang)}
                    </span>
                  )}
                </button>
                <a
                  href="https://github.com/ibraberthe0301-ai"
                  target="_blank"
                  rel="noreferrer"
                  className="tag relative group"
                  onMouseEnter={() => setCopyTooltip({ id: "github", shown: true })}
                  onMouseLeave={() => setCopyTooltip(null)}
                >
                  GitHub
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 rounded bg-primary text-primary-foreground text-[10px] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                    {t("contactOpenGitHub", lang)}
                  </span>
                </a>
                <a
                  href="http://www.linkedin.com/in/ibrahim-berthe-588417349"
                  target="_blank"
                  rel="noreferrer"
                  className="tag relative group"
                  onMouseEnter={() => setCopyTooltip({ id: "linkedin", shown: true })}
                  onMouseLeave={() => setCopyTooltip(null)}
                >
                  LinkedIn
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 rounded bg-primary text-primary-foreground text-[10px] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                    {t("contactOpenLinkedIn", lang)}
                  </span>
                </a>
                <button
                  onClick={() => setCopyTooltip({ id: "gatineau", shown: true })}
                  onMouseEnter={() => setCopyTooltip({ id: "gatineau", shown: true })}
                  onMouseLeave={() => setCopyTooltip(null)}
                  className="tag relative"
                >
                  {t("contactGatineau", lang)}
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1.5 rounded bg-primary text-primary-foreground text-[10px] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                    {t("contactTimezone", lang)}
                  </span>
                </button>
              </div>
            </div>
          </ScrollReveal>
        </section>

        {lightbox.open && (
          <div
            className="fixed inset-0 z-50 bg-background/90 backdrop-blur-sm flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            onClick={() => setLightbox({ open: false, images: [] })}
          >
            <div
              className="relative max-w-3xl max-h-[85vh] rounded-xl border border-primary/30 shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setLightbox({ open: false, images: [] })}
                className="absolute -top-10 -right-4 rounded-full bg-background p-2 text-foreground hover:bg-accent transition-colors"
                aria-label="Close"
              >
                ✕
              </button>
              <div className="flex items-center gap-4 p-6 max-h-[70vh] overflow-y-auto">
                {lightbox.images.map((img, i) => (
                  <button
                    key={img.src}
                    onClick={() => setLightbox({ open: false, images: [] })}
                    className={`aspect-[3/4] w-20 h-28 rounded-lg object-cover border border-border/60 ${
                      i === 0
                        ? "ring-2 ring-primary"
                        : "opacity-60 hover:opacity-100 transition-opacity"
                    }`}
                    aria-label={img.alt}
                  >
                    <img
                      src={img.src}
                      alt={img.alt}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </button>
                ))}
              </div>
              <div className="p-6">
                <img
                  src={lightbox.images[0]?.src}
                  alt={lightbox.images[0]?.alt}
                  className="w-full max-h-[60vh] object-contain rounded-lg border border-primary/30"
                />
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="border-t py-8 text-center font-mono text-xs text-muted-foreground">
        {t("contactFooter", lang).replace("{{year}}", String(new Date().getFullYear()))}
      </footer>
    </div>
  );
}
