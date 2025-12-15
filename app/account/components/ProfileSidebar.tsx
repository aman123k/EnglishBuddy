import { useEffect, useMemo, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { useStore } from "@/app/store/store";
import useAuthentication from "@/app/hooks/useAuth";
import Input from "@/app/UIKIT/Input";
import { User } from "@/app/interface/interface";
import PasswordInput from "@/app/UIKIT/PasswordInput";
import { surveyData } from "@/app/(auth)/survey/data/surveyData";
import SelectField from "@/app/UIKIT/SelectField";

function ProfileSidebar() {
  // Access utility sidebar state and setter from the global store.
  const { accountSidebar, setAccountSidebar } = useStore();
  // Access user data from authentication hook.
  const { userData } = useAuthentication();
  const [userProfile, setUserProfile] = useState<User>(() => userData as User);
  const [updatePass, setUpdatePass] = useState("");

  useEffect(() => {
    if (userData) setUserProfile(userData);
  }, [userData]);

  const isProfile = accountSidebar?.title === "Profile";
  const isSettings = accountSidebar?.title === "Settings";

  const hasChanges = useMemo(() => {
    if (!userProfile || !userData) return false;

    if (isProfile) {
      return (
        userProfile.name !== userData.name ||
        userProfile.email !== userData.email ||
        Boolean(updatePass)
      );
    }

    if (isSettings) {
      return (
        userProfile.translationLanguage !== userData.translationLanguage ||
        userProfile.languageLevel !== userData.languageLevel ||
        userProfile.learningStyle !== userData.learningStyle
      );
    }

    return false;
  }, [userProfile, userData, updatePass, isProfile, isSettings]);

  if (!accountSidebar?.isOpen || !userProfile) return null;

  return (
    <>
      {/* Overlay to close the sidebar when clicked outside on smaller screens. */}
      <div
        className="max-[950px]:absolute max-[950px]:h-full max-[950px]:bg-[#282828] max-[950px]:left-0 max-[950px]:top-0 
    max-[950px]:opacity-55 max-[950px]:w-full"
        onClick={() => setAccountSidebar({ isOpen: false })}
      ></div>
      {/* Sidebar container with conditional styling for responsiveness. */}
      <div
        className={`max-[950px]:z-50 max-[950px]:absolute max-[950px]:bottom-0 max-[950px]:left-0 bg-white
          max-[950px]:w-full  max-[950px]:bg-[#E9EBF9] max-[950px]:rounded-t-2xl `}
      >
        <div
          className=" max-[950px]:rounded-2xl max-[950px]:mx-[20px] flex flex-col gap-4
        max-[950px]:px-6 max-[950px]:pb-6 max-[950px]:my-[34px] bg-white"
        >
          {/* Header section of the sidebar, displaying title and a close button. */}
          <header
            className="py-6 w-full border-b border-gray-200 font-nunito-sans  font-semibold text-xl flex items-center gap-2.5
           justify-between"
          >
            <h1>{accountSidebar?.title}</h1>

            <RxCross2
              className=" cursor-pointer text-2xl max-[950px]:hidden"
              onClick={() => setAccountSidebar({ isOpen: false })}
            />
          </header>

          {/* Update Profile */}
          {isProfile && (
            <section className=" flex flex-col gap-3.5">
              <Input
                text="Your Name"
                htmlFor="name"
                placeholder="Your Name"
                value={userProfile?.name ?? ""}
                setValue={(value) => {
                  setUserProfile((pre) => ({ ...pre, name: value ?? "" }));
                }}
              />
              <Input
                text="Your email address"
                htmlFor="email"
                placeholder="Your email address"
                value={userProfile?.email ?? ""}
                setValue={(value) => {
                  setUserProfile((pre) => ({ ...pre, email: value ?? "" }));
                }}
              />

              <PasswordInput
                label="Update Password"
                value={updatePass}
                onChange={setUpdatePass}
                placeholder="New Password"
              />
            </section>
          )}

          {isSettings && (
            <section className=" flex flex-col gap-3.5">
              {/* Translation Language */}
              <SelectField
                label="Choose translation language"
                value={userProfile.translationLanguage}
                options={surveyData[5]?.options}
                onChange={(translationLanguage) =>
                  setUserProfile((p) => ({ ...p!, translationLanguage }))
                }
              />
              {/* Language Level */}
              <SelectField
                label="Change your target language level"
                value={userProfile.languageLevel}
                options={surveyData[0]?.options}
                onChange={(languageLevel) =>
                  setUserProfile((p) => ({ ...p!, languageLevel }))
                }
              />
              {/* Learning Style */}
              <SelectField
                label="Change your target learning style"
                value={userProfile.learningStyle}
                options={surveyData[3]?.options}
                onChange={(learningStyle) =>
                  setUserProfile((p) => ({ ...p!, learningStyle }))
                }
              />
            </section>
          )}

          <button
            type="button"
            className={`${
              hasChanges
                ? "cursor-pointer bg-[#193CB8] text-white"
                : " bg-[#eeeeee] cursor-not-allowed text-[#bbbbbb]"
            } py-4 text-base font-medium rounded-2xl mt-5
             min-[950px]:w-[90%]  min-[950px]:left-[50%]  min-[950px]:translate-x-[-50%]  min-[950px]:absolute  min-[950px]:bottom-4`}
          >
            Save
          </button>
        </div>
      </div>
    </>
  );
}

export default ProfileSidebar;
