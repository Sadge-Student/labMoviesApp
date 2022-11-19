import React from "react"
import PageTemplate from "../components/templateActorsPage"
import {getMovies, getPopularActors} from "../api/tmdb-api"
import { useQuery } from "react-query";
import Spinner from "../components/spinner"
import AddToFavouritesIcon from "../components/cardIcons/addToFavourites";

const PopularActorsPage = (props) => {
  const { data, error, isLoading, isError } = useQuery('popular', getPopularActors)

  if (isLoading)
    return <Spinner />;

  if (isError)
    return <h1>{error.message}</h1>;

  const actors = data.results;
//   const favourites = movies.filter(m => m.favourite)
//   localStorage.setItem('favourites', JSON.stringify(favourites))
//   const addToFavourites = (movidId) => true

  return (
    <PageTemplate
      title="Most Popular Actors"
      actors={actors}
      action={(actor) => {
        // return <AddToFavouritesIcon movie={movie} />
      }}
    />
  );
};
export default PopularActorsPage;