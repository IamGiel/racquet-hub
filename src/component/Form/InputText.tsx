import React from "react";

interface InputTextProps {
  id: string;
  type: string;
  label: string;
  placeholder?: string;
  onChange: (term: string) => void;
}

export const InputText: React.FC<InputTextProps> = ({
  id,
  type,
  label,
  placeholder,
  onChange,
}) => {
  return (
    <div>
      <label
        htmlFor={type}
        className="block text-sm font-medium leading-6 text-['#181818']"
      >
        {label}
      </label>
      <div className="mt-2">
        <input
          id={id}
          autoComplete="off"
          type={type}
          name={type}
          className="block w-full rounded-md border-0 py-1.5 text-['#181818'] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-[14px] text-['#181818'] font-['Inter']" 
          style={{ color: "#181818", padding:'10px 12px', borderRadius:'6px' }}
          placeholder={placeholder}
          onChange={(event) => {
            console.log("event on input change ", event);
            onChange(event?.target?.value);
          }}
          
        />
      </div>
    </div>
  );
};
