import React, { useState } from "react";
import Cookies from "js-cookie";
import { v4 as uuidv4 } from "uuid";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../utils/firebase";
const SaveSetPlay = (props) => {
  const [user, loading] = useAuthState(auth);
  const [inputValue, setInputValue] = useState("");
  const [selectedOptionPicked, updateSelectOptionPicked] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  // const [ballPosition,setBallPosition] = useState([{}])
  const [categorySelectedOption, setCategorySelectedOption] = useState("None");
  const movesArr = props.movesArr;
  const secondMoveArray = props.secondMovesArray;
  const formation = props.formation;
  const ballPosition = props.ballPos;
  const name = inputValue;
  // const date = today();
  // const secondMoveArray = [{ playerNumber: 10, newPosition: "hb-4" }];
  const today = new Date();
  const date = today.toISOString().split("T")[0];
  console.log(movesArr);
  console.log(formation);

  //this is the functino call to the backedn to store userID
  function sendPlayToServer(play) {
    fetch("http://localhost:5000/storePlay", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(play),
    })
      .then((response) => response.text())
      .then((data) => console.log(data))
      .catch((error) => console.error("Error:", error));
  }

  const selectOptionClickHandler = (event) => {
    setSelectedOption(event.target.value);

    updateSelectOptionPicked(true);
  };

  const CategorySelectOptionClickHandler = (event) => {
    setCategorySelectedOption(event.target.value);
  };
  const saveSetPlayHandler = () => {
    const combinedData = {
      id: uuidv4(),
      ballPosition: ballPosition,
      name: name,
      date: date,
      firstArray: movesArr,
      category: categorySelectedOption,
      secondMoveArray: secondMoveArray,
      secondArray: formation,
      userId: user && selectedOption === "account" ? user.uid : null,
    };

    if (selectedOption === "account" && user) {
      //save to database
      sendPlayToServer(combinedData);
      props.dataFromSaveSetPlay(true);
    } else {
      // Get existing data from local storage
      let existingData = JSON.parse(localStorage.getItem("setPlays"));

      // Check if existingData is not an array or is null, then initialize it as an empty array
      if (!Array.isArray(existingData)) {
        existingData = [];
      }

      // Push the new record to the existing data
      existingData.push(combinedData);

      // Save the updated data back to local storage
      localStorage.setItem("setPlays", JSON.stringify(existingData));
      props.dataFromSaveSetPlay(true);
    }

    //now we want to direct the user to a new view
  };

  return (
    <>
      <div className="flex pitch flex-col rounded bg-base-200 w-4/6 mx-auto p-5 relative self-center h-auto text-center items-center">
        <label className="left-0 text-left">Name Set Play</label>

        <input
          type="text"
          placeholder="Type here"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className={`ml-5 input input-bordered w-full max-w-xs ${
            inputValue.length >= 1
              ? "border-l-emerald-400 border-l-4"
              : "border-l-gray-400 border-l-4"
          }`}
        />

        <select
          onChange={selectOptionClickHandler}
          className={`select
        ${
          selectedOptionPicked
            ? "border-l-emerald-400 border-l-4 "
            : "border-l-gray-400 border-l-4"
        }
        select-bordered w-full max-w-xs`}>
          <option disabled selected>
            Where to Save
          </option>

          {/* <label>Requires Sign in</label> */}
          {user && (
            <option className="text-secondary" value={"account"}>
              Account
            </option>
          )}
          <hr></hr>
          <option value={"machine"}>Save to this machine</option>
          <option value={"file"}>Save as file</option>
        </select>
        <select
          onChange={CategorySelectOptionClickHandler}
          className={`mt-2 select
        ${
          selectedOptionPicked
            ? "border-l-emerald-400 border-l-4 "
            : "border-l-gray-400 border-l-4"
        }
        select-bordered w-full max-w-xs`}>
          <option disabled selected>
            Type of Set Play
          </option>
          <option value={"kickout"}>Kick Out</option>
          <option value={"offence"}>Offense</option>
          <option value={"defense"}>Defense</option>
          <option value={"press"}>Press</option>
          <option value={"lineBall"}>Line Ball</option>
          <option value={"45"}>45 Kick</option>
        </select>
        <br></br>

        {selectedOption === "machine" ? (
          <>
            <small className="text-yellow-300">
              If you save to this machine, you cannot access it anywhwere else
            </small>
            <small className="text-yellow-300">
              You can save it as a file and import it on another machine
            </small>
            <small className="text-yellow-300">
              Or you can sign in and save to your account
            </small>
          </>
        ) : (
          ""
        )}
        <div className="btn-group mt-2">
          <button
            onClick={saveSetPlayHandler}
            className={`btn rounded-md
          
          ${
            inputValue.length >= 1 && selectedOptionPicked
              ? "bg-emerald-400 text-black "
              : "bg-primary/10 pointer-events-none "
          }
          `}>
            Save
          </button>
        </div>
      </div>
    </>
  );
};

export default SaveSetPlay;
