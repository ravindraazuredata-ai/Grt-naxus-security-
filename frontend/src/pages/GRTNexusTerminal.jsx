import { useState, useEffect, useRef, useCallback } from "react";

/* ─────────────────────────────────────────────
   GRT NEXUS TERMINAL  |  grtgod.edu.ai
      Student + Company + Education + AI Platform
      ───────────────────────────────────────────── */

const TOPICS = [
  {
    id: "cs",
    icon: "💻",
    label: "Computer Science",
    sub: ["Protocols", "Web Apps", "Software Dev", "AI & ML", "Automation", "Cloud Computing"],
    desc: "Software development, AI, and automation thrive on global collaboration.",
    internet: "Protocols, Web Apps",
    color: "#00d4ff",
  },
  {
    id: "ee",
    icon: "⚡",
    label: "Electronics & Electrical",
    sub: ["IoT", "Smart Grids", "Circuit Design", "Embedded Systems", "Cloud"],
    desc: "Smart devices and grids rely on real-time data exchange.",
    internet: "IoT, Cloud",
    color: "#ffa500",
  },
  {
    id: "me",
    icon: "⚙️",
    label: "Mechanical Engineering",
    sub: ["CAD Collaboration", "Digital Twins", "Robotics", "Simulation", "3D Printing"],
    desc: "Cloud-based design tools allow remote teamwork and rapid prototyping.",
    internet: "CAD Collaboration",
    color: "#00ff88",
  },
  {
    id: "civil",
    icon: "🏗️",
    label: "Civil Engineering",
    sub: ["GIS", "Smart Cities", "Infrastructure", "3D Visualization", "IoT Monitoring"],
    desc: "Internet enables smart city planning, 3D visualization, and project management.",
    internet: "GIS, Cloud Storage",
    color: "#ff6b35",
  },
  {
    id: "telecom",
    icon: "📡",
    label: "Telecommunications",
    sub: ["VoIP", "5G Networks", "Satellite", "Fiber Optics", "Network Security"],
    desc: "Internet is the backbone of modern communication systems.",
    internet: "VoIP, Networking",
    color: "#9b59b6",
  },
  {
    id: "biomedical",
    icon: "🧬",
    label: "Biomedical Engineering",
    sub: ["Telemedicine", "Wearables", "AI Healthcare", "Digital Twins", "Data Sharing"],
    desc: "Remote diagnostics, wearable devices, and AI-driven healthcare.",
    internet: "Telemedicine, Data Sharing",
    color: "#e74c3c",
  },
  {
    id: "aerospace",
    icon: "🚀",
    label: "Aerospace Engineering",
    sub: ["Satellite Internet", "Autonomous Drones", "Space Data", "AI Navigation"],
    desc: "Global communication, autonomous drones, space exploration networks.",
    internet: "Satellite Internet, AI",
    color: "#3498db",
  },
  {
    id: "auto",
    icon: "🚗",
    label: "Automotive Engineering",
    sub: ["Autonomous Vehicles", "5G Connectivity", "Predictive Diagnostics", "Fleet Management"],
    desc: "Connected cars, autonomous driving, predictive diagnostics.",
    internet: "IoT, 5G",
    color: "#f39c12",
  },
  {
    id: "energy",
    icon: "🔋",
    label: "Energy Engineering",
    sub: ["Smart Grids", "Blockchain", "Renewable Integration", "Real-time Distribution"],
    desc: "Real-time energy distribution, renewable integration, secure transactions.",
    internet: "Smart Grids, Blockchain",
    color: "#27ae60",
  },
  {
    id: "chem",
    icon: "⚗️",
    label: "Chemical Engineering",
    sub: ["Cloud Simulations", "Molecular Modeling", "Process Optimization", "Safety Systems"],
    desc: "Molecular modeling, large-scale process optimization.",
    internet: "Cloud Simulations",
    color: "#1abc9c",
  },
  {
    id: "industrial",
    icon: "🏭",
    label: "Industrial Engineering",
    sub: ["Edge Computing", "IoT", "Smart Factories", "Robotics", "Lean Manufacturing"],
    desc: "Hyper-efficient smart factories with real-time optimization.",
    internet: "Automation, IoT",
    color: "#e67e22",
  },
  {
    id: "software",
    icon: "🖥️",
    label: "Software Engineering",
    sub: ["Open Source", "Agile", "SaaS", "DevOps", "Microservices"],
    desc: "Global collaboration, agile development, and SaaS ecosystems.",
    internet: "Cloud, Open Source",
    color: "#2ecc71",
  },
];

