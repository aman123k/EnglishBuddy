import { useMutation, useQueryClient } from "@tanstack/react-query";

const url = process.env.NEXT_PUBLIC_API_URL;

interface PostAPIRequestParams {
  path: string;
  data: Record<string, unknown>;
  headers?: Record<string, string>;
}

const usePostMessageRequest = (refetchQueryKey?: string[]) => {
  const queryClient = useQueryClient();

  const postAPIRequest = async ({
    path,
    data,
    headers,
  }: PostAPIRequestParams) => {
    try {
      const response = await fetch(`${url}${path}`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
        credentials: "include",
        body: JSON.stringify(data),
      });
      const json = await response.json();
      if (json.status) {
        return json;
      } else {
        throw new Error(json.message);
      }
    } catch (err) {
      console.log(err);
      throw new Error("Post API request failed");
    }
  };

  return useMutation({
    mutationFn: postAPIRequest,
    onSuccess: () => {
      if (refetchQueryKey) {
        queryClient.invalidateQueries({ queryKey: refetchQueryKey });
      }
    },
  });
};

export default usePostMessageRequest;
