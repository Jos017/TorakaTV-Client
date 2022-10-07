import axios from "axios";
import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Link from "@mui/material/Link";

const SeriesProvidersIcons = (props) => {
  const { serieId } = props;
  const [providers, setProviders] = useState([]);
  const [country, setCountry] = useState("MX");
  const providersList = {
    337: "https://www.disneyplus.com/",
    2: "https://tv.apple.com/",
    3: "https://play.google.com/store/movies/",
    8: "https://www.netflix.com",
    119: "https://www.primevideo.com/",
  };

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/tv/${serieId}/watch/providers?api_key=${process.env.REACT_APP_TMDB_API_KEY}`
      )
      .then((response) => {
        const newProviders = {
          buy: response.data.results[country].buy,
          subs: response.data.results[country].flatrate,
        };
        // console.log(newProviders);
        setProviders({ ...newProviders });
      });
  }, [serieId, country]);

  return (
    <>
      <Stack direction="row">
        {providers?.buy?.map((provider) => {
          return (
            <Link
              key={provider.provider_id}
              href={providersList[provider.provider_id]}
            >
              <Avatar
                alt={provider.provider_name}
                src={
                  provider.logo_path &&
                  `http://image.tmdb.org/t/p/w500${provider.logo_path}`
                }
              />
            </Link>
          );
        })}
      </Stack>
      <Stack direction="row">
        {providers?.subs?.map((provider) => {
          return (
            <Link
              key={provider.provider_id}
              href={providersList[provider.provider_id]}
            >
              <Avatar
                alt={provider.provider_name}
                src={
                  provider.logo_path &&
                  `http://image.tmdb.org/t/p/w500${provider.logo_path}`
                }
              />
            </Link>
          );
        })}
      </Stack>
    </>
  );
};

export default SeriesProvidersIcons;
