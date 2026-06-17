import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import { fetchDevices, fetchAlerts, fetchPolicies } from "../services/api.js";
import StatCard from "./StatCard.jsx";

export default function DashboardPage() {
  const { token, signOut, user } = useContext(AuthContext);
  const [devices, setDevices] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [policies, setPolicies] = useState([]);

  useEffect(() => {
    if (!token) return;
    fetchDevices(token).then((data) => setDevices(data.devices)).catch(console.error);
    fetchAlerts(token).then((data) => setAlerts(data.alerts)).catch(console.error);
    fetchPolicies(token).then((data) => setPolicies(data.policies)).catch(console.error);
  }, [token]);

  return (
    <div style={{ padding: 24, color: "#e8f6ff", minHeight: "100vh", background: "linear-gradient(180deg, #020a15 0%, #030d1f 100%)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 20, marginBottom: 24 }}>
        <div>
          <div style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: 1.6, color: "#82c3ff" }}>Welcome back</div>
          <h2 style={{ margin: 0, fontSize: 28 }}>{user?.name || "GRT Nexus User"}</h2>
          <div style={{ color: "#7fabc6", marginTop: 6 }}>{user?.role?.toUpperCase() || "Student / Admin"}</div>
        </div>
        <button onClick={signOut} style={{ padding: "12px 18px", borderRadius: 16, border: "1px solid #00d4ff44", background: "#01111f", color: "#00d4ff", cursor: "pointer" }}>
          Sign out
        </button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16, marginBottom: 24 }}>
        <StatCard icon="📈" label="Devices" value={devices.length.toString()} color="#00d4ff" />
        <StatCard icon="🚨" label="Alerts" value={alerts.length.toString()} color="#ff6b35" />
        <StatCard icon="📜" label="Policies" value={policies.length.toString()} color="#9b59b6" />
        <StatCard icon="🧠" label="Role" value={user?.role || "unknown"} color="#2ecc71" />
      </div>
      <div style={{ display: "grid", gap: 18 }}>
        <section style={{ background: "#020a15", borderRadius: 20, border: "1px solid #00d4ff22", padding: 20 }}>
          <div style={{ fontSize: 13, color: "#82c3ff", marginBottom: 12 }}>Recent devices</div>
          <div style={{ display: "grid", gap: 12 }}>
            {devices.slice(0, 4).map((device) => (
              <div key={device.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: 14, borderRadius: 16, background: "#01111f" }}>
                <div>
                  <div style={{ fontWeight: 700 }}>{device.name}</div>
                  <div style={{ fontSize: 12, color: "#7b97b0" }}>{device.ip_address}</div>
                </div>
                <div style={{ fontSize: 12, color: device.status === "online" ? "#7bed8d" : "#ff7a7a" }}>{device.status}</div>
              </div>
            ))}
          </div>
        </section>
        <section style={{ background: "#020a15", borderRadius: 20, border: "1px solid #00d4ff22", padding: 20 }}>
          <div style={{ fontSize: 13, color: "#82c3ff", marginBottom: 12 }}>Recent alerts</div>
          <div style={{ display: "grid", gap: 12 }}>
            {alerts.slice(0, 4).map((alert) => (
              <div key={alert.id} style={{ padding: 14, borderRadius: 16, background: "#01111f" }}>
                <div style={{ fontWeight: 700 }}>{alert.title}</div>
                <div style={{ fontSize: 12, color: "#7b97b0", marginTop: 6 }}>{alert.severity} · {alert.source || "System"}</div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
