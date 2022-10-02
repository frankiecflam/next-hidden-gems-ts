import styles from "./CollectionMasonry.module.css";
import { CollectionMasonryHeader } from "./";
import { ChangeEvent, useState } from "react";

const CollectionMasonry = () => {
  const [sortingCriterion, setSortingCriterion] = useState<"DATE" | "CATEGORY">(
    "DATE"
  );

  const handleSortChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;

    if (value === "DATE" || value === "CATEGORY") {
      return setSortingCriterion(value);
    }

    console.error("Collection can only be sorted by DATE or CATEGORY!");
    return;
  };

  /*
  
  */

  return (
    <section className={styles.collection}>
      <CollectionMasonryHeader
        onSortChange={handleSortChange}
        sortingCriterion={sortingCriterion}
      />
    </section>
  );
};

export default CollectionMasonry;
