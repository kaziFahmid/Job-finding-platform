import React, { createContext, useEffect, useState } from 'react'
import { getAuth, createUserWithEmailAndPassword,GoogleAuthProvider, signInWithEmailAndPassword, signOut, onAuthStateChanged, signInWithPopup, sendPasswordResetEmail } from "firebase/auth";
import app from '../../../firebase-config';
const auth = getAuth(app)
export const AuthContext=createContext(null)

export default function AuthProvider({children}) {
    const [user,setUser]=useState(null)
    const [loading,setLoading]=useState(true)
    const provider = new GoogleAuthProvider();
    const createUser=(email,password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth,email,password)
    }

    const signInUser=(email,password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth,email,password)
    }
    const logOut=()=>{
        localStorage.removeItem('job-access-token')
        return signOut(auth)
    }
    const handleGoogleSignin=()=>{
        setLoading(true)
        return signInWithPopup(auth, provider)
    }
const passwordReset=(email)=>{
    return sendPasswordResetEmail(auth, email)
}
    useEffect(()=>{
        const unsubscribe=onAuthStateChanged(auth,currentUser=>{
            setUser(currentUser)
            setLoading(false)
        })

        return ()=>{
            unsubscribe()
        }
        
    },[])
    const userInfo={
        user,
        createUser,
        signInUser,
        logOut,
        loading,
        handleGoogleSignin,
        passwordReset
    }
  return (
    <AuthContext.Provider value={userInfo}>
      {children}
    </AuthContext.Provider>
  )
}
