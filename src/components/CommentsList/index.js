import Grid from "@mui/material/Grid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import defaultProfile from "../../images/profile-default.png";
import MenuDial from "../MenuDial";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";

const API_URL = process.env.REACT_APP_SERVER_URL;

const CommentsList = (props) => {
  const { movieId } = props;
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const getAllCommentsPerMovie = () => {
      axios
        .get(`${API_URL}/movie/${movieId}/comments`)
        .then((response) => setComments(response.data))
        .catch((err) => console.log(err));
    };

    getAllCommentsPerMovie();
  }, [movieId]);
  console.log(comments);

  return (
    <div className="comments-list">
      {comments?.map((comment) => {
        const { user, createdAt, description, _id } = comment;
        return (
          <Grid
            container
            alignItems="Center"
            style={{ color: "fff" }}
            key={_id}
          >
            <Grid item xs="auto">
              <Avatar src={defaultProfile}></Avatar>
            </Grid>
            <Grid item xs>
              <Typography variant="body1" color="#fff">
                {user.username}
              </Typography>
              <Typography variant="body1" color="#fff">
                {createdAt}
              </Typography>
            </Grid>
            <Grid item xs="auto">
              <MenuDial />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1" color="#fff">
                {description}
              </Typography>
            </Grid>
          </Grid>
        );
      })}
    </div>
  );
};

export default CommentsList;
