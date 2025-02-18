import { Box, Button, Card, CircularProgress, Fade } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { PassageInput } from './PassageInput'
import Picture from '../PictureSection/Picture'
import { PassageKeywords } from './PassageKeywords'
import { PictureSection } from '../PictureSection/PictureSection'
import CloseIcon from '@mui/icons-material/Close';
import { usePassagesStore } from '../../stores/PassagesStore/PassagesStore'

import axios from 'axios';
import { imageModelApi, llmModelApi } from '../../api/modelApis'
import { CollapseAlert } from '../CollapseAlert/CollapseAlert'
import { useAlertStore } from '../../stores/AlertStore/AlertStore'
import { useLoadingStore } from '../../stores/LoadingStore/LoadingStore'



export const Passage = (
  {
    id=0,
    index=0,
    isGenerating=false,
    setIsGenerating,
    hasPicture=true,
    hasKeywords=true,
    hasInput=true,
    handleClose = (id) => {},
    tempPrevParams,
  }
) => {
  const {
    passages, 
    passageTexts, addPassageText, getPassageTexts, 
    addPassageImages, getPreviousPassageActiveText, setActivePassageIndex} = usePassagesStore();

  const {
      alertMsg, setAlertMsg,
      showAlert, setShowAlert,
      severity, setSeverity
    } = useAlertStore();

    // const {isLoading, setIsLoading} = useLoadingStore(); 

  const [images, setImages] = useState([]);
  const [selectedKeywords, setSelectedKeywords] = useState(() => []);
  const [keywords, setKeywords] = useState(() => []);
  const [passageInput, setPassageInput] = useState("");
  const [isLoading, setIsLoading] = useState(false)
  const [prevParams, setPrevParams] = useState(
    {
    "messages": [
          // {
          //   "role": "user",
          //   "content": `Write the first paragraph of short story with these keywords ${selectedKeywords.map(keyword=>keyword)} in 5 sentences. Start with ${passageInput}`
          // },
          
        ],
        "mode": "instruct",
        "instruction_template": "Alpaca"
  }
);

  console.log(`${selectedKeywords.map(keyword=>keyword)}`)

  useEffect(()=>{
    if(passageTexts[0]?.texts.length === 0){
      setSelectedKeywords([])
    }
  }, [passages, passageTexts])

  
  // useEffect(()=>{
  //   if(getPassageTexts(id).length === 0){
  //     setSelectedKeywords([])
  //   }
  // }, [passages, passageTexts])

  useEffect(()=>{
    setIsLoading(true)
    axios.get("http://127.0.0.1:5000/get_random_keywords?count=6")
    .then(res=>{
      console.log(res.data.random_keywords);
      setKeywords(res.data.random_keywords)
    })
    .catch(err=>{
      console.log(err.message)
    })
    .finally(()=>{
      setIsLoading(false);
    })

    // addDisplayPassageImage({id: id, })

  }, [])

  const generate = async(passageId, index) => {
    // setIsLoading(true);
    setIsGenerating(true);
    // let llmParams = {
    //   "messages": [
    //       {
    //         "role": "user",
    //         "content": `Write the first paragraph of short story with these keywords ${selectedKeywords.map(keyword=>keyword)} in 5 sentences. Start with ${passageInput}`
    //       },
          
    //     ],
    //     "mode": "instruct",
    //     "instruction_template": "Alpaca"
    // }
    // let tempPrevParams = prevParams;
    let generatedPassageText = "";

    console.log("tempPrevParams before if: ", tempPrevParams)
    
    //if first passage box
    if(passageId === passages[0].id){
      // first passage
      // let tempPrevParams = prevParams;


      //overwriting params for regenerationg
      // if(tempPrevParams?.messages.length > 0){
      //   tempPrevParams.messages = []
      // }
      tempPrevParams.messages[0] = 
      {
        "role": "user",
        "content": `Write the first paragraph of short story with these keywords ${selectedKeywords.map(keyword=>keyword)} in 5 sentences. Start with ${passageInput}`
      }
      
      setPrevParams(
        () => {
          console.log("prevParams: ", prevParams)
          
          prevParams.messages.push(
            {
              "role": "user",
              "content": `Write the first paragraph of short story with these keywords ${selectedKeywords.map(keyword=>keyword)} in 5 sentences. Start with ${passageInput}`
            }
          )
        


          return prevParams;
        }
      )
    }
    else{

      // other passages
    // if(passageId !== passages[0].id){
      let previousPassageActiveText = getPreviousPassageActiveText(passageId);
      console.log(`previousPassageActiveText: ${previousPassageActiveText}`)
      

      console.log("tempPrevParams?.messages[index + 1]: ", tempPrevParams?.messages[index + 1]);
      if(tempPrevParams?.messages[index * 2]){
        // tempPrevParams.messages[index] = {}
        tempPrevParams.messages[index * 2 - 1] = {
          "role": "assistant",
          "content": `${previousPassageActiveText}` //including the previous generated passages
        }

        tempPrevParams.messages[index * 2] = {
          "role": "user",
          "content": `Write a paragraph of a short story with these keywords: ${selectedKeywords.map(keyword=>keyword)} in 5 sentences. Start with ${passageInput} and continue with the knowledge of our past conversation`
        }
        let messagesLen = tempPrevParams.messages.length;

        //remove the rest of the parameters if it isn't the last passage
        if(((index * 2) + 1) !== messagesLen){
          tempPrevParams.messages.splice((index*2) + 1, tempPrevParams.messages.length);
        }
      }
      else{


        tempPrevParams.messages.push(
          {
            "role": "assistant",
            "content": `${previousPassageActiveText}` //including the previous generated passages
          },
          {
            "role": "user",
            "content": `Write a paragraph of a short story with these keywords: ${selectedKeywords.map(keyword=>keyword)} in 5 sentences. Start with ${passageInput} and continue with the knowledge of our past conversation`
          }
        )

    }

      setPrevParams(
        () => {
          // let messagesLen = prevParams?.messages?.length;
          // prevParams.messages[messagesLen - 1].role = "assistant"
          // let tempPrevParams = prevParams;
          console.log("prevParams: ", prevParams)
          prevParams.messages.push(
            {
              "role": "assistant",
              "content": `${previousPassageActiveText}` //including the previous generated passages
            },
            {
              "role": "user",
              "content": `Write a paragraph of a short story with these keywords: ${selectedKeywords.map(keyword=>keyword)} in 5 sentences. Start with ${passageInput} and continue with the knowledge of our past conversation`
            }
          )

          return prevParams;

        }
      )
      // llmParams.messages.push(
      //   {
      //     "role": "assistant",
      //     "content": `${previousPassageActiveText}` //including the previous generated passages
      //     // "content": `${.map(passageText => passageText)}` //including the previous generated passages
      //   },
      //   {
      //     "role": "user",
      //     "content": `Write a paragraph of a short story with these keywords: ${selectedKeywords.map(keyword=>keyword)} in 5 sentences. Start with ${passageInput} and continue with the knowledge of our past conversation`
      //   }
      // )
    }
    console.log("tempPrevParams before llm post call: ", tempPrevParams)
    console.log("prevParams before llm post call: ", prevParams)
    
    llmModelApi.post(
      // "http://localhost:1234/v1/completions",
      "/v1/chat/completions",
      // llmParams
      tempPrevParams
      // {
        
      //   "messages": [
      //       {
      //         "role": "user",
      //         "content": `Write the first paragraph of short story with these keywords ${selectedKeywords.map(keyword=>keyword)} in 5 sentences. Start with ${passageInput}`
      //       },
            
      //     ],
      //     "mode": "instruct",
      //     "instruction_template": "Alpaca"
      // }
    )
    .then(res =>{
      //let generatedPassageText = res.data.choices[0].message.content;
      generatedPassageText = res.data.choices[0].message.content;
      console.log(generatedPassageText);
      setPassageInput(generatedPassageText)
      addPassageText(passageId, generatedPassageText)
      // setActivePassageIndex()
      // setSeverity("success");
      // setAlertMsg("Successfully generated Passage. Please Try Again");
    })
    .catch((error)=>{
      console.error(error)
      // setSeverity("error");
      // setAlertMsg("Unable to generate Passage. Please Try Again");
      setIsGenerating(false);
    })
    .finally(()=>{
      // setShowAlert(true);
      // setIsLoading(false);
      imageModelApi.post(
        "/sdapi/v1/txt2img",
        {
          //"prompt": `Award winning photography, ${selectedKeywords.map(keyword=>keyword)}, ${generatedPassageText}`,
          "prompt": `Award winning photography, ${generatedPassageText}`,
          //"prompt": `${passageInput}`,
          "n_iter": 3,
          // "n_iter" : 3,
          "height" : 1024,
          "width" : 1024,
          "negative_prompt" : "disfigured, ugly, bad, immature, cartoon, anime, 3d, painting, b&w",
          // "refiner_checkpoint" : "sd_xl_refiner_1.0.safetensors [7440042bbd]",
          // "refiner_switch_at" : 0.8,
          "restore_faces": true,
          "seed": -1,
          "denoising_strength" : 0.7,
          "sampler_name" : "DPM++ 2M",
          "scheduler" : "Automatic",
          "batch_size" : 1,
          "cfg_scale" : 7,
          "disable_extra_networks" : false,
          "do_not_save_grid" : false,
          "do_not_save_samples" : false,
          "enable_hr" : false
  
        }
      )
      .then(res =>{
        console.log(res.data.images);
        setImages(res.data.images)
        addPassageImages(id, res.data.images)
        
        // setSeverity("success");
        // setAlertMsg("Successfully generated Passage");
        // setShowAlert(true);
      })
      .catch((error)=>{
        console.error(error)
        // set
        // setSeverity("error");
        // setAlertMsg("Unable to generate Passage. Please Try Again");
      })
      .finally(()=>{
        setIsGenerating(false);
        // setShowAlert(true);
      });
    });

    /* imageModelApi.post(
      "/sdapi/v1/txt2img",
      {
        "prompt": `Award winning photography, ${selectedKeywords.map(keyword=>keyword)}, ${passageInput}`,
        //"prompt": `${passageInput}`,
        "n_iter": 3,
        // "n_iter" : 3,
        "height" : 1024,
        "width" : 1024,
        "negative_prompt" : "disfigured, ugly, bad, immature, cartoon, anime, 3d, painting, b&w",
        // "refiner_checkpoint" : "sd_xl_refiner_1.0.safetensors [7440042bbd]",
        // "refiner_switch_at" : 0.8,
        "restore_faces": true,
        "seed": -1,
        "denoising_strength" : 0.7,
        "sampler_name" : "DPM++ 2M",
        "scheduler" : "Automatic",
        "batch_size" : 1,
        "cfg_scale" : 7,
        "disable_extra_networks" : false,
        "do_not_save_grid" : false,
        "do_not_save_samples" : false,
        "enable_hr" : false

      }
    )
    .then(res =>{
      console.log(res.data.images);
      setImages(res.data.images)
      addPassageImages(id, res.data.images)
      
      // setSeverity("success");
      // setAlertMsg("Successfully generated Passage");
      // setShowAlert(true);
    })
    .catch((error)=>{
      console.error(error)
      // set
      // setSeverity("error");
      // setAlertMsg("Unable to generate Passage. Please Try Again");
    })
    .finally(()=>{
      setIsLoading(false);
      // setShowAlert(true);
    }); */

  }

  return (
    
    <Fade in>
      

    <Card
    id={id}
      sx={{
        padding:'1rem',
        width:'100%',
        minWidth:'fit-content',
        display:"flex",
        flexDirection: 'column',
        justifyContent:'space-between',
        alignItems:'flex-start',
        columnGap:'2rem',
      }} 
    >

{/* {!isLoading &&
        <CollapseAlert 
        msg={alertMsg}
        severity={severity}
        timeoutInMinutes={4}

        setMsg = {setAlertMsg}
        setSeverity={setSeverity}
        showAlert={showAlert}
        setShowAlert={setShowAlert} 
      />
      } */}
      <Box
        width={'100%'}
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'flex-start'}
      >
        { hasKeywords && <PassageKeywords keywords={keywords} selectedKeywords={selectedKeywords} setSelectedKeywords={setSelectedKeywords}/> }
        
        {
          passages[0].id !== id
            &&
          <Button 
          variant='text'
          disabled={passages.length <= 1}
        onClick={(e)=>{
          // e.preventDefault();
          console.log(`Deleting passage with id: ${id}`)
          handleClose(id)
        }}>
          <CloseIcon />
        </Button>
        }
      </Box>

      <Box 
        sx={{
          // padding:'1rem',
          // width:'fit-content',
          width:'100%',
          display:"flex",
          justifyContent:'space-between',
          alignItems:'flex-start',
          columnGap:'2rem',
        }}
      >
        <Box>

          {
            hasInput 
              && 
            <PassageInput 
              passageId={id} 
              passageInput={passageInput} 
              setPassageInput={setPassageInput} 
            />
          }
          <Button 
              onClick={()=>generate(id, index)}
              variant='contained'
              disabled={passageInput?.length === 0 || isLoading 
                || isGenerating
              } 
              sx={{
                  gap:'0.3rem'
              }}
          >
              Generate Passage {isGenerating && <CircularProgress sx={{color:'inherit'}} size={20}/>}
          </Button>
        </Box>
        {hasPicture && <PictureSection passageId={id} setImages={setImages} images={images}/>}
      </Box>

      {/* <Box></Box> */}
    </Card>
    </Fade>

  )
}
