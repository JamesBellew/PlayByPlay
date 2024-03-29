import React, { useState, useEffect, useRef } from "react";
import Timeline from "./FootballComponents/Timeline";
import SaveSetPlay from "./FootballComponents/SaveSetPlay";
import AccountSideBar from "./FootballComponents/AccountSidebar";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import html2canvas from "html2canvas";
import AccountNav from "../AccountNav";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {
  faPlay,
  faPause,
  faForward,
  faRepeat,
  faShareNodes,
  faPenToSquare,
  faTrash,
  faList,
  faEyeSlash,
  faPeopleGroup,
  faXmark,
  faListOl,
  faRemove,
  faCircleNodes,
  faFloppyDisk,
  faDownload,
  faArrowDown91,
  faLink,
  faSlash,
  faUnlockKeyhole,
  faLockOpen,
  faLock,
} from "@fortawesome/free-solid-svg-icons";
import Line from "./Line";
import RemovePlayHandler from "./FootballComponents/RemovePlayConfirm";
import { useLocation } from "react-router-dom";
import { auth } from "../utils/firebase";
import { Helmet } from "react-helmet";

const ViewPlay = (props) => {
  const [user, loading] = useAuthState(auth);
  const googleProvider = new GoogleAuthProvider();
  const GoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log(result.user);
    } catch (error) {
      console.log(error);
    }
  };
  const refs = useRef({});
  const location = useLocation();
  // let { playId } = useParams();
  let { playId, userId } = useParams();
  // let { userURL, playIdUsed } = useParams();
  const [activePosition, setActivePosition] = useState("fb-1");
  const [targetPosition, setTargetPosition] = useState("mf-3");
  const [numberOfMoves, setNumberofMoves] = useState(1);
  const [ballPositionLine, setBallPositionLine] = useState("hb-4");
  const [showRunBoxComponent, setShowRunBoxComponent] = useState(false);
  const [homePageMessage, setHomePageMessage] = useState("");
  const [showPlayerNumberState, setShowPlayerNumberState] = useState(true);
  const [accessMessage, setAccessMessage] = useState("");
  const [isUserPlay,setIsUserPlay] = useState(false);
  useEffect(() => {
    // This will log the currentDiv after the component mounts and the ref is set
    const currentDiv = refs.current[activePosition];
    const targetDiv = refs.current[targetPosition];
  }, []);

  function removeUserPlays(playId) {
    // Replace 'http://localhost:5000' with the actual URL of your server
    const url = `http://1/removePlay/${playId}`;

    return fetch(url, { method: "DELETE" }) // Specify the DELETE method
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.text(); // It's likely that the response is not JSON but a simple text message
      })
      .then((data) => {
        console.log("Play removal response:", data); // Handle the data (confirmation message)
        return data;
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      });
  }

  function getUserPlays(userId) {
    // Replace 'your-server-url' with the actual URL of your server
    const url = `http://localhost:5001/getUserPlays/${userId}`;

    return fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        
        return response.json(); // Parse the JSON data from the response
      })
      .then((data) => {
        // console.log("User Plays:", data); // Handle the data
        return data;
        setIsServerErrorStatus(false)
      })
      .catch((error) => {
        setIsServerErrorStatus(true);
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      });
  }
  function changeAccess(playID, newAccess) {
    setPlayAccessLevel(newAccess);
    setHomePageMessage("Play Access changed to " + newAccess);
    setTimeout(() => {
      setHomePageMessage("");
    }, 2000);
    const url = "http://localhost:5001/changeAccess";
    return fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ playID, access: newAccess }), // Send playID and access in the request body
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // Handle the data
        setPlayAccessLevel(newAccess);

        return data;
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      });
  }

  function loadPlayFromLink(playId, userId) {
    console.log("callled yayayyayayya");
    const url = `http://1/loadPlayFromLink/${userId}/${playId}`;
    return fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json(); // Parse the JSON data from the response
      })
      .then((data) => {
        // console.log("User Plays:", data); // Handle the data
        return data;
        setAccessMessage("");
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
        setAccessMessage("Cannot View Play, currently set to private by owner");
      });
  }
  useEffect(() => {
    console.log("User ID:", userId);
    console.log("Play ID:", playId);
  }, [userId, playId]);

  //here is the hemlet for the sharing of plays on sociual media
  //! will want top dynamically change this to play name and shit, but cant test this until app is hosted
  <Helmet>
    <title>Play by Play Setplay</title>
    <meta property="og:title" content="play by play" />
    <meta property="og:description" content="this is a desc" />
    <meta
      property="og:image"
      content="https://images.pexels.com/photos/46798/the-ball-stadion-football-the-pitch-46798.jpeg"
    />
    <meta
      property="og:url"
      content={`http://localhost:5173/football/ViewPlay/account/${userId}/${playId}`}
    />
    <meta property="og:type" content="website" />
  </Helmet>;
  const [Moves, setMoves] = useState([]);
  const navigate = useNavigate();
  const [showRemoveConfirm, setShowRemoveConfirm] = useState(false);
  const [showTimelineState, setshowTimelineState] = useState(false);
  const [showMoveLines, setShowMoveLines] = useState(false);
  const [startingFifteenEditingState, updatestartingFifteenEditingState] =
    useState(true);
  const [players, setPlayers] = useState([]);
  const [setplayName, setSetplayName] = useState("");
  const [setplayDate, setSetplayDate] = useState("");
  //false is not play, true is played
  const [playTimelineState, setPlayTimelineState] = useState(false);
  const [plays, setPlays] = useState([]);
  const [move2, setMove2] = useState([]);
  const [secondMovesArray, setSecondMovesArray] = useState([]);
  const [secondMoveArray, setsecondMoveArray] = useState([]);
  const [setPlayIsChosen, setSetplayIsChosen] = useState(false);
  const [ballPosition, setBallPosition] = useState("hb-4");
  const [upperModalMsg, setUpperModalMsg] = useState(":)");
  const [isServerErrorStatus,setIsServerErrorStatus] = useState(false)
  const [isServerChildMsgShown,setIsServerChildMsgShown] = useState(false)
  const [playAccessLevel, setPlayAccessLevel] = useState("public");
  const [imageDownloadModalShowState, setImageDownloadModalShowState] =
    useState(false);
  const [playSelected, setPlaySelected] = useState({});
  const [lineData, setLineData] = useState([]);
  const [lineData2, setLineData2] = useState([]);
  const [lineCoordinates, setLineCoordinates] = useState([]);
  const [lineCoordinates2, setLineCoordinates2] = useState([]);
  // const { playIdUsed } = useParams();
  const [userPlaysUpdateTrigger, setUserPlaysUpdateTrigger] = useState(0);
  const [userPlays, setUserPlays] = useState(null);

  //this useeffect is called when t he user is signed in and then it retreives all of the plays stored to that user in the db
  useEffect(() => {
    if (user) {
      // User is logged in, call getUserPlays
      getUserPlays(user.uid)
        .then((plays) => {
          console.log(plays);
          setUserPlays(plays); // Store the plays in state
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      //clearing the previous user plays if user is logged out
      setUserPlays([]);
    }
  }, [user, AccountNav, userPlaysUpdateTrigger]);
  const findPlayByName = (playName) => {
    return plays.find((play) => play.name === playName);
  };
  useEffect(() => {
    // Ensure that we have line data to calculate coordinates for
    if (lineData.length > 0) {
      // Calculate all line coordinates
      const newLineCoordinates = calculateAllLineCoordinates(lineData);
      const newLineCoordinates2 = calculateAllLineCoordinates(lineData2);
      // Update the state with the new coordinates
      setLineCoordinates(newLineCoordinates);
      setLineCoordinates2(newLineCoordinates2);
    }
  }, [lineData]); // Dependency array ensures this runs whenever lineData changes
  //A play is picked

  const isAllowedViewPlay = (playUserId, userId) => {
    if (playUserId === userId) {
      return true;
    } else {
      return false;
    }
  };
const toggleChildServerErrorMsgDropdownHandler = ()=>{
  setIsServerChildMsgShown(!isServerChildMsgShown)
}
  const setPlayIsPickedHandler = (play, location) => {
    setIsUserPlay(isAllowedViewPlay(play.userId,user.uid));
    // console.log('here baiiii');
    // console.log(isAllowedViewPlay(play.id,user.uid));
    if (
      play.access === "private" &&
      isAllowedViewPlay(play.userId, user.uid) === false
    ) {
      setPlayAccessLevel(play.access);
      console.log("you are not allowed here :(");
    } else {
      if (location === "local") {
        navigate(`/football/ViewPlay/local/${play.name}`);
      } else {
        navigate(`/football/ViewPlay/account/${location}/${play.id}`);
      }
      setPlayAccessLevel(play.access);
      console.log("you are allowed here");
      setAccessMessage("");
      // navigate(`/football/ViewPlay/local/${play.name}`);
      setPlaySelected(play);
      setSetplayIsChosen(true);
      getLineCoordinance("mf-5", "fb-4");
      console.log(play);
      //getting the number of moves within the play for timign of delay
      if (play.secondMoveArray && play.secondMoveArray.length > 0) {
        setNumberofMoves(2);
      } else {
        setNumberofMoves(1);
      }
      console.log(numberOfMoves + "baiiiiiii");
      //set the target and current coordinants
      setBallPosition(play.ballPosition);
      setTargetPosition(play.firstArray[0].newPosition);
      setActivePosition("mf-3");
      setActivePosition(
        getCurrentPositionOnTargetValue(
          play.firstArray[0].playerNumber,
          play.secondArray
        )
      );
      setPlayers(play.secondArray);
      setMove2(createNewFormationFromMoves(play.secondArray, play.firstArray));
      setSecondMovesArray(play.secondMoveArray);
      // setsecondMoveArray(
      //   createNewFormationFromMoves(play.secondArray, play.secondMoveArray)
      // );
      const newLinesData = play.firstArray.map((move) => {
        const currentPosition = getCurrentPositionOnTargetValue(
          move.playerNumber,
          play.secondArray
        );
        return {
          playerNumber: 101,
          current: currentPosition,
          target: move.newPosition,
        };
      });
      //this is the lines for the second move array
      // const newLinesData2 = play.secondMoveArray.map((move) => {
      //   const currentPosition = getCurrentPositionOnTargetValue(
      //     move.playerNumber,
      //     play.secondArray
      //   );
      //   return {
      //     playerNumber: 101,
      //     current: currentPosition,
      //     target: move.newPosition,
      //   };
      // });

      const newLinesData2 =
        play.secondMoveArray && play.secondMoveArray.length > 0
          ? play.secondMoveArray.map((move) => {
              const currentPosition = getCurrentPositionOnTargetValue(
                move.playerNumber,
                play.secondArray
              );
              return {
                playerNumber: 101,
                current: currentPosition,
                target: move.newPosition,
              };
            })
          : [];

      //this is the ball position
      newLinesData.push({
        playerNumber: 1,
        current: "gk-1",
        target: play.ballPosition,
      });
      setLineData(newLinesData);
      setLineData2(newLinesData2);
      btnResetHandler();
      setPlayers(play.secondArray);
      // calculateLineCoordinates(exampleLine);
    }
  };
  //end of setplay is selected brackats
  const getCurrentPositionOnTargetValue = (playerNumber, players) => {
    const player = players.find((p) => p.playerNumber === playerNumber);
    return player ? player.pitchPosition : null;
  };
  const [xTarget, setXTarget] = useState(0);
  const [yTarget, setYTarget] = useState(0);
  const [xCurrent, setXCurrent] = useState(0);
  const [yCurrent, setYCurrent] = useState(0);

  const btnPlayHandler = () => {
    
    setPlayTimelineState(true);
    const currentDiv = refs.current[activePosition];
    const targetDiv = refs.current[targetPosition];
    const currentRect = currentDiv.getBoundingClientRect();
    const targetRect = targetDiv.getBoundingClientRect();
    setXTarget(targetRect.x);
    setXCurrent(currentRect.x);
    setYTarget(targetRect.y);
    setYCurrent(currentRect.y);
    //I want delay of 2 seconds here before stplayers() is called
    // setPlayers(move2);
    setShowRunBoxComponent(true);
    setShowMoveLines(true);
    setTimeout(() => {
      setPlayers(move2);
    }, 2000);
    console.log(move2);
  
   
    // const mergedMoves = move2.map((move) => {
    //   const override = secondMovesArray.find(
    //     (m) => m.playerNumber === move.playerNumber
    //   );
    //   if (override) {
    //     // Override the 'pitchPosition' in 'move2' with 'newPosition' from 'secondMovesArray'
    //     return {
    //       ...move,
    //       pitchPosition: override.newPosition,
    //     };
    //   }
    //   // If no override is found, retain the original 'move2' element
    //   return move;
    // });
    const mergedMoves =
      secondMovesArray.length > 0
        ? move2.map((move) => {
            const override = secondMovesArray.find(
              (m) => m.playerNumber === move.playerNumber
            );
            if (override) {
              // Override the 'pitchPosition' in 'move2' with 'newPosition' from 'secondMovesArray'
              return {
                ...move,
                pitchPosition: override.newPosition,
              };
            }
            // If no override is found, retain the original 'move2' element
            return move;
          })
        : move2;

    console.log(mergedMoves);
    setTimeout(() => {
      setPlayers(mergedMoves);
    }, 4000);
  };

  const getLineCoordinance = (currentDiv, targetDiv) => {};
  const btnResetHandler = () => {
    setPlayTimelineState(false);
    setPlayers(playSelected.secondArray);
    setShowMoveLines(false);
    setShowRunBoxComponent(false);
  };
  const createPlayBtnHandler = () => {
    navigate("/Football/KickOuts");
  };
  const viewPlaysBtnHandler = () => {
    setSetplayIsChosen(false);
    navigate("/");
    // setActivePosition([]);
    // setTargetPosition([]);
  };
  const showPlayerNumbersHandler = () => {
    setShowPlayerNumberState(!showPlayerNumberState);
  };
  const numDivs = 11;
  const fetchPlays = () => {
    const storedPlays = JSON.parse(localStorage.getItem("setPlays"));
    if (storedPlays && Array.isArray(storedPlays)) {
      setPlays(storedPlays);
    }
  };

  // Use useEffect to call fetchPlays when the component mounts
  useEffect(() => {
    fetchPlays();
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
              className={`${divposition}  relative h-10 w-10 mx-auto my-auto text-black text-center cursor-auto
                ${
                  positionIsUsed
                    ? "bg-slate-300 shadow-xl positionUsed z-50 "
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
                {positionIsUsed && showPlayerNumberState
                  ? matchingPlayerNumber
                  : ""}
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
  //* this useeffect code below is used to fix my issue with lines not adjusting to window resizing.
  //* The use effect is called when the window resizes and then when resizing the calccoords function is called
  useEffect(() => {
    // Function to handle resize event
    const handleResize = () => {
      console.log("window resized");
      const newLineCoordinates = calculateAllLineCoordinates(lineData);
      const newLineCoordinates2 = calculateAllLineCoordinates(lineData2);
      // Update the state with the new coordinates
      setLineCoordinates(newLineCoordinates);
      setLineCoordinates2(newLineCoordinates2);
    };

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Clean up event listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const calculateAllLineCoordinates = (linesArray) => {
    console.log("Calculating coordinates for all lines ya dig");
    console.log(linesArray);
    // console.log(linesArray);
    return linesArray.map((line) => {
      const currentDiv = refs.current[line.current];
      const targetDiv = refs.current[line.target];

      // Make sure the currentDiv and targetDiv are not null before trying to get their bounding rectangles
      if (!currentDiv || !targetDiv) {
        console.error(
          "One of the elements is not yet available in the refs:",
          line
        );
        return { currentX: 0, currentY: 0, targetX: 0, targetY: 0 };
      }

      const currentRect = currentDiv.getBoundingClientRect();
      const targetRect = targetDiv.getBoundingClientRect();

      console.log(
        `Coordinates for line from ${line.current} to ${line.target}:`,
        currentRect.x,
        targetRect.x
      );

      return {
        currentX: currentRect.x + currentRect.width / 2, // assuming center of the div
        currentY: currentRect.y + currentRect.height / 2, // assuming center of the div
        targetX: targetRect.x + targetRect.width / 2, // assuming center of the div
        targetY: targetRect.y + targetRect.height / 2, // assuming center of the div
        playerNumber: line.playerNumber,
      };
    });
  };

  const exampleLine = {
    current: "fb-1", // This should match a key in refs.current
    target: "mf-3", // This should also match a key in refs.current
  };
  // console.log(lineData);

  const playRemoveHandler = (playselected) => {
    document.getElementById("my_modal_1").showModal();
  };
  const removePlayFinal = () => {
    //remove play and de select the selected play
    // alert(playSelected.id);
    if (user) {
      removeUserPlays(playSelected.id);
    }

    removeSetPlayById(playSelected.id);

    setSetplayIsChosen(false);
    fetchPlays();
    navigate("/");
    //I want to call that trigegr here for updating the play list on start menu
    setUserPlaysUpdateTrigger((prev) => prev + 1);
  };
  const escapeRemovePlayModalHandler = () => {
    document.getElementById("my_modal_1").close();
  };

  const removeSetPlayById = (id) => {
    // Retrieve the setplays array from local storage
    const setplaysJSON = localStorage.getItem("setPlays");
    console.log("in here baiiii");
    if (setplaysJSON) {
      // Parse the JSON string back into an array
      const setplays = JSON.parse(setplaysJSON);

      // Find the index of the object with the matching ID
      const index = setplays.findIndex((sp) => sp.id === id);

      // Remove the object from the array if it exists
      if (index > -1) {
        setplays.splice(index, 1);

        // Convert the array back into a JSON string
        const updatedSetplaysJSON = JSON.stringify(setplays);

        // Save the updated array back to local storage
        localStorage.setItem("setPlays", updatedSetplaysJSON);
      } else {
        console.log("Setplay with the provided ID was not found.");
      }
    } else {
      console.log("Setplays array is not found in local storage.");
    }
  };

  // Example usage:
  // removeSetPlayById('8a4604d5-5634-4692-a68a-005ab3408e5e');
  const copyPlayURLHandler = () => {
    const currentUrl = window.location.href; // This gives you the full URL
    // Or, if you just want the path without the domain:
    // const currentUrl = `${window.location.origin}${location.pathname}`;

    navigator.clipboard
      .writeText(currentUrl)
      .then(() => {
        setUpperModalMsg("Link copied to Clipboard ");
        console.log("Current URL copied to clipboard!");
        setImageDownloadModalShowState(true);
        setTimeout(() => {
          // The code you want to execute after the delay goes here
          setImageDownloadModalShowState(false);
        }, 5000);
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };
  const [userUUID, setUserUUID] = useState("1");
  const [playName, setPlayName] = useState("test");
  const savePlayDB = async () => {
    try {
      const response = await fetch("http://localhost:5001/add-play", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userUUID, playName }),
      });
      const data = await response.json();
      console.log("Success:", data);
      // Handle success scenario (e.g., showing a success message)
    } catch (error) {
      console.error("Error:", error);
      // Handle error scenario (e.g., showing an error message)
    }
  };
  const takeScreenshot = () => {
    // Select the element with the ID 'pitch'
    const pitchElement = document.getElementById("pitch");

    // Check if the element exists
    if (pitchElement) {
      html2canvas(pitchElement).then((canvas) => {
        // Create an image of the canvas
        const base64image = canvas.toDataURL("image/png");

        // For example, to download the image you can do the following:
        const link = document.createElement("a");
        link.download = `${playSelected.name}-Screenshot.png`;
        link.href = base64image;
        link.click();
        setUpperModalMsg("Image Successfully Saved");
        setImageDownloadModalShowState(true);
        setTimeout(() => {
          // The code you want to execute after the delay goes here
          setImageDownloadModalShowState(false);
        }, 5000);
      });
    } else {
      console.error('Element with ID "pitch" not found');
    }
  };

 

  const singInBtnHandler = () => {
    navigate("/auth/login");
  };
  const PlayImageDownloadModal = (props) => {
    return (
      <>
        <div
          role="alert"
          className="alert alert-success w-auto absolute text-center mx-auto z-50 self-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{props.msg}</span>
        </div>
      </>
    );
  };
  const RemovePlayModal = (playToRemoveName) => {
    console.log(playToRemoveName);

    return (
      <>
        <dialog id="my_modal_1" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-md ">Confirm Deletion ?</h3>
            <p className="py-2 text-primary font-bold text-xl tracking-wide">
              {playToRemoveName.prop}
            </p>
            <p>
              This play will be removed forever and
              <b className="text-primary">
                <u className="ml-1">CANNOT</u>
              </b>{" "}
              be recovered
            </p>
            <div className="modal-action">
              {/* if there is a button in form, it will close the modal */}
              <div className="flex h-full items-center w-[100%]  justify-center">
                <div className="flex justify-center">
                  <button
                    className="btn mx-2 "
                    onClick={escapeRemovePlayModalHandler}>
                    Go Back
                  </button>
                  <button className="btn mx-2" onClick={removePlayFinal}>
                    Remove Play hai
                  </button>
                </div>
              </div>
            </div>
          </div>
        </dialog>
      </>
    );
  };
  if (setPlayIsChosen === false && playId && userId) {
    // const playFromLink = loadPlayFromLink(playId, userId);
    loadPlayFromLink(playId, userId)
      .then((play) => {
        // console.log("Loaded play:", play);
        setPlayIsPickedHandler(play, userId);
        // Here you can update the state with the loaded play
        // this.setState({ currentPlay: play });
      })
      .catch((error) => {
        console.error("Error loading play:", error);
        setAccessMessage("play is set to private by owner");
      });
    console.log(
      "you clicked on a link lets load the play ",
      playId,
      " created by ",
      userId
    );
    // setPlayIsPickedHandler(
    //   playFromLink,
    //   "f6388012-cb7f-48be-9588-a7ede12e0f88"
    // );
    // console.log(playFromLink);
  }
  // console.log(lineCoordinates2);
  // console.log(lineCoordinates);
  // console.log(lineData2);
  // console.log(lineData);
  // console.log(numberOfMoves + "haiiiii");
  // console.log(user.uid);
  // isAllowedViewPlay(playSelected.userId,user.uid);
  // console.log('here chickilickin');
  // console.log(playSelected.userId);
  // console.log(user.uid);
  // console.log(isAllowedViewPlay(playSelected.userId,user.uid));
  // console.log(isUserPlay);
  //! this is the end of the React moving onto JSX

  return (
    <>
    {isServerErrorStatus == true &&
    <>
<div role="alert absolute top-0">
  <div class="bg-red-500 text-white font-bold rounded-t px-4 py-2">
    Server Error
    <button onClick={toggleChildServerErrorMsgDropdownHandler} className="  p-2 text-zinc-800 underline rounded-lg">

      {isServerChildMsgShown == false ? "More Info" : " Less Info"}
    </button>
  </div>
  {isServerChildMsgShown &&
  <div class="border border-t-0 border-red-400 rounded-b  bg-red-100 px-4 py-3 text-red-700">
    <p>Something not ideal might be happening.</p>
    <p>User Plays are not loading, please check connection and reload page </p>
  </div>
}
</div>
    </>
    }
      <AccountNav />
      <div className="homePageMessageBox absolute top-5 left-5 text-white">
        {homePageMessage}
      </div>
      <div className="grid grid-cols-5 gap-1 mt-5 grid-rows-  h-[90vh] top-[5vh] ">
        {setPlayIsChosen && (
          <>
            <RemovePlayModal prop={playSelected.name} />
            {/* <div className="bg-base-200 rounded-md row-span-1 flex items-center justify-center relative">
              {setPlayIsChosen && imageDownloadModalShowState && (
                <PlayImageDownloadModal msg={upperModalMsg} />
              )}
              {playSelected.category}
            </div> */}

            <div className="bg-base-200  lg:cols-span-2 col-span-2  rounded-md flex items-center justify-center relative ">
              <div className="stat ">
                <div className="stat-title text-sm  ">
                  {/* {playSelected.category} */}
                </div>
                <div className="lg:text-xl capitalize text-sm font-bold  text-white">
                  <span className="text-sm mr-2 font-extralight left-0 text-left p-0 text-primary">
                    {playAccessLevel === "public" ? (
                      <FontAwesomeIcon icon={faLockOpen} />
                    ) : (
                      <FontAwesomeIcon icon={faLock} />
                    )}
                  </span>
                  <span className="text-left">{playSelected.name}</span>
                  {playTimelineState ? (
                    <button
                      className="btn btn-sm h-5 border-none btn-primary mx-auto bg-primary/20 ml-2"
                      onClick={btnResetHandler}>
                      {" "}
                      <FontAwesomeIcon icon={faRepeat} />
                    </button>
                  ) : (
                    <button
                      className="btn-sm btn  h-5 border-none  btn-primary bg-primary/20 ml-2"
                      onClick={btnPlayHandler}>
                      {" "}
                      <FontAwesomeIcon icon={faPlay} />
                    </button>
                  )}
                  {showRunBoxComponent && (
                    <div className="runsComponent">
                      <div className="flex w-full text-left text-xs font-extralight">
                        <div className="w-1/3 px-2">1st Run</div>

                        {numberOfMoves > 1 && (
                          <div className="w-1/3 px-2">2nd Run</div>
                        )}

                        <div className="w-1/3 px-2">Ball Kick</div>
                      </div>
                      <div className="flex w-full">
                        <div className="w-1/3 px-2">
                          <div className="text-sm font-thin w-full h-[1px] bg-primary animate-width mt-1 rounded"></div>
                        </div>
                        {numberOfMoves > 1 && (
                          <div className="w-1/3 px-2">
                            <div className="text-sm font-thin w-0 h-[1px] bg-secondary animate-width-two mt-1 rounded"></div>
                          </div>
                        )}
                        <div className="w-1/3 px-2">
                          <div
                            className={`text-sm font-thin w-0 h-[1px] bg-white 
                            ${
                              numberOfMoves > 1
                                ? "animate-width-three"
                                : "animate-width-two"
                            }
                            animate-width-three
                            
                            mt-1 rounded`}></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-base-200 lg:col-span-3 col-span-3 flex items-center justify-center relative rounded-sm">
              <div class="grid w-full h-full lg:grid-cols-6 grid-cols-4 lg:gap-1 lg:p-2 p-1  ">
                <div className="  ">
                  {" "}
                  <button
                    onClick={viewPlaysBtnHandler}
                    className="btn btn-sm  w-full h-full rounded-sm  bg-base-100 text-primary border-none ">
                    {/* Plays  */}
                    <FontAwesomeIcon icon={faList} />
                  </button>
                </div>
                {user && isUserPlay &&
                <div className="group ">
                  {" "}
                  <button className="btn h-full w-full rounded-sm btn-sm border-none  bg-base-100 text-primary ">
                    {/* EDIT  */}
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </button>
                  <div className="absolute z-50   hidden group-hover:block">
                    <div className="bg-gray-500 text-white text-xs rounded py-1 px-2 right-0">
                      Edit Play
                    </div>
                  </div>
                </div>
}
                {user && isUserPlay && (
                  <div className=" ">
                    <button
                      className=" w-full h-full btn-sm rounded-sm btn bg-base-100 text-primary border-none "
                      onClick={savePlayDB}>
                      {/* SAVE  */}
                      <FontAwesomeIcon icon={faFloppyDisk} />
                    </button>
                  </div>
                )}

                <div className=" ">
                  {" "}
                  <button
                    onClick={takeScreenshot}
                    className="btn h-full  rounded-sm border-none  bg-base-100 text-primary w-full h-full btn-sm  ">
                    {/* PRINT */}
                    <FontAwesomeIcon icon={faDownload} />
                  </button>
                </div>
                <div className=" w-full h-full ">
                  {" "}
                  <button
                    onClick={copyPlayURLHandler}
                    className="btn rounded-sm border-none w-full h-full btn-sm  bg-base-100 text-primary ">
                    {/* Nums */}
                    <FontAwesomeIcon icon={faArrowDown91} />
                  </button>
                </div>
                {user && isUserPlay &&
                <div className=" w-full h-full group ">
                  {" "}
                  <button
                    className="btn rounded-sm border-none w-full h-full btn-sm  bg-base-100 text-primary "
                    onClick={() => {
                      const newAccessLevel =
                        playAccessLevel === "public" ? "private" : "public";
                      changeAccess(playSelected.id, newAccessLevel);
                    }}>
                    {/* Show  */}
                    {playAccessLevel === "private" ? (
                      <FontAwesomeIcon icon={faLockOpen} />
                    ) : (
                      <FontAwesomeIcon icon={faLock} />
                    )}
                    {/* <FontAwesomeIcon icon={faloc} /> */}
                  </button>
                  <div className="absolute   hidden group-hover:block">
                    <div className="bg-gray-500 text-white text-xs rounded py-1 px-2 right-0">
                      {playAccessLevel === "private"
                        ? "Make Public"
                        : "Make Private"}
                    </div>
                  </div>
                </div>
}
                <div className=" w-full h-full group ">
                  {" "}
                  <button
                    onClick={showPlayerNumbersHandler}
                    className={`btn btn-active rounded-sm border-none w-full h-full btn-sm 
                    ${showPlayerNumberState ? ` bg-base-100` : "bg-base-300"}
                    
                    
                    text-primary `}>
                    {/* Hide  */}
                    <FontAwesomeIcon icon={faEyeSlash} />
                  </button>
                  <div className="absolute   hidden group-hover:block">
                    <div className="bg-gray-500 text-white text-xs rounded py-1 px-2 right-0">
                      Show Numbers
                    </div>
                  </div>
                </div>
                {user && isUserPlay &&
                <div className="group relative">
                  <button
                    onClick={() => playRemoveHandler(playSelected)}
                    className="btn-sm btn bg-base-100 text-secondary border-none h-full rounded-sm w-full">
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                  <div className="absolute   hidden group-hover:block">
                    <div className="bg-gray-500 text-white text-xs rounded py-1 px-2 right-0 bottom-0">
                      Delete Play
                    </div>
                  </div>
                </div>
}
              </div>
            </div>
          </>
        )}

        <div
          id="pitch"
          className="col-span-5  bg-base-200 rounded-md row-span-6 ...">
          {setPlayIsChosen ? (
            <>
              <div
                className="flex pitch border  border-white/20 flex-col
           rounded bg-base-100 w-6/6 sm:w-4/6 mx-auto mt-5 relative self-center
             sm:h-[70vh] h-full  ">
                {showMoveLines && setPlayIsChosen && (
                  <div
                    style={{
                      position: "absolute",
                      zIndex: 50,
                      width: "100%",
                      height: "100%",
                    }}>
                    {lineCoordinates.map((coords, index) => (
                      <Line
                        style={{ position: "absolute", zIndex: 100 }}
                        key={index}
                        currentX={coords.currentX}
                        targetX={coords.targetX}
                        lineColor="#5616C5"
                        countMoves={numberOfMoves}
                        lineNumber={1}
                        currentY={coords.currentY}
                        targetY={coords.targetY}
                        playerNumber={coords.playerNumber}
                      />
                    ))}
                    {lineCoordinates2.map((coords2, index) => (
                      <Line
                        style={{ position: "absolute", zIndex: 100 }}
                        key={index}
                        currentX={coords2.currentX}
                        targetX={coords2.targetX}
                        lineColor="#D926A9"
                        lineNumber={2}
                        countMoves={numberOfMoves}
                        currentY={coords2.currentY}
                        targetY={coords2.targetY}
                        playerNumber={coords2.playerNumber}
                      />
                    ))}
                  </div>
                )}
                <div className="endLine absolute top-[10%]  w-full h-[1px] bg-white/20 z-50"></div>
                <div className="goalSquare absolute w-[12%] left-[44%] top-0 h-7 border border-white/20 z-50"></div>
                <div className="goalSquare absolute w-[12%] left-[44%] top-7 h-9 border rounded-bl-full rounded-br-full border-white/20 z-50"></div>
                <div className="endLine absolute top-[30%]  w-full h-[1px] bg-white/20 z-50"></div>
                <div className="endLine absolute top-[50%]  w-full h-[1px] bg-white/20 z-50"></div>
                <div className="endLine absolute top-[70%]  w-full h-[1px] bg-white/20 z-50"></div>
                {/* <div className="endLine absolute top-[20%]  w-full h-[1px] bg-white/20 z-50"></div> */}
                <div className="endLine absolute top-[90%]  w-full h-[1px] bg-white/20 z-50"></div>
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
              <p className="">{playSelected.name}</p>
            </>
          ) : (
            <>
              <div className="h-full flex flex-col justify-center items-center ">
                {/* //no setplay is selected */}
                <h4 className="text-error ">{accessMessage}</h4>
                <h1 className="mb-2 text-primary font-medium text-xl">
                  Please select a set play
                </h1>
                <table class="table shadow-xl  rounded-lg  w-auto bg-base-300">
                  {/* head */}
                  <thead className="">
                    <tr className="p-2">
                      <th>#</th>
                      <th>Name</th>
                      <th>Date</th>
                      <th>Access</th>
                      <th>Saved</th>
                    </tr>
                  </thead>
                  <tbody className="p-2 overflow-y-auto scrollable-tbody">
                    {userPlays ? (
                      <>
                        {Object.values(userPlays).map((play, index) => (
                          <tr
                            className="bg-base-200 cursor-pointer hover:bg-primary rounded-xl transition-all"
                            key={index}
                            onClick={() =>
                              setPlayIsPickedHandler(play, user.uid)
                            }>
                            <th>{index + 1}</th>
                            <td>{play?.name ?? "N/A"}</td>
                            <td>{play?.date ?? "N/A"}</td>
                            <td className="pb-2">{play?.access ?? ""}</td>
                            <td className="text-secondary">Account</td>
                            {/* {play.name} */}
                          </tr>
                        ))}
                      </>
                    ) : (
                      <></>
                    )}
                    {plays && plays.length > 0 ? (
                      plays.map((play, index) => (
                        <tr
                          key={index}
                          onClick={() => setPlayIsPickedHandler(play, "local")}
                          className="bg-base-200 cursor-pointer hover:bg-primary rounded-xl transition-all">
                          <th>{index + 1}</th>
                          <td>{play?.name ?? "N/A"}</td>
                          <td>{play?.date ?? "N/A"}</td>
                          <td className="pb-2">
                            {play?.firstArray?.length ?? 0}
                          </td>
                          <td className="">local</td>
                        </tr>
                      ))
                    ) : (
                      <tr className="bg-base-200">
                        <td colSpan="6" className="text-center">
                          No local plays available
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
                <hr className="text-xl font-bold mt-5 text-secondary"></hr>
                {/* <h1 className="text-primary step  mb-2 font-medium text-xl">
                  Import a setPlay
                </h1> */}
                {/* <input
                  type="file"
                  className="file-input align-top left-0 file-input-bordered  w-auto max-w-xs"
                />{" "} */}
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