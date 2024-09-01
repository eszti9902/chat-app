'use client'
import { auth, db } from '@/firebase'
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import React, { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null)
    const [userDataObj, setUserDataObj] = useState(null)
    const [loading, setLoading] = useState(true)

    //auth handlers
    const signup = async (username, email, password) => {
        try {
            // create the user
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);

            // add data to the object
            await setDoc(doc(db, 'users', userCredential.user.uid), {
                username,
                email: userCredential.user.email,
                createdAt: new Date(),
                id: userCredential.user.uid,
            });
            await setDoc(doc(db, 'userchat', userCredential.user.uid), {
                chats: []
            });
            return userCredential;

        } catch (error) {
            console.log('Sign up error: ' + error.message)
        }
    }

    const login = async (email, password) => {
        return await signInWithEmailAndPassword(auth, email, password)
    }

    const logout = async () => {
        try {
            setUserDataObj(null)
            setCurrentUser(null)
            console.log("logged out")
            return await signOut(auth)
        } catch (error) {
            console.log("Error logging out: " + error.message)
        }
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async user => {
            console.log(user)
            try {
                //set the user to our local context state
                setLoading(true)
                setCurrentUser(user)
                if (!user) {
                    console.log("no user found")
                    return
                }
                // if user exist fetch data from firebase
                console.log("fetching...")
                const docRef = doc(db, 'users', user.uid)
                const docSnap = await getDoc(docRef)
                let firebaseData = {}
                if (docSnap.exists()) {
                    console.log("found user data")
                    firebaseData = docSnap.data()
                    console.log(firebaseData)
                }
                setUserDataObj(firebaseData)
            } catch (error) {
                console.log(error.message)
            } finally {
                setLoading(false)
            }
        })
        return unsubscribe
    }, [])

    const value = {
        currentUser,
        userDataObj,
        setUserDataObj,
        signup,
        logout,
        login,
        loading
    }
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}