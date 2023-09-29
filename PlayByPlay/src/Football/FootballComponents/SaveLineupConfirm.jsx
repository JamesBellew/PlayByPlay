import React, { useState } from "react";
import Cookies from "js-cookie";
const SaveLineupConfirm = (props) => {
  const handleChildClick = () => {
    // Call the function passed from the parent with a message
    // Cookies.set("newLineUpName", lineUpName, { expires: 7 });
    setLineUpName(lineUpName);
    props.onChildClick(false);
  };

  const [lineUpName, setLineUpName] = useState("Game Vs Dublin");
  const [errorMsg, setErrorMsg] = useState("");
  const handleLineupNameChange = (event) => {
    setLineUpName(event.target.value);
    if (event.target.value.length === 0) {
      //   alert("this shit empty");
      setErrorMsg("Type Something..");
    } else {
      setErrorMsg(null);
    }
    // alert("lineup saved !");
  };

  const storePlayersInLocalStorage = () => {
    if (lineUpName.length === 0) {
      setErrorMsg("Please Type Something..");
    } else {
      setErrorMsg(null);

      // Retrieve existing lineups from localStorage
      let storedLineups = localStorage.getItem("playersData");
      storedLineups = storedLineups ? JSON.parse(storedLineups) : [];

      // Push the new lineup to the storedLineups array
      storedLineups.push(props.players);

      // Store the updated lineups array back to localStorage
      localStorage.setItem("playersData", JSON.stringify(storedLineups));

      props.onChildClick(false);
    }
  };

  return (
    <>
      <div className="card absolute left-0  top-0 p-0 rounded-none rounded-b-md w-full bg-base-100 shadow-xl">
        <div className="card-body items-center p-0 text-center">
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Name this Starting Team</span>
              {/* <span className="label-text-alt">3-3-2-1-3</span> */}
            </label>
            <input
              type="text"
              value={lineUpName}
              onChange={handleLineupNameChange}
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs"
            />
            <label className="label">
              <span className="label-text-alt">
                {errorMsg ? errorMsg : lineUpName}
              </span>
              <span className="label-text-alt">{props.formation}</span>
            </label>
          </div>

          <div className="card-actions p-2">
            <button
              onClick={storePlayersInLocalStorage}
              className="btn btn-primary">
              Confirm
            </button>
            <button onClick={handleChildClick} className="btn btn-secondary">
              Continue Editing
            </button>
          </div>
        </div>
        <br></br>
      </div>
    </>
  );
};

export default SaveLineupConfirm;
