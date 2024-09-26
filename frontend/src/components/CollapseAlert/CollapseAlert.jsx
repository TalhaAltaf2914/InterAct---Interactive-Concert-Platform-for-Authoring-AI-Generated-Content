import { Alert, AlertTitle, Collapse } from '@mui/material'
import React, { useEffect, useState } from 'react'

export const CollapseAlert = ({
    msg="",
    timeoutInMinutes= 4,
    severity="info", // default severity
    showAlert=false,
    
    setSeverity,
    setShowAlert, 
    setMsg = () => "",
}) => {
    // const [alertMsg, setMsg] = useState(msg);
    useEffect(()=>{

        setTimeout(()=>{
          setShowAlert(false);
          setMsg("");
        //   setSeverity("info")
        }, timeoutInMinutes * 1000)
    }, [showAlert])
  return (
    <Collapse in={showAlert}>
        <Alert 
          severity={severity} 
        // sx={{ bgcolor: 'background.paper' }}
        >

        <AlertTitle>{msg}</AlertTitle>
      </Alert>
      </Collapse>
  )
}
