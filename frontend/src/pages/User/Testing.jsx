import { useDisclosure } from '@mantine/hooks';
import { Modal, Button, Group } from '@mantine/core';
import { useState } from 'react';
import {
    createStyles,
    Container,
    Avatar,
    UnstyledButton,
    Text,
    Menu,
    Tabs,
    Burger,
    rem,
} from '@mantine/core';
import {
    IconLogout,
    IconHeart,
    IconStar,
    IconMessage,
    IconSettings,
    IconPlayerPause,
    IconTrash,
    IconSwitchHorizontal,
    IconChevronDown,
} from '@tabler/icons-react';
import { MantineLogo } from '@mantine/ds';
import { Link } from 'react-router-dom';

function Testing() {
  // Original code
const [tabOpened, { toggle: toggleTab }] = useDisclosure(false);
const [userMenuOpened, setUserMenuOpened] = useState(false);

// Updated code with the second useDisclosure
const [modalOpened, { open: openModal, close: closeModal }] = useDisclosure(false);

return (
    <>
    </>
);
}

export default Testing;
