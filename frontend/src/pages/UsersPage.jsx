import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import { fetchUsers } from "../services/api.js";

export default function UsersPage() {
  const { token } = useContext(AuthContext);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (!token) return;
    fetchUsers(token).then((data) => setUsers(data.users)).catch(console.error);
  }, [token]);

  return (
    <div style={{ padding: 24, minHeight: "100vh", color: "#e8f6ff", background: "linear-gradient(180deg, #020a15 0%, #030d1f 100%)" }}>
      <h1 style={{ fontFamily: "'Orbitron',sans-serif", color: "#00d4ff" }}>Users</h1>
      <div style={{ display: "grid", gap: 16, marginTop: 20 }}>
        {users.map((user) => (
          <div key={user.id} style={{ background: "#020a15", border: "1px solid #00d4ff22", borderRadius: 20, padding: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
              <div>
                <div style={{ fontSize: 16, fontWeight: 700, color: "#e8f6ff" }}>{user.name}</div>
                <div style={{ fontSize: 12, color: "#7b97b0", marginTop: 6 }}>{user.email}</div>
              </div>
              <div style={{ fontSize: 12, color: "#7b97b0", fontWeight: 700 }}>{user.role}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
