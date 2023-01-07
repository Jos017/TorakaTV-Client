import React from "react";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import Stack from "@mui/material/Stack";

const ProgressBar = (props) => {
  const { title, min, max, initialValue, unit, updateListItem, listItemId } =
    props;
  const [value, setValue] = React.useState(initialValue);
  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '80%' }}>
      <Typography id="input-slider" gutterBottom>
        {title}
      </Typography>
      <Grid container spacing={0} alignItems="center">
        <Grid item xs={12}>
          <Slider
            value={typeof value === "number" ? value : 0}
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
            min={min}
            max={max}
            color="custom"
            onChangeCommitted={() =>
              updateListItem(listItemId, { progress: value })
            }
          />
        </Grid>
        <Grid item xs={12}>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body1" component="div" color="#fff">
              {value} {unit}
            </Typography>
            <Typography variant="body1" component="div" color="#fff">
              {max} {unit}
            </Typography>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProgressBar;
