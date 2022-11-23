import React from "react"
import PageTemplate from "../components/templateActorsPage"
import { getPopularActors } from "../api/tmdb-api"
import { useQuery } from "react-query";
import Spinner from "../components/spinner"
import AddToFavouritesIcon from "../components/cardIcons/addToActorFavourites";

const PopularActorsPage = (props) => {
  const { data, error, isLoading, isError } = useQuery('popularActors',() => getPopularActors(1))

  if (isLoading)
    return <Spinner />;

  if (isError)
    return <h1>{error.message}</h1>;

  const actors = data.results;
  const favourites = actors.filter(m => m.favourite);
  localStorage.setItem('Actorfavourites', JSON.stringify(favourites));
  const addToFavourites = (actorId) => true

  return (
    <>
      {!isLoading && 
        <PageTemplate
          title="Most Popular Actors"
          actors={actors}
          action={(actor) => {
            return <AddToFavouritesIcon actor={actor} />
          }}
        />
      }
    </>
  );
};
export default PopularActorsPage;