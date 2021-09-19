import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Checkbox,
  FormControl,
  GridList,
  GridListTile,
  GridListTileBar,
  Input,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import "./Home.css";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const Home = ({ baseUrl, history }) => {
  const [publishedMovies, setPublishedMovies] = useState([]);
  const [releasedMovies, setReleasedMovies] = useState([]);
  const [genre, setGenre] = useState([]);
  const [genres, setGenres] = useState([]);
  const [artists, setArtists] = useState([]);
  const [artist, setArtist] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`${baseUrl}movies?status=PUBLISHED`);
      const data = await res.json();
      setPublishedMovies(data.movies);
    };

    const fetchGenres = async () => {
      const res = await fetch(`${baseUrl}genres`);
      const data = await res.json();
      const filteredGenres = data.genres.map((genre) => genre.genre);
      setGenres(filteredGenres);
    };

    const fetchArtist = async () => {
      const res = await fetch(`${baseUrl}artists`);
      const data = await res.json();

      const filterArtists = data.artists.map((artist) => ({
        id: artist.id,
        full_name: `${artist.first_name} ${artist.last_name}`,
      }));

      setArtists(filterArtists);
    };

    fetchData();
    fetchGenres();
    fetchArtist();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`${baseUrl}movies?status=RELEASED`);
      const data = await res.json();
      setReleasedMovies(data.movies);
    };

    fetchData();
  }, []);

  const handleMovieClick = (id) => {
    history.push(`/movie/${id}`);
  };

  return (
    <React.Fragment>
      <h1>Upcoming Movies</h1>
      <div className="gridRoot">
        <GridList cellHeight={250} className="gridList" cols={5}>
          {publishedMovies.map((movie) => (
            <GridListTile key={movie.id}>
              <img src={movie.poster_url} alt={movie.title} />
              <GridListTileBar title={movie.title} />
            </GridListTile>
          ))}
        </GridList>
      </div>

      <div className="releasedMoviesContainer">
        <div className="left gridRoot">
          <GridList cellHeight={350} cols={4}>
            {releasedMovies.map((movie) => (
              <GridListTile
                style={{ cursor: "pointer" }}
                key={movie.id}
                onClick={() => handleMovieClick(movie.id)}
              >
                <img src={movie.poster_url} alt={movie.title} />
                <GridListTileBar
                  title={movie.title}
                  subtitle={<span>Release Date: {movie.release_date}</span>}
                />
              </GridListTile>
            ))}
          </GridList>
        </div>
        <div className="right">
          <Card className="card">
            <CardHeader title="FIND MOVIES BY:" />
            <CardContent>
              <FormControl fullWidth>
                <InputLabel htmlFor="component-simple">Movie Name</InputLabel>
                <Input
                  id="component-simple"
                  // value={this.state.name}
                  // onChange={this.handleChange}
                />
              </FormControl>

              <FormControl fullWidth>
                <InputLabel htmlFor="select-multiple-checkbox">
                  Genres
                </InputLabel>
                <Select
                  multiple
                  value={genre}
                  onChange={(event) => setGenre(event.target.value)}
                  input={<Input id="select-multiple-checkbox" />}
                  renderValue={(selected) => selected.join(", ")}
                  MenuProps={MenuProps}
                >
                  {genres.map((genre, i) => (
                    <MenuItem key={i} value={genre}>
                      <Checkbox />
                      <ListItemText primary={genre} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel htmlFor="select-multiple-checkbox">
                  Artists
                </InputLabel>
                <Select
                  multiple
                  value={artist}
                  onChange={(event) => setArtist(event.target.value)}
                  input={<Input id="select-multiple-checkbox" />}
                  renderValue={(selected) => selected.join(", ")}
                  MenuProps={MenuProps}
                >
                  {artists.map((artist) => (
                    <MenuItem key={artist.id} value={artist.full_name}>
                      <Checkbox />
                      <ListItemText primary={artist.full_name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <TextField
                  id="release-date"
                  type="date"
                  label="Release Date Start"
                  defaultValue="19-09-2021"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  // value={this.state.name}
                  // onChange={this.handleChange}
                />
              </FormControl>

              <FormControl fullWidth>
                <TextField
                  id="release-end"
                  type="date"
                  label="Release Date End"
                  defaultValue="19-09-2021"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  // value={this.state.name}
                  // onChange={this.handleChange}
                />
              </FormControl>
            </CardContent>
            <CardActions>
              <Button variant="contained" color="primary" fullWidth>
                APPLY
              </Button>
            </CardActions>
          </Card>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Home;
