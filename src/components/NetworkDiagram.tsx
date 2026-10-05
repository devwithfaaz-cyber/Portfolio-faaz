"use client";

import React, { useState } from "react";
import { Layers, Database, Cpu, Globe, Server, CheckCircle2 } from "lucide-react";

interface NodeData {
  id: string;
  name: string;
  label: string;
  role: string;
  specs: string[];
  x: number;
  y: number;
  icon: React.ElementType;
}

const NODES: NodeData[] = [
  {
    id: "architecture",
    name: "Architecture",
    label: "Core",
    role: "System Design & Orchestration",
    specs: ["Clean Architecture", "Modular Services", "Type Invariants"],
    x: 50,
    y: 50,
    icon: Layers,
  },
  {
    id: "frontend",
    name: "Frontend",
    label: "Client",
    role: "Next.js & React Interface Layer",
    specs: ["Server Components", "Tailwind Design Tokens", "Sub-100ms INP"],
    x: 20,
    y: 26,
    icon: Globe,
  },
  {
    id: "api",
    name: "API",
    label: "Gateway",
    role: "REST & Authorization Endpoints",
    specs: ["JWT Auth Validation", "JSON Rate Limiting", "Schema Parsers"],
    x: 80,
    y: 26,
    icon: Cpu,
  },
  {
    id: "backend",
    name: "Backend",
    label: "Server",
    role: "Node.js Asynchronous Runtime",
    specs: ["Event Loops", "Background Jobs", "Secure Session Handlers"],
    x: 22,
    y: 76,
    icon: Server,
  },
  {
    id: "database",
    name: "Database",
    label: "Storage",
    role: "PostgreSQL & Redis Cache Engine",
    specs: ["Normalized SQL", "Neon Connection Pool", "Redis Ephemeral Keys"],
    x: 78,
    y: 76,
    icon: Database,
  },
];

const CONNECTIONS = [
  { from: "architecture", to: "frontend" },
  { from: "architecture", to: "api" },
  { from: "architecture", to: "backend" },
  { from: "architecture", to: "database" },
  { from: "frontend", to: "api" },
  { from: "api", to: "backend" },
  { from: "backend", to: "database" },
];

export function NetworkDiagram() {
  const [activeNodeId, setActiveNodeId] = useState<string>("architecture");

  const activeNode = NODES.find((n) => n.id === activeNodeId) || NODES[0];

  return (
    <div className="relative w-full rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-sm transition-all duration-300">
      {/* Top micro status bar */}
      <div className="mb-4 flex items-center justify-between border-b border-[var(--border-subtle)] pb-3">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="ping-minimal absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
          </span>
          <span className="mono-tag text-[10px] text-[var(--fg-muted)]">
            API Topology
          </span>
        </div>
        <div className="text-right">
          <span className="mono-tag text-[10px] text-[var(--accent)] font-semibold">
            {activeNode.name} Active
          </span>
        </div>
      </div>

      {/* SVG Canvas for interactive nodes & connections */}
      <div className="relative h-[280px] w-full sm:h-[320px]">
        <svg
          viewBox="0 0 100 100"
          className="absolute inset-0 h-full w-full overflow-visible pointer-events-none"
          preserveAspectRatio="none"
        >
          {CONNECTIONS.map((conn) => {
            const source = NODES.find((n) => n.id === conn.from)!;
            const target = NODES.find((n) => n.id === conn.to)!;
            const isHighlighted =
              activeNodeId === conn.from || activeNodeId === conn.to;

            return (
              <line
                key={`${conn.from}-${conn.to}`}
                x1={source.x}
                y1={source.y}
                x2={target.x}
                y2={target.y}
                stroke={isHighlighted ? "var(--accent)" : "var(--border)"}
                strokeWidth={isHighlighted ? "0.6" : "0.35"}
                strokeDasharray={isHighlighted ? "1 1" : undefined}
                className="transition-all duration-300"
              />
            );
          })}
        </svg>

        {/* Nodes placed via percentage */}
        {NODES.map((node) => {
          const Icon = node.icon;
          const isActive = activeNodeId === node.id;

          return (
            <button
              key={node.id}
              type="button"
              onClick={() => setActiveNodeId(node.id)}
              onMouseEnter={() => setActiveNodeId(node.id)}
              onFocus={() => setActiveNodeId(node.id)}
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 group flex flex-col items-center focus:outline-none transition-transform duration-200 ${
                isActive ? "scale-105 z-10" : "scale-100 z-0 hover:scale-105"
              }`}
              aria-label={`Inspect ${node.name} architecture node`}
            >
              <div
                className={`flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-xl border transition-all duration-200 shadow-sm ${
                  isActive
                    ? "border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--accent)] shadow-md"
                    : "border-[var(--border)] bg-[var(--surface)] text-[var(--fg-muted)] hover:border-[var(--accent)] hover:text-[var(--fg)]"
                }`}
              >
                <Icon className="h-5 w-5" strokeWidth={1.8} />
              </div>
              <span
                className={`mt-1.5 mono-tag text-[10px] tracking-tight transition-colors duration-150 ${
                  isActive
                    ? "text-[var(--fg)] font-semibold"
                    : "text-[var(--fg-muted)] group-hover:text-[var(--fg)]"
                }`}
              >
                {node.name}
              </span>
            </button>
          );
        })}
      </div>

      {/* Node Info / Spec Drawer */}
      <div className="mt-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-subtle)] p-3.5 transition-all duration-300">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
          <div className="flex items-center gap-2">
            <span className="mono-tag rounded bg-[var(--accent-soft)] px-2 py-0.5 text-[10px] text-[var(--accent)] font-semibold">
              {activeNode.label}
            </span>
            <span className="text-xs font-medium text-[var(--fg)]">
              {activeNode.role}
            </span>
          </div>
          <span className="mono-tag text-[10px] text-[var(--fg-subtle)]">
            Hover or tap any node
          </span>
        </div>

        <div className="mt-2.5 flex flex-wrap gap-2">
          {activeNode.specs.map((spec, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-1 text-[11px] text-[var(--fg-muted)]"
            >
              <CheckCircle2 className="h-3 w-3 text-[var(--accent)]" />
              {spec}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
