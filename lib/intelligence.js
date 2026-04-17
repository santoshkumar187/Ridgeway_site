import { SITE_CONFIG } from "./siteData";

export const INCIDENT_BLUEPRINTS = [
  {
    id: "inc-zone-c",
    leadEventId: "evt-002",
    eventIds: ["evt-002", "evt-005"],
    supportEventIds: ["evt-004"],
    title: "Zone C corridor anomaly",
    zone: "Block C and restricted storage yard",
    priority: "critical",
    defaultVerdict: "escalate",
    fallbackConfidence: 0.71,
    pendingSummary:
      "A vehicle path, a later power dip, and delayed drone coverage all touch the same restricted corridor. This cluster needs leadership visibility before 08:00.",
    openQuestion:
      "Was the service-road vehicle a harmless shortcut, or the first sign of after-hours access near restricted storage?",
    evidence: [
      "Vehicle movement was detected beside restricted Zone C at 01:17 with no plate capture.",
      "The drone cleared the area later, but only after a 151 minute timing gap.",
      "Block C sensor confidence dipped again during the 04:10 power fluctuation.",
    ],
    followUps: [
      "Review service-road CCTV for 01:00-02:00.",
      "Confirm no approved vehicle route was scheduled near Zone C.",
      "Ask engineering to validate Block C sensor C2 after the power dip.",
    ],
    owner: "Security lead + facilities engineering",
  },
  {
    id: "inc-zone-d",
    leadEventId: "evt-003",
    eventIds: ["evt-003"],
    supportEventIds: [],
    title: "Unassigned badge access attempt",
    zone: "Zone D control room access point",
    priority: "high",
    defaultVerdict: "escalate",
    fallbackConfidence: 0.65,
    pendingSummary:
      "A temporary badge with no named owner attempted controlled access three times. The process failure matters even if intent was benign.",
    openQuestion:
      "Who was holding TEMP-2941, and why were they trying to enter a restricted control point?",
    evidence: [
      "Three consecutive failed badge swipes occurred between 02:45 and 02:47.",
      "TEMP-2941 is a batch-issued temporary badge with no named owner in the log.",
      "The nearest camera was unavailable during the attempt window.",
    ],
    followUps: [
      "Trace TEMP-2941 through HR or contractor issuance records.",
      "Confirm who was physically in the Zone D corridor at 02:45.",
      "Repair or replace the offline camera covering the west access door.",
    ],
    owner: "Security operations + HR",
  },
  {
    id: "inc-gate-3",
    leadEventId: "evt-001",
    eventIds: ["evt-001"],
    supportEventIds: ["evt-004"],
    title: "Gate 3 perimeter weather noise",
    zone: "North perimeter and Gate 3 fence line",
    priority: "monitor",
    defaultVerdict: "likely_harmless",
    fallbackConfidence: 0.78,
    pendingSummary:
      "The fence trigger looks consistent with overnight wind conditions, but it should still be explained clearly in the morning brief.",
    openQuestion:
      "Do we close this as a false positive now, or ask maintenance to recalibrate the sensor because of the longer trigger duration?",
    evidence: [
      "Wind exceeded the Gate 3 sensor threshold during the alert window.",
      "The same fence sensor is known to false-positive under those conditions.",
      "Drone patrol later confirmed the perimeter was intact.",
    ],
    followUps: [
      "Log a calibration check for FENCE-N-07.",
      "Keep the event in the briefing as closed-but-documented noise.",
    ],
    owner: "Perimeter systems maintainer",
  },
  {
    id: "inc-systems",
    leadEventId: "evt-006",
    eventIds: ["evt-006"],
    supportEventIds: [],
    title: "Scheduled systems maintenance noise",
    zone: "Gate 2 east access",
    priority: "routine",
    defaultVerdict: "routine",
    fallbackConfidence: 0.92,
    pendingSummary:
      "The only remaining signal was a scheduled CCTV restart. It should stay visible as context, but it does not require escalation.",
    openQuestion:
      "Can the maintenance calendar be surfaced more clearly to supervisors so this does not look suspicious next time?",
    evidence: [
      "CAM-E-02 went offline during a scheduled firmware health cycle.",
      "The device self-recovered without operator action.",
      "No other nearby security events overlapped the outage.",
    ],
    followUps: [
      "Expose scheduled maintenance windows in the ops console.",
    ],
    owner: "Platform operations",
  },
];

