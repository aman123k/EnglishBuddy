"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";
import Input from "@/app/UIKIT/Input";
import Link from "next/link";
import usePostAPIRequest from "@/app/hooks/usePostAPIRequest";
import PasswordInput from "@/app/UIKIT/PasswordInput";

function ConfirmPassword() {
  const router = useRouter();
  const email = useSearchParams().get("email") || "";
  const [changePass, setChangePass] = useState({ otp: "", newPassword: "" });
  const changePassCondition = changePass.otp.trim() && changePass.newPassword;

  const { mutateAsync } = usePostAPIRequest();

  const handleOTPVerification = async () => {
    const path = "/api/verify-otp";
    const response = await mutateAsync({
      path,
      data: { email, ...changePass },
    });
    if (response?.status) {
      router.push("/login");
    }
  };
  const handleSentOTP = async () => {
    const path = "/api/forgot-password";
    const response = await mutateAsync({ path, data: { email } });
  };

  return (
    <section className=" bg-blue-900 h-[100dvh]  flex-col flex justify-center items-center py-10 max-[650px]:py-0">
      <Image
        src="/Images/logo-white.svg"
        alt="Logo"
        width={40}
        height={40}
        className=" absolute left-6 top-6"
      />
      <section
        className=" w-[700px] max-[650px]:w-[90%] max-[650px]:rounded-2xl max-[650px]:h-auto
             bg-[#fff] overflow-hidden px-10 py-9 max-[650px]:px-6 relative rounded-2xl  z-20 flex flex-col gap-5"
      >
        <section className=" flex flex-col gap-3.5 h-full overflow-auto no-scrollbar max-[650px]:gap-4">
          <header className=" flex gap-5 max-[650px]:gap-3.5 sticky top-0 bg-white ">
            <FaArrowLeft
              onClick={() => router.push("/login")}
              className=" mt-[15px] cursor-pointer text-lg font-normal flex-shrink-0"
            />

            <div className=" flex flex-col max-[650px]:gap-1.5 gap-2.5 ">
              <h1 className=" max-[650px]:text-xl text-[#282828] font-medium text-2xl nunito-sans">
                Check your email
              </h1>

              <p className=" text-base leading-[24px] max-[650px]:text-sm text-[#979797] nunito-sans tracking-[0.2px]">
                We just sent you a password reset code to your email address. If
                you did not receive it, please check your spam folder or click
                below.
              </p>
            </div>
          </header>
          <div className=" flex flex-col mt-5 gap-5">
            <Input
              text="Enter OTP here*"
              htmlFor="otp"
              placeholder="Enter OTP here"
              value={changePass.otp}
              setValue={(value) => {
                setChangePass((pre) => ({ ...pre, otp: value }));
              }}
            />
            <PasswordInput
              value={changePass.newPassword}
              onChange={(value) => {
                setChangePass((pre) => ({ ...pre, newPassword: value }));
              }}
              placeholder="New Password"
            />

            <button
              type="button"
              onClick={handleOTPVerification}
              disabled={!changePassCondition}
              className={`${
                changePassCondition
                  ? "cursor-pointer bg-[#193CB8] text-white"
                  : " bg-[#eeeeee] cursor-not-allowed text-[#bbbbbb]"
              } py-4 text-base font-medium rounded-2xl`}
            >
              Reset Password
            </button>
          </div>

          <div
            className={` text-center mt-5 flex justify-between text-[#c3c3c3] text-base font-medium font-nunito-sans`}
          >
            <button
              type="button"
              onClick={handleSentOTP}
              className="text-[#0136d5] underline cursor-pointer"
            >
              Resend OTP
            </button>

            <div>
              Not a member yet?{" "}
              <Link href="/survey">
                <span className="text-[#0136d5] underline">Sign up</span>
              </Link>
            </div>
          </div>
        </section>
      </section>
    </section>
  );
}

export default ConfirmPassword;
