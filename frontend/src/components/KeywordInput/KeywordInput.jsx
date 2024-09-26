import React, { useState } from 'react'
import { Alert, AlertTitle, Box, Chip, Collapse, Paper, TextField, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';

export const KeywordInput = (
    {
        setAlertMsg, setShowAlert, setSeverity,
        addedKeywords, setAddedKeywords
    }
) => {
    
  const [isAdd, setIsAdd] = useState(false);
  const [keywordValue, setKeywordValue] = useState("");
  const [editingIndex, setEditingIndex] = useState(-1);


  const handleAddKeywordClick = (e) =>{
    setIsAdd(()=> true)
  }

  const handleEditKeywordClick = (keywordToEdit, index) => {
    setEditingIndex(index);
    setKeywordValue(keywordToEdit);
    
  }

  const handleEditKeyword = (index) => {
    const updatedArray = [
      ...addedKeywords.slice(0, index), // all elements before the index
      keywordValue,                      // new value at the index
      ...addedKeywords.slice(index + 1) // all elements after the index
    ];

    setAddedKeywords(updatedArray);
    setEditingIndex(null);
    setKeywordValue("");
  }

  const handleDeleteKeyword = (keywordToDelete) => {
    setAddedKeywords(addedKeywords.filter((keyword) => keyword !== keywordToDelete));
  };

  const handleAddKeyword = () =>{
    setIsAdd(false);
    console.log('here')
    console.log(`${keywordValue} in addedKeywords: ${addedKeywords.includes(keywordValue)}`)
    if(!addedKeywords.includes(keywordValue))
      addedKeywords.push(keywordValue);
    else{
      setAlertMsg("Keyword already exists.");
      setSeverity("error");
      setShowAlert(true);
    }
    setKeywordValue("");
  }

  const handleCancelInput = () =>{
    console.log('clicked outisde')
    setIsAdd(false);
    setEditingIndex(null);
    setKeywordValue("");
  }

  console.log(`added keywords: ${addedKeywords}`)
  return (
    <Box
        minWidth={'fit-content'}
        width={'100%'}
        display={'flex'}
        flexWrap={'wrap'}
        columnGap="0.5rem"
        rowGap="0.7rem"
    >

          
          {
            addedKeywords.map((keyword, index)=>(
              editingIndex === index?
              <Chip
                sx={{
                  minWidth:'fit-content',
                }}
                label={
                  <TextField 
                    variant='standard'
                    inputProps={{
                      style: { textAlign: "center" }, // Centers the text
                    }}
                    sx={{
                      border:'none',
                      outline:'none',
                      width:'6rem',
                      textAlign:'center',
                    }}
                    placeholder='cat'
                    value={keywordValue}
                    onChange={(e)=>setKeywordValue(e.target.value)}
                    onKeyDown={(e)=> e.key === "Enter"? handleEditKeyword(index) : null}
                    onBlur={handleCancelInput}
                    autoFocus
                    size='small'
                  />
                }
              />
            :
              <Chip 
            tabIndex={-1}

                label={keyword}
                key={index}
                onClick={() => handleEditKeywordClick(keyword, index)}
                onDelete={()=> handleDeleteKeyword(keyword)}
              />
            ))
          }

          {
            isAdd && 
            
            <Chip
              sx={{
                minWidth:'fit-content',
              }}
              
              label={
                <TextField 
                  variant='standard'
                  inputProps={{
                    style: { textAlign: "center" }, // Centers the text
                  }}
                  sx={{
                    border:'none',
                    outline:'none',
                    width:'6rem',
                    textAlign:'center',
                  }}
                  placeholder='cat'
                  value={keywordValue}
                  onChange={(e)=>setKeywordValue(e.target.value)}
                  onKeyDown={(e)=> e.key === "Enter"? handleAddKeyword() : null}
                  onBlur={handleCancelInput}
                  autoFocus
                  size='small'
                />
              }
            />
          }

          <Chip
            icon={<AddIcon />}
            tabIndex={0}
            label="Keyword"
            onClick={handleAddKeywordClick}
          />
    </Box>
  )
}
