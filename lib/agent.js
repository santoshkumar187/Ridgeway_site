// AI Agent - MCP-style tool interface for the 6:10 Assistant
// Simulates a real agent with tool-calling capabilities

import { OVERNIGHT_EVENTS, DRONE_ROUTES, ZONES, GATES, SUPERVISOR_NOTE } from './siteData';

// ─── Tool Definitions (MCP-style) ────────────────────────────────────────────

export const TOOLS = {
  fetch_events: {
    name: "fetch_events",
    description: "Retrieve all overnight security events from the site monitoring system. Can filter by type, severity, zone, or time range.",
    parameters: {
      type: { type: "string", optional: true, enum: ["fence_alert", "vehicle_movement", "badge_failure", "drone_patrol", "signal_anomaly"] },
      severity: { type: "string", optional: true, enum: ["high", "medium", "low", "info"] },
      zone: { type: "string", optional: true },
      after: { type: "string", optional: true, description: "ISO time string HH:MM" },
      before: { type: "string", optional: true },
    },
  },
  get_zone_context: {
    name: "get_zone_context",
    description: "Retrieve contextual information about a specific site zone including access rules, recent history, and risk profile.",
    parameters: {
      zone_id: { type: "string", required: true },
    },
  },
  cross_reference_events: {
    name: "cross_reference_events",
    description: "Find temporal and spatial correlations between two or more events. Identifies if events may be causally linked.",
    parameters: {
      event_ids: { type: "array", required: true },
    },
  },
  fetch_drone_telemetry: {
    name: "fetch_drone_telemetry",
    description: "Retrieve drone patrol telemetry including waypoints, coverage, and observations for a given route or drone ID.",
    parameters: {
      route_id: { type: "string", optional: true },
      drone_id: { type: "string", optional: true },
    },
  },
  check_badge_registry: {
    name: "check_badge_registry",
    description: "Look up badge holder information, access permissions, and recent activity for a given badge ID.",
    parameters: {
      badge_id: { type: "string", required: true },
    },
  },
  assess_weather_context: {
    name: "assess_weather_context",
    description: "Retrieve recorded weather conditions for the night to provide context for sensor anomalies.",
    parameters: {
      time_range: { type: "string", optional: true },
    },
  },
  flag_for_escalation: {
    name: "flag_for_escalation",
    description: "Mark an event as requiring escalation to site leadership with a reason and urgency level.",
    parameters: {
      event_id: { type: "string", required: true },
      reason: { type: "string", required: true },
      urgency: { type: "string", enum: ["immediate", "morning-briefing", "end-of-day"] },
    },
  },
  draft_briefing_section: {
    name: "draft_briefing_section",
    description: "Generate a draft summary for a specific section of the morning briefing document.",
    parameters: {
      section: { type: "string", required: true, enum: ["summary", "harmless", "escalation", "drone", "followup", "actions"] },
      context: { type: "string", required: true },
    },
  },
};

// ─── Tool Execution Simulations ───────────────────────────────────────────────

