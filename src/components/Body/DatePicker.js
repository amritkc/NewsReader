import React from "react";
import "./Datepicker.css";
import { DateRangePickerComponent } from "@syncfusion/ej2-react-calendars";

const DatePicker = () => {
  const [startDate, setStartDate] = React.useState(null);

  return (
    <div>
      <div className="datepickerr">
        <DateRangePickerComponent
          onChange={(data) => {}}
          placeholder="Select a Date Range"
          format="yy-MM-dd"
          //   startDate={startDate}
        ></DateRangePickerComponent>
      </div>
    </div>
  );
};

export default DatePicker;
