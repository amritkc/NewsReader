import React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { set } from "date-fns";

function AddFilter() {
  const [inputValue, setInputValue] = React.useState("");
  const FilterSearch = [
    { label: "Category" },
    { label: "Sentiment" },
    { label: "Source" },
  ];
  return (
    <>
      <br />
      <Autocomplete
        value={inputValue}
        // onChange={(event) => {
        //   console.log(event.target);
        //   setValue(event.target.value);
        // }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        disablePortal
        id="combo-box-demo"
        options={FilterSearch}
        sx={{ width: 300 }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Select Filter"
            onChange={(data) => {
              console.log(data.target.value);
            }}
          />
        )}
      />
    </>
  );
}

export default AddFilter;
