import { useEffect } from "react";
import { User } from "../interface/interface";
import { GET_USER_INFORMATION } from "../queryKeys/allQueryKeys";
import useGetAPIRequest from "./useGetAPIRequest";
import { useRouter } from "next/navigation";
import { useStore } from "../store/store";

const useAuthentication = () => {
  const router = useRouter();
  const { user, setUser } = useStore();

  // only fetch if we don't already have user in Zustand
  const {
    data: userInformation,
    isError,
    isLoading,
  } = useGetAPIRequest<User>(
    "/api/userInformation",
    GET_USER_INFORMATION("/api/userInformation")
  );

  // store fetched user once
  useEffect(() => {
    if (userInformation?.data) {
      setUser(userInformation.data);
    }
  }, [userInformation, setUser]);

  // resolved user (Zustand first, fallback to query)
  const userData = user ?? userInformation?.data ?? null;

  // redirect to home if survey complete (only when not already on home)
  useEffect(() => {
    if (!userData) return; // wait until we know user's state
    const currentPath =
      typeof window !== "undefined" ? window.location.pathname : "/";
    if (userData.isSurveyComplete && currentPath !== "/") {
      router.replace("/");
    }
  }, [userData, router]);

  // redirect to survey if not completed / on error (respect allowed paths)
  useEffect(() => {
    if (isLoading) return; // wait for query to finish
    const allowedPaths = [
      "/get-started",
      "/survey",
      "/login",
      "/callback",
      "/forgot-password",
      "/forgot-password/sent",
    ];
    const currentPath =
      typeof window !== "undefined" ? window.location.pathname : "/";
    const isComplete = userData?.isSurveyComplete;

    if (
      (isComplete === false || isError) &&
      !allowedPaths.includes(currentPath)
    ) {
      router.replace("/survey");
    }
  }, [isError, isLoading, userData, router]);

  return {
    userData,
    isLoading,
  };
};

export default useAuthentication;