const WORK_SYSTEMS = [
  { id: "inv", icon: "💡", label: "New Invention", status: "active", color: "#ffa500" },
  { id: "gen", icon: "🔮", label: "Generative AI", status: "active", color: "#00d4ff" },
  { id: "res", icon: "🔬", label: "Research Lab", status: "active", color: "#00ff88" },
  { id: "tech", icon: "⚙️", label: "Tech System", status: "active", color: "#9b59b6" },
  { id: "restrict", icon: "🚫", label: "Work Restrictions", status: "enforced", color: "#ff3355" },
  { id: "block", icon: "🔒", label: "Unauthorized Blocking", status: "enforced", color: "#ff6b35" },
  { id: "suggest", icon: "💬", label: "Suggestions Engine", status: "active", color: "#00d4ff" },
  { id: "understand", icon: "🧠", label: "Understanding AI", status: "active", color: "#ffa500" },
  { id: "learn", icon: "📚", label: "Learning System", status: "active", color: "#00ff88" },
  { id: "prep", icon: "📋", label: "Work Preparation", status: "active", color: "#3498db" },
  { id: "answer", icon: "✅", label: "Answer Engine", status: "active", color: "#2ecc71" },
  { id: "design", icon: "🎨", label: "Design System", status: "active", color: "#e74c3c" },
  { id: "arch", icon: "🏛️", label: "Architecture", status: "active", color: "#f39c12" },
  { id: "sensor", icon: "📡", label: "Sensor Work", status: "active", color: "#1abc9c" },
  { id: "auth", icon: "🛡️", label: "System Authorization", status: "active", color: "#00d4ff" },
  { id: "policy", icon: "📜", label: "Policy System", status: "active", color: "#9b59b6" },
];

const SAMPLE_ALERTS = [
  { id: 1, type: "alert", msg: "New competition deadline: AI Innovation Challenge - 3 days left", time: "2m ago" },
  { id: 2, type: "update", msg: "System Authorization updated — v3.2.1 deployed", time: "15m ago" },
  { id: 3, type: "suggest", msg: "Suggested: Cloud Simulation module now available for Chemical Eng.", time: "1h ago" },
  { id: 4, type: "alert", msg: "Unauthorized access attempt blocked — IP logged", time: "2h ago" },
];

const POLICIES = [
  { id: 1, title: "Academic Integrity Policy", scope: "All Students", status: "Active", level: "Mandatory" },
  { id: 2, title: "Data Privacy & GDPR", scope: "Platform-wide", status: "Active", level: "Critical" },
  { id: 3, title: "Work Authorization Protocol", scope: "Company Users", status: "Active", level: "High" },
  { id: 4, title: "AI Usage Guidelines", scope: "All Users", status: "Active", level: "Mandatory" },
  { id: 5, title: "Research Publication Rights", scope: "Research Lab", status: "Active", level: "Medium" },
  { id: 6, title: "Competition Fair Use", scope: "Students", status: "Active", level: "Mandatory" },
  { id: 7, title: "Content Restriction Matrix", scope: "Platform-wide", status: "Active", level: "Critical" },
  { id: 8, title: "System Access Tiers", scope: "Admin", status: "Active", level: "Critical" },
];

const glowStyle = (color, px = 8) => ({
  boxShadow: `0 0 ${px}px ${color}88, 0 0 ${px * 2}px ${color}44`,
  border: `1px solid ${color}66`,
});

