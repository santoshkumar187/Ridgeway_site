"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Shield, Lock, Navigation, Zap, Map as MapIcon, CheckCircle, XCircle, HelpCircle, Cpu, ChevronRight, Filter } from "lucide-react";

const EVENT_TYPE_CONFIG = {
  fence_alert: { icon: Shield, color: "var(--brand-amber)", label: "Fence Alert" },
  vehicle_movement: { icon: AlertTriangle, color: "var(--brand-red)", label: "Vehicle" },
  badge_failure: { icon: Lock, color: "var(--brand-red)", label: "Badge Fail" },
  drone_patrol: { icon: Navigation, color: "var(--brand-blue)", label: "Drone" },
  signal_anomaly: { icon: Zap, color: "var(--brand-purple)", label: "Anomaly" },
};

const VERDICT_CONFIG = {
  escalate: { label: "ESCALATE", color: "var(--brand-red)", bg: "rgba(239,68,68,0.15)", border: "rgba(239,68,68,0.3)" },
  likely_harmless: { label: "LIKELY HARMLESS", color: "var(--brand-green)", bg: "rgba(16,185,129,0.15)", border: "rgba(16,185,129,0.3)" },
  routine: { label: "ROUTINE", color: "var(--brand-purple)", bg: "rgba(139,92,246,0.15)", border: "rgba(139,92,246,0.3)" },
};

