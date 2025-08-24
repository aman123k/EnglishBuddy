import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

interface PasswordInputProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
}

function PasswordInput({
  value = "",
  onChange,
  placeholder = "Password",
  label = "Password",
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  return (
    <div className=" flex flex-col gap-5 max-[650px]:gap-3.5">
      <label
        htmlFor="password"
        className=" text-base font-semibold text-[#282828] font-nunito-sans"
      >
        {label}
      </label>
      <div
        className=" flex items-center font-nunito-sans py-3.5 px-4 outline-none 
              border border-[#efefef] rounded-2xl"
      >
        <input
          id="password"
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          value={value}
          onChange={handleInputChange}
          className=" outline-none w-full placeholder:text-gray-300 placeholder:font-semibold mr-2"
        />
        {showPassword ? (
          <AiOutlineEyeInvisible
            className={`${
              value ? "text-[#282828]" : "text-[#c4c4c4]"
            } cursor-pointer  transition-colors`}
            size={24}
            onClick={() => setShowPassword(false)}
          />
        ) : (
          <AiOutlineEye
            className={`${
              value ? "text-[#282828]" : "text-[#c4c4c4]"
            } cursor-pointer transition-colors`}
            size={24}
            onClick={() => setShowPassword(true)}
          />
        )}
      </div>
    </div>
  );
}

export default PasswordInput;
