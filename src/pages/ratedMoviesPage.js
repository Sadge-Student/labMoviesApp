import React from "react"
import PageTemplate from "../components/templateMovieListPage"
import {getMovies, getTopRatedMovies} from "../api/tmdb-api"
import { useQuery } from "react-query";
import Spinner from "../components/spinner"
import AddToFavouritesIcon from "../components/cardIcons/addToFavourites";

const RatedMoviesPage = (props) => {
  const { data, error, isLoading, isError } = useQuery('top_rated', getTopRatedMovies)

  if (isLoading)
    return <Spinner />;

  if (isError)
    return <h1>{error.message}</h1>;

  const movies = data.results;
  const favourites = movies.filter(m => m.favourite)
  localStorage.setItem('favourites', JSON.stringify(favourites))
  const addToFavourites = (movidId) => true

  return (
    <PageTemplate
      title="Top Rated Movies"
      movies={movies}
      action={(movie) => {
        return <AddToFavouritesIcon movie={movie} />
      }}
    />
  );
};
export default RatedMoviesPage;