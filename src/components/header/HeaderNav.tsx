import { HeaderNavBrand, HeaderNavList, HeaderNavActions } from "./";
import styles from "./HeaderNav.module.css";
import { useFirebaseAuthState } from "../../hooks";

const HeaderNav = () => {
  const [user, loading] = useFirebaseAuthState();

  if (loading) return null;

  return (
    <nav className={styles.nav}>
      <HeaderNavBrand />
      {user && <HeaderNavList userId={user.uid} />}
      <HeaderNavActions loggedIn={user ? true : false} />
    </nav>
  );
};

export default HeaderNav;
