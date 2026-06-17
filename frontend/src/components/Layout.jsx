import { useContext } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";

export default function Layout() {
  const { user, signOut } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut();
    navigate("/login");
  };

  return (
    <div style={{ minHeight: "100vh", display: "grid", gridTemplateColumns: "260px 1fr", background: "#000" }}>
      <aside style={{ background: "#020a15", borderRight: "1px solid #00d4ff22", padding: 24, display: "flex", flexDirection: "column", gap: 28 }}>
        <div>
          <div style={{ fontFamily: "'Orbitron',sans-serif", fontSize: 18, color: "#00d4ff", marginBottom: 8 }}>GRT Nexus</div>
          <div style={{ fontSize: 12, color: "#7d9cbc" }}>Security Terminal</div>
        </div>
        <nav style={{ display: "grid", gap: 10 }}>
          {[
            { path: "/terminal", label: "Terminal", icon: "💬" },
            { path: "/dashboard", label: "Dashboard", icon: "📊" },
            { path: "/policies", label: "Policies", icon: "📜" },
            { path: "/notifications", label: "Notifications", icon: "🔔" },
            { path: "/users", label: "Users", icon: "👥" },
            { path: "/admin", label: "Admin", icon: "🛡️" },
          ].map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              style={({ isActive }) => ({
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "12px 14px",
                borderRadius: 14,
                textDecoration: "none",
                color: isActive ? "#00d4ff" : "#a0b8d8",
                background: isActive ? "#00172b" : "transparent",
                fontWeight: 600,
              })}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
        <div style={{ marginTop: "auto", display: "grid", gap: 10, paddingTop: 16, borderTop: "1px solid #00d4ff11" }}>
          <div style={{ fontSize: 12, color: "#7d9cbc" }}>Signed in as</div>
          <div style={{ fontSize: 14, color: "#e8f6ff", fontWeight: 700 }}>{user?.name || "Anonymous"}</div>
          <div style={{ fontSize: 12, color: "#7d9cbc" }}>{user?.role || "guest"}</div>
          <button onClick={handleLogout} style={{ padding: "12px 14px", borderRadius: 14, border: "1px solid #00d4ff22", background: "#01111f", color: "#00d4ff", cursor: "pointer" }}>
            Sign out
          </button>
        </div>
      </aside>
      <main style={{ overflow: "auto", background: "linear-gradient(180deg, #020a15 0%, #030a1e 100%)" }}>
        <Outlet />
      </main>
    </div>
  );
}
