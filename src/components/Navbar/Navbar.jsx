import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import * as PATHS from "../../utils/paths";
import * as CONSTS from "../../utils/consts";
import logo from "../../images/logo.png";
import SearchBar from "../SearchBar";

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
          <>
            <Link to={PATHS.PROTECTEDPAGE} className="authLink">
              Protected Page
            </Link>
            <button className="nav-logoutbtn" onClick={props.handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to={PATHS.SIGNUPPAGE} className="authLink">
              Signup
            </Link>
            <Link to={PATHS.LOGINPAGE} className="authLink">
              Log In
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
