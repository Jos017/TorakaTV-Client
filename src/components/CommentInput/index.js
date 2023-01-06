import React, { useState } from "react";
import "./styles.css";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import IconButton from "@mui/material/IconButton";

const CommentInput = (props) => {
  const {
    previousComment,
    editComment,
    commentId,
    handleClose,
    addComment,
    type,
    userSession,
  } = props;
  const [comment, setComment] = useState(previousComment);
  function handleFormSubmit(e) {
    e.preventDefault();
    // let requestBody = {}
    if (type === "add") {
      const requestBody = { description: comment, userId: userSession._id };
      addComment(requestBody);
    } else if (type === "edit") {
      const requestBody = { description: comment, commentId };
      editComment(requestBody);
      handleClose();
    }
    setComment("");
  }
  return (
    <React.Fragment>
      <form onSubmit={handleFormSubmit} className="comment-form">
        <TextareaAutosize
          className="comment-input"
          name="comment"
          value={comment}
          placeholder="Write your comment here"
          onChange={(e) => setComment(e.target.value)}
        />
        <Button
          type="submit"
          color="custom"
          variant="contained"
          endIcon={<SendIcon />}
          sx={{
            display: { xs: 'none', md: 'flex' },
            ml: '0.5rem',
            borderRadius: '50px',
          }}
        >
          Send
        </Button>
        <IconButton
          type="submit"
          aria-label="send"
          size="small"
          sx={{
            '&:hover': { backgroundColor: '#0f9585' },
            width: '50px',
            height: '50px',
            backgroundColor: '#13c6b2',
            display: { xs: 'flex', md: 'none' },
            ml: '0.5rem',
          }}
        >
          <SendIcon fontSize="small" sx={{ color: '#fff', ml: '0.3rem' }} />
        </IconButton>
      </form>
    </React.Fragment>
  );
};

export default CommentInput;
