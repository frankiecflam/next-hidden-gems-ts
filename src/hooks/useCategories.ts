import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Category from "../../src/types/category";
import { categories as categoriesSchema } from "../schema/categories.schema";

const useCategories = () => {
  return useQuery(
    ["categories"],
    () =>
      axios.get("/api/categories").then((res) => {
        const data = res.data.categories;

        return categoriesSchema.parse(data) as Category[];
      }),
    {
      select: (categories) =>
        categories.sort((a, b) => {
          const aName = a.name.slice(0, 1).toLowerCase();
          const bName = b.name.slice(0, 1).toLowerCase();

          if (aName < bName) return -1;

          if (aName > bName) return 1;

          return 0;
        }),
      onError: (error) => {
        console.log(
          "Error occured during zod parsing the api response of Categories."
        );
        console.error(error);
      },
    }
  );
};

export default useCategories;
