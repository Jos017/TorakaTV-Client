import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./styles.css";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import SearchCardMovie from "../../components/SearchCardMovie";
import SearchCardSerie from "../../components/SearchCardSerie";
import SearchSkeleton from "../../components/SearchSkeleton";

const Search = (props) => {
  const { search } = useParams();

  const [searchResult, setSearchResult] = useState([]);
  const [serieSearch, setSerieSearch] = useState([]);
  const [isLoadingMovies, setIsLoadingMovies] = useState(false);
  const [isLoadingSeries, setIsLoadingSeries] = useState(false);

  useEffect(() => {
    const movieSearch = () => {
      setIsLoadingMovies(true);
      axios
        .get(
          `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&query=${search}`
        )
        .then((response) => {
          setSearchResult(response.data.results);
          setIsLoadingMovies(false);
        })
        .catch((err) => console.log(err));
    };
    movieSearch();
  }, [search]);

  useEffect(() => {
    const searchSerie = () => {
      setIsLoadingSeries();
      axios
        .get(
          `https://api.themoviedb.org/3/search/tv?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&query=${search}`
        )
        .then((response) => {
          setSerieSearch(response.data.results);
          setIsLoadingSeries();
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
        <Typography variant="h2" color="#fff" fontWeight="bold">
          Your Search Result
        </Typography>
      </Stack>
      <Typography
        variant="h4"
        component="h3"
        color="#fff"
        mb={2}
        textAlign="center"
        fontWeight="bold"
      >
        Movies
      </Typography>
      <div className="card-container" style={{ marginBottom: "2rem" }}>
        {isLoadingMovies ? (
          <>
            <SearchSkeleton />
            <SearchSkeleton />
          </>
        ) : (
          <>
            {searchResult.map((movie) => {
              return <SearchCardMovie key={movie.id} movie={movie} />;
            })}
          </>
        )}
      </div>
      <Typography
        variant="h4"
        component="h3"
        color="#fff"
        mb={2}
        textAlign="center"
        fontWeight="bold"
      >
        Series
      </Typography>
      <div className="card-container">
        {isLoadingSeries ? (
          <>
            <SearchSkeleton />
            <SearchSkeleton />
          </>
        ) : (
          <>
            {serieSearch.map((serie) => {
              return <SearchCardSerie key={serie.id} serie={serie} />;
            })}
          </>
        )}
      </div>
    </div>
  );
};

export default Search;
