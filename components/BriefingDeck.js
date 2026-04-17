"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, ClipboardList, Lock, PencilLine, ShieldAlert } from "lucide-react";

export default function BriefingDeck({ briefing, incidents, agentDone, approved, onApprove }) {
  const [activeSection, setActiveSection] = useState("summary");
  const [editingSection, setEditingSection] = useState(null);
  const [overrides, setOverrides] = useState({});

  if (!agentDone || !briefing) {
    return (
      <div className="glass-panel rounded-[32px] p-10 flex min-h-[520px] items-center justify-center border border-dashed border-[var(--border-strong)]">
        <div className="max-w-md text-center">
          <p className="panel-kicker justify-center">Leadership brief</p>
          <h2 className="panel-title mb-3">Run the investigation to generate the morning briefing</h2>
          <p className="text-sm text-[var(--text-secondary)]">
            The briefing pulls its narrative, safe-to-close items, and follow-up actions from the incident review state.
          </p>
        </div>
      </div>
    );
  }

  const sections = Object.entries(briefing.sections);
  const reviewedCount = incidents.filter((incident) => incident.reviewState !== "pending" && incident.reviewState !== "in_review").length;
  const pendingCount = incidents.length - reviewedCount;
  const currentContent = overrides[activeSection] ?? briefing.sections[activeSection]?.content ?? "";

  return (
    <div className="grid gap-6 xl:grid-cols-[320px_minmax(0,1fr)] h-full">
      <aside className="glass-panel rounded-[30px] p-5 flex flex-col gap-5">
        <div>
          <p className="panel-kicker">Morning summary</p>
          <h2 className="panel-title">Leadership-ready briefing</h2>
        </div>

        <div className="rounded-[24px] border border-[var(--border-subtle)] bg-[var(--surface-raised)] p-4">
          <div className="grid gap-3">
            <MetaRow label="Generated" value={briefing.generatedAt} />
            <MetaRow label="Prepared for" value={briefing.preparedFor} />
            <MetaRow label="Prepared by" value={briefing.preparedBy} />
          </div>
        </div>

        <div className="rounded-[24px] border border-[var(--border-subtle)] bg-[var(--surface-raised)] p-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">Review readiness</p>
            <span className="text-sm font-semibold text-[var(--text-primary)]">
              {reviewedCount}/{incidents.length}
            </span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-[var(--surface-tertiary)] mb-3">
            <div
              className="h-full rounded-full bg-[var(--brand-green)] transition-all"
              style={{ width: `${(reviewedCount / Math.max(incidents.length, 1)) * 100}%` }}
            />
          </div>
          <p className="text-sm text-[var(--text-secondary)]">
            {pendingCount === 0
              ? "All investigation threads have an operator stance."
              : `${pendingCount} investigation thread${pendingCount === 1 ? "" : "s"} still need a final operator stance.`}
          </p>
        </div>

        <button type="button" className="btn-primary" disabled={pendingCount > 0 || approved} onClick={onApprove}>
          {approved ? (
            <>
              <Lock size={16} />
              Briefing approved
            </>
          ) : (
            <>
              <CheckCircle size={16} />
              {pendingCount === 0 ? "Approve for 08:00 review" : "Finish review before approval"}
            </>
          )}
        </button>

        <div className="rounded-[24px] border border-[var(--border-subtle)] bg-[var(--surface-raised)] p-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)] mb-2">Sections</p>
          <div className="space-y-2">
            {sections.map(([key, section]) => {
              const selected = activeSection === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setActiveSection(key)}
                  className="w-full rounded-[18px] border px-3 py-3 text-left transition-all"
                  style={{
                    background: selected ? "var(--surface-panel-strong)" : "transparent",
                    borderColor: selected ? "var(--border-strong)" : "transparent",
                  }}
                >
                  <p className="text-sm font-medium text-[var(--text-primary)]">{section.title}</p>
                  {overrides[key] && (
                    <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--brand-amber)]">
                      Operator edited
                    </p>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </aside>

      <section className="glass-panel rounded-[32px] p-6 md:p-8 overflow-hidden">
        <AnimatePresence mode="wait">
          <BriefingSection
            key={activeSection}
            sectionKey={activeSection}
            section={briefing.sections[activeSection]}
            content={currentContent}
            editing={editingSection === activeSection}
            approved={approved}
            onEdit={() => setEditingSection(activeSection)}
            onCancel={() => setEditingSection(null)}
            onSave={(draft) => {
              setOverrides((previous) => ({ ...previous, [activeSection]: draft }));
              setEditingSection(null);
            }}
          />
        </AnimatePresence>
      </section>
    </div>
  );
}

function BriefingSection({ sectionKey, section, content, editing, approved, onEdit, onCancel, onSave }) {
  const [draft, setDraft] = useState(content);

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="h-full flex flex-col">
      <div className="flex flex-wrap items-start justify-between gap-4 pb-6 border-b border-[var(--border-subtle)]">
        <div>
          <p className="panel-kicker">{sectionKey.replace("_", " ")}</p>
          <h2 className="text-3xl font-semibold text-[var(--text-primary)] max-w-3xl">{section.title}</h2>
        </div>
        {!approved && !editing && (
          <button type="button" className="btn-secondary" onClick={onEdit}>
            <PencilLine size={16} />
            Edit section
          </button>
        )}
      </div>

      <div className="flex-1 pt-6 overflow-y-auto pr-2 custom-scrollbar">
        {editing ? (
          <div className="space-y-4 h-full">
            <div className="rounded-[22px] border border-[rgba(242,169,59,0.28)] bg-[rgba(242,169,59,0.08)] px-4 py-3 text-sm text-[var(--text-secondary)] flex items-start gap-3">
              <ShieldAlert size={16} className="mt-0.5 text-[var(--brand-amber)]" />
              Operator edits will override the AI draft for this section.
            </div>
            <textarea
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              className="h-[360px] w-full rounded-[24px] border border-[var(--border-strong)] bg-[var(--surface-base)] px-5 py-4 text-sm text-[var(--text-primary)] outline-none"
            />
            <div className="flex items-center justify-end gap-3">
              <button type="button" className="btn-secondary" onClick={onCancel}>
                Cancel
              </button>
              <button type="button" className="btn-primary" onClick={() => onSave(draft)}>
                Save revision
              </button>
            </div>
          </div>
        ) : (
          <article className="space-y-5">
            {content.split("\n\n").map((paragraph, index) => (
              <div key={`${sectionKey}-${index}`} className="rounded-[24px] border border-[var(--border-subtle)] bg-[var(--surface-panel)] p-5">
                {paragraph.split("\n").map((line, lineIndex) => (
                  <p key={`${sectionKey}-${index}-${lineIndex}`} className="text-[15px] leading-7 text-[var(--text-secondary)]">
                    {line}
                  </p>
                ))}
              </div>
            ))}
          </article>
        )}
      </div>
    </motion.div>
  );
}

function MetaRow({ label, value }) {
  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)] mb-1">{label}</p>
      <p className="text-sm text-[var(--text-primary)]">{value}</p>
    </div>
  );
}
