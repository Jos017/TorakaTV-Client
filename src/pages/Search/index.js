import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./styles.css";
import Sidebar from "../../components/Sidebar";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const Search = (props) => {
  const { search } = useParams();

  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&query=${search}`
      )
      .then((response) => {
        console.log(response);
        setSearchResult(response.data.results);
      })
      .catch((response) => console.log(response));
  }, [search]);

  return (
    <div className="search">
      <Sidebar />
      Search: {props.search}
      <div className="card-container">
        {searchResult.map((movie) => {
          const { id, title, overview, poster_path } = movie;
          return (
            <Card sx={{ maxWidth: 500, display: "flex" }} key={id}>
              <CardMedia
                component="img"
                alt="green iguana"
                height="140"
                image={`http://image.tmdb.org/t/p/w500${poster_path}`}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {overview}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Learn More</Button>
              </CardActions>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Search;
