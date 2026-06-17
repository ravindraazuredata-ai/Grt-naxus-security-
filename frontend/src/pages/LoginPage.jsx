import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";

export default function LoginPage() {
  const { signIn, loading } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    try {
      await signIn(email, password);
    } catch (err) {
      setError(err.message || "Login failed");
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#020a15", padding: 20 }}>
      <div style={{ width: 400, padding: 30, borderRadius: 24, background: "#071324", border: "1px solid #00d4ff22", boxShadow: "0 0 40px rgba(0, 212, 255, 0.12)" }}>
        <h1 style={{ fontFamily: "'Orbitron',sans-serif", color: "#00d4ff", marginBottom: 20 }}>GRT Nexus Terminal</h1>
        <p style={{ color: "#a0b8d8", marginBottom: 24 }}>Sign in to continue to the security dashboard and AI terminal.</p>
        <form onSubmit={handleSubmit} style={{ display: "grid", gap: 16 }}>
          <label style={{ display: "grid", gap: 8, color: "#d8e8ff", fontSize: 13 }}>
            Email
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              style={{ width: "100%", padding: "12px 14px", borderRadius: 14, border: "1px solid #00d4ff22", background: "#0b1b2f", color: "#f8fcff" }}
              type="email"
            />
          </label>
          <label style={{ display: "grid", gap: 8, color: "#d8e8ff", fontSize: 13 }}>
            Password
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              style={{ width: "100%", padding: "12px 14px", borderRadius: 14, border: "1px solid #00d4ff22", background: "#0b1b2f", color: "#f8fcff" }}
              type="password"
            />
          </label>
          {error && <div style={{ color: "#ff7a7a", fontSize: 13 }}>{error}</div>}
          <button type="submit" disabled={loading} style={{ padding: "14px 18px", borderRadius: 16, border: "none", background: "#00d4ff", color: "#001223", fontWeight: 700, cursor: "pointer" }}>
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
