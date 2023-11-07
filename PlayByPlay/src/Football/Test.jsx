import React, { useRef, useEffect, useState } from "react";

const Test = () => {
  const [activePosition, setActivePosition] = useState("row1-div5");
  const refs = useRef({});

  useEffect(() => {
    // This will log the currentDiv after the component mounts and the ref is set
    const currentDiv = refs.current[activePosition];
    console.log(currentDiv);
    const activeRect = currentDiv.getBoundingClientRect();
    console.log(activeRect);
  }, []);

  return (
    <>
      <h1 className="text-white">Test works!</h1>
      <div
        ref={(el) => (refs.current[activePosition] = el)}
        className="row1-div5"></div>
    </>
  );
};

export default Test;
