import styles from "./SignInForm.module.css";
import {
  SignInWithGooglePopUp,
  SignInAlternatives,
  SignInWithEmailAndPassword,
} from "./";

const SignInForm = () => {
  return (
    <section className={styles.signInForm}>
      <header className={styles.header}>
        <h1 className={styles.heading}>Sign In</h1>
      </header>
      <div className={styles.body}>
        <SignInWithGooglePopUp />
        <SignInWithEmailAndPassword />
        <SignInAlternatives />
      </div>
    </section>
  );
};

export default SignInForm;
