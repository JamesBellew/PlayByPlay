const SetPlay = () => {
  return (
    <>
      <div className="flex h-[90vh] top-[2vh] gaa-pitch relative bg-green-500 ">
        <div class="grid grid-cols-3 gap-4  w-full ">
          <div className="goalkeeper absolute w-full  h-10 ">
            <div class=" bg-yellow-300 rounded   w-12 mx-auto place-self-center center  p-2 ">
              1
            </div>
          </div>

          <div
            className="halfbacks absolute w-full bg-blue-00 h-10 top-[16.15%]  grid grid-cols-3 gap-4
           place-items-center">
            {" "}
            <div className="bg-yellow-300 rounded p-2  w-12 ">02</div>
            <div className="bg-yellow-300 rounded p-2  w-12 ">03</div>
            <div className="bg-yellow-300 rounded p-2   w-12 ">04</div>
          </div>
          <div
            className="halfbacks absolute w-full bg-blue-00 h-10 top-[34.6%]  grid grid-cols-3 gap-4
           place-items-center">
            {" "}
            <div className="bg-yellow-300 rounded p-2  w-12 ">05</div>
            <div className="bg-yellow-300 rounded p-2  w-12 ">06</div>
            <div className="bg-yellow-300 rounded p-2   w-12 ">07</div>
          </div>
          <div
            className="midfields absolute w-full bg-blue-00 h-10 top-[50%] grid grid-cols-2 gap-4"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
            <div className="bg-yellow-300 rounded p-2 w-12">08</div>
            <div className="bg-yellow-300 rounded p-2 w-12">09</div>
          </div>

          <div
            className="halfbacks absolute w-full bg-blue-00 h-10 top-[69.2%]  grid grid-cols-3 gap-4
           place-items-center">
            {" "}
            <div className="bg-yellow-300 rounded p-2  w-12 ">10</div>
            <div className="bg-yellow-300 rounded p-2  w-12 ">11</div>
            <div className="bg-yellow-300 rounded p-2   w-12 ">12</div>
          </div>
        </div>
        {/* Lines */}
        <div className="w-full 13-meter h-[2px] color-white top-[10%] absolute  bg-white"></div>
        <div className="w-full 21-meter h-[2px] color-white top-[16.15%] absolute  bg-white"></div>
        <div className="w-full 45-meter h-[2px] color-white top-[34.6%] absolute  bg-white"></div>
        <div className="w-full mid h-[2px] color-white top-[50%] absolute  bg-white"></div>
        <div className="w-full op-45-meter h-[2px] color-white top-[69.2%] absolute  bg-white"></div>
        <div className="w-full op-21-meter h-[2px] color-white top-[83.85%] absolute  bg-white"></div>
        <div className="w-full op-13-meter h-[2px] color-white top-[90%] absolute  bg-white"></div>

        {/* Circles */}
        {/* <div
          className="21-circle text-center center border-b-0 color-white rotate-180 h-[10%] top-[16.15%] first-letter: w-[25%] left-[37.5%] border-2 
            rounded-tl-full absolute rounded-tr-full"></div>
        <div
          className="op-21-circle text-center center border-b-0 color-white  h-[10%] first-letter:
           w-[25%] top-[74%] left-[37.5%] border-2 
            rounded-tl-full absolute rounded-tr-full"></div> */}

        {/* Goals */}
        <div className="goals w-[25%] left-[37.5%] h-[5%] border-2 text-white mx-auto absolute "></div>
        <div className="goals w-[25%] left-[37.5%] h-[5%] border-2 text-white mx-auto absolute top-[95%] "></div>
      </div>
    </>
  );
};

export default SetPlay;
