import React, { useState, useEffect, useRef } from "react";
import Timeline from "./FootballComponents/Timeline";
import SaveSetPlay from "./FootballComponents/SaveSetPlay";
import AccountSideBar from "./FootballComponents/AccountSidebar";


const ViewPlay = (props)=>{
    return(
    <>
    <div className="grid grid-cols-3 gap-1 mt-5 grid-rows-6  h-[90vh] top-[5vh] ">
  <div className="bg-base-200 rounded-md "><p>This will be the information about the play</p></div>
  <div className="bg-base-200 rounded-md col-span-2 ">This will be the controls of the play, Play,Pause,Timing etc....</div>
 
  <div className="col-span-3 bg-base-200 rounded-md row-span-5 ...">

<p>This will be our pitch</p>

  </div>
 
 
</div>
</>
    )
   
}

export default ViewPlay;
