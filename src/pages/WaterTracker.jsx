import { useState } from "react";

function WaterTracker() {
  const [water, setWater] = useState(
    () => Number(localStorage.getItem("water")) || 0,
  );
  const goal = 8;

  function addGlass() {
    if (water < goal) {
      const newWater = water + 1;
      setWater(newWater);
      localStorage.setItem("water", newWater);
    }
  }

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #1a1a1a, #1c1c1e)",
        borderRadius: "24px",
        padding: "22px",
        marginBottom: "14px",
        border: "1px solid #2a2a2a",
      }}
    >
      <p
        style={{
          fontSize: "0.7rem",
          color: "#555",
          textTransform: "uppercase",
          letterSpacing: "2px",
          marginBottom: "6px",
        }}
      >
        Water Intake
      </p>
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: "8px",
          marginBottom: "16px",
        }}
      >
        <span
          style={{
            fontSize: "3rem",
            fontWeight: "800",
            color: water >= goal ? "#0a84ff" : "#fff",
            lineHeight: 1,
          }}
        >
          {water}
        </span>
        <span style={{ fontSize: "1rem", color: "#444" }}>/ 8 glasses</span>
        {water >= goal && <span>✅</span>}
      </div>
      <div style={{ display: "flex", gap: "6px", marginBottom: "16px" }}>
        {Array.from({ length: goal }).map((_, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              height: "6px",
              borderRadius: "99px",
              background: i < water ? "#0a84ff" : "#111",
              transition: "background 0.3s ease",
              boxShadow: i < water ? "0 0 8px rgba(10, 132, 255, 0.5)" : "none",
            }}
          ></div>
        ))}
      </div>
      <button
        onClick={addGlass}
        style={{
          width: "100%",
          padding: "14px",
          background: "linear-gradient(135deg, #0a84ff, #0066cc)",
          border: "none",
          borderRadius: "14px",
          color: "#fff",
          fontSize: "1rem",
          fontWeight: "700",
          cursor: "pointer",
          boxShadow: "0 4px 20px rgba(10, 132, 255, 0.3)",
        }}
      >
        + Add Glass
      </button>
    </div>
  );
}

export default WaterTracker;
