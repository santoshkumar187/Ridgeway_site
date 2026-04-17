"use client";

import { motion } from "framer-motion";
import { AlertTriangle, MapPinned, Navigation, Radar, ShieldCheck } from "lucide-react";
import { DRONE_ROUTES, GATES, SITE_LAYOUT, ZONES } from "../lib/siteData";

const EVENT_POSITIONS = {
  "evt-001": { x: 955, y: 125 },
  "evt-002": { x: 540, y: 360 },
  "evt-003": { x: 470, y: 180 },
  "evt-004": { x: 900, y: 520 },
  "evt-005": { x: 560, y: 465 },
  "evt-006": { x: 1035, y: 316 },
};

const ROUTE_POINTS = [
  [920, 560],
  [955, 455],
  [975, 210],
  [940, 150],
  [770, 320],
  [690, 430],
  [920, 560],
];

const EVENT_COLORS = {
  fence_alert: "var(--brand-amber)",
  vehicle_movement: "var(--brand-red)",
  badge_failure: "var(--brand-amber)",
  drone_patrol: "var(--brand-blue)",
  signal_anomaly: "var(--brand-green)",
};

export default function SiteMapSchematic({
  events,
  incidents,
  selectedIncidentId,
  onSelectEvent,
  onSelectIncident,
  focusEvent,
  agentDone,
}) {
  const activeIncident = incidents.find((incident) => incident.id === selectedIncidentId) ?? incidents[0];
  const activeIds = new Set([
    ...(activeIncident?.eventIds ?? []),
    ...(activeIncident?.supportEventIds ?? []),
    focusEvent?.id,
  ]);
  const route = Object.values(DRONE_ROUTES)[0];

  return (
    <div className="glass-panel rounded-[32px] p-5 h-full flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="panel-kicker">Spatial review</p>
          <h2 className="panel-title">Local site schematic with event, zone, and patrol overlays</h2>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--surface-raised)] px-3 py-1.5 text-xs text-[var(--text-secondary)]">
          <Radar size={14} className="text-[var(--brand-blue)]" />
          {agentDone ? "AI-linked overlays active" : "Raw overnight layout"}
        </div>
      </div>

      <div className="relative flex-1 overflow-hidden rounded-[28px] border border-[var(--border-strong)] bg-[var(--surface-base)]">
        <div className="absolute inset-0 site-grid opacity-70" />
        <svg viewBox={`0 0 ${SITE_LAYOUT.canvas.width} ${SITE_LAYOUT.canvas.height}`} className="h-full w-full">
          <rect
            x={SITE_LAYOUT.perimeter.x}
            y={SITE_LAYOUT.perimeter.y}
            width={SITE_LAYOUT.perimeter.width}
            height={SITE_LAYOUT.perimeter.height}
            rx="28"
            fill="none"
            stroke="rgba(217, 228, 233, 0.18)"
            strokeWidth="3"
            strokeDasharray="14 10"
          />

          {SITE_LAYOUT.roads.map((road) => (
            <g key={road.id}>
              <line
                x1={road.x1}
                y1={road.y1}
                x2={road.x2}
                y2={road.y2}
                stroke="rgba(167, 179, 187, 0.24)"
                strokeWidth="16"
                strokeLinecap="round"
              />
              <text x={road.x1 + 10} y={road.y1 - 12} fill="rgba(167, 179, 187, 0.56)" fontSize="12">
                {road.label}
              </text>
            </g>
          ))}

          {ZONES.map((zone) => {
            const frame = SITE_LAYOUT.zones.find((item) => item.id === zone.id);
            if (!frame) {
              return null;
            }

            return (
              <g key={zone.id}>
                <rect
                  x={frame.x}
                  y={frame.y}
                  width={frame.width}
                  height={frame.height}
                  rx="24"
                  fill={zone.isRestricted ? "rgba(255, 107, 87, 0.07)" : "rgba(113, 176, 228, 0.05)"}
                  stroke={zone.isRestricted ? "rgba(255, 107, 87, 0.48)" : "rgba(113, 176, 228, 0.26)"}
                  strokeWidth={zone.isRestricted ? "3" : "2"}
                  strokeDasharray={zone.isRestricted ? "10 8" : undefined}
                />
                <text x={frame.x + 20} y={frame.y + 28} fill="rgba(255,255,255,0.88)" fontSize="16" fontWeight="600">
                  {frame.label}
                </text>
                <text x={frame.x + 20} y={frame.y + 48} fill="rgba(167, 179, 187, 0.8)" fontSize="12">
                  {zone.isRestricted ? "Restricted after-hours access" : "Monitored operational zone"}
                </text>
              </g>
            );
          })}

          {SITE_LAYOUT.facilities.map((facility) => (
            <g key={facility.id}>
              <rect
                x={facility.x}
                y={facility.y}
                width={facility.width}
                height={facility.height}
                rx="18"
                fill="rgba(30, 41, 48, 0.88)"
                stroke="rgba(167, 179, 187, 0.22)"
                strokeWidth="2"
              />
              <text x={facility.x + 14} y={facility.y + 24} fill="rgba(255,255,255,0.82)" fontSize="13">
                {facility.label}
              </text>
            </g>
          ))}

          <polyline
            points={ROUTE_POINTS.map((point) => point.join(",")).join(" ")}
            fill="none"
            stroke="rgba(113, 176, 228, 0.9)"
            strokeWidth="4"
            strokeDasharray="9 8"
          />

          {route.waypoints.map((waypoint, index) => {
            const [x, y] = ROUTE_POINTS[index] ?? ROUTE_POINTS[ROUTE_POINTS.length - 1];
            return (
              <g key={`${waypoint.label}-${waypoint.time}`}>
                <circle cx={x} cy={y} r={index === 0 ? 9 : 7} fill="rgba(113, 176, 228, 0.88)" />
                <circle cx={x} cy={y} r={index === 0 ? 16 : 13} fill="none" stroke="rgba(113, 176, 228, 0.18)" strokeWidth="2" />
              </g>
            );
          })}

          {SITE_LAYOUT.gates.map((gate) => {
            const source = GATES.find((item) => item.id === gate.id);
            const healthy = source?.status !== "alert";
            return (
              <g key={gate.id}>
                <circle cx={gate.x} cy={gate.y} r="10" fill={healthy ? "rgba(121, 191, 157, 0.88)" : "rgba(255, 107, 87, 0.9)"} />
                <text x={gate.x + 16} y={gate.y + 4} fill="rgba(255,255,255,0.82)" fontSize="13">
                  {gate.label}
                </text>
              </g>
            );
          })}

          {events.map((event) => {
            const position = EVENT_POSITIONS[event.id];
            if (!position) {
              return null;
            }

            const isActive = activeIds.has(event.id);
            const color = EVENT_COLORS[event.type];

            return (
              <g
                key={event.id}
                onClick={() => onSelectEvent(event.id)}
                style={{ cursor: "pointer" }}
              >
                {isActive && (
                  <motion.circle
                    cx={position.x}
                    cy={position.y}
                    r="28"
                    fill="none"
                    stroke={color}
                    strokeWidth="2"
                    initial={{ opacity: 0.2, scale: 0.8 }}
                    animate={{ opacity: [0.2, 0.6, 0.2], scale: [0.8, 1.1, 0.8] }}
                    transition={{ duration: 2.4, repeat: Infinity }}
                  />
                )}
                <circle
                  cx={position.x}
                  cy={position.y}
                  r={isActive ? 12 : 9}
                  fill={color}
                  stroke="rgba(11, 16, 21, 0.95)"
                  strokeWidth="3"
                />
                <text x={position.x + 16} y={position.y - 10} fill="rgba(255,255,255,0.88)" fontSize="12">
                  {event.time}
                </text>
                <text x={position.x + 16} y={position.y + 8} fill="rgba(167, 179, 187, 0.82)" fontSize="12">
                  {event.title}
                </text>
              </g>
            );
          })}
        </svg>

        <div className="absolute left-4 top-4 w-[280px] rounded-[24px] border border-[var(--border-strong)] bg-[rgba(11,16,21,0.84)] p-4 backdrop-blur-xl">
          <div className="flex items-center gap-2 mb-3">
            <MapPinned size={15} className="text-[var(--brand-blue)]" />
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">Active thread</p>
          </div>
          {activeIncident ? (
            <>
              <h3 className="text-base font-semibold text-[var(--text-primary)] mb-2">{activeIncident.title}</h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-3">{activeIncident.summary}</p>
              <button
                type="button"
                onClick={() => onSelectIncident(activeIncident.id)}
                className="btn-secondary w-full"
              >
                Open review thread
              </button>
            </>
          ) : (
            <p className="text-sm text-[var(--text-secondary)]">Select a thread to see linked events and drone coverage.</p>
          )}
        </div>

        <div className="absolute bottom-4 left-4 right-4 grid gap-3 lg:grid-cols-3">
          <OverlayCard
            icon={AlertTriangle}
            label="Escalation markers"
            value={`${incidents.filter((incident) => incident.verdict === "escalate").length} active`}
          />
          <OverlayCard icon={Navigation} label="Drone patrol" value="Night Loop Alpha" />
          <OverlayCard icon={ShieldCheck} label="Gate status" value="Gate 3 flagged, others nominal" />
        </div>
      </div>
    </div>
  );
}

function OverlayCard({ icon: Icon, label, value }) {
  return (
    <div className="rounded-[22px] border border-[var(--border-strong)] bg-[rgba(11,16,21,0.82)] px-4 py-3 backdrop-blur-xl">
      <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)] mb-1.5">
        <Icon size={12} className="text-[var(--brand-amber)]" />
        {label}
      </div>
      <p className="text-sm text-[var(--text-primary)]">{value}</p>
    </div>
  );
}
