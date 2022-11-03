import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Gemmer from "../types/gemmer";
import { gemmers as gemmersSchema } from "../schema/gemmers.schema";

const useGemmers = () => {
  return useQuery(
    ["gemmers"],
    () =>
      axios.get("/api/gemmers").then((res) => {
        const data = res.data.gemmers;

        console.log(data);

        return gemmersSchema.parse(data) as Gemmer[];
      }),
    {
      onError: (error) => {
        console.log(
          "Error occured during zod parsing the api response of Gemmers."
        );
        console.error(error);
      },
    }
  );
};

export default useGemmers;
