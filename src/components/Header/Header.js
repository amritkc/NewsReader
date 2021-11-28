import React, { useState } from "react";
import "./Header.css";
import InputBase from "@material-ui/core/InputBase";
import { alpha, makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import SendRoundedIcon from "@material-ui/icons/SendRounded";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
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
export default function Header() {
  const classes = useStyles();
  const [searchbar, setSearchBar] = useState("");

  return (
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
            <IconButton>
              <SendRoundedIcon />
            </IconButton>
          )}
        </div>
        <button className="btn_advance">Advance Search</button>
      </div>
      <div></div>
    </div>
  );
}
