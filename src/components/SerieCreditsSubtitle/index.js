import axios from "axios";
import React, { useEffect, useState } from "react";

const SerieCreditsSubtitle = (props) => {
  const [credits, setCredits] = useState({});
  const [principalCast, setPrincipalCast] = useState([]);
  const [producer, setProducer] = useState([]);
  const { serieId } = props;
  const seriesURL = `https://api.themoviedb.org/3/tv/${serieId}/credits?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`;

  useEffect(() => {
    axios
      .get(seriesURL)
      .then((response) => {
        setCredits({ ...response.data });
      })
      .catch((err) => console.log(err));
  }, [seriesURL]);

  useEffect(() => {
    if (credits.cast || credits.crew) {
      const newCast = credits.cast.filter((cast) => cast.order <= 3);
      credits.cast && setPrincipalCast([...newCast]);
      const newProducer = credits.crew.filter(
        (crew) => crew.job === "Producer"
      );
      credits.crew && setProducer([...newProducer]);
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
      {producer.length ? (
        <p>
          <span style={{ color: "#13c6b2" }}>Producer:</span>{" "}
          {producer.map((producer, index) => {
            return (index ? " • " : "") + producer.name;
          })}
        </p>
      ) : (
        <p></p>
      )}
    </div>
  );
};

export default SerieCreditsSubtitle;
