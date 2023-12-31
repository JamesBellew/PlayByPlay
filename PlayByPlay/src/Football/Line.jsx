import React, { useState, useEffect } from "react";

const Line = ({
  currentX,
  targetX,
  currentY,
  targetY,
  playerNumber,
  lineColor,
  countMoves,
  lineNumber,
}) => {
  // console.log(playerNumber);
  // Calculate the true length of the line
  const length = Math.sqrt(
    Math.pow(targetX - currentX, 2) + Math.pow(targetY - currentY, 2)
  );

  let transitionDelay = "";
  if (playerNumber === 1 && countMoves === 1) {
    transitionDelay = "2s";
  } else if (playerNumber === 1 && countMoves > 1) {
    transitionDelay = "4s";
  } else if (lineNumber === 2) {
    transitionDelay = "2s";
  }
  // const lineColor = colors[Math.floor(Math.random() * colors.length)];
  const [showHoverPlayerBubbleState, setShowHoverPlayerBubbleState] =
    useState(false);
  // Calculate the angle of the line
  const angle =
    Math.atan2(targetY - currentY, targetX - currentX) * (180 / Math.PI);

  // Use state to trigger the animation after the component mounts
  const [isAnimating, setIsAnimating] = useState(false);

  // After the component mounts, set isAnimating to true to trigger the animation
  useEffect(() => {
    setIsAnimating(true);
  }, []);
  const circleStyle = {
    position: "fixed",
    left: `${currentX - 5}px`, // Half the width and height to center the circle on the line's starting point
    top: `${currentY - 5}px`,
    width: "10px", // Width of the circle
    height: "10px", // Height of the circle
    backgroundColor: "#fff", // Color of the circle
    borderRadius: "50%", // Makes the div a circle
    zIndex: 10, // Ensure the circle is above the line
  };
  // Styles for the line
  const style = {
    position: "fixed",
    left: `${currentX}px`, // This is the starting x position of the line
    top: `${currentY}px`, // This is the starting y position of the line
    zIndex: 100,
    width: isAnimating ? `${length}px` : "0px", // Start with 0 width and then animate to full length
    height: "0px", // Set to 0 because the border will create the line
    // borderTop: playerNumber === 1 ? "4px dotted #fff" : "3px dotted #6419E6", // Creates a dotted line with the specified thickness and color
    borderTop:
      playerNumber === 1 ? "2px dotted #fff" : `3px dotted ${lineColor}`,
    opacity: "0.5",
    transform: `rotate(${angle}deg)`,
    transformOrigin: "0 0", // Ensures the div rotates around the starting point
    transition: `width 2s ease-out`, // Animate the width over 2 seconds
    // transitionDelay: playerNumber === 1 ? "4s" : "",
    transitionDelay: transitionDelay,
  };
  const circleDivHoverHandler = () => {
    // alert("hovered");
    setShowHoverPlayerBubbleState(!showHoverPlayerBubbleState);
    console.log("hovered over the div circle");
  };
  return (
    <>
      <div style={style} />
      <div
        style={circleStyle}
        className="hover:bg-red-600 "
        onMouseOver={circleDivHoverHandler}>
        {/* {showHoverPlayerBubbleState && (
          <div className="hover-number-box z-auto px-2 py-1 w-auto text-center mx-auto bg-primary bottom-5 left-2 absolute rounded-full">
            {playerNumber}
          </div>
        )} */}
      </div>
      {/* This is the circle at the starting point */}
    </>
  );
};

export default Line;
