import {
  signInWithPopup,
  signOut,
} from "firebase/auth";
import React, { useState, useEffect } from "react";

import { auth, googleProvider } from "../firebase";

export const Auth = () => {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);
  
  const signIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err){
      console.error(err);
    }
  };
  
  const logOut = async () => {
    try {
      await signOut(auth);
    } catch (err){
      console.error(err);
    }
  };
  
  return (
    <div className='justify-center'>
      <div className='flex justify-center align-middle'>
        {!user ? (
          <button onClick={signIn} className="bg-red-500 rounded hover:bg-red-600 transition duration-150 ease-in-out p-2 text-white mt-[100px]"> Signin with Google</button>
        ) : (
          <button onClick={logOut} className="bg-red-500 rounded hover:bg-red-600 transition duration-150 ease-in-out p-2 text-white"> Logout</button>
        )}
      </div>
    </div>
  );
};
