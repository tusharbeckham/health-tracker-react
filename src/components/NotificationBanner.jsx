function NotificationBanner() {
  const hour = new Date().getHours();

  let message = "Stay consistent today!";
  let emoji = "💪";
  let color = "#30d158";

  if (hour >= 6 && hour < 12) {
    message = "Morning! Start logging your steps!";
    emoji = "🌅";
    color = "#ff9f0a";
  } else if (hour >= 12 && hour < 14) {
    message = "Lunch time! Drink some water!";
    emoji = "💧";
    color = "#0a84ff";
  } else if (hour >= 17 && hour < 20) {
    message = "Evening workout time!";
    emoji = "🏃";
    color = "#ff6b6b";
  }

  return (
    <div
      style={{
        background: "#1c1c1e",
        borderRadius: "16px",
        padding: "14px 16px",
        marginBottom: "12px",
        borderLeft: `4px solid ${color}`,
        display: "flex",
        alignItems: "center",
        gap: "10px",
        fontSize: "0.9rem",
        fontWeight: "500",
      }}
    >
      <span style={{ fontSize: "1.3rem" }}>{emoji}</span>
      <span style={{ color: "#ccc" }}>{message}</span>
    </div>
  );
}

export default NotificationBanner;