function executeTool(toolName, params) {
  switch (toolName) {
    case "fetch_events": {
      let events = [...OVERNIGHT_EVENTS];
      if (params.type) events = events.filter(e => e.type === params.type);
      if (params.severity) events = events.filter(e => e.severity === params.severity);
      if (params.zone) events = events.filter(e => e.zone === params.zone);
      return { events, count: events.length };
    }
    case "get_zone_context": {
      const zone = ZONES.find(z => z.id === params.zone_id);
      const zoneEvents = OVERNIGHT_EVENTS.filter(e => e.zone === params.zone_id);
      const zoneRisk = {
        "zone-c": { riskLevel: "high", notes: "Restricted storage. No after-hours vehicle access permitted. Last incident: 3 weeks ago (contractor vehicle, resolved).", accessPolicy: "Authorized personnel only, 06:00–18:00" },
        "zone-e": { riskLevel: "medium", notes: "North perimeter. Historical fence alerts primarily weather-related (wind >15 km/h). Two genuine intrusion attempts in past 18 months.", accessPolicy: "Patrol access only" },
        "zone-d": { riskLevel: "medium", notes: "Control room area. Badge access required. Temporary contractor badges (TEMP-series) have restricted access.", accessPolicy: "Staff + pre-approved contractors" },
        "zone-b": { riskLevel: "low", notes: "Active work area. Monitored by 4 cameras. Normal night crew access.", accessPolicy: "Site staff overnight" },
        "zone-a": { riskLevel: "low", notes: "Main entry. Highest traffic zone. Well monitored.", accessPolicy: "All credentialed staff" },
      };
      return { zone, events: zoneEvents, context: zoneRisk[params.zone_id] || { riskLevel: "unknown", notes: "No context available" } };
    }
    case "cross_reference_events": {
      const events = params.event_ids.map(id => OVERNIGHT_EVENTS.find(e => e.id === id)).filter(Boolean);
      const correlations = [];

      // Check for spatial proximity
      for (let i = 0; i < events.length; i++) {
        for (let j = i + 1; j < events.length; j++) {
          const latDiff = Math.abs(events[i].coords[0] - events[j].coords[0]);
          const lngDiff = Math.abs(events[i].coords[1] - events[j].coords[1]);
          const isNearby = latDiff < 0.008 && lngDiff < 0.008;

          // Time difference in minutes
          const timeA = events[i].time.split(":").map(Number);
          const timeB = events[j].time.split(":").map(Number);
          const minA = timeA[0] * 60 + timeA[1];
          const minB = timeB[0] * 60 + timeB[1];
          const timeDiff = Math.abs(minA - minB);

          if (isNearby || timeDiff < 120) {
            correlations.push({
              eventA: events[i].id,
              eventB: events[j].id,
              spatiallyLinked: isNearby,
              temporallyLinked: timeDiff < 120,
              timeDiffMinutes: timeDiff,
              assessment: isNearby && timeDiff < 180
                ? "Possible correlation – same area, close in time"
                : timeDiff < 60
                ? "Temporal proximity – occurred within 1 hour"
                : "Weak link – same zone, different times",
            });
          }
        }
      }
      return { events, correlations };
    }
    case "fetch_drone_telemetry": {
      const route = params.route_id ? DRONE_ROUTES[params.route_id] : Object.values(DRONE_ROUTES)[0];
      return { route, summary: `Drone ${route.droneId} completed ${route.name} patrol from ${route.startTime} to ${route.endTime}. ${route.observations.length} observations logged.` };
    }
    case "check_badge_registry": {
      const registry = {
        "TEMP-2941": {
          badgeId: "TEMP-2941",
          type: "Temporary Contractor",
          holder: "Unassigned – Temp batch issued 2025-11-12",
          validUntil: "2025-12-31",
          authorizedZones: ["zone-a", "zone-b"],
          restrictedZones: ["zone-c", "zone-d", "zone-e"],
          lastSuccessfulAccess: "Zone A Gate 1 – 14:32 yesterday",
          recentFailures: 3,
          note: "TEMP-series badges are batch-issued. This badge is not assigned to a named individual. HR should be able to trace from issuance records.",
        },
      };
      return registry[params.badge_id] || { badgeId: params.badge_id, note: "Badge not found in registry." };
    }
    case "assess_weather_context": {
      return {
        nightSummary: {
          conditions: "Partly cloudy, intermittent light rain",
          windSpeed: { average: "16 km/h", peak: "23 km/h at 22:20–22:50" },
          temperature: { low: "6°C", high: "9°C" },
          relevance: "Wind speed around 22:30 was above the Gate 3 fence sensor threshold (15 km/h). This is a known cause of false positives on FENCE-N-07.",
          historicalFalsePositiveRate: "~68% of alerts on FENCE-N-07 occur when wind >15 km/h",
        },
      };
    }
    case "flag_for_escalation": {
      return { flagged: true, eventId: params.event_id, reason: params.reason, urgency: params.urgency };
    }
    case "draft_briefing_section": {
      return { drafted: true, section: params.section };
    }
    default:
      return { error: `Unknown tool: ${toolName}` };
  }
}

// ─── Agent Step Logger ────────────────────────────────────────────────────────

