import Image from "next/image";
import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { personalizePlan } from "../data/surveyData";

function PersonalizedPlan({
  setCurrentStep,
  setShowPlan,
}: {
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  setShowPlan: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <section className=" flex flex-col gap-6 max-[650px]:pb-16 pb-28 h-full overflow-auto no-scrollbar">
      <header className=" flex gap-5 max-[650px]:gap-2.5 sticky top-[-1px] bg-white">
        <FaArrowLeft
          onClick={() => {
            setCurrentStep((prev: number) => (prev === 7 ? 7 : prev - 1));
            setShowPlan(false);
          }}
          className=" mt-[15px] cursor-pointer text-lg font-normal flex-shrink-0"
        />

        <div className=" flex flex-col max-[650px]:gap-1.5 gap-3.5 ">
          <h1 className=" max-[650px]:text-xl text-[#282828] font-medium text-2xl nunito-sans">
            Your personalized plan is ready!
          </h1>

          <p className=" text-base leading-[24px] max-[650px]:text-sm text-[#979797] nunito-sans tracking-[0.2px]">
            Based on your answers, we have the following AI-modes ready for you:
          </p>
        </div>
      </header>

      <div className=" bg-[#f5f5fb] rounded-2xl px-5">
        {personalizePlan?.map((plan) => {
          return (
            <div
              key={plan.id}
              className={`flex items-center gap-6 max-[650px]:gap-4 py-5 border-[#9e9e9e] ${
                plan.id > 1 ? " border-t border-dashed " : ""
              }`}
            >
              <Image
                src={plan.img}
                alt=""
                width={40}
                height={40}
                className="rounded-full"
              />
              <div className=" flex flex-col gap-0.5">
                <h2 className="text-[#282828] font-medium text-base nunito-sans">
                  {plan.title}
                </h2>
                <p className="text-xs font-medium text-[#8f8e8e] nunito-sans">
                  {plan.subText}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default PersonalizedPlan;
