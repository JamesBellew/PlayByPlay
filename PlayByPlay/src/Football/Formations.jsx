import { Outlet, Link } from "react-router-dom";
import ReactDOM from "react-dom/client";

const Formations = () => {
  // Retrieve and parse formations/players from localStorage
  const storedLineups = JSON.parse(localStorage.getItem("playersData") || "[]");

  return (
    <div>
      <h1>In the Formations Tab</h1>

      {storedLineups.length === 0 ? (
        <p>No formations/players exist.</p>
      ) : (
        <ul>
          {storedLineups.map((lineup, index) => (
            <li key={index}>
              {Array.isArray(lineup) ? (
                lineup.map((player) => (
                  <p key={player.playerNumber}>
                    {player.playerNumber}: {player.playerName}
                  </p>
                ))
              ) : (
                <p>Unexpected data format</p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Formations;
