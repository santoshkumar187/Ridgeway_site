// Ridgeway Site - Seeded overnight event data
// Simulated night: 10:00 PM → 6:10 AM

export const SITE_CONFIG = {
  name: "Bengaluru Industrial Site",
  center: [12.9716, 77.5946],
  zoom: 16,
  briefingTime: "08:00 AM",
  reviewerName: "Maya Singh",
  nightSupervisor: "Raghav",
  siteHead: "Nisha",
};

export const ZONES = [
  { id: "zone-a", name: "Zone A – Main Entry", color: "#3b82f6", coords: [12.9726, 77.5896], radius: 80 },
  { id: "zone-b", name: "Zone B – Active Work Area", color: "#f59e0b", coords: [12.9716, 77.5976], radius: 100 },
  { id: "zone-c", name: "Zone C – Storage Yard", color: "#ef4444", coords: [12.9696, 77.5936], isRestricted: true, radius: 120 },
  { id: "zone-d", name: "Zone D – Control Room", color: "#10b981", coords: [12.9736, 77.5916], radius: 60 },
  { id: "zone-e", name: "Zone E – North Perimeter", color: "#8b5cf6", coords: [12.9756, 77.5956], radius: 90 },
];

export const GATES = [
  { id: "gate-1", name: "Gate 1 – Main", coords: [12.9726, 77.5886], status: "normal" },
  { id: "gate-2", name: "Gate 2 – East", coords: [12.9716, 77.6006], status: "normal" },
  { id: "gate-3", name: "Gate 3 – North", coords: [12.9766, 77.5956], status: "alert" },
  { id: "gate-4", name: "Gate 4 – West", coords: [12.9696, 77.5886], status: "normal" },
];

export const SITE_LAYOUT = {
  canvas: { width: 1200, height: 760 },
  perimeter: { x: 80, y: 70, width: 1040, height: 620 },
  roads: [
    { id: "road-main", x1: 160, y1: 210, x2: 1060, y2: 210, label: "Main access road" },
    { id: "road-service", x1: 360, y1: 320, x2: 950, y2: 580, label: "Service road" },
    { id: "road-perimeter", x1: 880, y1: 140, x2: 1000, y2: 600, label: "North perimeter loop" },
  ],
  zones: [
    { id: "zone-a", x: 120, y: 140, width: 220, height: 150, label: "Main entry" },
    { id: "zone-d", x: 380, y: 120, width: 220, height: 135, label: "Control room" },
    { id: "zone-b", x: 660, y: 150, width: 280, height: 190, label: "Active work area" },
    { id: "zone-c", x: 430, y: 380, width: 330, height: 210, label: "Restricted storage yard", restricted: true },
    { id: "zone-e", x: 830, y: 90, width: 220, height: 150, label: "North perimeter" },
  ],
  facilities: [
    { id: "block-c", x: 510, y: 430, width: 110, height: 76, label: "Block C shed" },
    { id: "launch-pad", x: 865, y: 525, width: 110, height: 70, label: "Drone launch pad" },
    { id: "yard", x: 650, y: 420, width: 160, height: 120, label: "Storage stacks" },
  ],
  gates: [
    { id: "gate-1", x: 120, y: 185, label: "Gate 1" },
    { id: "gate-2", x: 1070, y: 300, label: "Gate 2" },
    { id: "gate-3", x: 960, y: 82, label: "Gate 3" },
    { id: "gate-4", x: 90, y: 530, label: "Gate 4" },
  ],
};

