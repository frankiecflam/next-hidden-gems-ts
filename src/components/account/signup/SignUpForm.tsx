import styles from "./SignUpForm.module.css";
import { GoogleIcon } from "../../../assets/icons";
import { signInWithGooglePopup } from "../../../config/firebase";
import { checkIsUserCredentialType } from "../../../utils/helpers";
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const SignupForm = () => {
  const [signUpFeedback, setSignUpFeedback] = useState("");
  const router = useRouter();

  const handleSignUp = async () => {
    const result = await signInWithGooglePopup();

    if (!checkIsUserCredentialType(result)) {
      setSignUpFeedback(
        "Sorry! We have trouble creating your Hidden Gems' account with your Google account. Please contact us!"
      );
      return;
    }

    setSignUpFeedback("");
    router.push("/");
  };

  return (
    <section className={styles.signUpForm}>
      <header className={styles.header}>
        <h1 className={styles.heading}>sign up</h1>
        <p className={styles.subHeading}>
          start discovering hidden gems from peope all over the world
        </p>
      </header>
      <div className={styles.body}>
        <div className={styles.signInWithGoogle}>
          <button className={styles.signInWithGoogleBtn} onClick={handleSignUp}>
            <span className={styles.googleIcon}>
              <GoogleIcon />
            </span>
            sign up with Google
          </button>
          <p className={styles.signUpFeedback}>{signUpFeedback}</p>
        </div>
        <div className={styles.alternatives}>
          <div className={styles.signInAlternative}>
            <p>
              Or
              <br />
              If you already have an account,
            </p>
            <Link href="/account/signin">
              <a className={styles.signInLink}>sign in</a>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignupForm;
