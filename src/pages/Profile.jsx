function Profile() {
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
          { label: "Name", placeholder: "Your name", type: "text" },
          { label: "Age", placeholder: "Your age", type: "number" },
          { label: "Weight (kg)", placeholder: "Your weight", type: "number" },
          { label: "Height (cm)", placeholder: "Your height", type: "number" },
        ].map((field) => (
          <div key={field.label} style={{ marginBottom: "14px" }}>
            <p
              style={{ fontSize: "0.8rem", color: "#888", marginBottom: "6px" }}
            >
              {field.label}
            </p>
            <input
              type={field.type}
              placeholder={field.placeholder}
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
