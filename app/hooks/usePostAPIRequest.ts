import { useRef } from "react";
import toast from "react-hot-toast";
import { SUCCESS_MESSAGES } from "../constants/messages";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const url = process.env.NEXT_PUBLIC_API_URL;

interface PostAPIRequestParams {
  path: string;
  data: Record<string, unknown>;
  headers?: Record<string, string>;
}

const usePostAPIRequest = (refetchQueryKey?: string[]) => {
  const toastId = useRef("");
  const queryClient = useQueryClient();

  const postAPIRequest = async ({
    path,
    data,
    headers,
  }: PostAPIRequestParams) => {
    try {
      toastId.current = toast.loading(SUCCESS_MESSAGES?.LOADING);
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
        toast.success(json.message, { id: toastId.current });
        return json;
      } else {
        toast.error(json.message, { id: toastId.current });
      }
    } catch (err) {
      console.log(err);
      //   toast.error(ERROR_MESSAGES?.ERROR, { id: toastId.current });
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

export default usePostAPIRequest;
