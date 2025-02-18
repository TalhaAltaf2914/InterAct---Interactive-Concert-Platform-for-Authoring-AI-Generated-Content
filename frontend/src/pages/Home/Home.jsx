import { Box, Button, ButtonGroup, Card, Container, Paper, TextField, Typography } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import PostAddIcon from '@mui/icons-material/PostAdd';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { Passage } from '../../components/Passage/Passage';
import { usePassagesStore } from '../../stores/PassagesStore/PassagesStore';
import { TransitionGroup } from 'react-transition-group';
import ReactPDF, { Page, Image, Text, View, Document, StyleSheet, PDFDownloadLink } from "@react-pdf/renderer";
import { useKeywordsStore } from '../../stores/KeywordsStore/KeywordsStore';
import { CollapseAlert } from '../../components/CollapseAlert/CollapseAlert';
import { useLoadingStore } from '../../stores/LoadingStore/LoadingStore';
import { useAlertStore } from '../../stores/AlertStore/AlertStore';

// Add styles for the image and text
const styles = StyleSheet.create({
  page: { flexDirection: "column", padding: 30 },
  card: { marginBottom: 20, padding: 10, border: "1px solid black", flexDirection: "column" },  // Changed to row for side-by-side
  title: { fontSize: 16, marginBottom: 10 },
  heading: { 
    fontWeight:'bold', 
    marginBottom: 10, 
    textTransform:'capitalize',
    textDecoration: "underline",
    textAlign:'center'
  },
  body: { fontSize: 12, flex: 1 },
  image: { width: 150, height: 150, marginLeft: 20 }, // Define image size and margin
});

const convertBase64ToBlobURL = (base64String) => {
  const byteCharacters = atob(base64String);
  const byteNumbers = new Array(byteCharacters.length).map((_, i) =>
    byteCharacters.charCodeAt(i)
  );
  const byteArray = new Uint8Array(byteNumbers);
  const blob = new Blob([byteArray], { type: "image/png" });
  return URL.createObjectURL(blob);
};

let tempPrevParams = {
  "messages": [],
  "mode": "instruct",
  "instruction_template": "Alpaca"
};

const MyPDFDocument = ({ passages, passageTexts, passageImages, getActivePassageIndex, getActiveImageIndex }) => {
  

  return(
  <Document title='InterAct Script'>
    
    <Page style={styles.page}>
      <Text style={styles.heading}>InterAct Script</Text>

      {passages.map((passage, index) => (
        <View style={styles.card} key={passage.id}>
          <Text style={styles.title}>Passage {index + 1}</Text>
          <View style={{flexDirection:'row', gap:'1rem'}}>
            {/* Display image if it exists */}
            {passageImages[index]?.images.length > 0
              && 
              // <Image style={styles.image} src={`data:image/${passageImages[index]?.images[0]?.includes('/9j/') ? 'jpeg' : 'png'};base64,${passageImages[index]?.images[0]}`} />
              // <Image  style={styles.image} src={`data:image/${passageImages[index]?.images[getActiveImageIndex(passage.id)]?.includes('/9j/') ? 'jpeg' : 'png'};base64,${passageImages[index]?.images[getActiveImageIndex(passage.id)]}`} />
              <Image  style={styles.image} src={`data:image/png;base64,${passageImages[index]?.images[getActiveImageIndex(passage.id)]}`} />
              // <Image style={styles.image} src={convertBase64ToBlobURL(passageImages[index]?.images[getActiveImageIndex(passage.id)])} />

            }
            {/* Ensure you're extracting and passing plain text */}
            {/* <Text style={styles.body}>{passageTexts[index]?.texts[passageTexts[index]?.texts.length - 1]}</Text> */}
            <Text style={styles.body}>{passageTexts[index]?.texts[getActivePassageIndex(passage.id)]}</Text>

          </View>
        </View>
      ))}
    </Page>
  </Document>
)};



