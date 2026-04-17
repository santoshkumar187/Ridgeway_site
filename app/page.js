"use client";
import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertTriangle, Shield, Map as MapIcon, Navigation, FileText,
  ChevronRight, Activity, Clock, Zap, BarChart2,
  CheckCircle, XCircle, HelpCircle, ArrowRight, Bell,
  Eye, Lock, Cpu, Radio, Radar, User, AlertOctagon, Menu, LogOut, Setting
} from "lucide-react";
import { OVERNIGHT_EVENTS, SUPERVISOR_NOTE, SITE_CONFIG } from "../lib/siteData";
import { generateAIAssessment, runAgentInvestigation } from "../lib/agent";
import { INCIDENT_BLUEPRINTS } from "../lib/intelligence";

const SiteMap = dynamic(() => import("../components/SiteMap"), { ssr: false });
const AgentPanel = dynamic(() => import("../components/AgentPanel"), { ssr: false });
const EventTimeline = dynamic(() => import("../components/EventTimeline"), { ssr: false });
const BriefingPanel = dynamic(() => import("../components/BriefingPanel"), { ssr: false });
const DroneSimulator = dynamic(() => import("../components/DroneSimulator"), { ssr: false });
const IncidentBoard = dynamic(() => import("../components/IncidentBoard"), { ssr: false });

