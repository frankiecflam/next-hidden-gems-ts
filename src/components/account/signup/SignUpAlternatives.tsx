import styles from "./SignUpAlternatives.module.css";
import Link from "next/link";

const SignUpAlternatives = () => {
  return (
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
  );
};

export default SignUpAlternatives;
