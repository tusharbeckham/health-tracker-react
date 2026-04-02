import StepCounter from "../components/StepCounter";
import WaterTracker from "../pages/WaterTracker";
import WorkoutLog from "../pages/WorkoutLog";
import StreakCard from "../pages/StreakCard";
import WeeklyStats from "../pages/WeeklyStats";
import NotificationBanner from "../components/NotificationBanner";
import { Sun, Moon, Sunset } from "lucide-react";

function Dashboard() {
  const hour = new Date().getHours();
  let greeting = "Good Evening";
  let GreetIcon = Moon;
  let iconColor = "#5e5ce6";

  if (hour < 12) {
    greeting = "Good Morning";
    GreetIcon = Sun;
    iconColor = "#ff9f0a";
  } else if (hour < 17) {
    greeting = "Good Afternoon";
    GreetIcon = Sunset;
    iconColor = "#ff6b6b";
  }

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <div className="page">
      <div style={{ marginBottom: "24px" }}>
        <p style={{ color: "#555", fontSize: "0.85rem", marginBottom: "4px" }}>
          {today}
        </p>
        <h1
          style={{
            fontSize: "2rem",
            fontWeight: "800",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          {greeting} <GreetIcon size={28} color={iconColor} />
        </h1>
      </div>

      <NotificationBanner />

      <div className="animate">
        <StepCounter />
      </div>

      <div className="animate delay-1">
        <WaterTracker />
      </div>

      <div className="animate delay-2">
        <WorkoutLog />
      </div>

      <div className="animate delay-3">
        <StreakCard />
      </div>

      <div className="animate delay-3">
        <WeeklyStats />
      </div>
    </div>
  );
}

export default Dashboard;
