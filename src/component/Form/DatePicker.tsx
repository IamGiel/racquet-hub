import React, { useEffect, useState } from "react";
import {
  DatePickerProvider,
  DatePickerStateProvider,
  useDatePickerContext,
} from "@rehookify/datepicker";
import { Years } from "./Date/Years";
import { Months } from "./Date/Months";
import { Calendar } from "./Date/Calendar";
import moment from "moment";

function Root() {
  const {
    data: { calendars, formattedDates },
    propGetters: { addOffset, subtractOffset },
  } = useDatePickerContext();

  // const formattedMoment = moment(formattedDates[0], "DD/MM/YYYY");

  return (
    <div className="block p-4 border border-slate-300 rounded shadow-xs shadow shadow-slate-300">
      {/* {formattedDates[0] && <h1 className="text-2xl w-full text-center mb-6">{formattedMoment.format("MMM Do YYYY")}</h1>} */}
      <main className="grid grid-cols-1 gap-x-6 gap-y-6">
        <Calendar
          prevButton={
            <button
              type="button"
              className="w-8"
              {...subtractOffset({ months: 1 })}
            >
              {" < "}
            </button>
          }
          calendar={calendars[1]}
          nextButton={
            <button type="button" className="w-8" {...addOffset({ months: 1 })}>
              {" > "}
            </button>
          }
        />

        {/* <Months /> */}
        {/* <Years /> */}
      </main>
    </div>
  );
}

export const DatePicker = ({ id, onSelectDate }: any) => {
  const [selectedDates, onDatesChange] = useState<Date[]>([]);

  const handleDatesChange = (newDates: Date[]) => {
    // Update the state with the new dates
    onDatesChange(newDates);
    onSelectDate(newDates);
  };

  // Get the current date and two weeks ahead
  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setDate(minDate.getDate() + 14);

  return (
    <DatePickerProvider
      config={{
        selectedDates,
        onDatesChange: handleDatesChange,
        dates: {
          mode: "single",
          toggle: true,
          maxDate,
          minDate,
        },
        calendar: {
          offsets: [0],
        },
      }}
    >
      <Root />
    </DatePickerProvider>
  );
};
