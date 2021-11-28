import { React, useEffect, useState } from "react";
import "./NewsDescription.css";

export default function NewsDescription(props) {
  const [monthname, setmonth] = useState("");
  const [date, setdata] = useState(0);
  const [year, setyear] = useState(0);
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  useEffect(() => {
    let d = new Date(props.details.date);
    let monthsss = monthNames[d.getMonth()];
    setmonth(monthsss);
    setdata(d.getDate());
    setyear(d.getFullYear());
  }, [props]);
  return (
    <div className="NewsDescription">
      <h1>{props.details.title}</h1>
      <div className="News_div">
        <div className="newspub">
          <span className="spanid"></span>
          <h3>{props.details.publication}</h3>
        </div>
        <h3>
          {monthname}, {date} {year}
        </h3>
      </div>
      <hr className="hrapp" />
      <p>{props.details.content}</p>
    </div>
  );
}
