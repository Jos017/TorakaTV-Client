import React from "react";
import styles from "./styles.module.css"

const YouTubeFrame = (props) => {
  return (
    <iframe
      className={styles.frame}
      width="100%"
      height="100%"
      src={`https://www.youtube.com/embed/${props.videoKey}`}
      title="Marvel Studios' Thor: Love and Thunder | Official Trailer"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
  );
};

export default YouTubeFrame;