export const OVERNIGHT_EVENTS = [
  {
    id: "evt-001",
    type: "fence_alert",
    severity: "medium",
    time: "22:34",
    location: "Gate 3 – North Perimeter",
    coords: [12.9766, 77.5956],
    zone: "zone-e",
    title: "Perimeter Fence Alert",
    description: "Motion sensor triggered on north perimeter fence near Gate 3. Duration: 4.2 seconds. No visual confirmation available.",
    rawData: { sensorId: "FENCE-N-07", triggerDuration: 4.2, windSpeed: "18 km/h", temperature: "8°C" },
    tags: ["perimeter", "gate-3", "sensor"],
    status: "unreviewed",
    aiAssessment: null,
  },
  {
    id: "evt-002",
    type: "vehicle_movement",
    severity: "high",
    time: "01:17",
    location: "Storage Yard Entry – Zone C",
    coords: [12.9696, 77.5936],
    zone: "zone-c",
    title: "Unauthorized Vehicle Path",
    description: "Vehicle detected moving along service road adjacent to restricted Zone C storage yard. Did not enter zone. Plate not captured.",
    rawData: { vehicleType: "Light van (estimated)", speed: "12 km/h", direction: "North→South", plateCapture: false },
    tags: ["vehicle", "zone-c", "restricted", "after-hours"],
    status: "unreviewed",
    aiAssessment: null,
  },
  {
    id: "evt-003",
    type: "badge_failure",
    severity: "medium",
    time: "02:45",
    location: "Access Point – Building D West",
    coords: [12.9736, 77.5916],
    zone: "zone-d",
    title: "Three Failed Badge Swipes",
    description: "Three consecutive badge swipe failures at Building D West access point. Attempts at 02:45, 02:46, 02:47. Badge ID: TEMP-2941 (temporary contractor badge).",
    rawData: { badgeId: "TEMP-2941", badgeHolder: "Contractor (unassigned)", attempts: 3, lockoutTriggered: false, nearestCamera: "CAM-D-04 (offline)" },
    tags: ["access-control", "badge", "contractor", "building-d"],
    status: "unreviewed",
    aiAssessment: null,
  },
  {
    id: "evt-004",
    type: "drone_patrol",
    severity: "info",
    time: "03:30",
    location: "North Loop – Gate 3 / Zone C",
    coords: [12.9736, 77.5946],
    zone: "zone-e",
    title: "Drone Patrol – Night Loop Alpha",
    description: "Scheduled patrol Drone SD-7 completed North Loop. Covered Gate 3 perimeter and Zone C adjacency. No anomalies flagged by drone sensors.",
    rawData: { droneId: "SD-7", patrolRoute: "Night Loop Alpha", duration: "22 min", altitude: "35m", sensorsActive: ["thermal", "motion"] },
    tags: ["drone", "patrol", "gate-3", "zone-c"],
    status: "completed",
    aiAssessment: null,
  },
  {
    id: "evt-005",
    type: "signal_anomaly",
    severity: "low",
    time: "04:10",
    location: "Block C – Equipment Shed",
    coords: [12.9686, 77.5976],
    zone: "zone-c",
    title: "Power Fluctuation – Block C",
    description: "Temporary power dip recorded in Block C equipment shed. Duration: 11 seconds. Backup systems engaged normally. Maintenance flag raised.",
    rawData: { duration: "11 seconds", voltageDropPercent: 23, backupEngaged: true, equipmentAffected: ["shed-lights", "sensor-array-C2"] },
    tags: ["power", "block-c", "maintenance"],
    status: "unreviewed",
    aiAssessment: null,
  },
  {
    id: "evt-006",
    type: "signal_anomaly",
    severity: "low",
    time: "05:02",
    location: "Gate 2 – East Access",
    coords: [12.9716, 77.6006],
    zone: "zone-b",
    title: "CCTV Feed Interruption – Gate 2",
    description: "CCTV camera CAM-E-02 at Gate 2 went offline for 3 minutes 40 seconds. Auto-restart succeeded. Cause: firmware health check cycle (scheduled).",
    rawData: { cameraId: "CAM-E-02", offlineDuration: "3m 40s", causeClassified: "Scheduled firmware cycle", recoveredAuto: true },
    tags: ["cctv", "gate-2", "maintenance"],
    status: "unreviewed",
    aiAssessment: null,
  },
];

export const DRONE_ROUTES = {
  "night-loop-alpha": {
    id: "night-loop-alpha",
    name: "Night Loop Alpha",
    droneId: "SD-7",
    startTime: "03:30",
    endTime: "03:52",
    waypoints: [
      { coords: [12.9736, 77.5946], label: "Base – Launch Pad", time: "03:30" },
      { coords: [12.9756, 77.5936], label: "En route North", time: "03:33" },
      { coords: [12.9766, 77.5956], label: "Gate 3 Perimeter Check", time: "03:36" },
      { coords: [12.9756, 77.5976], label: "North Fence Line", time: "03:40" },
      { coords: [12.9716, 77.5976], label: "Zone C Adjacency Pass", time: "03:45" },
      { coords: [12.9696, 77.5946], label: "Storage Yard Perimeter", time: "03:48" },
      { coords: [12.9736, 77.5946], label: "Return to Base", time: "03:52" },
    ],
    observations: [
      { waypoint: 2, text: "Gate 3 fence visually intact. No persons detected." },
      { waypoint: 4, text: "Zone C perimeter clear. No vehicle visible at time of pass." },
      { waypoint: 5, text: "Storage yard exterior: no unusual activity." },
    ],
    status: "completed",
  },
};

export const SUPERVISOR_NOTE = {
  author: "Raghav",
  time: "05:55",
  text: "Please check Block C before leadership asks. Had a weird power dip around 4 AM and the sensor on C2 was flaky. Could be nothing but Nisha will ask. Also the fence thing at Gate 3 – wind was strong last night, probably fine but worth flagging if the drone saw anything near there earlier.",
};

export const MORNING_BRIEFING_TEMPLATE = {
  sections: [
    { key: "summary", title: "What happened last night?" },
    { key: "harmless", title: "What was harmless?" },
    { key: "escalation", title: "What deserves escalation?" },
    { key: "drone", title: "What did the drone check?" },
    { key: "followup", title: "What still needs follow-up?" },
    { key: "actions", title: "Recommended Actions" },
  ],
};
