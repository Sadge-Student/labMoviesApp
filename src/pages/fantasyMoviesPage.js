import React, { useEffect, useState } from "react";
import { query, collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../contexts/authContext";
import PageTemplate from "../components/templateFantasyMovieListPage"
import Spinner from "../components/spinner";

function FantasyMoviePage() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const { signin, currentUser } = useAuth();
    
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

    console.log(movies);

    return (
        <>
        {!loading && 
            <PageTemplate
            title="Fantasy Movies"
            movies={movies}
            />
        }
        </>
    );
}
export default FantasyMoviePage;