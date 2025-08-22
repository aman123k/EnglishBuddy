import React from "react";
import Image from "next/image";
import SwiperSlider from "./component/SwiperSlide";
import Link from "next/link";

function GetStarted() {
  return (
    <section className=" bg-blue-900 h-[100dvh]  flex-col flex justify-center items-center py-10 max-[650px]:py-0">
      <section
        className=" w-[700px] max-[650px]:w-full max-[640px]:max-h-full max-[650px]:rounded-none
       bg-[#fff] overflow-hidden relative rounded-4xl  z-20 "
      >
        <div className="px-8 overflow-scroll w-full h-full max-[650px]:px-4">
          <div className=" w-full  h-[300px] absolute top-0 left-0 -z-10">
            <Image
              src="/Images/getStarted.webp"
              alt="getStarted"
              width={800}
              height={200}
            />
          </div>

          <SwiperSlider />

          <div className="flex  flex-col gap-3.5 mt-8">
            <Link href={"/survey"}>
              <button
                type="button"
                className="font-nunito-sans bg-blue-800 py-4 text-sm tracking-wide font-medium cursor-pointer
           rounded-2xl text-white w-full capitalize"
              >
                Get Started
              </button>
            </Link>
            <Link href="/login">
              <button
                type="button"
                className="
              bg-[#eaebf9] text-blue-800 py-4 font-nunito-sans 
          rounded-2xl font-medium text-sm cursor-pointer hover:bg-[#dbddfa] duration-150 w-full capitalize"
              >
                Log in
              </button>
            </Link>
          </div>
          <div className=" border-t border-gray-200 mt-4 text-center py-4 text-gray-500 tracking-wide">
            @Hello
          </div>
        </div>
      </section>
    </section>
  );
}

export default GetStarted;
