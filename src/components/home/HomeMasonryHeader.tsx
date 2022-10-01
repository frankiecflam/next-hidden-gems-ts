import styles from "./HomeMasonryHeader.module.css";
import { HomeMasonrySearchBar, HomeMasonryCategoryFilter } from "./";
import { ChangeEvent } from "react";
import Category from "../../types/category";

interface HomeMasonryHeaderProps {
  onCategoryChange: (category: Category) => void;
  activeCategory: string;
  onSearchTermChange: (e: ChangeEvent<HTMLInputElement>) => void;
  searchTerm: string;
}

const HomeMasonryHeader = ({
  onCategoryChange,
  activeCategory,
  onSearchTermChange,
  searchTerm,
}: HomeMasonryHeaderProps) => {
  return (
    <header className={styles.header}>
      <HomeMasonrySearchBar
        onSearchTermChange={onSearchTermChange}
        searchTerm={searchTerm}
      />
      <HomeMasonryCategoryFilter
        onCategoryChange={onCategoryChange}
        activeCategory={activeCategory}
      />
    </header>
  );
};

export default HomeMasonryHeader;
