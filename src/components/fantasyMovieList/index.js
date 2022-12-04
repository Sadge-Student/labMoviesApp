import React from "react";
import FantasyMovie from "../fantasyMovieCard";
import Grid from "@mui/material/Grid";
import uuid from 'react-uuid';

const MovieList = ( {movies }) => {
    let movieCards = movies.map((m) => (
      <Grid key={uuid()} item xs={12} sm={6} md={4} lg={3} xl={2}>
          <FantasyMovie key={uuid()} movie={m} />
      </Grid>
    ));
    return movieCards;
  };
  
  export default MovieList;