import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Header from "../headerMovieList";
import FilterCard from "../filterMoviesCard";
import FantasyMovieList from "../fantasyMovieList";
import Pagination from "../pagination";

function FantasyMovieTemplate({ movies }) {
    return (
        <Grid container sx={{ padding: '20px'}}>
        {/* <Grid item xs={12}>
            <Header title={title} />
        </Grid> */}
        <Grid item container spacing={5}>
            {/* <Grid key="find" item xd={12} sm={6} md={4} lg={3} xl={2}>
                <FilterCard
                    onUserInput={handleChange}
                    titleFilter={nameFilter}
                    genreFilter={genreFilter}
                    sortFilter={sortFilter}
                />
            </Grid> */}
            <FantasyMovieList movies={movies}></FantasyMovieList>
        </Grid>
    </Grid>
    );
}
export default FantasyMovieTemplate;