export const Home = () => {

  // const [passages, setPassages] = useState([<Passage />]);
  const {
    passages, 
    passageTexts, 
    passageImages, 
    getActivePassageIndex, getActiveImageIndex, 
    addPassage, deletePassage,
    resetPassages, 
  } = usePassagesStore();

  const {
        alertMsg, setAlertMsg,
        showAlert, setShowAlert,
        severity, setSeverity
      } = useAlertStore();
  // const {isLoading, setIsLoading} = useLoadingStore();
  const [isGenerating, setIsGenerating] = useState(false);

  // const {resetKeywords} = useKeywordsStore();

  
  console.log(`num of passages: ${passages.length}`)
  console.log(passages)
  const pdfRef = useRef();
  const [pdfReady, setPdfReady] = useState(false); // Controls when to generate PDF

  const [pdfBlob, setPdfBlob] = useState(null);
const [loadingPDF, setLoadingPDF] = useState(false);

const generatePdfBlob = async () => {
  setLoadingPDF(true);
  const pdfDoc = <MyPDFDocument passages={passages} passageTexts={passageTexts} passageImages={passageImages} getActivePassageIndex={getActivePassageIndex} getActiveImageIndex={getActiveImageIndex} />;
  
  const asBlob = await ReactPDF.pdf(pdfDoc).toBlob();
  setPdfBlob(URL.createObjectURL(asBlob));
  setLoadingPDF(false);
};

// Call this function when data updates
// useEffect(() => {
//   generatePdfBlob();
// }, [passages, passageTexts, passageImages]);
  // useEffect(() => {
  //   // setPdfReady(true); // Update PDF when passages or images change
  // }, [passages, passageTexts, passageImages]);
  return (
    <Box 
      ref={pdfRef}
      elevation={3}
      sx={{
        paddingBlock:"3rem",
        paddingInline: '2rem',
        display:'flex',
        flexDirection:"column",
        // justifyContent: 'space-evenly',
        alignContent:'center',
        rowGap:'4rem',
        // overflowY: 'scroll',
        // minHeight: '100vh',
        // height: '100vh',
      }}
    >

      {/* {
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
      {/* { 
      passages.length > 0
      && */}
      <Container 
        sx={{
          // border:'1px solid black',
          display:'flex',
          flexDirection:'row',
          justifyContent:'space-between',
          alignItems:'center',
          // paddingInline:'20rem',
          paddingBlock:'0.2rem',
          position: 'absolute',
          top:'6rem'
        }}
        // maxWidth
      >
        <Button
          color='primary'
          style={{
            // backgroundColor: "blue",
            // color: "white",
            width: "fit-content",
            padding: "0.4rem",
          }}
          endIcon={<FileDownloadIcon />}
          // disabled={!passageTexts[0]?.texts.length > 0 || !passageImages[0]?.images.length > 0}
          // disabled={isGenerating}
          disabled={!passageTexts[0]?.texts.length > 0 || !passageImages[0]?.images.length > 0
            || isGenerating
          }
          onMouseEnter={(e)=>{
            // if(!passageTexts[0].texts.length > 0){
            //   e.mo
            // }
          }}
          // onClick={() => setPdfReady(false)} // Reset state before triggering download
      >
        {/* {pdfReady ? ( */}
          <PDFDownloadLink
            document={
              <MyPDFDocument
                passages={passages}
                passageTexts={passageTexts}
                passageImages={passageImages}
                getActivePassageIndex={getActivePassageIndex}
                getActiveImageIndex={getActiveImageIndex}
              />
            }

            style={{textDecoration:'none'}}
            fileName="Passages.pdf"
            // onClick={() => setPdfReady(true)} // Ensure PDF updates after click
          >
            Export
          </PDFDownloadLink>
        {/* ) : ( */}
          {/* "Preparing..." */}
        {/* )} */}
      </Button>

        <Button 
          disabled={!passageTexts[0]?.texts.length > 0 || !passageImages[0]?.images.length > 0
          || isGenerating
          }

          // disabled={!isGenerating}
          endIcon={<RestartAltIcon />} 
          onClick={()=>{
            resetPassages()
            tempPrevParams = {
              "messages": [],
              "mode": "instruct",
              "instruction_template": "Alpaca"
            };

            setIsGenerating(false);
          }}
        >
          Reset
        </Button>
      </Container>
      {/* } */}
      
      
      {/* <TransitionGroup> */}
          {
            passages.length > 0
            &&
            passages.map((passage, index)=>(
              // <View style={styles.card} key={index}>
                <Passage 
                  key={passage.id} 
                  id={passage.id} 
                  index={index}
                  handleClose={deletePassage}
                  tempPrevParams={tempPrevParams}
                  isGenerating={isGenerating}
                  setIsGenerating={setIsGenerating}
                />
              //{/* </View> */}
              ))
            }
      {/* </TransitionGroup> */}

      {/* </Box> */}
      <Button
        
        sx={{
          width: 'fit-content',
          alignSelf:'center'
        }}
        
        variant='contained'
        onClick={()=>{
          let id = crypto.randomUUID();
          addPassage(
            {
              id: id,
              component: <Passage id={id}/>,
            }
          )
        }}  
      >
        <PostAddIcon />
      </Button>
    </Box>
  )
}
