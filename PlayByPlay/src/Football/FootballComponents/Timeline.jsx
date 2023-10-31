import { Outlet, Link } from "react-router-dom";
import ReactDOM from "react-dom/client";
import { useState, useEffect } from "react";

const Timeline = ({ movesArr, onButtonClick }) => {
  const [currentMoveSelected, setcurrentMoveSelected] = useState(1);
  const [NumberOfMoves, setNumberOfMoves] = useState(1);
  const [showTimelineState, setShowTimeLineState] = useState(true);
  const [timelineRunningState, setTimelineRunningState] = useState(false);
  const [addMovesErrorMessage, setaddMovesErrorMessage] = useState("");
  const [moves, setMoves] = useState(movesArr);
  // const [currentMoveDisplaying, setCurrentMoveDisplaying] = useStatemoves];
  const [moves2, setMoves2] = useState([
    {
      playerNumber: 2,
      newPosition: "fb-8",
    },
  ]);

  const handleButtonClick = () => {
    const dataToPass = {
      flag: true, // Replace this with the actual data you want to send
      movesArray: moves,
    };
    onButtonClick(dataToPass);
    setTimelineRunningState(true);
  };

  const removeMoveHandler = (playerNumberToRemove) => {
    const updatedMoves = moves.filter(
      (move) => move.playerNumber !== playerNumberToRemove
    );
    setMoves(updatedMoves);
  };
  const showTimeLineButtonHandler = () => {
    setShowTimeLineState(!showTimelineState);
  };
  const moveClearHandler = () => {
    setMoves([]);
  };
  const newMoveHandler = () => {
    //check if previous move has anything emtered into it
    //only allowing a max of 3 moves for now
    if (moves.length > 0) {
      if (NumberOfMoves < 3) {
        setNumberOfMoves(NumberOfMoves + 1);
      } else {
        setaddMovesErrorMessage("Max Moves hit");
      }
    } else {
      setaddMovesErrorMessage(
        "you need to enter a move first before adding another move"
      );
    }
  };

  const showTimelineButtonText = showTimelineState ? "^" : "^";
  const showTimelineDrpDwnText = showTimelineState ? "Minimize" : "Open Move";
  // If the prop changes, update the state
  useEffect(() => {
    setMoves(movesArr);
  }, [movesArr]);

  const changeMoveSelected = (moveNumber) => {
    setcurrentMoveSelected(moveNumber);
  };

  const MoveDropdownComponent = ({ moveNumber }) => {
    const isCurrentMove = moveNumber === currentMoveSelected;
    return (
      <div
        onClick={() => changeMoveSelected(moveNumber)}
        className="dropdown dropdown-hover dropdown z-[100]">
        <label
          onClick={moveLabelClickHandler}
          tabIndex={0}
          className={`btn m-1 
       ${isCurrentMove ? "text-primary" : ""}
        `}>
          {`Move ${moveNumber}`}
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content z-[1] menu p-2 shadow bg-base-200 rounded-box w-52">
          <li>
            <a
              onClick={() => moveClearHandler()}
              className={`${moves.length === 0 ? "line-through " : ""}`}>
              Clear All
            </a>
          </li>
          <li>
            <a>Change Duration</a>
          </li>
          <li>
            <a onClick={showTimeLineButtonHandler}>{showTimelineDrpDwnText}</a>
          </li>
        </ul>
      </div>
    );
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      setaddMovesErrorMessage("");
    }, 5000); // 5 seconds

    // Cleanup: clear the timer if the component is unmounted before 5 seconds
    return () => clearTimeout(timer);
  }, [movesArr]);

  const moveLabelClickHandler = () => {
    alert("clicked");
  };
  return (
    <div className="bg-base-200 p-4 rounded-md mb-2">
      {/* <h1 className="ml-4 text-xl">
        {moves.length >= 1 && (
          <div
            className="btn left-0 text-left object-left ml-4  btn-primary"
            onClick={handleButtonClick}>
            Run
          </div>
        )}
      </h1> */}
      <h3 className="text-left mb-4 text-xl ml-2 ">
        <p className="text-sm text-secondary ">{addMovesErrorMessage}</p>

        <div className="">
          <button onClick={showTimeLineButtonHandler}>
            {showTimelineButtonText}
          </button>

          {moves.length >= 1 && (
            <div
              className="btn mr-2 ml-2  btn-primary"
              onClick={handleButtonClick}>
              <h1>&#9658;</h1>
            </div>
          )}

          {Array(NumberOfMoves)
            .fill(0)
            .map((_, index) => (
              <MoveDropdownComponent key={index} moveNumber={index + 1} />
            ))}
          <button
            onClick={newMoveHandler}
            className="text-sm ml-3 p-1 rounded text-secondary hover:bg-base-200">
            +
          </button>
        </div>
        {/* {moves.length >= 1 && (
          <>
            <button
              onClick={showTimeLineButtonHandler}
              className="ml-2 text-primary p-2 ">
              {showTimelineButtonText}
            </button>
        
          </>
        )} */}
      </h3>
      {showTimelineState && (
        <ol
          class="items-center sm:flex mb-5 mt-2    border-l-2 border-gray-700
          py-2 px-3 
        ">
          {
            // Loop through the state array and render each object's attributes
            moves.map((move, index) => (
              <div key={index}>
                <li class="relative mb-6 sm:mb-0 ">
                  <div class="flex items-center">
                    <div
                      className={`z-10 flex items-center justify-center w-6 h-6 bg-blue-100 
                    rounded-full ring-0 ring-white dark:bg-blue-900 sm:ring-8 
                    ${
                      timelineRunningState
                        ? " dark:ring-primary/30"
                        : " dark:ring-blue-900/50"
                    }
                    shrink-0`}>
                      {move.playerNumber}
                      <button
                        onClick={() =>
                          removeMoveHandler(move.playerNumber, moves)
                        }
                        className="absolute mb-10 ml-10 text-xs text-secondary ">
                        x
                      </button>
                    </div>
                    <div
                      className={`hidden sm:flex w-full bg-gray-200 h-0.5
                    ${timelineRunningState ? "bg-primary" : "dark:bg-gray-700"}
                    `}></div>
                  </div>
                  <div class="mt-3 sm:pr-8">
                    <div className="">{move.newPosition}</div>
                  </div>
                </li>
              </div>
            ))
          }
        </ol>
      )}
    </div>
  );
};

export default Timeline;
