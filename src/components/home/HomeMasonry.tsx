import { HomeMasonryHeader } from "./";
import { ChangeEvent, useState } from "react";

const HomeMasonry = () => {
  const [categoryFilter, setCategoryFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <section>
      <HomeMasonryHeader
        onCategoryChange={(id: string) => setCategoryFilter(id)}
        activeCategory={categoryFilter}
        onSearchTermChange={(e: ChangeEvent<HTMLInputElement>) =>
          setSearchTerm(e.target.value)
        }
        searchTerm={searchTerm}
      />
    </section>
  );
};

export default HomeMasonry;
