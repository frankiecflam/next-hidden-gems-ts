import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../config/firebase";

// useAuthState => [user, loading]
const useFirebaseAuthState = () => useAuthState(auth);

export default useFirebaseAuthState;
