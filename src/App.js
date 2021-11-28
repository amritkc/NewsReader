import React, { useEffect, useState } from "react";
import "./App.css";
import InputBase from "@material-ui/core/InputBase";
import { alpha, makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import SendRoundedIcon from "@material-ui/icons/SendRounded";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Body from "./components/Body/Body";
import CloseIcon from "@material-ui/icons/Close";
import { Modal } from "@material-ui/core";
import AddFilter from "./components/Body/AddFilter";
import ApiCallCategory from "./Api/ApiCat";
import ApiCallSource from "./Api/ApiSource";
import ApiCallData from "./Api/Api";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },

  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: "#fbfbfb",
    "&:hover": {
      backgroundColor: "#fbfbfb",
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "20ch",
      height: "4ch",
      "&:focus": {
        width: "25ch",
      },
    },
  },
}));
function App() {
  const [value, setValue] = React.useState("");
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [formValues, setFormValues] = useState([{ category: "", data: "" }]);
  const [searchbar, setSearchBar] = useState("");
  const [check, setCheck] = useState(0);
  const [inputValue, setInputValue] = React.useState("");
  const [catData, setCatData] = useState([]);
  const [srcData, setsrcData] = useState([]);
  const [iptccode, setIptcCode] = useState([]);
  const [soutcecode, setSourceCode] = useState([]);
  const [sentiment, setSentiment] = useState([{ category: "", data: "" }]);
  const [resultfilter, setResultFilter] = useState([]);
  const [advancefil, setAdvance] = useState(0);
  const [categoryData, setCategorydata] = useState("");
  const [sentimentdata, setSentimentData] = useState("");
  const [sourcedata, setSourceData] = useState("");
  let FilterSearch = [
    { label: "Category" },
    { label: "Sentiment" },
    { label: "Source" },
  ];
  const povneg = [
    { label: "Positive" },
    { label: "Negative" },
    { label: "Neutral" },
  ];
  const PerformTextSearch = () => {
    if (check == 1) {
      setCheck(0);
    } else {
      setCheck(1);
    }
  };
  const isCheckedfalse = () => {
    setCheck(false);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handelOpen = () => {
    setOpen(true);
  };
  const addFilterButton = () => {
    setFormValues([...formValues, { category: "", data: "" }]);
  };
  let handleChange = (i, e, newInputValue) => {
    let newFormValues = [...formValues];
    newFormValues[i].category = newInputValue;
    setFormValues(newFormValues);
  };
  let handleChangeSentiment = (i, e, newInputValue) => {
    let newFormValues = [...sentiment];
    newFormValues[0].category = newInputValue;
    setSentiment(newFormValues);
  };
  useEffect(async () => {
    // let data = await ApiCallCategory();
    for (let index = 0; index < formValues.length; index++) {
      const element = formValues[index].category;
      switch (formValues[index].category) {
        case "Category":
          setCatData(await ApiCallCategory());
          // console.log(formValues);
          break;
        case "Sentiment":
          break;
        case "Source":
          setsrcData(await ApiCallSource());
          break;
        default:
          setCatData([]);
          break;
      }
    }
  }, [formValues]);

  const ApplyAdvanceFilter = async () => {
    let iptcode = "";
    iptccode.map((data) => {
      let datavalue = iptcode;
      if (datavalue == "") {
        iptcode = `${data.iptc_code}`;
      } else {
        iptcode = `${datavalue}%2C${data.iptc_code}`;
      }
    });
    let sentiments = sentiment[0].category;
    // console.log(soutcecode);
    let source = "";
    soutcecode.map((data) => {
      let datavaluesource = source;
      if (datavaluesource == "") {
        source = `${data.id}`;
      } else {
        source = `${datavaluesource}%2C${data.id}`;
      }
    });
    setCategorydata(iptcode);
    setSentimentData(sentiments);
    setSourceData(source);
    if (advancefil == 1) {
      setAdvance(0);
    } else {
      setAdvance(1);
    }
    handleClose();
  };

  return (
    <div className="App">
      <Modal
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropProps={{
          timeout: 500,
        }}
      >
        <div className="postdata">
          <div className="postdata__header">
            <h3>Advance Search</h3>
            <div>
              <IconButton onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </div>
          </div>
          <hr />
          <div>
            <button className="Addfilter" onClick={() => addFilterButton()}>
              Add New Filter
            </button>
          </div>
          {formValues.map((element, index) => (
            <>
              <br />
              <div className="FilterSearch">
                <Autocomplete
                  value={formValues[index].category}
                  inputValue={formValues[index].category}
                  onInputChange={(event, newInputValue) => {
                    handleChange(index, event, newInputValue);
                  }}
                  disablePortal
                  id="combo-box-demo"
                  options={FilterSearch}
                  sx={{ width: 250 }}
                  renderInput={(params) => (
                    <TextField {...params} label="Select Filter" />
                  )}
                />
                <h3>is </h3>
                {formValues[index].category == "Category" && (
                  <Autocomplete
                    multiple
                    onChange={(event, newValue) => {
                      setIptcCode(newValue);
                    }}
                    id="tags-outlined"
                    sx={{ width: 300 }}
                    options={catData}
                    getOptionLabel={(option) => option.category}
                    filterSelectedOptions
                    renderInput={(params) => (
                      <TextField {...params} label="" placeholder="" />
                    )}
                  />
                )}
                {formValues[index].category == "Sentiment" && (
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    onInputChange={(event, newInputValue) => {
                      handleChangeSentiment(index, event, newInputValue);
                    }}
                    options={povneg}
                    sx={{ width: 250 }}
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
                )}
                {formValues[index].category == "Source" && (
                  <Autocomplete
                    multiple
                    id="tags-outlined"
                    sx={{ width: 300 }}
                    options={srcData}
                    getOptionLabel={(option) => option.name}
                    onChange={(event, newValue) => {
                      setSourceCode(newValue);
                    }}
                    filterSelectedOptions
                    renderInput={(params) => (
                      <TextField {...params} label="" placeholder="" />
                    )}
                  />
                )}
              </div>
            </>
          ))}
          <div className="showResultData">
            <div></div>
            <div className="showResultData_end">
              <button
                className="showResultData_cancel"
                onClick={() => handleClose()}
              >
                Cancel
              </button>
              <button
                className="showResultData_result"
                onClick={() => ApplyAdvanceFilter()}
              >
                Show Result
              </button>
            </div>
          </div>
        </div>
      </Modal>
      <div className="header">
        <div>
          <h2>
            <span style={{ color: "#2D68E4" }}>News</span>Header
          </h2>
        </div>
        <div className="header_search">
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              onChange={(data) => {
                setSearchBar(data.target.value);
              }}
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            />
            {searchbar === "" ? (
              <></>
            ) : (
              <IconButton onClick={() => PerformTextSearch()}>
                <SendRoundedIcon />
              </IconButton>
            )}
          </div>
          <button className="btn_advance" onClick={handelOpen}>
            Advance Search
          </button>
        </div>
        <div></div>
      </div>
      <Body
        beforeResult={resultfilter}
        textSearch={searchbar}
        isChecked={check}
        advancechecker={advancefil}
        sentiments={sentimentdata}
        category={categoryData}
        source={sourcedata}
        isCheckedfalse={isCheckedfalse}
      />
    </div>
  );
}

export default App;