const REVIEW_LABELS = {
  approved: "Approved",
  challenged: "Challenged",
  follow_up: "Needs follow-up",
  in_review: "Partially reviewed",
  pending: "Awaiting review",
};

function formatIncidentWindow(events) {
  const times = events
    .map((event) => event.time)
    .filter(Boolean)
    .sort((left, right) => left.localeCompare(right));

  if (times.length === 0) {
    return "No time window";
  }

  if (times.length === 1) {
    return times[0];
  }

  return `${times[0]}-${times[times.length - 1]}`;
}

function getReviewState(events) {
  const verdicts = events.map((event) => event.userVerdict).filter(Boolean);

  if (verdicts.length === 0) {
    return "pending";
  }

  if (verdicts.includes("challenged")) {
    return "challenged";
  }

  if (verdicts.includes("follow_up")) {
    return "follow_up";
  }

  if (verdicts.length === events.length && verdicts.every((verdict) => verdict === "approved")) {
    return "approved";
  }

  return "in_review";
}

function formatConfidence(confidence) {
  return `${Math.round(confidence * 100)}%`;
}

function unique(values) {
  return [...new Set(values.filter(Boolean))];
}

function buildSection(title, content) {
  return { title, content };
}

function buildNumberedList(items) {
  return items.map((item, index) => `${index + 1}. ${item}`).join("\n");
}

export function buildIncidents(events) {
  const eventMap = new Map(events.map((event) => [event.id, event]));

  return INCIDENT_BLUEPRINTS.map((blueprint) => {
    const primaryEvents = blueprint.eventIds.map((id) => eventMap.get(id)).filter(Boolean);
    const supportEvents = blueprint.supportEventIds.map((id) => eventMap.get(id)).filter(Boolean);
    const leadEvent = eventMap.get(blueprint.leadEventId) ?? primaryEvents[0] ?? supportEvents[0];

    if (!leadEvent) {
      return null;
    }

    const leadAssessment = leadEvent.aiAssessment;
    const reviewState = getReviewState(primaryEvents);
    const allEvents = [...primaryEvents, ...supportEvents];

    return {
      id: blueprint.id,
      title: blueprint.title,
      zone: blueprint.zone,
      priority: blueprint.priority,
      verdict: leadAssessment?.verdict ?? blueprint.defaultVerdict,
      confidence: leadAssessment?.confidence ?? blueprint.fallbackConfidence,
      confidenceLabel: formatConfidence(leadAssessment?.confidence ?? blueprint.fallbackConfidence),
      timeWindow: formatIncidentWindow(allEvents),
      summary: leadAssessment?.summary ?? blueprint.pendingSummary,
      openQuestion: blueprint.openQuestion,
      evidence: blueprint.evidence,
      followUps: blueprint.followUps,
      owner: blueprint.owner,
      leadEventId: leadEvent.id,
      eventIds: primaryEvents.map((event) => event.id),
      supportEventIds: supportEvents.map((event) => event.id),
      eventCount: allEvents.length,
      reviewState,
      reviewLabel: REVIEW_LABELS[reviewState],
      reviewProgress:
        primaryEvents.length === 0
          ? 0
          : primaryEvents.filter((event) => event.userVerdict !== null).length / primaryEvents.length,
      unresolvedFollowUps: blueprint.followUps.length,
    };
  }).filter(Boolean);
}

export function getOperationsMetrics(events, incidents) {
  const escalations = incidents.filter((incident) => incident.verdict === "escalate").length;
  const safeToClose = incidents.filter((incident) => incident.verdict !== "escalate").length;
  const pendingReviews = incidents.filter(
    (incident) => incident.reviewState === "pending" || incident.reviewState === "in_review"
  ).length;
  const followUpCount = unique(incidents.flatMap((incident) => incident.followUps)).length;
  const reviewedEvents = events.filter((event) => event.userVerdict !== null).length;

  return {
    escalations,
    safeToClose,
    pendingReviews,
    followUpCount,
    reviewedEvents,
    totalEvents: events.length,
    totalIncidents: incidents.length,
    highestPriority: incidents.find((incident) => incident.priority === "critical")?.title ?? "No critical incident",
  };
}

