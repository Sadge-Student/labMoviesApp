import React from "react";
import { useQuery } from "react-query";
import { getPopularMovies } from "../api/tmdb-api";
import PageTemplate from "../components/templateMovieListPage";
import AddToFavouritesIcon from "../components/cardIcons/addToFavourites";
import Spinner from "../components/spinner";

const PopularMoviesPage = (props) => {
  const { data, error, isLoading, isError } = useQuery('popular',() => getPopularMovies(1));

  if (isLoading)
    return <Spinner />;

  if (isError)
    return <h1>{error.message}</h1>;

  const movies = data.results;
  const favourites = movies.filter(m => m.favourite);
  localStorage.setItem('favourites', JSON.stringify(favourites));
  const addToFavourites = (movidId) => true

  return (
    <PageTemplate
      title="Most Popular Movies"
      movies={movies}
      action={(movie) => {
        return <AddToFavouritesIcon movie={movie} />
      }}
    />
  );
};
export default PopularMoviesPage;