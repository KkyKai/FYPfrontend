import React, { useState } from 'react';
import {
    createStyles,
    Container,
    Avatar,
    UnstyledButton,
    Group,
    Text,
    Menu,
    Tabs,
    Burger,
    rem,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
    IconLogout,
    IconSettings,
    IconChevronDown,
    IconHome2,
    IconHelpOctagon,
    IconUserPlus,
    IconMessageChatbot,
    IconClipboardList,
    IconPlayerPause,
    IconTrash
} from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import { useForm } from '@mantine/form';
import AniFaceLogo from './AniFace-logos_black (1).png';
import AniFaceDarkLogo from './AniFace-logos_white.png';
import { useTheme } from '../../GloabalThemeProvider';

const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.href = '/UserLandingPage';
  };

const useStyles = createStyles((theme) => ({
    header: {
        paddingTop: theme.spacing.sm,
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        borderBottom: `${rem(1)} solid ${theme.colorScheme === 'dark' ? 'transparent' : theme.colors.gray[2]
            }`,
        marginBottom: rem(120),
    },

    mainSection: {
        paddingBottom: theme.spacing.sm,
    },

    user: {
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
        padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
        borderRadius: theme.radius.sm,
        transition: 'background-color 100ms ease',

        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
        },

        [theme.fn.smallerThan('xs')]: {
            display: 'none',
        },
    },

    burger: {
        [theme.fn.largerThan('xs')]: {
            display: 'none',
        },
    },

    userActive: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
    },

    tabs: {
        [theme.fn.smallerThan('sm')]: {
            display: 'none',
        },
    },

    tabsList: {
        borderBottom: '0 !important',
    },

    tab: {
        fontWeight: 500,
        height: rem(38),
        backgroundColor: 'transparent',

        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1],
        },

        '&[data-active]': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
            borderColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[2],
        },
    },
}));

