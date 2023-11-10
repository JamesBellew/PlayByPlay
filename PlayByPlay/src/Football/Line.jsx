import React from "react";
const Line = ({ currentX, targetX, currentY, targetY }) => {
  // Calculate the true length of the line
  const length = Math.sqrt(
    Math.pow(targetX - currentX, 2) + Math.pow(targetY - currentY, 2)
  );

  // Calculate the angle of the line
  const angle =
    Math.atan2(targetY - currentY, targetX - currentX) * (180 / Math.PI);

  // Styles for the line
  const style = {
    position: "relative",
    left: `${currentX}px`, // This is the starting x position of the line
    top: `${currentY}px`, // This is the starting y position of the line
    zIndex: 50,
    width: `${length}px`, // Use the calculated length for the width
    height: "2px", // Thickness of the line
    backgroundColor: "#6419E6",
    opacity: "0.5",
    transform: `rotate(${angle}deg)`,
    transformOrigin: "0 0", // Ensures the div rotates around the starting point
  };

  return <div style={style} />;
};

export default Line;
