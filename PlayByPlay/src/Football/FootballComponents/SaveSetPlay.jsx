import React, { useState } from "react";
import Cookies from "js-cookie";

const SaveSetPlay = (props) => {
  const [inputValue, setInputValue] = useState("");
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
            inputValue.length > 1 ? "border-b-emerald-400" : ""
          }`}
        />

        <select className="select select-bordered w-full max-w-xs">
          <option disabled selected>
            Where to Save
          </option>
          <option>Save to this machine</option>
          <option>Save as file</option>
          <hr></hr>
          {/* <label>Requires Sign in</label> */}
          <option>Account (SIgn In)</option>
        </select>

        <div className="btn-group mt-2">
          <button className="btn rounded-md bg-primary text-white">Save</button>
        </div>
      </div>
    </>
  );
};

export default SaveSetPlay;
