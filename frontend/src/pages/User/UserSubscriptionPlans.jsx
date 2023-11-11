import UserNavBar from "../General/UserNavBar";
import SubscriptionInfoBadge from "./SubscriptionInfoBadge";
import { useTheme } from "../../GloabalThemeProvider";
import { createStyles, Container, Title, Text, Button, rem, MantineProvider, Box } from '@mantine/core';
import { getFirestore, doc, getDoc } from "firebase/firestore";

const useStyles = createStyles((theme) => ({
  root: {
    backgroundColor: '#11284b',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundImage:
      'linear-gradient(250deg, rgba(130, 201, 30, 0) 0%, #062343 70%), url(https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1080&q=80)',
    // paddingTop: `calc(${theme.spacing.xl} * 3)`,
    paddingBottom: `calc(${theme.spacing.xl} * 3)`,
  },

  inner: {
    display: 'flex',
    justifyContent: 'space-between',

    [theme.fn.smallerThan('md')]: {
      flexDirection: 'column',
    },
  },

  image: {
    [theme.fn.smallerThan('md')]: {
      display: 'none',
    },
  },

  content: {
    paddingTop: `calc(${theme.spacing.xl} * 2)`,
    paddingBottom: `calc(${theme.spacing.xl} * 2)`,
    // marginRight: `calc(${theme.spacing.xl} * 3)`,

    [theme.fn.smallerThan('md')]: {
      // marginRight: 0,
    },
  },

  title: {
    color: theme.white,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 900,
    lineHeight: 1.05,
    maxWidth: rem(500),
    fontSize: rem(48),
    textAlign: 'center',

    [theme.fn.smallerThan('md')]: {
      maxWidth: '100%',
      fontSize: rem(34),
      lineHeight: 1.15,
    },
  },

  description: {
    color: theme.white,
    opacity: 0.75,
    maxWidth: rem(500),

    [theme.fn.smallerThan('md')]: {
      maxWidth: '100%',
    },
  },

  control: {
    paddingLeft: rem(50),
    paddingRight: rem(50),
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: rem(22),

    [theme.fn.smallerThan('md')]: {
      width: '100%',
    },
  },
  ul : {
    display: 'flex',
  }
}));

export function UserSubscriptionPlans() {

  const { classes } = useStyles();

  const { isDarkMode } = useTheme();
  return (
    <MantineProvider theme={{ colorScheme: isDarkMode ? 'dark' : 'light' }} withGlobalStyles withNormalizeCSS>
    <div>
      <UserNavBar/>
      <div className={classes.root}>
        <Container size="lg">
          <div className={classes.inner}>
            <div className={classes.content}>
              <Title className={classes.title}>
                A{' '}
                <Text
                  component="span"
                  inherit
                  variant="gradient"
                  gradient={{ from: 'pink', to: 'yellow' }}
                >
                  fully featured
                </Text>{' '}
                Animation Webapp
              </Title>

              <Text className={classes.description} mt={30}>
                Make your own photos come to life with our animation tools open to try - or subscribe for full unlimited access to all features! 
              </Text>

            </div>
          </div>
        </Container>
          <div>
            <SubscriptionInfoBadge/>
          </div>
          <br></br>
          <div>
              <SubscriptionInfoBadge/>
          </div>
      </div>
    </div>
    </ MantineProvider>
  );
}

export default UserSubscriptionPlans;