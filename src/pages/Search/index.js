import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./styles.css";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import SearchCardMovie from "../../components/SearchCardMovie";
import SearchCardSerie from "../../components/SearchCardSerie";

const Search = (props) => {
  const { search } = useParams();

  const [searchResult, setSearchResult] = useState([]);
  const [serieSearch, setSerieSearch] = useState([]);

  useEffect(() => {
    const movieSearch = () => {
      axios
        .get(
          `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&query=${search}`
        )
        .then((response) => {
          setSearchResult(response.data.results);
        })
        .catch((err) => console.log(err));
    };
    movieSearch();
  }, [search]);

  useEffect(() => {
    const searchSerie = () => {
      axios
        .get(
          `https://api.themoviedb.org/3/search/tv?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&query=${search}`
        )
        .then((response) => {
          setSerieSearch(response.data.results);
        })
        .catch((err) => console.log(err));
    };
    searchSerie();
  }, [search]);

  return (
    <div className="search">
      <Stack
        direction="row"
        alignItems="center"
        spacing={3}
        marginTop={{ xs: 12, sm: 1 }}
        marginBottom={3}
      >
        <Typography variant="h2" color="#fff" fontWeight="Bold">
          Your Search Result
        </Typography>
      </Stack>
      <div className="card-container">
        {searchResult.map((movie) => {
          return <SearchCardMovie key={movie.id} movie={movie} />;
        })}
      </div>
      <div className="card-container">
        {serieSearch.map((serie) => {
          return <SearchCardSerie key={serie.id} serie={serie} />;
        })}
      </div>
    </div>
  );
};

export default Search;
