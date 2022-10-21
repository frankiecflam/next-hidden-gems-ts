import styles from "./SignInWithGooglePopUp.module.css";
import { GoogleIcon } from "../../../assets/icons";
import { signInWithGooglePopup } from "../../../config/firebase";
import { checkIsUserCredentialType } from "../../../utils/helpers";
import { useState } from "react";

const SignInWithGooglePopUp = () => {
  const [signInFeedback, setSignInFeedback] = useState("");
  const handleSignIn = async () => {
    const result = await signInWithGooglePopup();

    if (!checkIsUserCredentialType(result)) {
      setSignInFeedback("Failed to sign in your account with Google!");
      return;
    }

    setSignInFeedback("");
  };
  return (
    <div className={styles.signInWithGoogle}>
      <button className={styles.signInWithGoogleBtn} onClick={handleSignIn}>
        <span className={styles.googleIcon}>
          <GoogleIcon />
        </span>
        sign in with Google
      </button>
      {signInFeedback && (
        <p className={styles.signInFeedback}>{signInFeedback}</p>
      )}
    </div>
  );
};

export default SignInWithGooglePopUp;
