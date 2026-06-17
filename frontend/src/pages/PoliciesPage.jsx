import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import { fetchPolicies } from "../services/api.js";

export default function PoliciesPage() {
  const { token } = useContext(AuthContext);
  const [policies, setPolicies] = useState([]);

  useEffect(() => {
    if (!token) return;
    fetchPolicies(token).then((data) => setPolicies(data.policies)).catch(console.error);
  }, [token]);

  return (
    <div style={{ padding: 24, color: "#e8f6ff", minHeight: "100vh", background: "linear-gradient(180deg, #020a15 0%, #030d1f 100%)" }}>
      <h1 style={{ fontFamily: "'Orbitron',sans-serif", color: "#00d4ff" }}>Policy Center</h1>
      <div style={{ display: "grid", gap: 18, marginTop: 20 }}>
        {policies.map((policy) => (
          <div key={policy.id} style={{ background: "#020a15", borderRadius: 20, border: "1px solid #00d4ff22", padding: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16 }}>
              <div>
                <div style={{ fontSize: 16, fontWeight: 700, color: "#e8f6ff" }}>{policy.title}</div>
                <div style={{ fontSize: 12, color: "#7b97b0", marginTop: 6 }}>{policy.scope}</div>
              </div>
              <div style={{ fontSize: 12, color: policy.level === "Critical" ? "#ff6b35" : "#7bd18f", fontWeight: 700 }}>{policy.level}</div>
            </div>
            <div style={{ marginTop: 12, fontSize: 13, color: "#c8def8" }}>Status: {policy.status}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
