import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Category from "../../src/types/category";

const useCategories = () => {
  return useQuery(
    ["categories"],
    () =>
      axios
        .get("/api/categories")
        .then((res) => res.data.categories as Category[]),
    {
      select: (categories) =>
        categories.sort((a, b) => {
          const aName = a.name.slice(0, 1).toLowerCase();
          const bName = b.name.slice(0, 1).toLowerCase();

          if (aName < bName) return -1;

          if (aName > bName) return 1;

          return 0;
        }),
    }
  );
};

export default useCategories;
