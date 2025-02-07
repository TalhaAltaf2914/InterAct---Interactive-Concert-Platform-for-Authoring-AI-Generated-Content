import { Box, Button, ButtonGroup, Card, Container, Paper, TextField, Typography } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import { useReactToPrint } from "react-to-print";
import html2pdf from 'html2pdf.js';
import PostAddIcon from '@mui/icons-material/PostAdd';
import { Passage } from '../../components/Passage/Passage';
import { usePassagesStore } from '../../stores/PassagesStore/PassagesStore';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { TransitionGroup } from 'react-transition-group';
import ReactPDF, { Page, Image, Text, View, Document, StyleSheet, PDFDownloadLink } from "@react-pdf/renderer";

// Add styles for the image and text
const styles = StyleSheet.create({
  page: { flexDirection: "column", padding: 30 },
  card: { marginBottom: 20, padding: 10, border: "1px solid black", flexDirection: "column" },  // Changed to row for side-by-side
  title: { fontSize: 16, marginBottom: 10 },
  body: { fontSize: 12, flex: 1 },
  image: { width: 150, height: 150, marginLeft: 20 }, // Define image size and margin
});

const MyPDFDocument = ({ passages, passageTexts, passageImages, getActivePassageIndex, getActiveImageIndex }) => {
  

  return(
  <Document>
    <Page style={styles.page}>
      {passages.map((passage, index) => (
        <View style={styles.card} key={passage.id}>
          <Text style={styles.title}>Passage {index + 1}</Text>
          <View style={{flexDirection:'row', gap:'1rem'}}>
            {/* Display image if it exists */}
            {passageImages[index]?.images 
              && 
              // <Image style={styles.image} src={`data:image/${passageImages[index]?.images[0]?.includes('/9j/') ? 'jpeg' : 'png'};base64,${passageImages[index]?.images[0]}`} />
              // <Image  style={styles.image} src={`data:image/${passageImages[index]?.images[getActiveImageIndex(passage.id)]?.includes('/9j/') ? 'jpeg' : 'png'};base64,${passageImages[index]?.images[getActiveImageIndex(passage.id)]}`} />
              <Image  style={styles.image} src={`data:image/png;base64,${passageImages[index]?.images[getActiveImageIndex(passage.id)]}`} />
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
  const {passages, passageTexts, passageImages, getActivePassageIndex, getActiveImageIndex, setPassages, addPassage, deletePassage} = usePassagesStore();

  
  console.log(`num of passages: ${passages.length}`)
  console.log(passages)
  const pdfRef = useRef();
  
  return (
    <Box 
      ref={pdfRef}
      elevation={3}
      sx={{
        paddingBlock:"1rem",
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
      { 
      passages.length > 0
      &&
      <PDFDownloadLink
        type='button'
        style={{backgroundColor: 'green', color:'white', fontWeight:'bold', width:'fit-content', textDecoration:'none', padding:'0.2rem', borderRadius:'0.2rem'}}
        document={<MyPDFDocument 
          passages={passages} 
          passageTexts={passageTexts}
          passageImages={passageImages}
          getActivePassageIndex={getActivePassageIndex}
          getActiveImageIndex={getActiveImageIndex}
        />}
        fileName="passages.pdf"
      >
        Export
      </PDFDownloadLink>

      }
      {/* <Box
        width={'100%'}
        overflowY={'scroll'}
        // height={'20vh'}
        display={'flex'}
        flexDirection={'column'}
        rowGap={'3rem'}
      > */}
      
      {/* <TransitionGroup> */}
      {/* <div ref={pdfRef}> */}
      {/* <Document>
        <Page size="A4" style={styles.page}>  */}
          {
            passages.length > 0
            &&
            passages.map((passage, index)=>(
              // <View style={styles.card} key={index}>
                <Passage 
                  key={passage.id} 
                  id={passage.id} 
                  handleClose={deletePassage}
                />
              //{/* </View> */}
              ))
            }
        {/* </Page>
      </Document> */}
      {/* </div> */}
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
              // passageTexts: []
            }
          )

          // addPassageText(id)
          // passageTexts: [{id: 0, texts: []}]


        }}  
      >
        <PostAddIcon />
      </Button>
    </Box>
  )
}
