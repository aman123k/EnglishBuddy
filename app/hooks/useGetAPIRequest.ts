// Generic GET helper hook backed by React Query.
// Accepts a relative API path, a pre-built query key and a stale time.
import { useQuery } from "@tanstack/react-query";
import { ApiResponse } from "../interface/interface";

const url = process.env.NEXT_PUBLIC_API_URL;

const useGetAPIRequest = <T>(
  path: string,
  key: string[],
  staleTime: number
) => {
  return useQuery<ApiResponse<T>>({
    queryKey: key,
    queryFn: () => getAPIRequest({ path }),
    staleTime: staleTime,
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

    // Surface network-level failures to React Query
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const json = await response.json();

    if (json.status) {
      return json;
    }

    throw new Error(json.message || "Request failed");
  } catch (err) {
    // Ensure we return a rejected promise so the query never resolves to undefined
    return Promise.reject(err);
  }
};
