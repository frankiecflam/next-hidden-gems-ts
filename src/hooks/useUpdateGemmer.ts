import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Gemmer from "../types/gemmer";

const useUpdateGemmer = () => {
  const queryClient = useQueryClient();

  return useMutation(
    ({ gemmer, docId }: { gemmer: Gemmer; docId: string }) =>
      axios
        .patch("/api/gemmers", { gemmer, docId })
        .then((res) => res.data.gemmers as Gemmer[]),
    {
      onSuccess: () => queryClient.invalidateQueries(["gemmers"]),
    }
  );
};

export default useUpdateGemmer;
