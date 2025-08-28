import { useLayoutEffect } from "react";
import { User } from "../interface/interface";
import { GET_USER_INFORMATION } from "../queryKeys/allQueryKeys";
import useGetAPIRequest from "./useGetAPIRequest";
import { useRouter } from "next/navigation";

const useAuthentication = () => {
  const router = useRouter();
  const {
    data: userInformation,
    isError,
    isLoading,
  } = useGetAPIRequest<User>(
    "/api/userInformation",
    GET_USER_INFORMATION("/api/userInformation")
  );

  //If user has completed survey, redirect to home page
  useLayoutEffect(() => {
    if (userInformation?.data?.isSurveyComplete) {
      router.push("/");
    }
  }, [userInformation, router]);

  // If user is not authenticated, redirect to login page
  useLayoutEffect(() => {
    if (!isLoading) {
      const allowedPaths = ["/get-started", "/survey", "/login", "/callback"];
      const currentPath = window.location.pathname;

      if (
        (userInformation?.data.isSurveyComplete === false || isError) &&
        !allowedPaths.includes(currentPath)
      ) {
        router.push("/survey");
      }
    }
  }, [isError, isLoading, userInformation, router]);

  return {
    userData: userInformation?.data,
    isLoading,
  };
};

export default useAuthentication;
