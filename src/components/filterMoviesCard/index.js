import React from "react";
import { useQuery } from "react-query";
import { getGenres } from "../../api/tmdb-api";
import img from "../../images/18-result.png";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Spinner from "../spinner";

const formControl = 
  {
    margin: 1,
    minWidth: '80%',
    // backgroundColor: "rgb(255, 255, 255)"
  };

export default function FilterMoviesCard(props) {
  const { data, error, isLoading, isError } = useQuery("genres", getGenres);

  if (isLoading)
    return <Spinner />;

  if (isError)
    return <h1>{error.message}</h1>

  const genres = data.genres;

  if (genres[0].name !== "All") {
    genres.unshift({ id: "0", name: "All"});
  }

  const handleChange = (e, type, value) => {
    e.preventDefault();
    props.onUserInput(type, value);
  };

  const handleTextChange = e => {
    handleChange(e, "name", e.target.value);
  };

  const handleGenreChange = e => {
    handleChange(e, "genre", e.target.value);
  };

  const handleSortChange = e => {
    handleChange(e, "sort", e.target.value)
  }

  return (
    <Card 
      sx={{
        maxWidth: 345,
        // backgroundColor: "rgb(204, 204, 0)"
      }} 
      variant="outlined">
      <CardContent>
        <Typography variant="h5" component="h1">
          <div style={{display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center'}}>
            <SearchIcon fontSize="large" />
            Search
          </div>
        </Typography>
        <div style={{display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center'}}>
          <TextField
            sx={formControl}
            id="filled-search"
            label="Search field"
            type="search"
            variant="filled"
            value={props.titleFilter}
            onChange={handleTextChange}
          />
          <FormControl sx={formControl}>
            <InputLabel sx={{left: '-12px', top: '-5px'}}>Genre</InputLabel>
            <Select
              labelId="genre-label"
              id="genre-select"
              defaultValue=""
              value={props.genreFilter}
              onChange={handleGenreChange}
            >
              {genres.map((genre) => {
                return (
                  <MenuItem key={genre.id} value={genre.id}>
                    {genre.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <FormControl sx={formControl}>
            <InputLabel>Sort</InputLabel>
            <Select
              labelId="sort-label"
              id="sort-select"
              defaultValue=""
              value={props.sortFilter}
              onChange={handleSortChange}
            >
              <MenuItem value='alphabetically' >
                Sort Alphabetical (A-Z)
              </MenuItem>
              <MenuItem value='reverse-alphabetically' >
                Sort Reverse Alphabetical (Z-A)
              </MenuItem>
            </Select>
          </FormControl>

        </div>
      </CardContent>
      <CardMedia
        sx={{ height: 300, margin: 2, borderRadius: 15 }}
        image={img}
        title="Filter"
      />
      <CardContent>
        <Typography variant="h5" component="h1">
        <div style={{display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center'}}>
          <SearchIcon fontSize="large" />
          Filter the movies
        </div>
        </Typography>
      </CardContent>
    </Card>
  );
}