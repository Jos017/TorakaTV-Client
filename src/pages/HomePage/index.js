import "./styles.css";
import { Link } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typograpy from "@mui/material/Typography";
import trackImg from "../../images/track-image.jpg";

function HomePage() {
  return (
    <div className="home">
      <section className="hero">
        <Typograpy
          variant="h1"
          component="h2"
          fontWeight="bold"
          width={{ xs: "90%", md: "80rem" }}
        >
          Never forget your watching list again
        </Typograpy>
        <Typograpy variant="subtitle">
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
        <Stack direction="row">
          <div className="track-image">
            <img src={trackImg} alt="Tracking movies"></img>
          </div>
          <Stack>
            <Typograpy
              variant="h1"
              component="h2"
              fontWeight="bold"
              width={{ xs: "90%", md: "80rem" }}
            >
              Track your movies and series
            </Typograpy>
            <Typograpy variant="subtitle">
              Track every TV show and movie you watch and never leave a movie
              incomplete
            </Typograpy>
          </Stack>
        </Stack>
      </section>
    </div>
  );
}

export default HomePage;
