import { Paper, Text, TextInput, Textarea, Button, Box, Group, SimpleGrid, createStyles, rem, MantineProvider, em } from '@mantine/core';
import UserNavBar from "../General/UserNavBar";
import { useTheme } from "../../GloabalThemeProvider";
import {addDoc, getFirestore, setDoc, doc, collection} from "firebase/firestore";
import { useState } from 'react';

  const useStyles = createStyles((theme) => {
    const BREAKPOINT = theme.fn.smallerThan('sm');
  
    return {
      wrapper: {
        display: 'flex',
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
        borderRadius: theme.radius.lg,
        padding: rem(4),
        border: `${rem(1)} solid ${
          theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[2]
        }`,
  
        [BREAKPOINT]: {
          flexDirection: 'column',
        },
        marginTop: rem(-75),
      },
  
      form: {
        boxSizing: 'border-box',
        flex: 1,
        padding: theme.spacing.xl,
        paddingLeft: `calc(${theme.spacing.xl} * 2)`,
        borderLeft: 0,
  
        [BREAKPOINT]: {
          padding: theme.spacing.md,
          paddingLeft: theme.spacing.md,
        },
      },
  
      fields: {
        marginTop: rem(-12),
      },
  
      fieldInput: {
        flex: 1,
  
        '& + &': {
          marginLeft: theme.spacing.md,
  
          [BREAKPOINT]: {
            marginLeft: 0,
            marginTop: theme.spacing.md,
          },
        },
      },
  
      fieldsGroup: {
        display: 'flex',
  
        [BREAKPOINT]: {
          flexDirection: 'column',
        },
      },
  
      title: {
        marginBottom: `calc(${theme.spacing.xl} * 1.5)`,
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  
        [BREAKPOINT]: {
          marginBottom: theme.spacing.xl,
        },
      },
  
      control: {
        [BREAKPOINT]: {
          flex: 1,
        },
      },
    };
  });
  

  export function UserSupportPage() {
    const { isDarkMode } = useTheme();
    const { classes } = useStyles();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [feedback, setFeedback] = useState('');
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (e) => {
      e.preventDefault();

      if (!name || !email || !subject || !feedback) {
        setError('Please fill in all fields');
        setSuccessMessage('');
      } else {
        try {
          const db = getFirestore();
          const userDocRef = collection(db, 'feedback');
          const userData = {
            name,
            email,
            subject,
            feedback,
            resolve: false,
          };
          const docRef = await addDoc(userDocRef, userData);
          console.log("successfully set feedback with ID: ", docRef.id);
          setError('');
          setSuccessMessage('Successfully submitted your feedback.');
          setName('');
          setEmail('');
          setSubject('');
          setFeedback('');
          setTimeout(() => {
            setSuccessMessage('');
          }, 3000);
        } catch (error) {
          setError(error.message);
          setSuccessMessage('');
        }
      }
    }
  
    return (
      <MantineProvider theme={{ colorScheme: isDarkMode ? 'dark' : 'light' }} withGlobalStyles withNormalizeCSS>
      <Paper shadow="md" radius="lg">
        <UserNavBar/>
        <Box maw={900} mx="auto">
        <div className={classes.wrapper}>  
          <form className={classes.form} onSubmit={(event) => event.preventDefault()}>
            <Text fz="lg" fw={700} className={classes.title}>
              Get in touch with us!
            </Text>
  
            <div className={classes.fields}>
              <SimpleGrid cols={2} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
                <TextInput
                  label="Your name" 
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required/>
                <TextInput
                  label="Your email" 
                  placeholder="youremail@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required />
              </SimpleGrid>
  
              <TextInput
                mt="md" 
                label="Subject"
                placeholder="Subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required />
  
              <Textarea
                mt="md"
                label="Your message"
                placeholder="Please include all relevant information"
                minRows={5}
                onChange={(e) => setFeedback(e.target.value)}
                value={feedback}
                required
              />
  
              <Group position="right" mt="md">
                {error && <p style={{ textAlign: 'center' }}>{error}</p>}
                {successMessage && <p style={{ textAlign: 'center' }}>Success: {successMessage}</p>}
                <Button 
                  onClick={handleSubmit} 
                  type="submit" 
                  className={classes.control}>
                  Send message
                </Button>
              </Group>
            </div>
          </form>
        </div>
        </Box>
      </Paper>
      </ MantineProvider>
    );
  }

