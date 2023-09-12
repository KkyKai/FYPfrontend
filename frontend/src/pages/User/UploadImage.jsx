import { useState } from 'react';
import { Image, FileButton, Button, Group, Text, Space, Stack } from '@mantine/core';

function UploadImage() {
    const [file, setFile] = useState(null);
    const [resetRef] = useState(null);

    const ClearFile = () => {
        setFile(null);
    };

    return (
        <div>
            <Stack align="center">
                <Image width={400} height={320} src={null} alt="With default placeholder" withPlaceholder />
                <Space h="xl" />

                <Group position="center">
                    <FileButton resetRef={resetRef} onChange={setFile} accept="image/png,image/jpeg">
                        {(props) => <Button {...props}>Upload image</Button>}
                    </FileButton>
                    <Button disabled={!file} color="red" onClick={ClearFile}>
                        Reset
                    </Button>
                </Group>
            </Stack>



            {file && (
                <Text size="sm" align="center" mt="sm">
                    Picked file: {file.name}
                </Text>
            )}
        </div>
    );
}

export default UploadImage;