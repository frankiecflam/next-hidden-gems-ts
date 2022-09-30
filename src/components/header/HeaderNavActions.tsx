import styles from "./HeaderNavActions.module.css";

const HeaderNavActions = () => {
  return (
    <div className={styles.navActions}>
      <button className={`${styles.navActionsBtn} ${styles.login}`}>
        log in
      </button>
      <button className={`${styles.navActionsBtn} ${styles.signup}`}>
        sign up
      </button>
      <button className={`${styles.navActionsBtn} ${styles.logout}`}>
        log out
      </button>
    </div>
  );
};

export default HeaderNavActions;
