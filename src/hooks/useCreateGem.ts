import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Gem from "../types/gem";
import { gems as gemsSchema } from "../schema/gems.schema";

export default function useCreateGem() {
  const queryClient = useQueryClient();

  return useMutation(
    (newGem: Gem) =>
      axios
        .post("/api/gems", {
          newGem,
        })
        .then((res) => {
          const data = res.data.gems;

          return gemsSchema.parse(data) as Gem[];
        }),
    {
      onSuccess: (gems: Gem[]) => {
        queryClient.invalidateQueries(["gems"]);
      },
      onError: (error) => {
        console.log(
          "Error occured during zod parsing the api response of Gems."
        );
        console.error(error);
      },
    }
  );
}
