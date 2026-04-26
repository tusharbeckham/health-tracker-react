import { useState, useEffect } from "react";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import BottomNav from "./components/BottomNav";
import "./App.css";

// Consistent date format — har device pe same
function getTodayISO() {
  return new Date().toISOString().split("T")[0]; // "2026-04-26"
}

function getYesterdayISO() {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().split("T")[0];
}

function App() {
  const [activePage, setActivePage] = useState("home");

  useEffect(() => {
    const theme = localStorage.getItem("theme") || "dark";
    document.body.className = `theme-${theme}`;
  }, []);

  useEffect(() => {
    const savedDate = localStorage.getItem("savedDate");
    const todayDate = getTodayISO();

    if (!savedDate) {
      localStorage.setItem("savedDate", todayDate);
      // Pehli baar — streak 1 se shuru
      localStorage.setItem("streak", "1");
      localStorage.setItem("lastStreakDate", todayDate);
      return;
    }

    if (savedDate !== todayDate) {
      // Naya din — weekly data save karo
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

      // Daily data reset
      localStorage.removeItem("steps");
      localStorage.removeItem("steps_date");
      localStorage.removeItem("water");
      localStorage.removeItem("workouts");
      localStorage.removeItem("totalCalories");
      localStorage.removeItem("kms");
      localStorage.removeItem("stepCalories");

      // Streak update — ISO format use karo
      const lastStreakDate = localStorage.getItem("lastStreakDate");
      const yesterdayDate = getYesterdayISO();
      let streak = Number(localStorage.getItem("streak")) || 0;

      if (lastStreakDate === yesterdayDate) {
        streak = streak + 1; // Consecutive day
      } else if (lastStreakDate === todayDate) {
        // Aaj already update hua — kuch mat karo
      } else {
        streak = 1; // Gap — reset
      }

      localStorage.setItem("streak", String(streak));
      localStorage.setItem("lastStreakDate", todayDate);
      localStorage.setItem("savedDate", todayDate);
    }
  }, []);

  return (
    <div>
      {activePage === "home" && <Dashboard />}
      {activePage === "profile" && <Profile />}
      {activePage === "settings" && (
        <Settings
          onThemeChange={(t) => (document.body.className = `theme-${t}`)}
        />
      )}
      <BottomNav activePage={activePage} setActivePage={setActivePage} />
    </div>
  );
}

export default App;
