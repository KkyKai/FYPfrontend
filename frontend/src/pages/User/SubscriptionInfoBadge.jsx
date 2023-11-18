import React, { useEffect, useState } from "react";
import { Card, Image, Text, Group, Badge, createStyles, Box, Center, Button, rem } from '@mantine/core';
import { IconGauge, IconUsers } from '@tabler/icons-react';
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
  },

  imageSection: {
    padding: theme.spacing.md,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottom: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },

  label: {
    marginBottom: theme.spacing.xs,
    lineHeight: 1,
    fontWeight: 700,
    fontSize: theme.fontSizes.xs,
    letterSpacing: rem(-0.25),
    textTransform: 'uppercase',
  },

  section: {
    padding: theme.spacing.md,
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },

  icon: {
    marginRight: rem(5),
    color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[5],
  },
}));

const mockdata = [
  { label: '1 Accounts', icon: IconUsers },
  { label: 'Premium Conversion Speeds', icon: IconGauge },
];

export function SubscriptionInfoBadge() {
  const [price, setPrice] = useState(null);
  const [duration, setDuration] = useState(null);
  const [subscribed, setSubscribed] = useState('');

  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    fetchUserData();
}, [subscribed, user]);


  const fetchUserData = async () => {
  
      const db = getFirestore();
      const userDocRef = doc(db, 'users', user.uid);
  
      try {
        const docSnapshot = await getDoc(userDocRef);
        if (docSnapshot.exists()) {
          const userData = docSnapshot.data();
          const subscribe = userData.subscriptionStatus;
          setSubscribed(subscribe);
        } else {
          console.log('User data not found');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

  const handleSubscribeClick = async () => {
    const db = getFirestore();
    const userDocRef = doc(db, 'users', user.uid);
  
    try {
      // Save the editedUserData
      await updateDoc(userDocRef, {
        remainingFilters: 30,
        subscriptionStatus: true,
      });
      setSubscribed(true);
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  const handleUnsubscribeClick = async () => {
    const db = getFirestore();
    const userDocRef = doc(db, 'users', user.uid);
  
    try {
      // Save the editedUserData
      await updateDoc(userDocRef, {
        remainingFilters: 10,
        subscriptionStatus: false,
      });
      setSubscribed(false);
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  useEffect(() => {
    const fetchDuration = async () => {
      try {
        const db = getFirestore();
        const subPlanDocRef = doc(db, 'subPlan/monthlyBasic'); // Replace with the actual document ID

        const docSnapshot = await getDoc(subPlanDocRef);

        if (docSnapshot.exists()) {
          const durationValue = docSnapshot.data().duration;
          const priceValue = docSnapshot.data().price;
          setDuration(durationValue);
          setPrice(priceValue);
        } else {
          console.log('Document not found');
        }
      } catch (error) {
        console.error('Error fetching document:', error);
      }
    };

    fetchDuration();
  }, []);
  const { classes } = useStyles();
  const features = mockdata.map((feature) => (
    <Center key={feature.label}>
      <feature.icon size="1.05rem" className={classes.icon} stroke={1.5} />
      <Text size="xs">{feature.label}</Text>
    </Center>
  ));

  return (
    <Card withBorder radius="md" className={classes.card}>
      <Box maw={800} mx="auto">
      <Group position="apart" mt="md">
        <div>
          <Text fw={500}>AniFace Subscription</Text>
          <Text fz="xs" c="dimmed">
            {duration} days
          </Text>
        </div>
        <Badge variant="outline">99% off</Badge>
      </Group>

      <Card.Section className={classes.section} mt="md">
        <Text fz="sm" c="dimmed" className={classes.label}>
          Basic configuration
        </Text>

        <Group spacing={8} mb={-8}>
          {features}
        </Group>
      </Card.Section>

      <Card.Section className={classes.section}>
        <Group spacing={30}>
          <div>
            <Text fz="xl" fw={700} sx={{ lineHeight: 1 }}>
              USD${price}
            </Text>
            <Text fz="sm" c="dimmed" fw={500} sx={{ lineHeight: 1 }} mt={3}>
              per month
            </Text>
          </div>

          {subscribed ? ( 
          <Button onClick={handleUnsubscribeClick} radius="xl" style={{ flex: 1 }}>
            Unsubscribe
          </Button>) :  
          <Button onClick={handleSubscribeClick} radius="xl" style={{ flex: 1 }}>
            Subscribe
          </Button>}

        </Group>
      </Card.Section>
      </Box>
    </Card>
  );
}

export default SubscriptionInfoBadge;
