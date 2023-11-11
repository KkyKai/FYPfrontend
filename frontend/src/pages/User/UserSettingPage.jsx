import React, { useState, useEffect } from 'react';
import { useTheme } from '../../GloabalThemeProvider';
import { rem, useMantineColorScheme } from '@mantine/core';
import UserNavBar from "../General/UserNavBar";
import { TextInput, MantineProvider, Button, Group, Text, Collapse, Box, Switch } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';

function UserSettingPage() {
    const [userData, setUserData] = useState({
        fullName: '',
        email: '',
        country: '',
        birthdate: '',
        gender: '',
        job: '',
      });
      const [editedUserData, setEditedUserData] = useState({
        fullName: '',
        email: '',
        country: '',
        birthdate: '',
        gender: '',
        job: '',
      });
    const [isEditing, setIsEditing] = useState(false);
    const user = JSON.parse(localStorage.getItem('user'));

    const { isDarkMode, toggleDarkMode } = useTheme();
    
    const fetchUserData = async () => {
        if (!user) {
            console.log('error');
          return;
        }
    
        const db = getFirestore();
        const userDocRef = doc(db, 'users', user.uid);
    
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
      };

      useEffect(() => {
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

    const handleEditClick = () => {
      if (!isEditing) {
        setEditedUserData(userData);
      }
      setIsEditing(true);
    };
    const handleSaveClick = async () => {
      // Perform save actions, e.g., update data in Firebase
      const db = getFirestore();
      const userDocRef = doc(db, 'users', user.uid);
    
      try {
        // Save the editedUserData
        await updateDoc(userDocRef, {
          fullName: editedUserData.fullName,
          email: editedUserData.email,
          country: editedUserData.country,
          birthdate: editedUserData.birthdate,
          gender: editedUserData.gender,
          job: editedUserData.job,
        });
        setIsEditing(false); // Exit editing mode after saving
      } catch (error) {
        console.error('Error saving user data:', error);
      }
    };

    // const [opened, { toggle }] = useDisclosure(false);

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
                      value={isEditing ? editedUserData.fullName : userData.fullName}
                      disabled={!isEditing}
                      onChange={(event) =>
                        setEditedUserData({
                          ...editedUserData,
                          fullName: event.currentTarget.value,
                        })
                      }
                    />

                    <TextInput
                    label="Email"
                    placeholder="your@email.com"
                    value={isEditing ? editedUserData.email : userData.email}
                    disabled={!isEditing}
                    onChange={(event) =>
                      setEditedUserData({
                        ...editedUserData,
                        email: event.currentTarget.value,
                      })
                    }
                    />

                    <TextInput
                    placeholder="YYYY/MM/DD"
                    label="Birth Date"
                    value={isEditing ? editedUserData.birthdate : userData.birthdate}
                    disabled={!isEditing}
                    onChange={(event) =>
                      setEditedUserData({
                        ...editedUserData,
                        birthdate: event.currentTarget.value,
                      })
                    }
                    />

                    <TextInput
                    label="Country"
                    placeholder="Country"
                    value={isEditing ? editedUserData.country : userData.country}
                    disabled={!isEditing}
                    onChange={(event) =>
                      setEditedUserData({
                        ...editedUserData,
                        country: event.currentTarget.value,
                      })
                    }
                    />

                    <TextInput
                    label="Profession"
                    placeholder="Job Title"
                    value={isEditing ? editedUserData.job : userData.job}
                    disabled={!isEditing}
                    onChange={(event) =>
                      setEditedUserData({
                        ...editedUserData,
                        job: event.currentTarget.value,
                      })
                    }
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
                    {isEditing ? (
                      <Button onClick={handleSaveClick}>Save</Button>
                    ) : (
                      <Button onClick={handleEditClick}>Edit</Button>
                    )}
                    </Group>
                </form>
            </Box>
        </div>
        </MantineProvider>
    );

}

export default UserSettingPage;