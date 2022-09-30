import styles from "./HeaderNavItem.module.css";
import Link from "next/link";
import { ReactNode } from "react";

interface HeaderNavItemProps {
  children: ReactNode;
  href: string;
}

const HeaderNavItem = ({ children, href }: HeaderNavItemProps) => {
  return (
    <li className={styles.navItem}>
      <Link href={href} className={styles.navLink}>
        <a>{children}</a>
      </Link>
    </li>
  );
};

export default HeaderNavItem;
