import { Alert, AlertTitle, Backdrop, Box, Button, Chip, CircularProgress, Collapse, Grid, Paper, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useKeywordsStore } from '../../stores/KeywordsStore/KeywordsStore';
import { useAlertStore } from '../../stores/AlertStore/AlertStore';
import { useLoadingStore } from '../../stores/LoadingStore/LoadingStore';
import { CollapseAlert } from '../../components/CollapseAlert/CollapseAlert';
import { KeywordInput } from '../../components/KeywordInput/KeywordInput';

export const Audience = () => {
  // const [addedKeywords, setAddedKeywords] = useState([]);
  const {addedKeywords, setAddedKeywords} = useKeywordsStore();
  
  const {
    alertMsg, setAlertMsg,
    showAlert, setShowAlert,
    severity, setSeverity
  } = useAlertStore();
  
  const {isLoading, setIsLoading} = useLoadingStore();
  
  const handleSubmitButton = () =>{

    if(addedKeywords.length === 0){
      setSeverity("error");
      setAlertMsg("No keyword was entered.");
      setShowAlert(true);
      return;
    }

    setIsLoading(true);

    setSeverity("success");
    setAlertMsg("Successfully Entered Keywords!");
    setShowAlert(true);

    setAddedKeywords([]) 
    //better to clear array after response is 200 i.e OK
  }
  


  return (
    <>
        {/* remembert to add these reusable components in layout when adding redux or any other state mgmt  */}
        {/* <LoadingBackdrop isLoading={isLoading} /> */}

        {!isLoading &&
          <CollapseAlert 
          msg={alertMsg}
          severity={severity}
          timeoutInMinutes={4}

          setMsg = {setAlertMsg}
          setSeverity={setSeverity}
          showAlert={showAlert}
          setShowAlert={setShowAlert} 
        />
        }
        

    <Paper
      
      sx={{
        minHeight: "fit-content",
        marginInline:"10rem",
        paddingBlock:"1rem",
        paddingInline: '2rem',
        display:'flex',
        flexDirection:"column",
        gap: '1rem',
      }}
    >

        {/* instruction */}
        <Typography variant='h6'>Add keywords</Typography>
        
        {/* keyword input sections */}
        <KeywordInput 
          setAlertMsg={setAlertMsg}
          setShowAlert={setShowAlert}
          setSeverity={setSeverity}

          addedKeywords={addedKeywords}
          setAddedKeywords={setAddedKeywords} 
        />
        
        {/* submit button */}

        <Button 
          sx={{
            alignSelf:'flex-start',
            marginTop:'1rem'
          }}
          tabIndex={1} 
          variant='contained' 
          onClick={handleSubmitButton}>Submit</Button>
    </Paper>
    </>

  )
}
