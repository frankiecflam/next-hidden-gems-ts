import styles from "./Header.module.css";
import { HeaderNav } from "./";

const Header = () => {
  return (
    <header className={styles.header}>
      <HeaderNav />
    </header>
  );
};

export default Header;
