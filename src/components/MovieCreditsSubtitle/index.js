import axios from "axios";
import React, { useEffect, useState } from "react";

const MovieCreditsSubtitle = (props) => {
  const [credits, setCredits] = useState({});
  const [principalCast, setPrincipalCast] = useState([]);
  const [director, setDirector] = useState([]);
  const { movieId } = props;
  const moviesURL = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`;

  useEffect(() => {
    axios.get(moviesURL).then((response) => {
      setCredits({ ...response.data });
    });
  }, [moviesURL]);

  useEffect(() => {
    if (credits.cast || credits.crew) {
      const newCast = credits.cast.filter((cast) => cast.order <= 3);
      credits.cast && setPrincipalCast([...newCast]);
      const newDirector = credits.crew.filter(
        (crew) => crew.job === "Director"
      );
      credits.crew && setDirector([...newDirector]);
    }
  }, [credits]);
  return (
    <div>
      {credits?.cast?.length ? (
        <p>
          <span style={{ color: "#13c6b2" }}>Cast:</span>{" "}
          {principalCast.map((cast, index) => {
            return (index ? " • " : "") + cast.name;
          })}
        </p>
      ) : (
        <p></p>
      )}
      {director.length ? (
        <p>
          <span style={{ color: "#13c6b2" }}>Director:</span>{" "}
          {director.map((director, index) => {
            return (index ? " • " : "") + director.name;
          })}
        </p>
      ) : (
        <p></p>
      )}
    </div>
  );
};

export default MovieCreditsSubtitle;
