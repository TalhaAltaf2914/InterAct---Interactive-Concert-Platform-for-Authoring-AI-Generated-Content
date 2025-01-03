import { Box, Button, ButtonGroup, Card, Container, Paper, TextField, Typography } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import AddIcon from '@mui/icons-material/Add';

import PostAddIcon from '@mui/icons-material/PostAdd';
import { Passage } from '../../components/Passage/Passage';
import { usePassagesStore } from '../../stores/PassagesStore/PassagesStore';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { TransitionGroup } from 'react-transition-group';
import ReactPDF, { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: { flexDirection: "column", padding: 30 },
  card: { marginBottom: 20, padding: 10, border: "1px solid black" },
  title: { fontSize: 16, marginBottom: 5 },
  body: { fontSize: 12 },
});


export const Home = () => {

  // const [passages, setPassages] = useState([<Passage />]);
  const {passages, setPassages, addPassage, deletePassage} = usePassagesStore();

  // const handleDeletePassage = (id) =>{
  //   setPassages(passages => passages.filter((passage, index) => id !== index))
  // }

  //on initial render display one passage
  // useEffect(()=>{
  //   //add one passage only if passages is empty
  //   if(passages.length === 0){
  //     setPassages([
  //       // {
  //       //   id:0, 
  //       //   passageComponent: <Passage id={passages.length}/>
  //       // }
  //       <Passage id={passages.length} />
  //     ])
  //   }

  // }, [])

  console.log(`num of passages: ${passages.length}`)
  console.log(passages)
  const [isExporting, setIsExporting] = useState(false);
  const pdfRef = useRef();
  const exportToPDF = async () => {
    const element = pdfRef.current;
    // const pdf = new jsPDF();
    // pdf.text("Hello, world!", 10, 10);
    // pdf.save("test.pdf");
    try {
      setIsExporting(true)
      // ReactPDF.render(<Document />, `SCRIPT.pdf`);
      // Capture the component
      console.log("Starting HTML2Canvas...");
        const element = pdfRef.current;
        const canvas = await html2canvas(element);
      console.log("Rendered HTML2Canvas...");

        const data = canvas.toDataURL('image/png');
    
        const pdf = new jsPDF();
        const imgProperties = pdf.getImageProperties(data);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight =
          (imgProperties.height * pdfWidth) / imgProperties.width;
    
        pdf.addImage(data, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('print.pdf');
    } catch (error) {
      console.error("Error exporting to PDF:", error);
    }
    finally{
      setIsExporting(false);
    }
  };
  
  return (
    <Box 
      // ref={pdfRef}
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
      <Button disabled={isExporting} onClick={exportToPDF}>Export</Button>
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
      <div ref={pdfRef}>
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
      </div>
      {/* </TransitionGroup> */}

      {/* </Box> */}
      <Button
        
        sx={{
          width: 'fit-content',
          alignSelf:'center'
        }}
        variant='contained'
        onClick={()=>{
          addPassage(
            {
              id: crypto.randomUUID(),
              component: <Passage id={crypto.randomUUID()}/>
            }
            
        )

        }}  
      >
        <PostAddIcon />
      </Button>
    </Box>
  )
}
