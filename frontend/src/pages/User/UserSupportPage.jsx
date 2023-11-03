import { Paper, Text, TextInput, Textarea, Button, Group, SimpleGrid, createStyles, rem, MantineProvider } from '@mantine/core';
import UserNavBar from "../General/UserNavBar";
import { useTheme } from "../../GloabalThemeProvider";
import {collection, addDoc, getFirestore} from "firebase/firestore";

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

    const handleClick = async () => {
      const db = getFirestore();

      var name = document.getElementById("name").value; 
      var email = document.getElementById("email").value; 
      var subject = document.getElementById("subject").value; 
      var feedback = document.getElementById("feedback").value;   
      var resolved = false;

      await addDoc(collection(db, "feedback"),{
        name : name,
        email : email,
        subject : subject,
        feedback : feedback,
        resolved : resolved
      });
    }
  
    return (
      <MantineProvider theme={{ colorScheme: isDarkMode ? 'dark' : 'light' }} withGlobalStyles withNormalizeCSS>
      <Paper shadow="md" radius="lg">
        <UserNavBar/>
        <div className={classes.wrapper}>  
          <form className={classes.form} onSubmit={(event) => event.preventDefault()}>
            <Text fz="lg" fw={700} className={classes.title}>
              Get in touch with us!
            </Text>
  
            <div className={classes.fields}>
              <SimpleGrid cols={2} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
                <TextInput name ="userName" label="Your name" placeholder="Your name" />
                <TextInput name ="email" label="Your email" placeholder="youremail@example.com" required />
              </SimpleGrid>
  
              <TextInput name ="subject" mt="md" label="Subject" placeholder="Subject" required />
  
              <Textarea
                name ="feedback" 
                mt="md"
                label="Your message"
                placeholder="Please include all relevant information"
                minRows={1}
                required
              />
  
              <Group position="right" mt="md">
                <Button 
                  onclick={handleClick} 
                  type="submit" 
                  className={classes.control}>
                  Send message
                </Button>
              </Group>
            </div>
          </form>
        </div>
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
    