"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, ChevronRight, CheckCircle, AlertTriangle, Search, Database, Radio, Check, Server, Terminal, ActivitySquare } from "lucide-react";
import { AGENT_INVESTIGATION_STEPS } from "../lib/agent";

const TOOL_ICONS = {
  fetch_events: Database,
  get_zone_context: Server,
  cross_reference_events: ActivitySquare,
  fetch_drone_telemetry: Radio,
  check_badge_registry: Search,
  assess_weather_context: Radio,
  flag_for_escalation: AlertTriangle,
  draft_briefing_section: CheckCircle,
};

const TOOL_COLORS = {
  fetch_events: "var(--brand-blue)",
  get_zone_context: "var(--brand-purple)",
  cross_reference_events: "var(--brand-amber)",
  fetch_drone_telemetry: "var(--brand-blue)",
  check_badge_registry: "var(--brand-red)",
  assess_weather_context: "var(--brand-green)",
  flag_for_escalation: "var(--brand-red)",
  draft_briefing_section: "var(--brand-green)",
};

const PHASE_LABELS = {
  discovery: "Discovery",
  investigation: "Investigation",
  correlation: "Correlation",
  assessment: "Assessment",
  drafting: "Drafting",
};

export default function AgentPanel({ steps, running, done, onStart }) {
  const scrollRef = useRef(null);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [steps]);

  const progress = done ? 100 : Math.round((steps.length / AGENT_INVESTIGATION_STEPS.length) * 100);

  return (
    <div className="glass-panel p-4 md:p-5 rounded-2xl flex flex-col shrink-0 border border-[var(--border-medium)] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--brand-amber)] opacity-5 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/3" />

      {/* Header */}
      <div className="flex flex-wrap items-center gap-2 md:gap-4 mb-5 relative z-10">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br from-[rgba(245,158,11,0.2)] to-[rgba(245,158,11,0.05)] border border-[rgba(245,158,11,0.3)] shadow-[0_0_15px_rgba(245,158,11,0.15)] shrink-0">
          <Cpu size={20} className={running ? "text-[var(--brand-amber)] animate-pulse-amber" : "text-[var(--brand-amber)]"} />
        </div>
        <div className="flex-1 min-w-[200px]">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-bold tracking-wide text-white">AI Investigator Core</span>
            {running && (
              <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded shadow-[0_0_10px_rgba(245,158,11,0.3)] bg-[rgba(245,158,11,0.15)] text-[var(--brand-amber)] border border-[rgba(245,158,11,0.3)] flex items-center gap-1.5 whitespace-nowrap">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand-amber)] animate-ping" />
                Active
              </span>
            )}
            {done && (
              <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded shadow-[0_0_10px_rgba(16,185,129,0.2)] bg-[rgba(16,185,129,0.15)] text-[var(--brand-green)] border border-[rgba(16,185,129,0.3)] flex items-center gap-1.5 whitespace-nowrap">
                <Check size={10} />
                Complete
              </span>
            )}
          </div>
          <div className="text-xs mt-1 font-mono text-[var(--text-muted)]">
            Execution: {steps.length}/{AGENT_INVESTIGATION_STEPS.length} routines
          </div>
        </div>
        <button onClick={() => setCollapsed(p => !p)}
          className="text-xs px-3 py-1.5 rounded-lg font-semibold transition-colors bg-[rgba(255,255,255,0.03)] border border-[var(--border-subtle)] text-[var(--text-muted)] hover:bg-[rgba(255,255,255,0.08)] hover:text-white">
          {collapsed ? "Expand" : "Collapse"}
        </button>
      </div>

      {/* Progress bar */}
      <div className="mb-5 relative z-10">
        <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest mb-2 text-[var(--text-muted)]">
          <span>Processing Pipeline</span>
          <span style={{ color: done ? "var(--brand-green)" : "var(--brand-amber)" }}>{progress}%</span>
        </div>
        <div className="h-1.5 rounded-full bg-[rgba(0,0,0,0.5)] overflow-hidden shadow-inner">
          <motion.div 
            className="h-full rounded-full transition-all duration-300"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            style={{
              background: done ? "linear-gradient(90deg, #047857, #10b981)" : "linear-gradient(90deg, #d97706, #f59e0b)",
              boxShadow: done ? "0 0 10px #10b981" : "0 0 10px #f59e0b"
            }} />
        </div>
      </div>

      {/* Start prompt */}
      {!running && !done && steps.length === 0 && (
        <div className="rounded-xl p-6 text-center bg-[rgba(0,0,0,0.3)] border border-[var(--border-subtle)] border-dashed my-2">
          <Terminal size={32} className="mx-auto mb-3 opacity-40 text-[var(--brand-amber)]" />
          <p className="text-sm font-semibold mb-2 text-white">System Ready for Triage</p>
          <p className="text-xs mb-5 text-[var(--text-muted)] leading-relaxed max-w-sm mx-auto">
            The agent will parse overnight events, check access registries, verify drone telemetry, and draft the preliminary brief via MCP tools.
          </p>
          <button onClick={onStart} className="btn-primary mx-auto w-auto px-6">
            <Cpu size={16} /> Execute Triage Protocol
          </button>
        </div>
      )}

      {/* Steps stream */}
      <AnimatePresence>
        {!collapsed && steps.length > 0 && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="relative z-10"
          >
            <div ref={scrollRef} className="space-y-3 max-h-[50vh] md:max-h-72 overflow-y-auto pr-2 custom-scrollbar bg-[rgba(0,0,0,0.2)] rounded-xl p-3 border border-[var(--border-subtle)] inset-shadow">
              <AnimatePresence>
                {steps.map((item, i) => (
                  <AgentStep key={item.step.id} item={item} index={i} />
                ))}
              </AnimatePresence>
              
              {running && (
                <div className="flex items-center gap-3 py-3 px-2">
                  <div className="flex gap-1">
                    {[0, 1, 2].map(i => (
                      <motion.div key={i} 
                        initial={{ opacity: 0.3, y: 0 }}
                        animate={{ opacity: 1, y: -3 }}
                        transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse", delay: i * 0.15 }}
                        className="w-1.5 h-1.5 rounded-full bg-[var(--brand-amber)] shadow-[0_0_5px_var(--brand-amber)]" 
                      />
                    ))}
                  </div>
                  <span className="text-xs font-mono text-[var(--text-muted)] animate-pulse">Computing reasoning...</span>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function AgentStep({ item, index }) {
  const [expanded, setExpanded] = useState(false);
  const { step, result } = item;
  const color = TOOL_COLORS[step.tool] || "var(--text-muted)";
  const Icon = TOOL_ICONS[step.tool] || Terminal;

  return (
    <motion.div 
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className="rounded-lg overflow-hidden border bg-[rgba(15,23,42,0.8)] backdrop-blur shadow-sm group"
      style={{ borderColor: "rgba(255,255,255,0.05)" }}
    >
      <div className="flex items-center gap-3 px-3 py-2.5 cursor-pointer hover:bg-[rgba(255,255,255,0.03)] transition-colors"
        onClick={() => setExpanded(p => !p)}>
        <div className="w-6 h-6 rounded bg-[rgba(0,0,0,0.5)] flex items-center justify-center shrink-0 border"
          style={{ borderColor: `color-mix(in srgb, ${color} 30%, transparent)` }}>
          <Icon size={12} style={{ color }} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-[10px] font-mono font-bold tracking-wider uppercase opacity-80" style={{ color }}>{step.tool}</span>
            <span className="text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-[rgba(255,255,255,0.05)] text-[var(--text-muted)]">
              {PHASE_LABELS[step.phase]}
            </span>
          </div>
          <div className="text-xs text-[var(--text-primary)] truncate font-medium">{step.label}</div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
           <CheckCircle size={14} className="text-[var(--brand-green)] opacity-80 drop-shadow-[0_0_5px_rgba(16,185,129,0.3)]" />
           <motion.div animate={{ rotate: expanded ? 90 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronRight size={14} className="text-[var(--text-muted)] group-hover:text-white" />
           </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden bg-[rgba(0,0,0,0.3)]"
          >
            <div className="px-4 pb-4 pt-2 border-t border-[rgba(255,255,255,0.03)] space-y-3">
              {/* Thinking */}
              <div className="px-3 py-2 rounded border border-[rgba(245,158,11,0.15)] bg-[rgba(245,158,11,0.03)] text-xs italic text-[var(--text-secondary)] leading-relaxed border-l-2 border-l-[var(--brand-amber)]">
                <span className="font-semibold not-italic text-[var(--brand-amber)] mr-2 flex items-center inline-flex gap-1.5"><Brain size={12}/> Analysis:</span> 
                {step.thinking}
              </div>
              {/* Tool call */}
              <div>
                <div className="text-[10px] font-bold uppercase tracking-widest mb-1.5 text-[var(--text-muted)]">Tool Call Params</div>
                <div className="rounded-md p-2.5 max-w-full overflow-x-auto text-[11px] bg-[rgba(15,23,42,0.8)] border border-[rgba(255,255,255,0.05)]"
                  style={{ color: "var(--brand-blue)", fontFamily: "var(--font-mono)" }}>
                  <pre>{JSON.stringify(step.params, null, 2)}</pre>
                </div>
              </div>
              {/* Result */}
              <div>
                <div className="text-[10px] font-bold uppercase tracking-widest mb-1.5 text-[var(--text-muted)]">Return Output</div>
                <div className="rounded-md p-2.5 max-w-full overflow-x-auto max-h-40 text-[11px] bg-[rgba(15,23,42,0.8)] border border-[rgba(255,255,255,0.05)] custom-scrollbar"
                  style={{ color: "var(--brand-green)", fontFamily: "var(--font-mono)" }}>
                  <pre>{JSON.stringify(result, null, 2).slice(0, 800)}{JSON.stringify(result, null, 2).length > 800 ? "\n...[truncated]" : ""}</pre>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// Simple icon for the analysis span
function Brain(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/>
      <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/>
      <path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4"/>
      <path d="M17.599 6.5a3 3 0 0 0 .399-1.375"/>
      <path d="M6.003 5.125A3 3 0 0 0 6.401 6.5"/>
      <path d="M3.477 10.896a4 4 0 0 1 .585-.396"/>
      <path d="M19.938 10.5a4 4 0 0 1 .585.396"/>
      <path d="M6 18a4 4 0 0 1-1.967-.516"/>
      <path d="M19.967 17.484A4 4 0 0 1 18 18"/>
    </svg>
  );
}
