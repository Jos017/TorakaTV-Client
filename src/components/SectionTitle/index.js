import React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const SectionTitle = ({ children }) => {
  return (
    <React.Fragment>
      <Grid item xs={1}>
        <Box
          sx={{
            pt: '0.5rem',
            display: 'grid',
            gridTemplateColumns: '1fr',
          }}
        >
          <Paper
            elevation={3}
            sx={{ backgroundColor: '#13c6b2', height: '1rem' }}
          />
        </Box>
      </Grid>
      <Grid item xs="auto" px="0.6rem">
        <Typography variant="h5" color="#fff">
          {children}
        </Typography>
      </Grid>
      <Grid item xs>
        <Box
          sx={{
            pt: '0.5rem',
            display: 'grid',
            gridTemplateColumns: '1fr',
          }}
        >
          <Paper
            elevation={3}
            sx={{ backgroundColor: '#13c6b2', height: '1rem' }}
          />
        </Box>
      </Grid>
    </React.Fragment>
  );
};

export default SectionTitle;
