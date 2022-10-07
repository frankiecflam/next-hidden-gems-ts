import styles from "./HeaderNavActions.module.css";
import { useRouter } from "next/router";
import { signOutWithGoogle } from "../../config/firebase";
import Link from "next/link";

const HeaderNavActions = ({ loggedIn }: { loggedIn: boolean }) => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOutWithGoogle();

      router.push("/");
    } catch (error: any) {
      console.log("Failed to sign out!");
    }
  };

  return (
    <div className={styles.navActions}>
      {loggedIn ? (
        <button
          className={`${styles.navActionsBtn} ${styles.logout}`}
          onClick={handleLogout}
        >
          log out
        </button>
      ) : (
        <>
          <Link href="/account/signin">
            <a className={`${styles.navActionsBtn} ${styles.signin}`}>
              sign in
            </a>
          </Link>
          <Link href="/account/signup">
            <a className={`${styles.navActionsBtn} ${styles.signup}`}>
              sign up
            </a>
          </Link>
        </>
      )}
    </div>
  );
};

export default HeaderNavActions;
