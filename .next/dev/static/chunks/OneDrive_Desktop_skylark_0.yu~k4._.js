(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/OneDrive/Desktop/skylark/lib/intelligence.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "buildIncidents",
    ()=>buildIncidents,
    "buildMorningBriefing",
    ()=>buildMorningBriefing,
    "getFollowUpMission",
    ()=>getFollowUpMission,
    "getOperationsMetrics",
    ()=>getOperationsMetrics
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$skylark$2f$lib$2f$siteData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/skylark/lib/siteData.js [app-client] (ecmascript)");
;
const INCIDENT_BLUEPRINTS = [
    {
        id: "inc-zone-c",
        leadEventId: "evt-002",
        eventIds: [
            "evt-002",
            "evt-005"
        ],
        supportEventIds: [
            "evt-004"
        ],
        title: "Zone C corridor anomaly",
        zone: "Block C and restricted storage yard",
        priority: "critical",
        defaultVerdict: "escalate",
        fallbackConfidence: 0.71,
        pendingSummary: "A vehicle path, a later power dip, and delayed drone coverage all touch the same restricted corridor. This cluster needs leadership visibility before 08:00.",
        openQuestion: "Was the service-road vehicle a harmless shortcut, or the first sign of after-hours access near restricted storage?",
        evidence: [
            "Vehicle movement was detected beside restricted Zone C at 01:17 with no plate capture.",
            "The drone cleared the area later, but only after a 151 minute timing gap.",
            "Block C sensor confidence dipped again during the 04:10 power fluctuation."
        ],
        followUps: [
            "Review service-road CCTV for 01:00-02:00.",
            "Confirm no approved vehicle route was scheduled near Zone C.",
            "Ask engineering to validate Block C sensor C2 after the power dip."
        ],
        owner: "Security lead + facilities engineering"
    },
    {
        id: "inc-zone-d",
        leadEventId: "evt-003",
        eventIds: [
            "evt-003"
        ],
        supportEventIds: [],
        title: "Unassigned badge access attempt",
        zone: "Zone D control room access point",
        priority: "high",
        defaultVerdict: "escalate",
        fallbackConfidence: 0.65,
        pendingSummary: "A temporary badge with no named owner attempted controlled access three times. The process failure matters even if intent was benign.",
        openQuestion: "Who was holding TEMP-2941, and why were they trying to enter a restricted control point?",
        evidence: [
            "Three consecutive failed badge swipes occurred between 02:45 and 02:47.",
            "TEMP-2941 is a batch-issued temporary badge with no named owner in the log.",
            "The nearest camera was unavailable during the attempt window."
        ],
        followUps: [
            "Trace TEMP-2941 through HR or contractor issuance records.",
            "Confirm who was physically in the Zone D corridor at 02:45.",
            "Repair or replace the offline camera covering the west access door."
        ],
        owner: "Security operations + HR"
    },
    {
        id: "inc-gate-3",
        leadEventId: "evt-001",
        eventIds: [
            "evt-001"
        ],
        supportEventIds: [
            "evt-004"
        ],
        title: "Gate 3 perimeter weather noise",
        zone: "North perimeter and Gate 3 fence line",
        priority: "monitor",
        defaultVerdict: "likely_harmless",
        fallbackConfidence: 0.78,
        pendingSummary: "The fence trigger looks consistent with overnight wind conditions, but it should still be explained clearly in the morning brief.",
        openQuestion: "Do we close this as a false positive now, or ask maintenance to recalibrate the sensor because of the longer trigger duration?",
        evidence: [
            "Wind exceeded the Gate 3 sensor threshold during the alert window.",
            "The same fence sensor is known to false-positive under those conditions.",
            "Drone patrol later confirmed the perimeter was intact."
        ],
        followUps: [
            "Log a calibration check for FENCE-N-07.",
            "Keep the event in the briefing as closed-but-documented noise."
        ],
        owner: "Perimeter systems maintainer"
    },
    {
        id: "inc-systems",
        leadEventId: "evt-006",
        eventIds: [
            "evt-006"
        ],
        supportEventIds: [],
        title: "Scheduled systems maintenance noise",
        zone: "Gate 2 east access",
        priority: "routine",
        defaultVerdict: "routine",
        fallbackConfidence: 0.92,
        pendingSummary: "The only remaining signal was a scheduled CCTV restart. It should stay visible as context, but it does not require escalation.",
        openQuestion: "Can the maintenance calendar be surfaced more clearly to supervisors so this does not look suspicious next time?",
        evidence: [
            "CAM-E-02 went offline during a scheduled firmware health cycle.",
            "The device self-recovered without operator action.",
            "No other nearby security events overlapped the outage."
        ],
        followUps: [
            "Expose scheduled maintenance windows in the ops console."
        ],
        owner: "Platform operations"
    }
];
const REVIEW_LABELS = {
    approved: "Approved",
    challenged: "Challenged",
    follow_up: "Needs follow-up",
    in_review: "Partially reviewed",
    pending: "Awaiting review"
};
function formatIncidentWindow(events) {
    const times = events.map((event)=>event.time).filter(Boolean).sort((left, right)=>left.localeCompare(right));
    if (times.length === 0) {
        return "No time window";
    }
    if (times.length === 1) {
        return times[0];
    }
    return `${times[0]}-${times[times.length - 1]}`;
}
function getReviewState(events) {
    const verdicts = events.map((event)=>event.userVerdict).filter(Boolean);
    if (verdicts.length === 0) {
        return "pending";
    }
    if (verdicts.includes("challenged")) {
        return "challenged";
    }
    if (verdicts.includes("follow_up")) {
        return "follow_up";
    }
    if (verdicts.length === events.length && verdicts.every((verdict)=>verdict === "approved")) {
        return "approved";
    }
    return "in_review";
}
function formatConfidence(confidence) {
    return `${Math.round(confidence * 100)}%`;
}
function unique(values) {
    return [
        ...new Set(values.filter(Boolean))
    ];
}
function buildSection(title, content) {
    return {
        title,
        content
    };
}
function buildNumberedList(items) {
    return items.map((item, index)=>`${index + 1}. ${item}`).join("\n");
}
function buildIncidents(events) {
    const eventMap = new Map(events.map((event)=>[
            event.id,
            event
        ]));
    return INCIDENT_BLUEPRINTS.map((blueprint)=>{
        const primaryEvents = blueprint.eventIds.map((id)=>eventMap.get(id)).filter(Boolean);
        const supportEvents = blueprint.supportEventIds.map((id)=>eventMap.get(id)).filter(Boolean);
        const leadEvent = eventMap.get(blueprint.leadEventId) ?? primaryEvents[0] ?? supportEvents[0];
        if (!leadEvent) {
            return null;
        }
        const leadAssessment = leadEvent.aiAssessment;
        const reviewState = getReviewState(primaryEvents);
        const allEvents = [
            ...primaryEvents,
            ...supportEvents
        ];
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
            eventIds: primaryEvents.map((event)=>event.id),
            supportEventIds: supportEvents.map((event)=>event.id),
            eventCount: allEvents.length,
            reviewState,
            reviewLabel: REVIEW_LABELS[reviewState],
            reviewProgress: primaryEvents.length === 0 ? 0 : primaryEvents.filter((event)=>event.userVerdict !== null).length / primaryEvents.length,
            unresolvedFollowUps: blueprint.followUps.length
        };
    }).filter(Boolean);
}
function getOperationsMetrics(events, incidents) {
    const escalations = incidents.filter((incident)=>incident.verdict === "escalate").length;
    const safeToClose = incidents.filter((incident)=>incident.verdict !== "escalate").length;
    const pendingReviews = incidents.filter((incident)=>incident.reviewState === "pending" || incident.reviewState === "in_review").length;
    const followUpCount = unique(incidents.flatMap((incident)=>incident.followUps)).length;
    const reviewedEvents = events.filter((event)=>event.userVerdict !== null).length;
    return {
        escalations,
        safeToClose,
        pendingReviews,
        followUpCount,
        reviewedEvents,
        totalEvents: events.length,
        totalIncidents: incidents.length,
        highestPriority: incidents.find((incident)=>incident.priority === "critical")?.title ?? "No critical incident"
    };
}
function buildMorningBriefing(incidents, events) {
    const escalations = incidents.filter((incident)=>incident.verdict === "escalate");
    const harmless = incidents.filter((incident)=>incident.verdict === "likely_harmless");
    const routine = incidents.filter((incident)=>incident.verdict === "routine");
    const droneEvent = events.find((event)=>event.id === "evt-004");
    const followUps = unique(incidents.flatMap((incident)=>incident.followUps));
    const reviewReady = incidents.every((incident)=>incident.reviewState !== "pending" && incident.reviewState !== "in_review");
    return {
        generatedAt: "06:10 AM",
        preparedFor: `${__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$skylark$2f$lib$2f$siteData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SITE_CONFIG"].siteHead} - Site Head (${__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$skylark$2f$lib$2f$siteData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SITE_CONFIG"].briefingTime} review)`,
        preparedBy: reviewReady ? `6:10 Assistant + ${__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$skylark$2f$lib$2f$siteData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SITE_CONFIG"].reviewerName} review complete` : `6:10 Assistant draft, ${__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$skylark$2f$lib$2f$siteData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SITE_CONFIG"].reviewerName} review pending`,
        sections: {
            summary: buildSection("What happened last night?", `${events.length} overnight signals collapsed into ${incidents.length} investigation threads. ${escalations.length} thread${escalations.length === 1 ? "" : "s"} need leadership attention before ${__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$skylark$2f$lib$2f$siteData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SITE_CONFIG"].briefingTime}. The most important issue is the Zone C corridor anomaly, where a vehicle path, later sensor confidence loss, and delayed drone coverage leave an evidence gap.`),
            harmless: buildSection("What was harmless?", harmless.length === 0 ? "No incidents were confidently closed as harmless." : harmless.map((incident)=>`${incident.title}: ${incident.summary}`).join("\n\n")),
            escalation: buildSection("What deserves escalation?", escalations.length === 0 ? "No escalation items are currently open." : escalations.map((incident, index)=>`${index + 1}. ${incident.title} (${incident.timeWindow}) - ${incident.summary} Primary question: ${incident.openQuestion}`).join("\n\n")),
            drone: buildSection("What did the drone check?", droneEvent?.aiAssessment?.summary ?? "The scheduled drone patrol covered Gate 3 and the Zone C exterior later in the night. It provided perimeter confirmation, but not real-time confirmation of the earlier vehicle event."),
            followup: buildSection("What still needs follow-up?", followUps.length === 0 ? "No follow-ups remain." : buildNumberedList(followUps)),
            actions: buildSection("Recommended actions before 08:00", reviewReady ? `The briefing is review-ready. Open with ${escalations[0]?.title ?? "the highest-priority incident"}, then close with the known-safe items and maintenance follow-ups.` : `Finish human review on the ${incidents.filter((incident)=>incident.reviewState === "pending" || incident.reviewState === "in_review").map((incident)=>incident.title).join(", ")} threads, then lock the leadership brief.`),
            routine: buildSection("Routine items captured", routine.length === 0 ? "No routine items were logged." : routine.map((incident)=>`${incident.title}: ${incident.summary}`).join("\n\n"))
        }
    };
}
function getFollowUpMission(incidents) {
    const priorityIncident = incidents.find((incident)=>incident.priority === "critical") ?? incidents.find((incident)=>incident.verdict === "escalate") ?? incidents[0];
    if (!priorityIncident) {
        return null;
    }
    return {
        title: "Recommended dawn sweep",
        objective: `Re-check ${priorityIncident.zone} for evidence tied to ${priorityIncident.title.toLowerCase()}.`,
        route: [
            "Launch Pad",
            "Gate 3 north fence",
            "Zone C service road",
            "Block C equipment shed",
            "Return to base"
        ],
        rationale: priorityIncident.openQuestion
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/OneDrive/Desktop/skylark/components/DroneSimulator.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DroneSimulator
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$skylark$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/skylark/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$skylark$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/skylark/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$skylark$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/skylark/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$skylark$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/skylark/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$skylark$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Navigation$3e$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/skylark/node_modules/lucide-react/dist/esm/icons/navigation.js [app-client] (ecmascript) <export default as Navigation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$skylark$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/skylark/node_modules/lucide-react/dist/esm/icons/play.js [app-client] (ecmascript) <export default as Play>");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$skylark$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pause$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pause$3e$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/skylark/node_modules/lucide-react/dist/esm/icons/pause.js [app-client] (ecmascript) <export default as Pause>");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$skylark$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCcw$3e$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/skylark/node_modules/lucide-react/dist/esm/icons/rotate-ccw.js [app-client] (ecmascript) <export default as RotateCcw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$skylark$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/skylark/node_modules/lucide-react/dist/esm/icons/circle-check-big.js [app-client] (ecmascript) <export default as CheckCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$skylark$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/skylark/node_modules/lucide-react/dist/esm/icons/triangle-alert.js [app-client] (ecmascript) <export default as AlertTriangle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$skylark$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$scan$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Scan$3e$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/skylark/node_modules/lucide-react/dist/esm/icons/scan.js [app-client] (ecmascript) <export default as Scan>");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$skylark$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$radar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Radar$3e$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/skylark/node_modules/lucide-react/dist/esm/icons/radar.js [app-client] (ecmascript) <export default as Radar>");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$skylark$2f$lib$2f$siteData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/skylark/lib/siteData.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$skylark$2f$lib$2f$intelligence$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/skylark/lib/intelligence.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
const droneRoute = Object.values(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$skylark$2f$lib$2f$siteData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DRONE_ROUTES"])[0];
function DroneSimulator({ events, agentDone, incidents = [] }) {
    _s();
    const [playing, setPlaying] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$skylark$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [currentWaypoint, setCurrentWaypoint] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$skylark$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [completed, setCompleted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$skylark$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const intervalRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$skylark$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const waypoints = droneRoute.waypoints;
    const reset = ()=>{
        setPlaying(false);
        setCurrentWaypoint(0);
        setCompleted(false);
        clearInterval(intervalRef.current);
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$skylark$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DroneSimulator.useEffect": ()=>{
            if (playing && !completed) {
                intervalRef.current = setInterval({
                    "DroneSimulator.useEffect": ()=>{
                        setCurrentWaypoint({
                            "DroneSimulator.useEffect": (prev)=>{
                                if (prev >= waypoints.length - 1) {
                                    setPlaying(false);
                                    setCompleted(true);
                                    clearInterval(intervalRef.current);
                                    return prev;
                                }
                                return prev + 1;
                            }
                        }["DroneSimulator.useEffect"]);
                    }
                }["DroneSimulator.useEffect"], 1500); // slightly faster for better demo
            }
            return ({
                "DroneSimulator.useEffect": ()=>clearInterval(intervalRef.current)
            })["DroneSimulator.useEffect"];
        }
    }["DroneSimulator.useEffect"], [
        playing,
        completed,
        waypoints.length
    ]);
    const currentObs = droneRoute.observations.filter((o)=>o.waypoint <= currentWaypoint);
    const followUpMission = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$skylark$2f$lib$2f$intelligence$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFollowUpMission"])(incidents);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$skylark$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "grid grid-cols-1 xl:grid-cols-3 gap-6 h-full",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$skylark$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "xl:col-span-2 flex flex-col h-full",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$skylark$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "glass-panel p-6 rounded-2xl flex-1 flex flex-col",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$skylark$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-4 mb-6 shrink-0",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$skylark$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br from-[rgba(59,130,246,0.2)] to-[rgba(59,130,246,0.05)] border border-[rgba(59,130,246,0.3)] shadow-[0_0_15px_rgba(59,130,246,0.15)] relative",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$skylark$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$skylark$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Navigation$3e$__["Navigation"], {
                                            size: 22,
                                            className: playing ? "animate-drone text-[var(--brand-blue)]" : "text-[var(--brand-blue)]"
                                        }, void 0, false, {
                                            fileName: "[project]/OneDrive/Desktop/skylark/components/DroneSimulator.js",
                                            lineNumber: 53,
                                            columnNumber: 16
                                        }, this),
                                        playing && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$skylark$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "absolute top-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[var(--surface-1)]"
                                        }, void 0, false, {
                                            fileName: "[project]/OneDrive/Desktop/skylark/components/DroneSimulator.js",
                                            lineNumber: 54,
                                            columnNumber: 28
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/OneDrive/Desktop/skylark/components/DroneSimulator.js",
                                    lineNumber: 52,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$skylark$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$skylark$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "text-xl font-bold tracking-wide text-white uppercase flex items-center gap-2",
                                            children: [
                                                "UAS TELEMETRY: ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$skylark$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-[var(--brand-blue)]",
                                                    children: droneRoute.droneId
                                                }, void 0, false, {
                                                    fileName: "[project]/OneDrive/Desktop/skylark/components/DroneSimulator.js",
                                                    lineNumber: 58,
                                                    columnNumber: 32
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/OneDrive/Desktop/skylark/components/DroneSimulator.js",
                                            lineNumber: 57,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$skylark$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-xs font-mono mt-1 text-[var(--text-muted)] flex items-center gap-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$skylark$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "px-2 py-0.5 rounded bg-[rgba(255,255,255,0.05)]",
                                                    children: droneRoute.name
                                                }, void 0, false, {
                                                    fileName: "[project]/OneDrive/Desktop/skylark/components/DroneSimulator.js",
                                                    lineNumber: 61,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$skylark$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: [
                                                        droneRoute.startTime,
                                                        " – ",
                                                        droneRoute.endTime
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/OneDrive/Desktop/skylark/components/DroneSimulator.js",
                                                    lineNumber: 62,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$skylark$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: "Altitude: 35m"
                                                }, void 0, false, {
                                                    fileName: "[project]/OneDrive/Desktop/skylark/components/DroneSimulator.js",
                                                    lineNumber: 63,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/OneDrive/Desktop/skylark/components/DroneSimulator.js",
                                            lineNumber: 60,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/OneDrive/Desktop/skylark/components/DroneSimulator.js",
                                    lineNumber: 56,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$skylark$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "ml-auto flex items-center gap-3 bg-[rgba(0,0,0,0.3)] border border-[var(--border-subtle)] rounded-xl p-1.5 backdrop-blur",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$skylark$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>{
                                                if (!completed) setPlaying((p)=>!p);
                                            },
                                            disabled: completed,
                                            className: "w-10 h-10 rounded-lg flex items-center justify-center transition-all bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(59,130,246,0.15)] text-white disabled:opacity-50",
                                            children: playing ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$skylark$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$skylark$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pause$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pause$3e$__["Pause"], {
                                                size: 18
                                            }, void 0, false, {
                                                fileName: "[project]/OneDrive/Desktop/skylark/components/DroneSimulator.js",
                                                lineNumber: 73,
                                                columnNumber: 28
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$skylark$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$skylark$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__["Play"], {
                                                size: 18,
                                                className: "translate-x-0.5"
                                            }, void 0, false, {
                                                fileName: "[project]/OneDrive/Desktop/skylark/components/DroneSimulator.js",
                                                lineNumber: 73,
                                                columnNumber: 50
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/OneDrive/Desktop/skylark/components/DroneSimulator.js",
                                            lineNumber: 69,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$skylark$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: reset,
                                            className: "w-10 h-10 rounded-lg flex items-center justify-center transition-all hover:bg-[rgba(255,255,255,0.05)] text-[var(--text-muted)] hover:text-white",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$skylark$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$skylark$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCcw$3e$__["RotateCcw"], {
                                                size: 16
                                            }, void 0, false, {
                                                fileName: "[project]/OneDrive/Desktop/skylark/components/DroneSimulator.js",
                                                lineNumber: 78,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/OneDrive/Desktop/skylark/components/DroneSimulator.js",
                                            lineNumber: 75,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/OneDrive/Desktop/skylark/components/DroneSimulator.js",
                                    lineNumber: 68,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/OneDrive/Desktop/skylark/components/DroneSimulator.js",
                            lineNumber: 51,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$skylark$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "relative flex-1 rounded-xl overflow-hidden bg-[#020617] border border-[var(--border-medium)] shadow-[inset_0_0_50px_rgba(0,0,0,0.8)] flex items-center justify-center min-h-[350px]",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$skylark$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute inset-0 opacity-[0.03]",
                                    style: {
                                        backgroundImage: "linear-gradient(rgba(59,130,246,1) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,1) 1px, transparent 1px)",
                                        backgroundSize: "30px 30px"
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/OneDrive/Desktop/skylark/components/DroneSimulator.js",
                                    lineNumber: 86,
                                    columnNumber: 13
                                }, this),
                                playing && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$skylark$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute left-0 right-0 h-1 bg-[var(--brand-blue)] blur-sm opacity-30 animate-[scanline_3s_linear_infinite]"
                                }, void 0, false, {
                                    fileName: "[project]/OneDrive/Desktop/skylark/components/DroneSimulator.js",
                                    lineNumber: 94,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$skylark$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    className: "w-full h-full max-w-4xl",
                                    viewBox: "0 0 800 400",
                                    preserveAspectRatio: "xMidYMid meet",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$skylark$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$skylark$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("linearGradient", {
                                                    id: "dronePathGradient",
                                                    x1: "0%",
                                                    y1: "0%",
                                                    x2: "100%",
                                                    y2: "0%",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$skylark$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                                            offset: "0%",
                                                            stopColor: "rgba(59,130,246,0.2)"
                                                        }, void 0, false, {
                                                            fileName: "[project]/OneDrive/Desktop/skylark/components/DroneSimulator.js",
                                                            lineNumber: 101,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$skylark$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                                            offset: "100%",
                                                            stopColor: "rgba(59,130,246,0.9)"
                                                        }, void 0, false, {
                                                            fileName: "[project]/OneDrive/Desktop/skylark/components/DroneSimulator.js",
                                                            lineNumber: 102,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/OneDrive/Desktop/skylark/components/DroneSimulator.js",
                                                    lineNumber: 100,
                                                    columnNumber: 18
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$skylark$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("filter", {
                                                    id: "glow",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$skylark$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("feGaussianBlur", {
                                                            stdDeviation: "3",
                                                            result: "coloredBlur"
                                                        }, void 0, false, {
                                                            fileName: "[project]/OneDrive/Desktop/skylark/components/DroneSimulator.js",
                                                            lineNumber: 105,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$skylark$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("feMerge", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$skylark$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("feMergeNode", {
                                                                    in: "coloredBlur"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/OneDrive/Desktop/skylark/components/DroneSimulator.js",
                                                                    lineNumber: 107,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$skylark$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("feMergeNode", {
                                                                    in: "SourceGraphic"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/OneDrive/Desktop/skylark/components/DroneSimulator.js",
                                                                    lineNumber: 108,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/OneDrive/Desktop/skylark/components/DroneSimulator.js",
                                                            lineNumber: 106,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/OneDrive/Desktop/skylark/components/DroneSimulator.js",
                                                    lineNumber: 104,
                                                    columnNumber: 18
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/OneDrive/Desktop/skylark/components/DroneSimulator.js",
                                            lineNumber: 99,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$skylark$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                                            opacity: "0.8",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$skylark$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                                    cx: "200",
                                                    cy: "100",
                                                    r: "70",
                                                    fill: "none",
                                                    stroke: "rgba(59,130,246,0.2)",
                                                    strokeWidth: "1",
                                                    strokeDasharray: "4 4"
                                                }, void 0, false, {
                                                    fileName: "[project]/OneDrive/Desktop/skylark/components/DroneSimulator.js",
                                                    lineNumber: 115,
                                                    columnNumber: 18
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$skylark$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                                                    x: "200",
                                                    y: "35",
                                                    textAnchor: "middle",
                                                    fill: "rgba(59,130,246,0.4)",
                                                    fontSize: "10",
                                                    fontFamily: "monospace",
                                                    children: "SEC-Z/ALPHA"
                                                }, void 0, false, {
                                                    fileName: "[project]/OneDrive/Desktop/skylark/components/DroneSimulator.js",
                                                    lineNumber: 116,
                                                    columnNumber: 18
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$skylark$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                                    cx: "550",
                                                    cy: "150",
                                                    r: "80",
                                                    fill: "none",
                                                    stroke: "rgba(245,158,11,0.2)",
                                                    strokeWidth: "1"
                                                }, void 0, false, {
                                                    fileName: "[project]/OneDrive/Desktop/skylark/components/DroneSimulator.js",
                                                    lineNumber: 118,
                                                    columnNumber: 18
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$skylark$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                                                    x: "550",
                                                    y: "65",
                                                    textAnchor: "middle",
                                                    fill: "rgba(245,158,11,0.4)",
                                                    fontSize: "10",
                                                    fontFamily: "monospace",
                                                    children: "SEC-Z/BETA"
                                                }, void 0, false, {
                                                    fileName: "[project]/OneDrive/Desktop/skylark/components/DroneSimulator.js",
                                                    lineNumber: 119,
                                                    columnNumber: 18
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$skylark$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                                    cx: "380",
                                                    cy: "300",
                                                    r: "85",
                                                    fill: "rgba(239,68,68,0.02)",
                                                    stroke: "rgba(239,68,68,0.4)",
                                                    strokeWidth: "1.5",
                                                    strokeDasharray: "8 6"
                                                }, void 0, false, {
                                                    fileName: "[project]/OneDrive/Desktop/skylark/components/DroneSimulator.js",
                                                    lineNumber: 121,
                                                    columnNumber: 18
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$skylark$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                                                    x: "380",
                                                    y: "210",
                                                    textAnchor: "middle",
                                                    fill: "rgba(239,68,68,0.6)",
                                                    fontSize: "10",
                                                    fontFamily: "monospace",
                                                    fontWeight: "bold",
                                                    children: "SEC-Z/RESTRICTED-C"
                                                }, void 0, false, {
                                                    fileName: "[project]/OneDrive/Desktop/skylark/components/DroneSimulator.js",
                                                    lineNumber: 122,
                                                    columnNumber: 18
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/OneDrive/Desktop/skylark/components/DroneSimulator.js",
                                            lineNumber: 114,
                                            columnNumber: 15
                                        }, this),
                                        events.filter((e)=>e.type !== "drone_patrol").map((event)=>{
                                            const x = normalize(event.coords[1], -0.098, -0.083, 50, 750);
                                            const y = normalize(event.coords[0], 51.502, 51.512, 350, 50);
                                            const colors = {
                                                high: "#ef4444",
                                                medium: "#f59e0b",
                                                low: "#10b981",
                                                info: "#3b82f6"
                                            };
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$skylark$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$skylark$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                                        cx: x,
                                                        cy: y,
                                                        r: "8",
                                                        fill: "none",
                                                        stroke: colors[event.severity],
                                                        strokeWidth: "1",
                                                        opacity: "0.3"
                                                    }, void 0, false, {
                                                        fileName: "[project]/OneDrive/Desktop/skylark/components/DroneSimulator.js",
                                                        lineNumber: 132,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$skylark$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                                        cx: x,
                                                        cy: y,
                                                        r: "2",
                                                        fill: colors[event.severity],
                                                        opacity: "0.6"
                                                    }, void 0, false, {
                                                        fileName: "[project]/OneDrive/Desktop/skylark/components/DroneSimulator.js",
                                                        lineNumber: 133,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$skylark$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                                                        x: x + 10,
                                                        y: y + 3,
                                                        fill: colors[event.severity],
                                                        fontSize: "9",
                                                        opacity: "0.5",
                                                        fontFamily: "monospace",
                                                        children: event.time
                                                    }, void 0, false, {
                                                        fileName: "[project]/OneDrive/Desktop/skylark/components/DroneSimulator.js",
                                                        lineNumber: 134,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, event.id, true, {
                                                fileName: "[project]/OneDrive/Desktop/skylark/components/DroneSimulator.js",
                                                lineNumber: 131,
                                                columnNumber: 19
                                            }, this);
                                        }),
                                        waypoints.map((wp, i)=>{
                                            if (i >= waypoints.length - 1) return null;
                                            const next = waypoints[i + 1];
                                            const x1 = normalize(wp.coords[1], -0.098, -0.083, 50, 750);
                                            const y1 = normalize(wp.coords[0], 51.502, 51.512, 350, 50);
                                            const x2 = normalize(next.coords[1], -0.098, -0.083, 50, 750);
                                            const y2 = normalize(next.coords[0], 51.502, 51.512, 350, 50);
                                            const isActive = i < currentWaypoint;
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$skylark$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                                x1: x1,
                                                y1: y1,
                                                x2: x2,
                                                y2: y2,
                                                stroke: isActive ? "url(#dronePathGradient)" : "rgba(255,255,255,0.05)",
                                                strokeWidth: isActive ? 3 : 2,
                                                strokeDasharray: isActive ? "none" : "4 6",
                                                className: "transition-all duration-1000 ease-in-out"
                                            }, `path-${i}`, false, {
                                                fileName: "[project]/OneDrive/Desktop/skylark/components/DroneSimulator.js",
                                                lineNumber: 150,
                                                columnNumber: 19
                                            }, this);
                                        }),
                                        waypoints.map((wp, i)=>{
                                            const x = normalize(wp.coords[1], -0.098, -0.083, 50, 750);
                                            const y = normalize(wp.coords[0], 51.502, 51.512, 350, 50);
                                            const isActive = i === currentWaypoint;
                                            const isPast = i < currentWaypoint;
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$skylark$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                                                children: [
                                                    isActive && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$skylark$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                                        cx: x,
                                                        cy: y,
                                                        r: "20",
                                                        fill: "none",
                                                        stroke: "var(--brand-blue)",
                                                        strokeWidth: "1",
                                                        opacity: "0.8",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$skylark$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("animate", {
                                                                attributeName: "r",
                                                                from: "5",
                                                                to: "35",
                                                                dur: "1.5s",
                                                                repeatCount: "indefinite"
                                                            }, void 0, false, {
                                                                fileName: "[project]/OneDrive/Desktop/skylark/components/DroneSimulator.js",
                                                                lineNumber: 170,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$skylark$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("animate", {
                                                                attributeName: "opacity",
                                                                from: "0.8",
                                                                to: "0",
                                                                dur: "1.5s",
                                                                repeatCount: "indefinite"
                                                            }, void 0, false, {
                                                                fileName: "[project]/OneDrive/Desktop/skylark/components/DroneSimulator.js",
                                                                lineNumber: 171,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/OneDrive/Desktop/skylark/components/DroneSimulator.js",
                                                        lineNumber: 169,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$skylark$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                                        cx: x,
                                                        cy: y,
                                                        r: isActive ? 6 : 4,
                                                        fill: isActive ? "#fff" : isPast ? "var(--brand-blue)" : "rgba(255,255,255,0.2)",
                                                        filter: isActive ? "url(#glow)" : "none",
                                                        className: "transition-all duration-300"
                                                    }, void 0, false, {
                                                        fileName: "[project]/OneDrive/Desktop/skylark/components/DroneSimulator.js",
                                                        lineNumber: 176,
                                                        columnNumber: 21
                                                    }, this),
                                                    isActive && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$skylark$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                                                        className: "transition-opacity duration-300",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$skylark$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                                                x: x - 20,
                                                                y: y - 30,
                                                                width: "40",
                                                                height: "16",
                                                                rx: "4",
                                                                fill: "rgba(59,130,246,0.2)",
                                                                stroke: "var(--brand-blue)",
                                                                strokeWidth: "1"
                                                            }, void 0, false, {
                                                                fileName: "[project]/OneDrive/Desktop/skylark/components/DroneSimulator.js",
                                                                lineNumber: 186,
                                                                columnNumber: 26
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$skylark$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                                                                x: x,
                                                                y: y - 19,
                                                                textAnchor: "middle",
                                                                fill: "#fff",
                                                                fontSize: "9",
                                                                fontWeight: "bold",
                                                                fontFamily: "monospace",
                                                                children: "SD-7"
                                                            }, void 0, false, {
                                                                fileName: "[project]/OneDrive/Desktop/skylark/components/DroneSimulator.js",
                                                                lineNumber: 187,
                                                                columnNumber: 26
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/OneDrive/Desktop/skylark/components/DroneSimulator.js",
                                                        lineNumber: 185,
                                                        columnNumber: 24
                                                    }, this)
                                                ]
                                            }, `wp-${i}`, true, {
                                                fileName: "[project]/OneDrive/Desktop/skylark/components/DroneSimulator.js",
                                                lineNumber: 166,
                                                columnNumber: 19
                                            }, this);
                                        })
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/OneDrive/Desktop/skylark/components/DroneSimulator.js",
                                    lineNumber: 97,
                                    columnNumber: 13
                                }, this),
                                completed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$skylark$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$skylark$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                    initial: {
                                        opacity: 0,
                                        scale: 0.9
                                    },
                                    animate: {
                                        opacity: 1,
                                        scale: 1
                                    },
                                    className: "absolute inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.6)] backdrop-blur-md",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$skylark$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "glass p-8 rounded-2xl flex flex-col items-center border border-emerald-500/30 text-center shadow-[0_0_30px_rgba(16,185,129,0.2)]",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$skylark$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mb-4",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$skylark$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$skylark$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"], {
                                                    size: 32,
                                                    className: "text-emerald-400"
                                                }, void 0, false, {
                                                    fileName: "[project]/OneDrive/Desktop/skylark/components/DroneSimulator.js",
                                                    lineNumber: 200,
                                                    columnNumber: 22
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/OneDrive/Desktop/skylark/components/DroneSimulator.js",
                                                lineNumber: 199,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$skylark$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "text-xl font-bold text-white mb-2 uppercase tracking-wide",
                                                children: "Patrol Sequence Complete"
                                            }, void 0, false, {
                                                fileName: "[project]/OneDrive/Desktop/skylark/components/DroneSimulator.js",
                                                lineNumber: 202,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$skylark$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm text-[var(--text-secondary)] font-mono",
                                                children: [
                                                    droneRoute.name,
                                                    " verified visually clear."
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/OneDrive/Desktop/skylark/components/DroneSimulator.js",
                                                lineNumber: 203,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/OneDrive/Desktop/skylark/components/DroneSimulator.js",
                                        lineNumber: 198,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/OneDrive/Desktop/skylark/components/DroneSimulator.js",
                                    lineNumber: 197,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$skylark$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute top-4 left-4",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$skylark$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "glass px-3 py-2 rounded-lg flex flex-col gap-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$skylark$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[10px] text-[var(--brand-blue)] uppercase font-bold tracking-wider mr-2 flex items-center gap-1.5",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$skylark$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$skylark$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$radar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Radar$3e$__["Radar"], {
                                                        size: 12
                                                    }, void 0, false, {
                                                        fileName: "[project]/OneDrive/Desktop/skylark/components/DroneSimulator.js",
                                                        lineNumber: 212,
                                                        columnNumber: 20
                                                    }, this),
                                                    " Live Coordinates"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/OneDrive/Desktop/skylark/components/DroneSimulator.js",
                                                lineNumber: 211,
                                                columnNumber: 18
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$skylark$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-mono text-xs text-white",
                                                children: [
                                                    waypoints[currentWaypoint]?.coords[0].toFixed(5),
                                                    ", ",
                                                    waypoints[currentWaypoint]?.coords[1].toFixed(5)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/OneDrive/Desktop/skylark/components/DroneSimulator.js",
                                                lineNumber: 214,
                                                columnNumber: 18
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/OneDrive/Desktop/skylark/components/DroneSimulator.js",
                                        lineNumber: 210,
                                        columnNumber: 16
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/OneDrive/Desktop/skylark/components/DroneSimulator.js",
                                    lineNumber: 209,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$skylark$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute bottom-4 left-4 right-4",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$skylark$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "glass px-4 py-3 rounded-xl flex items-center gap-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$skylark$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$skylark$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex justify-between text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)] mb-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$skylark$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                children: [
                                                                    "Telemetry Progression — WP ",
                                                                    currentWaypoint + 1,
                                                                    "/",
                                                                    waypoints.length
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/OneDrive/Desktop/skylark/components/DroneSimulator.js",
                                                                lineNumber: 224,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$skylark$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-[var(--brand-blue)]",
                                                                children: [
                                                                    Math.round(currentWaypoint / (waypoints.length - 1) * 100),
                                                                    "%"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/OneDrive/Desktop/skylark/components/DroneSimulator.js",
                                                                lineNumber: 225,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/OneDrive/Desktop/skylark/components/DroneSimulator.js",
                                                        lineNumber: 223,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$skylark$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "h-2 rounded-full bg-[rgba(0,0,0,0.5)] border border-[rgba(255,255,255,0.05)] overflow-hidden",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$skylark$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$skylark$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                                            className: "h-full bg-gradient-to-r from-blue-600 to-blue-400",
                                                            initial: {
                                                                width: 0
                                                            },
                                                            animate: {
                                                                width: `${currentWaypoint / (waypoints.length - 1) * 100}%`
                                                            },
                                                            transition: {
                                                                ease: "linear"
                                                            }
                                                        }, void 0, false, {
                                                            fileName: "[project]/OneDrive/Desktop/skylark/components/DroneSimulator.js",
                                                            lineNumber: 228,
                                                            columnNumber: 24
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/OneDrive/Desktop/skylark/components/DroneSimulator.js",
                                                        lineNumber: 227,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/OneDrive/Desktop/skylark/components/DroneSimulator.js",
                                                lineNumber: 222,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$skylark$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "shrink-0 text-right min-w-[80px]",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$skylark$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-[10px] uppercase font-bold text-[var(--text-muted)] tracking-wider",
                                                        children: "Timestamp"
                                                    }, void 0, false, {
                                                        fileName: "[project]/OneDrive/Desktop/skylark/components/DroneSimulator.js",
                                                        lineNumber: 237,
                                                        columnNumber: 22
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$skylark$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "font-mono text-sm font-bold text-white mt-0.5",
                                                        children: waypoints[currentWaypoint]?.time || droneRoute.startTime
                                                    }, void 0, false, {
                                                        fileName: "[project]/OneDrive/Desktop/skylark/components/DroneSimulator.js",
                                                        lineNumber: 238,
                                                        columnNumber: 22
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/OneDrive/Desktop/skylark/components/DroneSimulator.js",
                                                lineNumber: 236,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/OneDrive/Desktop/skylark/components/DroneSimulator.js",
                                        lineNumber: 221,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/OneDrive/Desktop/skylark/components/DroneSimulator.js",
                                    lineNumber: 220,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/OneDrive/Desktop/skylark/components/DroneSimulator.js",
                            lineNumber: 84,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/OneDrive/Desktop/skylark/components/DroneSimulator.js",
                    lineNumber: 49,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/OneDrive/Desktop/skylark/components/DroneSimulator.js",
                lineNumber: 48,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$skylark$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col gap-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$skylark$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "glass-panel p-5 rounded-2xl shrink-0",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$skylark$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$skylark$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$skylark$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$scan$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Scan$3e$__["Scan"], {
                                        size: 14,
                                        className: "text-[var(--brand-blue)]"
                                    }, void 0, false, {
                                        fileName: "[project]/OneDrive/Desktop/skylark/components/DroneSimulator.js",
                                        lineNumber: 252,
                                        columnNumber: 13
                                    }, this),
                                    " Sensor Array"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/OneDrive/Desktop/skylark/components/DroneSimulator.js",
                                lineNumber: 251,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$skylark$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-3",
                                children: [
                                    {
                                        label: "Hardware ID",
                                        value: droneRoute.droneId,
                                        highlight: true
                                    },
                                    {
                                        label: "Sensor Mode",
                                        value: "Therm+Optical",
                                        highlight: true
                                    },
                                    {
                                        label: "Altitude",
                                        value: "35m ATGL",
                                        highlight: false
                                    },
                                    {
                                        label: "Wind Shear",
                                        value: "Nominal (8kts)",
                                        highlight: false
                                    }
                                ].map((spec, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$skylark$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-between border-b border-[rgba(255,255,255,0.05)] pb-2 last:border-0 last:pb-0",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$skylark$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[11px] font-bold uppercase text-[var(--text-muted)] tracking-wider",
                                                children: spec.label
                                            }, void 0, false, {
                                                fileName: "[project]/OneDrive/Desktop/skylark/components/DroneSimulator.js",
                                                lineNumber: 262,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$skylark$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: `text-xs font-mono font-bold ${spec.highlight ? 'text-[var(--brand-blue)]' : 'text-white'}`,
                                                children: spec.value
                                            }, void 0, false, {
                                                fileName: "[project]/OneDrive/Desktop/skylark/components/DroneSimulator.js",
                                                lineNumber: 263,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, i, true, {
                                        fileName: "[project]/OneDrive/Desktop/skylark/components/DroneSimulator.js",
                                        lineNumber: 261,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/OneDrive/Desktop/skylark/components/DroneSimulator.js",
                                lineNumber: 254,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/OneDrive/Desktop/skylark/components/DroneSimulator.js",
                        lineNumber: 250,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$skylark$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "glass-panel p-5 rounded-2xl flex-1 flex flex-col min-h-[300px]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$skylark$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col mb-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$skylark$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]",
                                        children: "Flight Log"
                                    }, void 0, false, {
                                        fileName: "[project]/OneDrive/Desktop/skylark/components/DroneSimulator.js",
                                        lineNumber: 272,
                                        columnNumber: 14
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$skylark$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[10px] text-[var(--text-muted)]",
                                        children: "Verified observation stream"
                                    }, void 0, false, {
                                        fileName: "[project]/OneDrive/Desktop/skylark/components/DroneSimulator.js",
                                        lineNumber: 273,
                                        columnNumber: 14
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/OneDrive/Desktop/skylark/components/DroneSimulator.js",
                                lineNumber: 271,
                                columnNumber: 12
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$skylark$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$skylark$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$skylark$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                                    children: currentObs.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$skylark$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$skylark$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                        initial: {
                                            opacity: 0
                                        },
                                        animate: {
                                            opacity: 1
                                        },
                                        exit: {
                                            opacity: 0
                                        },
                                        className: "h-full flex items-center justify-center border border-dashed border-[var(--border-subtle)] rounded-xl",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$skylark$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-xs text-[var(--text-muted)] px-10 text-center",
                                            children: "Awaiting telemetry. Initiate patrol to pull log data."
                                        }, void 0, false, {
                                            fileName: "[project]/OneDrive/Desktop/skylark/components/DroneSimulator.js",
                                            lineNumber: 283,
                                            columnNumber: 22
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/OneDrive/Desktop/skylark/components/DroneSimulator.js",
                                        lineNumber: 279,
                                        columnNumber: 19
                                    }, this) : currentObs.map((obs, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$skylark$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$skylark$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                            initial: {
                                                opacity: 0,
                                                x: -10
                                            },
                                            animate: {
                                                opacity: 1,
                                                x: 0
                                            },
                                            className: "bg-[rgba(16,185,129,0.05)] border border-[rgba(16,185,129,0.2)] rounded-xl p-3 flex gap-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$skylark$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "shrink-0 mt-0.5",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$skylark$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$skylark$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$skylark$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"], {
                                                            size: 10,
                                                            className: "text-emerald-400"
                                                        }, void 0, false, {
                                                            fileName: "[project]/OneDrive/Desktop/skylark/components/DroneSimulator.js",
                                                            lineNumber: 294,
                                                            columnNumber: 28
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/OneDrive/Desktop/skylark/components/DroneSimulator.js",
                                                        lineNumber: 293,
                                                        columnNumber: 26
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/OneDrive/Desktop/skylark/components/DroneSimulator.js",
                                                    lineNumber: 292,
                                                    columnNumber: 24
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$skylark$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$skylark$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-xs font-mono text-[var(--brand-green)] mb-1",
                                                            children: [
                                                                waypoints[obs.waypoint]?.time,
                                                                " — WP",
                                                                obs.waypoint + 1
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/OneDrive/Desktop/skylark/components/DroneSimulator.js",
                                                            lineNumber: 298,
                                                            columnNumber: 26
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$skylark$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-sm text-[var(--text-primary)] leading-snug",
                                                            children: obs.text
                                                        }, void 0, false, {
                                                            fileName: "[project]/OneDrive/Desktop/skylark/components/DroneSimulator.js",
                                                            lineNumber: 299,
                                                            columnNumber: 26
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/OneDrive/Desktop/skylark/components/DroneSimulator.js",
                                                    lineNumber: 297,
                                                    columnNumber: 24
                                                }, this)
                                            ]
                                        }, obs.waypoint, true, {
                                            fileName: "[project]/OneDrive/Desktop/skylark/components/DroneSimulator.js",
                                            lineNumber: 287,
                                            columnNumber: 21
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/OneDrive/Desktop/skylark/components/DroneSimulator.js",
                                    lineNumber: 277,
                                    columnNumber: 14
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/OneDrive/Desktop/skylark/components/DroneSimulator.js",
                                lineNumber: 276,
                                columnNumber: 12
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/OneDrive/Desktop/skylark/components/DroneSimulator.js",
                        lineNumber: 270,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$skylark$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$skylark$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                        children: agentDone && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$skylark$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$skylark$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                            initial: {
                                opacity: 0,
                                y: 20
                            },
                            animate: {
                                opacity: 1,
                                y: 0
                            },
                            className: "glass-panel p-4 rounded-2xl border border-[rgba(245,158,11,0.3)] bg-gradient-to-br from-[rgba(245,158,11,0.1)] to-transparent relative overflow-hidden shrink-0",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$skylark$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute top-0 left-0 w-1 h-full bg-[var(--brand-amber)]"
                                }, void 0, false, {
                                    fileName: "[project]/OneDrive/Desktop/skylark/components/DroneSimulator.js",
                                    lineNumber: 315,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$skylark$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2 mb-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$skylark$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$skylark$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {
                                            size: 14,
                                            className: "text-[var(--brand-amber)]"
                                        }, void 0, false, {
                                            fileName: "[project]/OneDrive/Desktop/skylark/components/DroneSimulator.js",
                                            lineNumber: 317,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$skylark$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-[10px] font-bold uppercase tracking-wider text-[var(--brand-amber)]",
                                            children: "Agent Context Overlay"
                                        }, void 0, false, {
                                            fileName: "[project]/OneDrive/Desktop/skylark/components/DroneSimulator.js",
                                            lineNumber: 318,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/OneDrive/Desktop/skylark/components/DroneSimulator.js",
                                    lineNumber: 316,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$skylark$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs leading-relaxed text-[var(--text-secondary)]",
                                    children: [
                                        "Drone patrol confirmed perimeter physical integrity at 03:48. However, an unauthorized vehicle event occurred at 01:17. ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$skylark$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                            className: "text-white",
                                            children: "This 2.5 hour gap"
                                        }, void 0, false, {
                                            fileName: "[project]/OneDrive/Desktop/skylark/components/DroneSimulator.js",
                                            lineNumber: 321,
                                            columnNumber: 138
                                        }, this),
                                        " means the drone telemetry cannot invalidate the earlier detection."
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/OneDrive/Desktop/skylark/components/DroneSimulator.js",
                                    lineNumber: 320,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/OneDrive/Desktop/skylark/components/DroneSimulator.js",
                            lineNumber: 311,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/OneDrive/Desktop/skylark/components/DroneSimulator.js",
                        lineNumber: 309,
                        columnNumber: 9
                    }, this),
                    followUpMission && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$skylark$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "glass-panel p-4 rounded-2xl shrink-0",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$skylark$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2 mb-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$skylark$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$skylark$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$radar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Radar$3e$__["Radar"], {
                                        size: 14,
                                        className: "text-[var(--brand-blue)]"
                                    }, void 0, false, {
                                        fileName: "[project]/OneDrive/Desktop/skylark/components/DroneSimulator.js",
                                        lineNumber: 330,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$skylark$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[10px] font-bold uppercase tracking-wider text-[var(--text-secondary)]",
                                        children: "Suggested follow-up mission"
                                    }, void 0, false, {
                                        fileName: "[project]/OneDrive/Desktop/skylark/components/DroneSimulator.js",
                                        lineNumber: 331,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/OneDrive/Desktop/skylark/components/DroneSimulator.js",
                                lineNumber: 329,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$skylark$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-sm font-semibold text-white mb-2",
                                children: followUpMission.title
                            }, void 0, false, {
                                fileName: "[project]/OneDrive/Desktop/skylark/components/DroneSimulator.js",
                                lineNumber: 335,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$skylark$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-[var(--text-secondary)] leading-relaxed mb-3",
                                children: followUpMission.objective
                            }, void 0, false, {
                                fileName: "[project]/OneDrive/Desktop/skylark/components/DroneSimulator.js",
                                lineNumber: 336,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$skylark$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "rounded-xl border border-[var(--border-subtle)] bg-[rgba(0,0,0,0.24)] p-3 mb-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$skylark$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] mb-2",
                                        children: "Route"
                                    }, void 0, false, {
                                        fileName: "[project]/OneDrive/Desktop/skylark/components/DroneSimulator.js",
                                        lineNumber: 338,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$skylark$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-[var(--text-primary)]",
                                        children: followUpMission.route.join(" -> ")
                                    }, void 0, false, {
                                        fileName: "[project]/OneDrive/Desktop/skylark/components/DroneSimulator.js",
                                        lineNumber: 339,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/OneDrive/Desktop/skylark/components/DroneSimulator.js",
                                lineNumber: 337,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$skylark$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-[var(--text-muted)] leading-relaxed",
                                children: followUpMission.rationale
                            }, void 0, false, {
                                fileName: "[project]/OneDrive/Desktop/skylark/components/DroneSimulator.js",
                                lineNumber: 341,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/OneDrive/Desktop/skylark/components/DroneSimulator.js",
                        lineNumber: 328,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/OneDrive/Desktop/skylark/components/DroneSimulator.js",
                lineNumber: 247,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/OneDrive/Desktop/skylark/components/DroneSimulator.js",
        lineNumber: 46,
        columnNumber: 5
    }, this);
}
_s(DroneSimulator, "dPB5rG1kwT/zzjeFvrgW3p2yqDA=");
_c = DroneSimulator;
function normalize(val, min, max, outMin, outMax) {
    return outMin + (val - min) / (max - min) * (outMax - outMin);
}
var _c;
__turbopack_context__.k.register(_c, "DroneSimulator");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/OneDrive/Desktop/skylark/components/DroneSimulator.js [app-client] (ecmascript, next/dynamic entry)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/OneDrive/Desktop/skylark/components/DroneSimulator.js [app-client] (ecmascript)"));
}),
]);

//# sourceMappingURL=OneDrive_Desktop_skylark_0.yu~k4._.js.map