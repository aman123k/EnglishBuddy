import { useGoogleLogin } from "@react-oauth/google";
import { useStore } from "../store/store";
import { ERROR_MESSAGES } from "../constants/messages";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { setClientCookie } from "../utils/cookie";

const useGoogleAuth = () => {
  const router = useRouter();
  const { surveyRes } = useStore();
  const url = process.env.NEXT_PUBLIC_API_URL;

  const googleAuth = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const response = await fetch(`${url}/api/googleAuth`, {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokenResponse.access_token}`,
          },
          body: JSON.stringify(surveyRes),
          credentials: "include",
        });
        const json = await response.json();
        if (json?.status) {
          toast.success(json.message);
          setClientCookie("lingo_logged_in", "true", 30);
          setTimeout(() => {
            router.push(json.route);
          }, 2000);
        } else {
          toast.error(json.message);
          router.push("/get-started");
        }
      } catch (err) {
        toast.error(ERROR_MESSAGES.GOOGLE_LOGIN_FAILED);
        console.log(ERROR_MESSAGES.GOOGLE_LOGIN_FAILED, err);
        router.push("/get-started");
      }
    },
  });
  return googleAuth;
};

export default useGoogleAuth;