export default function EventTimeline({ events, selectedEvent, onSelectEvent, onVerdict, onFocusMap, agentDone }) {
  const [filter, setFilter] = useState("all");

  const filtered = filter === "all" ? events : events.filter(e => e.type === filter || (filter === "escalate" && e.aiAssessment?.verdict === "escalate"));

  return (
    <div className="glass-panel p-5 rounded-2xl flex flex-col h-full max-h-[800px]">
      <div className="flex items-start justify-between mb-5 shrink-0">
        <div>
          <h2 className="text-sm font-bold uppercase tracking-wider text-[var(--text-secondary)]">Overnight Events</h2>
          <div className="text-xs mt-1 text-[var(--text-muted)] flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-[rgba(255,255,255,0.05)] font-mono">22:00 – 06:10</span>
            <span>{events.length} total events</span>
          </div>
        </div>
        {agentDone && (
          <div className="text-xs px-2.5 py-1 rounded-md font-bold flex items-center gap-1.5"
            style={{ background: "rgba(239,68,68,0.15)", color: "var(--brand-red)", border: "1px solid rgba(239,68,68,0.3)" }}>
            <AlertTriangle size={12} />
            {events.filter(e => e.aiAssessment?.verdict === "escalate").length} to escalate
          </div>
        )}
      </div>

      {/* Filter bar */}
      <div className="flex items-center gap-2 mb-4 shrink-0 overflow-x-auto pb-2 -mx-1 px-1 custom-scrollbar">
        <Filter size={14} className="text-[var(--text-muted)] mr-1" />
        {[
          { id: "all", label: "All Events" },
          { id: "escalate", label: "Escalations", hidden: !agentDone },
          { id: "fence_alert", label: "Fence" },
          { id: "vehicle_movement", label: "Vehicle" },
          { id: "badge_failure", label: "Badge" },
          { id: "drone_patrol", label: "Drone" },
          { id: "signal_anomaly", label: "Signals" },
        ].filter(f => !f.hidden).map(f => (
          <button key={f.id} onClick={() => setFilter(f.id)}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all border shrink-0"
            style={{
              background: filter === f.id ? "rgba(59,130,246,0.15)" : "rgba(255,255,255,0.03)",
              border: filter === f.id ? "1px solid rgba(59,130,246,0.4)" : "1px solid var(--border-subtle)",
              color: filter === f.id ? "var(--brand-blue)" : "var(--text-secondary)",
              boxShadow: filter === f.id ? "0 0 10px rgba(59,130,246,0.2)" : "none"
            }}>
            {f.label}
          </button>
        ))}
      </div>

      {/* Timeline List */}
      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-3 relative">
        {/* Timeline structural line */}
        <div className="absolute left-[25px] top-4 bottom-4 w-px bg-gradient-to-b from-[var(--border-subtle)] via-[var(--border-medium)] to-[var(--border-subtle)]" />
        
        <AnimatePresence>
          {filtered.map((event, index) => (
            <EventRow
              key={event.id}
              event={event}
              index={index}
              selected={selectedEvent === event.id}
              onSelect={() => onSelectEvent(event.id)}
              onVerdict={onVerdict}
              onFocusMap={onFocusMap}
              agentDone={agentDone}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

function EventRow({ event, index, selected, onSelect, onVerdict, onFocusMap, agentDone }) {
  const config = EVENT_TYPE_CONFIG[event.type];
  const Icon = config.icon;
  const verdict = event.aiAssessment ? VERDICT_CONFIG[event.aiAssessment.verdict] : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      onClick={onSelect}
      className={`relative z-10 rounded-xl overflow-hidden cursor-pointer transition-all duration-300 group ${selected ? 'shadow-lg' : ''}`}
      style={{
        background: selected ? "rgba(30,41,59,0.9)" : "rgba(15,23,42,0.6)",
        border: `1px solid ${selected ? "rgba(59,130,246,0.4)" : "var(--border-subtle)"}`,
        boxShadow: selected ? "0 0 20px rgba(59,130,246,0.15)" : "none",
      }}
    >
       {/* Hover Glow Effect */}
       <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none`}
            style={{ background: `radial-gradient(circle at 50% 50%, color-mix(in srgb, ${config.color} 50%, transparent) 0%, transparent 70%)` }} />

      <div className="flex items-start gap-4 px-3 py-3 w-full">
        {/* Icon & connecting line area */}
        <div className="flex flex-col items-center shrink-0 mt-1 pl-1">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10 transition-shadow ${selected ? 'shadow-[0_0_15px_currentColor]' : ''}`}
            style={{ 
              background: `color-mix(in srgb, ${config.color} 15%, transparent)`, 
              border: `1px solid color-mix(in srgb, ${config.color} 40%, transparent)`,
              color: config.color 
            }}>
            <Icon size={14} />
          </div>
        </div>

        <div className="flex-1 min-w-0 pr-2">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className="text-xs font-mono font-medium whitespace-nowrap text-[var(--text-muted)] group-hover:text-[var(--text-secondary)] transition-colors">{event.time}</span>
            <span className={`badge badge-${event.severity}`}>{event.severity}</span>
            {verdict && agentDone && (
              <span className="px-2 py-0.5 text-[10px] uppercase font-bold rounded-md whitespace-nowrap"
                style={{ background: verdict.bg, color: verdict.color, border: `1px solid ${verdict.border}` }}>
                {verdict.label}
              </span>
            )}
             {agentDone && !event.userVerdict && (
              <span className="flex h-2 w-2 ml-1">
                <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full opacity-75" style={{ background: "var(--brand-amber)" }}></span>
                <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: "var(--brand-amber)" }}></span>
              </span>
            )}
          </div>
          <div className={`text-sm font-semibold transition-colors truncate ${selected ? 'text-white' : 'text-[var(--text-primary)]'}`}>
            {event.title}
          </div>
          <div className="text-xs mt-1 truncate text-[var(--text-muted)] group-hover:text-[var(--text-secondary)] transition-colors">
            {event.location}
          </div>
        </div>

        {/* Right side Actions */}
        <div className="flex flex-col items-end gap-2 shrink-0 h-full">
          <div className="flex items-center gap-1.5 h-6">
            {event.userVerdict === "approved" && <CheckCircle size={16} className="text-[var(--brand-green)] drop-shadow-[0_0_5px_rgba(16,185,129,0.5)]" />}
            {event.userVerdict === "challenged" && <XCircle size={16} className="text-[var(--brand-red)] drop-shadow-[0_0_5px_rgba(239,68,68,0.5)]" />}
            {event.userVerdict === "follow_up" && <HelpCircle size={16} className="text-[var(--brand-amber)] drop-shadow-[0_0_5px_rgba(242,169,59,0.4)]" />}
          </div>
          <motion.div animate={{ rotate: selected ? 90 : 0 }} transition={{ duration: 0.2 }} className="mt-auto pt-2">
             <ChevronRight size={16} className={`transition-colors ${selected ? 'text-[var(--brand-blue)]' : 'text-[var(--text-muted)] group-hover:text-white'}`} />
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="px-12 pb-4 pt-1 border-t border-[var(--border-subtle)] border-dashed">
              
              {/* Raw Data Pills */}
              <div className="mt-3 flex flex-wrap gap-2">
                {Object.entries(event.rawData).slice(0, 4).map(([k, v]) => (
                  <div key={k} className="text-[10px] px-2 py-1 rounded-md bg-[rgba(0,0,0,0.3)] border border-[rgba(255,255,255,0.05)] text-[var(--text-secondary)]">
                    <span className="text-[var(--text-muted)] mr-1">{k}:</span>
                    <span className="font-mono">{String(v)}</span>
                  </div>
                ))}
              </div>

               {/* Tags */}
               <div className="flex gap-1.5 mt-3 flex-wrap">
                {event.tags.map(tag => (
                  <span key={tag} className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded text-[var(--text-muted)] bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.05)]">
                    #{tag}
                  </span>
                ))}
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
