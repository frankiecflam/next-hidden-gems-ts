import styles from "./SignInAlternatives.module.css";
import Link from "next/link";

const SignInAlternatives = () => {
  return (
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
  );
};

export default SignInAlternatives;
