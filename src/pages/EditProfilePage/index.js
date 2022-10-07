import "./styles.css";
import profilePic from "../../images/profile-default.png";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import AccountCircle from "@mui/icons-material/AccountCircle";
import InputAdornment from "@mui/material/InputAdornment";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import CommentIcon from "@mui/icons-material/Comment";
import StarIcon from "@mui/icons-material/Star";
import FormControl from "@mui/material/FormControl";

const API_URL = process.env.REACT_APP_SERVER_URL;

const inputStyle = {
  "& label": { color: "#fff" },
  "&:hover label": { color: "#0f9585" },
  "& label.Mui-focused": { color: "#13c6b2" },
  "& .MuiInputAdornment-root": {
    color: "#fff",
  },
  "& .MuiInput-underline:before": {
    borderBottomColor: "#fff",
  },
  "&:hover .MuiInput-underline:before": {
    borderBottomColor: "#0f9585",
    borderWidth: 1,
  },
  margin: "1rem",
};

const EditProfilePage = (props) => {
  const { userSession } = props;
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [about, setAbout] = useState("");
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    axios
      .get(`${API_URL}/user/${userSession._id}`)
      .then((response) => {
        response.data.username && setUsername(response.data.username);
        response.data.firstName && setFirstName(response.data.firstName);
        response.data.lastName && setLastName(response.data.lastName);
        response.data.email && setEmail(response.data.email);
        response.data.phone && setPhone(response.data.phone);
        response.data.about && setAbout(response.data.about);
        response.data.avatar && setAvatar(response.data.avatar);
      })
      .catch((err) => console.log(err));
  }, [userSession]);

  const handleCancel = () => {
    navigate("/profile");
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const request = {
      userId: userSession._id,
      username,
      firstName,
      lastName,
      email,
      phone,
      about,
      avatar,
    };
    axios
      .put(`${API_URL}/user/edit`, request)
      .then(navigate("/profile", { replace: true }))
      .catch((err) => console.log(err));
  };

  const handleOpenWidget = () => {
    let myWidget = window.cloudinary.createUploadWidget(
      {
        cloudName: `${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}`,
        uploadPreset: `${process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET}`,
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          setAvatar(result.info.url);
        }
      }
    );
    // open widget
    myWidget.open();
  };

  return (
    <div className="edit-profile-page">
      <Stack direction="row" alignItems="center" spacing={3}>
        <Typography variant="h2" color="#fff" fontWeight="Bold">
          My Profile
        </Typography>
        <Button
          variant="contained"
          color="custom"
          size="small"
          onClick={handleFormSubmit}
        >
          Save
        </Button>
        <Button
          variant="contained"
          color="error"
          size="small"
          onClick={handleCancel}
        >
          Cancel
        </Button>
      </Stack>
      <Paper
        elevation={3}
        sx={{
          backgroundColor: "#4e4f50",
          borderRadius: "1rem",
          padding: "2rem",
          flexGrow: 1,
          maxWidth: "60rem",
          margin: "0 auto",
        }}
      >
        <Grid container borderRadius={3}>
          <Grid item xs="auto" sx={{ margin: "0 auto" }}>
            <Paper className="profile-img-container" elevation={3}>
              <img src={avatar ? avatar : profilePic} alt="profile" />
            </Paper>
            <Stack>
              <button
                id="upload-widget"
                className="cloudinary-button"
                onClick={() => handleOpenWidget()}
                style={{ backgroundColor: "#13c6b2", margin: "2rem auto" }}
              >
                Change Profile Image
              </button>
            </Stack>
          </Grid>
          <Grid item xs>
            <Paper
              elevation={3}
              sx={{
                backgroundColor: "#242526",
                borderRadius: "1rem",
                padding: "2rem",
                height: "100%",
              }}
            >
              <form className="edit-profile-form" onSubmit={handleFormSubmit}>
                <Grid container>
                  <Grid item xs={12}>
                    <FormControl
                      variant="standard"
                      color="custom"
                      className="edit-form"
                      sx={{ ...inputStyle, width: "90%" }}
                    >
                      <InputLabel htmlFor="username" className="edit-input">
                        Username
                      </InputLabel>
                      <Input
                        id="username"
                        startAdornment={
                          <InputAdornment position="start">
                            <AccountCircle />
                          </InputAdornment>
                        }
                        sx={{ color: "#fff" }}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl
                      variant="standard"
                      color="custom"
                      sx={{ ...inputStyle, width: "80%" }}
                    >
                      <InputLabel htmlFor="firstName">First Name</InputLabel>
                      <Input
                        id="firstName"
                        startAdornment={
                          <InputAdornment position="start">
                            <AccountCircle />
                          </InputAdornment>
                        }
                        sx={{ color: "#fff" }}
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl
                      variant="standard"
                      color="custom"
                      sx={{ ...inputStyle, width: "80%" }}
                    >
                      <InputLabel htmlFor="lastName">Last Name</InputLabel>
                      <Input
                        id="lastName"
                        startAdornment={
                          <InputAdornment position="start">
                            <AccountCircle />
                          </InputAdornment>
                        }
                        sx={{ color: "#fff" }}
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl
                      variant="standard"
                      color="custom"
                      sx={{ ...inputStyle, width: "90%" }}
                    >
                      <InputLabel htmlFor="email">Email</InputLabel>
                      <Input
                        id="email"
                        startAdornment={
                          <InputAdornment position="start">
                            <AccountCircle />
                          </InputAdornment>
                        }
                        sx={{ color: "#fff" }}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl
                      variant="standard"
                      color="custom"
                      sx={{ ...inputStyle, width: "90%" }}
                    >
                      <InputLabel htmlFor="phone">Phone Number</InputLabel>
                      <Input
                        id="phone"
                        startAdornment={
                          <InputAdornment position="start">
                            <AccountCircle />
                          </InputAdornment>
                        }
                        sx={{ color: "#fff" }}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl
                      variant="standard"
                      color="custom"
                      sx={{ ...inputStyle, width: "90%" }}
                    >
                      <InputLabel htmlFor="about">About me</InputLabel>
                      <Input
                        id="about"
                        startAdornment={
                          <InputAdornment position="start">
                            <AccountCircle />
                          </InputAdornment>
                        }
                        sx={{ color: "#fff" }}
                        value={about}
                        onChange={(e) => setAbout(e.target.value)}
                      />
                    </FormControl>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper
              elevation={3}
              className="comments-section"
              sx={{
                backgroundColor: "#242526",
                borderRadius: "1rem",
                padding: "2rem",
                marginTop: "1rem",
                flexGrow: 1,
              }}
            >
              <Stack direction="row" alignItems="center" spacing={1}>
                <LiveTvIcon color="custom" fontSize="large" />
                <Stack>
                  <Typography variant="body1" color="#fff" component="div">
                    {userSession?.list.length} Items
                  </Typography>
                  <Typography variant="body1" color="#fff" component="div">
                    Total Series and Movies Tracked
                  </Typography>
                </Stack>
              </Stack>
              <Stack direction="row" alignItems="center" spacing={1}>
                <CommentIcon color="error" fontSize="large" />
                <Stack>
                  <Typography variant="body1" color="#fff" component="div">
                    {userSession?.comments.length} Comments
                  </Typography>
                  <Typography variant="body1" color="#fff" component="div">
                    Total Comments made
                  </Typography>
                </Stack>
              </Stack>
              <Stack direction="row" alignItems="center" spacing={1}>
                <StarIcon color="warning" fontSize="large" />
                <Stack>
                  <Typography variant="body1" color="#fff" component="div">
                    {userSession?.ranking.length} Ratings
                  </Typography>
                  <Typography variant="body1" color="#fff" component="div">
                    Total Series and Movies Rated
                  </Typography>
                </Stack>
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default EditProfilePage;
