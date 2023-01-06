import "./styles.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import YouTubeFrame from "../../components/YouTubeFrame";
import MovieCreditsSubtitle from "../../components/MovieCreditsSubtitle";
import ProvidersIcons from "../../components/ProvidersIcons";
import ImageCarousel from "../../components/ImageCarousel";
import CommentsList from "../../components/CommentsList";
import SectionTitle from "../../components/SectionTitle";

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
      axios
        .post(`${API_URL}/movie/${movieId}/ranking`, request)
        .then((rankCreated) => {
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
  
  const ratingStyles = {
    '& .MuiRating-iconEmpty': {
      color: '#8b96a0',
    },
    fontSize: {xs: '1.3rem', sm: '1.5rem'}
  }

  return (
    <section className="movie-details">
      <Grid
        container
        rowSpacing={2}
        columnSpacing={{ xs: 0, md: 2 }}
        maxWidth="1440px"
      >
        <Grid item xs={12} marginTop={{ xs: 8, sm: 1 }}>
          <Typography
            variant="h2"
            color="#fff"
            fontWeight="Bold"
            fontSize={{ xs: '2rem', md: '3rem' }}
          >
            {title}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6} height={{ xs: '200px', sm: '350px' }}>
          <YouTubeFrame videoKey={trailer[0]?.key} />
        </Grid>
        <Grid container item xs={12} md={6}>
          <Grid
            item
            xs={12}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            pl={{ md: '2rem' }}
          >
            <Typography
              variant="h6"
              color="#fff"
              fontSize={{ xs: '0.8rem', md: '1.2rem' }}
            >
              GENRES
            </Typography>
            <Box>
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
            </Box>
          </Grid>
          <Grid
            container
            item
            xs={12}
            backgroundColor="#2C2C2C"
            borderRadius="8px"
            mt={{ xs: '1rem', md: 0 }}
            padding="1rem"
          >
            <Grid
              item
              xs={6}
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
            >
              <Typography
                variant="h6"
                color="#fff"
                fontSize={{ xs: '0.8rem', md: '1.2rem' }}
              >
                GLOBAL RATING
              </Typography>
              <Rating
                name="globlal-rating"
                value={vote_average / 2}
                precision={0.5}
                readOnly
                sx={ratingStyles}
              />
              <Typography variant="subtitle1" color="#fff">
                <span style={{ color: '#13c6b2' }}>
                  {vote_average?.toFixed(2)}
                </span>{' '}
                / 10
              </Typography>
            </Grid>
            <Grid
              item
              xs={6}
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
            >
              <Typography
                variant="h6"
                color="#fff"
                fontSize={{ xs: '0.8rem', md: '1.2rem' }}
              >
                YOUR RATING
              </Typography>
              <Rating
                name="your-rating"
                value={ranking.rank ? ranking.rank / 2 : 0}
                precision={0.5}
                onChange={(event, newRanking) => addRating(newRanking * 2)}
                sx={ratingStyles}
              />
              <Typography variant="subtitle1" color="#fff">
                <span style={{ color: '#13c6b2' }}>
                  {ranking.rank ? ranking.rank : 0}
                </span>{' '}
                / 10
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid container item xs={12}>
          <SectionTitle>MOVIE INFO</SectionTitle>
        </Grid>
        <Grid item xs={12} sm={2} xl="auto" pr={'1rem'} maxHeight>
          <Box sx={{ maxWidth: '100%', height: '100%' }}>
            <img
              width="100%"
              height="100%"
              src={
                poster_path
                  ? `http://image.tmdb.org/t/p/w500${poster_path}`
                  : '../../images/notAvailable.jpg'
              }
              alt={title}
              style={{ objectFit: 'contain', maxHeight: '250px' }}
            />
          </Box>
        </Grid>
        <Grid item xs alignSelf="center">
          <Typography variant="h5" color="#fff">
            Synopsis
          </Typography>
          <Typography
            variant="body1"
            color="#8b96a0"
            fontSize={{ xs: '0.8rem', sm: '0.9rem' }}
          >
            {overview}
          </Typography>
          <Typography
            variant="body2"
            component={'span'}
            color="#8b96a0"
            display={{ xs: 'none', md: 'grid' }}
          >
            <MovieCreditsSubtitle movieId={movieId} />
          </Typography>
        </Grid>
        <Grid item xs={12} display={{ xs: 'grid', md: 'none' }}>
          <Typography variant="body2" component={'span'} color="#8b96a0">
            <MovieCreditsSubtitle movieId={movieId} />
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          md="auto"
          display="flex"
          alignItems="center"
          justifyContent={{ xs: 'center', sm: 'flex-end' }}
        >
          {user && (
            <Button
              variant="outlined"
              color="custom"
              onClick={() => addToWatchList(movieDetails)}
            >
              + Add to your List
            </Button>
          )}
        </Grid>
        <Grid container item xs={12}>
          <SectionTitle>WHERE TO WATCH</SectionTitle>
        </Grid>
        <Grid item xs={12}>
          <ProvidersIcons movieId={movieId} />
        </Grid>
        <Grid container item xs={12}>
          <SectionTitle>{title?.toUpperCase()} PHOTOS</SectionTitle>
        </Grid>
        <Grid item xs={12}>
          <ImageCarousel movieId={movieId} />
        </Grid>
        <Grid container item xs={12}>
          <SectionTitle>COMMENTS</SectionTitle>
        </Grid>
        <Grid item xs={12}>
          <CommentsList movieId={movieId} color="#fff" userSession={user} />
        </Grid>
      </Grid>
    </section>
  );
};

export default MovieDetailsPage;
