import styles from "./HomeMasonryCategoryItem.module.css";
import Category from "../../types/category";

interface HomeMasonryCategoryItemProps {
  category: Category;
  onCategoryChange: (category: Category) => void;
  isActive: boolean;
}

const HomeMasonryCategoryItem = ({
  category,
  isActive,
  onCategoryChange,
}: HomeMasonryCategoryItemProps) => {
  return (
    <li
      className={isActive ? `${styles.item} ${styles.active}` : styles.item}
      onClick={() => onCategoryChange(category)}
    >
      {category.name}
    </li>
  );
};

export default HomeMasonryCategoryItem;
