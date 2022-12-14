import styles from "./HeaderNavList.module.css";
import { HeaderNavItem } from "./";
import {
  HomeIcon,
  CollectionIcon,
  AddIcon,
  UserIcon,
} from "../../assets/icons";

const HeaderNavList = ({ userId }: { userId: string }) => {
  return (
    <ul className={styles.navList}>
      <HeaderNavItem href="/">{<HomeIcon />}</HeaderNavItem>
      <HeaderNavItem href="/collection">{<CollectionIcon />}</HeaderNavItem>
      <HeaderNavItem href="/newgem">{<AddIcon />}</HeaderNavItem>
      <HeaderNavItem href={`/gemmer/${userId}`}>{<UserIcon />}</HeaderNavItem>
    </ul>
  );
};

export default HeaderNavList;
