import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Gemmer from "../types/gemmer";

const useUpdateGemmer = () => {
  const queryClient = useQueryClient();

  return useMutation(
    ({ mutatedGemmer, docId }: { mutatedGemmer: Gemmer; docId: string }) =>
      axios
        .patch("/api/gemmers", { gemmer: mutatedGemmer, docId })
        .then((res) => {
          const { gemmers }: { gemmers: Gemmer[] } = res.data;

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

      onError: (error: any) => {
        console.error(error);
      },
    }
  );
};

export default useUpdateGemmer;
