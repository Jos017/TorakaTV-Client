import './styles.css';
import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

const Footer = props => {
  return (
    <footer>
      <Grid container maxWidth="1000px" width="90%">
        <Grid item xs={6} sm={2} textAlign="center">
          <Link to="/" className="link">
            Home
          </Link>
        </Grid>
        <Grid item xs={6} sm={2} textAlign="center">
          <Link to="#" className="link">
            About
          </Link>
        </Grid>
        <Grid item xs={6} sm={2} textAlign="center">
          <Link to="/" className="link">
            Movies
          </Link>
        </Grid>
        <Grid item xs={6} sm={2} textAlign="center">
          <Link to="/" className="link">
            TV Series
          </Link>
        </Grid>
        {props.user ? (
          <Grid item xs={6} sm={2} textAlign="center">
            <Button
              variant="contained"
              color="error"
              onClick={props.handleLogout}
            >
              Logout
            </Button>
          </Grid>
        ) : (
          <>
            <Grid item xs={6} sm={2} textAlign="center">
              <Link to="/auth/signup" className="link">
                Signup
              </Link>
            </Grid>
            <Grid item xs={6} sm={2} textAlign="center">
              <Link to="/auth/login" className="link">
                Log In
              </Link>
            </Grid>
          </>
        )}
      </Grid>
      <hr className="footer-divider" />
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent="space-between"
        maxWidth="1000px"
        width="95%"
        textAlign="center"
      >
        <Stack
          direction="row"
          justifyContent={{ xs: 'center', sm: 'flex-end' }}
        >
          <Typography variant="body1" margin="0.5rem 0">
            TorakaTV ©2022 All Rights Reserved.
          </Typography>
        </Stack>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent={{ xs: 'center', sm: 'flex-end' }}
          spacing={2}
        >
          <FacebookIcon fontSize="large" />
          <TwitterIcon fontSize="large" />
          <InstagramIcon fontSize="large" />
          <LinkedInIcon fontSize="large" />
        </Stack>
      </Stack>
    </footer>
  );
};

export default Footer;
