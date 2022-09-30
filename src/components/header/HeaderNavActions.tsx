import styles from "./HeaderNavActions.module.css";
import { useRouter } from "next/router";
import {
  signInWithGooglePopup,
  signOutWithGoogle,
} from "../../config/firebase";

const HeaderNavActions = ({ loggedIn }: { loggedIn: boolean }) => {
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const response = await signInWithGooglePopup();

      if (!response.user)
        throw new Error("Failed to sign in with Google account!");

      router.push("/");
    } catch (error: any) {
      console.log(error.message);
    }
  };

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
          <button
            className={`${styles.navActionsBtn} ${styles.login}`}
            onClick={handleLogin}
          >
            log in
          </button>
          <button
            className={`${styles.navActionsBtn} ${styles.signup}`}
            onClick={handleLogin}
          >
            sign up
          </button>
        </>
      )}
    </div>
  );
};

export default HeaderNavActions;
