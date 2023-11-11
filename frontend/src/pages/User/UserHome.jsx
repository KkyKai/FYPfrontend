import React, { useEffect, useState, useCallback } from "react";
import { ClipLoader } from "react-spinners";
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
    const [loadingUser, setLoadingUser] = useState(true);

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
        } finally {
          setLoadingUser(false);
        }
      };

      useEffect(() => {
        fetchUserData();
      }, [user]);

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
            {loadingUser ? (
                  <div style={{ textAlign: 'center', paddingTop: '20px' }}>
                    <ClipLoader size={50} color="#123abc" loading={true} />
                    <p>Loading...</p>
                  </div>
            ) : (
              <div>
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
            )}
        </div>
        </MantineProvider>

    );
}

export default UserHome;
