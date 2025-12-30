// Small wrapper around React Query's mutation for posting chat messages.
// Optionally invalidates a query key after a successful request.
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

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
        toast.error(json.message || "An error occurred");
      }
    } catch (err) {
      console.log(err);
      toast.error("An error occurred while sending the message");
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
