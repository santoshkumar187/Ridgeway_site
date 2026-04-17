"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, CheckCircle, AlertTriangle, Edit3, Lock, Unlock, ArrowRight, Cpu, CheckSquare, Send, Printer } from "lucide-react";
import { MORNING_BRIEFING } from "../lib/agent";

export default function BriefingPanel({ events, agentDone, approved, onApprove }) {
  const [editingSection, setEditingSection] = useState(null);
  const [overrides, setOverrides] = useState({});
  const [activeSection, setActiveSection] = useState("summary");
  const [emailStatus, setEmailStatus] = useState("idle"); // idle, sending, sent

  const handleSimulateEmail = () => {
    setEmailStatus("sending");
    setTimeout(() => {
       setEmailStatus("sent");
    }, 2500);
  };

  const handlePrintPdf = () => {
    window.print();
  };

  if (!agentDone) {
    return (
      <div className="glass-panel p-10 rounded-3xl flex flex-col items-center justify-center h-full max-h-[600px] border border-dashed border-[var(--border-medium)]">
        <div className="w-24 h-24 rounded-full bg-[rgba(245,158,11,0.05)] border border-[rgba(245,158,11,0.2)] flex items-center justify-center mb-6 shadow-[0_0_50px_rgba(245,158,11,0.1)] relative">
           <Cpu size={40} className="text-[var(--brand-amber)] opacity-50" />
           <div className="absolute inset-0 rounded-full border-2 border-[var(--brand-amber)] border-t-transparent animate-spin-slow opacity-20"></div>
        </div>
        <h3 className="text-xl font-bold tracking-wide text-white mb-3">Awaiting Final Analysis</h3>
        <p className="text-sm text-[var(--text-muted)] max-w-md text-center leading-relaxed">
          The autonomous system is currently in standby. Initiate the Agent Investigation flow to synthesize events into a comprehensive morning report.
        </p>
      </div>
    );
  }

  const sections = Object.entries(MORNING_BRIEFING.sections);
  const reviewedCount = events.filter(e => e.userVerdict !== null).length;
  const pendingCount = events.length - reviewedCount;
  const escalations = events.filter(e => e.aiAssessment?.verdict === "escalate");

  const getContent = (key) => overrides[key] ?? MORNING_BRIEFING.sections[key]?.content ?? "";

  return (
    <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 h-full">
      {/* Left Sidebar: Nav & Status */}
      <div className="xl:col-span-1 flex flex-col gap-6">
        
        {/* Document Metadata Card */}
        <div className="glass-panel p-5 rounded-2xl flex flex-col relative overflow-hidden">
           <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-500" />
           <div className="flex items-center gap-3 mb-5">
             <div className="w-8 h-8 rounded bg-[rgba(59,130,246,0.1)] flex items-center justify-center text-[var(--brand-blue)] border border-[rgba(59,130,246,0.3)]">
                <FileText size={16} />
             </div>
             <div>
               <h2 className="text-sm font-bold text-white uppercase tracking-wider">Morning Brief</h2>
               <div className="text-[10px] uppercase font-mono text-[var(--text-muted)] mt-0.5 tracking-widest">{MORNING_BRIEFING.generatedAt}</div>
             </div>
           </div>

           <div className="space-y-3 mb-5">
              <div className="flex flex-col gap-1">
                 <span className="text-[10px] uppercase font-bold text-[var(--text-muted)] tracking-wider">Prepared For</span>
                 <span className="text-xs font-semibold text-[var(--text-primary)]">{MORNING_BRIEFING.preparedFor}</span>
              </div>
              <div className="flex flex-col gap-1">
                 <span className="text-[10px] uppercase font-bold text-[var(--text-muted)] tracking-wider">Prepared By</span>
                 <span className="text-xs font-semibold text-[var(--text-primary)]">{MORNING_BRIEFING.preparedBy}</span>
              </div>
           </div>

           {/* Review Progress */}
           <div className="bg-[rgba(0,0,0,0.3)] rounded-xl p-4 border border-[var(--border-subtle)] mb-5">
               <div className="flex items-center justify-between mb-2">
                 <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)] flex items-center gap-1.5 ">
                    <CheckSquare size={12} className="text-[var(--brand-amber)]" /> Ops Review
                 </span>
                 <span className={`text-xs font-mono font-bold ${reviewedCount === events.length ? 'text-[var(--brand-green)]' : 'text-white'}`}>
                   {reviewedCount} / {events.length}
                 </span>
               </div>
               <div className="h-1.5 rounded-full bg-[rgba(255,255,255,0.05)] overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${events.length > 0 ? (reviewedCount / events.length) * 100 : 0}%` }}
                    className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400"
                  />
               </div>
               {pendingCount > 0 && (
                 <div className="text-[10px] text-red-400 mt-2 font-medium bg-[rgba(239,68,68,0.1)] py-1 px-2 rounded">
                    {pendingCount} events require manual review.
                 </div>
               )}
           </div>

           {/* Approve Hook */}
           {!approved ? (
            <button onClick={onApprove}
              disabled={pendingCount > 0}
              className="w-full py-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all relative overflow-hidden group border hide-on-print"
              style={{
                background: pendingCount > 0 ? "rgba(255,255,255,0.03)" : "rgba(16,185,129,0.1) linear-gradient(to right, transparent, rgba(16,185,129,0.2), transparent)",
                borderColor: pendingCount > 0 ? "var(--border-subtle)" : "rgba(16,185,129,0.4)",
                color: pendingCount > 0 ? "var(--text-muted)" : "var(--brand-green)",
                cursor: pendingCount > 0 ? "not-allowed" : "pointer",
              }}>
              {pendingCount === 0 && <div className="absolute inset-0 bg-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />}
              {pendingCount > 0 ? (
                <><Lock size={14} className="opacity-50" /> Review Incomplete</>
              ) : (
                <><CheckCircle size={14} /> Approve Document</>
              )}
            </button>
          ) : (
            <div className="flex flex-col gap-2 hide-on-print">
              <div className="w-full py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest flex flex-col items-center justify-center gap-1 bg-[rgba(16,185,129,0.1)] border border-[rgba(16,185,129,0.25)] text-[var(--brand-green)] mb-1">
                <CheckCircle size={14} className="mb-0.5" /> Ops Approved
              </div>
              
              <button 
                 onClick={handlePrintPdf}
                 className="w-full py-2.5 rounded-lg text-[11px] font-bold uppercase tracking-wider flex items-center justify-center gap-2 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.1)] transition-colors text-white"
              >
                <Printer size={14} /> Export as PDF
              </button>
              
              <button 
                 onClick={emailStatus === 'idle' ? handleSimulateEmail : null}
                 disabled={emailStatus !== 'idle'}
                 className="w-full py-2.5 rounded-lg text-[11px] font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors relative overflow-hidden disabled:opacity-80 disabled:cursor-not-allowed"
                 style={{
                    background: emailStatus === 'sent' ? 'rgba(16,185,129,0.15)' : 'rgba(59,130,246,0.15)',
                    border: emailStatus === 'sent' ? '1px solid rgba(16,185,129,0.3)' : '1px solid rgba(59,130,246,0.3)',
                    color: emailStatus === 'sent' ? 'var(--brand-green)' : 'var(--brand-blue)'
                 }}
              >
                 {emailStatus === 'idle' && <><Send size={14} /> Dispatch via Resend</>}
                 {emailStatus === 'sending' && (
                    <>
                      <div className="absolute inset-0 bg-blue-500/20 animate-pulse"></div>
                      <div className="w-3 h-3 border-2 border-[var(--brand-blue)] border-t-transparent rounded-full animate-spin"></div>
                      Establishing SMTP...
                    </>
                 )}
                 {emailStatus === 'sent' && <><CheckCircle size={14} /> Sent to Nisha</>}
              </button>
            </div>
          )}
        </div>

        {/* Dynamic Index Navigation */}
        <div className="glass-panel p-5 rounded-2xl flex-1 border border-[var(--border-subtle)] hide-on-print">
          <h3 className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)] mb-4 pb-2 border-b border-[rgba(255,255,255,0.05)]">Document Index</h3>
          <div className="space-y-1.5 relative">
             <div className="absolute left-[7px] top-2 bottom-2 w-px bg-[rgba(255,255,255,0.05)]" />
             {sections.map(([key, section]) => {
                const isActive = activeSection === key;
                return (
                  <button key={key} onClick={() => setActiveSection(key)}
                    className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-all flex items-center group relative min-h-[40px]`}
                  >
                    <div className={`absolute left-[5px] w-[5px] h-[5px] rounded-full transition-all duration-300 ${isActive ? 'bg-[var(--brand-blue)] shadow-[0_0_10px_var(--brand-blue)] scale-150' : 'bg-[var(--border-medium)] group-hover:bg-[var(--text-muted)]'}`} />
                    <span className={`ml-5 transition-colors ${isActive ? 'text-white font-bold' : 'text-[var(--text-secondary)] group-hover:text-white'}`}>
                      {section.title}
                    </span>
                    {overrides[key] && (
                       <span className="ml-auto text-[9px] uppercase font-bold px-1.5 py-0.5 rounded bg-[rgba(245,158,11,0.15)] border border-[rgba(245,158,11,0.3)] text-[var(--brand-amber)]">
                         Edited
                       </span>
                    )}
                  </button>
                )
             })}
          </div>
        </div>
      </div>

      {/* Right Content: The Document Page (Main Print Target) */}
      <div className="xl:col-span-3 print-container">
         <div className="glass-panel h-full rounded-3xl bg-[rgba(10,15,25,0.8)] border border-[var(--border-subtle)] overflow-y-auto custom-scrollbar relative shadow-[inset_0_0_60px_rgba(0,0,0,0.5)] print-wrapper">
            <AnimatePresence mode="wait">
              {sections.map(([key, section]) =>
                activeSection === key ? (
                  <BriefingSection
                    key={key}
                    sectionKey={key}
                    section={section}
                    content={getContent(key)}
                    editing={editingSection === key}
                    approved={approved}
                    onEdit={() => setEditingSection(key)}
                    onSave={(newContent) => { setOverrides(prev => ({ ...prev, [key]: newContent })); setEditingSection(null); }}
                    onCancel={() => setEditingSection(null)}
                  />
                ) : null
              )}
            </AnimatePresence>
          {/* Fallback to render ALL sections simultaneously during print so they appear in the PDF! */}
          <div className="hidden print-only-block print:block">
            {sections.map(([key, section]) => (
               <BriefingSection
                  key={`print-${key}`}
                  sectionKey={key}
                  section={section}
                  content={getContent(key)}
                  editing={false}
                  approved={approved}
                  onEdit={() => {}}
                  onSave={() => {}}
                  onCancel={() => {}}
               />
            ))}
          </div>
         </div>
      </div>
    </div>
  );
}

function BriefingSection({ sectionKey, section, content, editing, approved, onEdit, onSave, onCancel }) {
  const [draft, setDraft] = useState(content);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.2 }}
      className="max-w-4xl mx-auto py-6 md:py-12 px-4 md:px-14 min-h-full flex flex-col font-sans"
    >
      <div className="flex items-end justify-between mb-10 pb-6 border-b border-[rgba(255,255,255,0.05)] text-white">
        <div>
           <div className="text-[11px] uppercase font-bold tracking-widest text-[var(--brand-blue)] mb-2 flex items-center gap-2">
             <Cpu size={12} /> AI Drafted Section
           </div>
           <h1 className="text-3xl font-bold tracking-tight text-white/90">{section.title}</h1>
        </div>
        
        {!approved && !editing && (
          <button onClick={onEdit}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.1)] text-[var(--text-secondary)] hover:text-white hide-on-print"
          >
            <Edit3 size={14} /> Edit Draft
          </button>
        )}
        {approved && (
          <div className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-[var(--brand-green)] font-mono bg-[rgba(16,185,129,0.1)] rounded border border-emerald-500/20 hide-on-print">
            <Lock size={12} /> SECURED
          </div>
        )}
      </div>

      <div className="flex-1">
        {editing ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full flex flex-col">
            <div className="flex items-center gap-2 mb-4 px-3 py-2 bg-[rgba(245,158,11,0.1)] border border-[rgba(245,158,11,0.2)] rounded-lg text-xs text-[var(--brand-amber)]">
               <AlertTriangle size={14} /> You are overriding the AI drafted text.
            </div>
            <textarea
              value={draft}
              onChange={e => setDraft(e.target.value)}
              className="w-full flex-1 min-h-[300px] rounded-xl p-5 text-sm md:text-base resize-none focus:outline-none transition-colors border shadow-inner custom-scrollbar"
              style={{
                background: "rgba(0,0,0,0.5)",
                borderColor: "rgba(59,130,246,0.3)",
                color: "var(--text-primary)",
                fontFamily: "var(--font-geist)", // Ensure readability
                lineHeight: 1.8,
              }}
              autoFocus
            />
            <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-[rgba(255,255,255,0.05)]">
              <button onClick={onCancel}
                className="px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] hover:text-white transition-colors">
                Cancel
              </button>
              <button onClick={() => onSave(draft)}
                className="px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-[var(--brand-blue)] hover:bg-blue-600 text-white shadow-lg transition-colors border border-blue-400/50">
                Save Revision
              </button>
            </div>
          </motion.div>
        ) : (
          <div className="prose-dark max-w-none">
            {content.split("\n\n").map((para, i) => (
              <p key={i} className="text-[15px] text-[var(--text-secondary)] leading-loose mb-6 font-[400] tracking-[0.015em]">
                {para.split("\n").map((line, j) => {
                  
                  // Simple heuristic to highlight priority tags in the document if they appear
                  let formattedLine = line;
                  const tagMatches = line.match(/(Priority:\s*(HIGH|MEDIUM|LOW))/i);
                  let highlightClass = "";
                  
                  if (tagMatches) {
                     const prio = tagMatches[2].toUpperCase();
                     if (prio === 'HIGH') highlightClass = "text-red-400 font-bold bg-red-500/10 px-1 rounded";
                     else if (prio === 'MEDIUM') highlightClass = "text-amber-400 font-bold bg-amber-500/10 px-1 rounded";
                     else highlightClass = "text-emerald-400 font-bold bg-emerald-500/10 px-1 rounded";
                     
                     const parts = line.split(tagMatches[0]);
                     return (
                        <span key={j}>
                           {parts[0]}
                           <span className={highlightClass}>{tagMatches[0]}</span>
                           {parts[1]}
                           {j < para.split("\n").length - 1 && <br />}
                        </span>
                     )
                  }

                  // Numbered list styling
                  if (line.match(/^\d+\./)) {
                     const num = line.match(/^\d+\./)[0];
                     const rest = line.substring(num.length);
                     return (
                       <span key={j} className="block mt-2 pl-2">
                          <span className="text-[var(--text-muted)] font-mono font-bold mr-2">{num}</span>
                          <span className="text-white/80">{rest}</span>
                          {j < para.split("\n").length - 1 && <br />}
                       </span>
                     )
                  }

                  return (
                    <span key={j}>
                      {line.includes('VEHICLE NEAR ZONE C') || line.includes('UNASSIGNED BADGE FAILURES') ? (
                         <span className="text-white font-bold">{line}</span>
                      ) : (
                         line
                      )}
                      {j < para.split("\n").length - 1 && <br />}
                    </span>
                  );
                })}
              </p>
            ))}
          </div>
        )}
      </div>

      {!editing && (
        <div className="mt-12 pt-6 border-t border-[rgba(255,255,255,0.02)] flex items-center justify-between opacity-50">
           <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-[var(--text-muted)]">
             <Cpu size={12}/> Automatically synthesized from field event logs.
           </div>
        </div>
      )}
    </motion.div>
  );
}
