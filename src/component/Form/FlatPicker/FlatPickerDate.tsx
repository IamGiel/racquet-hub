import React, { useState } from "react";
import Flatpickr from "react-flatpickr";
// import "flatpickr/dist/themes/material_green.css";
import styles from "./FlatPickr.module.css";

import "flatpickr/dist/themes/airbnb.css";
import moment from "moment";

export const FlatPickerDate = ({ onDateSelect }: any) => {
  const [date, setDate] = useState(new Date());
  const maxDate = moment().add(14, "days").toDate(); // Calculate max date
  // Get the current hour and add 1 hour to it
  const minTime = new Date();
  minTime.setHours(minTime.getHours() + 1);

  return (
    <div>
      <label
        className={
          styles.flatPickrLabel +
          ` flatPickr-label block text-sm font-medium leading-6 text-gray-900`
        }
      >
        Select Date and Time
      </label>
      <Flatpickr
        data-enable-time
        value={date}
        onChange={([date]) => {
          console.log("date ", date);
          setDate(date);
          onDateSelect(date);
        }}
        className={styles.flatPcikr + ` flatPcikr-component`}
        options={{
          enableTime: true,
          dateFormat: "l, F J, Y at h:i K", // Custom date format
          minDate: "today", // Allow only days starting from today
          maxDate: maxDate, // Allow only days up to 14 days after today
          minTime: minTime.toLocaleTimeString("en-US", { hour12: false }), // Allow only times starting from 1 hour from the current hour
        }}
      />
    </div>
  );
};
