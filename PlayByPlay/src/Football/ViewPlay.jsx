import React, { useState, useEffect, useRef } from "react";
import Timeline from "./FootballComponents/Timeline";
import SaveSetPlay from "./FootballComponents/SaveSetPlay";
import AccountSideBar from "./FootballComponents/AccountSidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause, faForward } from "@fortawesome/free-solid-svg-icons";

const ViewPlay = (props) => {
  const [Moves, setMoves] = useState([]);
  const [showTimelineState, setshowTimelineState] = useState(false);
  const [startingFifteenEditingState, updatestartingFifteenEditingState] =
    useState(true);
  const [players, setPlayers] = useState([
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
  ]);
  const [ballPosition, setBallPosition] = useState("gk-1");
  const numDivs = 11;
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
              className={`h-10 w-10 mx-auto my-auto text-black text-center cursor-auto
                ${positionIsUsed ? "bg-white positionUsed " : "bg-primary/0"}
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

  return (
    <>
      <div className="grid grid-cols-3 gap-1 mt-5 grid-rows-6  h-[90vh] top-[5vh] ">
        <div className="bg-base-200 rounded-md p-2 ">
          {/* <h1 className="text-primary">Pistol Offence</h1>
          <small className="text-xs">Created on 02/11/2023</small> */}
          <div className="stat">
            <div className="stat-figure text-primary">
              <div className="avatar online">
                <div className="w-14 rounded-full">
                  <img src="https://images.pexels.com/photos/1722198/pexels-photo-1722198.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
                </div>
              </div>
              <p>James</p>
            </div>
            <div className="stat-title">Offensive Play</div>
            <div className=" text-2xl font-bold text-primary">Pisol</div>
            <div className="stat-desc">02/11/2023</div>
          </div>
        </div>
        <div className="bg-base-200 rounded-md flex items-center justify-center h-full">
          <div className="btn-group btn-group-vertical lg:btn-group-horizontal">
            <button className="btn btn-active">
              {" "}
              <FontAwesomeIcon icon={faPlay} />
            </button>
            <button className="btn">
              <FontAwesomeIcon icon={faPause} />
            </button>
            <button className="btn">
              <FontAwesomeIcon icon={faForward} />
            </button>
          </div>
        </div>

        <div className="bg-base-200 flex items-center justify-center">
          <ul className="steps">
            <li className="step step-primary">Move 1</li>
            <li className="step step-primary">Move 2</li>
            <li className="step">Move 3</li>
          </ul>
        </div>

        <div className="col-span-3 bg-base-200 rounded-md row-span-5 ...">
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
        </div>
      </div>
    </>
  );
};

export default ViewPlay;
