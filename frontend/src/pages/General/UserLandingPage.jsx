import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { getAuth } from 'firebase/auth';
import AniFaceLogo from './AniFace-logos_black.png';
import { TextInput } from '@mantine/core';
import { Link  } from 'react-router-dom';
import { useUser } from './UserContext';

function UserLandingPage() {
  const { setUser } = useUser();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    const auth = getAuth();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Handle successful login
      const user = auth.currentUser;
      setUser(user);
      setLoggedIn(true); // Set login status to true
      console.log(user);
      console.log('You have logged in');
      setError('');
      if (user){
        console.log(user.uid);
        setTimeout(() => {
          window.location.href = '/UserHome';
        }, 2000);
      }
    } catch (error) {
      setError(error.message);
    }
  }

    const containerStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      };
      
      const logoStyle = {
        width: '350px', // Adjust the size of your logo
        marginBottom: '20px', // Spacing below the logo
      };
      
      const formContainerStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      };
      
      const inputStyle = {
        width: '300px', // Adjust the width of the input fields
        padding: '10px',
        marginBottom: '10px', // Spacing between inputs
        fontSize: '16px',
      };
      
      const buttonStyle = {
        width: '320px', // Adjust the width of the button
        padding: '10px',
        backgroundColor: '#007bff', // Adjust the button's background color
        color: '#fff', // Adjust the button's text color
        border: 'none',
        cursor: 'pointer',
        fontSize: '16px',
      };
    return (
        <div style={{containerStyle}} >
          <img src={AniFaceLogo} alt="Your Logo" style={logoStyle} />
          <div style={formContainerStyle}>
            <TextInput style={inputStyle}
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
            <TextInput style={inputStyle}
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
            {loggedIn ? (
            <div>
              <p>You are logged in. Redirecting to UserHome...</p>
            </div>
          ) : (
            <div>
              <button style={buttonStyle} onClick={handleLogin}>Log In</button>
              <p>Don't have an account? <Link to="/UserSignupPage">Sign up</Link></p>
            </div>
          )}
              {error && <p>{error}</p>}
          </div>
        </div> 
            );
}

export default UserLandingPage;