import React, { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { useAuth } from "./authContext";

export const MoviesContext = React.createContext(null);

const MoviesContextProvider = (props) => {
    const [favourites, setFavourites] = useState([]);
    const [myReviews, setMyReviews] = useState({});
    const [mustWatch, setMustWatch] = useState([]);
    const { signin, currentUser } = useAuth();

    const addFavouriteSync = async(movieId) => {
        var exists = false;
        await db.collection(`${currentUser.uid}/favourites/favourite`).get().then(function (querySnapshot) {
            querySnapshot.forEach(function(doc) {
            let data = String(Object.values(doc.data()));
            let id = String(movieId);
            if (id === data) {
                exists = true;
                return;
            }
            });
            return;
        })
        if (exists) {
            console.log("This already exists");
        } else {
            await addDoc(collection(db, `${currentUser.uid}/favourites/favourite`), {
                text: movieId
            });
        }
    };

    const addMustWatchSync = async(movieId) => {
        var exists = false;
        await db.collection(`${currentUser.uid}/mustWatch/watch`).get().then(function (querySnapshot) {
            querySnapshot.forEach(function(doc) {
                let data = String(Object.values(doc.data()));
                let id = String(movieId);
                if (id === data) {
                    exists = true;
                    return;
                }
            });
            return;
        });
        if (exists) {
            console.log("This already exists");
        } else {
            await addDoc(collection(db, `${currentUser.uid}/mustWatch/watch`), {
            text: movieId
            });
        }
    };

    const removeFavouriteSync = async(movieId) => {
        db.collection(`${currentUser.uid}/favourites/favourite`).get().then(function (querySnapshot) {
            querySnapshot.forEach(function(doc) {
                if (movieId == Object.values(doc.data())) {
                    handleRemoveFavouriteSync(doc.id);
                }
            });
        });
    }

    const removeMustWatch = async(movieId) => {
        db.collection(`${currentUser.uid}/mustWatch/watch`).get().then(function (querySnapshot) {
            querySnapshot.forEach(function(doc) {
                if (movieId == Object.values(doc.data())) {
                    handleRemoveMustWatch(doc.id);
                }
            })
        })
    }

    async function handleRemoveFavouriteSync(docId) {
        const res = await db.collection(`${currentUser.uid}/favourites/favourite`).doc(docId).delete();
        return res;
    }

    async function handleRemoveMustWatch(docId) {
        const res = await db.collection(`${currentUser.uid}/mustWatch/watch`).doc(docId).delete();
        return res;
    }

    const addToFavourites = (movie) => {   
        addFavouriteSync(movie.id);
    };

    const removeFromFavourites = (movie) => {
        removeFavouriteSync(movie.id);
    };

    const addToMustWatch = (movie) => {
        addMustWatchSync(movie.id);
    }

    const removeFromMustWatch = (movie) => {
        removeMustWatch(movie.id);
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
                removeFromMustWatch
            }}
        >
            {props.children}
        </MoviesContext.Provider>
    );
};
export default MoviesContextProvider;