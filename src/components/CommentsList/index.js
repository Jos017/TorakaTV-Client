import Grid from "@mui/material/Grid";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import defaultProfile from "../../images/profile-default.png";
import MenuDial from "../MenuDial";
import CommentInput from "../CommentInput";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";

import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";

const API_URL = process.env.REACT_APP_SERVER_URL;

const CommentsList = (props) => {
  const { movieId, userSession } = props;
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

  const addComment = (request) => {
    axios
      .post(`${API_URL}/movie/${movieId}/comments`, request)
      .then((response) => {
        const newComment = response.data;
        setComments([newComment, ...comments]);
      })
      .catch((err) => console.log(err));
  };

  const editComment = (request) => {
    axios
      .put(`${API_URL}/movie/comments/update`, request)
      .then((response) => {
        const newComments = comments.map((comment) => {
          return comment._id === request.commentId ? response.data : comment;
        });
        setComments([...newComments]);
      })
      .catch((err) => console.log(err));
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
      {userSession && (
        <CommentInput
          movieId={movieId}
          type="add"
          addComment={addComment}
          userSession={userSession}
        />
      )}
      <Grid container mt="0.5rem" spacing={2}>
        {comments?.map((comment) => {
          const { user, createdAt, description, _id, updatedAt } = comment;
          return (
            <Grid
              item
              xs={12}
              md={6}
              alignItems="center"
              key={_id}
            >
              <Grid
                container
                borderRadius='1rem'
                sx={{ backgroundColor: '#242526', color: '#fff' }}
                padding={4}
                alignItems="center"
              >
                <Grid item xs="auto" mr="1rem">
                  <Avatar src={defaultProfile}></Avatar>
                </Grid>
                <Grid item xs>
                  <Typography variant="body1" color="#fff" fontSize={{ xs: '0.8rem', sm: '0.9rem' }}>
                    @{user?.username}
                  </Typography>
                  <Typography variant="body1" color="#8b96a0" fontSize={{ xs: '0.8rem', sm: '0.9rem' }}>
                    {updatedAt
                      ? moment(updatedAt).format('DD/MMM/YYYY')
                      : moment(createdAt).format('DD/MMM/YYYY')}
                  </Typography>
                </Grid>
                <Grid item xs="auto">
                  {userSession?._id === user?._id && (
                    <MenuDial
                      editComment={editComment}
                      deleteComment={deleteComment}
                      commentId={_id}
                      description={description}
                    />
                  )}
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    variant="body1"
                    color="#8b96a0"
                    mt={1}
                    pt={1}
                    borderTop="1px solid #8b96a0"
                    fontSize={{ xs: '0.8rem', sm: '0.9rem' }}
                  >
                    {description}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <IconButton
                    aria-label="delete"
                    size="small"
                    sx={{ '&:hover': { backgroundColor: '#4e4f50' } }}
                  >
                    <ThumbUpOutlinedIcon fontSize="small" color="custom" />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export default CommentsList;
