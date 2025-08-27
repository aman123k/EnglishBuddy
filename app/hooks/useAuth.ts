import { User } from "../interface/interface";
import { GET_USER_INFORMATION } from "../queryKeys/allQueryKeys";
import useGetAPIRequest from "./useGetAPIRequest";

const useAuthentication = () => {
  const {
    data: userInformation,
    isError,
    isLoading,
  } = useGetAPIRequest<User>(
    "/api/userInformation",
    GET_USER_INFORMATION("/api/userInformation")
  );
  return {
    isAuthenticated: !!userInformation?.data,
    userData: userInformation?.data,
    isError,
    isLoading,
  };
};

export default useAuthentication;
