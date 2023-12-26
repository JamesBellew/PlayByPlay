import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "./utils/firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuthState } from "react-firebase-hooks/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
// import { auth } from "../utils/firebase";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
const AccountNav = () => {
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

  //this is the functino call to the backedn to store userID
  function sendUserIdToServer(userId) {
    fetch(`http://localhost:5000/storeUserId/${userId}`, {
      method: "GET",
    })
      .then((response) => response.text())
      .then((data) => console.log(data))
      .catch((error) => console.error("Error:", error));
  }

  const authSignInModalHandler = () => {};

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Login successful
      console.log("Logged in successfully");
      setErrorMessage(""); // Clear any previous error messages
    } catch (error) {
      console.error("Error signing in with password and email", error);
      // Set the error message to be displayed
      setErrorMessage("Incorrect username or password");
    }
  };

  return (
    <>
      <authModal />
      {!user && (
        // <button
        //   className="absolute left-5 top-5 btn btn-primary"
        //   onClick={authSignInModalHandler}>
        //   SIGN IN
        // </button>
        <>
          <button
            className="btn btn-primary left-10 absolute top-10"
            onClick={() => document.getElementById("my_modal_1").showModal()}>
            <FontAwesomeIcon icon={faUserPlus} />
          </button>
          <dialog id="my_modal_1" className="modal">
            <div className="modal-box">
              {/* <h3 className="font-bold text-lg text-white">Please Sign In</h3> */}

              {/* <button className=" btn btn-primary" onClick={GoogleLogin}>
                SIGN IN With Google
              </button> */}
              {/* <form class="space-y-2">
                <div>
                  <label class="label">
                    <span class="text-base label-text">Email</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Email Address"
                    class="w-full input input-bordered"
                  />
                </div>
                <div>
                  <label class="label">
                    <span class="text-base label-text">Password</span>
                  </label>
                  <input
                    type="password"
                    placeholder="Enter Password"
                    class="w-full input input-bordered "
                  />
                </div>

                <div>
                  <button class="btn btn-primary m-4 text-sm font-normal ">
                    Login
                  </button>
                </div>
              </form> */}
              <form onSubmit={handleLogin} className="space-y-2">
                {/* ... your form fields ... */}
                <input
                  type="text"
                  placeholder="Email Address"
                  className="w-full input input-bordered"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Enter Password"
                  className="w-full input input-bordered"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {errorMessage && (
                  <div className="text-red-500 text-sm">{errorMessage}</div>
                )}
                <button
                  type="submit"
                  className="btn btn-primary m-4 text-sm font-normal">
                  Login
                </button>
              </form>
              <hr className="mb-5"></hr>
              <button
                type="button"
                onClick={GoogleLogin}
                class="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2">
                <svg
                  class="mr-2 -ml-1 w-4 h-4"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fab"
                  data-icon="google"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 488 512">
                  <path
                    fill="currentColor"
                    d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
                </svg>
                Sign in with Google
              </button>
              <div className="modal-action">
                <form method="dialog">
                  {/* if there is a button in form, it will close the modal */}
                  <button className="btn">Close</button>
                </form>
              </div>
            </div>
          </dialog>
        </>
      )}
      {user && (
        <>
          <div className="absolute left-5 top-10 hidden sm:block">
            <div className="avatar">
              <div className="w-16 mask mask-squircle">
                <img src={user.photoURL} />
              </div>
            </div>
            <p className="text-md text-slate-200">{user.displayName}</p>
            <p
              className="cursor-pointer hover:font-bold text-secondary"
              onClick={() => auth.signOut()}>
              Logout
            </p>
          </div>
        </>
      )}
    </>
  );
};
export default AccountNav;
