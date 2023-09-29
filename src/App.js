import React, { useState, useEffect } from 'react';
import { auth, signOut } from './firebase';
import {Auth} from './components/Auth';
import Timer from './components/Timer';
import BreakTimer from './components/BreakTimer';

const App = () => {
  const [user, setUser] = useState(null);
  const [isWorkTimer, setIsWorkTimer] = useState(true); // To toggle between work and break timer

  // Function to switch between work and break timers
  const handleTimerSwitch = () => {
    setIsWorkTimer(!isWorkTimer);
  };

  // Listen for changes in the authentication state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  // Function to handle user logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center align-middle">
      <div className='h-[400px] w-[400px] shadow-2xl justify-center text-center mt-20'>
        <h1 className="text-2xl font-bold mb-4 p-2">Pomodoro</h1>
        {user ? (
          <>
            {isWorkTimer ? (
              <Timer onTimerComplete={handleTimerSwitch} />
            ) : (
              <BreakTimer onBreakComplete={handleTimerSwitch} />
            )}
            <button onClick={handleLogout} className="mt-[50px] bg-red-500 rounded hover:bg-red-600 transition duration-150 ease-in-out p-2 text-white"> Logout</button>
          </>
        ) : (
          <Auth />
        )}
      </div>
    </div>
  );
};

export default App;
