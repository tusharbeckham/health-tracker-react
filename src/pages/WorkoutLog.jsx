import { useState } from "react";
import { Dumbbell, Flame, CheckCircle } from "lucide-react";

function WorkoutLog() {
  const [workouts, setWorkouts] = useState(
    () => JSON.parse(localStorage.getItem("workouts")) || [],
  );
  const [totalCal, setTotalCal] = useState(
    () => Number(localStorage.getItem("totalCalories")) || 0,
  );
  const [name, setName] = useState("");
  const [cal, setCal] = useState("");

  const calGoal = Number(localStorage.getItem("goal_calories")) || 500;
  const isGoalDone = totalCal >= calGoal;

  function addWorkout() {
    if (name === "" || Number(cal) <= 0) {
      alert("Please enter valid exercise and calories!");
      return;
    }
    const newWorkouts = [...workouts, { name, calories: Number(cal) }];
    const newTotal = totalCal + Number(cal);
    setWorkouts(newWorkouts);
    setTotalCal(newTotal);
    localStorage.setItem("workouts", JSON.stringify(newWorkouts));
    localStorage.setItem("totalCalories", newTotal);
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
          alignItems: "center",
          gap: "10px",
          marginBottom: "16px",
        }}
      >
        <span
          style={{
            fontSize: "3rem",
            fontWeight: "800",
            color: isGoalDone ? "#ff9f0a" : "#fff",
            lineHeight: 1,
          }}
        >
          {totalCal}
        </span>
        <span style={{ fontSize: "1rem", color: "#444" }}>/ {calGoal} cal</span>
        {isGoalDone && <CheckCircle size={24} color="#ff9f0a" />}
      </div>

      {isGoalDone && (
        <div
          style={{
            background: "#1a1200",
            border: "1px solid #ff9f0a",
            borderRadius: "14px",
            padding: "12px 16px",
            marginBottom: "14px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <Flame size={18} color="#ff9f0a" />
          <span
            style={{ color: "#ff9f0a", fontSize: "0.9rem", fontWeight: "600" }}
          >
            Calorie goal reached!
          </span>
        </div>
      )}

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
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
          }}
        >
          <Dumbbell size={18} />
          Log Workout
        </div>
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
