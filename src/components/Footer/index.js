import "./styles.css";
import React from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import Typography from "@mui/material/Typography";

const Footer = (props) => {
  return (
    <footer>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        width="70%"
      >
        <Link to="/" className="link">
          Home
        </Link>
        <Link to="#" className="link">
          About
        </Link>
        <Link to="/" className="link">
          Movies
        </Link>
        <Link to="/" className="link">
          TV Series
        </Link>
        {props.user ? (
          <>
            <Button
              variant="contained"
              color="error"
              onClick={props.handleLogout}
            >
              Logout
            </Button>
          </>
        ) : (
          <>
            <Link to="/auth/signup" className="link">
              Signup
            </Link>
            <Link to="/auth/login" className="link">
              Log In
            </Link>
          </>
        )}
      </Stack>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        width="70%"
      >
        <Stack direction="row" justifyContent="flex-end">
          <Typography variant="body1">
            TorakaTV ©2022 All Rights Reserved.
          </Typography>
        </Stack>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent={{ xs: "flex-end" }}
          spacing={2}
        >
          <Typography variant="body1">Follow Us</Typography>
          <FacebookIcon fontSize="large" />
          <TwitterIcon fontSize="large" />
          <InstagramIcon fontSize="large" />
          <LinkedInIcon fontSize="large" />
        </Stack>
      </Stack>
    </footer>
  );
};

export default Footer;
