import { useQuery } from "@tanstack/react-query";
import { ApiResponse } from "../interface/interface";

const url = process.env.NEXT_PUBLIC_API_URL;

const useGetAPIRequest = <T>(path: string, key: string[]) => {
  return useQuery<ApiResponse<T>>({
    queryKey: key,
    queryFn: () => getAPIRequest({ path }),
    staleTime: 1000 * 60 * 5,
  });
};
export default useGetAPIRequest;

const getAPIRequest = async ({ path }: { path: string }) => {
  try {
    const response = await fetch(`${url}${path}`, {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    if (json.status) {
      return json;
    } else {
      throw new Error(json.message);
    }
  } catch (err) {
    console.log(err);
  }
};
