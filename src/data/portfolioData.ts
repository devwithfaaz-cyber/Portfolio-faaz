export interface Project {
  id: string;
  slug: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  technologies: string[];
  githubUrl: string;
  demoUrl?: string;
  featured: boolean;
  overview: string;
  problem: string;
  solution: string;
  features: string[];
  architecture: string;
  challenges: string;
  outcome: string;
}

export interface Principle {
  number: string;
  title: string;
  description: string;
}

export interface TechnologyGroup {
  category: string;
  skills: { name: string; role: string }[];
}

export interface EducationItem {
  degree: string;
  period: string;
  institution: string;
  location: string;
  focus: string[];
}

export interface CertificationItem {
  name: string;
  platform: string;
  instructor?: string;
}

export const PERSONAL_INFO = {
  name: "Faaz Mirza",
  role: "Software Developer & Creative Problem Solver",
  location: "Pakistan · Remote Available",
  availability: "Available for opportunities & collaboration",
  experienceYears: "3+",
  projectsCount: "20+",
  techCount: "10+",
  email: "faazmirza2862@gmail.com",
  socials: {
    github: process.env.NEXT_PUBLIC_GITHUB_URL || "https://github.com/devwithfaaz-cyber",
    linkedin: "https://www.linkedin.com/in/faaz-ali-604b89442/",
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "https://www.instagram.com/faaz.ali_/",
    whatsapp: "https://wa.me/923002414320",
  },
  introduction:
    "I build clean, high-performance, full-stack digital experiences. Passionate about turning complex requirements into scalable applications with modern web technologies, thoughtful code, and clean architecture.",
  about:
    "I'm Faaz Mirza, a software developer dedicated to crafting efficient digital products. My development journey is driven by curiosity, analytical thinking, and a commitment to writing maintainable code that scales. Whether I'm designing PostgreSQL databases, writing REST API endpoints in Node.js/Next.js, or crafting pixel-perfect interfaces, I focus on performance, user experience, and detail.",
};

export const PRINCIPLES: Principle[] = [
  {
    number: "01",
    title: "Performance First",
    description: "Optimized code execution, fast database queries, and lightweight assets.",
  },
  {
    number: "02",
    title: "Detail Oriented",
    description: "From pixel-perfect responsiveness to strict backend data validation.",
  },
  {
    number: "03",
    title: "Collaborative",
    description: "Open communication, clear documentation, and clean version control.",
  },
  {
    number: "04",
    title: "Continuous Learning",
    description: "Constantly exploring new technology stacks, architecture patterns, and tools.",
  },
];

