import React from "react";

const YouTubeFrame = (props) => {
  return (
    <iframe
      width="100%"
      height="100%"
      src={`https://www.youtube.com/embed/${props.videoKey}`}
      title="Marvel Studios' Thor: Love and Thunder | Official Trailer"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
  );
};

export default YouTubeFrame;
