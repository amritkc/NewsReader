import axios from "axios";
import { React, useState } from "react";

const ApiCallSource = async () => {
  let data = [];
  await axios
    .get(
      "https://get.scrapehero.com/news-api/sources/?x-api-key=IHEwbeb7kN3f7I3Qizc1FqAJVexvcKUE"
    )
    .then((response) => {
      console.log(response.data.sources);
      data = response.data.sources;
    })
    .catch((error) => {
      console.log(`error found ${error}`);
    });
  console.log(data, "aaaaaa");
  return data;
};
export default ApiCallSource;
