import React, { useRef, useState } from "react";
import styles from "./InputDropdownFilter.module.css";

interface Option {
  value: string;
  label: string;
}

interface InputDropdownFilterProps {
  label?: string;
  placeholder?: string;
  listProp?: string[];
  setState: (val: any) => void;
  state: any;
}

export const InputDropdownFilter: React.FC<InputDropdownFilterProps> = ({
  label = "Add a label",
  placeholder = "Add place holder",
  listProp = ["list 1", "list 2"],
  setState = (val: any) => val,
  state = "",
}) => {
  const [value, setValue] = useState(state);
  const [showDropdown, setShowDropdown] = useState(false);
  const timeout: any = useRef(null);

  const handleChange = (event: any) => {
    setValue(event.target.value);
    const inputValue = event.target.value;
    console.log("input value length ", inputValue);
    setShowDropdown(!!inputValue?.length);
    setState(inputValue);
    // setState(inputValue);
  };

  const handleBlur = () => {
    // Delay hiding the dropdown to allow selection from dropdown
    timeout.current = setTimeout(() => {
      setShowDropdown(false);
    }, 100);
  };

  // Function to handle selection from suggestions
  const handleSelectSuggestion = (suggestion: any) => {
    console.log("suggestion ", suggestion);
    setState(suggestion);
    setShowDropdown(false); // Hide dropdown on selection
  };

  return (
    <div className={styles.form_fields_text_input + " form_fields_text_input"}>
      <label className={styles.inputLabel + " inputLabel"}>{label}</label>
      <div className={styles.inputWrapper + " inputWrapper"}>
        <input
          type="text"
          className={styles.inputStyle + " inputStyle "}
          value={state.name}
          onChange={handleChange}
          onFocus={() => {
            console.log("onfocus ", showDropdown ? "true" : "false");
            setShowDropdown(true);
          }}
          // onKeyUp={handleInputChange}
          // onPaste={handleInputChange}
          onBlur={handleBlur}
          placeholder={placeholder}
        />
        <svg
          className={styles.svgContainer + " svgContainer"}
          width={25}
          height={24}
          viewBox="0 0 25 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M6.85147 8.75186C7.3201 8.28323 8.0799 8.28323 8.54853 8.75186L12.5 12.7033L16.4515 8.75186C16.9201 8.28323 17.6799 8.28323 18.1485 8.75186C18.6172 9.22049 18.6172 9.98029 18.1485 10.4489L13.3485 15.2489C12.8799 15.7175 12.1201 15.7175 11.6515 15.2489L6.85147 10.4489C6.38284 9.98029 6.38284 9.22049 6.85147 8.75186Z"
            fill="#656B7C"
          />
        </svg>
      </div>

      {showDropdown && listProp.length > 0 && (
        <div className="relative">
          <div
            className={
              styles.suggestionListContainer + " suggestionListContainer"
            }
            style={{ maxHeight: "400px", overflowY: "auto" }}
          >
            {listProp.map((suggestion: any, index) => (
              <button
                key={index}
                className={styles.suggestionItems + " suggestionItems"}
                tabIndex={0}
                onBlur={handleBlur}
                onClick={() => handleSelectSuggestion(suggestion)}
                onFocus={() => {
                  setShowDropdown(true);
                  if (timeout.current) {
                    clearTimeout(timeout.current);
                    timeout.current = null;
                  }
                }}
              >
                {suggestion?.name ?? "suggestion name"}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
