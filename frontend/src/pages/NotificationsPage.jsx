import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import { fetchNotifications } from "../services/api.js";

export default function NotificationsPage() {
  const { token } = useContext(AuthContext);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (!token) return;
    fetchNotifications(token).then((data) => setNotifications(data.notifications)).catch(console.error);
  }, [token]);

  return (
    <div style={{ padding: 24, minHeight: "100vh", color: "#e8f6ff", background: "linear-gradient(180deg, #020a15 0%, #030d1f 100%)" }}>
      <h1 style={{ fontFamily: "'Orbitron',sans-serif", color: "#00d4ff" }}>Notifications</h1>
      <div style={{ display: "grid", gap: 16, marginTop: 20 }}>
        {notifications.length === 0 ? (
          <div style={{ padding: 20, borderRadius: 20, background: "#01111f", color: "#7b97b0" }}>No notifications yet.</div>
        ) : (
          notifications.map((notification) => (
            <div key={notification.id} style={{ background: "#020a15", border: "1px solid #00d4ff22", borderRadius: 20, padding: 20 }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 20 }}>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: "#e8f6ff" }}>{notification.title}</div>
                  <div style={{ fontSize: 12, color: "#7b97b0", marginTop: 6 }}>{notification.type}</div>
                </div>
                <div style={{ fontSize: 12, color: notification.read ? "#7b97b0" : "#00d4ff", fontWeight: 700 }}>{notification.read ? "Read" : "New"}</div>
              </div>
              <div style={{ marginTop: 12, fontSize: 13, color: "#c8def8" }}>{notification.message}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
