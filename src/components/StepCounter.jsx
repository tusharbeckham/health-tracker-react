import { useState, useEffect, useRef } from "react";
import { Footprints, Trophy } from "lucide-react";

function StepCounter() {
  const today = new Date().toISOString().split("T")[0];

  // Steps seedha localStorage se initialize karo
  const [steps, setSteps] = useState(() => {
    const savedDate = localStorage.getItem("steps_date");
    const savedSteps = Number(localStorage.getItem("steps")) || 0;
    if (savedDate !== today) {
      localStorage.setItem("steps", "0");
      localStorage.setItem("steps_date", today);
      return 0;
    }
    return savedSteps;
  });

  const goal = Number(localStorage.getItem("goal_steps")) || 10000;
  const kms = (steps * 0.000762).toFixed(2);
  const calories = Math.round(steps * 0.04);

  const lastAccRef = useRef(0);
  const lastStepRef = useRef(0);
  const stepBufferRef = useRef([]);
  const isMotionActive = useRef(false);

  // Save steps to localStorage
  useEffect(() => {
    localStorage.setItem("steps", steps.toString());
    localStorage.setItem("steps_date", today);
    localStorage.setItem("kms", kms);
    localStorage.setItem("stepCalories", String(calories));
  }, [steps]);

  // Step detection — sirf ek baar mount pe
  useEffect(() => {
    if (isMotionActive.current) return;

    function handleMotion(event) {
      const acc = event.accelerationIncludingGravity;
      if (!acc || acc.x == null) return;

      const magnitude = Math.sqrt(
        (acc.x || 0) ** 2 + (acc.y || 0) ** 2 + (acc.z || 0) ** 2,
      );

      stepBufferRef.current.push(magnitude);
      if (stepBufferRef.current.length > 6) stepBufferRef.current.shift();

      const avg =
        stepBufferRef.current.reduce((a, b) => a + b, 0) /
        stepBufferRef.current.length;

      const delta = Math.abs(avg - lastAccRef.current);
      const now = Date.now();

      // Strict conditions — false steps avoid karo
      if (
        delta > 3.5 &&
        delta < 15 &&
        now - lastStepRef.current > 500 &&
        magnitude > 8 // Phone actually move ho raha hai
      ) {
        lastStepRef.current = now;
        setSteps((prev) => prev + 1);
      }

      lastAccRef.current = avg;
    }

    const startMotion = () => {
      isMotionActive.current = true;
      window.addEventListener("devicemotion", handleMotion);
    };

    if (
      typeof DeviceMotionEvent !== "undefined" &&
      typeof DeviceMotionEvent.requestPermission === "function"
    ) {
      DeviceMotionEvent.requestPermission()
        .then((permission) => {
          if (permission === "granted") startMotion();
        })
        .catch(() => startMotion());
    } else {
      startMotion();
    }

    return () => {
      window.removeEventListener("devicemotion", handleMotion);
      isMotionActive.current = false;
    };
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
        <div className="goal-banner green">
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
            width: `${percent}%`,
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
