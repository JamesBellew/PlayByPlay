import React, { useState, useEffect, useRef } from "react";
import Timeline from "./FootballComponents/Timeline";
import SaveSetPlay from "./FootballComponents/SaveSetPlay";
import AccountSideBar from "./FootballComponents/AccountSidebar";
import { useNavigate } from "react-router-dom";
import Line from "./Line";


const KickOuts = (props) => {
  const navigate = useNavigate();
  const fb1Ref = useRef(null);
  useEffect(() => {
    if (fb1Ref.current) {
      const rect = fb1Ref.current.getBoundingClientRect();
      console.log(`Position of div with class 'fb-1': `, rect.top, rect.left);
    }
  }, [fb1Ref.current]);
  const testhandler = (playherNumber) => {
    // alert("it's working ;)");
    updateStartingFifteenPlayerNumberSelected(playherNumber);
  };
  const handleDivClick = (outerDiv, index) => {
    //alert(`You clicked the ${index + 1}-th div inside the ${outerDiv} div`);
    const positionClicked = outerDiv + "-" + (index + 1);

    // alert(startingFiftenPlayerNumberSelected + "  into " + positionClicked);
    if (showTimelineState) {
      //the user is in timeline mode and now we must record moves
      console.log("move below");
      addMove(startingFiftenPlayerNumberSelected, positionClicked);
      console.log(Moves);
    } else {
      addPlayer(startingFiftenPlayerNumberSelected, positionClicked);
    }
  };

  //this below usestate is for testing the API from the backend
  const [backendData, setBackendData] = useState([{}]);
  useEffect(() => {
    fetch("/formations")
      .then((response) => response.json())
      .then((data) => {
        setBackendData(data);
      });
  }, []);
  //end of the testing
  const [Moves, setMoves] = useState([]);
  const [Moves2, setMoves2] = useState([]);
  const [currentMoveSelected, setCurrentMoveSelected] = useState(1);

  const onMoveChange = (moveNumber) => {
    setCurrentMoveSelected(moveNumber); // Update the state with the new move number
    console.log(currentMoveSelected);
    // You can also perform other actions here if needed
  };
  const [isOnSaveSeytPlayPage, setIsOnSaveSeytPlayPage] = useState(false);
  const [ballPosition, setBallPosition] = useState("gk-1");
  const [firstCall, setFirstCall] = useState(true);
  const [ballEditingState, setBallEditingState] = useState(false);
  function addMove(playerNumber, newPosition) {
    if (firstCall) {
      if (currentMoveSelected == 2) {
        setMoves2([{ playerNumber, newPosition }]);
      } else {
        setMoves([{ playerNumber, newPosition }]);
      }
      setFirstCall(false);
    } else {
      if (currentMoveSelected == 2) {
        setMoves2((prevMoves) => [...prevMoves, { playerNumber, newPosition }]);
      } else {
        setMoves((prevMoves) => [...prevMoves, { playerNumber, newPosition }]);
      }
    }
  }

  const assignBasicFormation1 = () => {
    const basicFormation = [
      { playerNumber: 1, pitchPosition: "gk-1" },
      { playerNumber: 2, pitchPosition: "fb-3" },
      { playerNumber: 3, pitchPosition: "fb-6" },
      { playerNumber: 4, pitchPosition: "fb-9" },
      { playerNumber: 5, pitchPosition: "hb-3" },
      { playerNumber: 6, pitchPosition: "hb-6" },
      { playerNumber: 7, pitchPosition: "hb-9" },
      { playerNumber: 8, pitchPosition: "mf-5" },
      { playerNumber: 9, pitchPosition: "mf-7" },
      { playerNumber: 10, pitchPosition: "mf-hf-3" },
      { playerNumber: 11, pitchPosition: "mf-hf-6" },
      { playerNumber: 12, pitchPosition: "mf-hf-9" },
      { playerNumber: 13, pitchPosition: "ff-3" },
      { playerNumber: 14, pitchPosition: "ff-6" },
      { playerNumber: 15, pitchPosition: "ff-9" },
    ];

    setPlayers(basicFormation);
  };
  const assignBasicFormation2 = () => {
    const basicFormation = [
      { playerNumber: 1, pitchPosition: "gk-1" },
      { playerNumber: 2, pitchPosition: "fb-1" },
      { playerNumber: 3, pitchPosition: "fb-3" },
      { playerNumber: 4, pitchPosition: "fb-10" },
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

    //setPlayers(basicFormation);
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
    {
      playerNumber: 1,
      pitchPosition: "gk-1",
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
  const [showTimelineState, setshowTimelineState] = useState(false);

  const showTinelineHandler = () => {
    setshowTimelineState(true);
  };
  const StartingFifteen = () => {
    return (
      <div className="grid grid-rows-2 text-center grid-cols-8 w-full h-auto p-5">
        <h2 className="col-span-8 row  text-white text-lg left-0">
          Select Position on pitch for Player
          {startingFiftenPlayerNumberSelected}
        </h2>
        {usePlayersLength === 15 && (
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
              className={` hover:scale-105 mx-auto
            transition-all cursor-pointer h-10 my-auto
            text-center  m-2 w-10 
            ${
              playerNumber === startingFiftenPlayerNumberSelected
                ? "bg-white text-black"
                : "bg-primary/20"
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
        //getting the postion of the divs

        const positionIsUsed = players.some(
          (player) => player.pitchPosition === divposition
        );
        const ballIsHere = divposition === ballPosition;
        // console.log(ballIsHere);
        const matchingPlayerNumber =
          players.find((player) => player.pitchPosition === divposition)
            ?.playerNumber || "Not Found";
        const isPlayerMoving = Moves.some(
          (move) => move.playerNumber === matchingPlayerNumber
        );
        const divRefs = useRef([]);
        const shouldHide = false;
        // = players.length === 14 && !positionIsUsed;

        return (
          <div className="group my-auto">
            <div
              key={index}
              ref={(el) => (divRefs.current[divposition] = el)}
              onClick={() => {
                if (startingFifteenEditingState && !shouldHide) {
                  if (positionIsUsed) {
                    //the user clicked on a position on the pitch that ha sa player and can move it to a different position

                    testhandler(matchingPlayerNumber);
                  } else if (ballEditingState) {
                    ballMoveHandler(outerDivName, index);
                  } else {
                    handleDivClick(outerDivName, index);
                  }
                }
              }}
              className={`h-10 w-10 mx-auto my-auto text-black text-center
          
                ${positionIsUsed ? "bg-white positionUsed " : "bg-primary/20"}
                ${
                  startingFifteenEditingState
                    ? " cursor-pointer transition-all bg-primary hover:bg-secondary"
                    : "bg-slate-400 opacity-20 disabled"
                }
                ${
                  isPlayerMoving
                    ? "  bg-orange-200   border-2 border-blue-500"
                    : ""
                }
                ${shouldHide ? "opacity-0 cursor-default" : ""}
              
                p-2 m-2 rounded-full`}>
              <span
                className={` ${
                  positionIsUsed ? "text-black" : "text-white"
                } duration-75`}>
                {positionIsUsed ? matchingPlayerNumber : "+"}
                {ballIsHere && showTimelineState && ballEditingState && (
                  <div
                    onClick={footballClickHandler}
                    className="football absolute z-100 cursor-pointer hover:bg-primary bg-black h-4 w-4 mx-auto ml-1 mt-2 rounded-full"></div>
                )}
              </span>
            </div>
          </div>
        );
      })}
    </>
  );

  const [movesArray, setMovesArray] = useState([]);
  const [numDivs, setNumDivs] = useState(11);
  const [showSweeperSectionState, setshowSweeperSectionState] = useState(true);
  const changeButtonText = numDivs === 3 ? "11 rows" : "3 rows";
  const usePlayersLength = players.length;
  const showSweeperButtonText = showSweeperSectionState
    ? "Show Only 3-3-2-3-3"
    : "Show Sweeper Formation";

  const toggleDivs = () => {
    if (players.length === 0) {
      setNumDivs((prevNum) => (prevNum === 11 ? 3 : 11));
    } else {
      // alert("you have players selcted on the pitch");
      document.getElementById("my_modal_1").showModal();
    }
  };
  const ballMoveHandler = (outerDiv, index) => {
    const positionClicked = outerDiv + "-" + (index + 1);
    setBallPosition(positionClicked);
    // alert("clicked");
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
  const ballEditingStateHandler = () => {
    setBallEditingState(true);
  };
  const footballClickHandler = () => {
    alert("clicked");
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

    // Now, you have the datavv in the parent component. You can use it as needed.
  };

  const createNewFormationFromMoves = (Formations, Moves) => {
    return Formations.map((player) => {
      // Try to find the player in the Moves array by their playerNumber
      const move = Moves.find((m) => m.playerNumber === player.playerNumber);

      // If the player is found in Moves array
      if (move) {
        return {
          ...player,
          pitchPosition: move.newPosition, // update the position
        };
      }

      // Otherwise, return the player unchanged
      return player;
    });
  };

  const [dataFromChild, setDataFromChild] = useState(false);
  const [newFormationMove1, setNewformationMove1] = useState([]);
  const handleDataFromChild = (data) => {
    // Extract flag and movesArray from the data object
    const { flag, movesArray } = data;
    setDataFromChild(flag);
    console.log(movesArray);
    setMovesArray(movesArray);
    console.log(movesArray);
    const testing = createNewFormationFromMoves(players, movesArray);
    console.log(testing);
    setPlayers(testing);
  };

  const anotherFunction = () => {
    assignBasicFormation2();
  };

  useEffect(() => {
    if (dataFromChild) {
      anotherFunction();
    }
  }, [dataFromChild]); // Watch dataFromChild state for changes
  const backToFormationsHandler = () => {
    console.log("clicked");
    setshowTimelineState(!showTimelineState);
  };

  const moveToNextHandler = () => {
    // alert("clicked");

    //! this is only for testing comment this back in before pushing to github
    // setIsOnSaveSeytPlayPage(true);
    setBallEditingState(true);
  };
  const movetoSaveHandler = () => {
    setIsOnSaveSeytPlayPage(true);
    setBallEditingState(false);
  };

  const [saveSetPlayChildData, setSaveSetPlayChildData] = useState(null);

  const handleDataFromChildSaveSetPlay = (data) => {
    setSaveSetPlayChildData(data);
    alert(data);
    if (data) {
      //we now need to reset the view to show
      setIsOnSaveSeytPlayPage(false);
      setshowTimelineState(false);
      setPlayers([]);
      setMoves([]);
      navigate("/football/ViewPlay");
    }
  };
  console.log(currentMoveSelected);
  console.log(Moves2);
  return (
    <>
      <div className="centering-wrapper">
        <dialog id="my_modal_1" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Hey</h3>
            <p className="py-4">
              You have players on the pitch in formation. To swicth formations,
              you will need to remove all players from the pitch....
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
          <div className="relative flex  h-[18vh] bg-base-200 mb-[2vh] rounded">
            <StartingFifteen></StartingFifteen>
          </div>
        )}
        {showTimelineState && !isOnSaveSeytPlayPage && !ballEditingState && (
          <Timeline
            onMoveChange={onMoveChange}
            onRunClick={handleFormationData}
            onButtonClick={handleDataFromChild}
            movesArr={Moves}></Timeline>
        )}
        {ballEditingState && (
          <h1 className="my-5 font-semibold text-xl">
            Please select a position for the ball to be kicked to
          </h1>
        )}
        <div className="w-full my-auto self-center  flex bg-base-200 rounded-md">
          <div className="w-1/6 mx-auto ">
            <ul class="menu bg-base-200 h-full w-auto rounded-box">
              {!showTimelineState && (
                <li>
                  <h2 class="menu-title">Basic Functions</h2>
                  <ul>
                    <li>
                      <a
                        onClick={toggleDivs}
                        className=" left-1  mb-2   font-medium  px-4 rounded  z-10">
                        {changeButtonText}
                      </a>
                    </li>
                    <li>
                      <a
                        onClick={sweeperSectionHandler}
                        className=" left-1   mb-2   font-medium  rounded  z-10">
                        {showSweeperButtonText}
                      </a>
                    </li>
                    <li>
                      <div className="dropdown  mb-2   font-medium px-4 rounded  z-10">
                        <label tabIndex={0} className="cursor-pointer ">
                          Templates
                        </label>
                        <ul
                          tabIndex={0}
                          className="dropdown-content text-white z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                          <li>
                            <a onClick={assignBasicFormation1}>
                              Basic 3-3-2-3-3
                            </a>
                          </li>
                          <li>
                            <a onClick={assignBasicFormation2}>
                              Wide -3-3-2-3-3
                            </a>
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li>
                      {players.length > 1 && (
                        <button
                          onClick={ShowClearSelectionModal}
                          className=" left-1  text-red-400 mb-2    font-medium px-4 rounded  z-10">
                          Clear Selection
                        </button>
                      )}
                    </li>
                  </ul>
                </li>
              )}
              {showTimelineState && !isOnSaveSeytPlayPage && (
                <ul className="">
                  <h2 class="menu-title">Setplay Settings</h2>
                  <li className="mt-2">
                    <a onClick={backToFormationsHandler}>Back to Formation</a>
                  </li>
                  <li>
                    <a>Clear all Moves</a>
                  </li>
                  <div className=" divider ml-4"></div>
                  <li>
                    {!ballEditingState && (
                      <a
                        onClick={moveToNextHandler}
                        className={` ${
                          Moves.length < 1
                            ? "pointer-events-none opacity-50 text-base-200"
                            : ""
                        }hover:text-primary`}>
                        Next
                      </a>
                    )}
                    {ballEditingState && (
                      <a onClick={movetoSaveHandler}>Next</a>
                    )}
                  </li>
                  <li>
                    <a
                      className={` ${
                        Moves.length < 1
                          ? "pointer-events-none opacity-50  text-base-200"
                          : ""
                      }hover:text-primary`}>
                      Save
                    </a>
                  </li>
                </ul>
              )}
              <AccountSideBar />
            </ul>
          </div>
          {!isOnSaveSeytPlayPage ? (
            <div
              className="flex pitch flex-col
           rounded bg-base-200 w-4/6 mx-auto p-5 relative self-center
             h-[70vh]">
              <div className="flex-grow flex flex-col">
                <div
                  className={`flex-grow mx-auto   grid ${
                    numDivs === 11 ? "grid-cols-1" : "grid-cols-1"
                  }`}>
                  <TenDivs outerDivName="gk" count={1} />
                </div>
                <div
                  className={`flex-grow  grid ${
                    numDivs === 11 ? "grid-cols-11" : "grid-cols-3"
                  }`}>
                  <TenDivs outerDivName="fb" count={numDivs} />
                </div>

                <div
                  className={`flex-grow  h-10  grid ${
                    numDivs === 11 ? "grid-cols-11" : "grid-cols-3"
                  }`}>
                  {showSweeperSectionState && (
                    <TenDivs outerDivName="fb-hf" count={numDivs} />
                  )}
                </div>
                <div
                  className={`flex-grow  grid ${
                    numDivs === 11 ? "grid-cols-11" : "grid-cols-3"
                  }`}>
                  <TenDivs outerDivName="hb" count={numDivs} />
                </div>
                <div
                  className={`flex-grow  h-10  grid ${
                    numDivs === 11 ? "grid-cols-11" : "grid-cols-3"
                  }`}>
                  {showSweeperSectionState && (
                    <TenDivs outerDivName="hb-mf" count={numDivs} />
                  )}
                </div>
              </div>
              <div
                className={`flex-grow   grid ${
                  numDivs === 11 ? "grid-cols-11" : "grid-cols-3"
                }`}>
                <TenDivs outerDivName="mf" count={numDivs} />
              </div>
              {/* <div className="bg-purple-600 h-1/6 grid grid-cols-10">
            <TenDivs outerDivName="Mid Purple" />
          </div> */}
              <div className="flex-grow flex flex-col">
                <div
                  className={`flex-grow  h-10  grid ${
                    numDivs === 11 ? "grid-cols-11" : "grid-cols-3"
                  }`}>
                  {showSweeperSectionState && (
                    <TenDivs outerDivName="mf-hf" count={numDivs} />
                  )}
                </div>
                <div
                  className={`flex-grow  grid ${
                    numDivs === 11 ? "grid-cols-11" : "grid-cols-3"
                  }`}>
                  <TenDivs outerDivName="hf" count={numDivs} />
                </div>
                <div
                  className={`flex-grow  h-10  grid ${
                    numDivs === 11 ? "grid-cols-11" : "grid-cols-3"
                  }`}>
                  {showSweeperSectionState && (
                    <TenDivs outerDivName="hf-ff" count={numDivs} />
                  )}
                </div>
                <div
                  className={`flex-grow   grid ${
                    numDivs === 11 ? "grid-cols-11" : "grid-cols-3"
                  }`}>
                  <TenDivs outerDivName="ff" count={numDivs} />
                </div>
              </div>
            </div>
          ) : (
            <SaveSetPlay
              movesArr={Moves}
              secondMovesArray={Moves2}
              formation={players}
              dataFromSaveSetPlay={handleDataFromChildSaveSetPlay}
              ballPos={ballPosition}
            />
          )}
          <div className="w-1/6 mx-auto ">
            <ul class="menu bg-base-200 h-full w-auto rounded-box">
              <li>
                <h2 class="menu-title">Progress</h2>
                <ul className="steps steps-vertical ">
                  <li
                    data-content={`${showTimelineState ? "✓" : "-"}`}
                    className="step step-primary">
                    Formation
                  </li>
                  <li
                    data-content={`${isOnSaveSeytPlayPage ? "✓" : "-"}`}
                    className={`step ${
                      showTimelineState ? "step-primary" : ""
                    }`}>
                    Moves
                  </li>
                  <li
                    data-content={`${isOnSaveSeytPlayPage ? "✓" : "-"}`}
                    className={`step ${
                      isOnSaveSeytPlayPage ? "step-primary" : ""
                    }`}>
                    {" "}
                    Comments
                  </li>
                  <li
                    data-content={``}
                    className={`step ${
                      isOnSaveSeytPlayPage ? "step-primary" : ""
                    }`}>
                    {" "}
                    Save
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
        {/* <div className="bg-base-200 w-full mt-2 rounded-md p-4">
          {typeof backendData.formations === "undefined" ? (
            <p>Loading...</p>
          ) : (
            backendData.formations.map((formation, i) => (
              <p key={i}>{formation}</p>
            ))
          )}
        </div> */}
      </div>
    </>
  );
};

export default KickOuts;
