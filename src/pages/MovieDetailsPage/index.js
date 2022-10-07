import "./styles.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import YouTubeFrame from "../../components/YouTubeFrame";
import MovieCreditsSubtitle from "../../components/MovieCreditsSubtitle";
import ProvidersIcons from "../../components/ProvidersIcons";
import ImageCarousel from "../../components/ImageCarousel";
import CommentsList from "../../components/CommentsList";

const API_URL = process.env.REACT_APP_SERVER_URL;

const MovieDetailsPage = (props) => {
  const { user } = props;
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState({});
  const [trailer, setTrailer] = useState([]);
  const [ranking, setRanking] = useState({});
  const [listStatus, setListStatus] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`
      )
      .then((response) => setMovieDetails({ ...response.data }));
  }, [movieId]);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`
      )
      .then((response) => {
        const newTrailer = response.data.results.filter(
          (video) => video.site === "YouTube" && video.type === "Trailer"
        );
        setTrailer([...newTrailer]);
      });
  }, [movieId]);

  // Check if the movie is already added in your list
  useEffect(() => {
    axios
      .get(`${API_URL}/myList/${movieId}/${user?._id}/check`)
      .then((response) => {
        setListStatus(response.data);
      })
      .catch((err) => console.log(err));
  }, [movieId, user]);

  // Get ratings from data base
  useEffect(() => {
    axios
      .get(`${API_URL}/movie/${movieId}/ranking/${user?._id}`)
      .then((response) => {
        if (!response.data.length) {
          const newRanking = {};
          setRanking(newRanking);
        } else {
          const newRanking = response.data[0];
          setRanking({ ...newRanking });
        }
      });
  }, [movieId, user]);

  const addToWatchList = (movieInfo) => {
    const { title, genres, runtime, poster_path } = movieInfo;
    // console.log(title, genres, runtime, poster_path);

    if (!listStatus) {
      const categories = genres.map((genre) => genre.name);

      const request = {
        title,
        categories,
        progress: 0,
        totalProgress: runtime,
        ranking: 0,
        img: `http://image.tmdb.org/t/p/w500${poster_path}`,
        type: "movie",
        userId: user?._id,
      };

      axios
        .post(`${API_URL}/myList/${movieId}/add`, request)
        .then((response) => {
          navigate("/myList");
        })
        .catch((err) => console.log(err));
    } else {
      navigate("/myList");
    }
  };

  const addRating = (newRating) => {
    const request = {
      rank: newRating,
      userId: user?._id,
    };
    if (!ranking.rank) {
      console.log("creando ranking", newRating);
      axios
        .post(`${API_URL}/movie/${movieId}/ranking`, request)
        .then((rankCreated) => {
          console.log(rankCreated);
          setRanking({ ...rankCreated.data });
        })
        .catch((err) => console.log(err));
    } else {
      axios
        .put(`${API_URL}/movie/ranking/update/${ranking._id}`, request)
        .then((rankUpdated) => {
          setRanking({ ...rankUpdated.data });
        })
        .catch((err) => console.log(err));
    }
  };

  const { title, genres, vote_average, poster_path, overview } = movieDetails;
  // console.log(movieDetails);
  // console.log(poster_path);
  return (
    <section className="movie-details">
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Typography variant="h2" color="#fff" fontWeight="Bold">
            {title}
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography variant="h6" color="#fff">
            GLOBAL RATING
          </Typography>
          <Rating
            name="globlal-rating"
            value={vote_average / 2}
            precision={0.5}
            readOnly
          />
          <Typography variant="subtitle1" color="#fff">
            {vote_average?.toFixed(2)} / 10
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography variant="h6" color="#fff">
            YOUR RATING
          </Typography>
          <Rating
            name="your-rating"
            value={ranking.rank ? ranking.rank / 2 : 0}
            precision={0.5}
            onChange={(event, newRanking) => addRating(newRanking * 2)}
          />
          <Typography variant="subtitle1" color="#fff">
            {ranking.rank ? ranking.rank : 0} / 10
          </Typography>
        </Grid>
        <Grid item xs={12}>
          {genres?.map((genre) => {
            return (
              <Chip
                label={genre.name}
                key={genre.id}
                color="custom"
                size="small"
                sx={{ mr: 1 }}
              />
            );
          })}
        </Grid>
        <Grid item xs={4}>
          <img
            width="100%"
            src={poster_path && `http://image.tmdb.org/t/p/w500${poster_path}`}
            alt={title}
          />
        </Grid>
        <Grid item xs={8}>
          <YouTubeFrame videoKey={trailer[0]?.key} />
        </Grid>
        <Grid item xs={8}>
          <Typography variant="h4" color="#fff">
            Synopsis
          </Typography>
          <Typography variant="body1" color="#fff">
            {overview}
          </Typography>
          <Typography variant="body2" component={"span"} color="#8b96a0">
            <MovieCreditsSubtitle movieId={movieId} />
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Button
            variant="outlined"
            color="custom"
            onClick={() => addToWatchList(movieDetails)}
          >
            + Add to your List
          </Button>
          <Button variant="outlined" color="custom">
            Program into your calendar
          </Button>
        </Grid>
        <Grid item xs={1}>
          <Box
            sx={{
              pt: "0.5rem",
              display: "grid",
              gridTemplateColumns: "1fr",
            }}
          >
            <Paper
              elevation={3}
              sx={{ backgroundColor: "#13c6b2", height: "1rem" }}
            />
          </Box>
        </Grid>
        <Grid item xs="auto">
          <Typography variant="h5" color="#fff">
            WHERE TO WATCH
          </Typography>
        </Grid>
        <Grid item xs>
          <Box
            sx={{
              pt: "0.5rem",
              display: "grid",
              gridTemplateColumns: "1fr",
            }}
          >
            <Paper
              elevation={3}
              sx={{ backgroundColor: "#13c6b2", height: "1rem" }}
            />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <ProvidersIcons movieId={movieId} />
        </Grid>
        <Grid item xs={1}>
          <Box
            sx={{
              pt: "0.5rem",
              display: "grid",
              gridTemplateColumns: "1fr",
            }}
          >
            <Paper
              elevation={3}
              sx={{ backgroundColor: "#13c6b2", height: "1rem" }}
            />
          </Box>
        </Grid>
        <Grid item xs="auto">
          <Typography variant="h5" color="#fff">
            {title?.toUpperCase()} PHOTOS
          </Typography>
        </Grid>
        <Grid item xs>
          <Box
            sx={{
              pt: "0.5rem",
              display: "grid",
              gridTemplateColumns: "1fr",
            }}
          >
            <Paper
              elevation={3}
              sx={{ backgroundColor: "#13c6b2", height: "1rem" }}
            />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <ImageCarousel movieId={movieId} />
        </Grid>
        <Grid item xs={1}>
          <Box
            sx={{
              pt: "0.5rem",
              display: "grid",
              gridTemplateColumns: "1fr",
            }}
          >
            <Paper
              elevation={3}
              sx={{ backgroundColor: "#13c6b2", height: "1rem" }}
            />
          </Box>
        </Grid>
        <Grid item xs="auto">
          <Typography variant="h5" color="#fff">
            COMMENTS
          </Typography>
        </Grid>
        <Grid item xs>
          <Box
            sx={{
              pt: "0.5rem",
              display: "grid",
              gridTemplateColumns: "1fr",
            }}
          >
            <Paper
              elevation={3}
              sx={{ backgroundColor: "#13c6b2", height: "1rem" }}
            />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <CommentsList movieId={movieId} color="#fff" userSession={user} />
        </Grid>
        <Grid item xs={1}>
          <Box
            sx={{
              pt: "0.5rem",
              display: "grid",
              gridTemplateColumns: "1fr",
            }}
          >
            <Paper
              elevation={3}
              sx={{ backgroundColor: "#13c6b2", height: "1rem" }}
            />
          </Box>
        </Grid>
        <Grid item xs="auto">
          <Typography variant="h5" color="#fff">
            TOP CAST
          </Typography>
        </Grid>
        <Grid item xs>
          <Box
            sx={{
              pt: "0.5rem",
              display: "grid",
              gridTemplateColumns: "1fr",
            }}
          >
            <Paper
              elevation={3}
              sx={{ backgroundColor: "#13c6b2", height: "1rem" }}
            />
          </Box>
        </Grid>
        <Grid item xs={12}></Grid>
      </Grid>
    </section>
  );
};

export default MovieDetailsPage;
