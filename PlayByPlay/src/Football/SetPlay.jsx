import { useEffect, useState } from "react";
import "../App.css";
import SaveLineupConfirm from "./FootballComponents/saveLineupConfirm";

const SetPlay = () => {
  const [players, setPlayers] = useState([
    { playerNumber: "01", playerName: "John Keeper" },
    { playerNumber: "02", playerName: "left full back" },
    { playerNumber: "03", playerName: "center back" },
    { playerNumber: "04", playerName: "right full back" },
    { playerNumber: "05", playerName: "left half back" },
    { playerNumber: "06", playerName: "center half back" },
    { playerNumber: "07", playerName: "right half back" },
    { playerNumber: "08", playerName: "midfield" },
    { playerNumber: "09", playerName: "midfield" },
    { playerNumber: "10", playerName: "left half forward" },
    { playerNumber: "11", playerName: "center half forward" },
    { playerNumber: "12", playerName: "right half forward" },
    { playerNumber: "13", playerName: "left full forward" },
    { playerNumber: "14", playerName: "center forward" },
    { playerNumber: "15", playerName: "right full forward" },
  ]);
  const [messageFromChild, setMessageFromChild] = useState("");

  const saveLineupHandler = () => {
    console.log("clicked");
    updateShowLineupConfirm(true);
    updateSettingsMenuState(!settingsCloseHandler);
  };
  // Function to store players in local storage
  const storePlayersInLocalStorage = () => {
    // Convert the players array to a JSON string
    const playersJSON = JSON.stringify(players);

    // Store the JSON string in local storage with a specific key (e.g., "playersData")
    localStorage.setItem("playersData", playersJSON);
  };

  // Call the function to store players when needed, e.g., when the component updates
  useEffect(() => {
    storePlayersInLocalStorage();
  }, [players]); // This will trigger the storage when players state changes

  const formations = ["3-3-2-3-3", "3-3-1-2-3-2", "3-3-1-2-2-3"];

  const buttonStyle = {
    float: "left",
  };
  const [settingsMenuState, updateSettingsMenuState] = useState(true);
  const [showPlayerNameState, updatePlayerNameState] = useState(true);
  const [editPlayerNameState, updateEditPlayerNameState] = useState(true);
  const [showFormationsState, updateshowFormationsState] = useState(false);
  const [showSaveLinupConfirm, updateShowLineupConfirm] = useState(false);

  // Function to receive data from the child
  const handleChildClick = (message) => {
    updateShowLineupConfirm(message);
    updateSettingsMenuState(!settingsMenuState);
  };
  //*    - this is the check to see what formations is selectedf, if there are no formations saved under the user then a default formation will be selected
  //*    - for the moment, I will hard code this in as the first element of the formations array.
  //TODO - in future, I will want to check if the user have stored a saved formation from the local storage and if not supply the default like below
  const [currentFormation, updatecurrentFormation] = useState("3-3-2-3-3");
  const settingsCloseHandler = () => {
    updateSettingsMenuState(!settingsMenuState);
  };
  const showPlayerNameHanlder = () => {
    updatePlayerNameState(!showPlayerNameState);
  };
  const editPlayerNameHandler = () => {
    updateEditPlayerNameState(!editPlayerNameState);
  };
  const editFormationHandler = () => {
    updateshowFormationsState(!showFormationsState);
  };
  const formationInputHandler = (formation) => [
    updatecurrentFormation(formation),
  ];

  const playerNameChangeHandler = (newPlayerName, playerNumber) => {
    // Find the index of the player with the specified playerNumber
    const playerIndex = players.findIndex(
      (player) => player.playerNumber === playerNumber
    );

    // Check if the player with the specified playerNumber exists
    if (playerIndex !== -1) {
      // Create a copy of the players array to avoid mutating state directly
      const updatedPlayers = [...players];

      // Update the playerName for the specified playerNumber
      updatedPlayers[playerIndex] = {
        ...updatedPlayers[playerIndex],
        playerName: newPlayerName,
      };

      // Update the state with the new players array
      setPlayers(updatedPlayers);
    }
  };

  const buttonText = settingsMenuState ? "Close Settings" : "Settings";
  const FormationbuttonText = showFormationsState
    ? "Close Formations"
    : "Edit Formations";
  const EditPlayerNamebuttonText = editPlayerNameState
    ? "Cancel"
    : "Edit Player Names";

  const hideStyle = {
    // Add your styles to hide the <p> elements here
    display: "none",
  };

  const showStyle = {
    // Add your styles to show the <p> elements here
    display: "block",
  };
  const componentStyle = {
    // Add your component-level styles here
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "1rem",
    placeItems: "center",
  };
  const secondComponentStyle = {
    // Second component styles
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "1rem",
    textAlign: "center",
    marginTop: "2rem",
  };
  //this is the mapping for the Keeper , this will need to become dynamic as formations become custome/changebale
  const KeeperName = players.slice(0, 1).map((player, index) => (
    <div
      key={index}
      className="text-center z-50 mx-auto mt-7"
      style={{
        width: "40%",
        left: "30%",
        position: "absolute",
        color: "black",
        justifyContent: "center",
        alignItems: "center",
      }}>
      {player.playerName}
    </div>
  ));
  //this is the mapping for the full backs, this will need to become dynamic as formations become custome/changebale
  const fullBackNames = players.slice(1, 4).map((player, index) => (
    <div key={index} className="text-center text-black">
      {player.playerName}
    </div>
  ));
  //this is the mapping for the Half backs, this will need to become dynamic as formations become custome/changebale
  const halfBackNames = players.slice(4, 7).map((player, index) => (
    <div key={index} className="text-center text-black">
      {player.playerName}
    </div>
  ));
  //this is the mapping for the Half backs, this will need to become dynamic as formations become custome/changebale
  const fullForwardsNames = players.slice(12, 15).map((player, index) => (
    <div key={index} className="text-center">
      {player.playerName}
    </div>
  ));
  const editPlayerName = (playerNumber, newPlayerName) => {
    updateEditPlayerNameState(!editPlayerName);
  };
  return (
    <>
      <button
        onClick={settingsCloseHandler}
        className="text-left relative  bg-gray-700    text-white font-bold py-2 px-4 rounded"
        style={buttonStyle}>
        {buttonText}
      </button>

      {settingsMenuState && (
        <div className=" top-[3vh] mb-4 pb-4 relative px-4 h-auto">
          <div className="flex h-auto rounded w-full   gaa-pitch relative bg-gray-600 settings p-4 ">
            <div className="flex w-auto bg-gray-600 h-10 text-left rounded">
              <p className="p-2 text-white">
                <div class="flex items-center mb-4">
                  <input
                    id="default-checkbox"
                    onClick={showPlayerNameHanlder}
                    type="checkbox"
                    value=""
                    checked={showPlayerNameState}
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    for="default-checkbox"
                    class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Show Player Name
                  </label>
                </div>
              </p>
            </div>
            <div className="flex ml-2 w-auto bg-gray-600 h-10 text-left rounded">
              <p className="p-2 text-white">
                <div class="flex items-center mb-4">
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    value=""
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    for="default-checkbox"
                    class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Jersey Color
                  </label>
                </div>
              </p>
            </div>
          </div>
          <div className="flex h-auto rounded mt-2 gaa-pitch relative bg-gray-600 settings p-4 ">
            {!editPlayerNameState && (
              <button
                onClick={editFormationHandler}
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                {FormationbuttonText}
              </button>
            )}
            {/* this is so god damn stupid logic, but it works .... */}
            {!editPlayerNameState && (
              <button
                onClick={editPlayerNameHandler}
                className={`ml-2 ${
                  editPlayerNameState ? "bg-red-500" : "bg-blue-500"
                } hover:bg-blue-700 text-white font-bold py-2 px-4 rounded`}>
                {EditPlayerNamebuttonText}
              </button>
            )}
            {editPlayerNameState && (
              <button
                //! This is redundant, all I need this to do is to close the edit name button
                onClick={() => editPlayerName("01", "New Name")}
                className="ml-2 bg-green-500 hover:bg-blue-700 text-white
                font-bold py-2 px-4 rounded">
                {" "}
                Save
              </button>
            )}
          </div>
          {/* this is the formations divs */}
          {showFormationsState && (
            <div className="flex h-auto rounded mt-2 gaa-pitch relative bg-gray-600 settings p-4 ">
              <div className="flex">
                {formations.map((formation, index) => (
                  <div key={index}>
                    <input
                      id={`default-checkbox-${index}`}
                      type="checkbox"
                      value=""
                      onClick={() => formationInputHandler(formation)}
                      checked={currentFormation === formation ? true : false}
                      className="w-4 ml-2 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor={`default-checkbox-${index}`}
                      className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                      {formation}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}
          {/* end of formations div */}
          {!editPlayerNameState && (
            <div className="flex h-auto rounded mt-2 gaa-pitch relative bg-gray-600 settings p-4 ">
              <button
                onClick={saveLineupHandler}
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Save Lineup
              </button>
              <button class=" ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Download
              </button>
            </div>
          )}
          <br></br>
        </div>
      )}

      {/* this is the GAA pitch */}
      {showSaveLinupConfirm && (
        <SaveLineupConfirm
          onChildClick={handleChildClick}
          formation={currentFormation}
          players={players}
        />
      )}
      <div
        className={`flex h-[80vh] w-full mb-[10vh] relative bg-green-500 ${
          showSaveLinupConfirm ? "mt-[25vh]" : ""
        }`}>
        <div class="grid grid-cols-3 gap-4  w-full ">
          {/* keeper div */}
          {/* keeper div */}
          <div class="goalkeeper absolute w-full h-10">
            <div class="bg-blue-600 player-circle rounded-full w-7 mt-5 h-7 mx-auto place-self-center center ">
              <p className="text-yellow-400 capitalize shadow-white ">
                {players[0].playerNumber}
              </p>
            </div>

            <div
              style={{
                ...componentStyle,
                ...(showPlayerNameState || editPlayerNameState
                  ? {}
                  : hideStyle),
              }}
              className={`my-component ${showPlayerNameState ? "" : "hide"}`}>
              {editPlayerNameState ? (
                <div className=" bg-red-300 absolute w-[100%]  ">
                  <input
                    type="text"
                    onChange={(e) =>
                      playerNameChangeHandler(
                        e.target.value,
                        players[0].playerNumber
                      )
                    }
                    value={players[0].playerName}
                    className=" w-[20%] absolute mt-2 z-50 left-[40%]"
                  />
                </div>
              ) : (
                <>{KeeperName}</>
              )}
            </div>
            {/* end of keeper div */}
          </div>

          {/* Next bit of code */}
          <div className="fullbacks absolute w-full bg-blue-00 h-auto top-[16.15%]">
            <div className="grid grid-cols-3 gap-4 place-items-center">
              <div className="bg-blue-600 player-circle rounded-full flex items-center justify-center w-7 h-7">
                <p className="text-yellow-400 capitalize shadow-white">02</p>
              </div>
              <div className="bg-blue-600 player-circle rounded-full flex items-center justify-center w-7 h-7">
                <p className="text-yellow-400 capitalize shadow-white">03</p>
              </div>
              <div className="bg-blue-600 player-circle rounded-full flex items-center justify-center w-7 h-7">
                <p className="text-yellow-400 capitalize shadow-white">04</p>
              </div>
            </div>
            <div
              style={{
                ...componentStyle,
                ...(showPlayerNameState || editPlayerNameState
                  ? {}
                  : hideStyle),
              }}
              className={`my-component ${showPlayerNameState ? "" : "hide"}`}>
              {editPlayerNameState ? (
                <>
                  {/* Assuming players is an array of player objects */}
                  {players.slice(1, 4).map((player, index) => (
                    <input
                      type="text"
                      onChange={(e) =>
                        playerNameChangeHandler(
                          e.target.value,
                          players[index + 1].playerNumber
                        )
                      }
                      value={players[index + 1].playerName}
                    />
                  ))}
                </>
              ) : (
                <>{fullBackNames}</>
              )}
            </div>
          </div>

          {/* this is the sweeper div, only appears in certain formations that havehbghgg a sweeper in play */}
          {currentFormation === "3-3-1-2-3-2" ||
          currentFormation === "3-3-1-2-2-3" ? (
            <div className="sweeper bg-red-500 absolute w-full bg-blue-00 h-auto top-[24.15%]">
              <div class="goalkeeper absolute w-full z-50 h-10">
                <div class="bg-blue-600 player-circle rounded-full -z-50 w-7 h-7 mx-auto place-self-center center ">
                  <p className="text-yellow-400 capitalize shadow-white">15</p>
                </div>
                {editPlayerNameState ? (
                  <>
                    <input
                      type="text"
                      onChange={(e) =>
                        playerNameChangeHandler(
                          e.target.value,
                          players[14].playerNumber
                        )
                      }
                      value={players[14].playerName}
                    />
                  </>
                ) : showPlayerNameState ? (
                  <div class="text-center z-50 text-black player-name">
                    {players[14].playerName}
                  </div>
                ) : null}
              </div>
            </div>
          ) : null}
          {/* end of sweeper div */}

          <div className="halfbacks absolute w-full bg-blue-00 h-auto top-[31.6%]">
            <div className="grid grid-cols-3 gap-4 place-items-center">
              <div className="bg-blue-600 player-circle rounded-full flex items-center justify-center w-7 h-7 ">
                <p className="text-yellow-400 capitalize shadow-white">05</p>
              </div>
              <div className="bg-blue-600 player-circle rounded-full flex items-center justify-center w-7 h-7 ">
                <p className="text-yellow-400 capitalize shadow-white">06</p>
              </div>
              <div className="bg-blue-600 player-circle rounded-full flex items-center justify-center w-7 h-7 ">
                <p className="text-yellow-400 capitalize shadow-white">07</p>
              </div>
            </div>
            <div
              style={{
                ...componentStyle,
                ...(showPlayerNameState || editPlayerNameState
                  ? {}
                  : hideStyle),
              }}
              className={`my-component ${showPlayerNameState ? "" : "hide"}`}>
              {editPlayerNameState ? (
                <>
                  {players.slice(4, 7).map((player, index) => (
                    <input
                      type="text"
                      onChange={(e) =>
                        playerNameChangeHandler(
                          e.target.value,
                          players[index + 4].playerNumber
                        )
                      }
                      value={players[index + 4].playerName}
                    />
                  ))}
                </>
              ) : (
                <>{halfBackNames}</>
              )}
            </div>
          </div>
          <div className="midfielders absolute w-full bg-blue-00 h-auto top-[48%] text-center">
            <div className="flex justify-center">
              <div className="flex flex-col items-center">
                <div className="bg-blue-600 mx-20 player-circle rounded-full flex items-center justify-center w-7 h-7">
                  <p className="text-yellow-400 capitalize shadow-white ">08</p>
                </div>
                {editPlayerNameState ? (
                  <>
                    <input
                      type="text"
                      onChange={(e) =>
                        playerNameChangeHandler(
                          e.target.value,
                          players[7].playerNumber
                        )
                      }
                      value={players[7].playerName}
                    />
                  </>
                ) : (
                  <p
                    style={{
                      ...(showPlayerNameState ? {} : hideStyle),
                    }}
                    className={`text-center text-black z-50 ${
                      showPlayerNameState ? "" : "hide"
                    }`}>
                    {players[7].playerName}
                  </p>
                )}
              </div>
              <div className="flex player-div flex-col items-center">
                <div className="bg-blue-600 mx-20 player-circle rounded-full flex items-center justify-center w-7 h-7">
                  <p className="text-yellow-400 capitalize shadow-white ">09</p>
                </div>
                {editPlayerNameState ? (
                  <>
                    <input
                      type="text"
                      onChange={(e) =>
                        playerNameChangeHandler(
                          e.target.value,
                          players[8].playerNumber
                        )
                      }
                      value={players[8].playerName}
                    />
                  </>
                ) : (
                  <p
                    style={{
                      ...(showPlayerNameState ? {} : hideStyle),
                    }}
                    className={`text-center text-black z-50 ${
                      showPlayerNameState ? "" : "hide"
                    }`}>
                    {players[8].playerName}
                  </p>
                )}
              </div>
            </div>
            <div
              style={{
                ...componentStyle,
                ...(showPlayerNameState || editPlayerNameState
                  ? {}
                  : hideStyle),
              }}
              className={`my-component ${showPlayerNameState ? "" : "hide"}`}>
              {editPlayerNameState ? (
                <></>
              ) : (
                <>{/* You can add additional text here if needed */}</>
              )}
            </div>
          </div>

          <div className="half-forwards absolute w-full bg-blue-00 h-auto top-[67%] text-center">
            <div className="flex justify-center">
              <div className="flex flex-col items-center">
                <div className="bg-blue-600 mx-20 player-circle rounded-full flex items-center justify-center w-7 h-7">
                  <p className="text-yellow-400 capitalize shadow-white">10</p>
                </div>
                {editPlayerNameState ? (
                  <>
                    <input
                      type="text"
                      onChange={(e) =>
                        playerNameChangeHandler(
                          e.target.value,
                          players[9].playerNumber
                        )
                      }
                      value={players[9].playerName}
                    />
                  </>
                ) : (
                  <p
                    style={{
                      ...(showPlayerNameState ? {} : hideStyle),
                    }}
                    className={`text-center z-50 text-black ${
                      showPlayerNameState ? "" : "hide"
                    }`}>
                    {players[9].playerName}
                  </p>
                )}
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-blue-600 mx-20 player-circle rounded-full flex items-center justify-center w-7 h-7">
                  <p className="text-yellow-400 capitalize shadow-white">11</p>
                </div>
                {editPlayerNameState ? (
                  <>
                    <input
                      type="text"
                      onChange={(e) =>
                        playerNameChangeHandler(
                          e.target.value,
                          players[10].playerNumber
                        )
                      }
                      value={players[10].playerName}
                    />
                  </>
                ) : (
                  <p
                    style={{
                      ...(showPlayerNameState ? {} : hideStyle),
                    }}
                    className={`text-center z-50 text-black ${
                      showPlayerNameState ? "" : "hide"
                    }`}>
                    {players[10].playerName}
                  </p>
                )}
              </div>

              {currentFormation === "3-3-2-3-3" ||
              currentFormation === "3-3-1-2-3-2" ? (
                <div className="flex flex-col items-center">
                  <div className="bg-blue-600 mx-20 player-circle rounded-full flex items-center justify-center w-7 h-7">
                    <p className="text-yellow-400 capitalize shadow-white">
                      12
                    </p>
                  </div>
                  {editPlayerNameState ? (
                    <>
                      <input
                        type="text"
                        onChange={(e) =>
                          playerNameChangeHandler(
                            e.target.value,
                            players[11].playerNumber
                          )
                        }
                        value={players[11].playerName}
                      />
                    </>
                  ) : (
                    <p
                      style={{
                        ...(showPlayerNameState ? {} : hideStyle),
                      }}
                      className={`text-center z-50 text-black ${
                        showPlayerNameState ? "" : "hide"
                      }`}>
                      {players[11].playerName}
                    </p>
                  )}
                </div>
              ) : null}
            </div>
            <div
              style={{
                ...componentStyle,
                ...(showPlayerNameState ? {} : hideStyle),
              }}
              className={`my-component ${showPlayerNameState ? "" : "hide"}`}>
              {editPlayerNameState ? (
                <></>
              ) : (
                <>{/* You can add additional text here if needed */}</>
              )}
            </div>
          </div>

          <div className="full-forwards absolute w-full bg-blue-00 h-auto top-[88%] text-center">
            <div className="flex justify-center">
              <div className="flex flex-col items-center">
                <div className="bg-blue-600 mx-20 player-circle rounded-full flex items-center justify-center w-7 h-7">
                  <p className="text-yellow-400 capitalize shadow-white">13</p>
                </div>
                {editPlayerNameState ? (
                  <>
                    <input
                      type="text"
                      onChange={(e) =>
                        playerNameChangeHandler(
                          e.target.value,
                          players[12].playerNumber
                        )
                      }
                      value={players[12].playerName}
                    />
                  </>
                ) : (
                  <p
                    style={{
                      ...(showPlayerNameState ? {} : hideStyle),
                    }}
                    className={`text-center z-50 text-black ${
                      showPlayerNameState ? "" : "hide"
                    }`}>
                    {players[12].playerName}
                  </p>
                )}
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-blue-600 mx-20 player-circle rounded-full flex items-center justify-center w-7 h-7">
                  <p className="text-yellow-400 capitalize shadow-white">14</p>
                </div>
                {editPlayerNameState ? (
                  <>
                    <input
                      type="text"
                      onChange={(e) =>
                        playerNameChangeHandler(
                          e.target.value,
                          players[13].playerNumber
                        )
                      }
                      value={players[13].playerName}
                    />
                  </>
                ) : (
                  <p
                    style={{
                      ...(showPlayerNameState ? {} : hideStyle),
                    }}
                    className={`text-center z-50 text-black ${
                      showPlayerNameState ? "" : "hide"
                    }`}>
                    {players[13].playerName}
                  </p>
                )}
              </div>

              {currentFormation === "3-3-2-3-3" ||
              currentFormation === "3-3-1-2-2-3" ? (
                <div className="flex flex-col items-center">
                  <div className="bg-blue-600 mx-20 player-circle rounded-full flex items-center justify-center w-7 h-7">
                    <p className="text-yellow-400 capitalize shadow-white">
                      15
                    </p>
                  </div>
                  {editPlayerNameState ? (
                    <>
                      <input
                        type="text"
                        onChange={(e) =>
                          playerNameChangeHandler(
                            e.target.value,
                            players[14].playerNumber
                          )
                        }
                        value={players[14].playerName}
                      />
                    </>
                  ) : (
                    <p
                      style={{
                        ...(showPlayerNameState ? {} : hideStyle),
                      }}
                      className={`text-center text-black z-50 ${
                        showPlayerNameState ? "" : "hide"
                      }`}>
                      {players[14].playerName}
                    </p>
                  )}
                </div>
              ) : null}
            </div>
            <div
              style={{
                ...componentStyle,
                ...(showPlayerNameState ? {} : hideStyle),
              }}
              className={`my-component ${showPlayerNameState ? "" : "hide"}`}>
              {editPlayerNameState ? (
                <></>
              ) : (
                <>{/* You can add additional text here if needed */}</>
              )}
            </div>
          </div>
        </div>
        {/* Lines */}
        <div className="w-full 13-meter h-[2px] color-white top-[10%] absolute  bg-white"></div>
        <div className="w-full 21-meter h-[2px] color-white top-[16.15%] absolute  bg-white"></div>
        <div className="w-full 45-meter h-[2px] color-white top-[31.6%] absolute  bg-white"></div>
        <div className="w-full mid h-[2px] color-white top-[45%] absolute  bg-white"></div>
        <div className="w-[10%] left-[45%] mx-auto  mid-line h-[2px] color-white top-[50%] absolute  bg-white"></div>

        <div className="w-full mid h-[2px] color-white top-[55%] absolute  bg-white"></div>
        <div className="w-full op-45-meter h-[2px] color-white top-[69.2%] absolute  bg-white"></div>
        <div className="w-full op-21-meter h-[2px] color-white top-[83.85%] absolute  bg-white"></div>
        <div className="w-full op-13-meter h-[2px] color-white top-[90%] absolute  bg-white"></div>

        {/* Circles */}
        {/* <div
          className="21-circle text-center center border-b-0 color-white rotate-180 h-[10%] top-[16.15%] first-letter: w-[15%] left-[42.5%] border-2 
            rounded-tl-full absolute rounded-tr-full"></div>
        <div
          className="op-21-circle text-center center border-b-0 color-white  h-[8%] first-letter:
           w-[15%] top-[76%] left-[42.5%] border-2 
            rounded-tl-full absolute rounded-tr-full"></div> */}

        {/* Goals */}
        <div className="goals w-[15%] left-[42.5%] h-[5%] border-2 text-white mx-auto absolute "></div>
        <div className="goals w-[15%] left-[42.5%] h-[5%] border-2 text-white mx-auto absolute top-[95%] "></div>
      </div>
    </>
  );
};

export default SetPlay;
