module.exports = [
"[project]/lib/siteData.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Ridgeway Site - Seeded overnight event data
// Simulated night: 10:00 PM → 6:10 AM
__turbopack_context__.s([
    "DRONE_ROUTES",
    ()=>DRONE_ROUTES,
    "GATES",
    ()=>GATES,
    "MORNING_BRIEFING_TEMPLATE",
    ()=>MORNING_BRIEFING_TEMPLATE,
    "OVERNIGHT_EVENTS",
    ()=>OVERNIGHT_EVENTS,
    "SITE_CONFIG",
    ()=>SITE_CONFIG,
    "SITE_LAYOUT",
    ()=>SITE_LAYOUT,
    "SUPERVISOR_NOTE",
    ()=>SUPERVISOR_NOTE,
    "ZONES",
    ()=>ZONES
]);
const SITE_CONFIG = {
    name: "Bengaluru Industrial Site",
    center: [
        12.9716,
        77.5946
    ],
    zoom: 16,
    briefingTime: "08:00 AM",
    reviewerName: "Maya Singh",
    nightSupervisor: "Raghav",
    siteHead: "Nisha"
};
const ZONES = [
    {
        id: "zone-a",
        name: "Zone A – Main Entry",
        color: "#3b82f6",
        coords: [
            12.9726,
            77.5896
        ],
        radius: 80
    },
    {
        id: "zone-b",
        name: "Zone B – Active Work Area",
        color: "#f59e0b",
        coords: [
            12.9716,
            77.5976
        ],
        radius: 100
    },
    {
        id: "zone-c",
        name: "Zone C – Storage Yard",
        color: "#ef4444",
        coords: [
            12.9696,
            77.5936
        ],
        isRestricted: true,
        radius: 120
    },
    {
        id: "zone-d",
        name: "Zone D – Control Room",
        color: "#10b981",
        coords: [
            12.9736,
            77.5916
        ],
        radius: 60
    },
    {
        id: "zone-e",
        name: "Zone E – North Perimeter",
        color: "#8b5cf6",
        coords: [
            12.9756,
            77.5956
        ],
        radius: 90
    }
];
const GATES = [
    {
        id: "gate-1",
        name: "Gate 1 – Main",
        coords: [
            12.9726,
            77.5886
        ],
        status: "normal"
    },
    {
        id: "gate-2",
        name: "Gate 2 – East",
        coords: [
            12.9716,
            77.6006
        ],
        status: "normal"
    },
    {
        id: "gate-3",
        name: "Gate 3 – North",
        coords: [
            12.9766,
            77.5956
        ],
        status: "alert"
    },
    {
        id: "gate-4",
        name: "Gate 4 – West",
        coords: [
            12.9696,
            77.5886
        ],
        status: "normal"
    }
];
const SITE_LAYOUT = {
    canvas: {
        width: 1200,
        height: 760
    },
    perimeter: {
        x: 80,
        y: 70,
        width: 1040,
        height: 620
    },
    roads: [
        {
            id: "road-main",
            x1: 160,
            y1: 210,
            x2: 1060,
            y2: 210,
            label: "Main access road"
        },
        {
            id: "road-service",
            x1: 360,
            y1: 320,
            x2: 950,
            y2: 580,
            label: "Service road"
        },
        {
            id: "road-perimeter",
            x1: 880,
            y1: 140,
            x2: 1000,
            y2: 600,
            label: "North perimeter loop"
        }
    ],
    zones: [
        {
            id: "zone-a",
            x: 120,
            y: 140,
            width: 220,
            height: 150,
            label: "Main entry"
        },
        {
            id: "zone-d",
            x: 380,
            y: 120,
            width: 220,
            height: 135,
            label: "Control room"
        },
        {
            id: "zone-b",
            x: 660,
            y: 150,
            width: 280,
            height: 190,
            label: "Active work area"
        },
        {
            id: "zone-c",
            x: 430,
            y: 380,
            width: 330,
            height: 210,
            label: "Restricted storage yard",
            restricted: true
        },
        {
            id: "zone-e",
            x: 830,
            y: 90,
            width: 220,
            height: 150,
            label: "North perimeter"
        }
    ],
    facilities: [
        {
            id: "block-c",
            x: 510,
            y: 430,
            width: 110,
            height: 76,
            label: "Block C shed"
        },
        {
            id: "launch-pad",
            x: 865,
            y: 525,
            width: 110,
            height: 70,
            label: "Drone launch pad"
        },
        {
            id: "yard",
            x: 650,
            y: 420,
            width: 160,
            height: 120,
            label: "Storage stacks"
        }
    ],
    gates: [
        {
            id: "gate-1",
            x: 120,
            y: 185,
            label: "Gate 1"
        },
        {
            id: "gate-2",
            x: 1070,
            y: 300,
            label: "Gate 2"
        },
        {
            id: "gate-3",
            x: 960,
            y: 82,
            label: "Gate 3"
        },
        {
            id: "gate-4",
            x: 90,
            y: 530,
            label: "Gate 4"
        }
    ]
};
const OVERNIGHT_EVENTS = [
    {
        id: "evt-001",
        type: "fence_alert",
        severity: "medium",
        time: "22:34",
        location: "Gate 3 – North Perimeter",
        coords: [
            12.9766,
            77.5956
        ],
        zone: "zone-e",
        title: "Perimeter Fence Alert",
        description: "Motion sensor triggered on north perimeter fence near Gate 3. Duration: 4.2 seconds. No visual confirmation available.",
        rawData: {
            sensorId: "FENCE-N-07",
            triggerDuration: 4.2,
            windSpeed: "18 km/h",
            temperature: "8°C"
        },
        tags: [
            "perimeter",
            "gate-3",
            "sensor"
        ],
        status: "unreviewed",
        aiAssessment: null
    },
    {
        id: "evt-002",
        type: "vehicle_movement",
        severity: "high",
        time: "01:17",
        location: "Storage Yard Entry – Zone C",
        coords: [
            12.9696,
            77.5936
        ],
        zone: "zone-c",
        title: "Unauthorized Vehicle Path",
        description: "Vehicle detected moving along service road adjacent to restricted Zone C storage yard. Did not enter zone. Plate not captured.",
        rawData: {
            vehicleType: "Light van (estimated)",
            speed: "12 km/h",
            direction: "North→South",
            plateCapture: false
        },
        tags: [
            "vehicle",
            "zone-c",
            "restricted",
            "after-hours"
        ],
        status: "unreviewed",
        aiAssessment: null
    },
    {
        id: "evt-003",
        type: "badge_failure",
        severity: "medium",
        time: "02:45",
        location: "Access Point – Building D West",
        coords: [
            12.9736,
            77.5916
        ],
        zone: "zone-d",
        title: "Three Failed Badge Swipes",
        description: "Three consecutive badge swipe failures at Building D West access point. Attempts at 02:45, 02:46, 02:47. Badge ID: TEMP-2941 (temporary contractor badge).",
        rawData: {
            badgeId: "TEMP-2941",
            badgeHolder: "Contractor (unassigned)",
            attempts: 3,
            lockoutTriggered: false,
            nearestCamera: "CAM-D-04 (offline)"
        },
        tags: [
            "access-control",
            "badge",
            "contractor",
            "building-d"
        ],
        status: "unreviewed",
        aiAssessment: null
    },
    {
        id: "evt-004",
        type: "drone_patrol",
        severity: "info",
        time: "03:30",
        location: "North Loop – Gate 3 / Zone C",
        coords: [
            12.9736,
            77.5946
        ],
        zone: "zone-e",
        title: "Drone Patrol – Night Loop Alpha",
        description: "Scheduled patrol Drone SD-7 completed North Loop. Covered Gate 3 perimeter and Zone C adjacency. No anomalies flagged by drone sensors.",
        rawData: {
            droneId: "SD-7",
            patrolRoute: "Night Loop Alpha",
            duration: "22 min",
            altitude: "35m",
            sensorsActive: [
                "thermal",
                "motion"
            ]
        },
        tags: [
            "drone",
            "patrol",
            "gate-3",
            "zone-c"
        ],
        status: "completed",
        aiAssessment: null
    },
    {
        id: "evt-005",
        type: "signal_anomaly",
        severity: "low",
        time: "04:10",
        location: "Block C – Equipment Shed",
        coords: [
            12.9686,
            77.5976
        ],
        zone: "zone-c",
        title: "Power Fluctuation – Block C",
        description: "Temporary power dip recorded in Block C equipment shed. Duration: 11 seconds. Backup systems engaged normally. Maintenance flag raised.",
        rawData: {
            duration: "11 seconds",
            voltageDropPercent: 23,
            backupEngaged: true,
            equipmentAffected: [
                "shed-lights",
                "sensor-array-C2"
            ]
        },
        tags: [
            "power",
            "block-c",
            "maintenance"
        ],
        status: "unreviewed",
        aiAssessment: null
    },
    {
        id: "evt-006",
        type: "signal_anomaly",
        severity: "low",
        time: "05:02",
        location: "Gate 2 – East Access",
        coords: [
            12.9716,
            77.6006
        ],
        zone: "zone-b",
        title: "CCTV Feed Interruption – Gate 2",
        description: "CCTV camera CAM-E-02 at Gate 2 went offline for 3 minutes 40 seconds. Auto-restart succeeded. Cause: firmware health check cycle (scheduled).",
        rawData: {
            cameraId: "CAM-E-02",
            offlineDuration: "3m 40s",
            causeClassified: "Scheduled firmware cycle",
            recoveredAuto: true
        },
        tags: [
            "cctv",
            "gate-2",
            "maintenance"
        ],
        status: "unreviewed",
        aiAssessment: null
    }
];
const DRONE_ROUTES = {
    "night-loop-alpha": {
        id: "night-loop-alpha",
        name: "Night Loop Alpha",
        droneId: "SD-7",
        startTime: "03:30",
        endTime: "03:52",
        waypoints: [
            {
                coords: [
                    12.9736,
                    77.5946
                ],
                label: "Base – Launch Pad",
                time: "03:30"
            },
            {
                coords: [
                    12.9756,
                    77.5936
                ],
                label: "En route North",
                time: "03:33"
            },
            {
                coords: [
                    12.9766,
                    77.5956
                ],
                label: "Gate 3 Perimeter Check",
                time: "03:36"
            },
            {
                coords: [
                    12.9756,
                    77.5976
                ],
                label: "North Fence Line",
                time: "03:40"
            },
            {
                coords: [
                    12.9716,
                    77.5976
                ],
                label: "Zone C Adjacency Pass",
                time: "03:45"
            },
            {
                coords: [
                    12.9696,
                    77.5946
                ],
                label: "Storage Yard Perimeter",
                time: "03:48"
            },
            {
                coords: [
                    12.9736,
                    77.5946
                ],
                label: "Return to Base",
                time: "03:52"
            }
        ],
        observations: [
            {
                waypoint: 2,
                text: "Gate 3 fence visually intact. No persons detected."
            },
            {
                waypoint: 4,
                text: "Zone C perimeter clear. No vehicle visible at time of pass."
            },
            {
                waypoint: 5,
                text: "Storage yard exterior: no unusual activity."
            }
        ],
        status: "completed"
    }
};
const SUPERVISOR_NOTE = {
    author: "Raghav",
    time: "05:55",
    text: "Please check Block C before leadership asks. Had a weird power dip around 4 AM and the sensor on C2 was flaky. Could be nothing but Nisha will ask. Also the fence thing at Gate 3 – wind was strong last night, probably fine but worth flagging if the drone saw anything near there earlier."
};
const MORNING_BRIEFING_TEMPLATE = {
    sections: [
        {
            key: "summary",
            title: "What happened last night?"
        },
        {
            key: "harmless",
            title: "What was harmless?"
        },
        {
            key: "escalation",
            title: "What deserves escalation?"
        },
        {
            key: "drone",
            title: "What did the drone check?"
        },
        {
            key: "followup",
            title: "What still needs follow-up?"
        },
        {
            key: "actions",
            title: "Recommended Actions"
        }
    ]
};
}),
"[project]/lib/agent.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AGENT_INVESTIGATION_STEPS",
    ()=>AGENT_INVESTIGATION_STEPS,
    "MORNING_BRIEFING",
    ()=>MORNING_BRIEFING,
    "TOOLS",
    ()=>TOOLS,
    "generateAIAssessment",
    ()=>generateAIAssessment,
    "runAgentInvestigation",
    ()=>runAgentInvestigation
]);
// AI Agent - MCP-style tool interface for the 6:10 Assistant
// Simulates a real agent with tool-calling capabilities
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$siteData$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/siteData.js [app-ssr] (ecmascript)");
;
const TOOLS = {
    fetch_events: {
        name: "fetch_events",
        description: "Retrieve all overnight security events from the site monitoring system. Can filter by type, severity, zone, or time range.",
        parameters: {
            type: {
                type: "string",
                optional: true,
                enum: [
                    "fence_alert",
                    "vehicle_movement",
                    "badge_failure",
                    "drone_patrol",
                    "signal_anomaly"
                ]
            },
            severity: {
                type: "string",
                optional: true,
                enum: [
                    "high",
                    "medium",
                    "low",
                    "info"
                ]
            },
            zone: {
                type: "string",
                optional: true
            },
            after: {
                type: "string",
                optional: true,
                description: "ISO time string HH:MM"
            },
            before: {
                type: "string",
                optional: true
            }
        }
    },
    get_zone_context: {
        name: "get_zone_context",
        description: "Retrieve contextual information about a specific site zone including access rules, recent history, and risk profile.",
        parameters: {
            zone_id: {
                type: "string",
                required: true
            }
        }
    },
    cross_reference_events: {
        name: "cross_reference_events",
        description: "Find temporal and spatial correlations between two or more events. Identifies if events may be causally linked.",
        parameters: {
            event_ids: {
                type: "array",
                required: true
            }
        }
    },
    fetch_drone_telemetry: {
        name: "fetch_drone_telemetry",
        description: "Retrieve drone patrol telemetry including waypoints, coverage, and observations for a given route or drone ID.",
        parameters: {
            route_id: {
                type: "string",
                optional: true
            },
            drone_id: {
                type: "string",
                optional: true
            }
        }
    },
    check_badge_registry: {
        name: "check_badge_registry",
        description: "Look up badge holder information, access permissions, and recent activity for a given badge ID.",
        parameters: {
            badge_id: {
                type: "string",
                required: true
            }
        }
    },
    assess_weather_context: {
        name: "assess_weather_context",
        description: "Retrieve recorded weather conditions for the night to provide context for sensor anomalies.",
        parameters: {
            time_range: {
                type: "string",
                optional: true
            }
        }
    },
    flag_for_escalation: {
        name: "flag_for_escalation",
        description: "Mark an event as requiring escalation to site leadership with a reason and urgency level.",
        parameters: {
            event_id: {
                type: "string",
                required: true
            },
            reason: {
                type: "string",
                required: true
            },
            urgency: {
                type: "string",
                enum: [
                    "immediate",
                    "morning-briefing",
                    "end-of-day"
                ]
            }
        }
    },
    draft_briefing_section: {
        name: "draft_briefing_section",
        description: "Generate a draft summary for a specific section of the morning briefing document.",
        parameters: {
            section: {
                type: "string",
                required: true,
                enum: [
                    "summary",
                    "harmless",
                    "escalation",
                    "drone",
                    "followup",
                    "actions"
                ]
            },
            context: {
                type: "string",
                required: true
            }
        }
    }
};
// ─── Tool Execution Simulations ───────────────────────────────────────────────
function executeTool(toolName, params) {
    switch(toolName){
        case "fetch_events":
            {
                let events = [
                    ...__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$siteData$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OVERNIGHT_EVENTS"]
                ];
                if (params.type) events = events.filter((e)=>e.type === params.type);
                if (params.severity) events = events.filter((e)=>e.severity === params.severity);
                if (params.zone) events = events.filter((e)=>e.zone === params.zone);
                return {
                    events,
                    count: events.length
                };
            }
        case "get_zone_context":
            {
                const zone = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$siteData$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ZONES"].find((z)=>z.id === params.zone_id);
                const zoneEvents = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$siteData$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OVERNIGHT_EVENTS"].filter((e)=>e.zone === params.zone_id);
                const zoneRisk = {
                    "zone-c": {
                        riskLevel: "high",
                        notes: "Restricted storage. No after-hours vehicle access permitted. Last incident: 3 weeks ago (contractor vehicle, resolved).",
                        accessPolicy: "Authorized personnel only, 06:00–18:00"
                    },
                    "zone-e": {
                        riskLevel: "medium",
                        notes: "North perimeter. Historical fence alerts primarily weather-related (wind >15 km/h). Two genuine intrusion attempts in past 18 months.",
                        accessPolicy: "Patrol access only"
                    },
                    "zone-d": {
                        riskLevel: "medium",
                        notes: "Control room area. Badge access required. Temporary contractor badges (TEMP-series) have restricted access.",
                        accessPolicy: "Staff + pre-approved contractors"
                    },
                    "zone-b": {
                        riskLevel: "low",
                        notes: "Active work area. Monitored by 4 cameras. Normal night crew access.",
                        accessPolicy: "Site staff overnight"
                    },
                    "zone-a": {
                        riskLevel: "low",
                        notes: "Main entry. Highest traffic zone. Well monitored.",
                        accessPolicy: "All credentialed staff"
                    }
                };
                return {
                    zone,
                    events: zoneEvents,
                    context: zoneRisk[params.zone_id] || {
                        riskLevel: "unknown",
                        notes: "No context available"
                    }
                };
            }
        case "cross_reference_events":
            {
                const events = params.event_ids.map((id)=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$siteData$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OVERNIGHT_EVENTS"].find((e)=>e.id === id)).filter(Boolean);
                const correlations = [];
                // Check for spatial proximity
                for(let i = 0; i < events.length; i++){
                    for(let j = i + 1; j < events.length; j++){
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
                                assessment: isNearby && timeDiff < 180 ? "Possible correlation – same area, close in time" : timeDiff < 60 ? "Temporal proximity – occurred within 1 hour" : "Weak link – same zone, different times"
                            });
                        }
                    }
                }
                return {
                    events,
                    correlations
                };
            }
        case "fetch_drone_telemetry":
            {
                const route = params.route_id ? __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$siteData$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DRONE_ROUTES"][params.route_id] : Object.values(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$siteData$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DRONE_ROUTES"])[0];
                return {
                    route,
                    summary: `Drone ${route.droneId} completed ${route.name} patrol from ${route.startTime} to ${route.endTime}. ${route.observations.length} observations logged.`
                };
            }
        case "check_badge_registry":
            {
                const registry = {
                    "TEMP-2941": {
                        badgeId: "TEMP-2941",
                        type: "Temporary Contractor",
                        holder: "Unassigned – Temp batch issued 2025-11-12",
                        validUntil: "2025-12-31",
                        authorizedZones: [
                            "zone-a",
                            "zone-b"
                        ],
                        restrictedZones: [
                            "zone-c",
                            "zone-d",
                            "zone-e"
                        ],
                        lastSuccessfulAccess: "Zone A Gate 1 – 14:32 yesterday",
                        recentFailures: 3,
                        note: "TEMP-series badges are batch-issued. This badge is not assigned to a named individual. HR should be able to trace from issuance records."
                    }
                };
                return registry[params.badge_id] || {
                    badgeId: params.badge_id,
                    note: "Badge not found in registry."
                };
            }
        case "assess_weather_context":
            {
                return {
                    nightSummary: {
                        conditions: "Partly cloudy, intermittent light rain",
                        windSpeed: {
                            average: "16 km/h",
                            peak: "23 km/h at 22:20–22:50"
                        },
                        temperature: {
                            low: "6°C",
                            high: "9°C"
                        },
                        relevance: "Wind speed around 22:30 was above the Gate 3 fence sensor threshold (15 km/h). This is a known cause of false positives on FENCE-N-07.",
                        historicalFalsePositiveRate: "~68% of alerts on FENCE-N-07 occur when wind >15 km/h"
                    }
                };
            }
        case "flag_for_escalation":
            {
                return {
                    flagged: true,
                    eventId: params.event_id,
                    reason: params.reason,
                    urgency: params.urgency
                };
            }
        case "draft_briefing_section":
            {
                return {
                    drafted: true,
                    section: params.section
                };
            }
        default:
            return {
                error: `Unknown tool: ${toolName}`
            };
    }
}
const AGENT_INVESTIGATION_STEPS = [
    {
        id: "step-1",
        phase: "discovery",
        label: "Fetching all overnight events",
        tool: "fetch_events",
        params: {},
        thinking: "Let me start by pulling all overnight events to understand what we're working with before diving into specifics.",
        delay: 800
    },
    {
        id: "step-2",
        phase: "discovery",
        label: "Assessing weather conditions for context",
        tool: "assess_weather_context",
        params: {
            time_range: "22:00–06:00"
        },
        thinking: "The fence alert at 22:34 could be weather-related. Let me check conditions first before drawing conclusions.",
        delay: 600
    },
    {
        id: "step-3",
        phase: "investigation",
        label: "Getting Zone C context (restricted area)",
        tool: "get_zone_context",
        params: {
            zone_id: "zone-c"
        },
        thinking: "The supervisor flagged Block C and there's a vehicle near Zone C. I need to understand the risk profile and access policy for this area.",
        delay: 700
    },
    {
        id: "step-4",
        phase: "investigation",
        label: "Checking badge registry for TEMP-2941",
        tool: "check_badge_registry",
        params: {
            badge_id: "TEMP-2941"
        },
        thinking: "Three failed badge swipes is a pattern worth examining. I need to know who this badge belongs to and whether they should have access to Zone D.",
        delay: 900
    },
    {
        id: "step-5",
        phase: "investigation",
        label: "Fetching drone patrol telemetry",
        tool: "fetch_drone_telemetry",
        params: {
            route_id: "night-loop-alpha"
        },
        thinking: "The drone patrol covered Gate 3 and Zone C. I need to see what it actually observed and whether it can corroborate or contradict the other events.",
        delay: 750
    },
    {
        id: "step-6",
        phase: "correlation",
        label: "Cross-referencing fence alert + vehicle + power dip",
        tool: "cross_reference_events",
        params: {
            event_ids: [
                "evt-001",
                "evt-002",
                "evt-005"
            ]
        },
        thinking: "The fence alert, vehicle near Zone C, and the power dip in Block C all occurred in the same general area. Are these connected?",
        delay: 1000
    },
    {
        id: "step-7",
        phase: "correlation",
        label: "Cross-referencing vehicle movement + drone timing",
        tool: "cross_reference_events",
        params: {
            event_ids: [
                "evt-002",
                "evt-004"
            ]
        },
        thinking: "The vehicle was spotted at 01:17. The drone patrolled Zone C at 03:48. That's a 2.5 hour gap – the drone wouldn't have seen the vehicle. I need to flag this timing gap.",
        delay: 800
    },
    {
        id: "step-8",
        phase: "assessment",
        label: "Flagging vehicle near Zone C for escalation",
        tool: "flag_for_escalation",
        params: {
            event_id: "evt-002",
            reason: "Unidentified vehicle adjacent to restricted Zone C at 01:17. No plate capture. Drone did not cover this location until 2.5 hours later. Access logs show no authorized night vehicle movement in this area.",
            urgency: "morning-briefing"
        },
        thinking: "This is the event that deserves the most attention. The drone couldn't confirm or deny because of the timing gap.",
        delay: 600
    },
    {
        id: "step-9",
        phase: "assessment",
        label: "Flagging unassigned badge failure for follow-up",
        tool: "flag_for_escalation",
        params: {
            event_id: "evt-003",
            reason: "TEMP-2941 is an unassigned batch badge. Three consecutive failed attempts at a restricted zone control room. Badge holder identity unknown. HR trace required.",
            urgency: "morning-briefing"
        },
        thinking: "An unassigned badge trying to access a restricted area is a process gap at minimum. Someone is carrying a badge that shouldn't grant them Zone D access.",
        delay: 700
    },
    {
        id: "step-10",
        phase: "drafting",
        label: "Drafting morning briefing",
        tool: "draft_briefing_section",
        params: {
            section: "summary",
            context: "6 overnight events across 5 zones. 2 warrant escalation. Fence alert likely weather. Block C power dip maintenance-flagged."
        },
        thinking: "Now I have enough context to draft the full morning briefing for Maya.",
        delay: 1200
    }
];
function generateAIAssessment(eventId, toolResults) {
    const assessments = {
        "evt-001": {
            verdict: "likely_harmless",
            confidence: 0.78,
            summary: "Fence alert at Gate 3 at 22:34 is consistent with recorded wind conditions. Peak wind speed of 23 km/h at 22:20–22:50 exceeds the sensor's known false-positive threshold. FENCE-N-07 has a 68% false-positive rate in these conditions. Drone patrol at 03:36 found gate perimeter visually intact. No corroborating events.",
            uncertainties: [
                "No visual confirmation at time of alert",
                "4.2-second trigger is longer than typical wind false positives (usually <2s)"
            ],
            recommendedAction: "Log as probable false positive. Note extended trigger duration for sensor calibration team."
        },
        "evt-002": {
            verdict: "escalate",
            confidence: 0.71,
            summary: "Unidentified vehicle adjacent to restricted Zone C at 01:17. Zone C is a high-risk restricted storage yard with no authorized after-hours vehicle access. No plate was captured. The drone patrol covered this area 2.5 hours later and found no vehicle – this is expected given the timing gap, not evidence of harmlessness.",
            uncertainties: [
                "Vehicle may have been a contractor taking a service road shortcut (known issue at this site)",
                "No confirmation of Zone C entry – vehicle remained adjacent",
                "Drone timing gap means no aerial confirmation of vehicle disposition"
            ],
            recommendedAction: "Escalate to morning briefing. Request CCTV review of service road between 01:00–02:00. Confirm with zone access logs. If no authorized record, treat as unauthorized activity."
        },
        "evt-003": {
            verdict: "escalate",
            confidence: 0.65,
            summary: "Three failed swipes from badge TEMP-2941 at a Zone D controlled access point (02:45–02:47). TEMP-2941 is an unassigned batch badge – it is not linked to a named individual. Zone D is restricted; this badge type has no authorized Zone D access. Three consecutive attempts suggest intentional access, not accident.",
            uncertainties: [
                "Badge may have been issued to someone legitimately but not yet registered to a person",
                "The bearer may not have known they were attempting restricted access",
                "Nearest camera (CAM-D-04) was offline"
            ],
            recommendedAction: "Escalate: HR to trace TEMP-2941 issuance. Security team to identify who was in Zone D area at 02:45. Process gap: unassigned TEMP badges should not be in circulation."
        },
        "evt-004": {
            verdict: "routine",
            confidence: 0.95,
            summary: "Scheduled drone patrol SD-7 Night Loop Alpha completed normally. Route covered Gate 3 perimeter (visual clear at 03:36) and Zone C adjacency (clear at 03:48). All drone sensors nominal. No anomalies flagged. This event is informational and confirms the perimeter was clear during the patrol window.",
            uncertainties: [],
            recommendedAction: "No action required. Include in briefing as confirmation of patrol coverage."
        },
        "evt-005": {
            verdict: "likely_harmless",
            confidence: 0.82,
            summary: "Power dip in Block C equipment shed lasted 11 seconds at 04:10. Backup systems engaged correctly. The affected sensors (shed-lights, sensor-array-C2) recovered. This is consistent with an equipment load fluctuation or brief grid issue. Supervisor Raghav specifically flagged this – likely because sensor C2 went temporarily offline, which could affect monitoring confidence for that period.",
            uncertainties: [
                "Sensor C2 offline window means no monitoring data for that sensor during the dip",
                "Temporal proximity to vehicle event (3 hours prior) – likely unrelated but not impossible"
            ],
            recommendedAction: "Log as maintenance item. Notify facility engineering. Sensor C2 should be checked for data integrity during offline window."
        },
        "evt-006": {
            verdict: "routine",
            confidence: 0.92,
            summary: "CCTV camera CAM-E-02 at Gate 2 went offline for 3 minutes 40 seconds at 05:02 due to a scheduled firmware health check cycle. Camera self-recovered. This is expected scheduled maintenance behavior and does not indicate a security issue.",
            uncertainties: [],
            recommendedAction: "No action required. Ensure maintenance schedule is visible to night supervisors to avoid unnecessary investigation."
        }
    };
    return assessments[eventId] || null;
}
const MORNING_BRIEFING = {
    generatedAt: "06:10 AM",
    preparedFor: "Nisha – Site Head (08:00 AM Review)",
    preparedBy: "6:10 Assistant (AI) + Maya (Ops Lead – review pending)",
    sections: {
        summary: {
            title: "What happened last night?",
            content: `Six events were recorded between 22:00 and 06:00 across five zones of Ridgeway Site. Two events warrant leadership attention: an unidentified vehicle adjacent to restricted Zone C at 01:17 AM, and three consecutive badge failures from an unassigned contractor badge at the Zone D control room access point at 02:45 AM. The remaining four events are assessed as routine or weather-related. Drone Patrol SD-7 completed the Night Loop Alpha route as scheduled and confirmed perimeter integrity during its coverage window.`
        },
        harmless: {
            title: "What was harmless?",
            content: `The Gate 3 fence alert at 22:34 is consistent with recorded peak wind conditions (23 km/h) and falls within the known false-positive profile of sensor FENCE-N-07. The Block C power dip at 04:10 triggered correctly configured backup systems and is classified as a maintenance item. The Gate 2 CCTV offline period at 05:02 was a scheduled firmware cycle and the camera self-recovered.`
        },
        escalation: {
            title: "What deserves escalation?",
            content: `1. VEHICLE NEAR ZONE C (01:17 AM) – Priority: HIGH. An unidentified light van-type vehicle was detected moving along the service road adjacent to restricted Zone C. No plate was captured. No authorized after-hours vehicle movement is logged for this area. The drone did not cover this location until 2.5 hours later, leaving a temporal gap in aerial confirmation. CCTV review of the service road between 01:00–02:00 is required.\n\n2. UNASSIGNED BADGE FAILURES – Zone D (02:45 AM) – Priority: MEDIUM. Three consecutive failed access attempts at the Zone D controlled access point using an unassigned TEMP-series batch badge (TEMP-2941). The badge is not linked to a named individual and is not authorized for Zone D. The nearest camera was offline. HR and security need to trace who was carrying this badge.`
        },
        drone: {
            title: "What did the drone check?",
            content: `Drone SD-7 completed Night Loop Alpha from 03:30 to 03:52. The route covered the Gate 3 north perimeter (visual check at 03:36 – fence intact, no persons detected) and Zone C adjacency (03:48 – exterior clear, no vehicle present at time of pass). The drone used thermal and motion sensors throughout. Important caveat: the vehicle event at Zone C occurred at 01:17 – approximately 2.5 hours before the drone reached that area. The drone's clear observation does not negate the earlier vehicle detection.`
        },
        followup: {
            title: "What still needs follow-up?",
            content: `1. CCTV review of service road near Zone C – 01:00–02:00 window\n2. Zone C access logs – confirm no authorized entry occurred\n3. HR trace of TEMP-2941 badge – who was issued this badge and where were they going at 02:45?\n4. Security review – who was in the Zone D area at 02:45 AM?\n5. Engineering – inspect sensor C2 in Block C for data integrity during the 04:10 offline window\n6. Maintenance – CAM-D-04 (Zone D camera) was offline during badge event – repair/replace\n7. Sensor calibration team – review FENCE-N-07 threshold settings`
        },
        actions: {
            title: "Recommended Actions Before 08:00",
            content: `Maya should review and approve or adjust AI escalation assessments before the leadership briefing. Priority: confirm the vehicle event classification and badge investigation status. If CCTV review finds no vehicle or an identifiable contractor, escalation level for evt-002 can be downgraded. If badge holder cannot be identified, security should be informed before Nisha's briefing.`
        }
    }
};
async function runAgentInvestigation(onStep, onComplete) {
    const results = {};
    for(let i = 0; i < AGENT_INVESTIGATION_STEPS.length; i++){
        const step = AGENT_INVESTIGATION_STEPS[i];
        await new Promise((resolve)=>setTimeout(resolve, step.delay));
        const result = executeTool(step.tool, step.params);
        results[step.id] = {
            step,
            result
        };
        if (onStep) {
            onStep({
                stepIndex: i,
                step,
                result,
                allResults: results,
                isLast: i === AGENT_INVESTIGATION_STEPS.length - 1
            });
        }
    }
    if (onComplete) {
        onComplete(results);
    }
    return results;
}
}),
"[project]/lib/intelligence.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "INCIDENT_BLUEPRINTS",
    ()=>INCIDENT_BLUEPRINTS,
    "buildIncidents",
    ()=>buildIncidents,
    "buildMorningBriefing",
    ()=>buildMorningBriefing,
    "getFollowUpMission",
    ()=>getFollowUpMission,
    "getOperationsMetrics",
    ()=>getOperationsMetrics
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$siteData$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/siteData.js [app-ssr] (ecmascript)");
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
        preparedFor: `${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$siteData$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SITE_CONFIG"].siteHead} - Site Head (${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$siteData$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SITE_CONFIG"].briefingTime} review)`,
        preparedBy: reviewReady ? `6:10 Assistant + ${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$siteData$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SITE_CONFIG"].reviewerName} review complete` : `6:10 Assistant draft, ${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$siteData$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SITE_CONFIG"].reviewerName} review pending`,
        sections: {
            summary: buildSection("What happened last night?", `${events.length} overnight signals collapsed into ${incidents.length} investigation threads. ${escalations.length} thread${escalations.length === 1 ? "" : "s"} need leadership attention before ${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$siteData$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SITE_CONFIG"].briefingTime}. The most important issue is the Zone C corridor anomaly, where a vehicle path, later sensor confidence loss, and delayed drone coverage leave an evidence gap.`),
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
}),
"[project]/app/page.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/shared/lib/app-dynamic.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/triangle-alert.js [app-ssr] (ecmascript) <export default as AlertTriangle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Shield$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shield.js [app-ssr] (ecmascript) <export default as Shield>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Map$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/map.js [app-ssr] (ecmascript) <export default as Map>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Navigation$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/navigation.js [app-ssr] (ecmascript) <export default as Navigation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file-text.js [app-ssr] (ecmascript) <export default as FileText>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$activity$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Activity$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/activity.js [app-ssr] (ecmascript) <export default as Activity>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check-big.js [app-ssr] (ecmascript) <export default as CheckCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-x.js [app-ssr] (ecmascript) <export default as XCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$question$2d$mark$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__HelpCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-question-mark.js [app-ssr] (ecmascript) <export default as HelpCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bell$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Bell$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/bell.js [app-ssr] (ecmascript) <export default as Bell>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/eye.js [app-ssr] (ecmascript) <export default as Eye>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/lock.js [app-ssr] (ecmascript) <export default as Lock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$cpu$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Cpu$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/cpu.js [app-ssr] (ecmascript) <export default as Cpu>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$radar$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Radar$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/radar.js [app-ssr] (ecmascript) <export default as Radar>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$octagon$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertOctagon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/octagon-alert.js [app-ssr] (ecmascript) <export default as AlertOctagon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/menu.js [app-ssr] (ecmascript) <export default as Menu>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$siteData$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/siteData.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$agent$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/agent.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$intelligence$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/intelligence.js [app-ssr] (ecmascript)");
;
;
;
;
;
;
"use client";
;
;
;
;
;
;
;
;
const SiteMap = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(async ()=>{}, {
    loadableGenerated: {
        modules: [
            "[project]/components/SiteMap.js [app-client] (ecmascript, next/dynamic entry)"
        ]
    },
    ssr: false
});
const AgentPanel = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(async ()=>{}, {
    loadableGenerated: {
        modules: [
            "[project]/components/AgentPanel.js [app-client] (ecmascript, next/dynamic entry)"
        ]
    },
    ssr: false
});
const EventTimeline = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(async ()=>{}, {
    loadableGenerated: {
        modules: [
            "[project]/components/EventTimeline.js [app-client] (ecmascript, next/dynamic entry)"
        ]
    },
    ssr: false
});
const BriefingPanel = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(async ()=>{}, {
    loadableGenerated: {
        modules: [
            "[project]/components/BriefingPanel.js [app-client] (ecmascript, next/dynamic entry)"
        ]
    },
    ssr: false
});
const DroneSimulator = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(async ()=>{}, {
    loadableGenerated: {
        modules: [
            "[project]/components/DroneSimulator.js [app-client] (ecmascript, next/dynamic entry)"
        ]
    },
    ssr: false
});
const IncidentBoard = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(async ()=>{}, {
    loadableGenerated: {
        modules: [
            "[project]/components/IncidentBoard.js [app-client] (ecmascript, next/dynamic entry)"
        ]
    },
    ssr: false
});
const TABS = [
    {
        id: "overview",
        label: "Intelligence Feed",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$activity$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Activity$3e$__["Activity"],
        desc: "Event triage & AI insights"
    },
    {
        id: "incidents",
        label: "Investigation Threads",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"],
        desc: "Correlated incident clusters"
    },
    {
        id: "map",
        label: "Site Map",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Map$3e$__["Map"],
        desc: "Spatial event visualization"
    },
    {
        id: "drone",
        label: "Drone Patrol",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Navigation$3e$__["Navigation"],
        desc: "Flight telemetry playback"
    },
    {
        id: "briefing",
        label: "Morning Briefing",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"],
        desc: "Final leadership report"
    }
];
function Home() {
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("overview");
    const [agentRunning, setAgentRunning] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [agentDone, setAgentDone] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [agentSteps, setAgentSteps] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [events, setEvents] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$siteData$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OVERNIGHT_EVENTS"].map((e)=>({
            ...e,
            aiAssessment: null,
            userVerdict: null
        })));
    const [selectedEvent, setSelectedEvent] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [currentTime, setCurrentTime] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("06:10");
    const [notifications, setNotifications] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [briefingApproved, setBriefingApproved] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [mapFocusEvent, setMapFocusEvent] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isSidebarOpen, setIsSidebarOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [selectedIncidentId, setSelectedIncidentId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    // Live clock simulation
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const start = new Date();
        start.setHours(6, 10, 0);
        const interval = setInterval(()=>{
            start.setSeconds(start.getSeconds() + 1);
            setCurrentTime(start.toLocaleTimeString("en-GB", {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit"
            }));
        }, 1000);
        return ()=>clearInterval(interval);
    }, []);
    const startInvestigation = async ()=>{
        if (agentRunning || agentDone) return;
        setAgentRunning(true);
        setActiveTab("overview");
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$agent$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["runAgentInvestigation"])(({ step, result, stepIndex, isLast })=>{
            setAgentSteps((prev)=>[
                    ...prev,
                    {
                        step,
                        result,
                        status: "done"
                    }
                ]);
            if (stepIndex >= 7) {
                setEvents((prev)=>prev.map((e)=>({
                            ...e,
                            aiAssessment: e.aiAssessment || (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$agent$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["generateAIAssessment"])(e.id, {})
                        })));
            }
            if (step.tool === "flag_for_escalation") {
                setNotifications((prev)=>[
                        ...prev,
                        {
                            id: Date.now(),
                            text: `Escalation flagged: ${result.eventId}`,
                            type: "alert"
                        }
                    ]);
            }
            if (isLast) {
                setAgentRunning(false);
                setAgentDone(true);
                setEvents((prev)=>prev.map((e)=>({
                            ...e,
                            aiAssessment: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$agent$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["generateAIAssessment"])(e.id, {})
                        })));
            }
        }, ()=>{});
    };
    const handleUserVerdict = (eventId, verdict)=>{
        setEvents((prev)=>prev.map((e)=>e.id === eventId ? {
                    ...e,
                    userVerdict: verdict
                } : e));
    };
    const highCount = events.filter((e)=>e.severity === "high").length;
    const escalateCount = events.filter((e)=>e.aiAssessment?.verdict === "escalate").length;
    const reviewedCount = events.filter((e)=>e.userVerdict !== null).length;
    const incidents = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$intelligence$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["INCIDENT_BLUEPRINTS"];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex h-screen overflow-hidden bg-[var(--surface-0)]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].aside, {
                initial: {
                    width: 280
                },
                animate: {
                    width: isSidebarOpen ? 280 : 80
                },
                className: "h-full glass-panel flex flex-col z-40 border-r border-[var(--border-subtle)] shrink-0 transition-all duration-300",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-4 flex items-center gap-3 border-b border-[var(--border-subtle)] h-16",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative w-8 h-8 shrink-0",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute inset-0 rounded-full animate-spin-slow opacity-40 shadow-[0_0_15px_rgba(245,158,11,0.5)]",
                                        style: {
                                            background: "conic-gradient(from 0deg, var(--brand-amber), transparent)"
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.js",
                                        lineNumber: 111,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute inset-1 rounded-full flex items-center justify-center bg-[var(--surface-2)]",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$radar$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Radar$3e$__["Radar"], {
                                            size: 14,
                                            className: "text-amber-400"
                                        }, void 0, false, {
                                            fileName: "[project]/app/page.js",
                                            lineNumber: 114,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.js",
                                        lineNumber: 113,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/page.js",
                                lineNumber: 110,
                                columnNumber: 11
                            }, this),
                            isSidebarOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                initial: {
                                    opacity: 0
                                },
                                animate: {
                                    opacity: 1
                                },
                                className: "flex flex-col whitespace-nowrap",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-bold text-sm tracking-wide text-[var(--text-primary)]",
                                        children: "6:10 ASSISTANT"
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.js",
                                        lineNumber: 119,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[10px] uppercase text-[var(--text-muted)] tracking-wider",
                                        children: "Ridgeway Site Ops"
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.js",
                                        lineNumber: 120,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/page.js",
                                lineNumber: 118,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/page.js",
                        lineNumber: 109,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 overflow-y-auto py-6 px-3 flex flex-col gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "px-3 mb-2 flex items-center justify-between",
                                children: isSidebarOpen ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider",
                                    children: "Modules"
                                }, void 0, false, {
                                    fileName: "[project]/app/page.js",
                                    lineNumber: 128,
                                    columnNumber: 15
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "h-[1px] w-full bg-[var(--border-medium)]"
                                }, void 0, false, {
                                    fileName: "[project]/app/page.js",
                                    lineNumber: 130,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/page.js",
                                lineNumber: 126,
                                columnNumber: 11
                            }, this),
                            TABS.map((tab)=>{
                                const isActive = activeTab === tab.id;
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setActiveTab(tab.id),
                                    className: `group flex items-center gap-3 p-3 rounded-xl transition-all duration-300 relative w-full text-left ${isActive ? 'bg-[rgba(245,158,11,0.1)] border-[rgba(245,158,11,0.2)]' : 'hover:bg-[rgba(255,255,255,0.03)] border-transparent'} border`,
                                    children: [
                                        isActive && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                            layoutId: "sidebar-active",
                                            className: "absolute left-0 top-1/4 bottom-1/4 w-1 bg-[var(--brand-amber)] rounded-r-full shadow-[0_0_10px_var(--brand-amber)]"
                                        }, void 0, false, {
                                            fileName: "[project]/app/page.js",
                                            lineNumber: 142,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(tab.icon, {
                                            size: 18,
                                            className: `shrink-0 transition-colors ${isActive ? 'text-[var(--brand-amber)]' : 'text-[var(--text-muted)] group-hover:text-[var(--text-secondary)]'}`
                                        }, void 0, false, {
                                            fileName: "[project]/app/page.js",
                                            lineNumber: 144,
                                            columnNumber: 17
                                        }, this),
                                        isSidebarOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex flex-col overflow-hidden",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: `text-sm font-medium transition-colors ${isActive ? 'text-[var(--brand-amber)]' : 'text-[var(--text-secondary)] group-hover:text-[var(--text-primary)]'}`,
                                                    children: tab.label
                                                }, void 0, false, {
                                                    fileName: "[project]/app/page.js",
                                                    lineNumber: 147,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-[10px] text-[var(--text-muted)] truncate",
                                                    children: tab.desc
                                                }, void 0, false, {
                                                    fileName: "[project]/app/page.js",
                                                    lineNumber: 150,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/page.js",
                                            lineNumber: 146,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, tab.id, true, {
                                    fileName: "[project]/app/page.js",
                                    lineNumber: 137,
                                    columnNumber: 15
                                }, this);
                            }),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-auto pt-6",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: `p-3 rounded-xl border border-[var(--border-subtle)] bg-[rgba(15,23,42,0.4)] flex items-center gap-3 ${isSidebarOpen ? '' : 'justify-center'}`,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-8 h-8 rounded-full bg-gradient-to-br from-amber-500 to-orange-700 flex items-center justify-center text-white shrink-0 font-bold shadow-lg",
                                            children: "M"
                                        }, void 0, false, {
                                            fileName: "[project]/app/page.js",
                                            lineNumber: 160,
                                            columnNumber: 15
                                        }, this),
                                        isSidebarOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex flex-col overflow-hidden",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-sm font-medium text-[var(--text-primary)]",
                                                    children: "Maya Singh"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/page.js",
                                                    lineNumber: 165,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-xs text-[var(--text-muted)]",
                                                    children: "Operations Lead"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/page.js",
                                                    lineNumber: 166,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/page.js",
                                            lineNumber: 164,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/page.js",
                                    lineNumber: 159,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/page.js",
                                lineNumber: 158,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/page.js",
                        lineNumber: 125,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/page.js",
                lineNumber: 104,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: "flex-1 flex flex-col h-full overflow-hidden relative",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                        className: "h-16 glass z-30 flex items-center justify-between px-6 shrink-0 border-b border-[var(--border-subtle)]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setIsSidebarOpen(!isSidebarOpen),
                                        className: "p-2 -ml-2 rounded-lg hover:bg-[rgba(255,255,255,0.05)] text-[var(--text-muted)] hover:text-white transition-colors",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__["Menu"], {
                                            size: 20
                                        }, void 0, false, {
                                            fileName: "[project]/app/page.js",
                                            lineNumber: 181,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.js",
                                        lineNumber: 180,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                            className: "text-lg font-semibold tracking-wide flex items-center gap-2 text-[var(--text-primary)]",
                                            children: TABS.find((t)=>t.id === activeTab)?.label
                                        }, void 0, false, {
                                            fileName: "[project]/app/page.js",
                                            lineNumber: 184,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.js",
                                        lineNumber: 183,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/page.js",
                                lineNumber: 179,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-2 px-3 py-1.5 rounded-full bg-[rgba(16,185,129,0.1)] border border-[rgba(16,185,129,0.2)]",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "dot-pulse active"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/page.js",
                                                        lineNumber: 194,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-xs font-medium text-emerald-400",
                                                        children: "System Secure"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/page.js",
                                                        lineNumber: 195,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/page.js",
                                                lineNumber: 193,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-sm font-mono px-3 py-1.5 rounded text-[var(--brand-amber)] bg-[rgba(245,158,11,0.05)] border border-[rgba(245,158,11,0.2)] shadow-[inset_0_0_10px_rgba(245,158,11,0.05)]",
                                                children: currentTime
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.js",
                                                lineNumber: 197,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/page.js",
                                        lineNumber: 192,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "h-6 w-px bg-[var(--border-medium)]"
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.js",
                                        lineNumber: 202,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "hidden lg:flex items-center gap-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(StatChip, {
                                                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$octagon$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertOctagon$3e$__["AlertOctagon"],
                                                value: highCount,
                                                color: "var(--brand-red)"
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.js",
                                                lineNumber: 206,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(StatChip, {
                                                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bell$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Bell$3e$__["Bell"],
                                                value: escalateCount,
                                                color: "var(--brand-amber)"
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.js",
                                                lineNumber: 207,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(StatChip, {
                                                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"],
                                                value: reviewedCount,
                                                color: "var(--brand-green)"
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.js",
                                                lineNumber: 208,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/page.js",
                                        lineNumber: 205,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex gap-2 ml-2",
                                        children: [
                                            !agentDone && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: startInvestigation,
                                                disabled: agentRunning,
                                                className: "btn-primary",
                                                children: agentRunning ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "animate-spin-slow",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$cpu$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Cpu$3e$__["Cpu"], {
                                                                size: 14
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/page.js",
                                                                lineNumber: 220,
                                                                columnNumber: 59
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/page.js",
                                                            lineNumber: 220,
                                                            columnNumber: 23
                                                        }, this),
                                                        " Analyzing..."
                                                    ]
                                                }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$cpu$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Cpu$3e$__["Cpu"], {
                                                            size: 14
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/page.js",
                                                            lineNumber: 222,
                                                            columnNumber: 23
                                                        }, this),
                                                        " Run Investigation"
                                                    ]
                                                }, void 0, true)
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.js",
                                                lineNumber: 214,
                                                columnNumber: 17
                                            }, this),
                                            agentDone && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 bg-[rgba(16,185,129,0.15)] text-emerald-400 border border-emerald-500/30",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"], {
                                                        size: 14
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/page.js",
                                                        lineNumber: 228,
                                                        columnNumber: 19
                                                    }, this),
                                                    " Analysis Complete"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/page.js",
                                                lineNumber: 227,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/page.js",
                                        lineNumber: 212,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/page.js",
                                lineNumber: 190,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/page.js",
                        lineNumber: 178,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                        initial: {
                            y: -20,
                            opacity: 0
                        },
                        animate: {
                            y: 0,
                            opacity: 1
                        },
                        className: "bg-gradient-to-r from-[rgba(245,158,11,0.15)] to-[rgba(245,158,11,0.02)] border-b border-[rgba(245,158,11,0.2)] px-6 py-3 flex items-center gap-4 shrink-0",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-7 h-7 rounded-full bg-[rgba(245,158,11,0.2)] text-[var(--brand-amber)] flex items-center justify-center font-bold text-xs ring-1 ring-[var(--brand-amber)] shadow-[0_0_10px_rgba(245,158,11,0.2)]",
                                children: "R"
                            }, void 0, false, {
                                fileName: "[project]/app/page.js",
                                lineNumber: 241,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-sm",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-semibold text-[var(--brand-amber)]",
                                        children: "Raghav"
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.js",
                                        lineNumber: 245,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[var(--text-muted)] mx-2",
                                        children: [
                                            "left a handover note at ",
                                            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$siteData$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SUPERVISOR_NOTE"].time,
                                            ":"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/page.js",
                                        lineNumber: 246,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[var(--text-secondary)] italic",
                                        children: [
                                            '"',
                                            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$siteData$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SUPERVISOR_NOTE"].text,
                                            '"'
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/page.js",
                                        lineNumber: 247,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/page.js",
                                lineNumber: 244,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/page.js",
                        lineNumber: 236,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 overflow-y-auto p-6 scroll-smooth",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                            mode: "wait",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                initial: {
                                    opacity: 0,
                                    y: 10
                                },
                                animate: {
                                    opacity: 1,
                                    y: 0
                                },
                                exit: {
                                    opacity: 0,
                                    y: -10
                                },
                                transition: {
                                    duration: 0.3
                                },
                                className: "h-full max-w-screen-2xl mx-auto",
                                children: [
                                    activeTab === "overview" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid grid-cols-1 xl:grid-cols-3 gap-6 h-full",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "xl:col-span-2 flex flex-col gap-6",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(AgentPanel, {
                                                        steps: agentSteps,
                                                        running: agentRunning,
                                                        done: agentDone,
                                                        onStart: startInvestigation
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/page.js",
                                                        lineNumber: 266,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(EventTimeline, {
                                                        events: events,
                                                        selectedEvent: selectedEvent,
                                                        onSelectEvent: setSelectedEvent,
                                                        onVerdict: handleUserVerdict,
                                                        onFocusMap: (e)=>{
                                                            setMapFocusEvent(e);
                                                            setActiveTab("map");
                                                        },
                                                        agentDone: agentDone
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/page.js",
                                                        lineNumber: 272,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/page.js",
                                                lineNumber: 265,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex flex-col gap-6",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SummaryCard, {
                                                        events: events,
                                                        agentDone: agentDone
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/page.js",
                                                        lineNumber: 282,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                                                        mode: "wait",
                                                        children: selectedEvent ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(EventDetailCard, {
                                                            event: events.find((e)=>e.id === selectedEvent) || events[0],
                                                            onVerdict: handleUserVerdict,
                                                            onFocusMap: (e)=>{
                                                                setMapFocusEvent(e);
                                                                setActiveTab("map");
                                                            }
                                                        }, "detail", false, {
                                                            fileName: "[project]/app/page.js",
                                                            lineNumber: 285,
                                                            columnNumber: 25
                                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                                            initial: {
                                                                opacity: 0
                                                            },
                                                            animate: {
                                                                opacity: 1
                                                            },
                                                            exit: {
                                                                opacity: 0
                                                            },
                                                            className: "glass-panel rounded-2xl flex flex-col items-center justify-center py-16 text-center h-full",
                                                            style: {
                                                                color: "var(--text-muted)"
                                                            },
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "w-16 h-16 rounded-full bg-[rgba(255,255,255,0.02)] flex items-center justify-center mb-4",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__["Eye"], {
                                                                        size: 24,
                                                                        className: "opacity-50"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/page.js",
                                                                        lineNumber: 298,
                                                                        columnNumber: 29
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/page.js",
                                                                    lineNumber: 297,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-sm font-medium text-[var(--text-secondary)]",
                                                                    children: "No Event Selected"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/page.js",
                                                                    lineNumber: 300,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-xs mt-2 max-w-[200px]",
                                                                    children: "Select an event timeline item to inspect AI analysis, evidence, and apply your verdict."
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/page.js",
                                                                    lineNumber: 301,
                                                                    columnNumber: 27
                                                                }, this)
                                                            ]
                                                        }, "empty", true, {
                                                            fileName: "[project]/app/page.js",
                                                            lineNumber: 292,
                                                            columnNumber: 25
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/page.js",
                                                        lineNumber: 283,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/page.js",
                                                lineNumber: 281,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/page.js",
                                        lineNumber: 264,
                                        columnNumber: 17
                                    }, this),
                                    activeTab === "incidents" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(IncidentBoard, {
                                        incidents: incidents,
                                        agentDone: agentDone,
                                        selectedIncidentId: selectedIncidentId,
                                        onSelectIncident: setSelectedIncidentId,
                                        onFocusMap: (incident)=>{
                                            setSelectedEvent(incident.leadEventId);
                                            setActiveTab("map");
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.js",
                                        lineNumber: 311,
                                        columnNumber: 17
                                    }, this),
                                    activeTab === "map" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "glass-panel rounded-2xl overflow-hidden h-full relative shadow-[0_10px_40px_rgba(0,0,0,0.5)]",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SiteMap, {
                                            events: events,
                                            focusEvent: mapFocusEvent,
                                            onSelectEvent: (id)=>{
                                                setSelectedEvent(id);
                                                setActiveTab("overview");
                                            },
                                            agentDone: agentDone
                                        }, void 0, false, {
                                            fileName: "[project]/app/page.js",
                                            lineNumber: 323,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.js",
                                        lineNumber: 322,
                                        columnNumber: 17
                                    }, this),
                                    activeTab === "drone" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(DroneSimulator, {
                                        events: events,
                                        agentDone: agentDone,
                                        incidents: incidents
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.js",
                                        lineNumber: 334,
                                        columnNumber: 17
                                    }, this),
                                    activeTab === "briefing" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(BriefingPanel, {
                                        events: events,
                                        agentDone: agentDone,
                                        approved: briefingApproved,
                                        onApprove: ()=>setBriefingApproved(true),
                                        onVerdict: handleUserVerdict
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.js",
                                        lineNumber: 339,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, activeTab, true, {
                                fileName: "[project]/app/page.js",
                                lineNumber: 254,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/page.js",
                            lineNumber: 253,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/page.js",
                        lineNumber: 252,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/page.js",
                lineNumber: 175,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/page.js",
        lineNumber: 101,
        columnNumber: 5
    }, this);
}
function StatChip({ icon: Icon, value, color }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center gap-2 px-3 py-1.5 rounded-lg border bg-[rgba(15,23,42,0.6)]",
        style: {
            borderColor: `color-mix(in srgb, ${color} 30%, transparent)`
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                size: 14,
                style: {
                    color
                }
            }, void 0, false, {
                fileName: "[project]/app/page.js",
                lineNumber: 360,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-sm font-bold",
                style: {
                    color
                },
                children: value
            }, void 0, false, {
                fileName: "[project]/app/page.js",
                lineNumber: 361,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/page.js",
        lineNumber: 358,
        columnNumber: 5
    }, this);
}
// Remaining components (SummaryCard, VerdictRow, EventDetailCard, SeverityBadge) 
// extracted here and visually upgraded
function SummaryCard({ events, agentDone }) {
    const verdicts = agentDone ? {
        escalate: events.filter((e)=>e.aiAssessment?.verdict === "escalate").length,
        harmless: events.filter((e)=>e.aiAssessment?.verdict === "likely_harmless").length,
        routine: events.filter((e)=>e.aiAssessment?.verdict === "routine").length,
        pending: events.filter((e)=>!e.aiAssessment).length
    } : null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "glass-panel p-5 rounded-2xl",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between mb-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-sm font-bold uppercase tracking-wider text-[var(--text-secondary)]",
                        children: "Night Summary"
                    }, void 0, false, {
                        fileName: "[project]/app/page.js",
                        lineNumber: 380,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "badge badge-medium",
                        children: [
                            events.length,
                            " Events"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/page.js",
                        lineNumber: 381,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/page.js",
                lineNumber: 379,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-2 gap-3 mb-5",
                children: [
                    {
                        type: "fence_alert",
                        label: "Fence",
                        color: "var(--brand-amber)",
                        Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Shield$3e$__["Shield"]
                    },
                    {
                        type: "vehicle_movement",
                        label: "Vehicle",
                        color: "var(--brand-red)",
                        Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"]
                    },
                    {
                        type: "badge_failure",
                        label: "Badges",
                        color: "var(--brand-red)",
                        Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__["Lock"]
                    },
                    {
                        type: "drone_patrol",
                        label: "Drone",
                        color: "var(--brand-blue)",
                        Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Navigation$3e$__["Navigation"]
                    }
                ].map(({ type, label, color, Icon })=>{
                    const count = events.filter((e)=>e.type === type).length;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-xl p-3 flex flex-col gap-1 border border-[var(--border-subtle)] bg-[rgba(255,255,255,0.02)] hover:bg-[rgba(255,255,255,0.04)] transition-colors",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-between items-start",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                        size: 16,
                                        style: {
                                            color
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.js",
                                        lineNumber: 396,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-xl font-bold font-mono",
                                        style: {
                                            color
                                        },
                                        children: count
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.js",
                                        lineNumber: 397,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/page.js",
                                lineNumber: 395,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-xs font-medium text-[var(--text-muted)] uppercase mt-1",
                                children: label
                            }, void 0, false, {
                                fileName: "[project]/app/page.js",
                                lineNumber: 399,
                                columnNumber: 15
                            }, this)
                        ]
                    }, type, true, {
                        fileName: "[project]/app/page.js",
                        lineNumber: 394,
                        columnNumber: 13
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/app/page.js",
                lineNumber: 385,
                columnNumber: 7
            }, this),
            agentDone && verdicts && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "pt-4 border-t border-[var(--border-subtle)]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-xs font-bold uppercase tracking-wider mb-3 text-[var(--text-secondary)]",
                        children: "AI Assessment"
                    }, void 0, false, {
                        fileName: "[project]/app/page.js",
                        lineNumber: 407,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(VerdictRow, {
                                label: "Escalate",
                                count: verdicts.escalate,
                                bg: "rgba(239,68,68,0.15)",
                                color: "var(--brand-red)"
                            }, void 0, false, {
                                fileName: "[project]/app/page.js",
                                lineNumber: 409,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(VerdictRow, {
                                label: "Likely Harmless",
                                count: verdicts.harmless,
                                bg: "rgba(16,185,129,0.15)",
                                color: "var(--brand-green)"
                            }, void 0, false, {
                                fileName: "[project]/app/page.js",
                                lineNumber: 410,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(VerdictRow, {
                                label: "Routine",
                                count: verdicts.routine,
                                bg: "rgba(139,92,246,0.15)",
                                color: "var(--brand-purple)"
                            }, void 0, false, {
                                fileName: "[project]/app/page.js",
                                lineNumber: 411,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/page.js",
                        lineNumber: 408,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/page.js",
                lineNumber: 406,
                columnNumber: 9
            }, this),
            !agentDone && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "pt-4 border-t border-[var(--border-subtle)] text-center",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-xs text-[var(--text-muted)] italic py-2",
                    children: "AI assessment pending investigation."
                }, void 0, false, {
                    fileName: "[project]/app/page.js",
                    lineNumber: 418,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/page.js",
                lineNumber: 417,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/page.js",
        lineNumber: 378,
        columnNumber: 5
    }, this);
}
function VerdictRow({ label, count, color, bg }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center justify-between p-2 rounded-lg",
        style: {
            background: bg
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-xs font-semibold",
                style: {
                    color
                },
                children: label
            }, void 0, false, {
                fileName: "[project]/app/page.js",
                lineNumber: 430,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-sm font-bold font-mono",
                style: {
                    color
                },
                children: count
            }, void 0, false, {
                fileName: "[project]/app/page.js",
                lineNumber: 431,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/page.js",
        lineNumber: 429,
        columnNumber: 5
    }, this);
}
function EventDetailCard({ event, onVerdict, onFocusMap }) {
    const assessment = event.aiAssessment;
    const verdictColor = {
        escalate: "var(--brand-red)",
        likely_harmless: "var(--brand-green)",
        routine: "var(--brand-purple)"
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
        initial: {
            opacity: 0,
            scale: 0.95
        },
        animate: {
            opacity: 1,
            scale: 1
        },
        exit: {
            opacity: 0,
            scale: 0.95
        },
        className: "glass-panel p-5 rounded-2xl flex flex-col h-full",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-start justify-between mb-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2 mb-1.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs font-mono px-2 py-0.5 rounded bg-[rgba(255,255,255,0.05)] text-[var(--text-muted)]",
                                        children: event.time
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.js",
                                        lineNumber: 454,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs text-[var(--text-muted)] px-2 py-0.5",
                                        children: event.location
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.js",
                                        lineNumber: 455,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/page.js",
                                lineNumber: 453,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-base font-bold text-[var(--text-primary)]",
                                children: event.title
                            }, void 0, false, {
                                fileName: "[project]/app/page.js",
                                lineNumber: 457,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/page.js",
                        lineNumber: 452,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SeverityBadge, {
                        severity: event.severity
                    }, void 0, false, {
                        fileName: "[project]/app/page.js",
                        lineNumber: 459,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/page.js",
                lineNumber: 451,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-[rgba(0,0,0,0.3)] rounded-lg p-3 mb-4 border border-[var(--border-subtle)]",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-sm leading-relaxed text-[var(--text-secondary)]",
                    children: event.description
                }, void 0, false, {
                    fileName: "[project]/app/page.js",
                    lineNumber: 463,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/page.js",
                lineNumber: 462,
                columnNumber: 7
            }, this),
            assessment ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "rounded-xl p-4 mb-4 mt-auto border",
                style: {
                    background: `linear-gradient(to right, rgba(0,0,0,0.4), color-mix(in srgb, ${verdictColor[assessment.verdict]} 5%, transparent))`,
                    borderColor: `color-mix(in srgb, ${verdictColor[assessment.verdict]} 30%, transparent)`
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between mb-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-6 h-6 rounded-full bg-[var(--brand-amber)]/20 flex items-center justify-center",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$cpu$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Cpu$3e$__["Cpu"], {
                                            size: 12,
                                            style: {
                                                color: "var(--brand-amber)"
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/app/page.js",
                                            lineNumber: 476,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.js",
                                        lineNumber: 475,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs font-bold uppercase tracking-wider text-[var(--brand-amber)]",
                                        children: "AI Verdict"
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.js",
                                        lineNumber: 478,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/page.js",
                                lineNumber: 474,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: `badge uppercase verdict-${assessment.verdict}`,
                                children: assessment.verdict.replace("_", " ")
                            }, void 0, false, {
                                fileName: "[project]/app/page.js",
                                lineNumber: 480,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/page.js",
                        lineNumber: 473,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-3 mb-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs font-medium text-[var(--text-muted)]",
                                children: "Confidence"
                            }, void 0, false, {
                                fileName: "[project]/app/page.js",
                                lineNumber: 486,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-1 h-1.5 rounded-full bg-[rgba(255,255,255,0.05)] overflow-hidden",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                    initial: {
                                        width: 0
                                    },
                                    animate: {
                                        width: `${assessment.confidence * 100}%`
                                    },
                                    transition: {
                                        duration: 1,
                                        ease: "easeOut"
                                    },
                                    className: "h-full shadow-[0_0_10px_currentColor]",
                                    style: {
                                        background: verdictColor[assessment.verdict],
                                        color: verdictColor[assessment.verdict]
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/app/page.js",
                                    lineNumber: 488,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/page.js",
                                lineNumber: 487,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs font-mono font-bold",
                                style: {
                                    color: verdictColor[assessment.verdict]
                                },
                                children: [
                                    Math.round(assessment.confidence * 100),
                                    "%"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/page.js",
                                lineNumber: 496,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/page.js",
                        lineNumber: 485,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm leading-relaxed text-[var(--text-secondary)] mb-3",
                        children: assessment.summary
                    }, void 0, false, {
                        fileName: "[project]/app/page.js",
                        lineNumber: 501,
                        columnNumber: 11
                    }, this),
                    assessment.uncertainties.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-[rgba(0,0,0,0.2)] rounded-lg p-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-[10px] font-bold uppercase text-[var(--brand-amber)] mb-2 flex items-center gap-1.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$question$2d$mark$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__HelpCircle$3e$__["HelpCircle"], {
                                        size: 10
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.js",
                                        lineNumber: 506,
                                        columnNumber: 17
                                    }, this),
                                    " AI Uncertainties"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/page.js",
                                lineNumber: 505,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                className: "space-y-1.5 pl-4",
                                children: assessment.uncertainties.map((u, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        className: "text-xs text-[var(--text-muted)] list-disc",
                                        children: u
                                    }, i, false, {
                                        fileName: "[project]/app/page.js",
                                        lineNumber: 510,
                                        columnNumber: 19
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/app/page.js",
                                lineNumber: 508,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/page.js",
                        lineNumber: 504,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/page.js",
                lineNumber: 467,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-auto mb-4 p-4 border border-[var(--border-subtle)] border-dashed rounded-xl flex flex-col items-center justify-center opacity-60",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$cpu$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Cpu$3e$__["Cpu"], {
                        size: 20,
                        className: "mb-2 text-[var(--text-muted)]"
                    }, void 0, false, {
                        fileName: "[project]/app/page.js",
                        lineNumber: 520,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs text-[var(--text-muted)]",
                        children: "Awaiting AI Assessment"
                    }, void 0, false, {
                        fileName: "[project]/app/page.js",
                        lineNumber: 521,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/page.js",
                lineNumber: 519,
                columnNumber: 10
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>onVerdict(event.id, "approved"),
                        className: "flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all relative overflow-hidden group",
                        style: {
                            background: event.userVerdict === "approved" ? "rgba(16,185,129,0.15)" : "rgba(255,255,255,0.03)",
                            border: `1px solid ${event.userVerdict === "approved" ? "rgba(16,185,129,0.4)" : "var(--border-medium)"}`,
                            color: event.userVerdict === "approved" ? "var(--brand-green)" : "var(--text-secondary)"
                        },
                        children: [
                            event.userVerdict === "approved" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute inset-0 bg-gradient-to-t from-[rgba(16,185,129,0.1)] to-transparent"
                            }, void 0, false, {
                                fileName: "[project]/app/page.js",
                                lineNumber: 534,
                                columnNumber: 48
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"], {
                                size: 16
                            }, void 0, false, {
                                fileName: "[project]/app/page.js",
                                lineNumber: 535,
                                columnNumber: 11
                            }, this),
                            " Approve"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/page.js",
                        lineNumber: 527,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>onVerdict(event.id, "challenged"),
                        className: "flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all relative overflow-hidden group",
                        style: {
                            background: event.userVerdict === "challenged" ? "rgba(239,68,68,0.15)" : "rgba(255,255,255,0.03)",
                            border: `1px solid ${event.userVerdict === "challenged" ? "rgba(239,68,68,0.4)" : "var(--border-medium)"}`,
                            color: event.userVerdict === "challenged" ? "var(--brand-red)" : "var(--text-secondary)"
                        },
                        children: [
                            event.userVerdict === "challenged" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute inset-0 bg-gradient-to-t from-[rgba(239,68,68,0.1)] to-transparent"
                            }, void 0, false, {
                                fileName: "[project]/app/page.js",
                                lineNumber: 544,
                                columnNumber: 51
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__["XCircle"], {
                                size: 16
                            }, void 0, false, {
                                fileName: "[project]/app/page.js",
                                lineNumber: 545,
                                columnNumber: 11
                            }, this),
                            " Challenge"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/page.js",
                        lineNumber: 537,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>onFocusMap(event),
                        className: "py-3 px-4 rounded-xl text-sm transition-all bg-[rgba(255,255,255,0.03)] border border-[var(--border-medium)] hover:bg-[rgba(255,255,255,0.08)] hover:text-white text-[var(--text-muted)]",
                        title: "Locate on Map",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Map$3e$__["Map"], {
                            size: 16
                        }, void 0, false, {
                            fileName: "[project]/app/page.js",
                            lineNumber: 550,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/page.js",
                        lineNumber: 547,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/page.js",
                lineNumber: 526,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/page.js",
        lineNumber: 445,
        columnNumber: 5
    }, this);
}
function SeverityBadge({ severity }) {
    const labels = {
        high: "HIGH",
        medium: "MED",
        low: "LOW",
        info: "INFO"
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: `badge badge-${severity} shadow-sm shrink-0`,
        children: labels[severity]
    }, void 0, false, {
        fileName: "[project]/app/page.js",
        lineNumber: 560,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=_031wj~0._.js.map