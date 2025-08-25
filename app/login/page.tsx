"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FaArrowLeft, FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import useGoogleAuth from "../hooks/useGoogleAuth";
import AuthBtn from "../UIKIT/AuthBtn";
import Input from "../UIKIT/Input";
import PasswordInput from "../UIKIT/PasswordInput";
import Link from "next/link";
import usePostAPIRequest from "../hooks/usePostAPIRequest";
import { useStore } from "../store/store";

function Login() {
  const router = useRouter();
  const { surveyRes } = useStore();
  const [userInfo, setUserInfo] = useState({ email: "", password: "" });
  const loginCondition =
    userInfo.email.match(/^[a-zA-Z0-9._%+-]+@gmail\.com$/) &&
    userInfo.password.trim();

  // Hook for making POST API requests with loading states and error handling
  const { mutateAsync } = usePostAPIRequest();

  // Google auth
  const googleAuth = useGoogleAuth();

  // Handle user login form submission with validation
  const handleLogin = async () => {
    if (!loginCondition) {
      return;
    } else {
      const path = "/api/login";
      // Make API call to register user
      const response = await mutateAsync({ path, data: userInfo });
      if (response?.status) {
        router.push(response?.route);
      }
    }
  };

  // Github Auth
  const CLIENT_ID = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID;
  const githubLogin = (): void => {
    localStorage.setItem("surveyRes", JSON.stringify(surveyRes));
    window.location.assign(
      `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}`
    );
  };
  return (
    <section className=" bg-blue-900 h-[100dvh]  flex-col flex justify-center items-center py-10 max-[650px]:py-0">
      <section
        className=" w-[700px] max-[650px]:w-[90%] max-[650px]:rounded-2xl max-[650px]:h-[80dvh]
       bg-[#fff] overflow-hidden px-10 py-9 max-[650px]:px-6 relative rounded-2xl  z-20 flex flex-col gap-5"
      >
        <section className=" flex flex-col gap-3.5 h-full overflow-auto no-scrollbar max-[650px]:gap-4">
          <header className=" flex gap-5 max-[650px]:gap-3.5 sticky items-center top-0 bg-white mb-10 max-[650px]:mb-5">
            <FaArrowLeft
              onClick={() => router.back()}
              className=" cursor-pointer text-lg font-normal flex-shrink-0"
            />

            <h1 className=" max-[650px]:text-xl text-[#282828] font-medium text-2xl nunito-sans">
              Login
            </h1>
          </header>
          {/* Login with Google */}
          <AuthBtn
            authIcon={<FcGoogle size={22} />}
            authFunction={googleAuth}
            authText={"Sign up with Google"}
          />
          {/* Login with Github */}
          <AuthBtn
            authIcon={<FaGithub size={22} />}
            authFunction={githubLogin}
            authText={"Sign up with Github"}
          />

          {/* Or option */}
          <div className=" flex items-center text-center w-full justify-center ">
            <span className=" h-[0.5px] bg-[#bbbbbb] w-[49%]"></span>
            <span className=" text-[#a5a2a2] text-sm font-medium nunito-sans py-1.5 px-2.5">
              Or
            </span>
            <span className=" h-[0.5px] bg-[#bbbbbb] w-[49%]"></span>
          </div>
          {/* login form */}
          <div className=" flex flex-col gap-5">
            <Input
              text="Your email address*"
              htmlFor="email"
              placeholder="Your email address"
              value={userInfo.email}
              setValue={(value) => {
                setUserInfo((pre) => ({ ...pre, email: value }));
              }}
            />
            <PasswordInput
              value={userInfo.password}
              onChange={(value) => {
                setUserInfo((pre) => ({ ...pre, password: value }));
              }}
              placeholder="Enter your password"
            />
          </div>

          {/* bottom container */}
          <h6 className="font-nunito-sans font-medium text-base text-end underline text-[#0136d5] cursor-pointer mt-2 max-[650px]:mt-0">
            <Link href="/forgot-password">Forgot password?</Link>
          </h6>

          <button
            type="button"
            onClick={handleLogin}
            className={`${
              loginCondition
                ? "cursor-pointer bg-[#193CB8] text-white"
                : " bg-[#eeeeee] cursor-not-allowed text-[#bbbbbb]"
            } py-4 text-base font-medium rounded-2xl mt-5`}
          >
            Log in
          </button>

          <div
            className={` text-center mt-5 text-[#c3c3c3] text-base font-medium font-nunito-sans`}
          >
            Not a member yet?{" "}
            <Link href="/survey">
              <span className="text-[#0136d5] underline">Sign up</span>
            </Link>
          </div>

          <hr className="text-[#bbbbbb] mt-3 mb-1.5" />
          <p className=" text-xs text-[#bbbbbb] font-medium max-[650px]:text-[9px]">
            If your Google, Apple, or Facebook email is different from the one
            you entered, we’ll treat it as a new signup. By signing up, you
            agree to our Terms & Privacy Policy. We may send you tips and
            updates sometimes, and you can unsubscribe anytime.
          </p>
        </section>
      </section>
    </section>
  );
}

export default Login;