const TABS = [
  { id: "overview", label: "Intelligence Feed", icon: Activity, desc: "Event triage & AI insights" },
  { id: "incidents", label: "Investigation Threads", icon: AlertTriangle, desc: "Correlated incident clusters" },
  { id: "map", label: "Site Map", icon: MapIcon, desc: "Spatial event visualization" },
  { id: "drone", label: "Drone Patrol", icon: Navigation, desc: "Flight telemetry playback" },
  { id: "briefing", label: "Morning Briefing", icon: FileText, desc: "Final leadership report" },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState("overview");
  const [agentRunning, setAgentRunning] = useState(false);
  const [agentDone, setAgentDone] = useState(false);
  const [agentSteps, setAgentSteps] = useState([]);
  const [events, setEvents] = useState(OVERNIGHT_EVENTS.map(e => ({ ...e, aiAssessment: null, userVerdict: null })));
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [currentTime, setCurrentTime] = useState("06:10");
  const [notifications, setNotifications] = useState([]);
  const [briefingApproved, setBriefingApproved] = useState(false);
  const [mapFocusEvent, setMapFocusEvent] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedIncidentId, setSelectedIncidentId] = useState(null);

  // Live clock simulation
  useEffect(() => {
    const start = new Date();
    start.setHours(6, 10, 0);
    const interval = setInterval(() => {
      start.setSeconds(start.getSeconds() + 1);
      setCurrentTime(start.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit" }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Responsive sidebar handling
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) setIsSidebarOpen(false);
      else setIsSidebarOpen(true);
    };
    handleResize(); // Initialize on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const startInvestigation = async () => {
    if (agentRunning || agentDone) return;
    setAgentRunning(true);
    setActiveTab("overview");

    await runAgentInvestigation(
      ({ step, result, stepIndex, isLast }) => {
        setAgentSteps(prev => [...prev, { step, result, status: "done" }]);

        if (stepIndex >= 7) {
          setEvents(prev => prev.map(e => ({
            ...e,
            aiAssessment: e.aiAssessment || generateAIAssessment(e.id, {}),
          })));
        }

        if (step.tool === "flag_for_escalation") {
          setNotifications(prev => [
            ...prev,
            { id: Date.now(), text: `Escalation flagged: ${result.eventId}`, type: "alert" }
          ]);
        }

        if (isLast) {
          setAgentRunning(false);
          setAgentDone(true);
          setEvents(prev => prev.map(e => ({
            ...e,
            aiAssessment: generateAIAssessment(e.id, {}),
          })));
        }
      },
      () => {}
    );
  };

  const handleUserVerdict = (eventId, verdict) => {
    setEvents(prev => prev.map(e => e.id === eventId ? { ...e, userVerdict: verdict } : e));
  };

  const highCount = events.filter(e => e.severity === "high").length;
  const escalateCount = events.filter(e => e.aiAssessment?.verdict === "escalate").length;
  const reviewedCount = events.filter(e => e.userVerdict !== null).length;
  const incidents = INCIDENT_BLUEPRINTS;

  return (
    <div className="flex h-screen overflow-hidden bg-[var(--surface-0)]">
      
      {/* ── MOBILE OVERLAY ── */}
      <div 
        className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden transition-opacity duration-300 ${isSidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={() => setIsSidebarOpen(false)}
      />

      {/* ── SIDEBAR NAVIGATION ── */}
      <motion.aside 
        initial={false}
        animate={{ width: isSidebarOpen ? 280 : 80 }}
        className={`absolute lg:relative top-0 left-0 h-full glass-panel flex flex-col z-50 border-r border-[var(--border-subtle)] shrink-0 transition-transform duration-300 lg:translate-x-0 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="p-4 flex items-center gap-3 border-b border-[var(--border-subtle)] h-16">
          <div className="relative w-8 h-8 shrink-0">
            <div className="absolute inset-0 rounded-full animate-spin-slow opacity-40 shadow-[0_0_15px_rgba(245,158,11,0.5)]"
              style={{ background: "conic-gradient(from 0deg, var(--brand-amber), transparent)" }} />
            <div className="absolute inset-1 rounded-full flex items-center justify-center bg-[var(--surface-2)]">
              <Radar size={14} className="text-amber-400" />
            </div>
          </div>
          {isSidebarOpen && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col whitespace-nowrap">
              <span className="font-bold text-sm tracking-wide text-[var(--text-primary)]">6:10 ASSISTANT</span>
              <span className="text-[10px] uppercase text-[var(--text-muted)] tracking-wider">Ridgeway Site Ops</span>
            </motion.div>
          )}
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-3 flex flex-col gap-2">
          <div className="px-3 mb-2 flex items-center justify-between">
            {isSidebarOpen ? (
              <span className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">Modules</span>
            ) : (
              <div className="h-[1px] w-full bg-[var(--border-medium)]"></div>
            )}
          </div>
          
          {TABS.map(tab => {
            const isActive = activeTab === tab.id;
            return (
              <button key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`group flex items-center gap-3 p-3 rounded-xl transition-all duration-300 relative w-full text-left ${isActive ? 'bg-[rgba(245,158,11,0.1)] border-[rgba(245,158,11,0.2)]' : 'hover:bg-[rgba(255,255,255,0.03)] border-transparent'} border`}
              >
                {isActive && (
                  <motion.div layoutId="sidebar-active" className="absolute left-0 top-1/4 bottom-1/4 w-1 bg-[var(--brand-amber)] rounded-r-full shadow-[0_0_10px_var(--brand-amber)]" />
                )}
                <tab.icon size={18} className={`shrink-0 transition-colors ${isActive ? 'text-[var(--brand-amber)]' : 'text-[var(--text-muted)] group-hover:text-[var(--text-secondary)]'}`} />
                {isSidebarOpen && (
                  <div className="flex flex-col overflow-hidden">
                    <span className={`text-sm font-medium transition-colors ${isActive ? 'text-[var(--brand-amber)]' : 'text-[var(--text-secondary)] group-hover:text-[var(--text-primary)]'}`}>
                      {tab.label}
                    </span>
                    <span className="text-[10px] text-[var(--text-muted)] truncate">{tab.desc}</span>
                  </div>
                )}
              </button>
            )
          })}

          {/* User Persona Profile (Bottom of nav) */}
          <div className="mt-auto pt-6">
            <div className={`p-3 rounded-xl border border-[var(--border-subtle)] bg-[rgba(15,23,42,0.4)] flex items-center gap-3 ${isSidebarOpen ? '' : 'justify-center'}`}>
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-500 to-orange-700 flex items-center justify-center text-white shrink-0 font-bold shadow-lg">
                M
              </div>
              {isSidebarOpen && (
                <div className="flex flex-col overflow-hidden">
                  <span className="text-sm font-medium text-[var(--text-primary)]">Maya Singh</span>
                  <span className="text-xs text-[var(--text-muted)]">Operations Lead</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.aside>

      {/* ── MAIN CONTENT AREA ── */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        
        {/* Top Header Row */}
        <header className="h-16 flex-col md:flex-row glass z-30 flex md:items-center justify-between px-4 md:px-6 shrink-0 border-b border-[var(--border-subtle)] overflow-x-auto custom-scrollbar">
          <div className="flex items-center gap-2 md:gap-4 my-2 md:my-0">
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 -ml-2 rounded-lg hover:bg-[rgba(255,255,255,0.05)] text-[var(--text-muted)] hover:text-white transition-colors lg:hidden">
              <Menu size={20} />
            </button>
            <div className="flex items-center gap-2">
              <h1 className="text-base md:text-lg font-semibold tracking-wide flex items-center gap-2 text-[var(--text-primary)]">
                {TABS.find(t => t.id === activeTab)?.label}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-4 md:gap-6 pb-2 md:pb-0">
            {/* Live Clock / Status */}
            <div className="flex items-center gap-2 md:gap-3 shrink-0">
              <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[rgba(16,185,129,0.1)] border border-[rgba(16,185,129,0.2)]">
                <span className="dot-pulse active" />
                <span className="text-xs font-medium text-emerald-400">System Secure</span>
              </div>
              <div className="text-xs md:text-sm font-mono px-2 md:px-3 py-1.5 rounded text-[var(--brand-amber)] bg-[rgba(245,158,11,0.05)] border border-[rgba(245,158,11,0.2)] shadow-[inset_0_0_10px_rgba(245,158,11,0.05)]">
                {currentTime}
              </div>
            </div>

            <div className="hidden md:block h-6 w-px bg-[var(--border-medium)]"></div>

            {/* Metrics */}
            <div className="hidden lg:flex items-center gap-3 shrink-0">
              <StatChip icon={AlertOctagon} value={highCount} color="var(--brand-red)" />
              <StatChip icon={Bell} value={escalateCount} color="var(--brand-amber)" />
              <StatChip icon={CheckCircle} value={reviewedCount} color="var(--brand-green)" />
            </div>

            {/* Actions */}
            <div className="flex gap-2 shrink-0">
               {!agentDone && (
                <button
                  onClick={startInvestigation}
                  disabled={agentRunning}
                  className="btn-primary"
                >
                  {agentRunning ? (
                    <><span className="animate-spin-slow"><Cpu size={14} /></span> Analyzing...</>
                  ) : (
                    <><Cpu size={14} /> Run Investigation</>
                  )}
                </button>
              )}
              {agentDone && (
                <div className="px-3 py-1.5 md:px-4 md:py-2 rounded-lg text-xs font-semibold flex items-center gap-2 bg-[rgba(16,185,129,0.15)] text-emerald-400 border border-emerald-500/30">
                  <CheckCircle size={14} /> Analysis Complete
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Supervisor Note Banner */}
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-gradient-to-r from-[rgba(245,158,11,0.15)] to-[rgba(245,158,11,0.02)] border-b border-[rgba(245,158,11,0.2)] px-6 py-3 flex items-center gap-4 shrink-0"
        >
          <div className="w-7 h-7 rounded-full bg-[rgba(245,158,11,0.2)] text-[var(--brand-amber)] flex items-center justify-center font-bold text-xs ring-1 ring-[var(--brand-amber)] shadow-[0_0_10px_rgba(245,158,11,0.2)]">
            R
          </div>
          <div className="text-sm">
            <span className="font-semibold text-[var(--brand-amber)]">Raghav</span>
            <span className="text-[var(--text-muted)] mx-2">left a handover note at {SUPERVISOR_NOTE.time}:</span>
            <span className="text-[var(--text-secondary)] italic">&quot;{SUPERVISOR_NOTE.text}&quot;</span>
          </div>
        </motion.div>

        {/* Dynamic Content Area */}
        <div className="flex-1 overflow-y-auto p-3 md:p-6 scroll-smooth">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="h-full max-w-screen-2xl mx-auto"
            >
              {/* OVERVIEW TAB */}
              {activeTab === "overview" && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 lg:h-full">
                  <div className="lg:col-span-2 flex flex-col gap-4 md:gap-6">
                    <AgentPanel
                      steps={agentSteps}
                      running={agentRunning}
                      done={agentDone}
                      onStart={startInvestigation}
                    />
                    <EventTimeline
                      events={events}
                      selectedEvent={selectedEvent}
                      onSelectEvent={setSelectedEvent}
                      onVerdict={handleUserVerdict}
                      onFocusMap={(e) => { setMapFocusEvent(e); setActiveTab("map"); }}
                      agentDone={agentDone}
                    />
                  </div>
                  <div className="flex flex-col gap-4 md:gap-6">
                    <SummaryCard events={events} agentDone={agentDone} />
                    <AnimatePresence mode="wait">
                      {selectedEvent ? (
                        <EventDetailCard
                          key="detail"
                          event={events.find(e => e.id === selectedEvent) || events[0]}
                          onVerdict={handleUserVerdict}
                          onFocusMap={(e) => { setMapFocusEvent(e); setActiveTab("map"); }}
                        />
                      ) : (
                        <motion.div 
                          key="empty"
                          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                          className="glass-panel rounded-2xl flex flex-col items-center justify-center py-16 text-center h-full"
                          style={{ color: "var(--text-muted)" }}>
                          <div className="w-16 h-16 rounded-full bg-[rgba(255,255,255,0.02)] flex items-center justify-center mb-4">
                            <Eye size={24} className="opacity-50" />
                          </div>
                          <p className="text-sm font-medium text-[var(--text-secondary)]">No Event Selected</p>
                          <p className="text-xs mt-2 max-w-[200px]">Select an event timeline item to inspect AI analysis, evidence, and apply your verdict.</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              )}

              {/* INCIDENTS TAB */}
              {activeTab === "incidents" && (
                <IncidentBoard
                  incidents={incidents}
                  agentDone={agentDone}
                  selectedIncidentId={selectedIncidentId}
                  onSelectIncident={setSelectedIncidentId}
                  onFocusMap={(incident) => { setSelectedEvent(incident.leadEventId); setActiveTab("map"); }}
                />
              )}

              {/* MAP TAB */}
              {activeTab === "map" && (
                <div className="glass-panel rounded-2xl overflow-hidden h-full min-h-[500px] relative shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
                  <SiteMap
                    events={events}
                    focusEvent={mapFocusEvent}
                    onSelectEvent={(id) => { setSelectedEvent(id); setActiveTab("overview"); }}
                    agentDone={agentDone}
                  />
                </div>
              )}

              {/* DRONE TAB */}
              {activeTab === "drone" && (
                <DroneSimulator events={events} agentDone={agentDone} incidents={incidents} />
              )}

              {/* BRIEFING TAB */}
              {activeTab === "briefing" && (
                <BriefingPanel
                  events={events}
                  agentDone={agentDone}
                  approved={briefingApproved}
                  onApprove={() => setBriefingApproved(true)}
                  onVerdict={handleUserVerdict}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

      </main>
    </div>
  );
}

function StatChip({ icon: Icon, value, color }) {
  return (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border bg-[rgba(15,23,42,0.6)]"
      style={{ borderColor: `color-mix(in srgb, ${color} 30%, transparent)` }}>
      <Icon size={14} style={{ color }} />
      <span className="text-sm font-bold" style={{ color }}>{value}</span>
    </div>
  );
}

// Remaining components (SummaryCard, VerdictRow, EventDetailCard, SeverityBadge) 
// extracted here and visually upgraded

function SummaryCard({ events, agentDone }) {
  const verdicts = agentDone ? {
    escalate: events.filter(e => e.aiAssessment?.verdict === "escalate").length,
    harmless: events.filter(e => e.aiAssessment?.verdict === "likely_harmless").length,
    routine: events.filter(e => e.aiAssessment?.verdict === "routine").length,
    pending: events.filter(e => !e.aiAssessment).length,
  } : null;

  return (
    <div className="glass-panel p-5 rounded-2xl">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--text-secondary)]">Night Summary</h3>
        <span className="badge badge-medium">
          {events.length} Events
        </span>
      </div>
      <div className="grid grid-cols-2 gap-3 mb-5">
        {[
          { type: "fence_alert", label: "Fence", color: "var(--brand-amber)", Icon: Shield },
          { type: "vehicle_movement", label: "Vehicle", color: "var(--brand-red)", Icon: AlertTriangle },
          { type: "badge_failure", label: "Badges", color: "var(--brand-red)", Icon: Lock },
          { type: "drone_patrol", label: "Drone", color: "var(--brand-blue)", Icon: Navigation },
        ].map(({ type, label, color, Icon }) => {
          const count = events.filter(e => e.type === type).length;
          return (
            <div key={type} className="rounded-xl p-3 flex flex-col gap-1 border border-[var(--border-subtle)] bg-[rgba(255,255,255,0.02)] hover:bg-[rgba(255,255,255,0.04)] transition-colors">
              <div className="flex justify-between items-start">
                <Icon size={16} style={{ color }} />
                <div className="text-xl font-bold font-mono" style={{ color }}>{count}</div>
              </div>
              <div className="text-xs font-medium text-[var(--text-muted)] uppercase mt-1">{label}</div>
            </div>
          );
        })}
      </div>

      {agentDone && verdicts && (
        <div className="pt-4 border-t border-[var(--border-subtle)]">
          <div className="text-xs font-bold uppercase tracking-wider mb-3 text-[var(--text-secondary)]">AI Assessment</div>
          <div className="space-y-2">
            <VerdictRow label="Escalate" count={verdicts.escalate} bg="rgba(239,68,68,0.15)" color="var(--brand-red)" />
            <VerdictRow label="Likely Harmless" count={verdicts.harmless} bg="rgba(16,185,129,0.15)" color="var(--brand-green)" />
            <VerdictRow label="Routine" count={verdicts.routine} bg="rgba(139,92,246,0.15)" color="var(--brand-purple)" />
          </div>
        </div>
      )}

      {!agentDone && (
        <div className="pt-4 border-t border-[var(--border-subtle)] text-center">
          <div className="text-xs text-[var(--text-muted)] italic py-2">
            AI assessment pending investigation.
          </div>
        </div>
      )}
    </div>
  );
}

function VerdictRow({ label, count, color, bg }) {
  return (
    <div className="flex items-center justify-between p-2 rounded-lg" style={{ background: bg }}>
      <span className="text-xs font-semibold" style={{ color }}>{label}</span>
      <span className="text-sm font-bold font-mono" style={{ color }}>{count}</span>
    </div>
  );
}

function EventDetailCard({ event, onVerdict, onFocusMap }) {
  const assessment = event.aiAssessment;
  const verdictColor = {
    escalate: "var(--brand-red)",
    likely_harmless: "var(--brand-green)",
    routine: "var(--brand-purple)",
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="glass-panel p-5 rounded-2xl flex flex-col h-full"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-[rgba(255,255,255,0.05)] text-[var(--text-muted)]">{event.time}</span>
            <span className="text-xs text-[var(--text-muted)] px-2 py-0.5">{event.location}</span>
          </div>
          <h3 className="text-base font-bold text-[var(--text-primary)]">{event.title}</h3>
        </div>
        <SeverityBadge severity={event.severity} />
      </div>

      <div className="bg-[rgba(0,0,0,0.3)] rounded-lg p-3 mb-4 border border-[var(--border-subtle)]">
        <p className="text-sm leading-relaxed text-[var(--text-secondary)]">{event.description}</p>
      </div>

      {assessment ? (
        <div className="rounded-xl p-4 mb-4 mt-auto border" 
          style={{ 
            background: `linear-gradient(to right, rgba(0,0,0,0.4), color-mix(in srgb, ${verdictColor[assessment.verdict]} 5%, transparent))`,
            borderColor: `color-mix(in srgb, ${verdictColor[assessment.verdict]} 30%, transparent)`
          }}>
          
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-[var(--brand-amber)]/20 flex items-center justify-center">
                <Cpu size={12} style={{ color: "var(--brand-amber)" }} />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--brand-amber)]">AI Verdict</span>
            </div>
            <span className={`badge uppercase verdict-${assessment.verdict}`}>
              {assessment.verdict.replace("_", " ")}
            </span>
          </div>
          
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-medium text-[var(--text-muted)]">Confidence</span>
            <div className="flex-1 h-1.5 rounded-full bg-[rgba(255,255,255,0.05)] overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${assessment.confidence * 100}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full shadow-[0_0_10px_currentColor]"
                style={{ background: verdictColor[assessment.verdict], color: verdictColor[assessment.verdict] }} 
              />
            </div>
            <span className="text-xs font-mono font-bold" style={{ color: verdictColor[assessment.verdict] }}>
              {Math.round(assessment.confidence * 100)}%
            </span>
          </div>
          
          <p className="text-sm leading-relaxed text-[var(--text-secondary)] mb-3">{assessment.summary}</p>
          
          {assessment.uncertainties.length > 0 && (
            <div className="bg-[rgba(0,0,0,0.2)] rounded-lg p-3">
              <div className="text-[10px] font-bold uppercase text-[var(--brand-amber)] mb-2 flex items-center gap-1.5">
                <HelpCircle size={10} /> AI Uncertainties
              </div>
              <ul className="space-y-1.5 pl-4">
                {assessment.uncertainties.map((u, i) => (
                  <li key={i} className="text-xs text-[var(--text-muted)] list-disc">
                    {u}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ) : (
         <div className="mt-auto mb-4 p-4 border border-[var(--border-subtle)] border-dashed rounded-xl flex flex-col items-center justify-center opacity-60">
            <Cpu size={20} className="mb-2 text-[var(--text-muted)]" />
            <p className="text-xs text-[var(--text-muted)]">Awaiting AI Assessment</p>
         </div>
      )}

      {/* Human review controls - Refined */}
      <div className="flex gap-2">
        <button onClick={() => onVerdict(event.id, "approved")}
          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all relative overflow-hidden group"
          style={{
            background: event.userVerdict === "approved" ? "rgba(16,185,129,0.15)" : "rgba(255,255,255,0.03)",
            border: `1px solid ${event.userVerdict === "approved" ? "rgba(16,185,129,0.4)" : "var(--border-medium)"}`,
            color: event.userVerdict === "approved" ? "var(--brand-green)" : "var(--text-secondary)",
          }}>
          {event.userVerdict === "approved" && <div className="absolute inset-0 bg-gradient-to-t from-[rgba(16,185,129,0.1)] to-transparent" />}
          <CheckCircle size={16} /> Approve
        </button>
        <button onClick={() => onVerdict(event.id, "challenged")}
           className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all relative overflow-hidden group"
          style={{
            background: event.userVerdict === "challenged" ? "rgba(239,68,68,0.15)" : "rgba(255,255,255,0.03)",
            border: `1px solid ${event.userVerdict === "challenged" ? "rgba(239,68,68,0.4)" : "var(--border-medium)"}`,
            color: event.userVerdict === "challenged" ? "var(--brand-red)" : "var(--text-secondary)",
          }}>
           {event.userVerdict === "challenged" && <div className="absolute inset-0 bg-gradient-to-t from-[rgba(239,68,68,0.1)] to-transparent" />}
          <XCircle size={16} /> Challenge
        </button>
        <button onClick={() => onFocusMap(event)}
          className="py-3 px-4 rounded-xl text-sm transition-all bg-[rgba(255,255,255,0.03)] border border-[var(--border-medium)] hover:bg-[rgba(255,255,255,0.08)] hover:text-white text-[var(--text-muted)]"
          title="Locate on Map">
          <MapIcon size={16} />
        </button>
      </div>
    </motion.div>
  );
}

function SeverityBadge({ severity }) {
  const labels = { high: "HIGH", medium: "MED", low: "LOW", info: "INFO" };
  return (
    <span className={`badge badge-${severity} shadow-sm shrink-0`}>
      {labels[severity]}
    </span>
  );
}
