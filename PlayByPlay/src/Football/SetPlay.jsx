const SetPlay = () => {
  return (
    <>
      <div className="flex h-[90vh] top-[5vh] gaa-pitch relative bg-green-500 ">
        {/* Lines */}
        <div className="w-full 13-meter h-[2px] color-white top-[10%] absolute  bg-white"></div>
        <div className="w-full 21-meter h-[2px] color-white top-[16.15%] absolute  bg-white"></div>
        <div className="w-full 45-meter h-[2px] color-white top-[34.6%] absolute  bg-white"></div>
        <div className="w-full mid h-[2px] color-white top-[50%] absolute  bg-white"></div>
        <div className="w-full op-45-meter h-[2px] color-white top-[69.2%] absolute  bg-white"></div>
        <div className="w-full op-21-meter h-[2px] color-white top-[83.85%] absolute  bg-white"></div>
        <div className="w-full op-13-meter h-[2px] color-white top-[90%] absolute  bg-white"></div>

        {/* Circles */}
        <div
          className="21-circle text-center center border-b-0 color-white rotate-180 h-[10%] top-[16.15%] first-letter: w-[25%] left-[37.5%] border-2 
            rounded-tl-full absolute rounded-tr-full"></div>
        <div
          className="op-21-circle text-center center border-b-0 color-white  h-[10%] first-letter:
           w-[25%] top-[74%] left-[37.5%] border-2 
            rounded-tl-full absolute rounded-tr-full"></div>

        {/* Goals */}
        <div className="goals w-[25%] h-[10%] border-2 text-white mx-auto "></div>
        <div className="goals w-[25%] left-[37.5%] h-[10%] border-2 text-white mx-auto absolute top-[90%] "></div>
      </div>
    </>
  );
};

export default SetPlay;
