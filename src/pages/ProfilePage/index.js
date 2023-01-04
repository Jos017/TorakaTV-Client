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
        marginTop={{ xs: 10, sm: 1 }}
        marginBottom={3}
      >
        <Typography
          variant="h2"
          color="#fff"
          fontWeight="Bold"
          fontSize={{ xs: '2rem', md: '3rem' }}
        >
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
            backgroundColor: '#4e4f50',
            borderRadius: '1rem',
            padding: {xs: '1.6rem', sm: '2rem'},
            flexGrow: 1,
            maxWidth: '60rem',
            margin: '0 auto',
          }}
        >
          <Grid container borderRadius={3} spacing={1}>
            <Grid item alignContent='center' xs={12} sm="auto" sx={{ margin: '0 auto' }}>
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
                  className="profile-img"
                  src={avatar ? avatar : profilePic}
                  alt="profile"
                />
              </Paper>
            </Grid>
            <Grid item xs>
              <Paper
                elevation={3}
                sx={{
                  backgroundColor: '#242526',
                  borderRadius: '1rem',
                  padding: {xs: '1.6rem', sm: '2rem'},
                  height: '100%',
                }}
              >
                <Typography variant="h5" color="#fff">
                  {firstName} {lastName}
                </Typography>
                <Typography variant="subtitle1" component="div" color="#bbb">
                  @{username}
                </Typography>
                <Typography variant="body1" component="div" color="#bbb">
                  <span style={{ color: '#13c6b2' }}>Email: </span>
                  <span>{email}</span>
                </Typography>
                <Typography variant="body1" component="div" color="#bbb">
                  <span style={{ color: '#13c6b2' }}>Phone: </span>
                  <span>{phone}</span>
                </Typography>
                <Typography variant="body1" component="div" color="#bbb">
                  <span style={{ color: '#13c6b2' }}>About me: </span>
                  <span>{about}</span>
                </Typography>
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
                  <Stack alignItems="center" width={{xs: '50px', sm: '100px', md: '150px'}}>
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
                  <Stack alignItems="center" width={{xs: '50px', sm: '100px', md: '150px'}}>
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
                  <Stack alignItems="center" width={{xs: '50px', sm: '100px', md: '150px'}}>
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

export default ProfilePage;
