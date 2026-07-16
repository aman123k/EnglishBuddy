import { useEffect } from "react";
import { User } from "../interface/interface";
import { GET_USER_INFORMATION } from "../queryKeys/allQueryKeys";
import useGetAPIRequest from "./useGetAPIRequest";
import { useStore } from "../store/store";

const useAuthentication = () => {
  const { user, setUser } = useStore();

  // only fetch if we don't already have user in Zustand
  const {
    data: userInformation,
    isError,
    isLoading: queryLoading,
  } = useGetAPIRequest<User>(
    "/api/userInformation",
    GET_USER_INFORMATION("/api/userInformation"),
    1000 * 60 * 5
  );

  // store fetched user once
  useEffect(() => {
    if (userInformation?.data) {
      setUser(userInformation.data);
    }
  }, [userInformation, setUser]);

  // resolved user (Zustand first, fallback to query)
  const userData = user ?? userInformation?.data ?? null;

  return {
    userData,
    isLoading: queryLoading,
    isError,
  };
};

export default useAuthentication;
