"use client";
import useGoogleAuth from "@/app/hooks/useGoogleAuth";
import AuthBtn from "@/app/UIKIT/AuthBtn";
import Input from "@/app/UIKIT/Input";
import PasswordInput from "@/app/UIKIT/PasswordInput";
import Link from "next/link";
import React, { useState } from "react";
import { FaArrowLeft, FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { LuMail } from "react-icons/lu";

function SingUp({
  setCurrentStep,
  setShowRegister,
}: {
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  setShowRegister: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [isRegisterWithEmail, setIsRegisterWithEmail] = useState(false);

  const handleBack = () => {
    if (isRegisterWithEmail) {
      setIsRegisterWithEmail(false);
    } else {
      setCurrentStep((prev: number) => prev - 1);
      setShowRegister(false);
    }
  };
  // Google auth
  const googleAuth = useGoogleAuth();

  return (
    <section className=" flex flex-col gap-6 h-full overflow-auto no-scrollbar max-[650px]:gap-4">
      <header className=" flex gap-5 max-[650px]:gap-3.5 sticky top-0 bg-white ">
        <FaArrowLeft
          onClick={handleBack}
          className=" mt-[15px] cursor-pointer text-lg font-normal flex-shrink-0"
        />

        <div className=" flex flex-col max-[650px]:gap-1.5 gap-2.5 ">
          <h1 className=" max-[650px]:text-xl text-[#282828] font-medium text-2xl nunito-sans">
            Almost there!
          </h1>

          <p className=" text-base leading-[24px] max-[650px]:text-sm text-[#979797] nunito-sans tracking-[0.2px]">
            Just a bit more info to set up your Talkpal account.
          </p>
        </div>
      </header>
      {!isRegisterWithEmail && (
        <div className="flex flex-col gap-6">
          <div className=" flex flex-col gap-4 pb-20 max-[650px]:pb-10">
            {/* Login with Google */}
            <AuthBtn
              authIcon={<FcGoogle size={22} />}
              authFunction={googleAuth}
              authText={"Sign up with Google"}
            />
            {/* Login with Github */}
            <AuthBtn
              authIcon={<FaGithub size={22} />}
              authFunction={googleAuth}
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
            {/* Login with email  */}
            <button
              type="button"
              onClick={() => setIsRegisterWithEmail(true)}
              className=" flex items-center gap-4 justify-center text-center w-full border
        border-[#bbbbbb] cursor-pointer py-3.5 px-3 rounded-xl hover:bg-[#ededfe] hover:border-[#dcddfc]"
            >
              <LuMail size={22} />

              <span className="text-base nunito-sans text-[#282828] font-medium ">
                Sign up with Email
              </span>
            </button>
          </div>
          {/* already have an account  */}
          <div className="text-center text-base nunito-sans font-medium">
            <span className=" text-[#bbbbbb]"> Already a member? </span>
            <Link href="/login" className=" text-blue-800 underline">
              Log in
            </Link>
          </div>
          <hr className="text-[#bbbbbb]" />
          <p className=" text-sm text-[#bbbbbb] font-medium max-[650px]:text-[9px]">
            By signing up, you accept our Terms and Conditions and Privacy
            Policy. Occasionally, we’ll send you our newsletters, with learning
            tips and special offers.
          </p>
        </div>
      )}
      {isRegisterWithEmail && (
        <div className=" flex flex-col gap-5">
          <Input
            text="Full name*"
            htmlFor="email"
            placeholder="Full name"
            value={""}
            setValue={() => {}}
          />
          <Input
            text="Your email address*"
            htmlFor="email"
            placeholder="Your email address"
            value={""}
            setValue={() => {}}
          />
          <PasswordInput
            value={""}
            onChange={() => {}}
            placeholder="Enter your password"
          />
          <hr className="text-[#bbbbbb] mt-3 mb-1.5" />
          <p className=" text-sm text-[#bbbbbb] font-medium max-[650px]:text-[9px]">
            By signing up, you agree to our terms and privacy policy. We might
            send you helpful tips or updates, and you can unsubscribe whenever
            you like.
          </p>
          <button
            onClick={() => {}}
            className=" bg-blue-800 py-4 font-nunito-sans text-white tracking-wide 
                  rounded-2xl font-medium text-base cursor-pointer hover:bg-blue-900 duration-150 w-full capitalize"
          >
            Continue
          </button>

          <hr className="text-[#bbbbbb]" />
          <div
            className={` text-center text-[#c3c3c3] text-base font-medium font-nunito-sans`}
          >
            Already a member?{" "}
            <Link href="/login">
              <span className="text-[#0136d5] underline">Log in</span>
            </Link>
          </div>
        </div>
      )}
    </section>
  );
}

export default SingUp;
