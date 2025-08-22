"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { FaArrowLeft, FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

function Login() {
  const router = useRouter();

  return (
    <section className=" bg-blue-900 h-[100dvh]  flex-col flex justify-center items-center py-10 max-[650px]:py-0">
      <section
        className=" w-[700px] max-[650px]:w-[90%] max-[640px]:max-h-full max-[650px]:rounded-2xl
       bg-[#fff] overflow-hidden px-10 py-9 max-[650px]:px-6 relative rounded-2xl  z-20 flex flex-col gap-5"
      >
        <section className=" flex flex-col gap-6 h-full overflow-auto no-scrollbar max-[650px]:gap-4">
          <header className=" flex gap-5 max-[650px]:gap-3.5 sticky items-center top-0 bg-white ">
            <FaArrowLeft
              onClick={() => router.back()}
              className=" cursor-pointer text-lg font-normal flex-shrink-0"
            />

            <h1 className=" max-[650px]:text-xl text-[#282828] font-medium text-2xl nunito-sans">
              Login
            </h1>
          </header>
          <button
            className=" flex items-center gap-4 justify-center text-center w-full border
                border-[#bbbbbb] cursor-pointer py-3.5 px-3 rounded-xl hover:bg-[#ededfe] hover:border-[#dcddfc]"
          >
            <FcGoogle size={22} />

            <span className="text-base nunito-sans text-[#282828] font-medium ">
              Sign up with Google
            </span>
          </button>
          {/* Login with Github */}
          <button
            className=" flex items-center gap-4 justify-center text-center w-full border
                border-[#bbbbbb] cursor-pointer py-3.5 px-3 rounded-xl hover:bg-[#ededfe] hover:border-[#dcddfc]"
          >
            <FaGithub size={22} />

            <span className="text-base nunito-sans text-[#282828] font-medium ">
              Sign up with Github
            </span>
          </button>
          {/* Or option */}
          <div className=" flex items-center text-center w-full justify-center ">
            <span className=" h-[0.5px] bg-[#bbbbbb] w-[49%]"></span>
            <span className=" text-[#a5a2a2] text-sm font-medium nunito-sans py-1.5 px-2.5">
              Or
            </span>
            <span className=" h-[0.5px] bg-[#bbbbbb] w-[49%]"></span>
          </div>
        </section>
      </section>
    </section>
  );
}

export default Login;
