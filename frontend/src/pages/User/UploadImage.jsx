import { useState, useEffect } from 'react';
import { Image, FileButton, Button, Group, Text, Space, Stack, LoadingOverlay } from '@mantine/core';
import { saveAs } from 'file-saver';
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import Tangled from './images/tangled_009_04680_optimized.jpg';
import TurningRed from './images/turningred_002_00624_optimized.jpg';
import HowToTrainYourDragon from './images/Cartoons_00448_01.jpg';
import Rapunzel from './images/Cartoons_00170_03.jpg';

function UploadImage({selectedTabIndex, remaining_filters, onUpdateRemainingFilters}) {
    const [file, setFile] = useState(null);
    const [cartoonizedSrc, setCartoonizedSrc] = useState(null);
    const [cartoonizedVideo, setCartoonizeVideo] = useState(null);
    const [remainingFilters, setRemainingFilters] = useState(remaining_filters);
    const [tangledFiltersUsed, setTangledFiltersUsed] = useState('');
    const [turningRedFiltersUsed, setTurningRedFiltersUsed] = useState('');
    const [dragonFiltersUsed, setDragonFiltersUsed] = useState('');
    const [rapunzelFiltersUsed, setRapunzelFiltersUsed] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        const fetchFilters = async () => {
          try {
            const db = getFirestore();
            const filtersDocRef = doc(db, 'filterUsage/filtersCount'); // Replace with the actual document ID
    
            const docSnapshot = await getDoc(filtersDocRef);
    
            if (docSnapshot.exists()) {
              const tangledValue = docSnapshot.data().tangled;
              const turningRedValue = docSnapshot.data().turningRed;
              const dragonValue = docSnapshot.data().howToTrainYourDragon;
              const rapunzelValue = docSnapshot.data().rapunzel;
              setTangledFiltersUsed(tangledValue);
              setTurningRedFiltersUsed(turningRedValue);
              setDragonFiltersUsed(dragonValue);
              setRapunzelFiltersUsed(rapunzelValue);
            } else {
              console.log('Document not found');
            }
          } catch (error) {
            console.error('Error fetching document:', error);
          }
        };
    
        fetchFilters();
      }, []);

    useEffect(() => {
        // Log the updated remainingFilters whenever it changes
        console.log('Remaining Filters:', remainingFilters);
    
        const updateRemainingFilters = async () => {
            const db = getFirestore();
            const userDocRef = doc(db, 'users', user.uid);
    
            try {
                // Save the editedUserData
                await updateDoc(userDocRef, {
                    remainingFilters: remainingFilters,
                });
                onUpdateRemainingFilters(remainingFilters);
            } catch (error) {
                console.error('Error updating user data:', error);
            }
        };
    
        // Call the function to update remainingFilters
        updateRemainingFilters();
    }, [remainingFilters, user.uid]);

    useEffect(() => {
        setCartoonizedSrc(null);
        setCartoonizeVideo(null);
    }, [selectedTabIndex]);
    

    const cartoonizeImage = async () => {
        const formData = new FormData();
        formData.append('image', file);
        formData.append('number', selectedTabIndex);

        setRemainingFilters((prevFilters) => {
            console.log('Previous Remaining Filters:', prevFilters);
            return prevFilters - 1;
        });
        
        try {
            setIsLoading(true);
            const response = await fetch('https://aniface-6o4g6hvz3a-as.a.run.app/process_image', {
            method: 'POST',
            body: formData,
            });
        
            // Handle the response as needed
            if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
            }
        
            if (response.ok) {
                setIsLoading(false);
                console.log("it is loading");
            // const resultBlob = await response.blob();
            // const resultImage = URL.createObjectURL(resultBlob);
            // // Display or use the resultImage as needed
            // setCartoonizedSrc(resultImage);
            // console.log(resultImage);

            const resultData = await response.json();

            // Decode and use the image data
            const imageData = `data:image/jpeg;base64, ${resultData.image}`;
            const videoData = `data:video/mp4;base64, ${resultData.video}`;
            setCartoonizedSrc(imageData);
            setCartoonizeVideo(videoData);

            // Update filter count based on the selectedTabIndex
            // Update filter count based on the selectedTabIndex
            let filterToUpdate;
            switch (selectedTabIndex) {
                case 1:
                    filterToUpdate = 'tangled';
                    setTangledFiltersUsed((prevCount) => prevCount + 1); // Update tangledFiltersUsed
                    break;
                case 2:
                    filterToUpdate = 'turningRed';
                    setTurningRedFiltersUsed((prevCount) => prevCount + 1); // Update turningRedFiltersUsed
                    break;
                case 3:
                    filterToUpdate = 'howToTrainYourDragon';
                    setDragonFiltersUsed((prevCount) => prevCount + 1); // Update dragonFiltersUsed
                    break;
                case 4:
                    filterToUpdate = 'rapunzel';
                    setRapunzelFiltersUsed((prevCount) => prevCount + 1); // Update rapunzelFiltersUsed
                    break;
                default:
                    // Handle unexpected cases
                    break;
            }

            if (filterToUpdate) {
                const db = getFirestore();
                const filtersDocRef = doc(db, 'filterUsage', 'filtersCount'); // Replace with the actual document ID

                // Get the current filters count
                const docSnapshot = await getDoc(filtersDocRef);
                const currentFiltersCount = docSnapshot.data();

                // Increment the count for the specific filter being used
                const updatedCount = currentFiltersCount[filterToUpdate] + 1;

                // Create an object with the updated count
                const updatedFilters = { [filterToUpdate]: updatedCount };

                // Update the document in Firestore
                await updateDoc(filtersDocRef, updatedFilters);
            }
            } 
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setIsLoading(false); // Set loading to false when image generation completes (success or failure)
        }
    };

    const clearFile = () => {
        setFile(null);
        setCartoonizedSrc(null);
        setCartoonizeVideo(null);
    };

    const imagePaths = [
        Tangled,
        TurningRed,
        HowToTrainYourDragon,
        Rapunzel,
      ];
    
    const selectedImage = imagePaths[selectedTabIndex - 1];

    const downloadImage = () => {
        saveAs(cartoonizedSrc);
      };
    
      const downloadVideo = () => {
        saveAs(cartoonizedVideo);
      };

    return (
        <div>
            <Stack align="center">
                <Group>
                <LoadingOverlay visible={isLoading}/>
                    {file ? (
                        <Image width={450} height={400} src={URL.createObjectURL(file)} alt="Original image" withPlaceholder />
                    ) : (
                        <Image width={450} height={400} src={null} alt="Original image" withPlaceholder />
                    )}
                    <Image width={450} height={400} src={selectedImage} alt={`Image ${selectedTabIndex}`} />
                    {cartoonizedSrc ? (
                        <Image width={450} height={400} src={cartoonizedSrc} alt="Modified image" withPlaceholder />
                    ) : (
                        <Image width={450} height={400} src={null} alt="Modified image" withPlaceholder />
                    )}
                    
                </Group>
                <Space h="xl" />

                <Group position="center">
                    <div>
                        {file ? (
                            <Button onClick={cartoonizeImage} disabled={parseInt(remainingFilters, 10) <= 0}>
                                Cartoonize
                            </Button>
                        ) : (
                            <FileButton onChange={setFile} accept="image/png,image/jpeg">
                                {(props) => <Button {...props} >Upload image</Button>}
                            </FileButton>
                        )}
                    </div>
                   
                    <Button disabled={!file} color="red" onClick={clearFile}>
                        Reset
                    </Button>
                  
                    <Button disabled={!cartoonizedSrc} color="green" onClick={downloadImage}>
                        Save Pic
                    </Button>

                    <Button disabled={!cartoonizedVideo} color="green" onClick={downloadVideo}>
                        Save MP4
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