export const AGENT_INVESTIGATION_STEPS = [
  {
    id: "step-1",
    phase: "discovery",
    label: "Fetching all overnight events",
    tool: "fetch_events",
    params: {},
    thinking: "Let me start by pulling all overnight events to understand what we're working with before diving into specifics.",
    delay: 800,
  },
  {
    id: "step-2",
    phase: "discovery",
    label: "Assessing weather conditions for context",
    tool: "assess_weather_context",
    params: { time_range: "22:00–06:00" },
    thinking: "The fence alert at 22:34 could be weather-related. Let me check conditions first before drawing conclusions.",
    delay: 600,
  },
  {
    id: "step-3",
    phase: "investigation",
    label: "Getting Zone C context (restricted area)",
    tool: "get_zone_context",
    params: { zone_id: "zone-c" },
    thinking: "The supervisor flagged Block C and there's a vehicle near Zone C. I need to understand the risk profile and access policy for this area.",
    delay: 700,
  },
  {
    id: "step-4",
    phase: "investigation",
    label: "Checking badge registry for TEMP-2941",
    tool: "check_badge_registry",
    params: { badge_id: "TEMP-2941" },
    thinking: "Three failed badge swipes is a pattern worth examining. I need to know who this badge belongs to and whether they should have access to Zone D.",
    delay: 900,
  },
  {
    id: "step-5",
    phase: "investigation",
    label: "Fetching drone patrol telemetry",
    tool: "fetch_drone_telemetry",
    params: { route_id: "night-loop-alpha" },
    thinking: "The drone patrol covered Gate 3 and Zone C. I need to see what it actually observed and whether it can corroborate or contradict the other events.",
    delay: 750,
  },
  {
    id: "step-6",
    phase: "correlation",
    label: "Cross-referencing fence alert + vehicle + power dip",
    tool: "cross_reference_events",
    params: { event_ids: ["evt-001", "evt-002", "evt-005"] },
    thinking: "The fence alert, vehicle near Zone C, and the power dip in Block C all occurred in the same general area. Are these connected?",
    delay: 1000,
  },
  {
    id: "step-7",
    phase: "correlation",
    label: "Cross-referencing vehicle movement + drone timing",
    tool: "cross_reference_events",
    params: { event_ids: ["evt-002", "evt-004"] },
    thinking: "The vehicle was spotted at 01:17. The drone patrolled Zone C at 03:48. That's a 2.5 hour gap – the drone wouldn't have seen the vehicle. I need to flag this timing gap.",
    delay: 800,
  },
  {
    id: "step-8",
    phase: "assessment",
    label: "Flagging vehicle near Zone C for escalation",
    tool: "flag_for_escalation",
    params: { event_id: "evt-002", reason: "Unidentified vehicle adjacent to restricted Zone C at 01:17. No plate capture. Drone did not cover this location until 2.5 hours later. Access logs show no authorized night vehicle movement in this area.", urgency: "morning-briefing" },
    thinking: "This is the event that deserves the most attention. The drone couldn't confirm or deny because of the timing gap.",
    delay: 600,
  },
  {
    id: "step-9",
    phase: "assessment",
    label: "Flagging unassigned badge failure for follow-up",
    tool: "flag_for_escalation",
    params: { event_id: "evt-003", reason: "TEMP-2941 is an unassigned batch badge. Three consecutive failed attempts at a restricted zone control room. Badge holder identity unknown. HR trace required.", urgency: "morning-briefing" },
    thinking: "An unassigned badge trying to access a restricted area is a process gap at minimum. Someone is carrying a badge that shouldn't grant them Zone D access.",
    delay: 700,
  },
  {
    id: "step-10",
    phase: "drafting",
    label: "Drafting morning briefing",
    tool: "draft_briefing_section",
    params: { section: "summary", context: "6 overnight events across 5 zones. 2 warrant escalation. Fence alert likely weather. Block C power dip maintenance-flagged." },
    thinking: "Now I have enough context to draft the full morning briefing for Maya.",
    delay: 1200,
  },
];

// ─── AI Assessment Generator ──────────────────────────────────────────────────

