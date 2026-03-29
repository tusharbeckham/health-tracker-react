import { Home, User, Settings } from "lucide-react";

function BottomNav({ activePage, setActivePage }) {
  return (
    <nav>
      <button
        className={activePage === "home" ? "active" : ""}
        onClick={() => setActivePage("home")}
      >
        <Home size={22} />
        Home
      </button>
      <button
        className={activePage === "profile" ? "active" : ""}
        onClick={() => setActivePage("profile")}
      >
        <User size={22} />
        Profile
      </button>
      <button
        className={activePage === "settings" ? "active" : ""}
        onClick={() => setActivePage("settings")}
      >
        <Settings size={22} />
        Settings
      </button>
    </nav>
  );
}

export default BottomNav;
