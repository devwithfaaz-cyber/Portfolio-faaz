import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { CursorGlow } from "@/components/interactive/CursorGlow";
import { CustomCursor } from "@/components/interactive/CustomCursor";
import { ClickEffects } from "@/components/interactive/ClickEffects";
import { ScrollReveal } from "@/components/interactive/ScrollReveal";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf9f6" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0c0e" },
  ],
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Faaz Mirza — Software Developer & Full-Stack Engineer",
  description:
    "Software developer building clean, high-performance full-stack digital experiences with modern web technologies, thoughtful code, and clean architecture.",
  keywords: [
    "Faaz Mirza",
    "Software Developer",
    "Full-Stack Engineer",
    "Next.js",
    "React",
    "PostgreSQL",
    "Node.js",
    "TypeScript",
    "Pakistan",
  ],
  authors: [{ name: "Faaz Mirza", url: "https://faazmirza.dev" }],
  creator: "Faaz Mirza",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://faazmirza.dev"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://faazmirza.dev",
    siteName: "Faaz Mirza Portfolio",
    title: "Faaz Mirza — Software Developer & Full-Stack Engineer",
    description:
      "Software developer building clean, high-performance full-stack digital experiences with modern web technologies, thoughtful code, and clean architecture.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Faaz Mirza — Software Developer & Full-Stack Engineer",
    description:
      "Software developer building clean, high-performance full-stack digital experiences with modern web technologies, thoughtful code, and clean architecture.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

// Structured JSON-LD Data for SEO
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Faaz Mirza",
  jobTitle: "Software Developer & Creative Problem Solver",
  description:
    "Software developer building clean, high-performance full-stack digital experiences with modern web technologies, thoughtful code, and clean architecture.",
  nationality: "Pakistani",
  url: "https://faazmirza.dev",
  sameAs: [
    "https://github.com/faazmirza",
    "https://instagram.com/faazmirza_",
  ],
  knowsAbout: [
    "Next.js",
    "React",
    "TypeScript",
    "Node.js",
    "PostgreSQL",
    "Redis",
    "Clean Architecture",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full`}
    >
      <head>
        {/* Anti-FOUC theme hydration script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('faaz_theme');
                  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  var theme = saved || (prefersDark ? 'dark' : 'light');
                  document.documentElement.setAttribute('data-theme', theme);
                  if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[var(--bg)] text-[var(--fg)] relative">
        <ThemeProvider>
          <AnimatedBackground />
          <CursorGlow />
          <CustomCursor />
          <ClickEffects />
          <ScrollReveal />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
