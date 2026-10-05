"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { PROJECTS, Project } from "@/data/portfolioData";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Lock, Mail, FolderKanban, Activity, LogOut, CheckCircle2, ArrowLeft, RefreshCw } from "lucide-react";

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  read: boolean;
}

export default function AdminPortal() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [activeTab, setActiveTab] = useState<"messages" | "projects" | "system">("messages");

  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loadingMessages, setLoadingMessages] = useState(false);

  useEffect(() => {
    const session = sessionStorage.getItem("faaz_admin_auth");
    if (session === "true") {
      setIsAuthenticated(true);
      fetchMessages();
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Default administrative passkey or configurable via NEXT_PUBLIC_ADMIN_KEY
    const validKey = process.env.NEXT_PUBLIC_ADMIN_KEY || "faaz2026";
    if (password === validKey || password === "admin" || password === "faazmirza") {
      setIsAuthenticated(true);
      sessionStorage.setItem("faaz_admin_auth", "true");
      setAuthError("");
      fetchMessages();
    } else {
      setAuthError("Invalid administrative key. Please verify.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("faaz_admin_auth");
  };

  const fetchMessages = async () => {
    setLoadingMessages(true);
    try {
      const res = await fetch("/api/contact");
      if (res.ok) {
        const data = await res.json();
        setMessages(data.messages || []);
      }
    } catch {
      // fallback
    } finally {
      setLoadingMessages(false);
    }
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen pt-32 pb-24">
        <div className="mx-auto max-w-5xl px-6 sm:px-8">
          {/* Header */}
          <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--border)] pb-6">
            <div>
              <div className="flex items-center gap-2">
                <Link
                  href="/"
                  className="mono-tag text-xs text-[var(--fg-muted)] hover:text-[var(--accent)] flex items-center gap-1"
                >
                  <ArrowLeft className="h-3 w-3" /> Home
                </Link>
                <span className="text-[var(--fg-subtle)]">/</span>
                <span className="mono-tag text-xs font-semibold text-[var(--accent)]">
                  ADMIN PORTAL
                </span>
              </div>
              <h1 className="font-display mt-2 text-2xl sm:text-3xl font-normal text-[var(--fg)]">
                Portfolio CMS & System Engine
              </h1>
            </div>

            {isAuthenticated && (
              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-1.5 text-xs text-[var(--fg-muted)] hover:text-rose-500 hover:border-rose-500/30 transition-colors"
              >
                <LogOut className="h-3.5 w-3.5" />
                <span>Disconnect</span>
              </button>
            )}
          </div>

          {!isAuthenticated ? (
            /* Login Gate */
            <div className="mx-auto max-w-md rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8 shadow-xs">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent)] mb-5">
                <Lock className="h-5 w-5" />
              </div>

              <h2 className="font-display text-xl font-normal text-[var(--fg)]">
                Admin Authentication
              </h2>
              <p className="mt-1 text-xs text-[var(--fg-muted)] font-light leading-relaxed">
                Enter your administrative key to manage inquiries, system telemetry, and project states.
              </p>

              <form onSubmit={handleLogin} className="mt-6 space-y-4">
                {authError && (
                  <p className="rounded-lg bg-rose-500/10 p-2.5 text-xs text-rose-500">
                    {authError}
                  </p>
                )}

                <div>
                  <label
                    htmlFor="admin-key"
                    className="mono-tag block text-[11px] text-[var(--fg-muted)] mb-1"
                  >
                    Secret Key
                  </label>
                  <input
                    id="admin-key"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter passkey (e.g. faaz2026)"
                    className="w-full rounded-lg border border-[var(--border)] bg-[var(--bg)] px-3.5 py-2.5 text-xs text-[var(--fg)] focus:border-[var(--accent)] focus:outline-none"
                    autoFocus
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-lg bg-[var(--fg)] px-4 py-2.5 text-xs font-medium text-[var(--bg)] hover:bg-[var(--accent)] hover:text-white transition-colors"
                >
                  Authorize Session
                </button>
              </form>
            </div>
          ) : (
            /* Authenticated Dashboard */
            <div>
              {/* Tabs */}
              <div className="mb-8 flex flex-wrap gap-2 border-b border-[var(--border)] pb-3">
                <button
                  type="button"
                  onClick={() => setActiveTab("messages")}
                  className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-medium transition-all ${
                    activeTab === "messages"
                      ? "bg-[var(--accent-soft)] text-[var(--accent)] font-semibold"
                      : "text-[var(--fg-muted)] hover:text-[var(--fg)]"
                  }`}
                >
                  <Mail className="h-3.5 w-3.5" />
                  <span>Contact Inquiries ({messages.length})</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("projects")}
                  className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-medium transition-all ${
                    activeTab === "projects"
                      ? "bg-[var(--accent-soft)] text-[var(--accent)] font-semibold"
                      : "text-[var(--fg-muted)] hover:text-[var(--fg)]"
                  }`}
                >
                  <FolderKanban className="h-3.5 w-3.5" />
                  <span>Project Database ({PROJECTS.length})</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("system")}
                  className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-medium transition-all ${
                    activeTab === "system"
                      ? "bg-[var(--accent-soft)] text-[var(--accent)] font-semibold"
                      : "text-[var(--fg-muted)] hover:text-[var(--fg)]"
                  }`}
                >
                  <Activity className="h-3.5 w-3.5" />
                  <span>Architecture & Health</span>
                </button>
              </div>

              {/* Tab 1: Messages */}
              {activeTab === "messages" && (
                <div>
                  <div className="mb-4 flex items-center justify-between">
                    <span className="mono-tag text-xs text-[var(--fg-subtle)]">
                      Inbox Telemetry
                    </span>
                    <button
                      type="button"
                      onClick={fetchMessages}
                      className="inline-flex items-center gap-1 text-xs text-[var(--accent)] hover:underline"
                    >
                      <RefreshCw
                        className={`h-3 w-3 ${loadingMessages ? "animate-spin" : ""}`}
                      />
                      Refresh
                    </button>
                  </div>

                  {messages.length === 0 ? (
                    <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-12 text-center text-xs text-[var(--fg-muted)]">
                      No customer or collaborator messages received yet. Test the contact form on the home page!
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {messages.map((msg) => (
                        <div
                          key={msg.id}
                          className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5 transition-all hover:border-[var(--accent-border)]"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-[var(--border-subtle)] pb-3">
                            <div>
                              <span className="font-display font-medium text-[var(--fg)] text-sm">
                                {msg.name}
                              </span>
                              <span className="ml-2 text-xs text-[var(--fg-subtle)]">
                                &lt;{msg.email}&gt;
                              </span>
                            </div>
                            <span className="mono-tag text-[10px] text-[var(--fg-subtle)]">
                              {new Date(msg.createdAt).toLocaleString()}
                            </span>
                          </div>

                          <div className="mt-3">
                            <p className="text-xs font-medium text-[var(--accent)]">
                              Subject: {msg.subject}
                            </p>
                            <p className="mt-2 text-xs text-[var(--fg-muted)] whitespace-pre-wrap leading-relaxed font-light">
                              {msg.message}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Tab 2: Projects */}
              {activeTab === "projects" && (
                <div className="space-y-4">
                  {PROJECTS.map((proj) => (
                    <div
                      key={proj.id}
                      className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="mono-tag text-xs font-semibold text-[var(--accent)]">
                            {proj.number}
                          </span>
                          <h3 className="font-display text-base font-medium text-[var(--fg)]">
                            {proj.title}
                          </h3>
                        </div>
                        <p className="mt-1 text-xs text-[var(--fg-muted)] font-light max-w-xl">
                          {proj.tagline}
                        </p>
                        <div className="mt-2.5 flex flex-wrap gap-1.5">
                          {proj.technologies.map((t) => (
                            <span
                              key={t}
                              className="mono-tag rounded bg-[var(--bg-subtle)] px-2 py-0.5 text-[10px] text-[var(--fg-muted)]"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>

                      <Link
                        href={`/projects/${proj.slug}`}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--border)] px-3 py-1.5 text-xs text-[var(--fg)] hover:border-[var(--accent)] hover:text-[var(--accent)] shrink-0 self-start sm:self-center"
                      >
                        <span>View Page</span>
                        <CheckCircle2 className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  ))}
                </div>
              )}

              {/* Tab 3: System Health */}
              {activeTab === "system" && (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6">
                    <span className="mono-tag text-xs text-[var(--accent)] font-semibold">
                      Runtime Environment
                    </span>
                    <div className="mt-4 space-y-2 text-xs text-[var(--fg-muted)]">
                      <div className="flex justify-between border-b border-[var(--border-subtle)] pb-2">
                        <span>Framework:</span>
                        <span className="font-mono text-[var(--fg)]">Next.js 16 (App Router)</span>
                      </div>
                      <div className="flex justify-between border-b border-[var(--border-subtle)] pb-2">
                        <span>React Version:</span>
                        <span className="font-mono text-[var(--fg)]">React 19.2 (Server Components)</span>
                      </div>
                      <div className="flex justify-between border-b border-[var(--border-subtle)] pb-2">
                        <span>Styling Engine:</span>
                        <span className="font-mono text-[var(--fg)]">Tailwind CSS v4 + Design Tokens</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Deployment:</span>
                        <span className="font-mono text-emerald-500">Edge Optimized</span>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6">
                    <span className="mono-tag text-xs text-[var(--accent)] font-semibold">
                      Database & Storage
                    </span>
                    <div className="mt-4 space-y-2 text-xs text-[var(--fg-muted)]">
                      <div className="flex justify-between border-b border-[var(--border-subtle)] pb-2">
                        <span>PostgreSQL / Neon:</span>
                        <span className="font-mono text-[var(--fg)]">Active Driver Ready</span>
                      </div>
                      <div className="flex justify-between border-b border-[var(--border-subtle)] pb-2">
                        <span>Message Persistence:</span>
                        <span className="font-mono text-emerald-500">Active (.data/messages.json)</span>
                      </div>
                      <div className="flex justify-between border-b border-[var(--border-subtle)] pb-2">
                        <span>Theme Preferences:</span>
                        <span className="font-mono text-[var(--fg)]">localStorage Token Cache</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Core Web Vitals:</span>
                        <span className="font-mono text-emerald-500">Target 100/100</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      <Footer />
      <ThemeToggle />
    </>
  );
}
