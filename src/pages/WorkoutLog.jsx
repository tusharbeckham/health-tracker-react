import { useState } from "react";
import { Dumbbell, Flame, CheckCircle, Clock } from "lucide-react";

// MET values — accurate calorie calculation
const exerciseMET = {
  running: 9.8,
  walking: 3.5,
  cycling: 7.5,
  swimming: 8.0,
  "jump rope": 12.3,
  yoga: 3.0,
  gym: 5.0,
  "weight training": 5.0,
  hiit: 10.0,
  football: 8.0,
  basketball: 8.0,
  cricket: 5.0,
  badminton: 7.0,
  dancing: 5.5,
  "climbing stairs": 8.0,
  default: 5.0,
};

function getCalories(exerciseName, durationMins) {
  const weight = Number(localStorage.getItem("profile_weight")) || 70;
  const name = exerciseName.toLowerCase();
  let met = exerciseMET.default;

  for (const key in exerciseMET) {
    if (name.includes(key)) {
      met = exerciseMET[key];
      break;
    }
  }

  // Formula: Calories = MET × weight(kg) × duration(hours)
  return Math.round(met * weight * (durationMins / 60));
}

function WorkoutLog() {
  const [workouts, setWorkouts] = useState(
    () => JSON.parse(localStorage.getItem("workouts")) || [],
  );
  const [totalCal, setTotalCal] = useState(
    () => Number(localStorage.getItem("totalCalories")) || 0,
  );
  const [name, setName] = useState("");
  const [duration, setDuration] = useState("");

  const calGoal = Number(localStorage.getItem("goal_calories")) || 500;
  const isGoalDone = totalCal >= calGoal;

  function addWorkout() {
    if (name === "") {
      alert("Please enter exercise name!");
      return;
    }
    if (Number(duration) < 1 || Number(duration) > 300) {
      alert("Duration must be between 1 and 300 minutes!");
      return;
    }

    const calories = getCalories(name, Number(duration));
    const newWorkouts = [
      ...workouts,
      { name, duration: Number(duration), calories },
    ];
    const newTotal = totalCal + calories;

    setWorkouts(newWorkouts);
    setTotalCal(newTotal);
    localStorage.setItem("workouts", JSON.stringify(newWorkouts));
    localStorage.setItem("totalCalories", newTotal);
    setName("");
    setDuration("");
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
        placeholder="Exercise (e.g. Running, Yoga, Gym)"
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

      <div style={{ position: "relative", marginBottom: "10px" }}>
        <input
          type="number"
          placeholder="Duration (minutes)"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          min={1}
          max={300}
          style={{
            width: "100%",
            padding: "13px 16px",
            background: "#111",
            border: "1px solid #222",
            borderRadius: "14px",
            color: "#fff",
            fontSize: "1rem",
            outline: "none",
          }}
        />
        <Clock
          size={16}
          color="#555"
          style={{
            position: "absolute",
            right: "16px",
            top: "50%",
            transform: "translateY(-50%)",
          }}
        />
      </div>

      {name && duration && (
        <p
          style={{
            fontSize: "0.8rem",
            color: "#ff9f0a",
            marginBottom: "10px",
            textAlign: "center",
          }}
        >
          ≈ {getCalories(name, Number(duration))} calories will be burned
        </p>
      )}

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
              alignItems: "center",
              border: "1px solid #222",
            }}
          >
            <div>
              <span style={{ color: "#ccc", fontSize: "0.9rem" }}>
                {w.name}
              </span>
              <p
                style={{ color: "#555", fontSize: "0.75rem", marginTop: "2px" }}
              >
                {w.duration} mins
              </p>
            </div>
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
