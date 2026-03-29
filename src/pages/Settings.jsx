import { useState } from "react";
import { Target, Droplets, Flame, Bell } from "lucide-react";

function Settings() {
  const [goals, setGoals] = useState({
    steps: localStorage.getItem("goal_steps") || "10000",
    water: localStorage.getItem("goal_water") || "8",
    calories: localStorage.getItem("goal_calories") || "500",
  });

  function handleChange(e) {
    setGoals({ ...goals, [e.target.name]: e.target.value });
  }

  function handleSave() {
    localStorage.setItem("goal_steps", goals.steps);
    localStorage.setItem("goal_water", goals.water);
    localStorage.setItem("goal_calories", goals.calories);
    alert("Goals saved!");
  }

  const fields = [
    {
      label: "Step Goal",
      name: "steps",
      icon: <Target size={16} color="#30d158" />,
    },
    {
      label: "Water Goal (glasses)",
      name: "water",
      icon: <Droplets size={16} color="#0a84ff" />,
    },
    {
      label: "Calorie Burn Goal",
      name: "calories",
      icon: <Flame size={16} color="#ff9f0a" />,
    },
  ];

  return (
    <div className="page animate">
      <p style={{ color: "#555", fontSize: "0.85rem", marginBottom: "4px" }}>
        Preferences
      </p>
      <h1 style={{ fontSize: "2rem", fontWeight: "800", marginBottom: "24px" }}>
        Settings
      </h1>

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
          <div key={field.name} style={{ marginBottom: "14px" }}>
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
          }}
        >
          Save Goals
        </button>
      </div>
    </div>
  );
}

export default Settings;