const textGlow = (color) => ({
  textShadow: `0 0 8px ${color}, 0 0 16px ${color}88`,
});

function GRTLogo({ size = 32 }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <div
        style={{
          width: size,
          height: size,
          background: "radial-gradient(circle at 40% 40%, #0080ff, #000040)",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: size * 0.35,
          fontWeight: 900,
          color: "#fff",
          fontFamily: "'Orbitron',sans-serif",
          border: "2px solid #00d4ff88",
          boxShadow: "0 0 12px #00d4ff88, inset 0 0 12px #0040ff44",
          letterSpacing: -1,
        }}
      >
        GRT
      </div>
      <div>
        <div style={{ fontFamily: "'Orbitron',sans-serif", fontWeight: 900, fontSize: size * 0.45, color: "#00d4ff", lineHeight: 1, ...textGlow("#00d4ff") }}>
          NEXUS
        </div>
        <div style={{ fontFamily: "'Orbitron',sans-serif", fontWeight: 400, fontSize: size * 0.3, color: "#ffa50099", lineHeight: 1, letterSpacing: 4 }}>
          TERMINAL
        </div>
      </div>
    </div>
  );
}

function TypingDots() {
  return (
    <div style={{ display: "flex", gap: 4, padding: "8px 0" }}>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          style={{
            width: 7,
            height: 7,
            borderRadius: "50%",
            background: "#00d4ff",
            animation: `pulse 1.2s ease-in-out ${i * 0.2}s infinite`,
            boxShadow: "0 0 6px #00d4ff",
          }}
        />
      ))}
    </div>
  );
}

function TopicCard({ topic, onClick, active }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onClick={() => onClick(topic)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "10px 12px",
        borderRadius: 12,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: 10,
        background: active ? `${topic.color}22` : hovered ? "#ffffff08" : "transparent",
        border: active ? `1px solid ${topic.color}66` : "1px solid transparent",
        transition: "all 0.2s",
        boxShadow: active ? `0 0 10px ${topic.color}33` : "none",
      }}
    >
      <span style={{ fontSize: 18 }}>{topic.icon}</span>
      <div style={{ flex: 1, overflow: "hidden" }}>
        <div style={{ fontFamily: "'Exo 2',sans-serif", fontWeight: 600, fontSize: 13, color: active ? topic.color : "#a0b0c0", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", transition: "color 0.2s" }}>
          {topic.label}
        </div>
        <div style={{ fontSize: 10, color: "#506070", fontFamily: "monospace" }}>{topic.internet}</div>
      </div>
      {active && <div style={{ width: 8, height: 8, borderRadius: "50%", background: topic.color, boxShadow: `0 0 6px ${topic.color}` }} />}
    </div>
  );
}

function StatCard({ icon, label, value, color }) {
  return (
    <div style={{ background: "#020a15", border: `1px solid ${color}44`, borderRadius: 16, padding: "18px 20px", boxShadow: `0 0 18px ${color}22`, flex: 1, minWidth: 130 }}>
      <div style={{ fontSize: 28, marginBottom: 10 }}>{icon}</div>
      <div style={{ fontFamily: "'Orbitron',sans-serif", fontSize: 22, fontWeight: 700, color, ...textGlow(color) }}>{value}</div>
      <div style={{ fontFamily: "'Exo 2',sans-serif", fontSize: 11, color: "#607080", marginTop: 6 }}>{label}</div>
    </div>
  );
}

