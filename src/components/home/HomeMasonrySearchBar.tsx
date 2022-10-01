import { SearchIcon } from "../../assets/icons";
import styles from "./HomeMasonrySearchBar.module.css";
import { ChangeEvent } from "react";

interface HomeMasonrySearchBarProps {
  onSearchTermChange: (e: ChangeEvent<HTMLInputElement>) => void;
  searchTerm: string;
}

const HomeMasonrySearchBar = ({
  onSearchTermChange,
  searchTerm,
}: HomeMasonrySearchBarProps) => {
  return (
    <div className={styles.searchBar}>
      <SearchIcon className={styles.icon} />
      <input
        className={styles.input}
        onChange={onSearchTermChange}
        value={searchTerm}
      />
    </div>
  );
};

export default HomeMasonrySearchBar;
