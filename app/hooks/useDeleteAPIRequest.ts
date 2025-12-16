import { useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { ApiResponse } from "../interface/interface";
import { SUCCESS_MESSAGES } from "../constants/messages";

const url = process.env.NEXT_PUBLIC_API_URL;

interface DeleteAPIRequestArgs {
  path: string;
  data?: Record<string, unknown>;
}

const deleteAPIRequest = async ({ path, data }: DeleteAPIRequestArgs) => {
  try {
    const response = await fetch(`${url}${path}`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: data ? JSON.stringify(data) : undefined,
    });

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const json = await response.json();

    if (json.status) {
      return json;
    }

    throw new Error(json.message || "Request failed");
  } catch (err) {
    console.log(err);
    // Surface the error to React Query for error handling
    return Promise.reject(err);
  }
};

const useDeleteAPIRequest = () => {
  const toastId = useRef("");

  return useMutation({
    mutationFn: deleteAPIRequest,
    onMutate: () => {
      toastId.current = toast.loading(SUCCESS_MESSAGES?.LOADING);
    },
    onSuccess: (json: ApiResponse<unknown>) => {
      toast.success(json.message, {
        id: toastId.current,
      });
    },
    onError: (error) => {
      console.log(error);
      toast.error("Failed to delete.", {
        id: toastId.current,
      });
    },
  });
};

export default useDeleteAPIRequest;
