import styles from "./HeaderNavBrand.module.css";
import Link from "next/link";

const HeaderNavBrand = () => {
  return (
    <div className={styles.navBrand}>
      <Link href="/">
        <a className={styles.navBrandLink}>Hidden Gems</a>
      </Link>
    </div>
  );
};

export default HeaderNavBrand;
