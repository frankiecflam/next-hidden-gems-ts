import styles from "./HomeMasonryCategoryFilter.module.css";
import { HomeMasonryCategoryList } from "./";
import Category from "../../types/category";

interface HomeMasonryCategoryFilterProps {
  onCategoryChange: (category: Category) => void;
  activeCategory: string;
}

const HomeMasonryCategoryFilter = ({
  onCategoryChange,
  activeCategory,
}: HomeMasonryCategoryFilterProps) => {
  return (
    <div className={styles.categoryFilter}>
      <header className={styles.header}>
        <h1 className={styles.heading}>Categories</h1>
      </header>
      <HomeMasonryCategoryList
        onCategoryChange={onCategoryChange}
        activeCategory={activeCategory}
      />
    </div>
  );
};

export default HomeMasonryCategoryFilter;
