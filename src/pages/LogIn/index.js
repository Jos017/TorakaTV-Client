import React, { useState } from "react";
import { login } from "../../services/auth";
import { useNavigate, Link } from "react-router-dom";
import "../Signup";
import "./styles.css";
import logo from "../../images/logo.png";
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

export default function LogIn({ authenticate }) {
  const [form, setForm] = useState({
    username: "",
    password: "",
    showPassword: false,
  });
  const { username, password, showPassword } = form;
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

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  function handleFormSubmission(event) {
    event.preventDefault();
    const credentials = {
      username,
      password,
    };
    login(credentials).then((res) => {
      if (!res.status) {
        return setError({ message: "Invalid credentials" });
      }
      USER_HELPERS.setUserToken(res.data.accessToken);
      authenticate(res.data.user);
      navigate(PATHS.HOMEPAGE);
    });
  }

  return (
    <div className="login">
      <div className="login-container">
        <div className="login-logo">
          <img src={logo} alt="Logo" />
        </div>
        <Typograpy variant="h4" fontWeight="bold" marginTop="3rem">
          TorakaTV
        </Typograpy>
        <form onSubmit={handleFormSubmission} className="login__form">
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

          {error && (
            <div className="error-block">
              <p>There was an error submiting the form:</p>
              <p>{error.message}</p>
            </div>
          )}

          <Button type="submit" variant="contained" color="custom">
            Login
          </Button>
        </form>
        <Typograpy className="form-footer" variant="subtitle1" component="p">
          Not yet a member?{" "}
          <Link to="/auth/signup" className="login-link">
            Join us
          </Link>
        </Typograpy>
      </div>
    </div>
  );
}
