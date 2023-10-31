import React, { useState } from "react";
import Cookies from "js-cookie";

const AccountSideBar = (props) => {
  return (
    <>

<div className="my-auto w-full h-auto rounded-md text-white align-text-bottom items-end relative p-2">
<div class="bg-neutral-focus text-neutral-content align-bottom rounded-full w-14 mx-auto p-2">
    <span class="text-3xl text-secondary">G</span>
  </div>
<h1 className="m-3">Guest</h1>
<div className="btn-group">
<button className="btn">Sign In</button>
<button className="btn">Sign Up</button>

</div>
<div class="indicator mt-4">
  <span class="indicator-item badge badge-secondary">1</span> 
  <button onClick={()=>document.getElementById('my_modal_2').showModal()} class="btn grid w-auto p-4 h-auto bg-base-300 place-items-center">Saved Plays</button>
  
</div>

{/* Open the modal using document.getElementById('ID').showModal() method */}
<dialog id="my_modal_2" className="modal w-auto">
  <div className="modal-box w-auto">
    <h3 className="font-bold text-lg mb-2">Saved Plays This Machine</h3>
    <div className="overflow-x-auto w-auto">
  <table className="table table-xs">
    <thead>
      <tr>
        <th></th> 
        <th>Name</th> 
        <th>Date Saved</th> 
        <th>Moves</th> 
       
  
      </tr>
    </thead> 
    <tbody>
      <tr>
        <th>1</th> 
        <td>Pisol Offence</td> 
        <td>30/10/2023</td> 
        <td>3</td> 
     
   
      </tr>
    
     
    </tbody> 
    
  </table>
</div>
    <div className="modal-action">
      <form method="dialog">
        {/* if there is a button in form, it will close the modal */}
        <button className="btn">Close</button>
      </form>
    </div>
  </div>
</dialog>
</div>
    </>
  );
};

export default AccountSideBar;
