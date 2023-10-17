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

  const showTimelineButtonText = showTimelineState ? "-" : "+";
  // If the prop changes, update the state
  useEffect(() => {
    setMoves(movesArr);
  }, [movesArr]);
  return (
    <>
      <h1 className="ml-4 text-xl">
        Timeline{" "}
        {moves.length >= 1 && (
          <div
            className="btn left-0 text-left object-left ml-4  m-2 btn-primary"
            onClick={handleButtonClick}>
            Run
          </div>
        )}
      </h1>
      <h3 className="text-left mb-4 ">
        Move 1
        {moves.length >= 1 && (
          <button
            onClick={showTimeLineButtonHandler}
            className="ml-2 text-primary p-2 ">
            {showTimelineButtonText}
          </button>
        )}
      </h3>
      {showTimelineState && (
        <ol class="items-center sm:flex mb-5">
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
                        className="absolute mb-10 ml-10 ">
                        -
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
