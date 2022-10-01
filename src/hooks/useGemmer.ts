import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Gemmer from "../types/gemmer";

const useGemmer = (gemmerId: string) => {
  return useQuery(
    ["gemmers", gemmerId],
    () => axios.get("/api/gemmers").then((res) => res.data.gemmers as Gemmer[]),
    {
      select: (gemmers) => gemmers.find((gemmer) => gemmer.id === gemmerId),
    }
  );
};

export default useGemmer;
