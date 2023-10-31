import React, { useState, useEffect } from 'react';
import { useTheme } from '../../GloabalThemeProvider';
import { rem, useMantineColorScheme } from '@mantine/core';
import UserNavBar from "../General/UserNavBar";
import { TextInput, MantineProvider, Button, Group, Text, Collapse, Box, Switch } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { useUser } from '../General/UserContext';

function UserSettingPage() {
    const [userData, setUserData] = useState({
        fullName: '',
        email: '',
        country: '',
        birthdate: '',
        gender: '',
        job: '',
      });
    const { user } = useUser();

    const { isDarkMode, toggleDarkMode } = useTheme();
    // const [dataLoaded, setDataLoaded] = useState(false);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         const db = getFirestore();
    //         const userDocRef = doc(db, 'users', user.uid); // Replace 'users' with your Firestore collection name and 'USER_ID' with the user's actual ID

    //         try {
    //             const docSnapshot = await getDoc(userDocRef);
    //             if (docSnapshot.exists()) {
    //                 const userData = docSnapshot.data();
    //                 console.log('Fetched user data:', userData);
    //                 setUserData(userData);
    //                 setDataLoaded(true);
    //             } else {
    //                 console.log('User data not found');
    //             }
    //         } catch (error) {
    //             console.error('Error fetching user data:', error);
    //         }
    //     };

    //     fetchData();
    // }, []);
    useEffect(() => {
        if (!user) {// Access the user's unique ID
            console.log('cannot get user info'); // Access the user's email
            // Access other user data as needed
          }
        const fetchUserData = async () => {
          if (user) {
            const db = getFirestore();
            const userDocRef = doc(db, 'users', user.uid); // Replace 'users' with your collection name
    
            try {
              const docSnapshot = await getDoc(userDocRef);
              if (docSnapshot.exists()) {
                const userData = docSnapshot.data();
                setUserData(userData);
              } else {
                console.log('User data not found');
              }
            } catch (error) {
              console.error('Error fetching user data:', error);
            }
          }
        };
    
        fetchUserData();
      }, [user]);

    const titleStyle = {
        marginTop: rem(-75),
        textAlign: 'center',
    };

    const componentBox = {
        marginLeft: 'auto',
        marginRight: 'auto',
        width: 'fit-content',
    };

    const lineStyle = {
        width: '80%',             // Adjust the width as needed, e.g., '50%' of the container width
        margin: '0 auto',         // Center the horizontal line horizontally
        border: '1px solid #ccc', // Add a border to the line
      };

    const form = useForm({
        initialValues: {
          email: '',
          termsOfService: false,
        },
    
        validate: {
          email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
        },
    });

    const [opened, { toggle }] = useDisclosure(false);

    return (
        <MantineProvider theme={{ colorScheme: isDarkMode ? 'dark' : 'light' }} withGlobalStyles withNormalizeCSS>
        <div>
            <div>
                <UserNavBar />
                <h2 style={titleStyle}>Settings</h2>
                <hr style={lineStyle}/>
            </div>
            <Box maw={600} mx="auto">
                <form onSubmit={form.onSubmit((values) => console.log(values))}>
                    <Group position="left" mt="md">
                        <h3>Personal Information</h3>
                    </Group>

                    <TextInput
                        placeholder="Your name"
                        label="Full name"
                        withAsterisk
                        // Populate with user's Full Name when data is loaded
                    />

                    <TextInput
                    withAsterisk
                    label="Email"
                    placeholder="your@email.com"
                    // {...form.getInputProps('email')}
                    />

                    <TextInput
                    placeholder="(+65)"
                    label="Phone Number"
                    />

                    <Group position="left" mt="md">
                        <h3>System Settings</h3>
                    </Group>

                    <Group>
                        <p>Dark mode</p>

                        <hr />

                        <Switch style={{ marginLeft: 'auto', marginRight: '0' }} // This pushes the switch all the way to the right
                        labelPosition="right"
                        checked={isDarkMode}
                        onChange={toggleDarkMode}/>
                    </Group>

                    <Group>
                        <p>Enable Notification</p>

                        <hr />

                        <Switch style={{ marginLeft: 'auto', marginRight: '0' }} // This pushes the switch all the way to the right
                        labelPosition="right"/>
                    </Group>

                    <Group position="right" mt="md">
                    <Button type="submit">Save</Button>
                    </Group>
                </form>
            </Box>
        </div>
        </MantineProvider>
    );

}

export default UserSettingPage;