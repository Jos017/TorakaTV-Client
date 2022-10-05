import Grid from "@mui/material/Grid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import defaultProfile from "../../images/profile-default.png";
import MenuDial from "../MenuDial";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";

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

  const editComment = (commentId) => {
    console.log("Editando Comentario", commentId);
  };

  const deleteComment = (commentId) => {
    // Make a DELETE request to delete the project
    axios
      .delete(`${API_URL}/movie/comments/delete/${commentId}`)
      .then((response) => {
        // Once the delete request is resolved successfully
        // navigate back to the list of projects.
        const deletedCommentId = response.data._id;
        const newComments = comments.filter(
          (comment) => comment._id !== deletedCommentId
        );
        setComments([...newComments]);
      })
      .catch((err) => console.log(err));
  };

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
            padding={5}
            margin={1}
            maxWidth="900px"
            sx={{ backgroundColor: "#242526" }}
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
              <MenuDial
                editComment={editComment}
                deleteComment={deleteComment}
                commentId={_id}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant="body1"
                color="#fff"
                mt={1}
                pt={1}
                borderTop="1px solid #3a3b3c"
              >
                {description}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <IconButton
                aria-label="delete"
                size="small"
                sx={{ "&:hover": { backgroundColor: "#4e4f50" } }}
              >
                <ThumbUpOutlinedIcon fontSize="small" color="custom" />
              </IconButton>
            </Grid>
          </Grid>
        );
      })}
    </div>
  );
};

export default CommentsList;
