import { HomeMasonryHeader, HomeMasonryEmpty } from "./";
import { ChangeEvent, useState } from "react";
import { Masonry } from "../masonry";
import { useGems, useGemmers, useGemmer } from "../../hooks";
import {
  filterGemsByCategory,
  filterGemsBySearchTerm,
} from "../../utils/helpers";
import Category from "../../types/category";
import { LoadingSpinner } from "../ui";

const HomeMasonry = ({ loggedInUserId }: { loggedInUserId: string }) => {
  const [categoryFilter, setCategoryFilter] = useState<Category>({
    id: "",
    name: "all",
  });
  const [searchTerm, setSearchTerm] = useState("");
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

  if (gemsIsLoading || gemmersIsLoading || currentUserIsLoading)
    return <LoadingSpinner />;

  if (gemsLoadingError || gemmersLoadingError || !gems || !gemmers)
    return <div>Something went wrong fetching gems from the database!</div>;

  if (currentUserLoadingError || !currentUser) {
    return (
      <div>
        Something went wrong fetching the data of currently-logged-in user!
      </div>
    );
  }

  let filteredGems = gems;
  if (categoryFilter) {
    filteredGems = filterGemsByCategory(filteredGems, categoryFilter.id);
  }
  if (searchTerm) {
    filteredGems = filterGemsBySearchTerm(filteredGems, searchTerm);
  }

  return (
    <section>
      <HomeMasonryHeader
        onCategoryChange={(category: Category) => setCategoryFilter(category)}
        activeCategory={categoryFilter.id}
        onSearchTermChange={(e: ChangeEvent<HTMLInputElement>) =>
          setSearchTerm(e.target.value)
        }
        searchTerm={searchTerm}
      />
      {filteredGems.length === 0 ? (
        <HomeMasonryEmpty category={categoryFilter} searchTerm={searchTerm} />
      ) : (
        <Masonry
          gems={filteredGems}
          gemmers={gemmers}
          currentUser={currentUser}
        />
      )}
    </section>
  );
};

export default HomeMasonry;
