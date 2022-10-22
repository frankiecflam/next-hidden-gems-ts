import styles from "./SignUpForm.module.css";
import {
  SignUpWithGooglePopUp,
  SignUpAlternatives,
  SignUpWithEmailAndPassword,
} from "./";

const SignupForm = () => {
  return (
    <section className={styles.signUpForm}>
      <header className={styles.header}>
        <h1 className={styles.heading}>sign up</h1>
        <p className={styles.subHeading}>
          start discovering hidden gems from peope all over the world
        </p>
      </header>
      <div className={styles.body}>
        <SignUpWithGooglePopUp />
        <SignUpWithEmailAndPassword />
        <SignUpAlternatives />
      </div>
    </section>
  );
};

export default SignupForm;
