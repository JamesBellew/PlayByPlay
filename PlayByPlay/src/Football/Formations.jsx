import React, { useState, useEffect } from "react";

function Formations(props) {
  const [allPlayers, setAllPlayers] = useState([]);

  useEffect(() => {
    // Retrieve players from local storage
    const storedPlayers = localStorage.getItem("playersData");
    const parsedPlayers = storedPlayers ? JSON.parse(storedPlayers) : [];
    setAllPlayers(parsedPlayers);
  }, []);

  return (
    <div>
      <ul>
        {allPlayers.map((player, index) => (
          <li key={index}>
            {player.playerNumber} - {player.playerName}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Formations;
