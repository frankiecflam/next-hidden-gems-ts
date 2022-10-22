import styles from "./SignUpWithGooglePopUp.module.css";
import { GoogleIcon } from "../../../assets/icons";
import { useState } from "react";
import { checkIsUserCredentialType } from "../../../utils/helpers";
import { signInWithGooglePopup } from "../../../config/firebase";

const SignUpWithGooglePopUp = () => {
  const [signUpFeedback, setSignUpFeedback] = useState("");

  const handleSignUp = async () => {
    const result = await signInWithGooglePopup();

    if (!checkIsUserCredentialType(result)) {
      setSignUpFeedback(
        "Sorry! We have trouble creating your Hidden Gems' account with your Google account. Please contact us!"
      );
      return;
    }

    setSignUpFeedback("");
  };
  return (
    <div className={styles.signInWithGoogle}>
      <button className={styles.signInWithGoogleBtn} onClick={handleSignUp}>
        <span className={styles.googleIcon}>
          <GoogleIcon />
        </span>
        sign up with Google
      </button>
      <p className={styles.signUpFeedback}>{signUpFeedback}</p>
    </div>
  );
};

export default SignUpWithGooglePopUp;
