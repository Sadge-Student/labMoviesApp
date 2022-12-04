import React from "react";
import Grid from "@mui/material/Grid";
import FantasyMovieList from "../fantasyMovieList";

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