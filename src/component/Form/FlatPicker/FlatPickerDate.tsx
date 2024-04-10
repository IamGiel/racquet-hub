import React, { useState } from 'react'
import Flatpickr from "react-flatpickr";
// import "flatpickr/dist/themes/material_green.css";
import styles from './FlatPickr.module.css';

import "flatpickr/dist/themes/airbnb.css";
import moment from 'moment';

export const FlatPickerDate = ({onDateSelect}:any) => {

  const [date, setDate] = useState(new Date())
  const maxDate = moment().add(15, 'days').toDate(); // Calculate max date

  return (
    <div>
      <label className={styles.flatPickrLabel + ` flatPickr-label block text-sm font-medium leading-6 text-gray-900`}>Select Date and Time</label>
      <Flatpickr
        data-enable-time
        value={date}
        onChange={([date]) => {
          console.log('date ', date)
          setDate(date)
          onDateSelect(date)
        }}
        className={styles.flatPcikr + ` flatPcikr-component`}
        options={{
          enableTime: true,
          dateFormat: "l, F J, Y at h:i K", // Custom date format
          time_24hr: false, // 12-hour time format
          maxDate: maxDate,
        }}
      />
    </div>
  )
}
