import React from "react"
import PageTemplate from "../components/templateMovieListPage"
import {getMovies, getUpcomingMovies} from "../api/tmdb-api"
import { useQuery } from "react-query";
import Spinner from "../components/spinner"
import AddToFavouritesIcon from "../components/cardIcons/addToFavourites"

const UpcomingMoviesPage = (props) => {
  // const [movies, setMovies] = useState([]);
  // const favourites = movies.filter((m) => m.favourite);
  // localStorage.setItem("favourites", JSON.stringify(favourites));

  // const addToFavourites = (movieId) => {
  //   const updatedMovies = movies.map((m) =>
  //     m.id === movieId ? { ...m, favourite: true } : m
  //   );
  //   setMovies(updatedMovies);
  // };

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
        return <AddToFavouritesIcon movie={movie} />
      }}
    />
  );
};
export default UpcomingMoviesPage;