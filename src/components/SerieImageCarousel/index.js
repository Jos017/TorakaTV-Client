import axios from "axios";
import React, { useEffect, useState } from "react";

const SerieImageCarousel = (props) => {
  const { serieId } = props;
  const [images, setImages] = useState([]);
  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/tv/${serieId}/images?api_key=${process.env.REACT_APP_TMDB_API_KEY}`
      )
      .then((response) => {
        const orderedImages = response.data.backdrops;
        orderedImages.sort((a, b) => b.vote_average - a.vote_average);
        const newImages = orderedImages.filter((image, index) => {
          return index <= 7;
        });
        setImages([...newImages]);
      });
  }, [serieId]);
  // console.log(images);
  return (
    <div>
      {images?.map((image) => {
        return (
          <img
            src={`http://image.tmdb.org/t/p/w500${image.file_path}`}
            width="250px"
            alt={image.file_path}
            key={image.file_path}
          />
        );
      })}
    </div>
  );
};

export default SerieImageCarousel;
