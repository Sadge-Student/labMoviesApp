import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Header from "../headerMovieList";
import FilterCard from "../filterMoviesCard";
import MovieList from "../movieList";
import Pagination from "../pagination";

function MovieListPageTemplate({ movies, title, currentPage, setCurrentPage, action }) {
    const [nameFilter, setNameFilter] = useState("");
    const [genreFilter, setGenreFilter] = useState("0");
    const [sortFilter, setSortFilter] = useState("");
    const genreId = Number(genreFilter);
    
    const handleChange = (type, value) => {
        if (type === "name") {
            setNameFilter(value);
        } else if (type === "genre") {
            setGenreFilter(value);
        } else if (type === "sort") {
            setSortFilter(value);
        }
    };

    let displayedMovies = movies
    .filter((m) => {
        return m.title.toLowerCase().search(nameFilter.toLocaleLowerCase()) !== -1;
    })
    .filter((m) => {
        return genreId > 0 ? m.genre_ids.includes(genreId) : true;
    })
    
    if (sortFilter === 'alphabetically') {
        displayedMovies.sort( Alphabetical )
    }

    if (sortFilter === 'reverse-alphabetically') {
        displayedMovies.sort( ReverseAlphabetical )
    }

    function ReverseAlphabetical( a, b ) {
        if (a.title > b.title) {
            return -1;
        }
        if (a.title < b.title) {
            return 1;
        }
        return 0;
    }

    function Alphabetical( a, b ) {
        if (a.title < b.title){
          return -1;
        }
        if (a.title > b.title){
          return 1;
        }
        return 0;
      }

    return (
        <>
        {currentPage !== undefined && setCurrentPage !== undefined &&
            <Pagination setCurrentPage={setCurrentPage} currentPage={currentPage}/>
        }
        <Grid container sx={{ padding: '20px'}}>
        <Grid item xs={12}>
            <Header title={title} />
        </Grid>
        <Grid item container spacing={5}>
            <Grid key="find" item xd={12} sm={6} md={4} lg={3} xl={2}>
                <FilterCard
                    onUserInput={handleChange}
                    titleFilter={nameFilter}
                    genreFilter={genreFilter}
                    sortFilter={sortFilter}
                />
            </Grid>
            <MovieList action={action} movies={displayedMovies}></MovieList>
        </Grid>
    </Grid>
    {currentPage !== undefined && setCurrentPage !== undefined &&
        <Pagination setCurrentPage={setCurrentPage} currentPage={currentPage}/>
    }
    </>
    );
}
export default MovieListPageTemplate;