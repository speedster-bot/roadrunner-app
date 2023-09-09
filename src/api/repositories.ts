import axios from "axios";
import { getUrl } from "@/api";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { Channel } from "diagnostics_channel";

const BASE_QUERY_KEY = "repositories";
const BASE_PATH = "repositories.json";

export interface Repository {
  id: number;
  owner: string;
  name: string;
  baseBranch: string;
  sourceControlType: string;
  supportsDeploy: boolean;
  active: boolean;
  projectId: string;
  jiraProject: string;
  devGroup: string;
  deployChannel: Channel;
  devChannel: Channel;
  feedChannel: Channel;
}

const getRepositories = async (): Promise<Repository[]> => {
  const { data } = await axios.get<Repository[]>(getUrl(BASE_PATH));
  return data;
};

export function useGetRepositories(): UseQueryResult<Repository[]> {
  return useQuery<Repository[]>({
    queryKey: [BASE_QUERY_KEY],
    queryFn: getRepositories,
  });
}
