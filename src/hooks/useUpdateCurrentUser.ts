import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Gemmer from "../types/gemmer";

const useUpdateCurrentUser = () => {
  const queryClient = useQueryClient();

  return useMutation(
    ({ currentUser, docId }: { currentUser: Gemmer; docId: string }) =>
      axios
        .patch("/api/gemmers", { gemmer: currentUser, docId })
        .then((res) => {
          const { gemmers }: { gemmers: Gemmer[] } = res.data;

          const currentGemmer = gemmers.find(
            (gemmer) => gemmer.id === currentUser.id
          );

          if (!currentGemmer)
            throw new Error(
              "No matching gemmers with the id of the current user!"
            );

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

export default useUpdateCurrentUser;