export const PROJECTS: Project[] = [
  {
    id: "proj-1",
    slug: "ai-code-assistant",
    number: "01",
    title: "AI Code Assistant & Analytics Dashboard",
    tagline: "Full-stack developer productivity platform with real-time code analysis",
    description:
      "Full-stack developer productivity platform with real-time code analysis and AI insights.",
    technologies: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "Tailwind CSS"],
    githubUrl: "https://github.com/faazmirza/ai-code-assistant",
    demoUrl: "https://ai-code-assistant.demo.app",
    featured: true,
    overview:
      "A developer productivity tool built to analyze source code repositories, detect syntax bottlenecks, and provide contextual algorithmic optimizations with structured visualization.",
    problem:
      "Developers often encounter repetitive code review bottlenecks and lack unified, real-time insights into codebase complexity and test coverage across distributed repositories.",
    solution:
      "Engineered a Next.js and Node.js full-stack platform backed by PostgreSQL that parses code metrics, provides streaming analysis, and visualizes codebase health with sub-second dashboard rendering.",
    features: [
      "Real-time syntax and complexity parsing engine",
      "Interactive code analytics dashboard with granular filters",
      "PostgreSQL relational schema optimized for relational querying",
      "Clean TypeScript interfaces across server and client boundaries",
      "Accessible dark/light UI design system built with Tailwind CSS",
    ],
    architecture:
      "Next.js App Router serves as the unified application shell, interfacing with Node.js background workers and a PostgreSQL database pool for persistent telemetry data.",
    challenges:
      "Managing live telemetry updates without overwhelming the client thread or causing unnecessary React re-renders.",
    outcome:
      "Achieved sub-100ms API response times for repository metric queries and created an intuitive, minimal developer experience.",
  },
  {
    id: "proj-2",
    slug: "ecommerce-cloud-engine",
    number: "02",
    title: "E-Commerce Cloud Engine",
    tagline: "Scalable multi-tenant e-commerce platform with Stripe & Redis",
    description:
      "Scalable multi-tenant e-commerce platform with Stripe payment gateway & inventory management.",
    technologies: ["React", "Node.js", "PostgreSQL", "Redis", "Stripe API"],
    githubUrl: "https://github.com/faazmirza/ecommerce-cloud-engine",
    demoUrl: "https://ecommerce-engine.demo.app",
    featured: true,
    overview:
      "A resilient e-commerce infrastructure supporting multi-store tenancy, secure asynchronous Stripe checkout workflows, real-time inventory locking, and high-throughput caching.",
    problem:
      "High checkout concurrency frequently results in oversold inventory and slow cart calculation when inventory relies entirely on synchronous database transactions.",
    solution:
      "Implemented a two-tier data architecture using Redis for sub-millisecond atomic stock holds and a transactional PostgreSQL schema for persistent order reconciliation and audit trails.",
    features: [
      "Atomic inventory hold mechanism powered by Redis key expiry",
      "Secure end-to-end Stripe payment webhook processing with idempotent validation",
      "Role-based merchant dashboard for product catalog management",
      "Responsive React client with optimistic UI updates and instant cart synchronization",
      "Normalized SQL tables with strict foreign keys and automated indexes",
    ],
    architecture:
      "React frontend communicating over secure REST API endpoints to a Node.js runtime, utilizing Redis for ephemeral state and PostgreSQL for durable ledger storage.",
    challenges:
      "Handling idempotent payment webhook retries without duplicating order creation or corrupting customer stock counts.",
    outcome:
      "Delivered a dependable checkout engine capable of maintaining inventory integrity under concurrent load tests.",
  },
  {
    id: "proj-3",
    slug: "portfolio-cms-engine",
    number: "03",
    title: "Personal Portfolio & CMS Engine",
    tagline: "Full-stack portfolio with dynamic PostgreSQL project management & JWT",
    description:
      "Full-stack developer portfolio with dynamic PostgreSQL project management and admin authentication.",
    technologies: ["Next.js 15", "React", "PostgreSQL", "Neon", "JWT Auth"],
    githubUrl: "https://github.com/faazmirza/portfolio",
    demoUrl: "https://faazmirza.dev",
    featured: true,
    overview:
      "An editorial developer platform featuring server-side rendered projects, a protected administrative portal, contact message routing, and a lightweight theme system.",
    problem:
      "Hard-coded portfolio websites require manual code changes for every project update and lack structured communication channels for client inquiries.",
    solution:
      "Built a unified Next.js application with Neon PostgreSQL persistence, JWT-secured administrative routes, and an editorial design system celebrating minimalism and typography.",
    features: [
      "Dynamic project content managed through a secure administrative portal",
      "Integrated contact endpoint with input validation and message storage",
      "Floating zero-flicker theme toggle with CSS variable design tokens",
      "Interactive technical network architecture visualizer in hero section",
      "Full SEO optimization with OpenGraph metadata and JSON-LD schema",
    ],
    architecture:
      "Next.js App Router with server components, server actions/REST routes for admin tasks, connected to Neon serverless PostgreSQL with connection pooling.",
    challenges:
      "Guaranteeing zero layout shift and instantaneous theme transition while strictly adhering to system color preferences.",
    outcome:
      "Created a fast, distinctive, and handcrafted digital identity that balances minimalism with full-stack capability.",
  },
];

