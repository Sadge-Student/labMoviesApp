import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { query, collection, onSnapshot, updateDoc, doc, addDoc, deleteDoc, QuerySnapshot} from "firebase/firestore";
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
    //         setFavourites(favouritesArr);
    //         // console.log(favouritesArr);
    //     });
    //     return () => unsubscribe();
    // }, []);

    const addFavouriteSync = async(movieId) => {
        // console.log("attempting to add " + movieId + " to firebase");
        // await addDoc(collection(db, `${currentUser.uid}/favourites/favourite`), {
        //     text: movieId
        // });
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
        // console.log("attempting to add " + movieId + " to firebase");
        await addDoc(collection(db, `${currentUser.uid}/mustWatch/watch`), {
            text: movieId
        });
    };

    const removeFavouriteSync = async(movieId) => {
        db.collection(`${currentUser.uid}/favourites/favourite`).get().then(function (querySnapshot) {
            querySnapshot.forEach(function(doc) {
                // console.log(doc.id, ' => ', doc.data());
                // console.log(Object.values(doc.data()))
                if (movieId == Object.values(doc.data())) {
                    // console.log("match found!");
                    handleRemoveFavouriteSync(doc.id);
                }
            });
        });
    }

    // function test(movieId) {
    //     db.collection(`${currentUser.uid}/favourites/favourite`).get().then(function (querySnapshot) {
    //         querySnapshot.forEach(function(doc) {
    //             // console.log(doc.id, ' => ', doc.data());
    //             // console.log(Object.values(doc.data()))
    //             let data = String(Object.values(doc.data()));
    //             let id = String(movieId);
    //             // console.log("Movie ID:" + movieId);
    //             // console.log(Object.values(doc.data()));
    //             // console.log(movieId + "vs" + data);
    //             // console.log(id === data);
    //             // console.log(id.equals(data));
    //             // console.log(typeof data);
    //             // console.log(typeof movieId);
                
    //             if (id === data) {
    //                 setExists(true);
    //                 // handleRemoveFavouriteSync(doc.id);
    //             }
    //         });
    //     });
    // }

    async function handleRemoveFavouriteSync(docId) {
        const res = await db.collection(`${currentUser.uid}/favourites/favourite`).doc(docId).delete();
        return res;
    }

    const addToFavourites = (movie) => {   
        addFavouriteSync(movie.id);
    };

    const removeFromFavourites = (movie) => {
        // setFavourites(favourites.filter(
        //     (mId) => mId !== movie.id
        // ));
        removeFavouriteSync(movie.id);
    };

    const addToMustWatch = (movie) => {
        if (!mustWatch.includes(movie.id)) {
            addMustWatchSync(movie.id);
        }
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