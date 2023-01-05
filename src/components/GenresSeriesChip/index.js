import React, { useState, useEffect } from "react";
import axios from "axios";
import Chip from "@mui/material/Chip";

const GenresSeriesChip = (props) => {
  const { serieGenresId } = props;
  const [genres, setGenres] = useState([]);
  const [serieGenres, setSerieGenres] = useState([]);
  const genresURL = `https://api.themoviedb.org/3/genre/tv/list?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`;

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
      const currentSerieGenres = genres.filter((genre) =>
        serieGenresId.includes(genre.id)
      );
      setSerieGenres(currentSerieGenres);
    }
  }, [genres, serieGenresId]);
  return (
    <div>
      {serieGenres.map((serieGenre) => {
        return (
          <Chip
            label={serieGenre.name}
            key={serieGenre.id}
            color="custom"
            size="small"
            sx={{ mr: 1, fontSize: {xs: '0.7rem', sm: '0.8rem'}}}
          />
        );
      })}
    </div>
  );
};

export default GenresSeriesChip;
