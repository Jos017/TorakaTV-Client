import React, { useState, useEffect } from "react";
import axios from "axios";
import Chip from "@mui/material/Chip";

const GenresChip = (props) => {
  const { movieGenresId } = props;
  const [genres, setGenres] = useState([]);
  const [movieGenres, setMovieGenres] = useState([]);
  const genresURL = `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`;

  useEffect(() => {
    axios
      .get(genresURL)
      .then((response) => {
        setGenres([...response.data.genres]);
      })
      .catch((err) => console.log(err));
  }, [genresURL]);

  useEffect(() => {
    if (genres.length) {
      const currentMovieGenres = genres.filter((genre) =>
        movieGenresId.includes(genre.id)
      );
      setMovieGenres(currentMovieGenres);
    }
  }, [genres, movieGenresId]);
  return (
    <div>
      {movieGenres.map((movieGenre) => {
        return (
          <Chip
            label={movieGenre.name}
            key={movieGenre.id}
            color="custom"
            size="small"
            sx={{ mr: 1 }}
          />
        );
      })}
    </div>
  );
};

export default GenresChip;
