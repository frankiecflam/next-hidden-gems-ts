import styles from "./CollectionMasonry.module.css";
import { CollectionMasonryHeader, CollectionMasonryEmpty } from "./";
import { ChangeEvent, useState } from "react";
import { Masonry } from "../masonry";
import { useGems, useGemmers, useGemmer } from "../../hooks";
import {
  getGemsWithIds,
  sortGemsByDate,
  sortGemsByCategory,
} from "../../utils/helpers";

const CollectionMasonry = ({ loggedInUserId }: { loggedInUserId: string }) => {
  const [sortingCriterion, setSortingCriterion] = useState<"DATE" | "CATEGORY">(
    "DATE"
  );

  const {
    isLoading: gemsIsLoading,
    error: gemsLoadingError,
    data: gems,
  } = useGems();

  const {
    isLoading: gemmersIsLoading,
    error: gemmersLoadingError,
    data: gemmers,
  } = useGemmers();

  const {
    isLoading: currentUserIsLoading,
    error: currentUserLoadingError,
    data: currentUser,
  } = useGemmer(loggedInUserId);

  if (gemsIsLoading || gemmersIsLoading || currentUserIsLoading) return null;

  if (gemsLoadingError || gemmersLoadingError || !gems || !gemmers)
    return <div>Something went wrong fetching gems from the database!</div>;

  if (currentUserLoadingError || !currentUser) {
    return (
      <div>
        Something went wrong fetching the data of currently-logged-in user!
      </div>
    );
  }

  const gemCollection = getGemsWithIds(currentUser.collection, gems);

  const sortedGemCollection =
    sortingCriterion === "DATE"
      ? sortGemsByDate(gemCollection)
      : sortGemsByCategory(gemCollection);

  const handleSortChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;

    if (value === "DATE" || value === "CATEGORY") {
      return setSortingCriterion(value);
    }

    console.error("Collection can only be sorted by DATE or CATEGORY!");
    return;
  };

  return (
    <section className={styles.collection}>
      <CollectionMasonryHeader
        onSortChange={handleSortChange}
        sortingCriterion={sortingCriterion}
      />
      {gemCollection.length === 0 ? (
        <CollectionMasonryEmpty />
      ) : (
        <Masonry
          gems={sortedGemCollection}
          gemmers={gemmers}
          currentUser={currentUser}
        />
      )}
    </section>
  );
};

export default CollectionMasonry;
