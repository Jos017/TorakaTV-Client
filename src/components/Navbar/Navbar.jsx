import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import * as PATHS from "../../utils/paths";
import * as CONSTS from "../../utils/consts";
import logo from "../../images/logo.png";
import profileDefault from "../../images/profile-default.png";
import SearchBar from "../SearchBar";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";

const Navbar = (props) => {
  return (
    <nav>
      <Link to={"/"} className="nav__projectName">
        <div className="logo-image">
          <img src={logo} alt="Logo" />
        </div>
        <h2>TorakaTV</h2>
      </Link>
      <SearchBar />
      <div className="nav__authLinks">
        {/** Menu shown when a user is loged in */}
        {props.user ? (
          <Stack direction="row" spacing={2} alignItems="center">
            <Link to={PATHS.PROTECTEDPAGE} className="authLink">
              Protected Page
            </Link>
            <Avatar src={profileDefault} alt="avatar" />
            <button className="nav-logoutbtn" onClick={props.handleLogout}>
              Logout
            </button>
          </Stack>
        ) : (
          <>
            <Link to="/auth/signup" className="authLink">
              Signup
            </Link>
            <Link to="/auth/login" className="authLink">
              Log In
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
