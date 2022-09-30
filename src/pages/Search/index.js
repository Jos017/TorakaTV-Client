import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./styles.css";
import Sidebar from "../../components/Sidebar";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { borderRadius } from "@mui/system";

const Search = (props) => {
  const { search } = useParams();

  const [searchResult, setSearchResult] = useState([]);
  const [casts, setCasts] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&query=${search}`
      )
      .then((response) => {
        console.log(response);
        setSearchResult(response.data.results);
      })
      .catch((response) => console.log(response));
  }, [search]);

  const getCredits = (movieId) => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`
      )
      .then((castFound) => {
        const newCasts = [...casts, castFound];
        setCasts(newCasts);
        console.log(casts);
      })
      .catch((err) => console.log(err));
  };

  const getPrincipalActors = (movieId) => {
    const movieCast = casts.filter((cast) => {
      return cast.id === movieId;
    });

    return movieCast.filter((principalCast) => {
      return principalCast < 3;
    });
  };

  return (
    <div className="search">
      <Sidebar />
      Search: {props.search}
      <div className="card-container">
        {searchResult.map((movie) => {
          const { id, title, overview, poster_path } = movie;
          /* getCredits(id); */
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
                alt="green iguana"
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
                <Typography variant="body2" color="#8b96a0">
                  {overview}
                </Typography>
                <Typography variant="body2" color="#8b96a0">
                  {title}
                  {/* {console.log(getPrincipalActors(id))} */}
                </Typography>
                <Button
                  size="small"
                  variant="contained"
                  color="custom"
                  sx={{ width: "fit-content" }}
                >
                  Learn More
                </Button>
              </Stack>
            </Stack>
          );
        })}
      </div>
    </div>
  );
};

export default Search;
