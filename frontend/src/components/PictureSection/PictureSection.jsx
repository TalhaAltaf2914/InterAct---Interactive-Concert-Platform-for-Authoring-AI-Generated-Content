import { Box, Button, CircularProgress } from '@mui/material'
import React, { useState } from 'react'
import RefreshIcon from '@mui/icons-material/Refresh';
import Picture from './Picture';

const newImages = [
    {imgPath: '../../../src/assets/generatedImages/new_images/WhatsApp Image 2024-09-17 at 5.17.15 PM.jpeg'},
    {imgPath: '../../../src/assets/generatedImages/new_images/WhatsApp Image 2024-09-17 at 5.17.46 PM.jpeg'},
    {imgPath: '../../../src/assets/generatedImages/new_images/WhatsApp Image 2024-09-17 at 5.18.31 PM.jpeg'},
]

export const PictureSection = ({images, keywords, setImages}) => {
    const [isLoading, setIsLoading] = useState(false);
    const generateImages = () =>{
        setIsLoading(true)
        setTimeout(()=>setIsLoading(false), 2000)
        setImages(newImages)

    }
  return (
    <Box flexGrow={1} display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
        <Picture images={images} />
        {
            images.length > 1
                && 
            <Button variant='outlined' onClick={()=>generateImages()}>
                {
                    isLoading?
                    <CircularProgress size={20}/>
                    :
                    <><RefreshIcon /> Generate New Images</> 
                }
            </Button>
        }
    </Box>
  )
}
