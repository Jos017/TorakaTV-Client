import React, { useState } from "react";
import { signup } from "../../services/auth";
import { useNavigate, Link } from "react-router-dom";
import logo from "../../images/logo.png";
import "./styles.css";
import * as PATHS from "../../utils/paths";
import * as USER_HELPERS from "../../utils/userToken";
import Typograpy from "@mui/material/Typography";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FormControl from "@mui/material/FormControl";

export default function Signup({ authenticate }) {
  const [form, setForm] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    showPassword: false,
    showConfirmPassword: false,
  });
  const {
    email,
    username,
    password,
    confirmPassword,
    showPassword,
    showConfirmPassword,
  } = form;
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  function handleInputChange(event) {
    const { name, value } = event.target;
    return setForm({ ...form, [name]: value });
  }

  const handleClickShowPassword = () => {
    setForm({
      ...form,
      showPassword: !showPassword,
    });
  };

  const handleClickShowConfirmPassword = () => {
    setForm({
      ...form,
      showConfirmPassword: !showConfirmPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  function handleFormSubmission(event) {
    event.preventDefault();
    const credentials = {
      username,
      email,
      password,
    };
    signup(credentials).then((res) => {
      if (!res.status) {
        // unsuccessful signup
        console.error("Signup was unsuccessful: ", res);
        return setError({
          message: "Signup was unsuccessful! Please check the console.",
        });
      }
      // successful signup
      USER_HELPERS.setUserToken(res.data.accessToken);
      authenticate(res.data.user);
      navigate(PATHS.HOMEPAGE);
    });
  }

  return (
    <div className="signup">
      <div className="signup-container">
        <div className="signup-logo">
          <img src={logo} alt="Logo" />
        </div>
        <Typograpy variant="h4" fontWeight="bold" marginTop="3rem">
          TorakaTV
        </Typograpy>
        <form onSubmit={handleFormSubmission} className="signup__form">
          <FormControl color="custom">
            <InputLabel htmlFor="input-email">Email</InputLabel>
            <OutlinedInput
              id="input-email"
              type="email"
              name="email"
              value={email}
              onChange={handleInputChange}
              label="Email"
              required
            />
          </FormControl>

          <FormControl color="custom">
            <InputLabel htmlFor="input-username">Username</InputLabel>
            <OutlinedInput
              id="input-username"
              type="text"
              name="username"
              value={username}
              onChange={handleInputChange}
              label="Username"
              required
            />
          </FormControl>

          <FormControl color="custom">
            <InputLabel htmlFor="input-password">Password</InputLabel>
            <OutlinedInput
              id="input-password"
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={handleInputChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
              required
              minLength="8"
            />
          </FormControl>

          {/* <FormControl color="custom">
            <InputLabel htmlFor="confirm-password">Confirm Password</InputLabel>
            <OutlinedInput
              id="confirm-password"
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleInputChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowConfirmPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              label="Confirm Password"
              required
              minLength="8"
            />
          </FormControl> */}

          {error && (
            <div className="error-block">
              <p>There was an error submiting the form:</p>
              <p>{error.message}</p>
            </div>
          )}

          <Button type="submit" variant="contained" color="custom">
            JOIN TORAKATV
          </Button>
        </form>
        <Typograpy className="form-footer" variant="subtitle1" component="p">
          Already a MyMoviesList member?{" "}
          <Link to="/auth/login" className="login-link">
            Login
          </Link>
        </Typograpy>
      </div>
    </div>
  );
}
