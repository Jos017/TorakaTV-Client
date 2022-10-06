import "./styles.css";
import profilePic from "../../images/profile-default.png";
import React from "react";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import CommentIcon from "@mui/icons-material/Comment";
import StarIcon from "@mui/icons-material/Star";

const ProfilePage = (props) => {
  const { userSession } = props;
  const navigate = useNavigate();
  const handleEdit = () => {
    navigate("/profile/edit");
  };
  return (
    <div className="profile-page">
      <Stack direction="row" alignItems="center" spacing={3}>
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
              <img src={profilePic} alt="profile" />
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
                {userSession.firstName} {userSession.lastName}
              </Typography>
              <Typography variant="subtitle1" component="div" color="#4e4f50">
                @{userSession.username}
              </Typography>
              <Typography variant="body1" component="div" color="#fff">
                <span style={{ color: "#13c6b2" }}>Email: </span>
                <span>{userSession.email}</span>
              </Typography>
              <Typography variant="body1" component="div" color="#fff">
                <span style={{ color: "#13c6b2" }}>Phone Number: </span>
                <span>{userSession.phone}</span>
              </Typography>
              <Typography variant="body1" component="div" color="#fff">
                <span style={{ color: "#13c6b2" }}>About me: </span>
                <span>{userSession.about}</span>
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
                    {userSession.list.length} Items
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
                    {userSession.comments.length} Comments
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
                    {userSession.ranking.length} Ratings
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

export default ProfilePage;
