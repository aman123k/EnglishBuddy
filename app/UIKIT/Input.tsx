import React from "react";
interface inputProps {
  text: string;
  placeholder: string;
  htmlFor: string;
  value: string;
  setValue: (value: string) => void;
}

function Input({ text, placeholder, htmlFor, value, setValue }: inputProps) {
  return (
    <div className=" flex flex-col gap-5 max-[650px]:gap-3.5">
      <label
        htmlFor={htmlFor}
        className=" text-base font-semibold text-[#282828] font-nunito-sans"
      >
        {text}
      </label>
      <input
        type="text"
        id={htmlFor}
        value={value}
        onChange={(e) => setValue(e.currentTarget.value)}
        placeholder={placeholder}
        className="font-nunito-sans py-3.5 px-4 outline-none placeholder:text-gray-300 placeholder:font-semibold
              border border-[#efefef] rounded-2xl"
      />
    </div>
  );
}

export default Input;
