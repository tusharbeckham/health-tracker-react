import { useState } from "react";

function WorkoutLog() {
  const [workouts, setWorkouts] = useState([]);
  const [totalCal, setTotalCal] = useState(0);
  const [name, setName] = useState("");
  const [cal, setCal] = useState("");

  function addWorkout() {
    if (name === "" || Number(cal) <= 0) {
      alert("Please enter valid exercise and calories!");
      return;
    }
    setWorkouts([...workouts, { name, calories: Number(cal) }]);
    setTotalCal(totalCal + Number(cal));
    setName("");
    setCal("");
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
        Workout Log
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
            color: totalCal > 0 ? "#ff9f0a" : "#fff",
            lineHeight: 1,
          }}
        >
          {totalCal}
        </span>
        <span style={{ fontSize: "1rem", color: "#444" }}>cal burned</span>
      </div>
      <input
        type="text"
        placeholder="Exercise name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{
          width: "100%",
          padding: "13px 16px",
          background: "#111",
          border: "1px solid #222",
          borderRadius: "14px",
          color: "#fff",
          fontSize: "1rem",
          marginBottom: "10px",
          outline: "none",
        }}
      />
      <input
        type="number"
        placeholder="Calories burned"
        value={cal}
        onChange={(e) => setCal(e.target.value)}
        style={{
          width: "100%",
          padding: "13px 16px",
          background: "#111",
          border: "1px solid #222",
          borderRadius: "14px",
          color: "#fff",
          fontSize: "1rem",
          marginBottom: "10px",
          outline: "none",
        }}
      />
      <button
        onClick={addWorkout}
        style={{
          width: "100%",
          padding: "14px",
          background: "linear-gradient(135deg, #ff9f0a, #cc7a00)",
          border: "none",
          borderRadius: "14px",
          color: "#000",
          fontSize: "1rem",
          fontWeight: "700",
          cursor: "pointer",
          boxShadow: "0 4px 20px rgba(255, 159, 10, 0.3)",
        }}
      >
        Log Workout
      </button>
      <div style={{ marginTop: "14px" }}>
        {workouts.map((w, i) => (
          <div
            key={i}
            style={{
              background: "#111",
              padding: "12px 16px",
              borderRadius: "14px",
              marginBottom: "8px",
              display: "flex",
              justifyContent: "space-between",
              border: "1px solid #222",
            }}
          >
            <span style={{ color: "#ccc" }}>{w.name}</span>
            <span style={{ color: "#ff9f0a", fontWeight: "700" }}>
              {w.calories} cal
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WorkoutLog;
