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

export const Passage = (
  {
    id=0,
    hasPicture=true,
    hasKeywords=true,
    hasInput=true,
    handleClose = (id) => {},
  }
) => {

  const {passages, passageTexts, addPassageText, addPassageImages, addDisplayPassageImage} = usePassagesStore();

  const [images, setImages] = useState([]);
  const [selectedKeywords, setSelectedKeywords] = useState(() => []);
  const [keywords, setKeywords] = useState(() => []);
  const [passageInput, setPassageInput] = useState("");
  const [isLoading, setIsLoading] = useState(false)

  console.log(`${selectedKeywords.map(keyword=>keyword)}`)

  // const generateImages = async () => {

  // }

  useEffect(()=>{
    if(passageTexts[0]?.texts.length === 0){
      setSelectedKeywords([])
    }
  }, [passages, passageTexts])
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

  const generate = async(passageId) => {
    setIsLoading(true);

    llmModelApi.post(
      // "http://localhost:1234/v1/completions",
      "/v1/chat/completions",
  //     {
  //       // "model": "Llama-3.1-8B",
  //       // "chat_instruct_command": `generate short story with these keywords: ${keywords.map(keyword=>keyword)}. start with: ${passageInput}`,
  //       // // "max_tokens": 200,
  //       // "mode": "chat-instruct",

  //       //completions request data
  //       // "model": "Llama-3.1-8B",
  //       // "prompt": passageInput,
  //       // "max_tokens": 1600,

  //       "messages": [
  //   {"role": "system", "content": "You are a helpful assistant who writes creative short stories."},
  //   {"role": "user", "content": "Write a short story using the keywords: Headphones, cars, flashlight. The story should start with 'A cat using a phone'."}
  // ],
  // "model": "Llama-3.1-8B",
  // "frequency_penalty": 0.5,
  // "function_call": null,
  // "functions": [],
  // "logit_bias": {},
  // "max_tokens": 200,
  // "n": 1,
  // "presence_penalty": 0.6,
  // "stop": ["\n\n"],
  // "stream": false,
  // "temperature": 0.9,
  // "top_p": 0.95,
  // "user": "example-user",
  // "mode": "instruct",
  // "instruction_template": null,
  // "instruction_template_str": null,
  // "character": null,
  // "name2": null,
  // "context": null,
  // "greeting": null,
  // "name1": null,
  // "user_bio": null,
  // "chat_template_str": null,
  // "chat_instruct_command": null,
  // "continue_": false,
  // "preset": null,
  // "min_p": 0,
  // "dynamic_temperature": false,
  // "dynatemp_low": null,
  // "dynatemp_high": null,
  // "dynatemp_exponent": null,
  // "smoothing_factor": null,
  // "smoothing_curve": null,
  // "top_k": 40,
  // "repetition_penalty": 1.2,
  // "repetition_penalty_range": 512,
  // "typical_p": null,
  // "tfs": null,
  // "top_a": null,
  // "epsilon_cutoff": null,
  // "eta_cutoff": null,
  // "guidance_scale": null,
  // "negative_prompt": "",
  // "penalty_alpha": null,
  // "mirostat_mode": null,
  // "mirostat_tau": null,
  // "mirostat_eta": null,
  // "temperature_last": null,
  // "do_sample": true,
  // "seed": 42,
  // "encoder_repetition_penalty": null,
  // "no_repeat_ngram_size": 2,
  // "dry_multiplier": null,
  // "dry_base": null,
  // "dry_allowed_length": null,
  // "dry_sequence_breakers": null,
  // "xtc_threshold": null,
  // "xtc_probability": null,
  // "truncation_length": null,
  // "max_tokens_second": null,
  // "prompt_lookup_num_tokens": null,
  // "custom_token_bans": "",
  // "sampler_priority": null,
  // "auto_max_new_tokens": false,
  // "ban_eos_token": false,
  // "add_bos_token": true,
  // "skip_special_tokens": true,
  // "grammar_string": null
  //     }
  {
    "messages": [
        {
          "role": "user",
          "content": `Write the first paragraph of short story with these keywords ${selectedKeywords.map(keyword=>keyword)} in 5 sentences. Start with ${passageInput}`
        }
      ],
      "mode": "instruct",
      "instruction_template": "Alpaca"
  }
    )
    .then(res =>{
      let generatedPassageText = res.data.choices[0].message.content;
      console.log(generatedPassageText);
      setPassageInput(generatedPassageText)
      addPassageText(passageId, generatedPassageText)
    })
    .catch((error)=>{
      console.error(error)
    })
    .finally(()=>{
      // setIsLoading(false);
    });

    imageModelApi.post(
      "/sdapi/v1/txt2img",
      {
        // "prompt": `Award winning photography ${selectedKeywords.map(keyword=>keyword)}, ${passageInput}`,
        "prompt": `${passageInput}`,
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
    })
    .catch((error)=>{
      console.error(error)
    })
    .finally(()=>{
      setIsLoading(false);
    });

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
      <Box
        width={'100%'}
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'flex-start'}
      >
        { hasKeywords && <PassageKeywords keywords={keywords} selectedKeywords={selectedKeywords} setSelectedKeywords={setSelectedKeywords}/> }
        
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
              onClick={()=>generate(id)}
              variant='contained'
              disabled={passageInput?.length === 0} 
              sx={{
                  gap:'0.3rem'
              }}
          >
              Generate Passage {isLoading && <CircularProgress sx={{color:'inherit'}} size={20}/>}
          </Button>
        </Box>
        {hasPicture && <PictureSection passageId={id} setImages={setImages} images={images}/>}
      </Box>

      {/* <Box></Box> */}
    </Card>
    </Fade>

  )
}
