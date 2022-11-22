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
        // await addDoc(collection(db, `${currentUser.uid}/favourites/actors`), {
        //     text: actorId
        // });
        var exists = false;
        await db.collection(`${currentUser.uid}/favourites/actors`).get().then(function (querySnapshot) {
            querySnapshot.forEach(function(doc) {
                let data = String(Object.values(doc.data()));
                let id = String(actorId);
                if (id === data) {
                    exists = true;
                    return;
                }
            });
            return;
        });
        if (exists) {
            console.log("This actor is already favourited");
        } else {
            await addDoc(collection(db, `${currentUser.uid}/favourites/actors`), {
                text: actorId
            });
        }
    };

    const removeFavouriteSync = async(actorId) => {
        db.collection(`${currentUser.uid}/favourites/actors`).get().then(function (querySnapshot) {
            querySnapshot.forEach(function(doc) {
                if (actorId == Object.values(doc.data())) {
                    handleRemoveFavouriteSync(doc.id);
                }
            })
        })
    }

    async function handleRemoveFavouriteSync(docId) {
        const res = await db.collection(`${currentUser.uid}/favourites/actors`).doc(docId).delete();
        return res;
    }

    const addToFavourites = (actor) => {        
        addFavouriteSync(actor.id);
    };

    const removeFromFavourites = (actor) => {
        removeFavouriteSync(actor.id);
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