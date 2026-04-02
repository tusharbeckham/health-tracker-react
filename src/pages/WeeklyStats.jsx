import Ring from "../components/Ring";

function WeeklyStats() {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const weeklyData = JSON.parse(localStorage.getItem("weeklyData")) || {};

  const stepGoal = Number(localStorage.getItem("goal_steps")) || 10000;
  const waterGoal = Number(localStorage.getItem("goal_water")) || 8;
  const calGoal = Number(localStorage.getItem("goal_calories")) || 500;

  // Weekly totals
  const totalSteps = days.reduce(
    (sum, d) => sum + (weeklyData[d]?.steps || 0),
    0,
  );
  const totalWater = days.reduce(
    (sum, d) => sum + (weeklyData[d]?.water || 0),
    0,
  );
  const totalCals = days.reduce(
    (sum, d) => sum + (weeklyData[d]?.calories || 0),
    0,
  );
  const totalKms = days.reduce((sum, d) => sum + (weeklyData[d]?.kms || 0), 0);

  const weeklyStepGoal = stepGoal * 7;
  const weeklyWaterGoal = waterGoal * 7;
  const weeklyCalGoal = calGoal * 7;

  return (
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
        Weekly Summary
      </p>

      {/* Rings */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "24px",
        }}
      >
        <Ring
          percent={Math.min((totalSteps / weeklyStepGoal) * 100, 100)}
          color="#30d158"
          size={75}
          stroke={7}
          label="Steps"
          value={totalSteps.toLocaleString()}
        />
        <Ring
          percent={Math.min((totalKms / (stepGoal * 7 * 0.000762)) * 100, 100)}
          color="#0a84ff"
          size={75}
          stroke={7}
          label="KMs"
          value={totalKms.toFixed(1) + " km"}
        />
        <Ring
          percent={Math.min((totalWater / weeklyWaterGoal) * 100, 100)}
          color="#5e5ce6"
          size={75}
          stroke={7}
          label="Water"
          value={totalWater + " gl"}
        />
        <Ring
          percent={Math.min((totalCals / weeklyCalGoal) * 100, 100)}
          color="#ff9f0a"
          size={75}
          stroke={7}
          label="Calories"
          value={totalCals + " cal"}
        />
      </div>

      {/* Daily bars */}
      <p
        style={{
          fontSize: "0.7rem",
          color: "#555",
          textTransform: "uppercase",
          letterSpacing: "2px",
          marginBottom: "12px",
        }}
      >
        Daily Steps
      </p>
      <div
        style={{
          display: "flex",
          gap: "6px",
          alignItems: "flex-end",
          height: "60px",
        }}
      >
        {days.map((day) => {
          const daySteps = weeklyData[day]?.steps || 0;
          const height = Math.max((daySteps / stepGoal) * 60, 4);
          const isToday =
            days[new Date().getDay() === 0 ? 6 : new Date().getDay() - 1] ===
            day;
          return (
            <div
              key={day}
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: height + "px",
                  background: isToday
                    ? "#30d158"
                    : daySteps >= stepGoal
                      ? "#25a244"
                      : "#2a2a2a",
                  borderRadius: "6px",
                  boxShadow: isToday ? "0 0 10px rgba(48,209,88,0.4)" : "none",
                  transition: "height 0.4s ease",
                }}
              ></div>
              <span
                style={{
                  fontSize: "0.6rem",
                  color: isToday ? "#30d158" : "#444",
                }}
              >
                {day}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default WeeklyStats;
