import axios from "axios";
import { React, useState } from "react";

//Api call Search
const ApiCallData = async (apidata) => {
  let data = [];
  await axios
    .get(`https://get.scrapehero.com/news-api/news/?${apidata}`)
    .then((response) => {
      data = response.data.result.data;
    })
    .catch((error) => {
      alert(`error found ${error}`);
    });
  console.log(data, "aaaaaa");
  return data;
};
export default ApiCallData;

//Api call Category
