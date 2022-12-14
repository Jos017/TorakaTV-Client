import axios from "axios";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";

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
          return index <= 9;
        });
        setImages([...newImages]);
      });
  }, [serieId]);
  return (
    <Box display="flex" justifyContent="center" flexWrap="wrap" gap={1}>
      {images?.map((image) => {
        return (
          <a
            href={`http://image.tmdb.org/t/p/w500${image.file_path}`}
            key={image.file_path}
          >
            <img
              src={`http://image.tmdb.org/t/p/w500${image.file_path}`}
              width="250px"
              alt={image.file_path}
            />
          </a>
        );
      })}
    </Box>
  );
};

export default SerieImageCarousel;
