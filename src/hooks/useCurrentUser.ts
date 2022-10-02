import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Gemmer from "../types/gemmer";

const useCurrentUser = (currentUserId: string) => {
  return useQuery(
    ["gemmers", currentUserId],
    () => axios.get("/api/gemmers").then((res) => res.data.gemmers as Gemmer[]),
    {
      select: (gemmers) =>
        gemmers.find((gemmer) => gemmer.id === currentUserId),
    }
  );
};

export default useCurrentUser;
