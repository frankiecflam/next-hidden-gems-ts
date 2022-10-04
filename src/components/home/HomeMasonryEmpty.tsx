import styles from "./HomeMasonryEmpty.module.css";
import Category from "../../types/category";

interface HomeMasonryEmptyProps {
  category: Category;
  searchTerm: string;
}

const HomeMasonryEmpty = ({ category, searchTerm }: HomeMasonryEmptyProps) => {
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
            {category && (
              <li>
                Category:{" "}
                <span className={styles.categoryName}>{category.name}</span>
              </li>
            )}
            {searchTerm && <li>Search term: {searchTerm}</li>}
          </ul>
        </>
      )}
    </div>
  );
};

export default HomeMasonryEmpty;
