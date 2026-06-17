export default function StatCard({ icon, label, value, color }) {
  return (
    <div style={{ background: "#020a15", border: `1px solid ${color}22`, borderRadius: 18, padding: 20, minHeight: 120, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
      <div style={{ fontSize: 28 }}>{icon}</div>
      <div>
        <div style={{ fontFamily: "'Orbitron',sans-serif", fontSize: 22, fontWeight: 700, color }}>{value}</div>
        <div style={{ fontSize: 12, color: "#7c9db7", marginTop: 6 }}>{label}</div>
      </div>
    </div>
  );
}
