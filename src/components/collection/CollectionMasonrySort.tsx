import styles from "./CollectionMasonrySort.module.css";
import { ChangeEvent } from "react";

interface CollectionMasonrySortProps {
  onSortChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  sortingCriterion: "DATE" | "CATEGORY";
}

const CollectionMasonrySort = ({
  onSortChange,
  sortingCriterion,
}: CollectionMasonrySortProps) => {
  return (
    <div className={styles.collectionSort}>
      <label htmlFor="criterion" className={styles.label}>
        sort by
      </label>
      <select
        className={styles.select}
        id="criterion"
        onChange={onSortChange}
        value={sortingCriterion}
      >
        <option className={styles.option} value={"DATE"}>
          newest
        </option>
        <option className={styles.option} value={"CATEGORY"}>
          category
        </option>
      </select>
    </div>
  );
};

export default CollectionMasonrySort;
