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
import ProfileSkeleton from "../../components/ProfileSkeleton";

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
  const { userSession, changeProfileImage } = props;
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [profileInfo, setProfileInfo] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    about: "",
    avatar: "",
  });

  const { username, firstName, lastName, email, phone, about, avatar } =
    profileInfo;

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${API_URL}/user/${userSession._id}`)
      .then((response) => {
        const { username, firstName, lastName, email, phone, about, avatar } =
          response.data;
        setProfileInfo({
          username: username ?? "",
          firstName: firstName ?? "",
          lastName: lastName ?? "",
          email: email ?? "",
          phone: phone ?? "",
          about: about ?? "",
          avatar: avatar ?? "",
        });
        setInterval(() => {
          setIsLoading(false);
        }, 500);
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
      .then((res) => {
        changeProfileImage();
        navigate("/profile", { replace: true });
      })
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
          setProfileInfo({ ...profileInfo, avatar: result.info.url });
        }
      }
    );
    // open widget
    myWidget.open();
  };

  return (
    <div className="edit-profile-page">
      <Stack
        direction="row"
        alignItems="center"
        spacing={3}
        marginTop={{ xs: 10, sm: 1 }}
        marginBottom={3}
      >
        <Typography
          variant="h2"
          color="#fff"
          fontWeight="Bold"
          fontSize={{ xs: '2rem', md: '3rem' }}
        >
          Edit Profile
        </Typography>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={{ xs: 1, sm: 3 }}
        >
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
      </Stack>
      {isLoading ? (
        <ProfileSkeleton />
      ) : (
        <Paper
          elevation={3}
          sx={{
            backgroundColor: '#4e4f50',
            borderRadius: '1rem',
            padding: { xs: '1.6rem', sm: '2rem' },
            flexGrow: 1,
            maxWidth: '60rem',
            margin: '0 auto',
          }}
        >
          <Grid container borderRadius={3} spacing={1}>
            <Grid
              item
              xs={12}
              sm="auto"
              sx={{ margin: '0 auto' }}
              justifyContent="center"
            >
              <Paper
                elevation={3}
                sx={{
                  borderRadius: { xs: '50%', sm: '1rem', md: '1rem' },
                  width: { xs: '155px', sm: '200px', md: '300px' },
                  height: { xs: '155px', sm: '200px', md: '300px' },
                  overflow: 'hidden',
                  margin: '0 auto',
                }}
              >
                <img
                  className="edit-profile-img"
                  src={avatar ? avatar : profilePic}
                  alt="profile"
                />
              </Paper>
              <Stack>
                <button
                  id="upload-widget"
                  className="cloudinary-button"
                  onClick={() => handleOpenWidget()}
                >
                  Change Profile Image
                </button>
              </Stack>
            </Grid>
            <Grid item xs>
              <Paper
                elevation={3}
                sx={{
                  backgroundColor: '#242526',
                  borderRadius: '1rem',
                  padding: { xs: '1.6rem', sm: '2rem' },
                  height: '100%',
                }}
              >
                <form className="edit-profile-form" onSubmit={handleFormSubmit}>
                  <Grid container>
                    <Grid item xs={12}>
                      <FormControl
                        variant="standard"
                        color="custom"
                        className="edit-form"
                        sx={{ ...inputStyle, width: '90%' }}
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
                          sx={{ color: '#fff' }}
                          value={profileInfo.username}
                          onChange={(e) =>
                            setProfileInfo({
                              ...profileInfo,
                              username: e.target.value,
                            })
                          }
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl
                        variant="standard"
                        color="custom"
                        sx={{ ...inputStyle, width: { xs: '90%', sm: '80%' } }}
                      >
                        <InputLabel htmlFor="firstName">First Name</InputLabel>
                        <Input
                          id="firstName"
                          startAdornment={
                            <InputAdornment position="start">
                              <AccountCircle />
                            </InputAdornment>
                          }
                          sx={{ color: '#fff' }}
                          value={profileInfo.firstName}
                          onChange={(e) =>
                            setProfileInfo({
                              ...profileInfo,
                              firstName: e.target.value,
                            })
                          }
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl
                        variant="standard"
                        color="custom"
                        sx={{ ...inputStyle, width: { xs: '90%', sm: '80%' } }}
                      >
                        <InputLabel htmlFor="lastName">Last Name</InputLabel>
                        <Input
                          id="lastName"
                          startAdornment={
                            <InputAdornment position="start">
                              <AccountCircle />
                            </InputAdornment>
                          }
                          sx={{ color: '#fff' }}
                          value={profileInfo.lastName}
                          onChange={(e) =>
                            setProfileInfo({
                              ...profileInfo,
                              lastName: e.target.value,
                            })
                          }
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl
                        variant="standard"
                        color="custom"
                        sx={{ ...inputStyle, width: '90%' }}
                      >
                        <InputLabel htmlFor="email">Email</InputLabel>
                        <Input
                          id="email"
                          startAdornment={
                            <InputAdornment position="start">
                              <AccountCircle />
                            </InputAdornment>
                          }
                          sx={{ color: '#fff' }}
                          value={profileInfo.email}
                          onChange={(e) =>
                            setProfileInfo({
                              ...profileInfo,
                              email: e.target.value,
                            })
                          }
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl
                        variant="standard"
                        color="custom"
                        sx={{ ...inputStyle, width: '90%' }}
                      >
                        <InputLabel htmlFor="phone">Phone Number</InputLabel>
                        <Input
                          id="phone"
                          startAdornment={
                            <InputAdornment position="start">
                              <AccountCircle />
                            </InputAdornment>
                          }
                          sx={{ color: '#fff' }}
                          value={profileInfo.phone}
                          onChange={(e) =>
                            setProfileInfo({
                              ...profileInfo,
                              phone: e.target.value,
                            })
                          }
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl
                        variant="standard"
                        color="custom"
                        sx={{ ...inputStyle, width: '90%' }}
                      >
                        <InputLabel htmlFor="about">About me</InputLabel>
                        <Input
                          id="about"
                          startAdornment={
                            <InputAdornment position="start">
                              <AccountCircle />
                            </InputAdornment>
                          }
                          sx={{ color: '#fff' }}
                          value={profileInfo.about}
                          onChange={(e) =>
                            setProfileInfo({
                              ...profileInfo,
                              about: e.target.value,
                            })
                          }
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
                  backgroundColor: '#242526',
                  borderRadius: '1rem',
                  padding: '2rem',
                  marginTop: '1rem',
                  flexGrow: 1,
                }}
              >
                <Stack
                  width={1}
                  direction="row"
                  justifyContent="space-evenly"
                  alignItems="center"
                  spacing={1}
                >
                  <Stack
                    alignItems="center"
                    width={{ xs: '50px', sm: '100px', md: '150px' }}
                  >
                    <LiveTvIcon color="custom" fontSize="large" />
                    <Typography
                      variant="body1"
                      color="#fff"
                      component="div"
                      textAlign="center"
                      display={{ xs: 'none', sm: 'inline' }}
                    >
                      Series and Movies
                    </Typography>
                    <Typography
                      variant="body1"
                      color="#13c6b2"
                      component="div"
                      textAlign="center"
                      fontSize="1.6rem"
                    >
                      {userSession?.list.length}
                    </Typography>
                  </Stack>
                  <Stack
                    alignItems="center"
                    width={{ xs: '50px', sm: '100px', md: '150px' }}
                  >
                    <CommentIcon color="error" fontSize="large" />
                    <Typography
                      variant="body1"
                      color="#fff"
                      component="div"
                      textAlign="center"
                      display={{ xs: 'none', sm: 'inline' }}
                    >
                      Comments
                    </Typography>
                    <Typography
                      variant="body1"
                      color="#D32F2F"
                      component="div"
                      textAlign="center"
                      fontSize="1.6rem"
                    >
                      {userSession?.comments.length}
                    </Typography>
                  </Stack>
                  <Stack
                    alignItems="center"
                    width={{ xs: '50px', sm: '100px', md: '150px' }}
                  >
                    <StarIcon color="warning" fontSize="large" />
                    <Typography
                      variant="body1"
                      color="#fff"
                      component="div"
                      textAlign="center"
                      display={{ xs: 'none', sm: 'inline' }}
                    >
                      Ratings
                    </Typography>
                    <Typography
                      variant="body1"
                      color="#ED6C02"
                      component="div"
                      textAlign="center"
                      fontSize="1.6rem"
                    >
                      {userSession?.ranking.length}
                    </Typography>
                  </Stack>
                </Stack>
              </Paper>
            </Grid>
          </Grid>
        </Paper>
      )}
    </div>
  );
};

export default EditProfilePage;
