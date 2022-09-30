import React from "react";
import "./styles.css";
import Sidebar from "../../components/Sidebar";

const Search = (props) => {
  return (
    <div className="search">
      Search: {props.search}
      <Sidebar />
    </div>
  );
};

export default Search;
