import React, { useEffect, useState } from "react";
import { useQueries } from "react-query";
import { getActor } from "../api/tmdb-api";
import { query, collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../contexts/authContext";
import PageTemplate from "../components/templateActorsPage";
import RemoveFromFavouriteActor from "../components/cardIcons/removeFromFavouriteActor";
import Spinner from "../components/spinner";

const FavouriteActorsPage = () => {
    const [favourites, setFavourites] = useState([]);
    const [loading, setLoading] = useState(true);
    const { signin, currentUser } = useAuth();

    useEffect(() => {
        const q = query(collection(db, `${currentUser.uid}/favourites/actors`));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            let favouritesArr = [];
            querySnapshot.forEach((doc) => {
                favouritesArr.push({...doc.data()});
            });
            setFavourites(favouritesArr);
        });
        setLoading(false);
        return () => unsubscribe();
    }, []);

    const favouriteActorQueries = useQueries(
        favourites.map((actorId) => {
            return {
                queryKey: ["actor", { id: Object.values(actorId) }],
                queryFn: getActor,
            };
        })
    );

    const isLoading = favouriteActorQueries.find((a) => a.isLoading === true);

    if (isLoading) {
        return <Spinner />
    }

    const actors = favouriteActorQueries.map((q) => {
        return q.data;
    }) 

    return (
        <>
            {!loading && 
                <PageTemplate
                    title="Favourite Actors"
                    actors={actors}
                    action={(actor) => {
                        return (
                            <>
                                <RemoveFromFavouriteActor actor={actor} />
                            </>
                        )
                    }}
                />
            }
        </>
    );
};
export default FavouriteActorsPage;