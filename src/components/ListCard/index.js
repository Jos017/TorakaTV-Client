import React from "react";

import { styled } from "@mui/material/styles";

import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import ProgressBar from "../ProgressBar";
import StatusMenu from "../StatusMenu";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

const ListCard = (props) => {
  const {
    title,
    status,
    progress,
    ranking,
    img,
    totalProgress,
    categories,
    _id,
  } = props.info;
  const { deleteListItem, updateListItem } = props;
  return (
    <Paper
      sx={{
        p: 2,
        margin: "1rem auto",
        maxWidth: 500,
        flexGrow: 1,
        backgroundColor: "#242526",
        color: "#fff",
      }}
    >
      <Grid container spacing={2} position="relative">
        <Grid item>
          <Stack sx={{ width: 128, height: 180 }}>
            <Img alt="complex" src={img} width="auto" height="100%" />
            <StatusMenu
              updateListItem={updateListItem}
              listItemId={_id}
              initialStatus={status}
            />
          </Stack>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={1}>
            <Grid item xs>
              <Typography gutterBottom variant="h5" component="div">
                {title}
              </Typography>
              <Typography variant="body2">Ranking: {ranking}</Typography>
              <Typography
                variant="body2"
                component="div"
                gutterBottom
                sx={{ borderBottom: "1px solid #fff" }}
              >
                {categories.map((category) => {
                  return (
                    <Chip
                      label={category}
                      key={category}
                      color="custom"
                      size="small"
                      sx={{ mr: 1 }}
                    />
                  );
                })}
              </Typography>
            </Grid>
            <Grid item xs>
              <ProgressBar
                title="My progress"
                initialValue={progress}
                min={0}
                max={totalProgress}
                unit="min"
                updateListItem={updateListItem}
                listItemId={_id}
              />
            </Grid>
            <Grid item>
              <Stack direction="row" justifyContent="flex-end">
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => deleteListItem(_id)}
                  sx={{ width: "fit-content" }}
                >
                  Remove
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ListCard;
