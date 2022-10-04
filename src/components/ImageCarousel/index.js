import axios from "axios";
import React, { useEffect, useState } from "react";

const ImageCarousel = (props) => {
  const { movieId } = props;
  const [images, setImages] = useState([]);
  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${movieId}/images?api_key=${process.env.REACT_APP_TMDB_API_KEY}`
      )
      .then((response) => {
        const orderedImages = response.data.backdrops;
        orderedImages.sort((a, b) => b.vote_average - a.vote_average);
        const newImages = orderedImages.filter((image, index) => {
          return index <= 7;
        });
        setImages([...newImages]);
      });
  }, [movieId]);
  console.log(images);
  return (
    <div>
      {images?.map((image) => {
        return (
          <img
            src={`http://image.tmdb.org/t/p/w500${image.file_path}`}
            width="500px"
            alt={image.file_path}
          />
        );
      })}
    </div>
  );
};

export default ImageCarousel;
