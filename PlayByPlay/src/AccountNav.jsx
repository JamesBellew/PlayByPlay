import { GoogleAuthProvider,signInWithPopup } from "firebase/auth";
import { auth } from "./utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
const AccountNav = ()=>{

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
    return(
        <>
      
        <button className="absolute left-5 top-5 btn btn-primary">SIGN IN</button>
      
        </>
    )
}
export default AccountNav;