import styles from "./SignInForm.module.css";
import Link from "next/link";
import { SignInWithGooglePopUp } from "./";

const SignInForm = () => {
  return (
    <section className={styles.signInForm}>
      <header className={styles.header}>
        <h1 className={styles.heading}>Sign In</h1>
      </header>
      <div className={styles.body}>
        <SignInWithGooglePopUp />

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
