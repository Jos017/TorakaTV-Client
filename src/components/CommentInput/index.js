import React, { useState } from "react";
import "./styles.css";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";

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
    <div>
      <form onSubmit={handleFormSubmit}>
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
        >
          Send
        </Button>
      </form>
    </div>
  );
};

export default CommentInput;
