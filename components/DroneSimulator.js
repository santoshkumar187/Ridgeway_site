"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navigation, Play, Pause, RotateCcw, CheckCircle, AlertTriangle, Wind, Scan, Radar, ShieldAlert, Target, Camera } from "lucide-react";
import { DRONE_ROUTES, OVERNIGHT_EVENTS, ZONES } from "../lib/siteData";
import { getFollowUpMission } from "../lib/intelligence";

const droneRoute = Object.values(DRONE_ROUTES)[0];

export default function DroneSimulator({ events, agentDone, incidents = [] }) {
  const [playing, setPlaying] = useState(false);
  const [currentWaypoint, setCurrentWaypoint] = useState(0);
  const [completed, setCompleted] = useState(false);
  const intervalRef = useRef(null);
  
  const [activeRoute, setActiveRoute] = useState(droneRoute);
  const [isPlanningMode, setIsPlanningMode] = useState(false);
  const [tempWaypoints, setTempWaypoints] = useState([]);
  const [manualLat, setManualLat] = useState("");
  const [manualLng, setManualLng] = useState("");
  const [threatProfile, setThreatProfile] = useState(null);
  const svgRef = useRef(null);

  const waypoints = isPlanningMode ? tempWaypoints : activeRoute.waypoints;

  const reset = () => {
    setPlaying(false);
    setCurrentWaypoint(0);
    setCompleted(false);
    clearInterval(intervalRef.current);
  };

  useEffect(() => {
    if (playing && !completed) {
      intervalRef.current = setInterval(() => {
        setCurrentWaypoint(prev => {
          if (prev >= waypoints.length - 1) {
            setPlaying(false);
            setCompleted(true);
            clearInterval(intervalRef.current);
            return prev;
          }
          return prev + 1;
        });
      }, 1500); // slightly faster for better demo
    }
    return () => clearInterval(intervalRef.current);
  }, [playing, completed, waypoints.length]);

  const currentObs = isPlanningMode ? [] : (activeRoute.observations ? activeRoute.observations.filter(o => o.waypoint <= currentWaypoint) : []);
  const followUpMission = getFollowUpMission(incidents);

  const handleMapClick = (e) => {
    if (!isPlanningMode || !svgRef.current) return;
    const svg = svgRef.current;
    const pt = svg.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    const cursorPt = pt.matrixTransform(svg.getScreenCTM().inverse());
    
    const lng = unnormalize(cursorPt.x, -0.098, -0.083, 50, 750);
    const lat = unnormalize(cursorPt.y, 51.502, 51.512, 350, 50);
    
    const now = new Date();
    setTempWaypoints(prev => [
      ...prev,
      {
        coords: [lat, lng],
        label: `Manual WP-${prev.length + 1}`,
        time: now.toLocaleTimeString("en-GB", { hour:"2-digit", minute:"2-digit" })
      }
    ]);
  };

  const handleAddManualCoords = () => {
    if (!manualLat || !manualLng) return;
    const lat = parseFloat(manualLat);
    const lng = parseFloat(manualLng);
    if (isNaN(lat) || isNaN(lng)) return;
    setTempWaypoints(prev => [...prev, { 
      coords: [lat, lng], 
      label: `Input WP-${prev.length + 1}`, 
      time: new Date().toLocaleTimeString("en-GB", { hour:"2-digit", minute:"2-digit" }) 
    }]);
    setManualLat("");
    setManualLng("");
  };

  const analyzeThreat = () => {
    if (tempWaypoints.length === 0) return;
    const lastPoint = tempWaypoints[tempWaypoints.length - 1];
    const [lat, lng] = lastPoint.coords;

    const dist = (c1, c2) => Math.sqrt(Math.pow(c1[0]-c2[0], 2) + Math.pow(c1[1]-c2[1], 2));
    
    let activeZone = null;
    let minDistance = Infinity;

    ZONES.forEach(z => {
      const d = dist(z.coords, [lat, lng]);
      if (d < minDistance) {
        minDistance = d;
        activeZone = z;
      }
    });

    const isRestricted = activeZone && activeZone.isRestricted && minDistance < 0.003;
    const nearbyCamId = `CAM-${activeZone ? activeZone.id.split('-')[1].toUpperCase() : 'EXT'}-0${Math.floor(Math.random()*4)+1}`;
    
    setThreatProfile({
      lat: lat.toFixed(5),
      lng: lng.toFixed(5),
      wind: "18 km/h (Gusts to 24)",
      camera: nearbyCamId,
      zone: activeZone ? activeZone.name : "Unzoned Perimeter",
      threat: isRestricted 
        ? "CRITICAL: Coordinates intersect Restricted Storage Yard. High probability of unauthorized asset access."
        : "LOW: Sector is nominal. Correlate with standard overnight traffic.",
      isRestricted
    });
  };

  let droneX = 0, droneY = 0;
  if (!isPlanningMode && waypoints[currentWaypoint]) {
    droneX = normalize(waypoints[currentWaypoint].coords[1], -0.098, -0.083, 50, 750);
    droneY = normalize(waypoints[currentWaypoint].coords[0], 51.502, 51.512, 350, 50);
  }

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 h-full">
      {/* Left panel: Route visualization */}
      <div className="xl:col-span-2 flex flex-col h-full">
        <div className="glass-panel p-6 rounded-2xl flex-1 flex flex-col">
          {/* Header & Controls */}
          <div className="flex items-center gap-4 mb-6 shrink-0">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br from-[rgba(59,130,246,0.2)] to-[rgba(59,130,246,0.05)] border border-[rgba(59,130,246,0.3)] shadow-[0_0_15px_rgba(59,130,246,0.15)] relative">
               <Navigation size={22} className={playing ? "animate-drone text-[var(--brand-blue)]" : "text-[var(--brand-blue)]"} />
               {playing && <span className="absolute top-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[var(--surface-1)]"></span>}
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-wide text-white uppercase flex items-center gap-2">
                UAS TELEMETRY: <span className="text-[var(--brand-blue)]">SD-7</span>
              </h2>
              <div className="text-xs font-mono mt-1 text-[var(--text-muted)] flex items-center gap-3">
                <span className="px-2 py-0.5 rounded bg-[rgba(255,255,255,0.05)] text-emerald-400 font-bold">{activeRoute.name || "Live Patrol"}</span>
                <span>{activeRoute.startTime || "--:--"} – {activeRoute.endTime || "--:--"}</span>
                <span>Altitude: 35m</span>
              </div>
            </div>
            
            {/* Playback Controls */}
            <div className="ml-auto flex items-center gap-1 md:gap-3 bg-[rgba(0,0,0,0.3)] border border-[var(--border-subtle)] rounded-xl lg:p-1.5 p-1 backdrop-blur overflow-x-auto">
              {isPlanningMode ? (
                 <>
                   <button onClick={() => setTempWaypoints([])}
                     className="px-2 md:px-3 h-8 md:h-10 rounded-lg text-xs font-semibold bg-[rgba(239,68,68,0.15)] text-[var(--brand-red)] hover:bg-[rgba(239,68,68,0.25)] transition-all">Clear</button>
                   <button onClick={() => {
                        if (tempWaypoints.length < 2) return;
                        setActiveRoute({
                          id: "manual-flight",
                          name: "Manual Mission",
                          droneId: "SD-7",
                          startTime: tempWaypoints[0].time,
                          endTime: tempWaypoints[tempWaypoints.length-1].time,
                          waypoints: tempWaypoints,
                          observations: tempWaypoints.map((_, i) => ({ waypoint: i, text: `Manual WP-${i+1} reached. Sensors nominal.`}))
                        });
                        setIsPlanningMode(false);
                        reset();
                        setPlaying(true);
                     }}
                     disabled={tempWaypoints.length < 2}
                     className="px-2 md:px-3 h-8 md:h-10 rounded-lg text-xs font-semibold bg-[rgba(16,185,129,0.15)] text-[var(--brand-green)] hover:bg-[rgba(16,185,129,0.25)] transition-all disabled:opacity-30">Deploy</button>
                   <button onClick={() => { setIsPlanningMode(false); setActiveRoute(droneRoute); setTempWaypoints([]); setThreatProfile(null); }}
                     className="px-2 md:px-3 h-8 md:h-10 rounded-lg text-xs font-semibold bg-[rgba(255,255,255,0.05)] text-[var(--text-muted)] hover:bg-[rgba(255,255,255,0.1)] transition-all">Cancel</button>
                 </>
              ) : (
                <>
                  <button onClick={() => { setIsPlanningMode(true); reset(); setTempWaypoints([]); setThreatProfile(null); }}
                     className="px-3 h-8 md:h-10 rounded-lg text-[10px] md:text-[11px] font-bold uppercase tracking-wider bg-[rgba(245,158,11,0.15)] border border-[rgba(245,158,11,0.3)] text-[var(--brand-amber)] hover:bg-[rgba(245,158,11,0.25)] transition-all flex items-center gap-1.5 shrink-0 whitespace-nowrap">
                     <span className="hidden md:inline">Plan</span> Route
                  </button>
                  <button onClick={() => { if (!completed) setPlaying(p => !p); }}
                    disabled={completed || waypoints.length === 0}
                    className="w-8 h-8 md:w-10 md:h-10 shrink-0 rounded-lg flex items-center justify-center transition-all bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(59,130,246,0.15)] text-white disabled:opacity-50"
                  >
                    {playing ? <Pause size={16} /> : <Play size={16} className="translate-x-0.5" />}
                  </button>
                  <button onClick={reset}
                    className="w-8 h-8 md:w-10 md:h-10 shrink-0 rounded-lg flex items-center justify-center transition-all hover:bg-[rgba(255,255,255,0.05)] text-[var(--text-muted)] hover:text-white"
                  >
                    <RotateCcw size={14} />
                  </button>
                </>
              )}
            </div>
          </div>

          {/* SVG Schematic Visualization - the core of the drone simulator */}
          <div className="relative flex-1 rounded-xl overflow-hidden bg-[#020617] border border-[var(--border-medium)] shadow-[inset_0_0_50px_rgba(0,0,0,0.8)] flex items-center justify-center min-h-[350px]">
            {/* Cyber Grid */}
            <div className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: "linear-gradient(rgba(59,130,246,1) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,1) 1px, transparent 1px)",
                backgroundSize: "30px 30px"
              }} 
            />

            {/* Scanning line if playing */}
            {playing && <div className="absolute left-0 right-0 h-1 bg-[var(--brand-blue)] blur-sm opacity-30 animate-[scanline_3s_linear_infinite]" />}

            {/* SVG Canvas - scaling via viewBox */}
            <svg ref={svgRef} onClick={handleMapClick} className={`w-full h-full max-w-4xl relative z-10 ${isPlanningMode ? 'cursor-crosshair' : ''}`} viewBox="0 0 800 400" preserveAspectRatio="xMidYMid meet">
              
              <defs>
                 <linearGradient id="dronePathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="rgba(59,130,246,0.2)" />
                    <stop offset="100%" stopColor="rgba(59,130,246,0.9)" />
                 </linearGradient>
                 <filter id="glow">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                    <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                </filter>
              </defs>

              {/* Topographic/Zone outlines (Abstracted) */}
              <g opacity="0.8">
                 <circle cx="200" cy="100" r="70" fill="none" stroke="rgba(59,130,246,0.2)" strokeWidth="1" strokeDasharray="4 4" />
                 <text x="200" y="35" textAnchor="middle" fill="rgba(59,130,246,0.4)" fontSize="10" fontFamily="monospace">SEC-Z/ALPHA</text>
                 
                 <circle cx="550" cy="150" r="80" fill="none" stroke="rgba(245,158,11,0.2)" strokeWidth="1" />
                 <text x="550" y="65" textAnchor="middle" fill="rgba(245,158,11,0.4)" fontSize="10" fontFamily="monospace">SEC-Z/BETA</text>

                 <circle cx="380" cy="300" r="85" fill="rgba(239,68,68,0.02)" stroke="rgba(239,68,68,0.4)" strokeWidth="1.5" strokeDasharray="8 6" />
                 <text x="380" y="210" textAnchor="middle" fill="rgba(239,68,68,0.6)" fontSize="10" fontFamily="monospace" fontWeight="bold">SEC-Z/RESTRICTED-C</text>
              </g>

              {/* Events as faint blips */}
              {events.filter(e => e.type !== "drone_patrol").map(event => {
                const x = normalize(event.coords[1], -0.098, -0.083, 50, 750);
                const y = normalize(event.coords[0], 51.502, 51.512, 350, 50);
                const colors = { high: "#ef4444", medium: "#f59e0b", low: "#10b981", info: "#3b82f6" };
                return (
                  <g key={event.id}>
                    <circle cx={x} cy={y} r="8" fill="none" stroke={colors[event.severity]} strokeWidth="1" opacity="0.3" />
                    <circle cx={x} cy={y} r="2" fill={colors[event.severity]} opacity="0.6" />
                    <text x={x + 10} y={y + 3} fill={colors[event.severity]} fontSize="9" opacity="0.5" fontFamily="monospace">{event.time}</text>
                  </g>
                );
              })}

              {/* Waypoint Connections (Path) */}
              {waypoints.map((wp, i) => {
                if (i >= waypoints.length - 1) return null;
                const next = waypoints[i + 1];
                const x1 = normalize(wp.coords[1], -0.098, -0.083, 50, 750);
                const y1 = normalize(wp.coords[0], 51.502, 51.512, 350, 50);
                const x2 = normalize(next.coords[1], -0.098, -0.083, 50, 750);
                const y2 = normalize(next.coords[0], 51.502, 51.512, 350, 50);
                
                let lineProps = {};
                if (isPlanningMode) {
                   lineProps = {
                     stroke: "rgba(16,185,129,0.8)",
                     strokeWidth: 2,
                     strokeDasharray: "4 4"
                   };
                } else {
                   const isActive = i < currentWaypoint;
                   lineProps = {
                     stroke: isActive ? "url(#dronePathGradient)" : "rgba(255,255,255,0.05)",
                     strokeWidth: isActive ? 3 : 2,
                     strokeDasharray: isActive ? "none" : "4 6"
                   };
                }
                
                return (
                  <line key={`path-${i}`} x1={x1} y1={y1} x2={x2} y2={y2}
                    {...lineProps}
                    className="transition-all duration-1000 ease-in-out pointer-events-none" />
                );
              })}

              {/* Waypoint Nodes & Current Drone Cursor */}
              {waypoints.map((wp, i) => {
                const x = normalize(wp.coords[1], -0.098, -0.083, 50, 750);
                const y = normalize(wp.coords[0], 51.502, 51.512, 350, 50);
                const isActive = i === currentWaypoint;
                const isPast = i < currentWaypoint;
                
                return (
                  <g key={`wp-${i}`}>
                     {/* Drone cursor radar pulse */}
                    {isActive && (
                      <circle cx={x} cy={y} r="20" fill="none" stroke="var(--brand-blue)" strokeWidth="1" opacity="0.8">
                        <animate attributeName="r" from="5" to="35" dur="1.5s" repeatCount="indefinite" />
                        <animate attributeName="opacity" from="0.8" to="0" dur="1.5s" repeatCount="indefinite" />
                      </circle>
                    )}
                    
                    {/* Node */}
                    <circle
                      cx={x} cy={y} r={isActive && !isPlanningMode ? 6 : 4}
                      fill={isActive && !isPlanningMode ? "#fff" : isPlanningMode ? "var(--brand-green)" : isPast ? "var(--brand-blue)" : "rgba(255,255,255,0.2)"}
                      filter={isActive && !isPlanningMode ? "url(#glow)" : "none"}
                      className="transition-all duration-300 pointer-events-none"
                    />
                  </g>
                );
              })}

              {/* Single smooth drone cursor */}
              {!isPlanningMode && waypoints.length > 0 && (
                <g style={{ transform: `translate(${droneX}px, ${droneY}px)` }} className="transition-transform duration-[1500ms] ease-linear pointer-events-none">
                  {/* Drone cursor radar pulse */}
                  <circle cx="0" cy="0" r="20" fill="none" stroke="var(--brand-blue)" strokeWidth="1" opacity="0.8">
                    <animate attributeName="r" from="5" to="35" dur="1.5s" repeatCount="indefinite" />
                    <animate attributeName="opacity" from="0.8" to="0" dur="1.5s" repeatCount="indefinite" />
                  </circle>
                  
                  {/* Active label */}
                  <g className="transition-opacity duration-300">
                     <rect x="-20" y="-30" width="40" height="16" rx="4" fill="rgba(59,130,246,0.2)" stroke="var(--brand-blue)" strokeWidth="1" />
                     <text x="0" y="-19" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="bold" fontFamily="monospace">{activeRoute.droneId || "SD-7"}</text>
                  </g>
                </g>
              )}
            </svg>

            {/* Overlays */}
            {isPlanningMode && (
              <div className="absolute top-4 right-4 z-20">
                <div className="glass px-3 py-3 rounded-xl flex flex-col gap-2 w-64 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                  <span className="text-[10px] text-[var(--brand-amber)] uppercase font-bold tracking-wider mb-1">Manual Coordinates</span>
                  <div className="flex items-center gap-2">
                    <input type="number" placeholder="Lat (e.g. 51.507)" value={manualLat} onChange={(e) => setManualLat(e.target.value)} 
                       className="w-full bg-[rgba(0,0,0,0.3)] border border-[rgba(255,255,255,0.1)] rounded px-2 py-1.5 text-xs text-white" />
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="number" placeholder="Lng (e.g. -0.091)" value={manualLng} onChange={(e) => setManualLng(e.target.value)} 
                       className="w-full bg-[rgba(0,0,0,0.3)] border border-[rgba(255,255,255,0.1)] rounded px-2 py-1.5 text-xs text-white" />
                  </div>
                  <button onClick={handleAddManualCoords} className="mt-1 w-full flex items-center justify-center bg-[rgba(16,185,129,0.15)] text-[var(--brand-green)] border border-[rgba(16,185,129,0.3)] rounded hover:bg-[rgba(16,185,129,0.25)] transition-colors py-1.5 text-xs font-bold uppercase tracking-wider">
                    Add Point
                  </button>
                  {tempWaypoints.length > 0 && (
                     <button onClick={analyzeThreat} className="w-full flex items-center justify-center gap-1.5 bg-[rgba(245,158,11,0.15)] text-[var(--brand-amber)] border border-[rgba(245,158,11,0.3)] rounded hover:bg-[rgba(245,158,11,0.25)] transition-colors py-1.5 text-xs font-bold uppercase tracking-wider">
                       <ShieldAlert size={12} /> Analyze Threat
                     </button>
                  )}
                </div>
              </div>
            )}
            {isPlanningMode && tempWaypoints.length === 0 && (
              <div className="absolute inset-0 flex items-center justify-center font-mono opacity-60 text-sm text-[var(--brand-amber)] pointer-events-none z-0">
                 Tap map to plot manual waypoints
              </div>
            )}
            {completed && (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="absolute inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.6)] backdrop-blur-md">
                <div className="glass p-8 rounded-2xl flex flex-col items-center border border-emerald-500/30 text-center shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mb-4">
                     <CheckCircle size={32} className="text-emerald-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-wide">Patrol Sequence Complete</h3>
                  <p className="text-sm text-[var(--text-secondary)] font-mono">{droneRoute.name} verified visually clear.</p>
                </div>
              </motion.div>
            )}

            {/* HUD Status Elements */}
            <div className="absolute top-4 left-4">
               <div className="glass px-3 py-2 rounded-lg flex flex-col gap-1">
                 <span className="text-[10px] text-[var(--brand-blue)] uppercase font-bold tracking-wider mr-2 flex items-center gap-1.5">
                   <Radar size={12}/> Live Coordinates
                 </span>
                 <span className="font-mono text-xs text-white">
                   {waypoints[currentWaypoint]?.coords[0].toFixed(5)}, {waypoints[currentWaypoint]?.coords[1].toFixed(5)}
                 </span>
               </div>
            </div>
            
            <div className="absolute bottom-4 left-4 right-4">
                <div className="glass px-4 py-3 rounded-xl flex items-center gap-4">
                  <div className="flex-1">
                    <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)] mb-2">
                      <span>Telemetry Progression — WP {currentWaypoint + 1}/{waypoints.length}</span>
                      <span className="text-[var(--brand-blue)]">{Math.round((currentWaypoint / (waypoints.length - 1)) * 100)}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-[rgba(0,0,0,0.5)] border border-[rgba(255,255,255,0.05)] overflow-hidden">
                       <motion.div 
                         className="h-full bg-gradient-to-r from-blue-600 to-blue-400"
                         initial={{ width: 0 }}
                         animate={{ width: `${(currentWaypoint / (waypoints.length - 1)) * 100}%` }}
                         transition={{ ease: "linear" }}
                       />
                    </div>
                  </div>
                  <div className="shrink-0 text-right min-w-[80px]">
                     <div className="text-[10px] uppercase font-bold text-[var(--text-muted)] tracking-wider">Timestamp</div>
                     <div className="font-mono text-sm font-bold text-white mt-0.5">{waypoints[currentWaypoint]?.time || droneRoute.startTime}</div>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right panel: Observations & Agent Context */}
      <div className="flex flex-col gap-6 h-full overflow-y-auto pr-2 custom-scrollbar">
        
        {threatProfile && (
           <motion.div initial={{ opacity:0, x:20 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, scale:0.95 }}
             className={`glass-panel p-5 rounded-2xl shrink-0 border bg-gradient-to-br ${threatProfile.isRestricted ? "from-[rgba(239,68,68,0.1)] border-[rgba(239,68,68,0.4)]" : "from-[rgba(16,185,129,0.1)] border-[rgba(16,185,129,0.4)]"} to-transparent`}
           >
             <div className="flex items-center gap-2 mb-4">
               <ShieldAlert size={18} className={threatProfile.isRestricted ? "text-[var(--brand-red)] animate-pulse" : "text-[var(--brand-green)]"} />
               <span className="text-sm font-bold uppercase tracking-wider text-white">Threat Intelligence Sync</span>
             </div>
             
             <div className="grid grid-cols-2 gap-3 mb-4">
               <div className="bg-[rgba(0,0,0,0.3)] rounded-lg p-2 border border-[rgba(255,255,255,0.05)]">
                 <div className="text-[10px] uppercase font-bold text-[var(--text-muted)] flex items-center gap-1"><Target size={10}/> Location</div>
                 <div className="font-mono text-xs text-[var(--brand-blue)] mt-1">{threatProfile.lat}, {threatProfile.lng}</div>
               </div>
               <div className="bg-[rgba(0,0,0,0.3)] rounded-lg p-2 border border-[rgba(255,255,255,0.05)]">
                 <div className="text-[10px] uppercase font-bold text-[var(--text-muted)] flex items-center gap-1"><Wind size={10}/> Windspeed</div>
                 <div className="font-mono text-xs text-white mt-1">{threatProfile.wind}</div>
               </div>
               <div className="bg-[rgba(0,0,0,0.3)] rounded-lg p-2 border border-[rgba(255,255,255,0.05)] col-span-2">
                 <div className="text-[10px] uppercase font-bold text-[var(--text-muted)] flex items-center gap-1"><Camera size={10}/> Live Camera Feed</div>
                 <div className="font-mono text-sm text-[var(--text-secondary)] mt-1">{threatProfile.camera} (Targeting: {threatProfile.zone})</div>
               </div>
             </div>

             <div className={`text-xs leading-relaxed p-3 rounded-lg border ${threatProfile.isRestricted ? "bg-[rgba(239,68,68,0.1)] border-[rgba(239,68,68,0.2)] text-[var(--brand-red)]" : "bg-[rgba(16,185,129,0.1)] border-[rgba(16,185,129,0.2)] text-emerald-400"}`}>
               {threatProfile.threat}
             </div>
           </motion.div>
        )}

        {/* Drone Specs Widget */}
        <div className="glass-panel p-5 rounded-2xl shrink-0">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-4">
            <Scan size={14} className="text-[var(--brand-blue)]" /> Sensor Array
          </div>
          <div className="space-y-3">
             {[
               { label: "Hardware ID", value: activeRoute.droneId || "SD-7", highlight: true },
               { label: "Sensor Mode", value: "Therm+Optical", highlight: true },
               { label: "Altitude", value: "35m ATGL", highlight: false },
               { label: "Wind Shear", value: "Nominal (8kts)", highlight: false },
             ].map((spec, i) => (
                <div key={i} className="flex items-center justify-between border-b border-[rgba(255,255,255,0.05)] pb-2 last:border-0 last:pb-0">
                  <span className="text-[11px] font-bold uppercase text-[var(--text-muted)] tracking-wider">{spec.label}</span>
                  <span className={`text-xs font-mono font-bold ${spec.highlight ? 'text-[var(--brand-blue)]' : 'text-white'}`}>{spec.value}</span>
                </div>
             ))}
          </div>
        </div>

        {/* Observations Feed */}
        <div className="glass-panel p-5 rounded-2xl flex-1 flex flex-col min-h-[300px]">
           <div className="flex flex-col mb-4">
             <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">Flight Log</span>
             <span className="text-[10px] text-[var(--text-muted)]">Verified observation stream</span>
           </div>
           
           <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
             <AnimatePresence>
               {currentObs.length === 0 ? (
                  <motion.div 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="h-full flex items-center justify-center border border-dashed border-[var(--border-subtle)] rounded-xl"
                  >
                     <span className="text-xs text-[var(--text-muted)] px-10 text-center">Awaiting telemetry. Initiate patrol to pull log data.</span>
                  </motion.div>
               ) : (
                 currentObs.map((obs, i) => (
                    <motion.div 
                      key={obs.waypoint}
                      initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                      className="bg-[rgba(16,185,129,0.05)] border border-[rgba(16,185,129,0.2)] rounded-xl p-3 flex gap-3"
                    >
                       <div className="shrink-0 mt-0.5">
                         <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center">
                           <CheckCircle size={10} className="text-emerald-400" />
                         </div>
                       </div>
                       <div>
                         <div className="text-xs font-mono text-[var(--brand-green)] mb-1">{waypoints[obs.waypoint]?.time} — WP{obs.waypoint + 1}</div>
                         <div className="text-sm text-[var(--text-primary)] leading-snug">{obs.text}</div>
                       </div>
                    </motion.div>
                  ))
               )}
             </AnimatePresence>
           </div>
        </div>

        {/* AI Insight Overlay */}
        <AnimatePresence>
          {agentDone && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="glass-panel p-4 rounded-2xl border border-[rgba(245,158,11,0.3)] bg-gradient-to-br from-[rgba(245,158,11,0.1)] to-transparent relative overflow-hidden shrink-0"
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-[var(--brand-amber)]" />
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle size={14} className="text-[var(--brand-amber)]" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--brand-amber)]">Agent Context Overlay</span>
              </div>
              <p className="text-xs leading-relaxed text-[var(--text-secondary)]">
                 Drone patrol confirmed perimeter physical integrity at 03:48. However, an unauthorized vehicle event occurred at 01:17. <strong className="text-white">This 2.5 hour gap</strong> means the drone telemetry cannot invalidate the earlier detection.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {followUpMission && (
          <div className="glass-panel p-4 rounded-2xl shrink-0">
            <div className="flex items-center gap-2 mb-2">
              <Radar size={14} className="text-[var(--brand-blue)]" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-secondary)]">
                Suggested follow-up mission
              </span>
            </div>
            <h3 className="text-sm font-semibold text-white mb-2">{followUpMission.title}</h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-3">{followUpMission.objective}</p>
            <div className="rounded-xl border border-[var(--border-subtle)] bg-[rgba(0,0,0,0.24)] p-3 mb-3">
              <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] mb-2">Route</p>
              <p className="text-sm text-[var(--text-primary)]">{followUpMission.route.join(" -> ")}</p>
            </div>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">{followUpMission.rationale}</p>
          </div>
        )}
      </div>
    </div>
  );
}

function normalize(val, min, max, outMin, outMax) {
  return outMin + ((val - min) / (max - min)) * (outMax - outMin);
}

function unnormalize(val, min, max, outMin, outMax) {
  return min + ((val - outMin) / (outMax - outMin)) * (max - min);
}
