import axios from "axios";
import { getUrl } from "@/api";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

const BASE_QUERY_KEY = "channels";
const BASE_PATH = "channels.json";

interface Channel {
  id: number;
  name: string;
}

const getChannels = async (): Promise<Channel[]> => {
  const { data } = await axios.get<Channel[]>(getUrl(BASE_PATH));
  return data;
};

export function useGetChannels(): UseQueryResult<Channel[], unknown> {
  return useQuery<Channel[], unknown>({
    queryKey: [BASE_QUERY_KEY],
    queryFn: getChannels,
  });
}
