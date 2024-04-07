import React from 'react'

interface InputTextProps {
  type: string;
  label: string;
  placeholder?: string;
}

export const InputText: React.FC<InputTextProps> = ({ type, label, placeholder }) => {
  return (
    <div>
      <label htmlFor={type} className="block text-sm font-medium leading-6 text-gray-900">
        {label}
      </label>
      <div className="mt-2">
        <input
          type={type}
          name={type}
          id={`${type}-${label}`}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder={placeholder}
        />
      </div>
    </div>
  )
}
