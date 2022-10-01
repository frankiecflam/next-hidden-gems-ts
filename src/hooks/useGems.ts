import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Gem from "../types/gem";

const useGems = () => {
  return useQuery(["gems"], () =>
    axios.get("/api/gems").then((res) => res.data.gems as Gem[])
  );
};

export default useGems;
