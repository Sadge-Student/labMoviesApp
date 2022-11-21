import React, { useContext, useEffect, useState } from "react"
import PageTemplate from "../components/templateMovieListPage"
import { MoviesContext } from "../contexts/moviesContext"
import { useQueries } from "react-query"
import { getMovie } from "../api/tmdb-api"
import Spinner from "../components/spinner"
import RemoveFromFavourites from "../components/cardIcons/removeFromFavourites"
import WriteReview from "../components/cardIcons/writeReview"
import { query, collection, onSnapshot, updateDoc, doc, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../contexts/authContext"

const MustWatchPage = () => {
    const [mustWatch, setMustWatch] = useState([]);
    const [loading, setLoading] = useState(true);
    const { signin, currentUser } = useAuth();

    useEffect(() => {
        const q = query(collection(db, `${currentUser.uid}/mustWatch/watch`));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            let mustWatchArr = []
            querySnapshot.forEach((doc) => {
                // favouritesArr.push({...doc.data(), id: doc.id});
                mustWatchArr.push({...doc.data()});
            });
            setMustWatch(mustWatchArr);
        });
        setLoading(false);
        return () => unsubscribe();
    }, []);

    const mustWatchMovieQueries = useQueries(
        mustWatch.map((movieId) => {
            return {
                queryKey: ["movie", { id: Object.values(movieId) }],
                queryFn: getMovie,
            };
        })
    );

    const isLoading = mustWatchMovieQueries.find((m) => m.isLoading === true);

    if (isLoading)
        return <Spinner />;

    const movies = mustWatchMovieQueries.map((q) => {
        q.data.genre_ids = q.data.genres.map(g => g.id)
        return q.data
    });

    return (
        <>
        {!loading && 
            <PageTemplate
            title="Must Watch Movies"
            movies={movies}
            action={(movie) => {
                return (
                    <>
                        <WriteReview movie={movie} />
                    </>
                )
                }}
            />
        }
        </>
    );
};
export default MustWatchPage;