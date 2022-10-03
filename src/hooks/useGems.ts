import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Gem from "../types/gem";
import { sortGemsByDate } from "../utils/helpers";

const useGems = () => {
  return useQuery(
    ["gems"],
    () => axios.get("/api/gems").then((res) => res.data.gems as Gem[]),
    {
      select: (gems: Gem[]) => {
        return sortGemsByDate(gems);
      },
    }
  );
};

export default useGems;
