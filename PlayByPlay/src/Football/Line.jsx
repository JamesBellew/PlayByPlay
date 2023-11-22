import React, { useState, useEffect } from "react";

const Line = ({ currentX, targetX, currentY, targetY }) => {
  // Calculate the true length of the line
  const length = Math.sqrt(
    Math.pow(targetX - currentX, 2) + Math.pow(targetY - currentY, 2)
  );
  const colors = [
    "#5616C5",
    "#940B92",
    "#E95793",
    "#610C9F",
    "#DA0C81",
    "#E95793",
    "#fff",
    "#fff",
    "#fff",
  ];
  const lineColor = colors[Math.floor(Math.random() * colors.length)];

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
    width: "15px", // Width of the circle
    height: "15px", // Height of the circle
    backgroundColor: "#6419E6", // Color of the circle
    borderRadius: "50%", // Makes the div a circle
    zIndex: 10, // Ensure the circle is above the line
  };
  // Styles for the line
  const style = {
    position: "fixed",
    left: `${currentX}px`, // This is the starting x position of the line
    top: `${currentY}px`, // This is the starting y position of the line
    zIndex: 50,
    width: isAnimating ? `${length}px` : "0px", // Start with 0 width and then animate to full length
    height: "0px", // Set to 0 because the border will create the line
    borderTop: "5px dotted #6419E6", // Creates a dotted line with the specified thickness and color
    opacity: "0.5",
    transform: `rotate(${angle}deg)`,
    transformOrigin: "0 0", // Ensures the div rotates around the starting point
    transition: `width 2s ease-out`, // Animate the width over 2 seconds
  };

  return (
    <>
      <div style={style} />
      <div style={circleStyle} />
      {/* This is the circle at the starting point */}
    </>
  );
};

export default Line;
