import { useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import { Dumbbell, Flame, CheckCircle, Clock, ChevronDown } from "lucide-react";

const exerciseList = [
  // Cardio
  { name: "Running (8 km/h)", met: 8.3, category: "Cardio" },
  { name: "Running (12 km/h)", met: 11.5, category: "Cardio" },
  { name: "Walking (5 km/h)", met: 3.5, category: "Cardio" },
  { name: "Brisk Walk", met: 4.5, category: "Cardio" },
  { name: "Cycling (moderate)", met: 7.5, category: "Cardio" },
  { name: "Cycling (fast)", met: 10.0, category: "Cardio" },
  { name: "Jump Rope", met: 12.3, category: "Cardio" },
  { name: "Swimming", met: 8.0, category: "Cardio" },
  { name: "Rowing", met: 7.0, category: "Cardio" },
  { name: "Stair Climbing", met: 8.0, category: "Cardio" },
  { name: "Elliptical", met: 6.0, category: "Cardio" },
  { name: "Treadmill", met: 8.0, category: "Cardio" },
  // Strength
  { name: "Weight Training", met: 5.0, category: "Strength" },
  { name: "Powerlifting", met: 6.0, category: "Strength" },
  { name: "Bodyweight (Push-ups etc)", met: 4.5, category: "Strength" },
  { name: "Kettlebell", met: 8.0, category: "Strength" },
  { name: "CrossFit", met: 10.0, category: "Strength" },
  // HIIT
  { name: "HIIT", met: 10.0, category: "HIIT" },
  { name: "Tabata", met: 11.0, category: "HIIT" },
  { name: "Circuit Training", met: 8.0, category: "HIIT" },
  // Sports
  { name: "Football", met: 8.0, category: "Sports" },
  { name: "Basketball", met: 8.0, category: "Sports" },
  { name: "Cricket", met: 5.0, category: "Sports" },
  { name: "Badminton", met: 7.0, category: "Sports" },
  { name: "Tennis", met: 8.0, category: "Sports" },
  { name: "Volleyball", met: 6.0, category: "Sports" },
  { name: "Table Tennis", met: 4.5, category: "Sports" },
  // Mind-Body
  { name: "Yoga", met: 3.0, category: "Mind-Body" },
  { name: "Pilates", met: 3.5, category: "Mind-Body" },
  { name: "Stretching", met: 2.5, category: "Mind-Body" },
  { name: "Meditation", met: 1.5, category: "Mind-Body" },
  // Other
  { name: "Dancing", met: 5.5, category: "Other" },
  { name: "Martial Arts", met: 10.0, category: "Other" },
  { name: "Boxing", met: 9.0, category: "Other" },
  { name: "Rock Climbing", met: 8.0, category: "Other" },
  { name: "Hiking", met: 6.0, category: "Other" },
  { name: "Zumba", met: 6.5, category: "Other" },
];

function getCalories(exerciseName, durationMins) {
  const weight = Number(localStorage.getItem("profile_weight")) || 70;
  const found = exerciseList.find((e) => e.name === exerciseName);
  const met = found ? found.met : 5.0;
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
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const calGoal = Number(localStorage.getItem("goal_calories")) || 500;
  const isGoalDone = totalCal >= calGoal;

  const categories = ["All", ...new Set(exerciseList.map((e) => e.category))];
  const filteredExercises =
    selectedCategory === "All"
      ? exerciseList
      : exerciseList.filter((e) => e.category === selectedCategory);

  const previewCal =
    name && duration ? getCalories(name, Number(duration)) : null;

  const calBarWidth = useSpring({
    width: `${Math.min((totalCal / calGoal) * 100, 100)}%`,
    config: { tension: 120, friction: 20 },
  });

  function addWorkout() {
    if (name === "") {
      alert("Please select an exercise!");
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
        background: "var(--card)",
        borderRadius: "24px",
        padding: "22px",
        marginBottom: "14px",
        border: "1px solid var(--border)",
      }}
    >
      <p
        style={{
          fontSize: "0.7rem",
          color: "var(--muted)",
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
          marginBottom: "10px",
        }}
      >
        <span
          style={{
            fontSize: "3rem",
            fontWeight: "800",
            color: isGoalDone ? "#ff9f0a" : "var(--text)",
            lineHeight: 1,
          }}
        >
          {totalCal}
        </span>
        <span style={{ fontSize: "1rem", color: "var(--muted)" }}>
          / {calGoal} cal
        </span>
        {isGoalDone && <CheckCircle size={24} color="#ff9f0a" />}
      </div>

      {/* Animated progress bar */}
      <div
        style={{
          background: "var(--input-bg)",
          borderRadius: "99px",
          height: "5px",
          marginBottom: "16px",
          overflow: "hidden",
        }}
      >
        <animated.div
          style={{
            ...calBarWidth,
            height: "100%",
            background: isGoalDone
              ? "#ff9f0a"
              : "linear-gradient(90deg, #ff9f0a, #ffcc00)",
            borderRadius: "99px",
            boxShadow: "0 0 8px rgba(255,159,10,0.5)",
          }}
        />
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

      {/* Exercise selector */}
      <div style={{ position: "relative", marginBottom: "10px" }}>
        <div
          onClick={() => setShowDropdown(!showDropdown)}
          style={{
            width: "100%",
            padding: "13px 16px",
            background: "var(--input-bg)",
            border: "1px solid var(--input-border)",
            borderRadius: "14px",
            color: name ? "var(--text)" : "var(--muted)",
            fontSize: "1rem",
            cursor: "pointer",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {name || "Select Exercise"}
          <ChevronDown size={16} color="var(--muted)" />
        </div>

        {showDropdown && (
          <div
            style={{
              position: "absolute",
              top: "100%",
              left: 0,
              right: 0,
              background: "#1c1c1e",
              border: "1px solid #2a2a2a",
              borderRadius: "14px",
              zIndex: 50,
              maxHeight: "280px",
              overflow: "hidden",
              marginTop: "6px",
              boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
            }}
          >
            {/* Category filter */}
            <div
              style={{
                display: "flex",
                gap: "6px",
                padding: "10px",
                overflowX: "auto",
                borderBottom: "1px solid #2a2a2a",
              }}
            >
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    padding: "4px 12px",
                    borderRadius: "99px",
                    border: "none",
                    background:
                      selectedCategory === cat ? "#ff9f0a" : "#2a2a2a",
                    color: selectedCategory === cat ? "#000" : "#888",
                    fontSize: "0.75rem",
                    fontWeight: "600",
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
            {/* Exercise list */}
            <div style={{ overflowY: "auto", maxHeight: "200px" }}>
              {filteredExercises.map((ex) => (
                <div
                  key={ex.name}
                  onClick={() => {
                    setName(ex.name);
                    setShowDropdown(false);
                  }}
                  style={{
                    padding: "12px 16px",
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderBottom: "1px solid #1a1a1a",
                  }}
                >
                  <span style={{ color: "#ccc", fontSize: "0.9rem" }}>
                    {ex.name}
                  </span>
                  <span style={{ color: "#ff9f0a", fontSize: "0.75rem" }}>
                    MET {ex.met}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Duration input */}
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
            background: "var(--input-bg)",
            border: "1px solid var(--input-border)",
            borderRadius: "14px",
            color: "var(--text)",
            fontSize: "1rem",
            outline: "none",
          }}
        />
        <Clock
          size={16}
          color="var(--muted)"
          style={{
            position: "absolute",
            right: "16px",
            top: "50%",
            transform: "translateY(-50%)",
          }}
        />
      </div>

      {/* Preview calories */}
      {previewCal && (
        <p
          style={{
            fontSize: "0.85rem",
            color: "#ff9f0a",
            marginBottom: "10px",
            textAlign: "center",
            fontWeight: "600",
          }}
        >
          ≈ {previewCal} calories will be burned
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
              background: "var(--input-bg)",
              padding: "12px 16px",
              borderRadius: "14px",
              marginBottom: "8px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              border: "1px solid var(--input-border)",
            }}
          >
            <div>
              <span style={{ color: "var(--text)", fontSize: "0.9rem" }}>
                {w.name}
              </span>
              <p
                style={{
                  color: "var(--muted)",
                  fontSize: "0.75rem",
                  marginTop: "2px",
                }}
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
