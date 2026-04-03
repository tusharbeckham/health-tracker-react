import { useState, useEffect, useRef } from "react";
import { Footprints, Trophy } from "lucide-react";

function StepCounter() {
  const [steps, setSteps] = useState(
    () => Number(localStorage.getItem("steps")) || 0,
  );
  const goal = Number(localStorage.getItem("goal_steps")) || 10000;

  const kms = (steps * 0.000762).toFixed(2);
  const calories = Math.round(steps * 0.04);

  const lastAccRef = useRef(0);
  const lastStepRef = useRef(0);
  const stepBufferRef = useRef([]);

  // Save derived values to localStorage
  useEffect(() => {
    localStorage.setItem("kms", kms);
    localStorage.setItem("stepCalories", calories);
  }, [steps, kms, calories]);

  // Device Motion Logic
  useEffect(() => {
    function handleMotion(event) {
      const acc = event.accelerationIncludingGravity;
      if (!acc) return;

      const magnitude = Math.sqrt(acc.x ** 2 + acc.y ** 2 + acc.z ** 2);
      stepBufferRef.current.push(magnitude);

      if (stepBufferRef.current.length > 6) stepBufferRef.current.shift();

      const avg =
        stepBufferRef.current.reduce((a, b) => a + b, 0) /
        stepBufferRef.current.length;
      const delta = Math.abs(avg - lastAccRef.current);
      const now = Date.now();

      if (delta > 2.8 && delta < 18 && now - lastStepRef.current > 450) {
        lastStepRef.current = now;
        setSteps((prev) => {
          const newSteps = prev + 1;
          localStorage.setItem("steps", newSteps);
          return newSteps;
        });
      }
      lastAccRef.current = avg;
    }

    function startMotion() {
      window.addEventListener("devicemotion", handleMotion);
    }

    if (
      typeof DeviceMotionEvent !== "undefined" &&
      typeof DeviceMotionEvent.requestPermission === "function"
    ) {
      DeviceMotionEvent.requestPermission()
        .then((response) => {
          if (response === "granted") startMotion();
        })
        .catch(() => startMotion());
    } else {
      startMotion();
    }

    return () => window.removeEventListener("devicemotion", handleMotion);
  }, []);

  const percent = Math.min((steps / goal) * 100, 100);
  const isGoalDone = steps >= goal;

  return (
    <div className="card">
      <p className="card-label">Steps Today</p>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginBottom: "8px",
        }}
      >
        <span
          style={{
            fontSize: "3rem",
            fontWeight: "800",
            color: isGoalDone ? "#30d158" : "var(--text)",
            lineHeight: 1,
          }}
        >
          {steps.toLocaleString()}
        </span>
        <span style={{ fontSize: "1rem", color: "var(--muted)" }}>
          / {goal.toLocaleString()}
        </span>
        {isGoalDone && <Trophy size={24} color="#30d158" />}
      </div>

      <div style={{ display: "flex", gap: "12px", marginBottom: "14px" }}>
        <div
          style={{
            background: "var(--surface2)",
            borderRadius: "12px",
            padding: "10px 14px",
            flex: 1,
            border: "1px solid var(--border)",
          }}
        >
          <p
            style={{
              fontSize: "0.65rem",
              color: "var(--muted)",
              textTransform: "uppercase",
              letterSpacing: "1px",
            }}
          >
            Distance
          </p>
          <p
            style={{ fontSize: "1.2rem", fontWeight: "700", color: "#0a84ff" }}
          >
            {kms} km
          </p>
        </div>

        <div
          style={{
            background: "var(--surface2)",
            borderRadius: "12px",
            padding: "10px 14px",
            flex: 1,
            border: "1px solid var(--border)",
          }}
        >
          <p
            style={{
              fontSize: "0.65rem",
              color: "var(--muted)",
              textTransform: "uppercase",
              letterSpacing: "1px",
            }}
          >
            Calories
          </p>
          <p
            style={{ fontSize: "1.2rem", fontWeight: "700", color: "#ff9f0a" }}
          >
            {calories} cal
          </p>
        </div>
      </div>

      {isGoalDone && (
        <div
          style={{
            background: "rgba(0, 26, 10, 0.6)",
            border: "1px solid #30d158",
            borderRadius: "14px",
            padding: "12px 16px",
            marginBottom: "14px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <Footprints size={18} color="#30d158" />
          <span
            style={{ color: "#30d158", fontSize: "0.9rem", fontWeight: "600" }}
          >
            Step goal reached!
          </span>
        </div>
      )}

      <div
        style={{
          background: "var(--surface2)",
          borderRadius: "99px",
          height: "6px",
          marginBottom: "8px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: percent + "%",
            height: "100%",
            background: isGoalDone
              ? "#30d158"
              : "linear-gradient(90deg, #30d158, #00ff88)",
            borderRadius: "99px",
            transition: "width 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
        />
      </div>

      <p
        style={{
          fontSize: "0.75rem",
          color: "var(--muted)",
          textAlign: "right",
        }}
      >
        {Math.round(percent)}% of daily goal
      </p>
    </div>
  );
}

export default StepCounter;
