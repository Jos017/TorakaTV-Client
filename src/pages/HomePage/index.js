import './styles.css';
import { Link } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typograpy from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import trackImg from '../../images/track-image.jpg';

function HomePage() {
  return (
    <div className="home">
      <section className="hero">
        <Typograpy
          variant="h1"
          component="h2"
          fontWeight="bold"
          sx={{
            width: { xs: '90%', md: '50rem' },
            margin: '1rem 0',
            fontSize: { xs: '2rem', md: '5rem' },
          }}
        >
          Never forget your watching list again
        </Typograpy>
        <Typograpy variant="subtitle" width={'90%'}>
          Save an schedule your movies and TV series with us
        </Typograpy>
        <Stack spacing={2} direction="row" margin={2}>
          <a href="#track-section" className="link">
            <Button variant="outlined" color="custom">
              Learn more
            </Button>
          </a>
          <Link to="/auth/login" className="link">
            <Button variant="contained" color="custom">
              Get Started
            </Button>
          </Link>
        </Stack>
      </section>
      <section className="track-section" id="track-section">
        <Box width="100%">
          <Grid container maxWidth="1280px" margin="0 auto">
            <Grid item xs={12} md={4} spacing={2}>
              <div className="track-image" style={{ margin: '1rem auto' }}>
                <img src={trackImg} alt="Tracking movies"></img>
              </div>
            </Grid>
            <Grid item xs={12} md={8}>
              <Stack
                width={'100%'}
                sx={{
                  alignItems: { xs: 'center' },
                  textAlign: 'center',
                }}
              >
                <Typograpy
                  variant="h1"
                  component="h2"
                  fontWeight="bold"
                  sx={{
                    width: '90%',
                    margin: '1rem 0',
                    fontSize: { xs: '2rem', md: '5rem' },
                  }}
                >
                  Track your movies and series
                </Typograpy>
                <Typograpy variant="subtitle">
                  Track every TV show and movie you watch and never leave a
                  movie incomplete
                </Typograpy>
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </section>
    </div>
  );
}

export default HomePage;
