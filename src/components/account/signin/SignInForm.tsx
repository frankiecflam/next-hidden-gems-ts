import styles from "./SignInForm.module.css";
import { useRouter } from "next/router";
import { signInWithGooglePopup } from "../../../config/firebase";
import { GoogleIcon } from "../../../assets/icons";
import Link from "next/link";
import { useState } from "react";
import { UserCredential } from "firebase/auth";
import { checkIsUserCredentialType } from "../../../utils/helpers";

const SignInForm = () => {
  const [signInFeedback, setSignInFeedback] = useState("");
  const router = useRouter();

  const handleSignIn = async () => {
    const result = await signInWithGooglePopup();

    if (!checkIsUserCredentialType(result)) {
      setSignInFeedback(
        "Something went wrong signing in with your Google account! Please contact us."
      );
      return;
    }

    setSignInFeedback("");
    router.push("/");
  };

  return (
    <section className={styles.signInForm}>
      <header className={styles.header}>
        <h1 className={styles.heading}>Sign In</h1>
      </header>
      <div className={styles.body}>
        <div className={styles.signInWithGoogle}>
          <button className={styles.signInWithGoogleBtn} onClick={handleSignIn}>
            <span className={styles.googleIcon}>
              <GoogleIcon />
            </span>
            sign in with Google
          </button>
          <p className={styles.signInFeedback}>{signInFeedback}</p>
        </div>

        <div className={styles.alternatives}>
          <div className={styles.signupAlternative}>
            <p>
              Or
              <br />
              If you do not have an account,
            </p>
            <Link href="/account/signup">
              <a className={styles.signUpLink}>sign up</a>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignInForm;