export function generateAIAssessment(eventId, toolResults) {
  const assessments = {
    "evt-001": {
      verdict: "likely_harmless",
      confidence: 0.78,
      summary: "Fence alert at Gate 3 at 22:34 is consistent with recorded wind conditions. Peak wind speed of 23 km/h at 22:20–22:50 exceeds the sensor's known false-positive threshold. FENCE-N-07 has a 68% false-positive rate in these conditions. Drone patrol at 03:36 found gate perimeter visually intact. No corroborating events.",
      uncertainties: ["No visual confirmation at time of alert", "4.2-second trigger is longer than typical wind false positives (usually <2s)"],
      recommendedAction: "Log as probable false positive. Note extended trigger duration for sensor calibration team.",
    },
    "evt-002": {
      verdict: "escalate",
      confidence: 0.71,
      summary: "Unidentified vehicle adjacent to restricted Zone C at 01:17. Zone C is a high-risk restricted storage yard with no authorized after-hours vehicle access. No plate was captured. The drone patrol covered this area 2.5 hours later and found no vehicle – this is expected given the timing gap, not evidence of harmlessness.",
      uncertainties: ["Vehicle may have been a contractor taking a service road shortcut (known issue at this site)", "No confirmation of Zone C entry – vehicle remained adjacent", "Drone timing gap means no aerial confirmation of vehicle disposition"],
      recommendedAction: "Escalate to morning briefing. Request CCTV review of service road between 01:00–02:00. Confirm with zone access logs. If no authorized record, treat as unauthorized activity.",
    },
    "evt-003": {
      verdict: "escalate",
      confidence: 0.65,
      summary: "Three failed swipes from badge TEMP-2941 at a Zone D controlled access point (02:45–02:47). TEMP-2941 is an unassigned batch badge – it is not linked to a named individual. Zone D is restricted; this badge type has no authorized Zone D access. Three consecutive attempts suggest intentional access, not accident.",
      uncertainties: ["Badge may have been issued to someone legitimately but not yet registered to a person", "The bearer may not have known they were attempting restricted access", "Nearest camera (CAM-D-04) was offline"],
      recommendedAction: "Escalate: HR to trace TEMP-2941 issuance. Security team to identify who was in Zone D area at 02:45. Process gap: unassigned TEMP badges should not be in circulation.",
    },
    "evt-004": {
      verdict: "routine",
      confidence: 0.95,
      summary: "Scheduled drone patrol SD-7 Night Loop Alpha completed normally. Route covered Gate 3 perimeter (visual clear at 03:36) and Zone C adjacency (clear at 03:48). All drone sensors nominal. No anomalies flagged. This event is informational and confirms the perimeter was clear during the patrol window.",
      uncertainties: [],
      recommendedAction: "No action required. Include in briefing as confirmation of patrol coverage.",
    },
    "evt-005": {
      verdict: "likely_harmless",
      confidence: 0.82,
      summary: "Power dip in Block C equipment shed lasted 11 seconds at 04:10. Backup systems engaged correctly. The affected sensors (shed-lights, sensor-array-C2) recovered. This is consistent with an equipment load fluctuation or brief grid issue. Supervisor Raghav specifically flagged this – likely because sensor C2 went temporarily offline, which could affect monitoring confidence for that period.",
      uncertainties: ["Sensor C2 offline window means no monitoring data for that sensor during the dip", "Temporal proximity to vehicle event (3 hours prior) – likely unrelated but not impossible"],
      recommendedAction: "Log as maintenance item. Notify facility engineering. Sensor C2 should be checked for data integrity during offline window.",
    },
    "evt-006": {
      verdict: "routine",
      confidence: 0.92,
      summary: "CCTV camera CAM-E-02 at Gate 2 went offline for 3 minutes 40 seconds at 05:02 due to a scheduled firmware health check cycle. Camera self-recovered. This is expected scheduled maintenance behavior and does not indicate a security issue.",
      uncertainties: [],
      recommendedAction: "No action required. Ensure maintenance schedule is visible to night supervisors to avoid unnecessary investigation.",
    },
  };
  return assessments[eventId] || null;
}

// ─── Full Morning Briefing Content ────────────────────────────────────────────

