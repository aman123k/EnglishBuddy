"use client";
import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { fieldRecord, surveyData } from "./data/surveyData";
import { useRouter } from "next/navigation";
import { SurveyResponses } from "../interface/interface";
import LoaderDialog from "./components/LoaderDialog";
import PersonalizedPlan from "./components/PersonalizedPlan";
import SingUp from "./components/SingUp";
import { useStore } from "../store/store";
import usePostSurvey from "./hooks/usePostSurvey";
import useAuthentication from "../hooks/useAuth";
import { GET_USER_INFORMATION } from "../queryKeys/allQueryKeys";

function Survey() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const calculateWidth = () => {
    return ((currentStep - 1) / (surveyData.length - 1)) * 100;
  };
  const [showRegister, setShowRegister] = useState<boolean>(false);
  const [isLoadingSurvey, setIsLoadingSurvey] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState("");
  const [showPlan, setShowPlan] = useState(false);
  const { surveyRes, setSurveyRes } = useStore();

  const { userData } = useAuthentication();
  const { mutate: postSurvey } = usePostSurvey(
    GET_USER_INFORMATION("/api/userInformation")
  );

  const fieldName: string = fieldRecord[currentStep];
  const fieldValue = surveyRes[fieldName as keyof SurveyResponses];

  // Handles going back in the multi-step form
  const handleBack = () => {
    if (!userData && currentStep === 1) {
      router.push("/login");
    } else if (currentStep === 1) {
      router.back();
    } else {
      setCurrentStep((pre) => pre - 1);
    }
  };

  /**
   * Handles navigation to the next step in the survey
   * Manages survey state, progress, and user flow
   */
  const handleNext = (stepId: number, value: string) => {
    // Get the field name for the current step
    const fieldName = fieldRecord[stepId];

    // Save the current step's answer in survey state
    setSurveyRes({ [fieldName]: value });

    // Check if we're on the second-to-last step and plan hasn't been shown yet
    if (currentStep === surveyData.length - 2 && !showPlan) {
      // Show loading state and then display personalized plan
      setIsLoadingSurvey(true);
      setTimeout(() => {
        setIsLoadingSurvey(false);
        setShowPlan(true);
      }, 3000);
    } else {
      // Handle survey completion for existing users
      if (userData && !userData.isSurveyComplete && showPlan) {
        return postSurvey(surveyRes);
      }

      // Move to next step
      setCurrentStep((prev) => prev + 1);

      // Clear search value if on language selection step
      if (stepId === 6) setSearchValue("");

      // Show registration screen if plan is already displayed
      if (showPlan) setShowRegister(true);
    }
  };

  return (
    <section className=" bg-blue-900 h-[100dvh]  flex-col flex justify-center items-center py-10 max-[650px]:py-0">
      <section
        className=" w-[700px] max-[650px]:w-[90%] max-[650px]:rounded-2xl max-[650px]:max-h-[80dvh]
       bg-[#fff] overflow-hidden px-10 py-9 max-[650px]:px-6 relative rounded-2xl  z-20 flex flex-col gap-5"
      >
        {/* Progressbar  */}
        {!isLoadingSurvey && (
          <section className="">
            <div className="w-full h-[8px] overflow-hidden rounded-full bg-[#abb1e9]">
              <div
                className=" bg-[#2e3bc6]"
                style={{
                  height: "100%",
                  transition: ".5s ease",
                  width: `${calculateWidth()}%`,
                }}
              ></div>
            </div>
          </section>
        )}
        {/* Survey forms */}
        {!isLoadingSurvey &&
          !showPlan &&
          surveyData.map((survey) => {
            if (currentStep === survey.id) {
              return (
                <div
                  key={survey.id}
                  className={`flex  flex-col gap-5 max-[650px]:gap-4 max-[650px]:pb-16 pb-32 h-full max-h-[80dvh] overflow-auto no-scrollbar`}
                >
                  <header className="flex flex-col gap-5 sticky top-0 bg-white">
                    <div className=" flex gap-5 max-[650px]:gap-3.5 ">
                      <FaArrowLeft
                        onClick={handleBack}
                        className=" mt-[15px] cursor-pointer text-lg font-normal flex-shrink-0"
                      />

                      <div className=" flex flex-col max-[650px]:gap-1.5 gap-2.5 ">
                        <h1 className=" max-[650px]:text-xl text-[#282828] font-medium text-2xl nunito-sans">
                          {survey.title}
                        </h1>
                        {survey.subText && (
                          <p className=" text-base leading-[24px] max-[650px]:text-sm text-[#979797] nunito-sans tracking-[0.2px]">
                            {survey.subText}
                          </p>
                        )}
                      </div>
                    </div>
                    {survey.id === 6 && (
                      <input
                        type="text"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        placeholder="Search language..."
                        className="font-nunito-sans border-[#e8e8e8] border max-[650px]:p-3 rounded-2xl p-3.5 outline-none"
                      />
                    )}
                  </header>

                  <div className=" flex flex-col gap-3.5">
                    {survey.options
                      .filter((opt) =>
                        survey.id === 6
                          ? opt.label
                              .toLowerCase()
                              .includes(searchValue.toLowerCase())
                          : true
                      )
                      .map((opt) => {
                        return (
                          <h2
                            onClick={() => handleNext(survey.id, opt.label)}
                            key={opt.label}
                            className={` font-nunito-sans max-[650px]:text-sm max-[650px]:p-3 gap-3 flex items-center
                         hover:bg-[#dbddfa] cursor-pointer font-medium  border rounded-2xl p-3.5 
                         ${
                           opt.label === fieldValue
                             ? "border-blue-600 text-blue-900"
                             : " border-[#e8e8e8] text-[#282828]"
                         }`}
                          >
                            <span>{opt.icon}</span>
                            <span>{opt.label}</span>
                          </h2>
                        );
                      })}
                  </div>
                </div>
              );
            } else {
              return "";
            }
          })}
        {/* loading state for last form */}
        {isLoadingSurvey && <LoaderDialog />}

        {/* user personal plan */}
        {showPlan && !showRegister && (
          <PersonalizedPlan
            setCurrentStep={setCurrentStep}
            setShowPlan={setShowPlan}
          />
        )}
        {showRegister && (
          <SingUp
            setCurrentStep={setCurrentStep}
            setShowRegister={setShowRegister}
          />
        )}
        {/* continue button */}
        {!isLoadingSurvey && !showRegister && (
          <button
            onClick={() => {
              const valueToUse =
                fieldValue !== ""
                  ? fieldValue
                  : surveyData[currentStep - 1].options[0]?.label;
              handleNext(currentStep, valueToUse);
            }}
            className=" bg-blue-800 py-4 font-nunito-sans text-white tracking-wide 
          rounded-2xl font-medium text-base cursor-pointer hover:bg-blue-900 duration-150 w-full capitalize"
          >
            {userData && !userData.isSurveyComplete && showPlan
              ? "Submit"
              : "Continue"}
          </button>
        )}
      </section>
    </section>
  );
}

export default Survey;
