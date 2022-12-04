import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import {getMovies, getTopRatedMovies} from "../api/tmdb-api";
import PageTemplate from "../components/templateMovieListPage";
import AddToMustWatch from "../components/cardIcons/addToMustWatch";
import AddToFavouritesIcon from "../components/cardIcons/addToFavourites";
import Spinner from "../components/spinner";

const RatedMoviesPage = (props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, error, isLoading, isError, refetch } = useQuery('top_rated',() => getTopRatedMovies(currentPage));

  useEffect(() => {
    refetch();
    topFunction();
  }, [currentPage, refetch]);

  function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }

  if (isLoading)
    return <Spinner />;

  if (isError)
    return <h1>{error.message}</h1>;

  const movies = data.results;

  return (
    <PageTemplate
      title={`Top Rated Movies | Page: ${currentPage}`}
      movies={movies}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      action={(movie) => {
        return (
          <>
            <AddToFavouritesIcon movie={movie} />
            <AddToMustWatch movie={movie} />
          </>
          );
      }}
    />
  );
};
export default RatedMoviesPage;