export default UserSupportPage;

//old code

// import { Paper, Text, TextInput, Textarea, Button, Group, SimpleGrid, createStyles, rem, MantineProvider } from '@mantine/core';
// import UserNavBar from "../General/UserNavBar";
// import { useTheme } from "../../GloabalThemeProvider";

//   const useStyles = createStyles((theme) => {
//     const BREAKPOINT = theme.fn.smallerThan('sm');
  
//     return {
//       wrapper: {
//         display: 'flex',
//         backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
//         borderRadius: theme.radius.lg,
//         padding: rem(4),
//         border: `${rem(1)} solid ${
//           theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[2]
//         }`,
  
//         [BREAKPOINT]: {
//           flexDirection: 'column',
//         },
//         marginTop: rem(-75),
//       },
  
//       form: {
//         boxSizing: 'border-box',
//         flex: 1,
//         padding: theme.spacing.xl,
//         paddingLeft: `calc(${theme.spacing.xl} * 2)`,
//         borderLeft: 0,
  
//         [BREAKPOINT]: {
//           padding: theme.spacing.md,
//           paddingLeft: theme.spacing.md,
//         },
//       },
  
//       fields: {
//         marginTop: rem(-12),
//       },
  
//       fieldInput: {
//         flex: 1,
  
//         '& + &': {
//           marginLeft: theme.spacing.md,
  
//           [BREAKPOINT]: {
//             marginLeft: 0,
//             marginTop: theme.spacing.md,
//           },
//         },
//       },
  
//       fieldsGroup: {
//         display: 'flex',
  
//         [BREAKPOINT]: {
//           flexDirection: 'column',
//         },
//       },
  
//       title: {
//         marginBottom: `calc(${theme.spacing.xl} * 1.5)`,
//         fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  
//         [BREAKPOINT]: {
//           marginBottom: theme.spacing.xl,
//         },
//       },
  
//       control: {
//         [BREAKPOINT]: {
//           flex: 1,
//         },
//       },
//     };
//   });
  
//   export function UserSupportPage() {
//     const { isDarkMode } = useTheme();

//     const { classes } = useStyles();
  
//     return (
//       <MantineProvider theme={{ colorScheme: isDarkMode ? 'dark' : 'light' }} withGlobalStyles withNormalizeCSS>
//       <Paper shadow="md" radius="lg">
//         <UserNavBar/>
//         <div className={classes.wrapper}>  
//           <form className={classes.form} onSubmit={(event) => event.preventDefault()}>
//             <Text fz="lg" fw={700} className={classes.title}>
//               Get in touch with us!
//             </Text>
  
//             <div className={classes.fields}>
//               <SimpleGrid cols={2} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
//                 <TextInput label="Your name" placeholder="Your name" />
//                 <TextInput label="Your email" placeholder="youremail@example.com" required />
//               </SimpleGrid>
  
//               <TextInput mt="md" label="Subject" placeholder="Subject" required />
  
//               <Textarea
//                 mt="md"
//                 label="Your message"
//                 placeholder="Please include all relevant information"
//                 minRows={3}
//                 required
//               />
  
//               <Group position="right" mt="md">
//                 <Button type="submit" className={classes.control}>
//                   Send message
//                 </Button>
//               </Group>
//             </div>
//           </form>
//         </div>
//       </Paper>
//       </ MantineProvider>
//     );
//   }

// export default UserSupportPage;
    