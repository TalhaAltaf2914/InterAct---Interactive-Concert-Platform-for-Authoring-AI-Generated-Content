import { Box, Button, ButtonGroup, Card, CircularProgress, TextField } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import storedPassages from './passages.json'
import { usePassagesStore } from '../../stores/PassagesStore/PassagesStore';


export const PassageInput = (
    {
        passageId,
        passageInput="",
        setPassageInput,
    }
) => {

    const {
        passages, 
        passageTexts, getPassageTexts, 
        activePassageIndexes, setActivePassageIndex, getActivePassageIndex
    } = usePassagesStore();

    console.log(passages, passageTexts)
    // const [isLoading, setIsLoading] = useState(false)
    const [passageCount, setPassageCount] = useState(0)
    const [generatedPassages, setGeneratedPassages] = useState([])
    // const [passageInput, setPassageInput] = useState("")
    // passages: state.passages.filter(passage=> id !== passage.id)

    const passageInputRef = useRef(null)
    
    const handlePassageChange = (button) =>{
        console.log(button)
        if(button === "nextButton"){
            setPassageCount((count)=> count + 1)
            // setActivePassageIndex(passageId, passageCount)

        }
        else{
            setPassageCount(count => count - 1)
            // setActivePassageIndex(passageId, passageCount)
        }
    }

    // useEffect(()=>{
    //     setGeneratedPassages(getPassageTexts(passageId));
    //     let passagesLength = generatedPassages.length;
    //     setPassageInput(generatedPassages[passageCount])
    //     // handlePassageChange("nextButton")
    // }, [passageTexts])

    // useEffect(() => {
    //     const passagesFromStore = getPassageTexts(passageId);
    //     setGeneratedPassages(passagesFromStore); // This will set generated passages properly
    //     setPassageInput(passagesFromStore[passageCount]); // Update passage input
    //   }, [passageId, passageCount, getPassageTexts]);
      

    useEffect(() => {
        const passagesFromStore = getPassageTexts(passageId);
        console.log("Retrieved passages:", passagesFromStore); // Debugging
        if (passagesFromStore.length > 0) {
            // setPassageCount(passagesFromStore.length - 1)
            setPassageCount(passagesFromStore?.length - 1)
            setGeneratedPassages(passagesFromStore);
            setPassageInput(passagesFromStore[passageCount] || ""); // Avoid undefined errors
            setActivePassageIndex(passageId, passageCount)
            
        }
        else{
            setPassageCount(0);
            setGeneratedPassages([]);
            setPassageInput("");
            
        }
    }, [passageId, getPassageTexts(passageId)]); // Include passageTexts to detect updates



    useEffect(()=>{
        const passagesFromStore = getPassageTexts(passageId);
        setPassageInput(passagesFromStore[passageCount] || ""); // Avoid undefined errors

        setActivePassageIndex(passageId, passageCount)
    }, [passageCount])


    console.log(getActivePassageIndex(passageId))
    console.log(passageCount)
    console.log(generatedPassages)
    console.log(`generatedPassages.length = ${generatedPassages.length}`)
  return (
    <Box
        sx={{
            padding:'1rem',
            paddingTop: '0.5rem',
            // width:'70%',
            // minWidth:'300px',
            width: '100%',
            maxWidth: '512px'
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
                // onKeyDown={e => e.key === 'Enter' ? generatePassage():''} later
                multiline
                rows={20}
                inputProps={{
                    cols: 50
                  }}
                // maxRows={40}
                fullWidth
                placeholder="How shall we begin?"
                variant="filled"
            />

            <Box
                display={'flex'}
                justifyContent={'space-between'}
                alignItems={'center'}
            >
                {/* <Button 
                    onClick={()=>generatePassage()}
                    variant='contained'
                    disabled={passageInput.length === 0} 
                    sx={{
                        gap:'0.3rem'
                    }}
                >
                    Generate Passage {isLoading && <CircularProgress sx={{color:'inherit'}} size={20}/>}
                </Button> */}
                
                <ButtonGroup variant="outlined">
                    <Button  
                        // disabled={passageCount === 0}
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
