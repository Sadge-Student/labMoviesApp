import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { query, collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../contexts/authContext";
import PageTemplate from "../components/templateFantasyMoviePage";
import Spinner from "../components/spinner";
import FantasyMovieDetails from "../components/fantasyMovieDetails";

const FantasyMovieDetailsPage = (props) => {
  const { fantasyName } = useParams();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const { signin, currentUser } = useAuth();
  let selectedMovie = null;

  useEffect(() => {
    const q = query(collection(db, `${currentUser.uid}/fantasy/movies`));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        let moviesArr = []
        querySnapshot.forEach((doc) => {
            moviesArr.push({...doc.data()});
        });
        setMovies(moviesArr);
    });
    setLoading(false);
    return () => unsubscribe();
}, []);

  if (loading)
    return <Spinner />;
  
  console.log(fantasyName);
  console.log(movies);

  movies.forEach(movie => {
    if (movie.movieName === fantasyName) {
        selectedMovie = movie;
        return;
    }
  });

  console.log(selectedMovie);


  return (
    <>
      {selectedMovie ? (
        <>
          <PageTemplate movie={selectedMovie}>
            <FantasyMovieDetails movie={selectedMovie} />
          </PageTemplate>
        </>
      ) : (
        <p>Waiting for fantasy movie details</p>
      )}
    </>
  );
};
export default FantasyMovieDetailsPage;