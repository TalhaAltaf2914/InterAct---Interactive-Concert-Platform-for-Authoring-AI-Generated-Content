import { Box, Button, ButtonGroup, Card, CircularProgress, TextField } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import storedPassages from './passages.json'

const imagesWithoutKeywords = [
    {imgPath: '../../../src/assets/generatedImages/without_keywords/WhatsApp Image 2024-09-17 at 3.56.11 PM.jpeg'},
    {imgPath: '../../../src/assets/generatedImages/without_keywords/WhatsApp Image 2024-09-17 at 3.56.55 PM.jpeg'},
    {imgPath: '../../../src/assets/generatedImages/without_keywords/WhatsApp Image 2024-09-17 at 3.57.31 PM.jpeg'},
]

const imagesWithKeywords = [
    {imgPath: '../../../src/assets/generatedImages/with_keywords/WhatsApp Image 2024-09-17 at 6.29.38 PM.jpeg'},
    {imgPath: '../../../src/assets/generated    Images/with_keywords/WhatsApp Image 2024-09-17 at 6.29.39 PM.jpeg'},
    {imgPath: '../../../src/assets/generatedImages/with_keywords/WhatsApp Image 2024-09-17 at 6.29.39 PM(1).jpeg'},
]
export const PassageInput = (
    {
        setImages,
        keywords,
    }
) => {

    const [isLoading, setIsLoading] = useState(false)
    const [passageCount, setPassageCount] = useState(0)
    const [generatedPassages, setGeneratedPassages] = useState([])
    const [passageInput, setPassageInput] = useState("")
    const passageInputRef = useRef(null)


    const generatePassage = async () =>{
        setIsLoading(true)
        setTimeout(()=>{setIsLoading(false)}, 2000)
        setGeneratedPassages(storedPassages)
        setPassageInput(storedPassages[0].passage)
        if(keywords.length >=1 ){
            
            setImages(imagesWithKeywords)
        }
        else{
            setImages(imagesWithoutKeywords)
        }
         
    }

    const handlePassageChange = (button) =>{
        console.log(button)
        if(button === "nextButton"){
            setPassageCount((count)=> count + 1)
        }
        else{
            setPassageCount(count => count - 1)
        }
    }

    useEffect(()=>{
        if(passageCount === generatedPassages.length) return

        setPassageInput(generatedPassages[passageCount].passage)
    }, [passageCount])

    console.log(passageCount)
    console.log(`generatedPassages.length = ${generatedPassages.length}`)
  return (
    <Box
        sx={{
            padding:'1rem',
            paddingTop: '0.5rem',
            width:'70%',
            minWidth:'300px'
        }}
    >

        <Box
            display={'flex'}
            flexDirection={'column'}
            rowGap={'0.5rem'}    
        >
            <TextField
                autoFocus
                ref={passageInputRef}
                value={passageInput}
                onChange={(e)=>setPassageInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' ? generatePassage():''}
                multiline
                rows={5}
                fullWidth
                placeholder="A potato flew around my room..."
                variant="filled"
            />

            <Box
                display={'flex'}
                justifyContent={'space-between'}
                alignItems={'center'}
            >
                <Button 
                    onClick={()=>generatePassage()}
                    variant='contained'
                    disabled={passageInput.length === 0} 
                    sx={{
                        gap:'0.3rem'
                    }}
                >
                    Generate Passage {isLoading && <CircularProgress sx={{color:'inherit'}} size={20}/>}
                </Button>
                
                <ButtonGroup variant="outlined">
                    <Button  
                        disabled={passageCount === 0}
                        onClick={()=> handlePassageChange("previousButton")}
                    >
                            <NavigateBeforeIcon />
                    </Button>
                    <Button 
                        // disabled={passageCount === 0}
                        disabled={!(generatedPassages.length >= 2) || (passageCount + 1 === generatedPassages.length)}
                        onClick={()=> handlePassageChange("nextButton")}
                    ><NavigateNextIcon /></Button>
                </ButtonGroup>
            </Box>
        </Box>
    </Box>
  )
}
