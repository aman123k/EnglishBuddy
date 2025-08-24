import { useMutation } from "@tanstack/react-query";
import { SurveyResponses } from "../../interface/interface";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useRef } from "react";
import { SUCCESS_MESSAGES } from "@/app/constants/messages";

const url = process.env.NEXT_PUBLIC_API_URL;

/**
 * Custom hook for posting survey data to the server
 */
const usePostSurvey = () => {
  const router = useRouter();
  const toastId = useRef("");

  /**
   * Posts survey data to the server
   */
  const postSurveyData = async (surveyData: SurveyResponses) => {
    try {
      toastId.current = toast.loading(SUCCESS_MESSAGES?.LOADING);
      const response = await fetch(`${url}/api/survey`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(surveyData),
      });

      const json = await response.json();

      if (json.status) {
        toast.success(json.message, { id: toastId.current });
        return json;
      } else {
        throw new Error(json.message);
      }
    } catch (err) {
      console.error("Error in postSurveyData:", err);
      throw err;
    }
  };

  return useMutation({
    mutationFn: (surveyData: SurveyResponses) => postSurveyData(surveyData),
    onSuccess: () => {
      router.push("/");
    },
    onError: (error) => {
      console.error("Error posting survey data:", error);
    },
  });
};

export default usePostSurvey;
