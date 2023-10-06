import React, { useState } from "react";

const KickOuts = () => {
  const handleDivClick = (outerDiv, index) => {
    // alert(`You clicked the ${index + 1}-th div inside the ${outerDiv} div`);
    const positionClicked = index + 1 + outerDiv;
    alert(
      startingFiftenPlayerNumberSelected + " is going into " + positionClicked
    );
    // addPlayer()
  };
  const [players, setPlayers] = useState([
    {
      playerNumber: 1,
      pitchPosition: "goalkeeper",
    },
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
        {[...Array(14).keys()].map((index) => (
          <p
            key={index}
            onClick={() => startingFifteenSelectedHandler(index + 2)}
            className={`text-white hover:scale-105 mx-auto
            transition-all cursor-pointer h-10 my-auto
            text-center  m-2 w-10 
            ${
              index + 2 === startingFiftenPlayerNumberSelected
                ? "bg-emerald-400"
                : "bg-blue-400"
            } rounded-full`}>
            {index + 2}
          </p>
        ))}
      </div>
    );
  };

  const TenDivs = ({ outerDivName, count }) => (
    <>
      {[...Array(count).keys()].map((index) => (
        <div className="group my-auto">
          <div
            key={index}
            onClick={() => {
              if (startingFifteenEditingState) {
                handleDivClick(outerDivName, index);
              }
            }}
            className={` h-10 w-10 mx-auto my-auto text-center
             ${
               startingFifteenEditingState
                 ? "bg-slate-400 cursor-pointer transition-all hover:bg-emerald-400"
                 : "bg-slate-400 opacity-20 disabled"
             }
         
              p-2 m-2 rounded-full`}>
            <span className="invisible text-white group-hover:visible duration-75">
              +
            </span>
          </div>
        </div>
      ))}
    </>
  );
  const [numDivs, setNumDivs] = useState(10);
  const [showSweeperSectionState, setshowSweeperSectionState] = useState(true);
  const changeButtonText = numDivs === 3 ? "10 rows" : "3 rows";

  const showSweeperButtonText = showSweeperSectionState
    ? "Show Only 3-3-2-3-3"
    : "Show Sweeper Formation";

  const toggleDivs = () => {
    setNumDivs((prevNum) => (prevNum === 10 ? 3 : 10));
  };
  const sweeperSectionHandler = () => {
    setshowSweeperSectionState(!showSweeperSectionState);
  };

  const addPlayer = (number, position) => {
    const newPlayerNumber =
      players.length > 0 ? players[players.length - 1].playerNumber + 1 : 1;
    const newPlayer = {
      playerNumber: newPlayerNumber,
      pitchPosition: position,
    };
    setPlayers((prevPlayers) => [...prevPlayers, newPlayer]);
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
        <div className="relative flex  h-[20vh] bg-gray-700 mb-[2vh] rounded">
          <StartingFifteen></StartingFifteen>
        </div>

        <div className="flex flex-col bg-green-600 relative self-center  gap-4 h-[70vh]">
          <div className="flex-grow flex flex-col">
            <div
              className={`flex-grow border grid ${
                numDivs === 10 ? "grid-cols-10" : "grid-cols-3"
              }`}>
              <TenDivs outerDivName="Full Back" count={numDivs} />
            </div>

            <div
              className={`flex-grow  h-10  grid ${
                numDivs === 10 ? "grid-cols-10" : "grid-cols-3"
              }`}>
              {showSweeperSectionState && (
                <TenDivs outerDivName="In between full Back" count={numDivs} />
              )}
            </div>
            <div
              className={`flex-grow border grid ${
                numDivs === 10 ? "grid-cols-10" : "grid-cols-3"
              }`}>
              <TenDivs outerDivName="yellow" count={numDivs} />
            </div>
            <div
              className={`flex-grow  h-10  grid ${
                numDivs === 10 ? "grid-cols-10" : "grid-cols-3"
              }`}>
              {showSweeperSectionState && (
                <TenDivs outerDivName="Grey" count={numDivs} />
              )}
            </div>
          </div>
          <div
            className={`flex-grow border  grid ${
              numDivs === 10 ? "grid-cols-10" : "grid-cols-3"
            }`}>
            <TenDivs outerDivName="Grey" count={numDivs} />
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
                <TenDivs outerDivName="Blue" count={numDivs} />
              )}
            </div>
            <div
              className={`flex-grow border grid ${
                numDivs === 10 ? "grid-cols-10" : "grid-cols-3"
              }`}>
              <TenDivs outerDivName="Pink" count={numDivs} />
            </div>
            <div
              className={`flex-grow  h-10  grid ${
                numDivs === 10 ? "grid-cols-10" : "grid-cols-3"
              }`}>
              {showSweeperSectionState && (
                <TenDivs outerDivName="Orange" count={numDivs} />
              )}
            </div>
            <div
              className={`flex-grow border  grid ${
                numDivs === 10 ? "grid-cols-10" : "grid-cols-3"
              }`}>
              <TenDivs outerDivName="Black" count={numDivs} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default KickOuts;
