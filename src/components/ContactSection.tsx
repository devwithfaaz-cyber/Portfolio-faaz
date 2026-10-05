"use client";

import React, { useState } from "react";
import { PERSONAL_INFO } from "@/data/portfolioData";
import { ArrowRight, CheckCircle2, AlertCircle, Loader2, ArrowUpRight, Check, Copy } from "lucide-react";

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [emailCopied, setEmailCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PERSONAL_INFO.email);
      setEmailCopied(true);
    } catch {
      setEmailCopied(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (status === "error") {
      setStatus("idle");
      setErrorMessage("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Client-side quick validation
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      setStatus("error");
      setErrorMessage("Please enter your name (at least 2 characters).");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      setStatus("error");
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    if (!formData.subject.trim() || formData.subject.trim().length < 2) {
      setStatus("error");
      setErrorMessage("Please provide a subject for your message.");
      return;
    }

    if (!formData.message.trim() || formData.message.trim().length < 10) {
      setStatus("error");
      setErrorMessage("Please write a message of at least 10 characters.");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to submit message.");
      }

      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err: unknown) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error
          ? err.message
          : "An unexpected error occurred. Please try again or email directly."
      );
    }
  };

  return (
    <section id="contact" className="py-24 border-b border-[var(--border)]">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-16 items-start">
          {/* Left Column: Direct Info & Editorial */}
          <div className="lg:col-span-5" data-reveal>
            <span className="mono-tag text-xs font-semibold text-[var(--accent)] tracking-wider">
              06 / CONTACT
            </span>

            <h2 className="font-display mt-3 text-3xl sm:text-4xl font-normal tracking-tight text-[var(--fg)]">
              Have a project in mind or an opportunity?
            </h2>

            <p className="mt-4 text-base text-[var(--fg-muted)] leading-relaxed font-light">
              &ldquo;I&apos;m always open to discussing web development projects, creative ideas, or joining an engineering team.&rdquo;
            </p>

            {/* Direct Email Callout */}
            <div className="mt-8 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5">
              <span className="mono-tag text-[10px] text-[var(--fg-subtle)]">
                Direct Contact
              </span>
              <div className="mt-1 flex flex-wrap items-center justify-between gap-2">
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="min-w-0 break-all font-display text-sm font-medium text-[var(--fg)] hover:text-[var(--accent)] transition-colors sm:text-base"
                >
                  {PERSONAL_INFO.email}
                </a>
                <button
                  type="button"
                  onClick={() => void copyEmail()}
                  aria-label={emailCopied ? "Email address copied" : "Copy email address"}
                  className="inline-flex min-h-11 shrink-0 items-center gap-1.5 rounded-md px-2 text-xs font-medium text-[var(--fg-muted)] transition-colors hover:text-[var(--accent)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                >
                  {emailCopied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                  <span aria-live="polite">{emailCopied ? "Copied ✓" : "Copy"}</span>
                </button>
              </div>
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-[var(--accent)] hover:underline"
              >
                <span>Email Directly</span>
                <ArrowRight className="h-3 w-3" />
              </a>
            </div>

            {/* Social channels: strictly GitHub, LinkedIn, Instagram */}
            <div className="mt-8 pt-6 border-t border-[var(--border)]">
              <span className="mono-tag text-xs text-[var(--fg-subtle)]">
                Social Channels
              </span>
              <div className="mt-3 flex flex-wrap gap-4 text-xs font-medium text-[var(--fg-muted)]">
                {PERSONAL_INFO.socials.github && (
                  <a
                    href={PERSONAL_INFO.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link inline-flex items-center gap-1 hover:text-[var(--fg)] transition-colors"
                  >
                    GitHub <ArrowUpRight className="h-3 w-3" />
                  </a>
                )}
                {PERSONAL_INFO.socials.linkedin && (
                  <a
                    href={PERSONAL_INFO.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link inline-flex items-center gap-1 hover:text-[var(--fg)] transition-colors"
                  >
                    LinkedIn <ArrowUpRight className="h-3 w-3" />
                  </a>
                )}
                {PERSONAL_INFO.socials.instagram && (
                  <a
                    href={PERSONAL_INFO.socials.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link inline-flex items-center gap-1 hover:text-[var(--fg)] transition-colors"
                  >
                    Instagram <ArrowUpRight className="h-3 w-3" />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7" data-reveal data-reveal-delay="100">
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8 shadow-xs">
              <h3 className="font-display text-xl font-normal text-[var(--fg)] mb-6">
                Send Me a Message
              </h3>

              {status === "success" ? (
                <div
                  role="status"
                  className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-6 text-center"
                >
                  <CheckCircle2 className="mx-auto h-8 w-8 text-emerald-500" />
                  <h4 className="mt-3 text-base font-medium text-[var(--fg)]">
                    Message Sent Successfully
                  </h4>
                  <p className="mt-1 text-xs text-[var(--fg-muted)] font-light max-w-md mx-auto">
                    Thank you for reaching out. I have received your message and will review it promptly.
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    className="mt-5 text-xs font-medium text-[var(--accent)] underline hover:opacity-80"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                  {status === "error" && (
                    <div
                      role="alert"
                      className="flex items-start gap-2.5 rounded-lg border border-rose-500/30 bg-rose-500/10 p-3 text-xs text-rose-600 dark:text-rose-400"
                    >
                      <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="mono-tag block text-[11px] text-[var(--fg-muted)] mb-1.5"
                      >
                        Name <span className="text-[var(--accent)]">*</span>
                      </label>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        disabled={status === "loading"}
                        placeholder="Your name"
                        className="w-full rounded-lg border border-[var(--border)] bg-[var(--bg)] px-3.5 py-2.5 text-base text-[var(--fg)] placeholder:text-[var(--fg-subtle)] focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)] disabled:opacity-50 sm:text-xs"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="contact-email"
                        className="mono-tag block text-[11px] text-[var(--fg-muted)] mb-1.5"
                      >
                        Email <span className="text-[var(--accent)]">*</span>
                      </label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        disabled={status === "loading"}
                        placeholder="you@domain.com"
                        className="w-full rounded-lg border border-[var(--border)] bg-[var(--bg)] px-3.5 py-2.5 text-base text-[var(--fg)] placeholder:text-[var(--fg-subtle)] focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)] disabled:opacity-50 sm:text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-subject"
                      className="mono-tag block text-[11px] text-[var(--fg-muted)] mb-1.5"
                    >
                      Subject <span className="text-[var(--accent)]">*</span>
                    </label>
                    <input
                      id="contact-subject"
                      name="subject"
                      type="text"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      disabled={status === "loading"}
                      placeholder="e.g. Full-Stack Project Inquiry"
                      className="w-full rounded-lg border border-[var(--border)] bg-[var(--bg)] px-3.5 py-2.5 text-base text-[var(--fg)] placeholder:text-[var(--fg-subtle)] focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)] disabled:opacity-50 sm:text-xs"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-message"
                      className="mono-tag block text-[11px] text-[var(--fg-muted)] mb-1.5"
                    >
                      Message <span className="text-[var(--accent)]">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      required
                      disabled={status === "loading"}
                      placeholder="Tell me about your project, goals, or requirements..."
                      className="w-full resize-y rounded-lg border border-[var(--border)] bg-[var(--bg)] px-3.5 py-2.5 text-base text-[var(--fg)] placeholder:text-[var(--fg-subtle)] focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)] disabled:opacity-50 sm:text-xs"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="group inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[var(--fg)] px-5 py-3 text-xs font-medium text-[var(--bg)] transition-all hover:bg-[var(--accent)] hover:text-white disabled:opacity-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                  >
                    {status === "loading" ? (
                      <>
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        <span>Sending message...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
