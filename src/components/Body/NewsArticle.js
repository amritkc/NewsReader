import { setDate } from "date-fns";
import React, { useEffect } from "react";
import "./NewsArticle.css";
export default function NewsArticle(props) {
  let { propsData } = props;
  const [monthname, setmonth] = React.useState("");
  const [date, setdata] = React.useState(0);
  const [year, setyear] = React.useState(0);
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
    var d = new Date(props.data.date);
    let monthsss = monthNames[d.getMonth()];
    setmonth(monthsss);
    setdata(d.getDate());
    setyear(d.getFullYear());
  }, [props]);
  // console.log(props.data.sentiment);
  return (
    <div className="newsarticle">
      <h4>
        {monthname}, {date} {year}
      </h4>
      <h2>{props.data.title} </h2>
      <div className="news_info">
        {props.data.sentiment === "Positive" && <span className="pov"></span>}
        {props.data.sentiment === "Negative" && <span className="neg"></span>}
        {props.data.sentiment === "Neutral" && <span className="neu"></span>}
        <h3>{props.data.publication}</h3>
      </div>
      <hr className="hrr"></hr>
    </div>
  );
}
