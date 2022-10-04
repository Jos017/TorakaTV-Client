import axios from "axios";
import React, { useEffect, useState } from "react";

const API_URL = process.env.REACT_APP_SERVER_URL;

const CommentsList = () => {
  const [comments, setComments] = useState([]);

  const getAllComments = () => {
    axios
      .get(`${API_URL}/api/comments`)
      .then((response) => setComments(response.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getAllComments();
  });

  return (
    <div className="comments-list">
      {comments?.map((comment) => {
        return <div>COMENTARIO: {comment.description}</div>;
      })}
    </div>
  );
};

export default CommentsList;
