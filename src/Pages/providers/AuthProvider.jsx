import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";

import { createContext, useEffect, useState } from "react";
import app from "../../Firebase/FireBase.config";
import useAxiosPublic from "../../Hooks/useAxiosPublic";







const auth = getAuth(app);

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {

    const axiosPublic = useAxiosPublic();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const googleProvider = new GoogleAuthProvider();

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }
    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }
    const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }
    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }
    const updateUserProfile = (name, photo, role = "bronze") => {
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo,
            role: role
        });
    }
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {

            console.log('current user ', currentUser);
            setUser(currentUser);
            setLoading(false);
            if (currentUser) {
                const userInfo = { email: currentUser?.email };
                axiosPublic.post('/jwt', userInfo)
                    .then(res => {
                        if (res.data.token) {
                            localStorage.setItem('access-Token', res.data.token);
                        }
                    })
            }
            else {
                localStorage.removeItem('access-Token');
            }
        });
        return () => {
            unSubscribe();
        }
    }, [])
    // }, [axiosPublic])

    const useInfo = {
        user,
        loading,
        createUser,
        signIn,
        logOut,
        setUser,
        updateUserProfile,
        googleSignIn
    }

    return (
        <AuthContext.Provider value={useInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;