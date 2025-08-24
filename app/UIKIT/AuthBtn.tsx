import React from "react";

interface AuthBtnProps {
  authFunction: () => void;
  authIcon: React.ReactNode;
  authText: string;
}

function AuthBtn({ authFunction, authIcon, authText }: AuthBtnProps) {
  return (
    <button
      onClick={() => authFunction()}
      className=" flex items-center gap-4 justify-center text-center w-full border
                  border-[#bbbbbb] cursor-pointer py-3.5 px-3 rounded-xl hover:bg-[#ededfe] hover:border-[#dcddfc]"
    >
      {authIcon}

      <span className="text-base nunito-sans text-[#282828] font-medium ">
        {authText}
      </span>
    </button>
  );
}

export default AuthBtn;
