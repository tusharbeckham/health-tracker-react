import { useState, useEffect } from "react";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import BottomNav from "./components/BottomNav";
import "./App.css";

function App() {
  const [activePage, setActivePage] = useState("home");

  // Auto daily reset
  useEffect(() => {
    const savedDate = localStorage.getItem("savedDate");
    const todayDate = new Date().toLocaleDateString();
    if (savedDate !== todayDate) {
      localStorage.removeItem("steps");
      localStorage.removeItem("water");
      localStorage.removeItem("workouts");
      localStorage.removeItem("totalCalories");
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
