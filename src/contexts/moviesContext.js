import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { query, collection, onSnapshot, updateDoc, doc, addDoc } from "firebase/firestore";
import { useAuth } from "./authContext";

export const MoviesContext = React.createContext(null);

const MoviesContextProvider = (props) => {
    const [favourites, setFavourites] = useState([]);
    const [myReviews, setMyReviews] = useState({});
    const [mustWatch, setMustWatch] = useState([]);
    const { signin, currentUser } = useAuth();

    // useEffect(() => {
    //     const q = query(collection(db, 'favourites'));
    //     const unsubscribe = onSnapshot(q, (querySnapshot) => {
    //         let favouritesArr = []
    //         querySnapshot.forEach((doc) => {
    //             favouritesArr.push({...doc.data(), id: doc.id});
    //         });
    //         dbSetFavourites(favouritesArr);
    //         // console.log(favouritesArr);
    //     });
    //     return () => unsubscribe();
    // }, []);

    const addFavouriteSync = async(movieId) => {
        // console.log("attempting to add " + movieId + " to firebase");
        await addDoc(collection(db, `${currentUser.uid}/favourites/favourite`), {
            text: movieId
        });
    };

    const addToFavourites = (movie) => {        
        if (!favourites.includes(movie.id)) {
            addFavouriteSync(movie.id);
        }
    };

    const removeFromFavourites = (movie) => {
        setFavourites(favourites.filter(
            (mId) => mId !== movie.id
        ))
    };

    const addToMustWatch = (movie) => {
        let newMustWatch = [...mustWatch];

        if (!mustWatch.includes(movie.id)) {
            newMustWatch.push(movie.id);
        }
        setMustWatch(newMustWatch);
        console.table(newMustWatch);
    }

    const addReview = (movie, review) => {
        setMyReviews( {...myReviews, [movie.id]: review})
    };

    return (
        <MoviesContext.Provider
            value={{
                favourites,
                addToFavourites,
                removeFromFavourites,
                addReview,
                addToMustWatch,
            }}
        >
            {props.children}
        </MoviesContext.Provider>
    );
};
export default MoviesContextProvider;