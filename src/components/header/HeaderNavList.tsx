import styles from "./HeaderNavList.module.css";
import { HeaderNavItem } from "./";
import {
  HomeIcon,
  ExploreIcon,
  CollectionIcon,
  AddIcon,
  UserIcon,
} from "../../assets/icons";

const HeaderNavList = () => {
  return (
    <ul className={styles.navList}>
      <HeaderNavItem href="/">{<HomeIcon />}</HeaderNavItem>
      <HeaderNavItem href="/explore">{<ExploreIcon />}</HeaderNavItem>
      <HeaderNavItem href="/collection">{<CollectionIcon />}</HeaderNavItem>
      <HeaderNavItem href="/newgem">{<AddIcon />}</HeaderNavItem>
      <HeaderNavItem href="/gemmer/1">{<UserIcon />}</HeaderNavItem>
    </ul>
  );
};

export default HeaderNavList;
