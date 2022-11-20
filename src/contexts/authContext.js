import React, { useContext, useState, useEffect } from "react";
import { auth, writeUserDataFavourites } from "../firebase";

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider( {children } ) {
    const [currentUser, setCurrentUser] = useState(null);
    const [currentUserDoc, setCurrentUserDoc] = useState(null);
    const [loading, setLoading] = useState(true);

    function signup(email, password) {
        return auth.createUserWithEmailAndPassword(email, password);
    }

    function signin(email, password) {
        return auth.signInWithEmailAndPassword(email, password);
    }

    function signout() {
        return auth.signOut();
    }

    // useEffect(() => {
    //     const unsubscribe = auth.onAuthStateChanged(user => {
    //         setCurrentUser(user);
    //         setLoading(false);
    //     });

    //     return unsubscribe;
    // }, [])

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (!user) {
                // console.log("No user logged in");
            } else {
                setCurrentUser(user);
                // const favourites = ["test1", "test2", "test3"];

                // writeUserDataFavourites(user.uid, favourites);

                // const userDoc = db.collection("users").doc(user.uid);
                // const doc = await userDoc.get();
                
                // if (doc.exists) {
                //     setCurrentUserDoc(doc.data());
                // } else {
                //     await userDoc.set({
                //         favourites: ["test1", "test2", "test3"],
                //     });
                // }
            }
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const value = {
        currentUser,
        signin,
        signup,
        signout,
        currentUserDoc,
    }

    return (
        <AuthContext.Provider value ={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
