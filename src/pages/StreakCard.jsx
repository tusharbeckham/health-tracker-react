import { Flame } from "lucide-react";

function StreakCard() {
  const days = ["M", "T", "W", "T", "F", "S", "S"];
  const todayIndex = new Date().getDay() === 0 ? 6 : new Date().getDay() - 1;
  const streak = 1;

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
        Current Streak
      </p>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginBottom: "20px",
        }}
      >
        <Flame size={36} color="#ff9f0a" />
        <span
          style={{
            fontSize: "3rem",
            fontWeight: "800",
            color: "#ff9f0a",
            lineHeight: 1,
          }}
        >
          {streak}
        </span>
        <span style={{ fontSize: "1rem", color: "#444" }}>
          {streak === 1 ? "day" : "days"}
        </span>
      </div>
      <div
        style={{ display: "flex", justifyContent: "space-between", gap: "6px" }}
      >
        {days.map((day, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "8px",
              flex: 1,
            }}
          >
            <div
              style={{
                width: "100%",
                aspectRatio: "1",
                borderRadius: "50%",
                background:
                  i <= todayIndex && i > todayIndex - streak
                    ? "linear-gradient(135deg, #ff9f0a, #cc7a00)"
                    : "#111",
                border: "1px solid",
                borderColor:
                  i <= todayIndex && i > todayIndex - streak
                    ? "#ff9f0a"
                    : "#222",
                boxShadow:
                  i <= todayIndex && i > todayIndex - streak
                    ? "0 0 12px rgba(255,159,10,0.4)"
                    : "none",
              }}
            ></div>
            <span style={{ fontSize: "0.65rem", color: "#444" }}>{day}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StreakCard;
