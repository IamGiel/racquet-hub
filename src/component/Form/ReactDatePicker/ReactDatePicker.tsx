import React, { useState } from "react";
import DatePicker, { CalendarContainer } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./ReactDatePicker.css";

export const ReactDatePicker = ({ onDateSelect, prevValue = null }: any) => {
  const [startDate, setStartDate] = useState(null);
  const MyContainer = ({ className, children }: any) => {
    return (
      <div className={" some-date-picker-wrapper"}>
        <CalendarContainer className={className}>
          <div style={{ position: "relative" }}>{children}</div>
        </CalendarContainer>
      </div>
    );
  };

  // Calculate the max date as today + 14 days
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 14);
  return (
    <>
      <label
        className={
          "select-a-date block text-sm font-medium leading-6 text-gray-900 mb-[12px]"
        }
      >
        Select a date and time:
      </label>
      {/* <pre>{prevValue}</pre> */}
      <DatePicker
        selected={prevValue ? new Date(prevValue) : new Date()}
        onChange={(date: any) => {
          setStartDate(date);
          onDateSelect(date);
        }}
        minDate={startDate} // Set minimum date to today
        maxDate={maxDate} // Set maximum date to today + 14 days
        calendarContainer={MyContainer}
        wrapperClassName={!startDate ? "datePickerGrayed": "datePicker"}
        showTimeSelect
        dateFormat="EEE, MMM dd 'at'  p"
      />
    </>
  );
};
