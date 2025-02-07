import { Box, Button, CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import RefreshIcon from '@mui/icons-material/Refresh';
import Picture from './Picture';
import { usePassagesStore } from '../../stores/PassagesStore/PassagesStore';

export const PictureSection = ({ passageId }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [images, setImages] = useState([]);

    const { getPassageImages } = usePassagesStore();

    // useEffect(() => {
    //     console.log("Fetching images for passageId:", passageId);
    //     const fetchedImages = getPassageImages(passageId) || [];
    //     console.log("Fetched images:", fetchedImages);
    //     setImages(fetchedImages);
    // }, [passageId, getPassageImages]); // Ensure effect runs when `passageId` changes

    const generateImages = () => {
        setIsLoading(true);
        // Assume `newImages` is generated elsewhere
        setImages(newImages);
        setIsLoading(false);
    };

    // console.log("Images state:", images); // Debugging

    return (
        <Box flexGrow={1} display="flex" flexDirection="column" justifyContent="center" alignItems="center">
            <Picture passageId={passageId}
            //  images={images} 
             />
        </Box>
    );
};
