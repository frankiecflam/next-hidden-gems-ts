import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Gem from "../types/gem";

export default function useCreateGem() {
  const queryClient = useQueryClient();

  return useMutation(
    (newGem: Gem) =>
      axios
        .post("/api/gems", {
          newGem,
        })
        .then((res) => res.data.gems),
    {
      onSuccess: (gems: Gem[]) => {
        queryClient.invalidateQueries(["gems"]);
      },
    }
  );
}
