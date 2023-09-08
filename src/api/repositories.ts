import axios from "axios";
import { getUrl } from "@/api";
import { useQuery } from "@tanstack/react-query";

const BASE_QUERY_KEY = "repositories";
const BASE_PATH = "repositories.json";

const getRepositories = async () => {
  const { data } = await axios.get(getUrl(BASE_PATH));
  return data;
};

export function useGetRepositories() {
  return useQuery({
    queryKey: [BASE_QUERY_KEY],
    queryFn: () => getRepositories(),
  });
}
