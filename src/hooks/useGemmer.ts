import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Gemmer from "../types/gemmer";
import { gemmers as gemmersSchema } from "../schema/gemmers.schema";

const useGemmer = (gemmerId: string) => {
  return useQuery(
    ["gemmers", gemmerId],
    () =>
      axios.get("/api/gemmers").then((res) => {
        const data = res.data.gemmers;

        return gemmersSchema.parse(data) as Gemmer[];
      }),
    {
      select: (gemmers) => gemmers.find((gemmer) => gemmer.id === gemmerId),
      onError: (error) => {
        console.log(
          "Error occured during zod parsing the api response of Gemmers."
        );
        console.error(error);
      },
    }
  );
};

export default useGemmer;
