import React from "react";

interface IInputSelection {
  type?: string;
  label: string;
  placeholder?: string;
  selections?: any[];
}

export const InputSelection: React.FC<IInputSelection> = ({
  type,
  label,
  placeholder,
  selections
}) => {
  return (
    <div>
      <label
        htmlFor={type}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label}
      </label>
      <div className="mt-2">
        <select
          name={type}
          id={`${type}-${label}`}
          className="block w-full rounded-md border-0 py-[12px] text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          style={{ display: 'flex', gap: '12px' }}
        >
          {selections?.map((item, itemId) => (
            <option
              key={itemId}
              className={`option-name-${item?.name}`}
              style={{ padding: '12px' }} // Add padding to options
            >
              {item?.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
