import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./styles.css";
import Sidebar from "../../components/Sidebar";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MovieCreditsSubtitle from "../../components/MovieCreditsSubtitle";
import { Rating } from "@mui/material";

const Search = (props) => {
  const { search } = useParams();

  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    const movieSearch = async () => {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&query=${search}`
      );
      setSearchResult(response.data.results);
    };
    movieSearch();
  }, [search]);

  return (
    <div className="search">
      <Sidebar />
      Search: {props.search}
      <div className="card-container">
        {searchResult.map((movie) => {
          const { id, title, overview, poster_path } = movie;
          return (
            <Stack
              direction="row"
              backgroundColor="#2B303D"
              width={{ xs: "90%", md: "75%", xl: "45%" }}
              borderRadius="10px"
              key={id}
            >
              <CardMedia
                component="img"
                alt={title}
                image={`http://image.tmdb.org/t/p/w500${poster_path}`}
                sx={{ width: 200, borderRadius: "10px 0 0 10px" }}
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
                <Rating value={4} readOnly />
                <Typography variant="body2" color="#8b96a0">
                  {overview}
                </Typography>
                <Typography variant="body2" component={"span"} color="#8b96a0">
                  <MovieCreditsSubtitle movieId={id} />
                </Typography>
                <Link to={`/movie/${id}`}>
                  <Button
                    size="small"
                    variant="contained"
                    color="custom"
                    sx={{ width: "fit-content" }}
                  >
                    Learn More
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
