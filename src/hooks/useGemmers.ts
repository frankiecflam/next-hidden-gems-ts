import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Gemmer from "../types/gemmer";

const useGemmers = () => {
  return useQuery(["gemmers"], () =>
    axios.get("/api/gemmers").then((res) => res.data.gemmers as Gemmer[])
  );
};

export default useGemmers;
