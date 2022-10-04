import React, { useState } from "react";
import "./styles.css";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Button from "@mui/material/Button";

const CommentInput = () => {
  const [comment, setComment] = useState("");
  function handleFormSubmit(e) {
    e.preventDefault();
  }
  return (
    <div>
      <form>
        <TextareaAutosize
          className="comment-input"
          value={comment}
          placeholder="Write your comment here"
          onChange={(e) => setComment(e.target.value)}
        />
        <Button type="submit" color="custom" variant="outlined">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default CommentInput;
