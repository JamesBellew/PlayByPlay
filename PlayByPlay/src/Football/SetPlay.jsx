import { useState } from "react";
import "../App.css";
const SetPlay = () => {
  const [players, setPlayers] = useState([
    { playerNumber: "01", playerName: "John Doe" },
    { playerNumber: "02", playerName: "Joe Blogs" },
    { playerNumber: "03", playerName: "Joe Blogs" },
    { playerNumber: "04", playerName: "Joe Blogs" },
    { playerNumber: "05", playerName: "John Doe" },
    { playerNumber: "06", playerName: "Joe Blogs" },
    { playerNumber: "07", playerName: "Joe Blogs" },
    { playerNumber: "08", playerName: "Joe Blogs" },
  ]);
  const buttonStyle = {
    float: "left", // Use 'left' to position the button on the left
    // Add any other styles you need here
  };
  const [settingsMenuState, updateSettingsMenuState] = useState(true);
  const [showPlayerNameState, updatePlayerNameState] = useState(true);
  const [editPlayerNameState, updateEditPlayerNameState] = useState(false);
  const settingsCloseHandler = () => {
    updateSettingsMenuState(!settingsMenuState);
  };
  const showPlayerNameHanlder = () => {
    updatePlayerNameState(!showPlayerNameState);
  };
  const editPlayerNameHandler = () => {
    updateEditPlayerNameState(!editPlayerNameState);
  };
  const buttonText = settingsMenuState ? "Close Settings" : "Settings";
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

  //this is the mapping for the full backs, this will need to become dynamic as formations become custome/changebale
  const fullBackNames = players.slice(1, 4).map((player, index) => (
    <div key={index} className="text-center">
      {player.playerName}
    </div>
  ));
  //this is the mapping for the Half backs, this will need to become dynamic as formations become custome/changebale
  const halfBackNames = players.slice(5, 8).map((player, index) => (
    <div key={index} className="text-center">
      {player.playerName}
    </div>
  ));
  const editPlayerName = (playerNumber, newPlayerName) => {
    // Create a copy of the players array
    const updatedPlayers = [...players];

    // Find the player with the specified playerNumber
    const playerIndex = updatedPlayers.findIndex(
      (player) => player.playerNumber === playerNumber
    );

    // If the player is found, update the playerName
    if (playerIndex !== -1) {
      updatedPlayers[playerIndex].playerName = newPlayerName;
      setPlayers(updatedPlayers);
    }
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
        <div className="bg-gray-700 top-[3vh] relative p-4 h-auto">
          <br></br>

          <div className="flex h-auto rounded mt-2   gaa-pitch relative bg-gray-600 settings p-4 ">
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
              <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Edit Formation
              </button>
            )}
            <button
              onClick={editPlayerNameHandler}
              className={`ml-2 ${
                editPlayerNameState ? "bg-red-500" : "bg-blue-500"
              } hover:bg-blue-700 text-white font-bold py-2 px-4 rounded`}>
              {EditPlayerNamebuttonText}
            </button>
            {editPlayerNameState && (
              <button
                onClick={() => editPlayerName("01", "New Name")}
                className="ml-2 bg-green-500 hover:bg-blue-700 text-white
                font-bold py-2 px-4 rounded">
                {" "}
                Save Player Names
              </button>
            )}
          </div>
          <div className="flex h-auto rounded mt-2 gaa-pitch relative bg-gray-600 settings p-4 ">
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Save Lineup
            </button>
            <button class=" ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Download
            </button>
          </div>
        </div>
      )}
      <div className="flex h-[80vh] w-full mb-[10vh] top-[7vh] gaa-pitch relative bg-green-500 ">
        <div class="grid grid-cols-3 gap-4  w-full ">
          <div class="goalkeeper absolute w-full h-10">
            <div class="bg-yellow-300 rounded w-12 mx-auto place-self-center center p-2">
              {players[0].playerNumber}
            </div>
            {editPlayerNameState ? (
              <>
                <input type="text" value="hi" className="z-50 mt-5" />
              </>
            ) : (
              <div class="text-center mt-3 z-50 player-name">
                {players[0].playerName}
              </div>
            )}
          </div>
          <div className="fullbacks absolute w-full bg-blue-00 h-auto top-[16.15%]">
            <div className="grid grid-cols-3 gap-4 place-items-center">
              <div className="bg-yellow-300 rounded p-2 w-12 ">02</div>
              <div className="bg-yellow-300 rounded p-2 w-12">03</div>
              <div className="bg-yellow-300 rounded p-2 w-12">04</div>
            </div>
            <div
              style={{
                ...componentStyle,
                ...(showPlayerNameState ? {} : hideStyle),
              }}
              className={`my-component ${showPlayerNameState ? "" : "hide"}`}>
              {editPlayerNameState ? (
                <>
                  <input type="text" />
                  <input type="text" />
                  <input type="text" />
                </>
              ) : (
                <>{fullBackNames}</>
              )}
              {/* <div className="text-center">Text 02</div>
              <div className="text-center">Text 03</div>
              <div className="text-center">Text 04</div> */}
            </div>
          </div>
          <div className="halfbacks absolute w-full bg-blue-00 h-auto top-[34.6%]">
            <div className="grid grid-cols-3 gap-4 place-items-center">
              <div className="bg-yellow-300 rounded p-2 w-12">05</div>
              <div className="bg-yellow-300 rounded p-2 w-12">06</div>
              <div className="bg-yellow-300 rounded p-2 w-12">07</div>
            </div>
            <div
              style={{
                ...componentStyle,
                ...(showPlayerNameState ? {} : hideStyle),
              }}
              className={`my-component ${showPlayerNameState ? "" : "hide"}`}>
              {editPlayerNameState ? (
                <>
                  <input type="text" />
                  <input type="text" />
                  <input type="text" />
                </>
              ) : (
                <>{halfBackNames}</>
              )}
            </div>
          </div>
          <div className="midfields absolute w-full bg-blue-00 h-auto top-[50%]">
            <div className="grid grid-cols-2 gap-4 place-items-center">
              <div className="bg-yellow-300 rounded ml-[20vw] p-2 w-12 text-center">
                08
              </div>
              <div className="bg-yellow-300 rounded p-2 w-12 mr-[20vw] text-center">
                09
              </div>
            </div>
            <div
              style={{
                ...(showPlayerNameState ? {} : hideStyle),
              }}
              className={` ${showPlayerNameState ? "" : "hide"}`}
              class="grid grid-cols-2 gap-4 text-center ">
              <div className="ml-[20vw]">Text 08</div>
              <div className="mr-[20vw]">Text 09</div>
            </div>
          </div>

          <div className="halfbacks absolute w-full bg-blue-00 h-auto top-[69.2%] text-center">
            <div className="grid grid-cols-3 gap-4 place-items-center">
              <div className="bg-yellow-300 rounded p-2 w-12">10</div>
              <div className="bg-yellow-300 rounded p-2 w-12">11</div>
              <div className="bg-yellow-300 rounded p-2 w-12">12</div>
            </div>
            <div
              style={{
                ...componentStyle,
                ...(showPlayerNameState ? {} : hideStyle),
              }}
              className={`my-component ${showPlayerNameState ? "" : "hide"}`}>
              {editPlayerNameState ? (
                <>
                  <input type="text" />
                  <input type="text" />
                  <input type="text" />
                </>
              ) : (
                <>
                  <div className="text-center">Text 02</div>
                  <div className="text-center">Text 03</div>
                  <div className="text-center">Text 04</div>
                </>
              )}
            </div>
          </div>

          <div className="halfbacks absolute w-full bg-blue-00 h-auto top-[90%] text-center">
            <div className="grid grid-cols-3 gap-4 place-items-center">
              <div className="bg-yellow-300 rounded p-2 w-12">10</div>
              <div className="bg-yellow-300 rounded p-2 w-12">11</div>
              <div className="bg-yellow-300 rounded p-2 w-12">12</div>
            </div>
            <div
              style={{
                ...componentStyle,
                ...(showPlayerNameState ? {} : hideStyle),
              }}
              className={`my-component ${showPlayerNameState ? "" : "hide"}`}>
              {editPlayerNameState ? (
                <>
                  <input type="text" />
                  <input type="text" />
                  <input type="text" />
                </>
              ) : (
                <>
                  <div className="text-center">Text 02</div>
                  <div className="text-center z-10">Text 03</div>
                  <div className="text-center z-10">Text 04</div>
                </>
              )}
            </div>
          </div>
        </div>
        {/* Lines */}
        <div className="w-full 13-meter h-[2px] color-white top-[10%] absolute  bg-white"></div>
        <div className="w-full 21-meter h-[2px] color-white top-[16.15%] absolute  bg-white"></div>
        <div className="w-full 45-meter h-[2px] color-white top-[34.6%] absolute  bg-white"></div>
        <div className="w-full mid h-[2px] color-white top-[50%] absolute  bg-white"></div>
        <div className="w-full op-45-meter h-[2px] color-white top-[69.2%] absolute  bg-white"></div>
        <div className="w-full op-21-meter h-[2px] color-white top-[83.85%] absolute  bg-white"></div>
        <div className="w-full op-13-meter h-[2px] color-white top-[90%] absolute  bg-white"></div>

        {/* Circles */}
        {/* <div
          className="21-circle text-center center border-b-0 color-white rotate-180 h-[10%] top-[16.15%] first-letter: w-[25%] left-[37.5%] border-2 
            rounded-tl-full absolute rounded-tr-full"></div>
        <div
          className="op-21-circle text-center center border-b-0 color-white  h-[10%] first-letter:
           w-[25%] top-[74%] left-[37.5%] border-2 
            rounded-tl-full absolute rounded-tr-full"></div> */}

        {/* Goals */}
        <div className="goals w-[25%] left-[37.5%] h-[5%] border-2 text-white mx-auto absolute "></div>
        <div className="goals w-[25%] left-[37.5%] h-[5%] border-2 text-white mx-auto absolute top-[95%] "></div>
      </div>
    </>
  );
};

export default SetPlay;
