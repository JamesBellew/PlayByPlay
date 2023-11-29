import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "./utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
const AccountNav = () => {
  const [user, loading] = useAuthState(auth);
  const googleProvider = new GoogleAuthProvider();
  const GoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log(result.user);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {!user && (
        <button
          className="absolute left-5 top-5 btn btn-primary"
          onClick={GoogleLogin}>
          SIGN IN
        </button>
      )}
      {user && (
        <>
          <div className="absolute left-5 top-10">
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
