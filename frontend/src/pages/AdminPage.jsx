import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import { fetchDevices, fetchAlerts } from "../services/api.js";

export default function AdminPage() {
  const { token } = useContext(AuthContext);
  const [devices, setDevices] = useState([]);
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    if (!token) return;
    fetchDevices(token).then((data) => setDevices(data.devices)).catch(console.error);
    fetchAlerts(token).then((data) => setAlerts(data.alerts)).catch(console.error);
  }, [token]);

  return (
    <div style={{ padding: 24, color: "#e8f6ff", minHeight: "100vh" }}>
      <h1 style={{ fontFamily: "'Orbitron',sans-serif", color: "#00d4ff" }}>Admin Console</h1>
      <div style={{ display: "grid", gap: 20, marginTop: 20 }}>
        <section style={{ background: "#020a15", borderRadius: 20, border: "1px solid #00d4ff22", padding: 20 }}>
          <div style={{ fontSize: 13, color: "#82c3ff", marginBottom: 12 }}>Device Audit</div>
          <div style={{ display: "grid", gap: 12 }}>
            {devices.slice(0, 6).map((device) => (
              <div key={device.id} style={{ padding: 14, borderRadius: 16, background: "#01111f" }}>
                <div style={{ fontWeight: 700 }}>{device.name}</div>
                <div style={{ fontSize: 12, color: "#7b97b0" }}>{device.ip_address}</div>
              </div>
            ))}
          </div>
        </section>
        <section style={{ background: "#020a15", borderRadius: 20, border: "1px solid #00d4ff22", padding: 20 }}>
          <div style={{ fontSize: 13, color: "#82c3ff", marginBottom: 12 }}>Security Alerts</div>
          <div style={{ display: "grid", gap: 12 }}>
            {alerts.slice(0, 6).map((alert) => (
              <div key={alert.id} style={{ padding: 14, borderRadius: 16, background: "#01111f" }}>
                <div style={{ fontWeight: 700 }}>{alert.title}</div>
                <div style={{ fontSize: 12, color: "#7b97b0" }}>{alert.severity}</div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
