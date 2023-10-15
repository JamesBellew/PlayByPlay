import { Outlet, Link } from "react-router-dom";
import ReactDOM from "react-dom/client";
import { useState, useEffect } from "react";

const Timeline = ({ movesArr, onButtonClick }) => {
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

  // [
  //   {
  //     move: "1",
  //     players: [
  //       {
  //         playerNumber: 2,
  //         newPitchPosition: "fb-hf-3",
  //         oldPitchPosition: "fb-hf-2",
  //       },
  //       {
  //         playerNumber: 5,
  //         newPitchPosition: "fb-hf-3",
  //         oldPitchPosition: "fb-hf-2",
  //       },
  //       // ... add more players as needed for this move
  //     ],
  //   },
  //   // {
  //   //   move: "2",
  //   //   players: [
  //   //     {
  //   //       playerNumber: 3,
  //   //       newPitchPosition: "fb-mf-4",
  //   //       oldPitchPosition: "fb-mf-3",
  //   //     },
  //   //     // ... add more players as needed for this move
  //   //   ],
  //   // },
  //   // ... add more moves as needed
  // ];

  const [currentMoveSelected, setcurrentMoveSelected] = useState(1);
  const handleButtonClick = () => {
    const dataToPass = true; // Replace this with the actual data you want to send
    onButtonClick(dataToPass);
  };

  // console.log("In Lineup comp");
  // console.log(props.moves);
  const [moves, setMoves] = useState(movesArr);

  // If the prop changes, update the state
  useEffect(() => {
    setMoves(movesArr);
  }, [movesArr]);
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
      {/* <div>
        {
          // Loop through the state array and render each object's attributes
          moves.map((move, index) => (
            <div key={index}>
              <p>
                Player Number: {move.playerNumber}New Position:{" "}
                {move.newPosition}
              </p>
              <p></p>
            </div>
          ))
        }
      </div> */}
      <h3 className="text-left mb-4 ">Move 1</h3>
      <ol class="items-center sm:flex mb-5">
        {
          // Loop through the state array and render each object's attributes
          moves.map((move, index) => (
            <div key={index}>
              {/* <p>
                Player Number: {move.playerNumber}New Position:{" "}
                {move.newPosition}
              </p> */}

              <li class="relative mb-6 sm:mb-0 ">
                <div class="flex items-center">
                  <div class="z-10 flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full ring-0 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0"></div>
                  <div class="hidden sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
                </div>
                <div class="mt-3 sm:pr-8">
                  <div className="">
                    <span className="">{move.playerNumber}</span> to{" "}
                    {move.newPosition}
                  </div>
                </div>
              </li>
              <p></p>
            </div>
          ))
        }
      </ol>
    </>
  );
};

export default Timeline;
