import { useState, useEffect } from "react";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import BottomNav from "./components/BottomNav";
import "./App.css";

function App() {
  const [activePage, setActivePage] = useState("home");

  useEffect(() => {
    const savedDate = localStorage.getItem("savedDate");
    const todayDate = new Date().toLocaleDateString();

    if (savedDate !== todayDate) {
      // Aaj ka data weekly history mein save karo
      const dayName = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][
        new Date().getDay()
      ];
      const weeklyData = JSON.parse(localStorage.getItem("weeklyData")) || {};

      weeklyData[dayName] = {
        steps: Number(localStorage.getItem("steps")) || 0,
        water: Number(localStorage.getItem("water")) || 0,
        calories: Number(localStorage.getItem("stepCalories")) || 0,
        kms: Number(localStorage.getItem("kms")) || 0,
      };

      localStorage.setItem("weeklyData", JSON.stringify(weeklyData));

      // Reset today's data
      localStorage.removeItem("steps");
      localStorage.removeItem("water");
      localStorage.removeItem("workouts");
      localStorage.removeItem("totalCalories");
      localStorage.removeItem("kms");
      localStorage.removeItem("stepCalories");

      // Streak update
      const lastDate = localStorage.getItem("lastStreakDate");
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayDate = yesterday.toLocaleDateString();

      let streak = Number(localStorage.getItem("streak")) || 0;
      if (lastDate === yesterdayDate) {
        streak = streak + 1;
      } else if (lastDate !== todayDate) {
        streak = 1;
      }

      localStorage.setItem("streak", streak);
      localStorage.setItem("lastStreakDate", todayDate);
      localStorage.setItem("savedDate", todayDate);
    }
  }, []);

  return (
    <div>
      {activePage === "home" && <Dashboard />}
      {activePage === "profile" && <Profile />}
      {activePage === "settings" && <Settings />}
      <BottomNav activePage={activePage} setActivePage={setActivePage} />
    </div>
  );
}

export default App;
