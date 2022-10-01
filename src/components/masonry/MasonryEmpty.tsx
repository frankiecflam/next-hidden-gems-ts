import styles from "./MasonryEmpty.module.css";
import Category from "../../types/category";

interface MasonryEmptyProps {
  category: Category;
  searchTerm: string;
}

const MasonryEmpty = ({ category, searchTerm }: MasonryEmptyProps) => {
  return (
    <div className={styles.empty}>
      {!category.id && !searchTerm ? (
        <h1 className={styles.heading}>Whoops! There are no items found!</h1>
      ) : (
        <>
          <h1 className={styles.heading}>
            Whoops! There are no items currently matching the following
            criteria:
          </h1>
          <ul className={styles.criteriaList}>
            {category && <li>Category: {category.name}</li>}
            {searchTerm && <li>Search term: {searchTerm}</li>}
          </ul>
        </>
      )}
    </div>
  );
};

export default MasonryEmpty;
