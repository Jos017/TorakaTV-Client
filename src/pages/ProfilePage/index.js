import "./styles.css";
import profilePic from "../../images/profile-default.png";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import CommentIcon from "@mui/icons-material/Comment";
import StarIcon from "@mui/icons-material/Star";
import axios from "axios";
import ProfileSkeleton from "../../components/ProfileSkeleton";

const API_URL = process.env.REACT_APP_SERVER_URL;

const ProfilePage = (props) => {
  const { userSession } = props;
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
          username,
          firstName,
          lastName,
          email,
          phone,
          about,
          avatar,
        });
        setInterval(() => {
          setIsLoading(false);
        }, 500);
      })
      .catch((err) => console.log(err));
  }, [userSession]);

  const handleEdit = () => {
    navigate("/profile/edit");
  };

  return (
    <div className="profile-page">
      <Stack
        direction="row"
        alignItems="center"
        spacing={3}
        marginTop={{ xs: 12, sm: 1 }}
        marginBottom={3}
      >
        <Typography variant="h2" color="#fff" fontWeight="Bold">
          My Profile
        </Typography>
        <Button
          variant="contained"
          color="custom"
          size="small"
          onClick={handleEdit}
        >
          Edit
        </Button>
      </Stack>
      {isLoading ? (
        <ProfileSkeleton />
      ) : (
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
          <Grid container borderRadius={3} spacing={1}>
            <Grid item xs="auto" sx={{ margin: "0 auto" }}>
              <Paper className="profile-img-container" elevation={3}>
                <img src={avatar ? avatar : profilePic} alt="profile" />
              </Paper>
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
                <Typography variant="h5" color="#fff">
                  {firstName} {lastName}
                </Typography>
                <Typography variant="subtitle1" component="div" color="#4e4f50">
                  @{username}
                </Typography>
                <Typography variant="body1" component="div" color="#fff">
                  <span style={{ color: "#13c6b2" }}>Email: </span>
                  <span>{email}</span>
                </Typography>
                <Typography variant="body1" component="div" color="#fff">
                  <span style={{ color: "#13c6b2" }}>Phone Number: </span>
                  <span>{phone}</span>
                </Typography>
                <Typography variant="body1" component="div" color="#fff">
                  <span style={{ color: "#13c6b2" }}>About me: </span>
                  <span>{about}</span>
                </Typography>
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
      )}
    </div>
  );
};

export default ProfilePage;
