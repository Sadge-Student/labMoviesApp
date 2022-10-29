import React from "react"
import PageTemplate from "../components/templateMovieListPage"
import {getMovies, getUpcomingMovies} from "../api/tmdb-api"
import { useQuery } from "react-query";
import Spinner from "../components/spinner"
import AddToMustWatch from "../components/cardIcons/addToMustWatch"

const UpcomingMoviesPage = (props) => {
  const { data, error, isLoading, isError } = useQuery('upcoming', getUpcomingMovies)

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
      title="Upcoming Movies"
      movies={movies}
      action={(movie) => {
        return <AddToMustWatch movie={movie} />
      }}
    />
  );
};
export default UpcomingMoviesPage;