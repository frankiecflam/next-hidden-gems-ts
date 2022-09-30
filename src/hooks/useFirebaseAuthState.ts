import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../config/firebase";

const useFirebaseAuthState = () => useAuthState(auth);

export default useFirebaseAuthState;
