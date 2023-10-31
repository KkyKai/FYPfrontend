import './App.css';
import { GloabalThemeProvider } from './GloabalThemeProvider';
import PageRoutes from "./routes/PageRoutes";
import React, { useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { UserProvider } from './pages/General/UserContext';

const firebaseConfig = {
  apiKey: "AIzaSyCo7L98MVTEPnoPd5OIC9isrvJrVJuEVgs",
  authDomain: "aniface-bb79c.firebaseapp.com",
  projectId: "aniface-bb79c",
  storageBucket: "aniface-bb79c.appspot.com",
  messagingSenderId: "1060757173931",
  appId: "1:1060757173931:web:c5da005c1a152afd79e9ee"
};

function App() {
  useEffect(() => {
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app); // Initialize Firebase Authentication

    // Rest of your React app code...
  }, []);
  return (
    <UserProvider>
      <GloabalThemeProvider>
          <div className="App">
            <PageRoutes />
          </div>
      </GloabalThemeProvider>
    </UserProvider>
  );
}

export default App;
