import styles from "./CollectionMasonryHeader.module.css";
import { CollectionMasonrySort } from "./";
import { ChangeEvent } from "react";

interface CollectionMasonryHeaderProps {
  onSortChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  sortingCriterion: "DATE" | "CATEGORY";
}

const CollectionMasonryHeader = ({
  onSortChange,
  sortingCriterion,
}: CollectionMasonryHeaderProps) => {
  return (
    <header className={styles.header}>
      <h1 className={styles.heading}>
        Here are all the gems you have saved along the way...
      </h1>
      <CollectionMasonrySort
        onSortChange={onSortChange}
        sortingCriterion={sortingCriterion}
      />
    </header>
  );
};

export default CollectionMasonryHeader;
