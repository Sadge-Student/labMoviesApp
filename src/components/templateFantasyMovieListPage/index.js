import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Header from "../headerMovieList";
import FilterCard from "../filterMoviesCard";
import FantasyMovieList from "../fantasyMovieList";
import Pagination from "../pagination";

function FantasyMovieTemplate({ movies }) {
    return (
        <Grid container sx={{ padding: '20px'}}>
        <Grid item container spacing={5}>
            <FantasyMovieList movies={movies}></FantasyMovieList>
        </Grid>
    </Grid>
    );
}
export default FantasyMovieTemplate;