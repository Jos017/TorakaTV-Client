import React from "react";
import { Link } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import MovieCreditsSubtitle from "../MovieCreditsSubtitle";
import GenresChip from "../GenresChip";
import Grid from "@mui/material/Grid";

const SearchCardMovie = (props) => {
  const { id, title, overview, poster_path, vote_average, genre_ids } =
    props.movie;
  return (
    <Grid
      container
      backgroundColor="#242526"
      width={{ xs: '90%', md: '75%', xl: '45%' }}
      borderRadius="10px"
      overflow="hidden"
      key={id}
    >
      <Grid item xs={4}>
        <CardMedia
          className="card-img"
          component="img"
          alt={title}
          image={`http://image.tmdb.org/t/p/w500${poster_path}`}
          sx={{ height: '100%' }}
        />
      </Grid>
      <Grid
        item
        xs={8}
        padding="1rem"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
      >
        <Stack rowGap={1}>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            color="#fff"
            sx={{ fontSize: { xs: '1rem', sm: '1.6rem' } }}
          >
            {title}
          </Typography>
          <Grid container>
            <Grid item xs={12} sm={8}>
              <GenresChip movieGenresId={genre_ids} />
            </Grid>
            <Grid
              item
              xs={12}
              sm={4}
              display="flex"
              flexDirection="row"
              alignItems="center"
            >
              <Rating value={vote_average / 10} max={1} />
              <Typography variant="subtitle2" color="#fff">
                {vote_average}/<span style={{ color: '#8b96a0' }}>10</span>
              </Typography>
            </Grid>
          </Grid>
          <Stack spacing={1} sx={{ display: { xs: 'none', sm: 'flex' } }}>
            <Typography variant="body2" color="#8b96a0">
              {overview}
            </Typography>
            <Typography variant="body2" component={'span'} color="#8b96a0">
              <MovieCreditsSubtitle movieId={id} />
            </Typography>
          </Stack>
        </Stack>
        <Stack
          direction="row"
          justifyContent="end"
          sx={{ display: { xs: 'none', sm: 'flex' } }}
        >
          <Link to={`/movie/${id}`} className="search-link">
            <Button
              size="small"
              variant="contained"
              color="custom"
              sx={{ width: 'fit-content' }}
            >
              More Details
            </Button>
          </Link>
        </Stack>
      </Grid>
      <Grid
        item
        padding="1rem"
        sx={{
          display: { xs: 'grid', sm: 'none' },
          borderTop: '1px solid #8b96a0',
          width: '100%',
        }}
      >
        <Typography
          variant="body2"
          component={'span'}
          color="#8b96a0"
          sx={{ fontSize: { xs: '0.7rem', sm: '0.8rem' } }}
        >
          <MovieCreditsSubtitle movieId={id} />
        </Typography>
        <Stack alignItems="flex-end" paddingRight="1rem" marginTop="1rem">
          <Link to={`/movie/${id}`} className="search-link">
            <Button
              size="small"
              variant="contained"
              color="custom"
              sx={{ width: 'fit-content', fontSize: '0.7rem' }}
            >
              More Details
            </Button>
          </Link>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default SearchCardMovie;
