import { useState } from 'react';
import { Image, FileButton, Button, Group, Text } from '@mantine/core';

function UploadImage() {
    const [file, setFile] = useState(null);
    const [resetRef] = useState(null);

    const ClearFile = () => {
        setFile(null);
    };

    return (
        <div>
            <Group position="center">
                <Image width={200} height={120} src={null} alt="With default placeholder" withPlaceholder />
                <FileButton resetRef={resetRef} onChange={setFile} accept="image/png,image/jpeg">
                    {(props) => <Button {...props}>Upload image</Button>}
                </FileButton>
                <Button disabled={!file} color="red" onClick={ClearFile}>
                    Reset
                </Button>
            </Group>

            {file && (
                <Text size="sm" align="center" mt="sm">
                    Picked file: {file.name}
                </Text>
            )}
        </div>
    );
}

export default UploadImage;