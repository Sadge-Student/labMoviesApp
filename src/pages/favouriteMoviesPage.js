import React, { useEffect, useState } from "react";
import { useQueries } from "react-query";
import { getMovie } from "../api/tmdb-api";
import { query, collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../contexts/authContext";
import PageTemplate from "../components/templateMovieListPage";
import RemoveFromFavourites from "../components/cardIcons/removeFromFavourites";
import WriteReview from "../components/cardIcons/writeReview";
import Spinner from "../components/spinner";

const FavouriteMoviesPage = () => {
    const [favourites, setFavourites] = useState([]);
    const [loading, setLoading] = useState(true);
    const { signin, currentUser } = useAuth();

    useEffect(() => {
        const q = query(collection(db, `${currentUser.uid}/favourites/favourite`));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            let favouritesArr = []
            querySnapshot.forEach((doc) => {
                favouritesArr.push({...doc.data()});
            });
            setFavourites(favouritesArr);
        });
        setLoading(false);
        return () => unsubscribe();
    }, []);

    const favouriteMovieQueries = useQueries(
        favourites.map((movieId) => {
            return {
                queryKey: ["movie", { id: Object.values(movieId) }],
                queryFn: getMovie,
            };
        })
    );

    const isLoading = favouriteMovieQueries.find((m) => m.isLoading === true);

    if (isLoading)
        return <Spinner />;

    const movies = favouriteMovieQueries.map((q) => {
        q.data.genre_ids = q.data.genres.map(g => g.id);
        return q.data;
    });

    const toDo = () => true;

    return (
        <>
        {!loading && 
            <PageTemplate
            title="Favourite Movies"
            movies={movies}
            action={(movie) => {
                return (
                    <>
                        <RemoveFromFavourites movie={movie} />
                        <WriteReview movie={movie} />
                    </>
                )
                }}
            />
        }
        </>
    );
};
export default FavouriteMoviesPage;