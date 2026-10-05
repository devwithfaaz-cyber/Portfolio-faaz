import React from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { AboutSection } from "@/components/AboutSection";
import { ProjectShowcase } from "@/components/ProjectShowcase";
import { EngineeringSection } from "@/components/EngineeringSection";
import { ToolkitSection } from "@/components/ToolkitSection";
import { EducationSection } from "@/components/EducationSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ScrollProgress } from "@/components/ScrollProgress";
import { BackToTop } from "@/components/BackToTop";

export default function Home() {
  return (
    <>
      {/* Top thin scroll progress indicator */}
      <ScrollProgress />

      {/* Sticky navigation */}
      <Navbar />

      <main className="min-h-screen">
        {/* Editorial Hero with technical network topology visual & stats */}
        <Hero />

        {/* 01 / ABOUT with asymmetric editorial layout & core principles */}
        <AboutSection />

        {/* 02 / SELECTED WORK with alternating layouts & deep technical mockups */}
        <ProjectShowcase />

        {/* 03 / ENGINEERING with 3 large areas & philosophy approach statements */}
        <EngineeringSection />

        {/* 04 / TOOLKIT with categorized technologies & subtle role inspect */}
        <ToolkitSection />

        {/* 05 / EDUCATION with minimal timeline & certifications */}
        <EducationSection />

        {/* 06 / CONTACT with direct info, social channels, and responsive form */}
        <ContactSection />
      </main>

      {/* Minimal editorial footer */}
      <Footer />

      {/* Floating theme toggle fixed to bottom-right corner */}
      <ThemeToggle />

      {/* Minimal back to top button */}
      <BackToTop />
    </>
  );
}