export const MORNING_BRIEFING = {
  generatedAt: "06:10 AM",
  preparedFor: "Nisha – Site Head (08:00 AM Review)",
  preparedBy: "6:10 Assistant (AI) + Maya (Ops Lead – review pending)",
  sections: {
    summary: {
      title: "What happened last night?",
      content: `Six events were recorded between 22:00 and 06:00 across five zones of Ridgeway Site. Two events warrant leadership attention: an unidentified vehicle adjacent to restricted Zone C at 01:17 AM, and three consecutive badge failures from an unassigned contractor badge at the Zone D control room access point at 02:45 AM. The remaining four events are assessed as routine or weather-related. Drone Patrol SD-7 completed the Night Loop Alpha route as scheduled and confirmed perimeter integrity during its coverage window.`,
    },
    harmless: {
      title: "What was harmless?",
      content: `The Gate 3 fence alert at 22:34 is consistent with recorded peak wind conditions (23 km/h) and falls within the known false-positive profile of sensor FENCE-N-07. The Block C power dip at 04:10 triggered correctly configured backup systems and is classified as a maintenance item. The Gate 2 CCTV offline period at 05:02 was a scheduled firmware cycle and the camera self-recovered.`,
    },
    escalation: {
      title: "What deserves escalation?",
      content: `1. VEHICLE NEAR ZONE C (01:17 AM) – Priority: HIGH. An unidentified light van-type vehicle was detected moving along the service road adjacent to restricted Zone C. No plate was captured. No authorized after-hours vehicle movement is logged for this area. The drone did not cover this location until 2.5 hours later, leaving a temporal gap in aerial confirmation. CCTV review of the service road between 01:00–02:00 is required.\n\n2. UNASSIGNED BADGE FAILURES – Zone D (02:45 AM) – Priority: MEDIUM. Three consecutive failed access attempts at the Zone D controlled access point using an unassigned TEMP-series batch badge (TEMP-2941). The badge is not linked to a named individual and is not authorized for Zone D. The nearest camera was offline. HR and security need to trace who was carrying this badge.`,
    },
    drone: {
      title: "What did the drone check?",
      content: `Drone SD-7 completed Night Loop Alpha from 03:30 to 03:52. The route covered the Gate 3 north perimeter (visual check at 03:36 – fence intact, no persons detected) and Zone C adjacency (03:48 – exterior clear, no vehicle present at time of pass). The drone used thermal and motion sensors throughout. Important caveat: the vehicle event at Zone C occurred at 01:17 – approximately 2.5 hours before the drone reached that area. The drone's clear observation does not negate the earlier vehicle detection.`,
    },
    followup: {
      title: "What still needs follow-up?",
      content: `1. CCTV review of service road near Zone C – 01:00–02:00 window\n2. Zone C access logs – confirm no authorized entry occurred\n3. HR trace of TEMP-2941 badge – who was issued this badge and where were they going at 02:45?\n4. Security review – who was in the Zone D area at 02:45 AM?\n5. Engineering – inspect sensor C2 in Block C for data integrity during the 04:10 offline window\n6. Maintenance – CAM-D-04 (Zone D camera) was offline during badge event – repair/replace\n7. Sensor calibration team – review FENCE-N-07 threshold settings`,
    },
    actions: {
      title: "Recommended Actions Before 08:00",
      content: `Maya should review and approve or adjust AI escalation assessments before the leadership briefing. Priority: confirm the vehicle event classification and badge investigation status. If CCTV review finds no vehicle or an identifiable contractor, escalation level for evt-002 can be downgraded. If badge holder cannot be identified, security should be informed before Nisha's briefing.`,
    },
  },
};

// ─── Run the Agent ─────────────────────────────────────────────────────────────

export async function runAgentInvestigation(onStep, onComplete) {
  const results = {};

  for (let i = 0; i < AGENT_INVESTIGATION_STEPS.length; i++) {
    const step = AGENT_INVESTIGATION_STEPS[i];
    await new Promise(resolve => setTimeout(resolve, step.delay));

    const result = executeTool(step.tool, step.params);
    results[step.id] = { step, result };

    if (onStep) {
      onStep({
        stepIndex: i,
        step,
        result,
        allResults: results,
        isLast: i === AGENT_INVESTIGATION_STEPS.length - 1,
      });
    }
  }

  if (onComplete) {
    onComplete(results);
  }

  return results;
}
