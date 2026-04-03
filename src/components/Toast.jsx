import { useEffect } from "react";
import { CheckCircle } from "lucide-react";

function Toast({ message, show, onHide }) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(onHide, 2500);
      return () => clearTimeout(timer);
    }
  }, [show, onHide]);

  if (!show) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: "90px",
        left: "50%",
        transform: "translateX(-50%)",
        background: "#1c1c1e",
        border: "1px solid #30d158",
        borderRadius: "14px",
        padding: "14px 20px",
        display: "flex",
        alignItems: "center",
        gap: "10px",
        zIndex: 999,
        boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
        animation: "slideUp 0.3s ease",
        whiteSpace: "nowrap",
      }}
    >
      <CheckCircle size={18} color="#30d158" />
      <span style={{ color: "#fff", fontSize: "0.9rem", fontWeight: "600" }}>
        {message}
      </span>
    </div>
  );
}

export default Toast;