export const ENGINEERING_AREAS = [
  {
    number: "01",
    title: "Backend & Database",
    description:
      "Designing efficient SQL database schemas, REST APIs, session authentication, and server validation.",
    details: [
      "Relational modeling in PostgreSQL with strict constraints and indexes",
      "RESTful API design with clean input validation and defensive error handling",
      "Stateless JWT and secure session-based authentication mechanisms",
      "Serverless database connectivity with Neon and Redis caching layers",
    ],
  },
  {
    number: "02",
    title: "Frontend Mastery",
    description:
      "Crafting pixel-perfect, accessible, and responsive user interfaces with smooth theme transitions.",
    details: [
      "Modern React architecture with server & client component boundary discipline",
      "Responsive typography and fluid layouts matching precision design specifications",
      "Centralized CSS token system for seamless dark/light theme switching",
      "Accessible markup following WCAG standards and keyboard navigation semantics",
    ],
  },
  {
    number: "03",
    title: "Performance & SEO",
    description:
      "Enforcing strict performance budgets, Core Web Vitals optimization, and structured metadata.",
    details: [
      "Core Web Vitals tuning: minimal LCP, zero CLS, and swift FID/INP",
      "Lightweight SVG and code-based visuals replacing heavy asset payloads",
      "Automated OpenGraph images, sitemaps, and Schema.org structured data",
      "Respecting prefers-reduced-motion and system-level user preferences",
    ],
  },
];

export const ENGINEERING_APPROACH = [
  { title: "Clean Architecture", statement: "Decoupling business logic from framework layers to ensure longevity." },
  { title: "Maintainable Code", statement: "Writing clear, self-documenting code with comprehensive TypeScript contracts." },
  { title: "Performance First", statement: "Treating speed as a core user feature through minimal payloads and fast queries." },
  { title: "User Experience", statement: "Designing intentional interactions with calm visual rhythm and zero clutter." },
  { title: "Analytical Thinking", statement: "Deconstructing ambiguous problems into testable, scalable technical milestones." },
  { title: "Continuous Learning", statement: "Evaluating modern tooling against real-world trade-offs before adoption." },
  { title: "Scalable Systems", statement: "Structuring databases and APIs to scale gracefully as user volume expands." },
  { title: "Thoughtful Engineering", statement: "Prioritizing reliability, security, and precision over flashy gimmicks." },
];

export const TOOLKIT_GROUPS: TechnologyGroup[] = [
  {
    category: "Frontend",
    skills: [
      { name: "React", role: "Component Architecture & Hooks" },
      { name: "Next.js", role: "Full-Stack App Router & SSR" },
      { name: "TypeScript", role: "Type Safety & Interfaces" },
      { name: "Tailwind CSS", role: "Utility-First Design Tokens" },
    ],
  },
  {
    category: "Backend",
    skills: [
      { name: "Node.js", role: "Server Runtime & Microservices" },
      { name: "REST APIs", role: "Endpoint Design & Middleware" },
    ],
  },
  {
    category: "Database",
    skills: [
      { name: "PostgreSQL", role: "Relational Queries & Schemas" },
      { name: "Redis", role: "In-Memory Caching & State" },
      { name: "Neon", role: "Serverless Postgres Integration" },
    ],
  },
  {
    category: "Languages",
    skills: [
      { name: "TypeScript", role: "Primary Development Language" },
      { name: "JavaScript", role: "Core Web Language (ESNext)" },
      { name: "Python", role: "Scripting & Backend Utilities" },
    ],
  },
  {
    category: "Services & Authentication",
    skills: [
      { name: "Stripe", role: "Payment Gateways & Webhooks" },
      { name: "JWT", role: "Token-Based User Authorization" },
    ],
  },
];

export const EDUCATION: EducationItem[] = [
  {
    degree: "Intermediate — ICS",
    period: "2025 – 2027",
    institution: "Informatics Group Of Colleges",
    location: "Jaranwala, Pakistan",
    focus: ["Mathematics", "Physics", "Computer Science"],
  },
];

export const CERTIFICATIONS: CertificationItem[] = [
  {
    name: "Web Developer Bootcamp",
    platform: "Udemy",
    instructor: "Colt Steele",
  },
  {
    name: "Python for Everybody",
    platform: "Coursera",
    instructor: "University of Michigan",
  },
  {
    name: "Responsive Web Design",
    platform: "freeCodeCamp",
  },
];