export function buildMorningBriefing(incidents, events) {
  const escalations = incidents.filter((incident) => incident.verdict === "escalate");
  const harmless = incidents.filter((incident) => incident.verdict === "likely_harmless");
  const routine = incidents.filter((incident) => incident.verdict === "routine");
  const droneEvent = events.find((event) => event.id === "evt-004");
  const followUps = unique(incidents.flatMap((incident) => incident.followUps));
  const reviewReady = incidents.every((incident) => incident.reviewState !== "pending" && incident.reviewState !== "in_review");

  return {
    generatedAt: "06:10 AM",
    preparedFor: `${SITE_CONFIG.siteHead} - Site Head (${SITE_CONFIG.briefingTime} review)`,
    preparedBy: reviewReady
      ? `6:10 Assistant + ${SITE_CONFIG.reviewerName} review complete`
      : `6:10 Assistant draft, ${SITE_CONFIG.reviewerName} review pending`,
    sections: {
      summary: buildSection(
        "What happened last night?",
        `${events.length} overnight signals collapsed into ${incidents.length} investigation threads. ${escalations.length} thread${escalations.length === 1 ? "" : "s"} need leadership attention before ${SITE_CONFIG.briefingTime}. The most important issue is the Zone C corridor anomaly, where a vehicle path, later sensor confidence loss, and delayed drone coverage leave an evidence gap.`
      ),
      harmless: buildSection(
        "What was harmless?",
        harmless.length === 0
          ? "No incidents were confidently closed as harmless."
          : harmless
              .map((incident) => `${incident.title}: ${incident.summary}`)
              .join("\n\n")
      ),
      escalation: buildSection(
        "What deserves escalation?",
        escalations.length === 0
          ? "No escalation items are currently open."
          : escalations
              .map(
                (incident, index) =>
                  `${index + 1}. ${incident.title} (${incident.timeWindow}) - ${incident.summary} Primary question: ${incident.openQuestion}`
              )
              .join("\n\n")
      ),
      drone: buildSection(
        "What did the drone check?",
        droneEvent?.aiAssessment?.summary ??
          "The scheduled drone patrol covered Gate 3 and the Zone C exterior later in the night. It provided perimeter confirmation, but not real-time confirmation of the earlier vehicle event."
      ),
      followup: buildSection(
        "What still needs follow-up?",
        followUps.length === 0 ? "No follow-ups remain." : buildNumberedList(followUps)
      ),
      actions: buildSection(
        "Recommended actions before 08:00",
        reviewReady
          ? `The briefing is review-ready. Open with ${escalations[0]?.title ?? "the highest-priority incident"}, then close with the known-safe items and maintenance follow-ups.`
          : `Finish human review on the ${incidents
              .filter((incident) => incident.reviewState === "pending" || incident.reviewState === "in_review")
              .map((incident) => incident.title)
              .join(", ")} threads, then lock the leadership brief.`
      ),
      routine: buildSection(
        "Routine items captured",
        routine.length === 0
          ? "No routine items were logged."
          : routine.map((incident) => `${incident.title}: ${incident.summary}`).join("\n\n")
      ),
    },
  };
}

export function getFollowUpMission(incidents) {
  const priorityIncident =
    incidents.find((incident) => incident.priority === "critical") ??
    incidents.find((incident) => incident.verdict === "escalate") ??
    incidents[0];

  if (!priorityIncident) {
    return null;
  }

  return {
    title: "Recommended dawn sweep",
    objective: `Re-check ${priorityIncident.zone} for evidence tied to ${priorityIncident.title.toLowerCase()}.`,
    route: ["Launch Pad", "Gate 3 north fence", "Zone C service road", "Block C equipment shed", "Return to base"],
    rationale: priorityIncident.openQuestion,
  };
}
