import styles from "./HomeMasonryCategoryList.module.css";
import { useCategories } from "../../hooks";
import { HomeMasonryCategoryItem } from "./";
import Category from "../../types/category";

interface HomeMasonryCategoryListProps {
  onCategoryChange: (category: Category) => void;
  activeCategory: string;
}

const HomeMasonryCategoryList = ({
  onCategoryChange,
  activeCategory,
}: HomeMasonryCategoryListProps) => {
  const { isLoading, error, data: categories } = useCategories();

  return (
    <ul className={styles.categoryList}>
      <HomeMasonryCategoryItem
        onCategoryChange={onCategoryChange}
        category={{ id: "", name: "all" }}
        isActive={activeCategory === ""}
      />

      {categories &&
        categories.map((category) => (
          <HomeMasonryCategoryItem
            key={category.id}
            onCategoryChange={onCategoryChange}
            category={category}
            isActive={activeCategory === category.id}
          />
        ))}
    </ul>
  );
};

export default HomeMasonryCategoryList;
