import { FC, ReactNode } from "react";
import { DPCalendar, useDatePickerContext } from "@rehookify/datepicker";

import { SectionHeader } from "./SectionHeader";
import { Section } from "./Sections";
import { Button } from "./Button";
import { getDayClassName } from "./ClassNameUtils";

interface CalendarProps {
  prevButton?: ReactNode;
  nextButton?: ReactNode;
  calendar: DPCalendar;
}

export const Calendar: FC<CalendarProps> = ({
  prevButton,
  nextButton,
  calendar,
}) => {
  const {
    data: { weekDays },
    propGetters: { dayButton },
  } = useDatePickerContext();
  const { days, month } = calendar;
  const handleDay = (d:any) => {
    console.log("this is d ", d.day);
  }
  return (
    <Section>
      <SectionHeader>
        {prevButton || <div />}
        <p className="text-center text-sm">{month}</p>
        {nextButton || <div />}
      </SectionHeader>
      <div className="grid grid-cols-7 gap-y-2 mb-2 items-center h-8">
        {weekDays.map((d, dId) => (
          <p key={dId} className="text-xs text-center">{d}</p>
        ))}
      </div>
      <main className="grid grid-cols-7 gap-y-2">
        {days.map((d, dId) => (
          <div className="day-cotainer" key={dId}>
            <button
            type="button"
            key={d.$date.toString() + ` ${dId}`}
            className={getDayClassName("w-8 text-xs", d)}
            onClick={handleDay}
            {...dayButton(d)}
          >
            {d.day}
          </button>
          <div key={dId}>{""}</div>
          </div>
        ))}
      </main>
    </Section>
  );
};
