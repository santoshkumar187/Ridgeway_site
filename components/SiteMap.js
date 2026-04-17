"use client";
import { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, CircleMarker, Polyline, Popup, useMap, Circle } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { ZONES, GATES, DRONE_ROUTES, SITE_CONFIG } from "../lib/siteData";
import { AlertTriangle, Shield, Lock, Navigation, Zap, Map as MapIcon, CheckCircle } from "lucide-react";

const EVENT_ICONS = {
  fence_alert: "⚠",
  vehicle_movement: "🚐",
  badge_failure: "🔒",
  drone_patrol: "🛰",
  signal_anomaly: "⚡",
};

const EVENT_COLORS = {
  fence_alert: "rgba(245, 158, 11, 1)", // var(--brand-amber)
  vehicle_movement: "rgba(239, 68, 68, 1)", // var(--brand-red)
  badge_failure: "rgba(239, 68, 68, 1)", // var(--brand-red)
  drone_patrol: "rgba(59, 130, 246, 1)", // var(--brand-blue)
  signal_anomaly: "rgba(139, 92, 246, 1)", // var(--brand-purple)
};

const SEVERITY_RADIUS = { high: 22, medium: 16, low: 12, info: 10 };

function FlyTo({ coords }) {
  const map = useMap();
  useEffect(() => {
    if (coords) map.flyTo(coords, 17, { animate: true, duration: 2, easeLinearity: 0.25 });
  }, [coords, map]);
  return null;
}

