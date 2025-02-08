import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import ImageIcon from '@mui/icons-material/Image';
import { Fade } from '@mui/material';
import { useEffect } from 'react';
import { usePassagesStore } from '../../stores/PassagesStore/PassagesStore';
const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

// const images = [
//   {
//     label: 'San Francisco - Oakland Bay Bridge, United States',
//     imgPath:
//       'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60',
//   },
//   {
//     label: 'Bird',
//     imgPath:
//       'https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60',
//   },
//   {
//     label: 'Bali, Indonesia',
//     imgPath:
//       'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250',
//   },
//   {
//     label: 'Goč, Serbia',
//     imgPath:
//       'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60',
//   },
// ];

function Picture({passageId 
  // images
}) {
  
  const {passageImages, setActiveImageIndex, getActiveImageIndex, getPassageImages} = usePassagesStore();
  
  const [images, setImages] = React.useState([]);
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const [activeImage, setActiveImage] = React.useState("");
  const maxSteps = images.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    
    // setDisplayPassageImage(passageId, activeImage)
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  // useEffect(()=>{
  //   addDisplayPassageImage({id:passageId, image:""})
  // }, [])

  // useEffect(()=>{
  //   setDisplayPassageImage(passageId, activeImage)
  // }, [activeImage])

  console.log(passageImages);
  
  useEffect(() => {
    const fetchedImages = getPassageImages(passageId);
    console.log("Fetched images:", fetchedImages);
    if (fetchedImages.length > 0) {
      setImages([...fetchedImages]); // Force re-render
      // setActiveImage(fetchedImages[0]);
      setActiveImageIndex(passageId, activeStep)

    }
    else{
      setImages([]);
    }
  }, [passageId, activeStep, passageImages]);
  console.log(images);
  console.log(getActiveImageIndex(passageId))

  return (
    <Fade in timeout={{ enter: theme.transitions.duration.enteringScreen, exit: theme.transitions.duration.leavingScreen, }}>

    <Box sx={{ 
      // maxWidth: 330, 
      maxWidth: 512, 
      flexGrow: 1,  
    }}>
      {/* < */}
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {
          images.length === 0?
            <ImageIcon sx={{width: "100%",height:"150px" }}/>
          :
          images.map((step, index) => (
            <div 
              // key={step.label}
              key={index}
            >
              {Math.abs(activeStep - index) <= 2 ? 
              (
                <Box
                  component="img"
                  borderRadius={'1rem'}
                  sx={{
                    height: 512,
                    display: 'block',
                    // maxWidth: 400,
                    overflow: 'hidden',
                    width: '100%',
                    objectFit: "cover",
                  }}
                  // src={step.imgPath}
                  // alt={step.label}
                  onChange={()=>{setActiveImage(`data:image/${step.includes('/9j/') ? 'jpeg' : 'png'};base64,${step}`)}}
                  src={`data:image/${step.includes('/9j/') ? 'jpeg' : 'png'};base64,${step}`}
                  alt={"An image here"}
                />
                ) : null}
            </div>
          ))
        
        }
      </SwipeableViews>
      
      {/* {
        images.length > 1
          && */}
        <MobileStepper
          
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          nextButton={
            <Button
              size="small"
              onClick={handleNext}
              disabled={activeStep === maxSteps - 1 || images.length === 0}
            >
              {theme.direction === 'rtl' ? (
                <KeyboardArrowLeft />
              ) : (
                <KeyboardArrowRight />
              )}
            </Button>
          }
          backButton={
            <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
              {theme.direction === 'rtl' ? (
                <KeyboardArrowRight />
              ) : (
                <KeyboardArrowLeft />
              )}
            </Button>
          }
        />
      {/* } */}
    </Box>
    </Fade>

  );
}

export default Picture;
