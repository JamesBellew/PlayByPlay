import React, { useState, useEffect, useRef } from "react";
import Timeline from "./FootballComponents/Timeline";
import SaveSetPlay from "./FootballComponents/SaveSetPlay";
import AccountSideBar from "./FootballComponents/AccountSidebar";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {
  faPlay,
  faPause,
  faForward,
  faRepeat,
  faShareNodes,
  faPenToSquare,
  faList,
} from "@fortawesome/free-solid-svg-icons";
import Line from "./Line";

const ViewPlay = (props) => {
  const refs = useRef({});

  const [activePosition, setActivePosition] = useState("mf-5");
  const [targetPosition, setTargetPosition] = useState("fb-2");

  useEffect(() => {
    // This will log the currentDiv after the component mounts and the ref is set
    const currentDiv = refs.current[activePosition];
    const targetDiv = refs.current[targetPosition];
    console.log(targetDiv);
  }, []);

  const [Moves, setMoves] = useState([]);
  const navigate = useNavigate();
  const [showTimelineState, setshowTimelineState] = useState(false);
  const [startingFifteenEditingState, updatestartingFifteenEditingState] =
    useState(true);
  const [players, setPlayers] = useState([
    // { playerNumber: 1, pitchPosition: "gk-1" },
    // { playerNumber: 2, pitchPosition: "fb-3" },
    // { playerNumber: 3, pitchPosition: "fb-6" },
    // { playerNumber: 4, pitchPosition: "fb-9" },
    // { playerNumber: 5, pitchPosition: "hb-3" },
    // { playerNumber: 6, pitchPosition: "hb-6" },
    // { playerNumber: 7, pitchPosition: "hb-9" },
    // { playerNumber: 8, pitchPosition: "mf-5" },
    // { playerNumber: 9, pitchPosition: "mf-7" },
    // { playerNumber: 10, pitchPosition: "mf-hf-3" },
    // { playerNumber: 11, pitchPosition: "mf-hf-6" },
    // { playerNumber: 12, pitchPosition: "mf-hf-9" },
    // { playerNumber: 13, pitchPosition: "ff-3" },
    // { playerNumber: 14, pitchPosition: "ff-6" },
    // { playerNumber: 15, pitchPosition: "ff-9" },
  ]);
  const [setplayName, setSetplayName] = useState("");
  const [setplayDate, setSetplayDate] = useState("");
  //false is not play, true is played
  const [playTimelineState, setPlayTimelineState] = useState(false);
  const [plays, setPlays] = useState([]);
  const [move2, setMove2] = useState([]);
  const [setPlayIsChosen, setSetplayIsChosen] = useState(false);
  const [ballPosition, setBallPosition] = useState("gk-1");
  const [playSelected, setPlaySelected] = useState({});
  const setPlayIsPickedHandler = (play) => {
    console.log(play);
    setPlaySelected(play);
    setSetplayIsChosen(true);
    // setPlayers(play.secondArray);
    setPlayers(play.secondArray);
    setMove2(createNewFormationFromMoves(play.secondArray, play.firstArray));
  };

  const [xTarget, setXTarget] = useState(0);
  console.log("X Target-", xTarget);
  const [yTarget, setYTarget] = useState(0);

  const [xCurrent, setXCurrent] = useState(0);
  console.log("X Current-", xCurrent);
  const [yCurrent, setYCurrent] = useState(0);
  const btnPlayHandler = () => {
    // console.log("cliked");
    setPlayTimelineState(true);

    const currentDiv = refs.current[activePosition];
    const targetDiv = refs.current[targetPosition];
    console.log("in here function");
    const currentRect = currentDiv.getBoundingClientRect();
    const targetRect = targetDiv.getBoundingClientRect();
    setXTarget(targetRect.x);
    setXCurrent(currentRect.x);
    setYTarget(targetRect.y);
    setYCurrent(currentRect.y);
    setPlayers(move2);
    // activePosition.style.transform = `translate(${translateX}px, ${translateY}px)`;
    // const currentRect = currentDiv.getBoundingClientRect();
    // const targetRect = targetDiv.getBoundingClientRect();

    // const translateX = targetRect.left - currentRect.left;
    // const translateY = targetRect.top - currentRect.top;
    // currentDiv.style.transform = `translate(${translateX}px, ${translateY}px)`;
    // currentDiv.style.transition = "transform 0.5s ease-in-out";

    // setPlayers(move2);
  };
  const btnResetHandler = () => {
    setPlayTimelineState(false);
    setPlayers(playSelected.secondArray);
  };
  const createPlayBtnHandler = () => {
    navigate("/Football/KickOuts");
  };
  const viewPlaysBtnHandler = () => {
    setSetplayIsChosen(false);
    // setPlaySelected([]);
    // setPlayTimelineState(false);
    // setPlayers([]);
  };
  console.log(playSelected);
  const numDivs = 11;
  useEffect(() => {
    // Fetch the plays data from local storage when the component mounts
    const storedPlays = JSON.parse(localStorage.getItem("setPlays"));
    if (storedPlays && Array.isArray(storedPlays)) {
      setPlays(storedPlays);
    }
  }, []);

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

  const TenDivs = ({ outerDivName, count, forceHide = false }) => (
    <>
      {[...Array(count).keys()].map((index) => {
        const divposition = outerDivName + "-" + (index + 1);
        // console.log(divposition);
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
          <div className={`group my-auto `}>
            <div
              key={index}
              // ref={(el) => (divRefs.current[divposition] = el)}
              ref={(el) => (refs.current[divposition] = el)}
              id={`${divposition}`}
              className={`${divposition} relative h-10 w-10 mx-auto my-auto text-black text-center cursor-auto
                ${
                  positionIsUsed
                    ? "bg-white positionUsed z-50 "
                    : "bg-primary/0"
                }
                ${
                  startingFifteenEditingState
                    ? "  transition-all bg-primary"
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
                {positionIsUsed ? matchingPlayerNumber : ""}
                {ballIsHere && showTimelineState && ballEditingState && (
                  <div className="football absolute z-100 cursor-pointer hover:bg-primary bg-black h-4 w-4 mx-auto ml-1 mt-2 rounded-full"></div>
                )}
              </span>
            </div>
          </div>
        );
      })}
    </>
  );
  const currentX = xCurrent;
  const targetX = xTarget;
  const currentY = yCurrent; // Example Y-coordinate
  const targetY = yTarget; // Example Y-coordinate
  return (
    <>
      <div style={{ position: "relative", width: "100%", height: "100%" }}>
        <Line
          currentX={currentX - 15}
          targetX={targetX - 15}
          currentY={currentY - 10}
          targetY={targetY - 10}
        />
        {/* other divs */}
      </div>
      <div className="grid grid-cols-3 gap-1 mt-5 grid-rows-6  h-[90vh] top-[5vh] ">
        {setPlayIsChosen && (
          <>
            <div className="bg-base-200 rounded-md p-2 ">
              <div className="stat">
                <div className="stat-figure text-primary">
                  <div className="avatar online">
                    <div className="w-14 rounded-full">
                      <img src="https://images.pexels.com/photos/1722198/pexels-photo-1722198.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
                    </div>
                  </div>
                  <p className="text-secondary">James</p>
                </div>
                <div className="stat-title text-md capitalize">
                  {playSelected.category}
                </div>
                <div className="text-2xl font-bold text-primary">
                  {playSelected.name}
                </div>
                <div className="stat-desc">{playSelected.date}</div>
              </div>
            </div>
            <div className="bg-base-200 rounded-md flex items-center justify-center h-full">
              <div className="btn-group  lg:btn-group-horizontal">
                {playTimelineState ? (
                  <button className="btn btn-active" onClick={btnResetHandler}>
                    {" "}
                    <FontAwesomeIcon icon={faRepeat} />
                  </button>
                ) : (
                  <button className="btn btn-active" onClick={btnPlayHandler}>
                    {" "}
                    <FontAwesomeIcon icon={faPlay} />
                  </button>
                )}

                <button className="btn">
                  <FontAwesomeIcon icon={faPause} />
                </button>
                <button className="btn">
                  <FontAwesomeIcon icon={faForward} />
                </button>
              </div>
            </div>

            <div className="bg-base-200 flex items-center justify-center">
              <div className="btn-group ">
                <button
                  onClick={viewPlaysBtnHandler}
                  className="btn btn-primary mx-1">
                  Plays <FontAwesomeIcon icon={faList} />
                </button>
                <button className="btn btn-primary">
                  <FontAwesomeIcon icon={faPenToSquare} />
                </button>
                <button className="btn btn-secondary mx-1">
                  <FontAwesomeIcon icon={faShareNodes} />
                </button>
              </div>
            </div>
          </>
        )}

        <div className="col-span-3  bg-base-200 rounded-md row-span-5 ...">
          {setPlayIsChosen ? (
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
                  <TenDivs outerDivName="fb-hf" count={numDivs} />
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
                  <TenDivs outerDivName="hb-mf" count={numDivs} />
                </div>
              </div>
              <div
                className={`flex-grow   grid ${
                  numDivs === 11 ? "grid-cols-11" : "grid-cols-3"
                }`}>
                <TenDivs outerDivName="mf" count={numDivs} />
              </div>

              <div className="flex-grow flex flex-col">
                <div
                  className={`flex-grow  h-10  grid ${
                    numDivs === 11 ? "grid-cols-11" : "grid-cols-3"
                  }`}>
                  <TenDivs outerDivName="mf-hf" count={numDivs} />
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
                  <TenDivs outerDivName="hf-ff" count={numDivs} />
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
            <>
              <div className="h-full flex flex-col justify-center items-center ">
                {/* //no setplay is selected */}
                <h1 className="mb-2 text-primary font-medium text-xl">
                  Please select a set play
                </h1>
                <table class="table shadow-xl rounded-lg  overflow-auto  w-auto bg-base-300">
                  {/* head */}
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Date</th>
                      <th>Moves</th>
                    </tr>
                  </thead>
                  <tbody className="">
                    {/* dynamic rows */}
                    {plays && plays.length > 0 ? (
                      plays.map((play, index) => (
                        <tr
                          key={index}
                          onClick={() => setPlayIsPickedHandler(play)}
                          className="bg-base-200 cursor-pointer hover:bg-primary rounded-xl transition-all">
                          <th>{index + 1}</th>
                          <td>{play?.name ?? "N/A"}</td>
                          <td>{play?.date ?? "N/A"}</td>
                          <td>{play?.firstArray?.length ?? 0}</td>
                        </tr>
                      ))
                    ) : (
                      <tr className="bg-base-200">
                        <td colSpan="4" className="text-center">
                          No plays available
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
                <hr className="text-xl font-bold mt-5 text-secondary"></hr>
                <h1 className="text-primary step  mb-2 font-medium text-xl">
                  Import a setPlay
                </h1>
                <input
                  type="file"
                  className="file-input align-top left-0 file-input-bordered  w-auto max-w-xs"
                />{" "}
                <div>
                  <hr className="text-xl font-bold m-5 text-secondary"></hr>

                  <button
                    onClick={createPlayBtnHandler}
                    className="bg-primary btn  text-white">
                    Create Play
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ViewPlay;
