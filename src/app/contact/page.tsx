import React from "react";
import { ContactSection } from "@/components/ContactSection";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ScrollProgress } from "@/components/ScrollProgress";
import { BackToTop } from "@/components/BackToTop";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact & Collaboration — Faaz Mirza",
  description:
    "Get in touch with Faaz Mirza for web development projects, creative collaboration, or engineering opportunities.",
};

export default function ContactPage() {
  return (
    <>
      <ScrollProgress />
      <Navbar />

      <main className="min-h-screen pt-24 pb-12">
        <ContactSection />
      </main>

      <Footer />
      <ThemeToggle />
      <BackToTop />
    </>
  );
}
