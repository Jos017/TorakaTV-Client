import React, { useEffect, useState } from "react";

import axios from "axios";
import { styled } from "@mui/material/styles";

import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import ProgressBar from "../ProgressBar";
import StatusMenu from "../StatusMenu";
import Rating from "@mui/material/Rating";
import CardMedia from "@mui/material/CardMedia";
import { useNavigate } from "react-router-dom";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

const API_URL = process.env.REACT_APP_SERVER_URL;

const ListCard = (props) => {
  const {
    title,
    status,
    progress,
    img,
    tmdbId,
    totalProgress,
    categories,
    type,
    _id,
  } = props.info;
  const { deleteListItem, updateListItem, userSession } = props;
  const navigate = useNavigate();
  const [rating, setRating] = useState({});

  // Obtain movie rating
  useEffect(() => {
    axios
      .get(`${API_URL}/movie/${tmdbId}/ranking/${userSession._id}`)
      .then((response) => {
        if (!response.data.length) {
          const newRanking = {};
          setRating(newRanking);
        } else {
          const newRanking = response.data[0];
          setRating({ ...newRanking });
        }
      });
  }, [tmdbId, userSession]);

  // Update and create Rating
  const addRating = (newRating) => {
    const request = {
      rank: newRating,
      userId: userSession._id,
    };
    if (!rating.rank) {
      axios
        .post(`${API_URL}/movie/${tmdbId}/ranking`, request)
        .then((rankCreated) => {
          setRating({ ...rankCreated.data });
        })
        .catch((err) => console.log(err));
    } else {
      axios
        .put(`${API_URL}/movie/ranking/update/${rating._id}`, request)
        .then((rankUpdated) => {
          setRating({ ...rankUpdated.data });
        })
        .catch((err) => console.log(err));
    }
  };

  const ratingStyles = {
    '& .MuiRating-iconEmpty': {
      color: '#8b96a0',
    },
    fontSize: {xs: '1.3rem', sm: '1.5rem'}
  }

  return (
    <Grid item xs={12} md={6} padding={2}>
      <Grid
        container
        backgroundColor="#242526"
        alignItems="center"
        borderRadius="10px"
        key={_id}
      >
        <Grid item xs={4}>
          <CardMedia
            className="card-img"
            component="img"
            alt={title}
            image={img}
            sx={{ height: '100%', cursor: 'pointer' }}
            onClick={() => navigate(`/${type}/${tmdbId}`)}
          />
        </Grid>
        <Grid
          item
          xs={8}
          padding="1rem"
          display="flex"
          flexDirection="column"
          justifyContent="center"
        >
          <Stack gap={1}>
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
              <Grid
                item
                xs={12}
                display="flex"
                flexDirection={{ xs: 'column' }}
                alignItems="center"
                mb="0.5rem"
              >
                <Typography
                  variant="body2"
                  component="div"
                  textAlign={{ xs: 'center', sm: 'start' }}
                  lineHeight="2rem"
                >
                  {categories.map((category) => {
                    return (
                      <Chip
                        label={category}
                        key={category}
                        color="custom"
                        size="small"
                        sx={{ mr: 1, fontSize: { xs: '0.7rem', sm: '0.8rem' } }}
                      />
                    );
                  })}
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                display="flex"
                flexDirection={{ xs: 'column', sm: 'row' }}
                columnGap="1rem"
                justifyContent="center"
                alignItems="center"
              >
                <Rating
                  name="your-rating"
                  value={rating.rank ? rating.rank / 2 : 0}
                  precision={0.5}
                  onChange={(event, newRanking) => addRating(newRanking * 2)}
                  sx={ratingStyles}
                />
                <Typography variant="subtitle1" color="#fff">
                  <span style={{ color: '#13c6b2' }}>
                    {rating.rank ? rating.rank : 0}
                  </span>{' '}
                  / 10
                </Typography>
              </Grid>
            </Grid>
            <Stack
              spacing={1}
              alignItems="center"
              sx={{ display: { xs: 'none', sm: 'flex' } }}
            >
              <ProgressBar
                initialValue={progress}
                min={0}
                max={totalProgress}
                unit={type === 'movie' ? 'min' : 'ep'}
                updateListItem={updateListItem}
                listItemId={_id}
              />
              <Stack
                width="100%"
                direction="row"
                justifyContent="space-between"
              >
                <StatusMenu
                  updateListItem={updateListItem}
                  listItemId={_id}
                  initialStatus={status}
                />
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => deleteListItem(_id)}
                  sx={{ width: 'fit-content' }}
                >
                  Remove
                </Button>
              </Stack>
            </Stack>
          </Stack>
        </Grid>
        <Grid
          item
          padding="1rem"
          sx={{
            display: { xs: 'flex', sm: 'none' },
            borderTop: '1px solid #8b96a0',
            width: '100%',
            flexDirection: { xs: 'column', sm: 'row' },
            columnGap: '1rem',
            alignItems: 'center',
          }}
        >
          <ProgressBar
            initialValue={progress}
            min={0}
            max={totalProgress}
            unit={type === 'movie' ? 'min' : 'ep'}
            updateListItem={updateListItem}
            listItemId={_id}
          />
          <Stack width="100%" direction="row" justifyContent="space-between">
            <StatusMenu
              updateListItem={updateListItem}
              listItemId={_id}
              initialStatus={status}
            />
            <Button
              variant="outlined"
              color="error"
              onClick={() => deleteListItem(_id)}
              sx={{ width: 'fit-content' }}
            >
              Remove
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ListCard;
