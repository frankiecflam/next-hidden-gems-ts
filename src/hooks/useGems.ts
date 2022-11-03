import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Gem from "../types/gem";
import { sortGemsByDate } from "../utils/helpers";
import { z } from "zod";

const gemsSchema = z.array(
  z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    image: z.string(),
    date: z.object({
      seconds: z.number(),
      nanoseconds: z.number(),
    }),
    categoryId: z.string(),
    gemmerId: z.string(),
  })
);

const useGems = () => {
  return useQuery(
    ["gems"],
    () =>
      axios.get("/api/gems").then((res) => {
        const data = res.data.gems;

        return gemsSchema.parse(data) as Gem[];
      }),
    {
      select: (gems: Gem[]) => {
        return sortGemsByDate(gems);
      },
      onError: (error) => {
        console.log(
          "Error occured during zod parsing the api response of Gems."
        );
        console.error(error);
      },
    }
  );
};

export default useGems;