export default function SiteMap({ events, focusEvent, onSelectEvent, agentDone }) {
  const [showDronePath, setShowDronePath] = useState(true);
  const [showZones, setShowZones] = useState(true);
  
  const droneRoute = Object.values(DRONE_ROUTES)[0];
  const dronePath = droneRoute.waypoints.map(w => w.coords);
  const focusCoords = focusEvent?.coords || null;

  return (
    <div className="relative w-full h-full rounded-2xl overflow-hidden">
      
      {/* HUD Controls */}
      <div className="absolute top-4 right-4 z-[500] flex flex-col gap-3">
        <div style={{ background: "white", border: "1px solid rgba(0,0,0,0.1)", borderRadius: "8px", padding: "8px", display: "flex", flexDirection: "column", gap: "6px", boxShadow: "0 2px 8px rgba(0,0,0,0.15)" }}>
          <button
            onClick={() => setShowDronePath(p => !p)}
            className={`p-2.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center`}
            style={{
              background: showDronePath ? "rgba(59,130,246,0.1)" : "transparent",
              color: showDronePath ? "#2563eb" : "#9ca3af",
              border: "none",
              cursor: "pointer"
            }}
            title="Toggle Drone Path"
          >
            <Navigation size={18} />
          </button>
          <div style={{ width: "100%", height: "1px", background: "rgba(0,0,0,0.1)" }} />
          <button
            onClick={() => setShowZones(p => !p)}
            className={`p-2.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center`}
            style={{
              background: showZones ? "rgba(59,130,246,0.1)" : "transparent",
              color: showZones ? "#2563eb" : "#9ca3af",
              border: "none",
              cursor: "pointer"
            }}
            title="Toggle Zone Overlays"
          >
            <MapIcon size={18} />
          </button>
        </div>
      </div>

      {/* Legend */}
      <div style={{ position: "absolute", bottom: "24px", left: "24px", zIndex: 500, background: "white", borderRadius: "8px", padding: "16px", minWidth: "250px", border: "1px solid rgba(0,0,0,0.1)", boxShadow: "0 2px 8px rgba(0,0,0,0.15)" }}>
        <div style={{ fontSize: "10px", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "0.05em", color: "#6b7280", marginBottom: "12px", borderBottom: "1px solid rgba(0,0,0,0.1)", paddingBottom: "8px" }}>Tactical Overlay Legend</div>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {[
            { color: "#ef4444", label: "Critical Incident (Vehicle/Badge)" },
            { color: "#f59e0b", label: "Perimeter Alert" },
            { color: "#8b5cf6", label: "Signal Anomaly" },
            { color: "#3b82f6", label: "Drone Telemetry" },
            { color: "transparent", border: "#ef4444", dashed: true, label: "Restricted Zone" },
          ].map(({ color, label, dashed, border }, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div 
                style={{ 
                  width: "12px", 
                  height: "12px", 
                  borderRadius: "50%",
                  flexShrink: 0,
                  background: color, 
                  border: border ? `2px ${dashed ? 'dashed' : 'solid'} ${border}` : 'none',
                  boxShadow: color !== "transparent" ? `0 0 8px ${color}` : "none"
                }} 
              />
              <span style={{ fontSize: "12px", fontWeight: "500", color: "#374151" }}>{label}</span>
            </div>
          ))}
        </div>
      </div>

      <MapContainer
        center={SITE_CONFIG.center}
        zoom={SITE_CONFIG.zoom}
        style={{ width: "100%", height: "100%", background: "#1a1a1a" }}
        zoomControl={false} // Hide default to position custom one later
        attributionControl={false}
      >
        <TileLayer
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          attribution="&copy; Esri"
          maxZoom={20}
        />

        {focusCoords && <FlyTo coords={focusCoords} />}

        {/* Zone overlays */}
        {showZones && ZONES.map(zone => (
          <Circle
            key={zone.id}
            center={zone.coords}
            radius={zone.radius}
            pathOptions={{
              color: zone.isRestricted ? "#ef4444" : zone.color,
              fillColor: zone.isRestricted ? "#ef4444" : zone.color,
              fillOpacity: 0.05,
              weight: zone.isRestricted ? 2 : 1,
              dashArray: zone.isRestricted ? "8 6" : null,
              opacity: 0.6
            }}
          >
            <Popup className="custom-popup">
              <div className="font-sans">
                <div className="font-bold text-[13px] text-gray-900 tracking-wide">{zone.name}</div>
                {zone.isRestricted && <div className="text-[11px] font-bold text-red-600 uppercase tracking-wider mt-1 flex items-center gap-1"><Lock size={10}/> Restricted Access Area</div>}
              </div>
            </Popup>
          </Circle>
        ))}

        {/* Gate markers */}
        {GATES.map(gate => (
          <CircleMarker
            key={gate.id}
            center={gate.coords}
            radius={4}
            pathOptions={{
              color: gate.status === "alert" ? "#f59e0b" : "#10b981",
              fillColor: gate.status === "alert" ? "#f59e0b" : "#10b981",
              fillOpacity: 1,
              weight: 0,
            }}
          >
            <Popup className="custom-popup">
              <div className="font-sans">
                <div className="font-bold text-[13px] text-gray-900 tracking-wide">{gate.name}</div>
                <div className="text-[11px] font-bold uppercase tracking-wider mt-1" style={{ color: gate.status === "alert" ? "#ea580c" : "#059669" }}>
                  {gate.status === "alert" ? "⚠ Security Alert Active" : "✓ Operational Normal"}
                </div>
              </div>
            </Popup>
          </CircleMarker>
        ))}

        {/* Event markers */}
        {events.map(event => {
          const isFocused = focusEvent?.id === event.id;
          const color = EVENT_COLORS[event.type];
          return (
            <div key={event.id}>
              {/* Pulse effect for focused or severe events */}
              {(isFocused || event.severity === 'high') && (
                <CircleMarker
                  center={event.coords}
                  radius={SEVERITY_RADIUS[event.severity] * 1.5}
                  pathOptions={{
                    color: "transparent",
                    fillColor: color,
                    fillOpacity: 0.1,
                    className: "animate-pulse"
                  }}
                 />
              )}
              <CircleMarker
                center={event.coords}
                radius={SEVERITY_RADIUS[event.severity]}
                eventHandlers={{ click: () => onSelectEvent(event.id) }}
                pathOptions={{
                  color: color,
                  fillColor: color,
                  fillOpacity: isFocused ? 0.6 : (event.severity === "high" ? 0.4 : 0.2),
                  weight: isFocused ? 3 : 2,
                }}
              >
                <Popup className="custom-popup">
                  <div className="min-w-[220px] font-sans">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-gray-100 text-gray-700">{event.time}</span>
                      <span className="text-[10px] uppercase font-bold tracking-wider" style={{ color }}>{event.type.replace('_', ' ')}</span>
                    </div>
                    <div className="text-[13px] font-bold text-gray-900 mb-2 leading-snug">{event.title}</div>
                    
                    {event.aiAssessment && (
                      <div className="mt-3 p-2 rounded border" style={{
                        background: event.aiAssessment.verdict === "escalate" ? "rgba(239,68,68,0.1)" : "rgba(16,185,129,0.1)",
                        borderColor: event.aiAssessment.verdict === "escalate" ? "rgba(239,68,68,0.3)" : "rgba(16,185,129,0.3)",
                      }}>
                         <div className="text-[10px] font-bold uppercase tracking-wider mb-1 text-gray-600 flex items-center gap-1">
                           AI Verdict
                         </div>
                         <div className="text-[11px] font-bold uppercase tracking-wider" style={{ color: event.aiAssessment.verdict === "escalate" ? "#dc2626" : "#059669" }}>
                            {event.aiAssessment.verdict.replace("_", " ")}
                         </div>
                      </div>
                    )}
                  </div>
                </Popup>
              </CircleMarker>
            </div>
          );
        })}

        {/* Drone patrol path */}
        {showDronePath && (
          <>
            <Polyline
              positions={dronePath}
              pathOptions={{ 
                color: "var(--brand-blue)", 
                weight: 3, 
                opacity: 0.8, 
                dashArray: "1 8", 
                lineCap: "round",
                className: "drone-path-segment" // Optional CSS animation if desired
              }}
            />
            {droneRoute.waypoints.map((wp, i) => (
              <CircleMarker
                key={i}
                center={wp.coords}
                radius={i === 0 || i === droneRoute.waypoints.length -1 ? 6 : 4}
                pathOptions={{ color: "#3b82f6", fillColor: "white", fillOpacity: 1, weight: 2 }}
              >
                <Popup className="custom-popup">
                  <div className="font-sans">
                    <div className="font-bold text-[13px] text-gray-900 flex items-center gap-2">
                       <Navigation size={12} className="text-blue-600"/> Waypoint {i + 1}
                    </div>
                    <div className="text-[11px] font-mono text-gray-600 mt-1">{wp.time} · {wp.label}</div>
                    {droneRoute.observations.find(o => o.waypoint === i) && (
                      <div className="mt-2 p-1.5 rounded bg-[rgba(16,185,129,0.1)] border border-[rgba(16,185,129,0.2)] text-[11px] text-emerald-300 flex items-start gap-1">
                        <CheckCircle size={12} className="mt-0.5 shrink-0"/> {droneRoute.observations.find(o => o.waypoint === i).text}
                      </div>
                    )}
                  </div>
                </Popup>
              </CircleMarker>
            ))}
          </>
        )}
      </MapContainer>
    </div>
  );
}
