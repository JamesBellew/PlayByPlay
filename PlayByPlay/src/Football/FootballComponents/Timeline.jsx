import { Outlet, Link } from "react-router-dom";
import ReactDOM from "react-dom/client";
import { useState } from "react";

const Timeline = (props) => {
  const basicFormation = [
    { playerNumber: 2, pitchPosition: "fb-hf-3" },
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
  const Moves = [
    {
      move: "1",
      players: [
        {
          playerNumber: 2,
          newPitchPosition: "fb-hf-3",
          oldPitchPosition: "fb-hf-2",
        },
        {
          playerNumber: 5,
          newPitchPosition: "fb-hf-3",
          oldPitchPosition: "fb-hf-2",
        },
        // ... add more players as needed for this move
      ],
    },
    // {
    //   move: "2",
    //   players: [
    //     {
    //       playerNumber: 3,
    //       newPitchPosition: "fb-mf-4",
    //       oldPitchPosition: "fb-mf-3",
    //     },
    //     // ... add more players as needed for this move
    //   ],
    // },
    // ... add more moves as needed
  ];

  const [currentMoveSelected, setcurrentMoveSelected] = useState(1);
  const handleButtonClick = () => {
    // Passing the data to the parent through the callback prop
    props.onRunClick(Moves);
  };
  return (
    <>
      <h1 className="ml-4 text-xl">
        Timeline{" "}
        <div
          className="btn left-0 text-left object-left ml-4  m-2 btn-primary"
          onClick={handleButtonClick}>
          Run
        </div>
      </h1>

      <ol className="relative mb-5 p-4 text-left border-l border-gray-200 dark:border-gray-700">
        {Moves.map((move, moveIndex) => (
          <li key={moveIndex} className="mb-10 ml-4">
            <div
              className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border 
                border-white dark:border-gray-900 dark:bg-gray-700"></div>
            <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
              {`Move ${move.move}`}
            </time>

            {move.players.map((player, playerIndex) => (
              <h3
                key={playerIndex}
                className="text-lg font-semibold text-gray-900 dark:text-white mt-2">
                <div className="inline-block mr-2 bg-orange-400 text-center rounded-full h-7 w-7">
                  {player.playerNumber}
                </div>
                {player.oldPitchPosition}
                <span className="text-md text-gray-500"> to </span>
                {player.newPitchPosition}
              </h3>
            ))}
          </li>
        ))}
      </ol>
    </>
  );
};

export default Timeline;
