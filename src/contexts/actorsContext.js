import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { query, collection, onSnapshot, updateDoc, doc, addDoc } from "firebase/firestore";
import { useAuth } from "./authContext";

export const ActorsContext = React.createContext(null);

const ActorsContextProvider = (props) => {
    const [favourites, setFavourites] = useState([]);
    const { signin, currentUser } = useAuth();

    const addFavouriteSync = async(actorId) => {
        // console.log("attempting to add " + actorId + " to firebase");
        await addDoc(collection(db, `${currentUser.uid}/favourites/favouriteActors`), {
            text: actorId
        });
    };

    const addToFavourites = (actor) => {        
        if (!favourites.includes(actor.id)) {
            addFavouriteSync(actor.id);
        }
    };

    const removeFromFavourites = (actor) => {
        setFavourites(favourites.filter(
            (aId) => aId !== actor.id
        ))
    };

    return (
        <ActorsContext.Provider
            value={{
                favourites,
                addToFavourites,
                removeFromFavourites,
            }}
        >
            {props.children}
        </ActorsContext.Provider>
    );
};
export default ActorsContextProvider;