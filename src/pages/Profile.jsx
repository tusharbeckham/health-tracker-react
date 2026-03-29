import { useState } from "react";

function Profile() {
  const [form, setForm] = useState({
    name: localStorage.getItem("profile_name") || "",
    age: localStorage.getItem("profile_age") || "",
    weight: localStorage.getItem("profile_weight") || "",
    height: localStorage.getItem("profile_height") || "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSave() {
    localStorage.setItem("profile_name", form.name);
    localStorage.setItem("profile_age", form.age);
    localStorage.setItem("profile_weight", form.weight);
    localStorage.setItem("profile_height", form.height);
    alert("Profile saved!");
  }

  return (
    <div className="page animate">
      <p style={{ color: "#555", fontSize: "0.85rem", marginBottom: "4px" }}>
        Your Info
      </p>
      <h1 style={{ fontSize: "2rem", fontWeight: "800", marginBottom: "24px" }}>
        Profile
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
          Personal Details
        </p>

        {[
          {
            label: "Name",
            name: "name",
            placeholder: "Your name",
            type: "text",
          },
          {
            label: "Age",
            name: "age",
            placeholder: "Your age",
            type: "number",
          },
          {
            label: "Weight (kg)",
            name: "weight",
            placeholder: "Your weight",
            type: "number",
          },
          {
            label: "Height (cm)",
            name: "height",
            placeholder: "Your height",
            type: "number",
          },
        ].map((field) => (
          <div key={field.label} style={{ marginBottom: "14px" }}>
            <p
              style={{ fontSize: "0.8rem", color: "#888", marginBottom: "6px" }}
            >
              {field.label}
            </p>
            <input
              type={field.type}
              name={field.name}
              placeholder={field.placeholder}
              value={form[field.name]}
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
          Save Profile
        </button>
      </div>
    </div>
  );
}

export default Profile;
