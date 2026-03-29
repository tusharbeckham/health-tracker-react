import { useState, useEffect } from "react";
import { Footprints, Trophy } from "lucide-react";

function StepCounter() {
  const [steps, setSteps] = useState(
    () => Number(localStorage.getItem("steps")) || 0,
  );
  const goal = Number(localStorage.getItem("goal_steps")) || 10000;

  useEffect(() => {
    let lastAcc = 0;
    let lastStep = 0;
    let stepBuffer = [];

    function handleMotion(event) {
      const acc = event.accelerationIncludingGravity;
      if (!acc) return;

      const magnitude = Math.sqrt(acc.x ** 2 + acc.y ** 2 + acc.z ** 2);

      stepBuffer.push(magnitude);
      if (stepBuffer.length > 4) stepBuffer.shift();
      const avg = stepBuffer.reduce((a, b) => a + b, 0) / stepBuffer.length;

      const delta = Math.abs(avg - lastAcc);
      const now = Date.now();

      if (delta > 3 && delta < 20 && now - lastStep > 500) {
        lastStep = now;
        setSteps((prev) => {
          const newSteps = prev + 1;
          localStorage.setItem("steps", newSteps);
          return newSteps;
        });
      }
      lastAcc = avg;
    }

    if (
      typeof DeviceMotionEvent !== "undefined" &&
      typeof DeviceMotionEvent.requestPermission === "function"
    ) {
      DeviceMotionEvent.requestPermission().then((response) => {
        if (response === "granted")
          window.addEventListener("devicemotion", handleMotion);
      });
    } else {
      window.addEventListener("devicemotion", handleMotion);
    }

    return () => window.removeEventListener("devicemotion", handleMotion);
  }, []);

  let percent = Math.min((steps / goal) * 100, 100);
  let isGoalDone = steps >= goal;

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
        Steps Today
      </p>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginBottom: "14px",
        }}
      >
        <span
          style={{
            fontSize: "3rem",
            fontWeight: "800",
            color: isGoalDone ? "#30d158" : "#fff",
            lineHeight: 1,
          }}
        >
          {steps.toLocaleString()}
        </span>
        <span style={{ fontSize: "1rem", color: "#444" }}>
          / {goal.toLocaleString()}
        </span>
        {isGoalDone && <Trophy size={24} color="#30d158" />}
      </div>

      {isGoalDone && (
        <div
          style={{
            background: "#001a0a",
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
          background: "#111",
          borderRadius: "99px",
          height: "5px",
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
            boxShadow: "0 0 10px rgba(48, 209, 88, 0.5)",
          }}
        ></div>
      </div>
      <p
        style={{
          fontSize: "0.75rem",
          color: "#555",
          marginBottom: "0",
          textAlign: "right",
        }}
      >
        {Math.round(percent)}% of daily goal
      </p>
    </div>
  );
}

export default StepCounter;
