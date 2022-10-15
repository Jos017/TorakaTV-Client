import React from "react";
import { Link } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import MovieCreditsSubtitle from "../MovieCreditsSubtitle";
import GenresChip from "../GenresChip";

const SearchCardMovie = (props) => {
  const { id, title, overview, poster_path, vote_average, genre_ids } =
    props.movie;
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
        <Typography gutterBottom variant="h5" component="div" color="#fff">
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
          <Typography variant="body2" component={"span"} color="#8b96a0">
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
};

export default SearchCardMovie;
