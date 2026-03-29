import { useState, useRef, useEffect } from "react";

function StepCounter() {
  const [steps, setSteps] = useState(
    () => Number(localStorage.getItem("steps")) || 0,
  );
  const goal = 10000;
  const inputRef = useRef();

  useEffect(() => {
    let lastAcc = 0;
    let lastStep = 0;

    function handleMotion(event) {
      const acc = event.accelerationIncludingGravity;
      if (!acc) return;

      const magnitude = Math.sqrt(acc.x ** 2 + acc.y ** 2 + acc.z ** 2);
      const delta = Math.abs(magnitude - lastAcc);
      const now = Date.now();

      if (delta > 8 && now - lastStep > 300) {
        lastStep = now;
        setSteps((prev) => {
          const newSteps = prev + 1;
          localStorage.setItem("steps", newSteps);
          return newSteps;
        });
      }
      lastAcc = magnitude;
    }

    // iOS permission
    if (
      typeof DeviceMotionEvent !== "undefined" &&
      typeof DeviceMotionEvent.requestPermission === "function"
    ) {
      DeviceMotionEvent.requestPermission().then((response) => {
        if (response === "granted") {
          window.addEventListener("devicemotion", handleMotion);
        }
      });
    } else {
      window.addEventListener("devicemotion", handleMotion);
    }

    return () => {
      window.removeEventListener("devicemotion", handleMotion);
    };
  }, []);

  function handleAdd() {
    let amount = Number(inputRef.current.value);
    if (amount > 0) {
      const newSteps = steps + amount;
      setSteps(newSteps);
      localStorage.setItem("steps", newSteps);
      inputRef.current.value = "";
    }
  }

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
          alignItems: "baseline",
          gap: "8px",
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
        <span style={{ fontSize: "1rem", color: "#444" }}>/ 10,000</span>
        {isGoalDone && <span style={{ fontSize: "1.2rem" }}>🎉</span>}
      </div>
      <div
        style={{
          background: "#111",
          borderRadius: "99px",
          height: "5px",
          marginBottom: "18px",
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
      <input
        ref={inputRef}
        type="number"
        placeholder="Enter steps manually"
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
        onClick={handleAdd}
        style={{
          width: "100%",
          padding: "14px",
          background: "linear-gradient(135deg, #30d158, #25a244)",
          border: "none",
          borderRadius: "14px",
          color: "#000",
          fontSize: "1rem",
          fontWeight: "700",
          cursor: "pointer",
          boxShadow: "0 4px 20px rgba(48, 209, 88, 0.3)",
        }}
      >
        Log Steps
      </button>
    </div>
  );
}

export default StepCounter;
