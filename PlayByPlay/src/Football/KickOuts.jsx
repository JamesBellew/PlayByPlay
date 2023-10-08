import React, { useState } from "react";

const KickOuts = () => {
  const handleDivClick = (outerDiv, index) => {
    //alert(`You clicked the ${index + 1}-th div inside the ${outerDiv} div`);
    const positionClicked = outerDiv + "-" + (index + 1);
    // alert(startingFiftenPlayerNumberSelected + "  into " + positionClicked);
    addPlayer(startingFiftenPlayerNumberSelected, positionClicked);
  };
  const [players, setPlayers] = useState([
    // {
    //   playerNumber: 10,
    //   pitchPosition: "fb-1",
    // },
    //... You can add more players here as needed
  ]);

  const [
    startingFiftenPlayerNumberSelected,
    updateStartingFifteenPlayerNumberSelected,
  ] = useState(2);
  const [startingFifteenEditingState, updatestartingFifteenEditingState] =
    useState(true);
  const startingFifteenSelectedHandler = (playerNumber) => {
    // user just clicked on one of the numbers
    // I now want to update the startinf 15 to only show tobfbb clicked number as active
    updateStartingFifteenPlayerNumberSelected(playerNumber);
    updatestartingFifteenEditingState(true);
  };
  const StartingFifteen = () => {
    return (
      <div className="grid grid-rows-2 text-center grid-cols-8 w-full p-5">
        <h2 className="col-span-8 text-white text-lg left-0">
          Select Position on pitch for Player
          {startingFiftenPlayerNumberSelected}
        </h2>
        {[...Array(14).keys()]
          .map((index) => index + 2) // Convert indexes to player numbers
          .filter(
            (playerNumber) =>
              !players.some((player) => player.playerNumber === playerNumber)
          ) // Filter out numbers present in the 'players' array
          .map((playerNumber) => (
            <p
              key={playerNumber}
              onClick={() => startingFifteenSelectedHandler(playerNumber)}
              className={`text-white hover:scale-105 mx-auto
            transition-all cursor-pointer h-10 my-auto
            text-center  m-2 w-10 
            ${
              playerNumber === startingFiftenPlayerNumberSelected
                ? "bg-emerald-400"
                : "bg-blue-400"
            } rounded-full`}>
              {playerNumber}
            </p>
          ))}
      </div>
    );
  };

  const TenDivs = ({ outerDivName, count }) => (
    <>
      {[...Array(count).keys()].map((index) => {
        const divposition = outerDivName + "-" + (index + 1);

        const positionIsUsed = players.some(
          (player) => player.pitchPosition === divposition
        );
        const matchingPlayerNumber =
          players.find((player) => player.pitchPosition === divposition)
            ?.playerNumber || "Not Found";

        const shouldHide = players.length === 14 && !positionIsUsed;

        return (
          <div className="group my-auto">
            <div
              key={index}
              onClick={() => {
                if (startingFifteenEditingState && !shouldHide) {
                  handleDivClick(outerDivName, index);
                }
              }}
              className={`h-10 w-10 mx-auto my-auto text-center
                ${positionIsUsed ? "bg-orange-500 positionUsed " : ""}
                ${
                  startingFifteenEditingState
                    ? "bg-slate-400 cursor-pointer transition-all hover:bg-emerald-400"
                    : "bg-slate-400 opacity-20 disabled"
                }
                ${shouldHide ? "opacity-0 cursor-default" : ""}
                p-2 m-2 rounded-full`}>
              <span className="text-white duration-75">
                {positionIsUsed ? matchingPlayerNumber : "+"}
              </span>
            </div>
          </div>
        );
      })}
    </>
  );

  const [numDivs, setNumDivs] = useState(10);
  const [showSweeperSectionState, setshowSweeperSectionState] = useState(true);
  const changeButtonText = numDivs === 3 ? "10 rows" : "3 rows";

  const showSweeperButtonText = showSweeperSectionState
    ? "Show Only 3-3-2-3-3"
    : "Show Sweeper Formation";

  const toggleDivs = () => {
    if (players.length === 0) {
      setNumDivs((prevNum) => (prevNum === 10 ? 3 : 10));
    } else {
      // alert("you have players selcted on the pitch");
      document.getElementById("my_modal_1").showModal();
    }
  };
  const sweeperSectionHandler = () => {
    //first we want to see if there is anything stored in the players array
    if (players.length === 0) {
      setshowSweeperSectionState(!showSweeperSectionState);
    } else {
      // alert("you have players selcted on the pitch");
      document.getElementById("my_modal_1").showModal();
    }
  };

  const addPlayer = (number, position) => {
    const newPlayer = {
      playerNumber: number,
      pitchPosition: position,
    };
    setPlayers((prevPlayers) => [...prevPlayers, newPlayer]);
  };
  // console.log(players);

  const removeAllCurrentPlayersFromPitch = () => {
    setPlayers([]);
  };
  return (
    <>
      <div className="flex">
        <button
          onClick={toggleDivs}
          className=" left-1 bg-blue-400 mb-2 text-gray-800  font-medium  px-4 rounded  z-10">
          {changeButtonText}
        </button>

        <button
          onClick={sweeperSectionHandler}
          className=" left-1 ml-2 bg-blue-400 mb-2  text-gray-800  font-medium px-4 rounded  z-10">
          {showSweeperButtonText}
        </button>
      </div>
      <div className="centering-wrapper">
        <dialog id="my_modal_1" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Hey</h3>
            <p className="py-4">
              You have players on the pitch in formation. To swicth formations,
              you will need to remove all players from the pitch
            </p>
            <div className="modal-action">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}

                <button className="btn mr-2">Back</button>
                <button
                  onClick={removeAllCurrentPlayersFromPitch}
                  className="btn bg-red-500 text-white">
                  Remove all Players
                </button>
              </form>
            </div>
          </div>
        </dialog>
        <div className="relative flex  h-[20vh] bg-gray-700 mb-[2vh] rounded">
          <StartingFifteen></StartingFifteen>
        </div>

        <div className="flex flex-col bg-green-600 relative self-center  gap-4 h-[70vh]">
          <div className="flex-grow flex flex-col">
            <div
              className={`flex-grow border grid ${
                numDivs === 10 ? "grid-cols-10" : "grid-cols-3"
              }`}>
              <TenDivs outerDivName="fb" count={numDivs} />
            </div>

            <div
              className={`flex-grow  h-10  grid ${
                numDivs === 10 ? "grid-cols-10" : "grid-cols-3"
              }`}>
              {showSweeperSectionState && (
                <TenDivs outerDivName="fb-hf" count={numDivs} />
              )}
            </div>
            <div
              className={`flex-grow border grid ${
                numDivs === 10 ? "grid-cols-10" : "grid-cols-3"
              }`}>
              <TenDivs outerDivName="hb" count={numDivs} />
            </div>
            <div
              className={`flex-grow  h-10  grid ${
                numDivs === 10 ? "grid-cols-10" : "grid-cols-3"
              }`}>
              {showSweeperSectionState && (
                <TenDivs outerDivName="hb-mf" count={numDivs} />
              )}
            </div>
          </div>
          <div
            className={`flex-grow border  grid ${
              numDivs === 10 ? "grid-cols-10" : "grid-cols-3"
            }`}>
            <TenDivs outerDivName="mf" count={numDivs} />
          </div>
          {/* <div className="bg-purple-600 h-1/6 grid grid-cols-10">
            <TenDivs outerDivName="Mid Purple" />
          </div> */}
          <div className="flex-grow flex flex-col">
            <div
              className={`flex-grow  h-10  grid ${
                numDivs === 10 ? "grid-cols-10" : "grid-cols-3"
              }`}>
              {showSweeperSectionState && (
                <TenDivs outerDivName="mf-hf" count={numDivs} />
              )}
            </div>
            <div
              className={`flex-grow border grid ${
                numDivs === 10 ? "grid-cols-10" : "grid-cols-3"
              }`}>
              <TenDivs outerDivName="hf" count={numDivs} />
            </div>
            <div
              className={`flex-grow  h-10  grid ${
                numDivs === 10 ? "grid-cols-10" : "grid-cols-3"
              }`}>
              {showSweeperSectionState && (
                <TenDivs outerDivName="hf-ff" count={numDivs} />
              )}
            </div>
            <div
              className={`flex-grow border  grid ${
                numDivs === 10 ? "grid-cols-10" : "grid-cols-3"
              }`}>
              <TenDivs outerDivName="ff" count={numDivs} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default KickOuts;
