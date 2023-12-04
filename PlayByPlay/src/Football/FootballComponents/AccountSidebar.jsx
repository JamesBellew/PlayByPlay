import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
const AccountSideBar = (props) => {
  const [user, loading] = useAuthState(auth);
  const googleProvider = new GoogleAuthProvider();
  const GoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log(result.user);
      sendUserIdToServer(result.user.uid);
    } catch (error) {
      console.log(error);
    }
  };

  const [plays, setPlays] = useState([]);
  const navigate = useNavigate();
  const [playCount, setPlayCount] = useState(plays.length);
  useEffect(() => {
    // Fetch the plays data from local storage when the component mounts
    const storedPlays = JSON.parse(localStorage.getItem("setPlays"));
    if (storedPlays && Array.isArray(storedPlays)) {
      setPlays(storedPlays);
    }
    // setPlayCount(plays.length)
  }, []);
  const homeBtnHandler = () => {
    navigate("/");
  };
  return (
    <>
      <div className="my-auto w-full h-auto rounded-md text-white align-text-bottom items-end relative p-2">
        <div class="bg-neutral-focus text-neutral-content align-bottom rounded-full w-14 mx-auto p-2">
          {!user && <span class="text-3xl text-secondary">G</span>}
          {user && (
            <img
              src={user.photoURL}
              className="w-full h-full rounded-full p-0"
              alt=""
            />
          )}
        </div>
        {!user ? <h1 className="m-3">Guest</h1> : <h1>{user.displayName}</h1>}
        {user && (
          <p
            className="text-secondary cursor-pointer "
            onClick={() => auth.signOut()}>
            Logout
          </p>
        )}

        {!user && (
          <div className="btn-group">
            <button className="btn" onClick={GoogleLogin}>
              Sign In
            </button>
            <button className="btn">Sign Up</button>
          </div>
        )}
        <div class="indicator mt-4">
          {plays.length >= 1 && (
            <span class="indicator-item badge badge-secondary"></span>
          )}
          <button
            onClick={() => document.getElementById("my_modal_2").showModal()}
            class="btn grid w-auto p-4 h-auto bg-base-300 place-items-center">
            Saved Plays
          </button>
        </div>
        <div class="indicator mt-4">
          {plays.length >= 1 && (
            <span class="indicator-item badge badge-secondary"></span>
          )}
          <button
            onClick={homeBtnHandler}
            class="btn grid w-auto p-4 h-auto bg-base-300 place-items-center">
            Home
          </button>
        </div>

        {/* Open the modal using document.getElementById('ID').showModal() method */}
        <dialog id="my_modal_2" className="modal w-auto">
          <div className="modal-box w-auto p-10">
            <h3 className="font-bold text-lg mb-2">Saved Plays This Machine</h3>
            <div className="overflow-x-auto w-auto">
              {plays.length === 0 ? (
                <>
                  <p className="mt-5">No Plays Saved to this machine</p>

                  <small>
                    SetPlays may be store on your machine as text files saved
                    under
                    <pre data-prefix=">" class="text-warning mt-5">
                      <code>PlaybyPlay_PlayName.txt</code>
                    </pre>
                    {/* <input className="btn">Look for Play</input> */}
                    <input
                      type="file"
                      class="file-input w-full max-w-xs  border-none bg-none mt-2"
                    />
                  </small>
                </>
              ) : (
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
                    {plays && plays.length > 0 ? (
                      plays.map((play, index) => (
                        <tr
                          key={index}
                          className="cursor-pointer hover:bg-primary rounded-xl transition-all">
                          <th>{index + 1}</th>
                          <td>{play?.name ?? "N/A"}</td>
                          <td>{play?.date ?? "N/A"}</td>
                          <td>{play?.firstArray?.length ?? 0}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4">No plays available</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              )}
            </div>
            <div className="modal-action w-full mx-auto text-center  items-center ">
              <form method="dialog w-full">
                {/* if there is a button in form, it will close the modal */}
                <div className="btn-group w-[100%]  mx-auto text-center">
                  <button className="btn text-cenetr mx-auto">Close</button>
                </div>
              </form>
            </div>
          </div>
        </dialog>
      </div>
    </>
  );
};

export default AccountSideBar;
