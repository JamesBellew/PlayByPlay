import React, { useState, useEffect } from "react";
import Timeline from "./FootballComponents/Timeline";

const KickOuts = (props) => {
  const testhandler = (playherNumber) => {
    // alert("it's working ;)");
    updateStartingFifteenPlayerNumberSelected(playherNumber);
  };
  const handleDivClick = (outerDiv, index) => {
    //alert(`You clicked the ${index + 1}-th div inside the ${outerDiv} div`);
    const positionClicked = outerDiv + "-" + (index + 1);
    // alert(startingFiftenPlayerNumberSelected + "  into " + positionClicked);
    addPlayer(startingFiftenPlayerNumberSelected, positionClicked);
  };
  const assignBasicFormation1 = () => {
    const basicFormation = [
      { playerNumber: 2, pitchPosition: "fb-3" },
      { playerNumber: 3, pitchPosition: "fb-5" },
      { playerNumber: 4, pitchPosition: "fb-7" },
      { playerNumber: 5, pitchPosition: "fb-hf-2" },
      { playerNumber: 6, pitchPosition: "hb-5" },
      { playerNumber: 7, pitchPosition: "fb-hf-8" },
      { playerNumber: 8, pitchPosition: "mf-4" },
      { playerNumber: 9, pitchPosition: "mf-6" },
      { playerNumber: 10, pitchPosition: "mf-hf-2" },
      { playerNumber: 11, pitchPosition: "mf-hf-5" },
      { playerNumber: 12, pitchPosition: "mf-hf-8" },
      { playerNumber: 13, pitchPosition: "hf-5" },
      { playerNumber: 14, pitchPosition: "ff-4" },
      { playerNumber: 15, pitchPosition: "ff-6" },
    ];

    setPlayers(basicFormation);
  };
  const assignBasicFormation2 = () => {
    const basicFormation = [
      { playerNumber: 2, pitchPosition: "fb-3" },
      { playerNumber: 3, pitchPosition: "fb-5" },
      { playerNumber: 4, pitchPosition: "fb-7" },
      { playerNumber: 5, pitchPosition: "fb-hf-2" },
      { playerNumber: 6, pitchPosition: "hb-5" },
      { playerNumber: 7, pitchPosition: "fb-hf-8" },
      { playerNumber: 8, pitchPosition: "mf-4" },
      { playerNumber: 9, pitchPosition: "mf-6" },
      { playerNumber: 10, pitchPosition: "mf-hf-2" },
      { playerNumber: 11, pitchPosition: "mf-hf-5" },
      { playerNumber: 12, pitchPosition: "mf-hf-8" },
      { playerNumber: 13, pitchPosition: "hf-5" },
      { playerNumber: 14, pitchPosition: "ff-4" },
      { playerNumber: 15, pitchPosition: "ff-6" },
    ];

    setPlayers(basicFormation);
  };

  const testFirstMoveArray = () => {
    const basicFormation = [
      { playerNumber: 2, pitchPosition: "fb-1" },
      { playerNumber: 3, pitchPosition: "fb-5" },
      { playerNumber: 4, pitchPosition: "fb-10" },
      { playerNumber: 5, pitchPosition: "fb-hf-1" },
      { playerNumber: 6, pitchPosition: "hb-5" },
      { playerNumber: 7, pitchPosition: "fb-hf-10" },
      { playerNumber: 8, pitchPosition: "mf-2" },
      { playerNumber: 9, pitchPosition: "mf-9" },
      { playerNumber: 10, pitchPosition: "mf-hf-1" },
      { playerNumber: 11, pitchPosition: "mf-hf-5" },
      { playerNumber: 12, pitchPosition: "mf-hf-10" },
      { playerNumber: 13, pitchPosition: "hf-5" },
      { playerNumber: 14, pitchPosition: "ff-4" },
      { playerNumber: 15, pitchPosition: "ff-6" },
    ];
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
  const [showTimelineState, setshowTimelineState] = useState(false);
  const showTinelineHandler = () => {
    setshowTimelineState(true);
  };
  const StartingFifteen = () => {
    return (
      <div className="grid grid-rows-2 text-center grid-cols-8 w-full p-5">
        <h2 className="col-span-8 text-white text-lg left-0">
          Select Position on pitch for Player
          {startingFiftenPlayerNumberSelected}
        </h2>
        {usePlayersLength === 14 && (
          <div className="absolute self-center mx-auto text-center w-[100%] left-0 ">
            <button
              onClick={showTinelineHandler}
              className="btn btn-primary col-span-2 m-2 text-white  left-0">
              Next
            </button>
            <button className="btn btn-secondary col-span-2 text-white  left-0 ">
              Edit Lineout
            </button>
          </div>
        )}
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

  const TenDivs = ({ outerDivName, count, forceHide = false }) => (
    <>
      {[...Array(count).keys()].map((index) => {
        const divposition = outerDivName + "-" + (index + 1);

        const positionIsUsed = players.some(
          (player) => player.pitchPosition === divposition
        );
        const matchingPlayerNumber =
          players.find((player) => player.pitchPosition === divposition)
            ?.playerNumber || "Not Found";

        const shouldHide = false;
        // = players.length === 14 && !positionIsUsed;

        return (
          <div className="group my-auto">
            <div
              key={index}
              onClick={() => {
                if (startingFifteenEditingState && !shouldHide) {
                  if (positionIsUsed) {
                    testhandler(matchingPlayerNumber);
                  } else {
                    handleDivClick(outerDivName, index);
                  }
                }
              }}
              className={`h-10 w-10 mx-auto my-auto text-center
                ${positionIsUsed ? "bg-orange-400 positionUsed " : ""}
                ${
                  startingFifteenEditingState
                    ? " cursor-pointer transition-all bg-emerald-400 hover:bg-orange-400"
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
  const usePlayersLength = players.length;
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
  useEffect(() => {
    getRemainingNumber();
  }, [players]);

  const getRemainingNumber = () => {
    const totalPlayers = 14;
    const numbers = [...Array(totalPlayers).keys()].map((index) => index + 2);

    const remainingNumbers = numbers.filter(
      (playerNumber) =>
        !players.some((player) => player.playerNumber === playerNumber)
    );

    let selectedNumber;
    console.log(remainingNumbers);
    // If there are remaining numbers, get the smallest.
    if (remainingNumbers.length > 0) {
      selectedNumber = Math.min(...remainingNumbers);
    } else if (players.length >= totalPlayers - 1) {
      // This means all numbers between 2-15 are occupied
      selectedNumber = 2; // or any other default you'd like when the array is full
    } else {
      // Get the smallest from the players array between 2-15 if there are any.
      const validPlayerNumbers = players
        .map((player) => player.playerNumber)
        .filter((number) => number >= 2 && number <= 15);

      selectedNumber = 6;

      // Math.min(...validPlayerNumbers);
    }

    updateStartingFifteenPlayerNumberSelected(selectedNumber);

    return remainingNumbers;
  };

  const addPlayer = (number, position) => {
    setPlayers((prevPlayers) => {
      // Check if the player with the given number already exists
      const existingPlayerIndex = prevPlayers.findIndex(
        (player) => player.playerNumber === number
      );

      if (existingPlayerIndex !== -1) {
        // Player exists, so we update its position
        const updatedPlayers = [...prevPlayers];
        updatedPlayers[existingPlayerIndex].pitchPosition = position;
        return updatedPlayers;
      } else {
        // Player doesn't exist, so we add a new entry
        const newPlayer = {
          playerNumber: number,
          pitchPosition: position,
        };
        return [...prevPlayers, newPlayer];
      }
    });

    // The rest of your code remains unchanged
    // ...
    // updateStartingFifteenPlayerNumberSelected(10);
    getRemainingNumber();
  };

  // console.log(players);
  // console.log(getRemainingNumber);
  const ShowClearSelectionModal = () => {
    document.getElementById("my_modal_1").showModal();
  };
  const removeAllCurrentPlayersFromPitch = () => {
    setPlayers([]);
  };

  const handleFormationData = (data) => {
    // setPlayers(data);
    console.log(JSON.stringify(data, null, 2) + " from child");

    // Now, you have the data in the parent component. You can use it as needed.
  };
  return (
    <>
      <div className="flex">
        {!showTimelineState && (
          <div className="btn-group">
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

            <div className="dropdown left-1  bg-blue-400 mb-2  text-gray-800  font-medium px-4 rounded  z-10">
              <label tabIndex={0} className="cursor-pointer m-1">
                Templates
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content text-white z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                <li>
                  <a onClick={assignBasicFormation1}>Basic 3-3-2-3-3</a>
                </li>
                <li>
                  <a onClick={assignBasicFormation2}>Wide -3-3-2-3-3</a>
                </li>
              </ul>
            </div>
            {players.length >= 1 && (
              <button
                onClick={ShowClearSelectionModal}
                className=" left-1 ml-2 bg-red-400 mb-2  text-gray-800  font-medium px-4 rounded  z-10">
                Clear Selection
              </button>
            )}
          </div>
        )}
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
        {!showTimelineState && (
          <div className="relative flex  h-[20vh] bg-gray-700 mb-[2vh] rounded">
            <StartingFifteen></StartingFifteen>
          </div>
        )}
        {showTimelineState && (
          <Timeline onRunClick={handleFormationData}></Timeline>
        )}

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
