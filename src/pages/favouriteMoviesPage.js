import React from "react"
import PageTemplate from "../components/templateMovieListPage"

const FavouriteMoviesPage = (props) => {
    const toDo = () => true;

    const movies = JSON.parse(localStorage.getItem("favourites"))

    return(
        <PageTemplate
            title="Favourite Movies"
            movies={movies}
            selectFavourite={toDo}
        />
    );
};
export default FavouriteMoviesPage;