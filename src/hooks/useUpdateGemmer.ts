import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Gemmer from "../types/gemmer";
import { gemmers as gemmersSchema } from "../schema/gemmers.schema";

const useUpdateGemmer = () => {
  const queryClient = useQueryClient();

  return useMutation(
    ({ mutatedGemmer, docId }: { mutatedGemmer: Gemmer; docId: string }) =>
      axios
        .patch("/api/gemmers", { gemmer: mutatedGemmer, docId })
        .then((res) => {
          const data = res.data.gemmers;

          const gemmers = gemmersSchema.parse(data) as Gemmer[];

          const currentGemmer = gemmers.find(
            (gemmer) => gemmer.id === mutatedGemmer.id
          );

          if (!currentGemmer)
            throw new Error("No matching gemmers with the gemmer id given!");

          return currentGemmer;
        }),
    {
      onSuccess: (gemmer: Gemmer) =>
        queryClient.invalidateQueries(["gemmers", gemmer.id]),

      onError: (error) => {
        console.log(
          "Error occured during zod parsing the api response of Gemmers."
        );
        console.error(error);
      },
    }
  );
};

export default useUpdateGemmer;
