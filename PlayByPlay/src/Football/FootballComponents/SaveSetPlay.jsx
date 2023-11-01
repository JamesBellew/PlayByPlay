import React, { useState } from "react";
import Cookies from "js-cookie";

const SaveSetPlay = (props) => {
  const [inputValue, setInputValue] = useState("");
  const [selectedOptionPicked,updateSelectOptionPicked] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
const movesArr = props.movesArr;
const formation = props.formation;
const name = inputValue;
// const date = today();

const today = new Date();
  const date = today.toISOString().split('T')[0];

console.log(movesArr);
console.log(formation);

const selectOptionClickHandler = (event)=>{
   
  setSelectedOption(event.target.value);

updateSelectOptionPicked(true)


}
const saveSetPlayHandler = () => {
  const combinedData = {
    name: name,
    date: date,
    firstArray: movesArr,
    secondArray: formation
  };

  // Get existing data from local storage
  let existingData = JSON.parse(localStorage.getItem('myData'));

  // Check if existingData is not an array or is null, then initialize it as an empty array
  if (!Array.isArray(existingData)) {
    existingData = [];
  }

  // Push the new record to the existing data
  existingData.push(combinedData);

  // Save the updated data back to local storage
  localStorage.setItem('myData', JSON.stringify(existingData));
  props.dataFromSaveSetPlay(true)
  //now we want to direct the user to a new view

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
          <option value={"machine"}>Save to this machine</option>
          <option value={"file"}>Save as file</option>
          <hr></hr>
          {/* <label>Requires Sign in</label> */}
          <option value={"account"}>Account (Sign In)</option>
        </select>
        <br></br>
        {selectedOption === "machine" ?   <><small className="text-yellow-300">If you save to this machine, you cannot access it anywhwere else</small>
<small className="text-yellow-300">You can save it as a file and import it on another machine</small>
<small className="text-yellow-300">Or you can sign in and save to your account</small>
</>
:""
        }
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
