import React, { useEffect, useState } from "react";
import {
  GridList,
  GridListTile,
  GridListTileBar,
  Typography,
} from "@material-ui/core";
import "./Details.css";
import YouTube from "react-youtube";
import { StarBorder } from "@material-ui/icons";

const Details = ({ baseUrl, match, history }) => {
  const [movie, setMovie] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`${baseUrl}movies/${match.params.id}`);
      const data = await res.json();
      setMovie(data);
    };

    fetchData();
  }, []);

  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      autoplay: 0,
    },
  };

  const videoId =
    movie && movie.trailer_url && movie.trailer_url.split("v=")[1];

  return movie ? (
    <React.Fragment>
      <Typography
        onClick={() => {
          history.push("/");
        }}
        className="back-button"
      >
        {`< Back to Home`}
      </Typography>
      <div className="details-container">
        <div className="left">
          <img src={movie.poster_url} alt="poster" />
        </div>
        <div className="middle">
          <Typography variant="h2">{movie.title}</Typography>
          <Typography>
            <strong>Genre: </strong> {movie.genres && movie.genres.join(", ")}
          </Typography>
          <Typography>
            <strong>Duration: </strong> {movie.duration}
          </Typography>
          <Typography>
            <strong>Release Date: </strong> {movie.release_date}
          </Typography>
          <Typography>
            <strong>Rating: </strong> {movie.rating}
          </Typography>
          <Typography style={{ marginTop: 16 }}>
            <strong>Plot: </strong> (
            <a href={movie.wiki_url} target="_blank">
              Wiki Link
            </a>
            {") "}
            {movie.storyline}
          </Typography>
          <Typography style={{ marginTop: 16 }}>
            <strong>Trailer: </strong>
          </Typography>
          <YouTube videoId={videoId} opts={opts} onReady={this._onReady} />;
        </div>
        <div className="right">
          <Typography>
            <strong>Rate this movie:</strong>
          </Typography>
          <div className="rating-container">
            <StarBorder />
            <StarBorder />
            <StarBorder />
            <StarBorder />
            <StarBorder />
          </div>
          <Typography style={{ marginTop: 16 }}>
            <strong>Artists:</strong>
          </Typography>
          {movie.artists && (
            <GridList cols={2}>
              {movie.artists.map((artist) => (
                <GridListTile style={{ cursor: "pointer" }} key={artist.id}>
                  <img src={artist.profile_url} alt={artist.first_name} />
                  <GridListTileBar
                    title={`${artist.first_name} ${artist.last_name}`}
                  />
                </GridListTile>
              ))}
            </GridList>
          )}
        </div>
      </div>
    </React.Fragment>
  ) : null;
};

export default Details;
