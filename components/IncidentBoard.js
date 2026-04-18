"use client";

import { motion } from "framer-motion";
import {
  AlertTriangle,
  ArrowUpRight,
  BriefcaseBusiness,
  Compass,
  Eye,
  ShieldCheck,
} from "lucide-react";

const PRIORITY_STYLES = {
  critical: {
    label: "Critical",
    accent: "var(--brand-red)",
    background: "rgba(255,107,87,0.12)",
    border: "rgba(255,107,87,0.28)",
  },
  high: {
    label: "High",
    accent: "var(--brand-amber)",
    background: "rgba(242,169,59,0.12)",
    border: "rgba(242,169,59,0.28)",
  },
  monitor: {
    label: "Monitor",
    accent: "var(--brand-blue)",
    background: "rgba(113,176,228,0.12)",
    border: "rgba(113,176,228,0.28)",
  },
  routine: {
    label: "Routine",
    accent: "var(--brand-green)",
    background: "rgba(121,191,157,0.12)",
    border: "rgba(121,191,157,0.28)",
  },
};

const REVIEW_COLORS = {
  approved: "var(--brand-green)",
  challenged: "var(--brand-red)",
  follow_up: "var(--brand-amber)",
  in_review: "var(--brand-blue)",
  pending: "var(--text-muted)",
};

export default function IncidentBoard({
  incidents,
  agentDone,
  selectedIncidentId,
  onSelectIncident,
  onFocusMap,
  compact = false,
}) {
  if (!agentDone) {
    return (
      <div className="glass-panel rounded-[28px] p-6 border border-dashed border-[var(--border-strong)]">
        <div className="flex items-center gap-3 mb-4">
          <div className="panel-icon">
            <Compass size={18} />
          </div>
          <div>
            <p className="panel-kicker">Incident fusion</p>
            <h2 className="panel-title">The AI will group raw logs into investigation threads</h2>
          </div>
        </div>
        <p className="text-sm text-[var(--text-secondary)] max-w-2xl">
          Once the investigation runs, this board will collapse overnight noise into a few operator-friendly threads with
          evidence, uncertainty, and follow-up owners.
        </p>
      </div>
    );
  }

  return (
    <div className={`glass-panel rounded-[28px] ${compact ? "p-4" : "p-6"}`}>
      <div className="flex items-center justify-between gap-4 mb-5">
        <div>
          <p className="panel-kicker">Investigation threads</p>
          <h2 className="panel-title">What actually happened, grouped for review</h2>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--surface-raised)] px-3 py-1.5 text-xs text-[var(--text-secondary)]">
          <ShieldCheck size={14} className="text-[var(--brand-green)]" />
          {incidents.length} active threads
        </div>
      </div>

      <div className={`${compact ? "space-y-3" : "grid gap-4 xl:grid-cols-2"}`}>
        {incidents.map((incident, index) => (
          <IncidentCard
            key={incident.id}
            compact={compact}
            incident={incident}
            index={index}
            selected={selectedIncidentId === incident.id}
            onSelectIncident={onSelectIncident}
            onFocusMap={onFocusMap}
          />
        ))}
      </div>
    </div>
  );
}

function IncidentCard({ compact, incident, index, selected, onSelectIncident, onFocusMap }) {
  const style = PRIORITY_STYLES[incident.priority] ?? PRIORITY_STYLES.monitor;
  const reviewColor = REVIEW_COLORS[incident.reviewState] ?? "var(--text-muted)";

  return (
    <motion.div
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelectIncident(incident.id);
        }
      }}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: index * 0.05 }}
      onClick={() => onSelectIncident(incident.id)}
      className={`w-full cursor-pointer rounded-[24px] border p-4 text-left transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-[var(--border-strong)] ${
        selected ? "shadow-[0_20px_40px_rgba(0,0,0,0.35)]" : ""
      }`}
      style={{
        background: selected ? "var(--surface-panel-strong)" : "var(--surface-panel)",
        borderColor: selected ? style.border : "var(--border-subtle)",
      }}
    >
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="space-y-2 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className="rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em]"
              style={{ color: style.accent, borderColor: style.border, background: style.background }}
            >
              {style.label}
            </span>
            <span className="rounded-full border border-[var(--border-subtle)] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
              {incident.timeWindow}
            </span>
          </div>
          <h3 className="text-lg font-semibold text-[var(--text-primary)] leading-tight">{incident.title}</h3>
          <p className="text-sm text-[var(--text-secondary)]">{incident.zone}</p>
        </div>
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onFocusMap(incident.id);
          }}
          className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-raised)] text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
          title="Focus this thread on the map"
        >
          <Eye size={16} />
        </button>
      </div>

      <p className={`text-sm text-[var(--text-secondary)] ${compact ? "line-clamp-2" : "min-h-[66px]"}`}>{incident.summary}</p>

      <div className="grid grid-cols-2 gap-3 my-4">
        <MetricPill icon={AlertTriangle} label="Confidence" value={incident.confidenceLabel} />
        <MetricPill icon={BriefcaseBusiness} label="Owner" value={incident.owner} subdued />
      </div>

      {!compact && (
        <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-raised)] p-3 mb-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)] mb-2">Operator question</p>
          <p className="text-sm text-[var(--text-primary)] leading-relaxed">{incident.openQuestion}</p>
        </div>
      )}

      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">Review state</p>
          <p className="text-sm font-medium" style={{ color: reviewColor }}>
            {incident.reviewLabel}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-24 overflow-hidden rounded-full bg-[var(--surface-tertiary)] h-2">
            <div
              className="h-full rounded-full transition-all"
              style={{ width: `${Math.round(incident.reviewProgress * 100)}%`, background: reviewColor }}
            />
          </div>
          <ArrowUpRight size={16} className={selected ? "text-[var(--text-primary)]" : "text-[var(--text-muted)]"} />
        </div>
      </div>
    </motion.div>
  );
}

function MetricPill({ icon: Icon, label, value, subdued = false }) {
  return (
    <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-raised)] px-3 py-2.5">
      <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)] mb-1">
        <Icon size={12} className={subdued ? "text-[var(--text-muted)]" : "text-[var(--brand-amber)]"} />
        {label}
      </div>
      <p className={`text-sm ${subdued ? "text-[var(--text-secondary)]" : "text-[var(--text-primary)]"}`}>{value}</p>
    </div>
  );
}