function UserNavBar() {

    const { isDarkMode } = useTheme();
    const imageSource = isDarkMode ? AniFaceDarkLogo : AniFaceLogo;

    const user = {
        name: "",
        image: "",
    };

    const tab = {
        tabs: ["Cartoonise", "Animated Smiling Cartoon", "Change Background", "Smiles"],
    };

    const { classes, theme, cx } = useStyles();
    const [tabOpened, { toggle: toggleTab }] = useDisclosure(false);
    const [userMenuOpened, setUserMenuOpened] = useState(false);

    const items = tab.tabs.map((tabs) => (
        <Tabs.Tab value={tabs} key={tabs}>
            {tabs}
        </Tabs.Tab>
    ));

    const form = useForm({
        initialValues: { email: '', password: 'secret', },
    
        // functions will be used to validate values at corresponding key
        validate: {
          email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
          password: (value) => (value.length >= 6 ? null : 'Passwod must be at least 6 characters long'),
        },
      });

    return (
        <div className={classes.header}>

            <Container className={classes.mainSection}>
                <Group position="apart">
                    <Burger opened={tabOpened} onClick={toggleTab} className={classes.burger} size="sm" />
                    <img src ={imageSource}  width = {200} height = {45}  object-fit = {'scale-down'} alt = "logo"/>
                    <Menu
                        width={260}
                        position="bottom-end"
                        transitionProps={{ transition: 'pop-top-right' }}
                        onClose={() => setUserMenuOpened(false)}
                        onOpen={() => setUserMenuOpened(true)}
                        withinPortal
                    >
                        <Menu.Target>
                            <UnstyledButton
                                className={cx(classes.user, { [classes.userActive]: userMenuOpened })}
                            >
                                <Group spacing={7}>
                                    <Avatar src={user.image} alt={user.name} radius="xl" size={20} />
                                    <Text weight={500} size="sm" sx={{ lineHeight: 1 }} mr={3}>
                                        {user.name}
                                    </Text>
                                    <IconChevronDown size={rem(12)} stroke={1.5} />
                                </Group>
                            </UnstyledButton>
                        </Menu.Target>
                        <Menu.Dropdown>
                        <Menu.Label>User Options</Menu.Label>
                            <Menu.Item
                                icon={<IconHome2 size="0.9rem" color={theme.colors.blue[6]} stroke={1.5} />}
                            >
                                <Link to="/UserHome" style={{ textDecoration: 'none'}}>User  Homepage</Link>
                            </Menu.Item>
                            <Menu.Item
                                icon={<IconHelpOctagon size="0.9rem" color={theme.colors.yellow[6]} stroke={1.5} />}
                            >
                                <Link to="/UserFAQPage" style={{ textDecoration: 'none'}}>User FAQ Page</Link>
                            </Menu.Item>
                            <Menu.Item
                                icon={<IconUserPlus size="0.9rem" color={theme.colors.red[6]} stroke={1.5} />}
                            >
                                <Link to="/UserSubscriptionPlans" style={{ textDecoration: 'none'}}>User Subscription Page</Link>
                            </Menu.Item>
                            <Menu.Item
                                icon={<IconMessageChatbot size="0.9rem" color={theme.colors.green[6]} stroke={1.5} />}
                            >
                                <Link to="/UserSupportPage" style={{ textDecoration: 'none'}}>User Support Page</Link>
                            </Menu.Item>

                            <Menu.Item
                                icon={<IconClipboardList size="0.9rem" color={theme.colors.cyan[6]} stroke={1.5} />}
                            >
                                <Link to="/UserTermsAndConditions" style={{ textDecoration: 'none'}}>Terms and Condition</Link>
                            </Menu.Item>

                            <Menu.Divider />

                            <Menu.Label>Account</Menu.Label>
                            <Menu.Label>Admin</Menu.Label>

                            <Menu.Item icon={<IconHome2 size="0.9rem" color={theme.colors.teal[6]} stroke={1.5} />}>
                                <Link to="/AdminHome" style={{ textDecoration: 'none'}}>Admin Homepage</Link>
                            </Menu.Item>

                            <Menu.Divider />

                            <Menu.Label>Customer Service Officer</Menu.Label>

                            <Menu.Item icon={<IconHome2 size="0.9rem" color={theme.colors.lime[6]} stroke={1.5} />}>
                                <Link to="/CustomerServiceOfficerHome" style={{ textDecoration: 'none'}}>Customer Service Officer Homepage</Link>
                            </Menu.Item>

                            <Menu.Divider />

                            <Menu.Label>Owner</Menu.Label>

                            <Menu.Item icon={<IconHome2 size="0.9rem" color={theme.colors.grape[6]} stroke={1.5} />}>
                                <Link to="/OwnerHome" style={{ textDecoration: 'none'}}>Owner Homepage</Link>
                            </Menu.Item>

                            <Menu.Divider />

                            <Menu.Label>Settings</Menu.Label>
                            <Menu.Item icon={<IconSettings size="0.9rem" color={theme.colors.blue[6]} stroke={1.5} />}>
                                <Link to="/UserSettingPage" style={{ textDecoration: 'none'}}>User Setting</Link>
                            </Menu.Item>

                            <Menu.Label>Logout</Menu.Label>
                            <Menu.Item
                            icon={<IconLogout size="0.9rem" color={theme.colors.blue[6]} stroke={1.5} />}
                            onClick={handleLogout}>
                                Logout
                            </Menu.Item>

                            <Menu.Label>Danger zone</Menu.Label>

                            <Menu.Item icon={<IconPlayerPause size="0.9rem" stroke={1.5} />}>
                                Pause subscription
                            </Menu.Item>
                            <Menu.Item color="red" icon={<IconTrash size="0.9rem" stroke={1.5} />}>
                                Delete account
                            </Menu.Item>
                            <Menu.Item
                                icon={<IconStar size="0.9rem" color={theme.colors.yellow[6]} stroke={1.5} />}
                            >
                                <Link to="/UsertermsAndConditions">View Terms & Conditions</Link>
                            </Menu.Item>
                        </Menu.Dropdown>
                    </Menu>
                </Group>
            </Container>
            <Container>
                <Tabs
                    defaultValue="Cartoonise"
                    variant="outline"
                    classNames={{
                        root: classes.tabs,
                        tabsList: classes.tabsList,
                        tab: classes.tab,
                    }}
                >
                    <Tabs.List>{items}</Tabs.List>
                </Tabs>
            </Container>
        </div>
    );
}

export default UserNavBar;