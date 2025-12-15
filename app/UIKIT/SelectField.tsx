type Option = {
  label: string;
  icon?: string;
};

interface SelectFieldProps {
  label: string;
  value?: string;
  options?: Option[];
  onChange: (value: string) => void;
}

const SelectField = ({
  label,
  value = "",
  options = [],
  onChange,
}: SelectFieldProps) => {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-base font-semibold text-[#282828] font-nunito-sans">
        {label}
      </label>

      <select
        className="w-full outline-none appearance-none border cursor-pointer
          border-[#E9EBF9] px-4 py-3 rounded-xl"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="" disabled>
          Select an option
        </option>

        {options.map((option) => (
          <option
            key={option.label}
            value={option.label}
            className="text-base font-semibold text-[#282828] font-nunito-sans"
          >
            {option.icon} {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectField;
