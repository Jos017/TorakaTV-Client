import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./styles.css";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MovieCreditsSubtitle from "../../components/MovieCreditsSubtitle";
import SerieCreditsSubtitle from "../../components/SerieCreditsSubtitle";
import Rating from "@mui/material/Rating";
import GenresChip from "../../components/GenresChip";
import GenresSeriesChip from "../../components/GenresSeriesChip";

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
          My Profile
        </Typography>
      </Stack>
      <div className="card-container">
        {searchResult.map((movie) => {
          const { id, title, overview, poster_path, vote_average, genre_ids } =
            movie;
          return (
            <Stack
              direction={{ xs: "column", sm: "row" }}
              backgroundColor="#242526"
              width={{ xs: "90%", md: "75%", xl: "45%" }}
              height={{ xs: "auto", md: "fit-contain" }}
              borderRadius="10px"
              overflow="hidden"
              key={id}
            >
              <CardMedia
                className="card-img"
                component="img"
                alt={title}
                image={`http://image.tmdb.org/t/p/w500${poster_path}`}
                sx={{ width: 200 }}
              />

              <Stack justifyContent="space-between" padding="1rem">
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  color="#fff"
                >
                  {title}
                </Typography>
                <Stack direction="row" spacing={1}>
                  <GenresChip movieGenresId={genre_ids} />
                  <Rating value={vote_average / 10} max={1} />
                  <Typography variant="subtitle2" color="#fff">
                    {vote_average}/<span style={{ color: "#8b96a0" }}>10</span>
                  </Typography>
                </Stack>
                <Stack>
                  <Typography variant="body2" color="#8b96a0">
                    {overview}
                  </Typography>
                  <Typography
                    variant="body2"
                    component={"span"}
                    color="#8b96a0"
                  >
                    <MovieCreditsSubtitle movieId={id} />
                  </Typography>
                </Stack>
                <Link to={`/movie/${id}`} className="search-link">
                  <Button
                    size="small"
                    variant="contained"
                    color="custom"
                    sx={{ width: "fit-content" }}
                  >
                    More Details
                  </Button>
                </Link>
              </Stack>
            </Stack>
          );
        })}
      </div>
      <div className="card-container">
        {serieSearch.map((serie) => {
          const { id, name, overview, poster_path, vote_average, genre_ids } =
            serie;
          return (
            <Stack
              direction={{ xs: "column", sm: "row" }}
              backgroundColor="#242526"
              width={{ xs: "90%", md: "75%", xl: "45%" }}
              height={{ xs: "auto", md: "fit-contain" }}
              borderRadius="10px"
              overflow="hidden"
              key={id}
            >
              <CardMedia
                className="card-img"
                component="img"
                alt={name}
                image={`http://image.tmdb.org/t/p/w500${poster_path}`}
                sx={{ width: 200 }}
              />

              <Stack justifyContent="space-between" padding="1rem">
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  color="#fff"
                >
                  {name}
                </Typography>
                <Stack direction="row" spacing={1}>
                  <GenresSeriesChip serieGenresId={genre_ids} />
                  <Rating value={vote_average / 10} max={1} />
                  <Typography variant="subtitle2" color="#fff">
                    {vote_average}/<span style={{ color: "#8b96a0" }}>10</span>
                  </Typography>
                </Stack>
                <Stack>
                  <Typography variant="body2" color="#8b96a0">
                    {overview}
                  </Typography>
                  <Typography
                    variant="body2"
                    component={"span"}
                    color="#8b96a0"
                  >
                    <SerieCreditsSubtitle serieId={id} />
                  </Typography>
                </Stack>
                <Link to={`/serie/${id}`} className="search-link">
                  <Button
                    size="small"
                    variant="contained"
                    color="custom"
                    sx={{ width: "fit-content" }}
                  >
                    More Details
                  </Button>
                </Link>
              </Stack>
            </Stack>
          );
        })}
      </div>
    </div>
  );
};

export default Search;
