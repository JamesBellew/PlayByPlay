import { Outlet, Link } from "react-router-dom";
import ReactDOM from "react-dom/client";
import { useState, useEffect } from "react";

const Timeline = ({ movesArr, onButtonClick }) => {
  const [currentMoveSelected, setcurrentMoveSelected] = useState(1);
  const [showTimelineState, setShowTimeLineState] = useState(true);
  const [moves, setMoves] = useState(movesArr);
  const handleButtonClick = () => {
    const dataToPass = {
      flag: true, // Replace this with the actual data you want to send
      movesArray: moves,
    };
    onButtonClick(dataToPass);
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
  const showTimelineButtonText = showTimelineState ? "-" : "+";
  const showTimelineDrpDwnText = showTimelineState ? "Minimize" : "Open Move";
  // If the prop changes, update the state
  useEffect(() => {
    setMoves(movesArr);
  }, [movesArr]);
  return (
    <>
      <h1 className="ml-4 text-xl">
        {moves.length >= 1 && (
          <div
            className="btn left-0 text-left object-left ml-4  btn-primary"
            onClick={handleButtonClick}>
            Run
          </div>
        )}
      </h1>
      <h3 className="text-left mb-4 text-xl ml-2 ">
        <div className="dropdown dropdown-hover dropdown-right z-[100]">
          <label tabIndex={0} className="btn m-1">
            Move 1
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content z-[1] menu p-2 shadow bg-base-200 rounded-box w-52">
            <li>
              <a
                onClick={() => moveClearHandler()}
                className={`
                ${moves.length === 0 ? "line-through " : ""}`}>
                Clear All
              </a>
            </li>
            <li>
              <a>Change Duration</a>
            </li>
            <li>
              <a onClick={showTimeLineButtonHandler}>
                {showTimelineDrpDwnText}
              </a>
            </li>
          </ul>
        </div>
        {moves.length >= 1 && (
          <>
            <button
              onClick={showTimeLineButtonHandler}
              className="ml-2 text-primary p-2 ">
              {showTimelineButtonText}
            </button>
          </>
        )}
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
                    <div class="z-10 flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full ring-0 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0">
                      {move.playerNumber}
                      <button
                        onClick={() =>
                          removeMoveHandler(move.playerNumber, moves)
                        }
                        className="absolute mb-10 ml-10 text-xs text-secondary ">
                        x
                      </button>
                    </div>
                    <div class="hidden sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
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
    </>
  );
};

export default Timeline;
