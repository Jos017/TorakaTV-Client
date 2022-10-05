import "./styles.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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
import CommentInput from "../../components/CommentInput";
import CommentsList from "../../components/CommentsList";

const MovieDetailsPage = (props) => {
  const { user } = props;
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState({});
  const [trailer, setTrailer] = useState([]);

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

  const { title, genres, vote_average, poster_path, overview } = movieDetails;
  // console.log(movieDetails);
  return (
    <section className="movie-details">
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Typography variant="h2" color="#fff" fontWeight="Bold">
            {title}
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography variant="h6">GLOBAL RATING</Typography>
          <Rating
            name="globlal-rating"
            value={vote_average / 2}
            precision={0.5}
          />
          <Typography variant="subtitle1" color="#fff">
            {vote_average?.toFixed(2)} / 10
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography variant="h6">YOUR RATING</Typography>
          <Rating name="your-rating" value={5} precision={0.5} />
          <Typography variant="subtitle1" color="#fff">
            10 / 10
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
          <Button variant="outlined" color="custom">
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
              sx={{ backgroundColor: "dodgerblue", height: "1rem" }}
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
              sx={{ backgroundColor: "dodgerblue", height: "1rem" }}
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
              sx={{ backgroundColor: "dodgerblue", height: "1rem" }}
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
              sx={{ backgroundColor: "dodgerblue", height: "1rem" }}
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
              sx={{ backgroundColor: "dodgerblue", height: "1rem" }}
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
              sx={{ backgroundColor: "dodgerblue", height: "1rem" }}
            />
          </Box>
        </Grid>
        <Grid item xs={12}>
          {user && <CommentInput movieId={movieId} />}
          <CommentsList movieId={movieId} color="#fff" />
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
              sx={{ backgroundColor: "dodgerblue", height: "1rem" }}
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
              sx={{ backgroundColor: "dodgerblue", height: "1rem" }}
            />
          </Box>
        </Grid>
        <Grid item xs={12}></Grid>
      </Grid>
    </section>
  );
};

export default MovieDetailsPage;
