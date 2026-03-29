function Settings() {
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

        {[
          { label: "Step Goal", defaultValue: "10000", type: "number" },
          { label: "Water Goal (glasses)", defaultValue: "8", type: "number" },
          { label: "Calorie Goal", defaultValue: "500", type: "number" },
        ].map((field) => (
          <div key={field.label} style={{ marginBottom: "14px" }}>
            <p
              style={{ fontSize: "0.8rem", color: "#888", marginBottom: "6px" }}
            >
              {field.label}
            </p>
            <input
              type={field.type}
              defaultValue={field.defaultValue}
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
