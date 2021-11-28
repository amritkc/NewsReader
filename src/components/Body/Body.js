import { React, useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import DatePicker from "./DatePicker";
import axios from "axios";
import NewsArticle from "./NewsArticle";
import NewsDescription from "./NewsDescription";
import "./Body.css";
import { DateRangePickerComponent } from "@syncfusion/ej2-react-calendars";
import ApiCallData from "../../Api/Api";

export default function Body(props) {
  const [NewsData, setNewsData] = useState(props.beforeResult);
  const [detail, setDetail] = useState([]);
  const [focousnews, setFocusNews] = useState("");
  const [startdate, setStartDate] = useState(null);
  const [enddate, setEnddate] = useState(null);
  const [beforedata, setBeforeData] = useState(props.beforeResult);

  useEffect(async () => {
    if (props.textSearch != "") {
      textSearch();
    } else if (startdate != null) {
      DateSearch();
    } else if (
      props.category != "" ||
      props.sentiments != "" ||
      props.source != ""
    ) {
      AdvanceSearch();
    } else {
      setNewsData(
        await ApiCallData(`x-api-key=IHEwbeb7kN3f7I3Qizc1FqAJVexvcKUE`)
      );
      // console.log(NewsData, "asdasd");
    }
  }, [props.isChecked, enddate, props.advancechecker]);

  //search query
  const textSearch = async () => {
    let advance = [props.category, props.sentiments, props.source];
    // advance.map((data) =>{
    //   if(data)
    // })
    setNewsData(
      await ApiCallData(
        `q=${props.textSearch}&x-api-key=IHEwbeb7kN3f7I3Qizc1FqAJVexvcKUE`
      )
    );
  };

  const DateSearch = async () => {
    setNewsData(
      await ApiCallData(
        `&start_date=${startdate}&end_date=${enddate}&x-api-key=IHEwbeb7kN3f7I3Qizc1FqAJVexvcKUE`
      )
    );
    setStartDate(null);
  };

  const AdvanceSearch = async () => {
    if (props.category != "" && props.sentiments != "" && props.source != "") {
      let completedata = `sentiment=${props.sentiments}&source_id=${props.source}&category_id=${props.category}&x-api-key=IHEwbeb7kN3f7I3Qizc1FqAJVexvcKUE`;
      setNewsData(await ApiCallData(completedata));
    } else if (
      props.category == "" &&
      props.sentiments != "" &&
      props.source != ""
    ) {
      let completedata = `sentiment=${props.sentiments}&source_id=${props.source}&x-api-key=IHEwbeb7kN3f7I3Qizc1FqAJVexvcKUE`;
      setNewsData(await ApiCallData(completedata));
    } else if (
      props.category == "" &&
      props.sentiments == "" &&
      props.source != ""
    ) {
      let completedata = `source_id=${props.source}&x-api-key=IHEwbeb7kN3f7I3Qizc1FqAJVexvcKUE`;
      setNewsData(await ApiCallData(completedata));
    } else if (
      props.category != "" &&
      props.sentiments != "" &&
      props.source == ""
    ) {
      let completedata = `sentiment=${props.sentiments}&category_id=${props.category}&x-api-key=IHEwbeb7kN3f7I3Qizc1FqAJVexvcKUE`;
      setNewsData(await ApiCallData(completedata));
    } else if (
      props.category != "" &&
      props.sentiments == "" &&
      props.source == ""
    ) {
      let completedata = `category_id=${props.category}&x-api-key=IHEwbeb7kN3f7I3Qizc1FqAJVexvcKUE`;
      setNewsData(await ApiCallData(completedata));
    } else if (
      props.category == "" &&
      props.sentiments != "" &&
      props.source == ""
    ) {
      let completedata = `sentiment=${props.sentiments}&x-api-key=IHEwbeb7kN3f7I3Qizc1FqAJVexvcKUE`;
      setNewsData(await ApiCallData(completedata));
    } else if (
      props.category != "" &&
      props.sentiments == "" &&
      props.source != ""
    ) {
      let completedata = `source_id=${props.source}&category_id=${props.category}&x-api-key=IHEwbeb7kN3f7I3Qizc1FqAJVexvcKUE`;
      setNewsData(await ApiCallData(completedata));
    }
  };

  const newsFunction = (data) => {
    setDetail(data);
  };
  useEffect(() => {
    if (NewsData.length != 0) EmptyNewsDescription();
  }, [NewsData]);
  const EmptyNewsDescription = () => {
    if (detail.length == 0) {
      setDetail(NewsData[0]);
    }
  };
  function convert(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }
  // console.log(NewsData, "khadka");
  return (
    <Grid container>
      <Grid item xs={12} md={4}>
        <div className="gridNews">
          <div className="datepickerr">
            <DateRangePickerComponent
              onChange={(data) => {
                // console.log(data.value);
                if (data.value != null) {
                  setStartDate(convert(data.value[0]));
                  setEnddate(convert(data.value[1]));
                }
              }}
              placeholder="Select a Date Range"
              format="yy-MM-dd"
              //   startDate={startDate}
            ></DateRangePickerComponent>
          </div>
          <div>
            {NewsData.map((alldata) => (
              <div onClick={() => newsFunction(alldata)}>
                <NewsArticle data={alldata} />
              </div>
            ))}
          </div>
        </div>
      </Grid>
      <Grid item xs={12} md={8}>
        {detail.length == 0 ? <></> : <NewsDescription details={detail} />}
      </Grid>
    </Grid>
  );
}
