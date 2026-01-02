"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import useAuthentication from "@/app/hooks/useAuth";
import Input from "@/app/UIKIT/Input";
import Link from "next/link";
import usePostAPIRequest from "@/app/hooks/usePostAPIRequest";
import Image from "next/image";

function ForgotPassword() {
  useAuthentication();
  const router = useRouter();
  const [email, setEmail] = useState("");

  // Validate email format
  const checkEmail = email
    .toLocaleLowerCase()
    .match(/^[a-zA-Z0-9._%+-]+@gmail\.com$/);
  // Hook for making POST API requests with loading states and error handling
  const { mutateAsync } = usePostAPIRequest();

  const handleSentOTP = async () => {
    const path = "/api/forgot-password";
    const response = await mutateAsync({ path, data: { email } });
    if (response?.status) {
      router.push(`/forgot-password/sent?email=${email}`);
    }
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
            <ArrowLeft
              onClick={() => router.push("/login")}
              className=" mt-[15px] cursor-pointer text-lg font-normal flex-shrink-0"
            />

            <div className=" flex flex-col max-[650px]:gap-1.5 gap-2.5 ">
              <h1 className=" max-[650px]:text-xl text-[#282828] font-medium text-2xl nunito-sans">
                Reset Password
              </h1>

              <p className=" text-base leading-[24px] max-[650px]:text-sm text-[#979797] nunito-sans tracking-[0.2px]">
                Enter your email address and we&apos;ll send you a one-time
                password (OTP) to reset your password.
              </p>
            </div>
          </header>
          <div className=" flex flex-col mt-5 gap-5">
            <Input
              text="Your email address"
              htmlFor="email"
              placeholder="Your email address"
              value={email}
              setValue={setEmail}
            />
            <button
              type="button"
              onClick={handleSentOTP}
              disabled={!checkEmail}
              className={`${
                checkEmail
                  ? "cursor-pointer bg-[#193CB8] text-white"
                  : " bg-[#eeeeee] cursor-not-allowed text-[#bbbbbb]"
              } py-4 text-base font-medium rounded-2xl`}
            >
              Send OTP
            </button>
          </div>

          <div
            className={` text-center mt-5 text-[#c3c3c3] text-base font-medium font-nunito-sans`}
          >
            Not a member yet?{" "}
            <Link href="/survey">
              <span className="text-[#0136d5] underline">Sign up</span>
            </Link>
          </div>
        </section>
      </section>
    </section>
  );
}

export default ForgotPassword;
