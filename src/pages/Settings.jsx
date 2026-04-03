import { useState } from "react";
import { Target, Droplets, Flame, Bell } from "lucide-react";
import Toast from "../components/Toast";

function Settings() {
  const [goals, setGoals] = useState({
    steps: localStorage.getItem("goal_steps") || "10000",
    water: localStorage.getItem("goal_water") || "8",
    calories: localStorage.getItem("goal_calories") || "500",
  });
  const [notifications, setNotifications] = useState(
    localStorage.getItem("notifications") === "true" || false,
  );
  const [showToast, setShowToast] = useState(false);

  function handleChange(e) {
    setGoals({ ...goals, [e.target.name]: e.target.value });
  }

  function toggleNotifications() {
    const newVal = !notifications;
    setNotifications(newVal);
    localStorage.setItem("notifications", newVal);
  }

  function handleSave() {
    const steps = Number(goals.steps);
    const water = Number(goals.water);
    const calories = Number(goals.calories);

    if (steps < 1000 || steps > 50000) {
      alert("Step goal must be between 1,000 and 50,000!");
      return;
    }
    if (water < 1 || water > 20) {
      alert("Water goal must be between 1 and 20 glasses!");
      return;
    }
    if (calories < 100 || calories > 5000) {
      alert("Calorie goal must be between 100 and 5,000!");
      return;
    }

    localStorage.setItem("goal_steps", goals.steps);
    localStorage.setItem("goal_water", goals.water);
    localStorage.setItem("goal_calories", goals.calories);
    setShowToast(true);
  }

  const fields = [
    {
      label: "Step Goal",
      name: "steps",
      icon: <Target size={16} color="#30d158" />,
      min: 1000,
      max: 50000,
      hint: "1,000 – 50,000",
    },
    {
      label: "Water Goal (glasses)",
      name: "water",
      icon: <Droplets size={16} color="#0a84ff" />,
      min: 1,
      max: 20,
      hint: "1 – 20 glasses",
    },
    {
      label: "Calorie Burn Goal",
      name: "calories",
      icon: <Flame size={16} color="#ff9f0a" />,
      min: 100,
      max: 5000,
      hint: "100 – 5,000 cal",
    },
  ];

  return (
    <div className="page animate">
      <Toast
        message="Goals saved!"
        show={showToast}
        onHide={() => setShowToast(false)}
      />

      <p style={{ color: "#555", fontSize: "0.85rem", marginBottom: "4px" }}>
        Preferences
      </p>
      <h1 style={{ fontSize: "2rem", fontWeight: "800", marginBottom: "24px" }}>
        Settings
      </h1>

      {/* Notifications Toggle */}
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
            marginBottom: "16px",
          }}
        >
          Notifications
        </p>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Bell size={20} color={notifications ? "#30d158" : "#555"} />
            <span style={{ color: "#ccc", fontSize: "0.95rem" }}>
              Daily Reminders
            </span>
          </div>
          <div
            onClick={toggleNotifications}
            style={{
              width: "50px",
              height: "28px",
              borderRadius: "99px",
              background: notifications ? "#30d158" : "#2c2c2e",
              cursor: "pointer",
              position: "relative",
              transition: "background 0.3s ease",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "4px",
                left: notifications ? "26px" : "4px",
                width: "20px",
                height: "20px",
                borderRadius: "50%",
                background: "#fff",
                transition: "left 0.3s ease",
              }}
            ></div>
          </div>
        </div>
      </div>

      {/* Goals */}
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
            marginBottom: "16px",
          }}
        >
          Daily Goals
        </p>

        {fields.map((field) => (
          <div key={field.name} style={{ marginBottom: "16px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                marginBottom: "6px",
              }}
            >
              {field.icon}
              <p style={{ fontSize: "0.8rem", color: "#888" }}>{field.label}</p>
            </div>
            <input
              type="number"
              name={field.name}
              value={goals[field.name]}
              onChange={handleChange}
              min={field.min}
              max={field.max}
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
            <p style={{ fontSize: "0.7rem", color: "#444", marginTop: "4px" }}>
              {field.hint}
            </p>
          </div>
        ))}

        <button
          onClick={handleSave}
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
            marginTop: "8px",
          }}
        >
          Save Goals
        </button>
      </div>
    </div>
  );
}

export default Settings;
