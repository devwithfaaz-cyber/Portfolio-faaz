"use client";

import React, { useEffect, useRef, useState } from "react";
import { Layers, Database, Cpu, Globe, Server, CheckCircle2 } from "lucide-react";

interface NodeData {
  id: string;
  name: string;
  label: string;
  role: string;
  specs: string[];
  column: number;
  row: number;
  icon: React.ElementType;
}

const NODES: NodeData[] = [
  {
    id: "architecture",
    name: "Architecture",
    label: "Core",
    role: "System Design & Orchestration",
    specs: ["Clean Architecture", "Modular Services", "Type Invariants"],
    column: 2,
    row: 1,
    icon: Layers,
  },
  {
    id: "frontend",
    name: "Frontend",
    label: "Client",
    role: "Next.js & React Interface Layer",
    specs: ["Server Components", "Tailwind Design Tokens", "Sub-100ms INP"],
    column: 1,
    row: 2,
    icon: Globe,
  },
  {
    id: "api",
    name: "API",
    label: "Gateway",
    role: "REST & Authorization Endpoints",
    specs: ["JWT Auth Validation", "JSON Rate Limiting", "Schema Parsers"],
    column: 3,
    row: 2,
    icon: Cpu,
  },
  {
    id: "backend",
    name: "Backend",
    label: "Server",
    role: "Node.js Asynchronous Runtime",
    specs: ["Event Loops", "Background Jobs", "Secure Session Handlers"],
    column: 2,
    row: 3,
    icon: Server,
  },
  {
    id: "database",
    name: "Database",
    label: "Storage",
    role: "PostgreSQL & Redis Cache Engine",
    specs: ["Normalized SQL", "Neon Connection Pool", "Redis Ephemeral Keys"],
    column: 2,
    row: 4,
    icon: Database,
  },
];

const CONNECTIONS: { from: string; to: string; route?: "left" }[] = [
  { from: "architecture", to: "frontend" },
  { from: "architecture", to: "api" },
  { from: "architecture", to: "backend" },
  { from: "architecture", to: "database", route: "left" },
  { from: "frontend", to: "api" },
  { from: "api", to: "backend" },
  { from: "backend", to: "database" },
];

interface NodeBounds {
  left: number;
  centerX: number;
  centerY: number;
  width: number;
  height: number;
}

interface DiagramLayout {
  width: number;
  height: number;
  paths: Map<string, string>;
}

function getBoundaryPoint(bounds: NodeBounds, toward: { x: number; y: number }) {
  const dx = toward.x - bounds.centerX;
  const dy = toward.y - bounds.centerY;
  const xScale = dx === 0 ? Number.POSITIVE_INFINITY : bounds.width / 2 / Math.abs(dx);
  const yScale = dy === 0 ? Number.POSITIVE_INFINITY : bounds.height / 2 / Math.abs(dy);
  const scale = Math.min(xScale, yScale);

  return {
    x: bounds.centerX + dx * scale,
    y: bounds.centerY + dy * scale,
  };
}

export function NetworkDiagram() {
  const [activeNodeId, setActiveNodeId] = useState<string>("architecture");
  const [layout, setLayout] = useState<DiagramLayout | null>(null);
  const diagramRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef(new Map<string, HTMLButtonElement>());

  const activeNode = NODES.find((n) => n.id === activeNodeId) || NODES[0];

  useEffect(() => {
    const diagram = diagramRef.current;
    if (!diagram) return;

    let frame = 0;
    const measure = () => {
      const diagramBounds = diagram.getBoundingClientRect();
      const boundsById = new Map<string, NodeBounds>();

      for (const node of NODES) {
        const element = nodeRefs.current.get(node.id);
        if (!element) continue;

        const left = element.offsetLeft;
        const top = element.offsetTop;
        const width = element.offsetWidth;
        const height = element.offsetHeight;
        boundsById.set(node.id, {
          left,
          centerX: left + width / 2,
          centerY: top + height / 2,
          width,
          height,
        });
      }

      const paths = new Map<string, string>();
      for (const connection of CONNECTIONS) {
        const source = boundsById.get(connection.from);
        const target = boundsById.get(connection.to);
        if (!source || !target) continue;

        let path: string;
        if (connection.route === "left") {
          const start = { x: source.left, y: source.centerY };
          const end = { x: target.left, y: target.centerY };
          const laneX = 4;
          path = `M ${start.x} ${start.y} L ${laneX} ${start.y} L ${laneX} ${end.y} L ${end.x} ${end.y}`;
        } else {
          const start = getBoundaryPoint(source, {
            x: target.centerX,
            y: target.centerY,
          });
          const end = getBoundaryPoint(target, {
            x: source.centerX,
            y: source.centerY,
          });
          path = `M ${start.x} ${start.y} L ${end.x} ${end.y}`;
        }

        paths.set(`${connection.from}-${connection.to}`, path);
      }

      setLayout({
        width: diagramBounds.width,
        height: diagramBounds.height,
        paths,
      });
    };
    const scheduleMeasure = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    };

    const observer = new ResizeObserver(scheduleMeasure);
    observer.observe(diagram);
    nodeRefs.current.forEach((element) => observer.observe(element));
    scheduleMeasure();

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="relative mx-auto w-full max-w-[440px] rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-sm transition-all duration-300">
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

      {/* Diagram and its independently laid-out information panel */}
      <div
        ref={diagramRef}
        className="relative grid h-[400px] w-full grid-cols-3 grid-rows-4 place-items-center sm:h-[420px]"
      >
        <svg
          viewBox={layout ? `0 0 ${layout.width} ${layout.height}` : undefined}
          className="pointer-events-none absolute inset-0 h-full w-full"
          aria-hidden="true"
        >
          {[...(layout?.paths ?? [])].map(([key, path]) => {
            const [from, to] = key.split("-");
            const isHighlighted =
              activeNodeId === from || activeNodeId === to;

            return (
              <path
                key={key}
                data-connection={key}
                d={path}
                fill="none"
                stroke={isHighlighted ? "var(--accent)" : "var(--border)"}
                strokeWidth={isHighlighted ? "1.8" : "1"}
                strokeDasharray={isHighlighted ? "1 1" : undefined}
                className="transition-all duration-300"
              />
            );
          })}
        </svg>

        {/* Nodes placed in a responsive grid */}
        {NODES.map((node) => {
          const Icon = node.icon;
          const isActive = activeNodeId === node.id;

          return (
            <button
              key={node.id}
              data-node-id={node.id}
              type="button"
              onClick={() => setActiveNodeId(node.id)}
              onMouseEnter={() => setActiveNodeId(node.id)}
              onFocus={() => setActiveNodeId(node.id)}
              ref={(element) => {
                if (element) nodeRefs.current.set(node.id, element);
                else nodeRefs.current.delete(node.id);
              }}
              style={{ gridColumn: node.column, gridRow: node.row }}
              className={`relative z-10 group flex max-w-full flex-col items-center focus:outline-none transition-transform duration-200 ${
                isActive ? "scale-105 z-10" : "scale-100 z-0 hover:scale-105"
              }`}
              aria-label={`Inspect ${node.name} node`}
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
