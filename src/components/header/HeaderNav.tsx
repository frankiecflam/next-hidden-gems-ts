import { HeaderNavBrand, HeaderNavList, HeaderNavActions } from "./";
import styles from "./HeaderNav.module.css";

const HeaderNav = () => {
  return (
    <nav className={styles.nav}>
      <HeaderNavBrand />
      <HeaderNavList />
      <HeaderNavActions />
    </nav>
  );
};

export default HeaderNav;