export default function GRTNexusTerminal() {
  const [tab, setTab] = useState("dashboard");
  const [activeTopic, setActiveTopic] = useState(TOPICS[0]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Welcome to GRT Nexus Terminal. I am your AI-powered engineering and education assistant. Select a topic from the sidebar or ask me anything about engineering, research, innovation, or your studies. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [authRole, setAuthRole] = useState("student");
  const [alertsOpen, setAlertsOpen] = useState(false);
  const [searchQ, setSearchQ] = useState("");
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = useCallback(async () => {
    const msg = input.trim();
    if (!msg || loading) return;
    setInput("");
    const topicCtx = activeTopic ? `The user is studying ${activeTopic.label} (Internet features: ${activeTopic.internet}). ` : "";
    const newMsgs = [...messages, { role: "user", content: msg }];
    setMessages(newMsgs);
    setLoading(true);

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: `You are the GRT Nexus Terminal AI — an expert educational assistant for the platform grtgod.edu.ai. You serve students, companies, and researchers across all engineering disciplines.

${topicCtx}
Your role encompasses:
- Engineering education across all fields (CS, EE, ME, Civil, Biomedical, Aerospace, Automotive, Energy, Chemical, Industrial, Telecom)
- Research guidance and innovation support
- Competition preparation and strategy
- Work system analysis and architecture
- AI-powered learning and suggestions
- Career guidance connecting students with companies
- Policy and authorization explanations

Rules:
- Always be precise, educational, and forward-thinking
- Connect topics to internet technologies and AI applications
- Suggest next learning steps when relevant
- Keep responses structured and actionable
- Use engineering terminology appropriately
- Support both students and company professionals

Platform: GRT God of Internet | Domain: grtgod.edu.ai | Built on AI + Education + Competition`,
          messages: newMsgs.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      const data = await res.json();
      const reply = data.content?.find((b) => b.type === "text")?.text || "Unable to get response.";
      setMessages((prev) => [...prev, { role: "assistant", content: reply }] );
    } catch (error) {
      setMessages((prev) => [...prev, { role: "assistant", content: "Connection error. Please check your network and try again." }]);
    } finally {
      setLoading(false);
    }
  }, [input, loading, messages, activeTopic]);

  const filtered = TOPICS.filter((t) => !searchQ || t.label.toLowerCase().includes(searchQ.toLowerCase()));

  const S = {
    outer: {
      display: "flex",
      flexDirection: "column",
      height: "100vh",
      background: "#000",
      fontFamily: "'Exo 2',sans-serif",
      overflow: "hidden",
    },
    header: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 20px",
      height: 64,
      background: "linear-gradient(90deg, #000810 0%, #001428 50%, #000810 100%)",
      borderBottom: "1px solid #00d4ff33",
      boxShadow: "0 2px 20px #00d4ff22",
      flexShrink: 0,
      zIndex: 100,
      position: "relative",
    },
    body: {
      display: "flex",
      flex: 1,
      overflow: "hidden",
    },
    sidebar: {
      width: sidebarOpen ? 250 : 56,
      background: "#020a15",
      borderRight: "1px solid #00d4ff22",
      display: "flex",
      flexDirection: "column",
      transition: "width 0.25s cubic-bezier(0.4,0,0.2,1)",
      overflow: "hidden",
      flexShrink: 0,
    },
    main: {
      flex: 1,
      overflow: "auto",
      display: "flex",
      flexDirection: "column",
      background: "linear-gradient(180deg, #020a15 0%, #030d1f 100%)",
    },
    tabBar: {
      display: "flex",
      gap: 4,
      padding: "12px 20px",
      borderBottom: "1px solid #00d4ff22",
      background: "#010c1a",
      flexShrink: 0,
      overflowX: "auto",
    },
  };

  const tabBtn = (id, icon, label) => {
    const active = tab === id;
    return (
      <button
        key={id}
        onClick={() => setTab(id)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          padding: "10px 14px",
          borderRadius: "10px 10px 0 0",
          border: "none",
          cursor: "pointer",
          background: active ? "#021a30" : "transparent",
          color: active ? "#00d4ff" : "#5f7e9d",
          fontFamily: "'Exo 2',sans-serif",
          fontWeight: 600,
          fontSize: 12,
          borderTop: active ? "2px solid #00d4ff" : "2px solid transparent",
          whiteSpace: "nowrap",
          transition: "all 0.2s",
        }}
      >
        <span style={{ fontSize: 14 }}>{icon}</span>
        {label}
      </button>
    );
  };

  const renderSidebarContent = () => (
    <div style={{ padding: sidebarOpen ? 18 : 12, display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
        <button
          onClick={() => setSidebarOpen((o) => !o)}
          style={{ background: "none", border: "none", cursor: "pointer", color: "#00d4ff", fontSize: 18, padding: 6, borderRadius: 8 }}
        >
          ☰
        </button>
        {sidebarOpen && <div style={{ fontFamily: "'Orbitron',sans-serif", color: "#00d4ff", fontSize: 11 }}>Topics</div>}
      </div>
      {sidebarOpen && (
        <input
          value={searchQ}
          onChange={(e) => setSearchQ(e.target.value)}
          placeholder="Search topics..."
          style={{ width: "100%", padding: "10px 12px", borderRadius: 12, border: "1px solid #00d4ff22", background: "#01111f", color: "#e6f5ff", fontSize: 12 }}
        />
      )}
      <div style={{ display: "grid", gap: 8, flex: 1, overflowY: "auto", paddingRight: 4 }}>
        {filtered.map((topic) => (
          <TopicCard key={topic.id} topic={topic} onClick={setActiveTopic} active={activeTopic?.id === topic.id} />
        ))}
      </div>
      {sidebarOpen && (
        <div style={{ padding: 14, borderRadius: 16, background: "#010c1a", border: "1px solid #00d4ff22" }}>
          <div style={{ fontSize: 11, color: "#7fabc6", marginBottom: 6 }}>Selected</div>
          <div style={{ fontSize: 14, color: "#fff", fontWeight: 700 }}>{activeTopic?.label}</div>
          <div style={{ fontSize: 11, color: "#82c3ff", marginTop: 6 }}>{activeTopic?.desc}</div>
        </div>
      )}
    </div>
  );

  const renderChatMessages = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, padding: 20 }}>
      {messages.map((message, index) => (
        <div
          key={`${message.role}-${index}`}
          style={{
            alignSelf: message.role === "assistant" ? "flex-start" : "flex-end",
            maxWidth: "82%",
            background: message.role === "assistant" ? "#071c30" : "#00242f",
            border: "1px solid rgba(0, 212, 255, 0.18)",
            borderRadius: 16,
            padding: "14px 16px",
            boxShadow: message.role === "assistant" ? "0 0 16px rgba(0, 212, 255, 0.08)" : "0 0 14px rgba(14, 178, 255, 0.08)",
          }}
        >
          <div style={{ fontFamily: "'Orbitron',sans-serif", fontSize: 11, textTransform: "uppercase", letterSpacing: 0.8, color: "#6ea3c6", marginBottom: 8 }}>
            {message.role === "assistant" ? "GRT Nexus" : authRole.charAt(0).toUpperCase() + authRole.slice(1)}
          </div>
          <div style={{ fontSize: 13, lineHeight: 1.6, color: "#d9e9ff" }}>{message.content}</div>
        </div>
      ))}
      <div ref={chatEndRef} />
    </div>
  );

  const renderDashboard = () => (
    <div style={{ padding: 20, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
      <StatCard icon="📈" label="Learning Progress" value="84%" color="#00d4ff" />
      <StatCard icon="🧠" label="AI Insights" value="12" color="#2ecc71" />
      <StatCard icon="🚨" label="Alerts Today" value="4" color="#ff6b35" />
      <StatCard icon="🛰️" label="Live Topics" value={TOPICS.length.toString()} color="#9b59b6" />
      <div style={{ gridColumn: "1 / -1", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div style={{ background: "#020a15", border: "1px solid #00d4ff22", borderRadius: 18, padding: 20 }}>
          <div style={{ fontSize: 12, letterSpacing: 1.2, color: "#82c3ff", marginBottom: 10 }}>Active Work Systems</div>
          <div style={{ display: "grid", gap: 10 }}>
            {WORK_SYSTEMS.slice(0, 6).map((system) => (
              <div key={system.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 12px", borderRadius: 14, background: "#01111f" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span>{system.icon}</span>
                  <div>
                    <div style={{ color: "#eaf4ff", fontSize: 13, fontWeight: 600 }}>{system.label}</div>
                    <div style={{ fontSize: 10, color: "#7c9db7" }}>{system.status}</div>
                  </div>
                </div>
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: system.color }} />
              </div>
            ))}
          </div>
        </div>
        <div style={{ background: "#020a15", border: "1px solid #00d4ff22", borderRadius: 18, padding: 20 }}>
          <div style={{ fontSize: 12, letterSpacing: 1.2, color: "#82c3ff", marginBottom: 10 }}>Recent Alerts</div>
          <div style={{ display: "grid", gap: 10 }}>
            {SAMPLE_ALERTS.map((alert) => (
              <div key={alert.id} style={{ padding: "12px 14px", borderRadius: 14, background: "#01111f", border: "1px solid #ffffff10" }}>
                <div style={{ fontSize: 12, color: "#c8def8", fontWeight: 600 }}>{alert.msg}</div>
                <div style={{ fontSize: 10, color: "#7b97b0", marginTop: 6 }}>{alert.time}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderPolicies = () => (
    <div style={{ padding: 20, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16 }}>
      {POLICIES.map((policy) => (
        <div key={policy.id} style={{ background: "#020a15", border: "1px solid #00d4ff22", borderRadius: 18, padding: 20 }}>
          <div style={{ fontSize: 12, color: policy.level === "Critical" ? "#ff6b35" : "#7bd18f", fontWeight: 700, marginBottom: 8 }}>{policy.level}</div>
          <div style={{ fontSize: 15, color: "#eaf4ff", fontWeight: 700, marginBottom: 6 }}>{policy.title}</div>
          <div style={{ fontSize: 11, color: "#7c9db7" }}>{policy.scope}</div>
          <div style={{ marginTop: 10, fontSize: 11, color: "#82c3ff" }}>{policy.status}</div>
        </div>
      ))}
    </div>
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Exo+2:wght@300;400;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; scrollbar-width: thin; scrollbar-color: #00d4ff33 #000810; }
        ::-webkit-scrollbar { width: 8px; height: 8px; }
        ::-webkit-scrollbar-track { background: #000810; }
        ::-webkit-scrollbar-thumb { background: #00d4ff44; border-radius: 999px; }
        @keyframes pulse { 0%,100%{opacity:0.3;transform:scale(0.8);} 50%{opacity:1;transform:scale(1);} }
      `}</style>
      <div style={S.outer}>
        <div style={S.header}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <button
              onClick={() => setSidebarOpen((o) => !o)}
              style={{ background: "none", border: "none", cursor: "pointer", color: "#00d4ff", fontSize: 18, padding: 6, borderRadius: 8 }}
            >
              ☰
            </button>
            <GRTLogo size={40} />
            <div style={{ fontSize: 10, fontFamily: "monospace", color: "#304050", borderLeft: "1px solid #002040", paddingLeft: 12, lineHeight: 1.6 }}>
              <div style={{ color: "#00d4ff99" }}>grtgod.edu.ai</div>
              <div>GRT God of Internet</div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <select
              value={authRole}
              onChange={(e) => setAuthRole(e.target.value)}
              style={{ background: "#010c1a", border: "1px solid #00d4ff44", color: "#00d4ff", padding: "6px 12px", borderRadius: 8, fontSize: 12, fontFamily: "'Exo 2',sans-serif", cursor: "pointer" }}
            >
              <option value="student">🎓 Student</option>
              <option value="company">🏢 Company</option>
              <option value="researcher">🔬 Researcher</option>
              <option value="admin">🛡️ Admin</option>
            </select>
            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 12px", borderRadius: 20, background: "#001a0d", border: "1px solid #00ff8844", fontSize: 12, color: "#00ff88" }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#00ff88", animation: "pulse 2s infinite" }} />
              ONLINE
            </div>
            <div style={{ position: "relative" }}>
              <button
                onClick={() => setAlertsOpen((o) => !o)}
                style={{ background: "#0a0500", border: "1px solid #ffa50066", color: "#ffa500", borderRadius: 10, padding: "8px 12px", cursor: "pointer", fontSize: 12, fontFamily: "'Exo 2',sans-serif", display: "flex", alignItems: "center", gap: 8 }}
              >
                🔔
                <span style={{ background: "#ff3355", color: "#fff", borderRadius: "50%", width: 18, height: 18, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700 }}>
                  {SAMPLE_ALERTS.length}
                </span>
              </button>
              {alertsOpen && (
                <div style={{ position: "absolute", top: "calc(100% + 10px)", right: 0, width: 320, background: "#010c1a", border: "1px solid #00d4ff44", borderRadius: 16, boxShadow: "0 16px 40px rgba(0,0,0,0.35)", zIndex: 200 }}>
                  <div style={{ padding: "14px 16px", borderBottom: "1px solid #00d4ff22", fontSize: 12, color: "#00d4ff", fontWeight: 700 }}>
                    System Alerts
                  </div>
                  {SAMPLE_ALERTS.map((alert) => (
                    <div key={alert.id} style={{ padding: "12px 16px", borderBottom: "1px solid #ffffff08", fontSize: 12, color: "#d8e8ff" }}>
                      <div>{alert.msg}</div>
                      <div style={{ marginTop: 6, color: "#7b97b0", fontSize: 11 }}>{alert.time}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        <div style={S.body}>
          <div style={S.sidebar}>{renderSidebarContent()}</div>
          <div style={S.main}>
            <div style={S.tabBar}>
              {tabBtn("dashboard", "📊", "Dashboard")}
              {tabBtn("chat", "💬", "Chat")}
              {tabBtn("policies", "📜", "Policies")}
              {tabBtn("systems", "⚙️", "Work Systems")}
            </div>
            <div style={{ flex: 1, overflow: "auto" }}>
              {tab === "dashboard" && renderDashboard()}
              {tab === "chat" && (
                <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
                  <div style={{ flex: 1, overflowY: "auto", minHeight: 0 }}>{renderChatMessages()}</div>
                  <div style={{ padding: 18, background: "#010c1a", borderTop: "1px solid #00d4ff22" }}>
                    <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                      <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                        placeholder="Ask the GRT Nexus AI about your studies or projects..."
                        style={{ flex: 1, padding: "14px 16px", borderRadius: 16, border: "1px solid #00d4ff22", background: "#021324", color: "#e8f6ff", fontSize: 14 }}
                      />
                      <button
                        onClick={sendMessage}
                        disabled={loading}
                        style={{ padding: "14px 18px", borderRadius: 16, border: "none", background: "#00d4ff", color: "#001223", fontWeight: 700, cursor: "pointer", minWidth: 120 }}
                      >
                        {loading ? "Sending..." : "Send"}
                      </button>
                    </div>
                    {loading && <TypingDots />}
                  </div>
                </div>
              )}
              {tab === "policies" && renderPolicies()}
              {tab === "systems" && (
                <div style={{ padding: 20, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16 }}>
                  {WORK_SYSTEMS.map((system) => (
                    <div key={system.id} style={{ background: "#020a15", border: "1px solid #00d4ff22", borderRadius: 18, padding: 20, display: "flex", flexDirection: "column", gap: 10 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={{ fontSize: 20 }}>{system.icon}</div>
                        <div>
                          <div style={{ fontSize: 15, color: "#fff", fontWeight: 700 }}>{system.label}</div>
                          <div style={{ fontSize: 11, color: "#7b97b0" }}>{system.status}</div>
                        </div>
                      </div>
                      <div style={{ fontSize: 12, color: "#82c3ff" }}>{system.color ? `Primary accent: ${system.color}` : "System active"}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
