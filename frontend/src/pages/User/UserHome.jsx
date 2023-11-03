import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
//import axios from "axios";

import { Tabs, MantineProvider, rem, Text } from '@mantine/core';
import { useTheme } from "../../GloabalThemeProvider";
import { IconWriting, IconRobot } from '@tabler/icons-react';
import UploadImage from "./UploadImage";
import UserNavBar from "../General/UserNavBar";
import { getFirestore, doc, getDoc } from 'firebase/firestore';

function UserHome() {
    const [remainingFilters, setRemainingFilters] = useState('');
    const user = JSON.parse(localStorage.getItem('user'));
    const { isDarkMode } = useTheme();
    const [firebaseInitialized, setFirebaseInitialized] = useState(false);

    useEffect(() => {
      const initializeFirebase = async () => {
          try {
              // Initialize Firebase here
              const db = getFirestore();
              // ...

              setFirebaseInitialized(true);
          } catch (error) {
              console.error('Error initializing Firebase:', error);
          }
      };

      initializeFirebase();
  }, []);

    const fetchUserData = async () => {
        if (!user || !firebaseInitialized) {
            console.log('error');
          return;
        }
    
        const db = getFirestore();
        const userDocRef = doc(db, 'users', user.uid);
    
        try {
          const docSnapshot = await getDoc(userDocRef);
          if (docSnapshot.exists()) {
            const userData = docSnapshot.data();
            const filters = userData ? userData.remainingFilters || '' : '';
            setRemainingFilters(filters);
          } else {
            console.log('User data not found');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };

      useEffect(() => {
        fetchUserData();
      }, [user]);

      if (!firebaseInitialized) {
        return <div>Loading Firebase...</div>;
      }

    const numberStyle = {
        fontSize: '1.5rem',    // Adjust the font size as needed
        border: '1px solid black',  // Adjust border styles as needed
        padding: '10px',     // Adjust padding as needed
        borderRadius: '10px',
        marginTop: rem(-80),
        marginBottom: rem(30),  // Adjust border radius as needed for rounded corners
      };

    return (
        <MantineProvider theme={{ colorScheme: isDarkMode ? 'dark' : 'light' }} withGlobalStyles withNormalizeCSS>
        <div>
            <UserNavBar />
            <div style={numberStyle}>
            {remainingFilters}
            </div>
            <UploadImage />
            <Tabs defaultValue="model">
                <Tabs.List>
                    <Tabs.Tab value="model" icon={<IconRobot size="0.8rem" />}>Model</Tabs.Tab>
                    <Tabs.Tab value="design" icon={<IconWriting size="0.8rem" />}>Design</Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value="model" pt="xs">
                    Model tab content
                </Tabs.Panel>

                <Tabs.Panel value="design" pt="xs">
                    Design tab content
                </Tabs.Panel>
            </Tabs>
        </div>
        </MantineProvider>

    );
}

export default UserHome;
