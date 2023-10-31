import React, { useState } from "react";
import Cookies from "js-cookie";

const SaveSetPlay = (props) => {
  const [inputValue, setInputValue] = useState("");
  const [selectedOptionPicked,updateSelectOptionPicked] = useState(false);
const movesArr = props.movesArr;
const formation = props.formation;
const name = "Pistol Offence";
const date = "31/10/2023";

console.log(movesArr);
console.log(formation);

const saveSetPlayHandler = ()=>{
  const combinedData = {
    name: name,
    date: date,
    firstArray: movesArr,
    secondArray: formation
  };
  localStorage.setItem('myData', JSON.stringify(combinedData));

}
  const selectOptionClickHandler = ()=>{
    updateSelectOptionPicked(true)
  }
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
            inputValue.length >= 1 ? "border-l-emerald-400 border-l-4" : "border-l-gray-400 border-l-4"
          }`}
        />

        <select onChange={selectOptionClickHandler} className={`select
        ${selectedOptionPicked ? "border-l-emerald-400 border-l-4 " : "border-l-gray-400 border-l-4"}
        select-bordered w-full max-w-xs`}>
          <option disabled selected>
            Where to Save
          </option>
          <option >Save to this machine</option>
          <option>Save as file</option>
          <hr></hr>
          {/* <label>Requires Sign in</label> */}
          <option>Account (Sign In)</option>
        </select>

        <div className="btn-group mt-2">
          <button onClick={saveSetPlayHandler} className={`btn rounded-md
          
          ${inputValue.length >=1 && selectedOptionPicked ? "bg-emerald-400 text-black " : "bg-primary/10 pointer-events-none "}
          `}>Save</button>
        </div>
      </div>
    </>
  );
};

export default SaveSetPlay;
