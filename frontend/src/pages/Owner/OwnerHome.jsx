import { rem, Divider, ColorSchemeProvider, ActionIcon, useMantineColorScheme } from '@mantine/core';
import UserNavBar from "../General/UserNavBar";
import { TextInput, Checkbox, Button, Group, Text, Collapse, Box, Switch } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import { IconSun, IconMoonStars } from '@tabler/icons-react';

function OwnerHome() {

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
        <div>
            <div>
                <UserNavBar />
                <h2 style={titleStyle}>Owner Dashboard</h2>
                <hr style={lineStyle}/>
            </div>
            <Box maw={600} mx="auto">
                <form onSubmit={form.onSubmit((values) => console.log(values))}>
                    <Group position="left" mt="md">
                        <h3>Subscription Tier</h3>
                    </Group>

                    <TextInput disabled 
                    placeholder='Gold Tier'
                    label="Name"/>

                    <TextInput disabled
                    placeholder='SGD 9.90'
                    label='Price'/>

                    <TextInput disabled
                    placeholder="Unlimited Access To All Filters"
                    label="Description"/>

                    <Group position="right" mt="md">
                    <Button type="add" color='green'>Add</Button>
                    <Button type="delete" color='red'>Delete</Button>
                    <Button type="submit">Edit</Button>
                    </Group>
                </form>
            </Box>
        </div>
    );

}

export default OwnerHome;