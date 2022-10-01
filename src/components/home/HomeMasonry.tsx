import { HomeMasonryHeader } from "./";
import { ChangeEvent, useState } from "react";
import { Masonry, MasonryEmpty } from "../masonry";
import { useGems, useGemmers } from "../../hooks";
import {
  filterGemsByCategory,
  filterGemsBySearchTerm,
} from "../../utils/helpers";
import Category from "../../types/category";

const HomeMasonry = () => {
  const [categoryFilter, setCategoryFilter] = useState<Category>({
    id: "",
    name: "all",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const {
    isLoading: gemsIsLoading,
    error: gemsLoadingerror,
    data: gems,
  } = useGems();
  const {
    isLoading: gemmersIsLoading,
    error: gemmersLoadingerror,
    data: gemmers,
  } = useGemmers();

  if (gemsIsLoading || gemmersIsLoading) return null;

  if (gemsLoadingerror || gemmersLoadingerror || !gems || !gemmers)
    return <div>Something went wrong fetching gems from the database!</div>;

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
        <MasonryEmpty category={categoryFilter} searchTerm={searchTerm} />
      ) : (
        <Masonry gems={filteredGems} gemmers={gemmers} />
      )}
    </section>
  );
};

export default HomeMasonry;
