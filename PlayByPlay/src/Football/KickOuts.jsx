import React, { useState } from "react";

const KickOuts = () => {
  const handleDivClick = (outerDiv, index) => {
    alert(`You clicked the ${index + 1}-th div inside the ${outerDiv} div`);
  };

  const [
    startingFiftenPlayerNumberSelected,
    updateStartingFifteenPlayerNumberSelected,
  ] = useState(0);
  const [startingFifteenEditingState, updatestartingFifteenEditingState] =
    useState(false);
  const startingFifteenSelectedHandler = (playerNumber) => {
    // user just clicked on one of the numbers
    // I now want to update the startinf 15 to only show to cliked number as active
    updateStartingFifteenPlayerNumberSelected(playerNumber);
    updatestartingFifteenEditingState(true);
  };
  const StartingFifteen = () => {
    return (
      <div className="grid grid-rows-3 text-center grid-cols-5 gap-4 w-full p-5">
        {[...Array(14).keys()].map((index) => (
          <p
            key={index}
            onClick={() => startingFifteenSelectedHandler(index + 1)}
            className={`text-white hover:scale-105 mx-auto
            transition-all cursor-pointer h-10 my-auto
            text-center p-2 m-2 w-full 
            ${
              index + 1 === startingFiftenPlayerNumberSelected
                ? "bg-blue-400"
                : "bg-red-400"
            } rounded`}>
            {index + 1}
          </p>
        ))}
      </div>
    );
  };
  const TenDivs = ({ outerDivName, count }) => (
    <>
      {[...Array(count).keys()].map((index) => (
        <div
          key={index}
          onClick={() => {
            if (startingFifteenEditingState) {
              handleDivClick(outerDivName, index);
            }
          }}
          className={` h-10 my-auto text-center
             ${
               startingFifteenEditingState
                 ? "bg-gray-400 cursor-pointer"
                 : "bg-gray-400 opacity-50 disabled"
             }
         
              p-2 m-2 rounded`}></div>
      ))}
    </>
  );
  const [numDivs, setNumDivs] = useState(10);
  const changeButtonText = numDivs === 3 ? "10 rows" : "3 rows";

  const toggleDivs = () => {
    setNumDivs((prevNum) => (prevNum === 10 ? 3 : 10));
  };
  return (
    <>
      <div className="flex">
        <button
          onClick={toggleDivs}
          className=" left-1 bg-purple-800 mb-2  text-white px-4 rounded  z-10">
          {changeButtonText}
        </button>
      </div>
      <div className="centering-wrapper">
        <div className="relative flex  h-[20vh] bg-gray-500 mb-[2vh] rounded">
          <StartingFifteen></StartingFifteen>
        </div>

        <div className="flex flex-col bg-green-500 relative self-center  gap-4 h-[70vh]">
          <div className="flex-grow flex flex-col">
            <div
              className={`flex-grow bg-purple-000 grid ${
                numDivs === 10 ? "grid-cols-10" : "grid-cols-3"
              }`}>
              <TenDivs outerDivName="Full Back" count={numDivs} />
            </div>
            <div
              className={`flex-grow bg-pink-600 grid ${
                numDivs === 10 ? "grid-cols-10" : "grid-cols-3"
              }`}>
              <TenDivs outerDivName="In between full Back" count={numDivs} />
            </div>
            <div
              className={`flex-grow bg-yellow-600 grid ${
                numDivs === 10 ? "grid-cols-10" : "grid-cols-3"
              }`}>
              <TenDivs outerDivName="yellow" count={numDivs} />
            </div>
            <div
              className={`flex-grow bg-gray-600 grid ${
                numDivs === 10 ? "grid-cols-10" : "grid-cols-3"
              }`}>
              <TenDivs outerDivName="Grey" count={numDivs} />
            </div>
          </div>
          <div
            className={`flex-grow bg-purple-600  grid ${
              numDivs === 10 ? "grid-cols-10" : "grid-cols-3"
            }`}>
            <TenDivs outerDivName="Grey" count={numDivs} />
          </div>
          {/* <div className="bg-purple-600 h-1/6 grid grid-cols-10">
            <TenDivs outerDivName="Mid Purple" />
          </div> */}
          <div className="flex-grow flex flex-col">
            <div
              className={`flex-grow bg-blue-600 grid ${
                numDivs === 10 ? "grid-cols-10" : "grid-cols-3"
              }`}>
              <TenDivs outerDivName="Blue" count={numDivs} />
            </div>
            <div
              className={`flex-grow bg-pink-600 grid ${
                numDivs === 10 ? "grid-cols-10" : "grid-cols-3"
              }`}>
              <TenDivs outerDivName="Pink" count={numDivs} />
            </div>
            <div
              className={`flex-grow bg-orange-600 grid ${
                numDivs === 10 ? "grid-cols-10" : "grid-cols-3"
              }`}>
              <TenDivs outerDivName="Orange" count={numDivs} />
            </div>
            <div
              className={`flex-grow bg-black grid ${
                numDivs === 10 ? "grid-cols-10" : "grid-cols-3"
              }`}>
              <TenDivs outerDivName="Black" count={numDivs} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default KickOuts;
