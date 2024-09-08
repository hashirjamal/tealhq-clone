"use client";

import React, { useState, useEffect, useRef } from "react";
import { storage,db } from "@/firebase.config";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import {doc,getDoc,collection, addDoc,setDoc} from "firebase/firestore";
import { Modal } from "@mui/material";
import {
  Typography,
  Button,
  Grid,
  Box,
  TextField,
  Container,
  Paper,
  Snackbar,
  CircularProgress,
  Tooltip,
  IconButton,
} from "@mui/material";
import UploadIcon from "@mui/icons-material/Upload";
import Link from "next/link";
import { Home, Logout } from "@mui/icons-material";
import * as pdfjsLib from "pdfjs-dist/build/pdf";
import * as mammoth from "mammoth";
// import { pdfjs } from 'react-pdf';
import AOS from "aos";
import "aos/dist/aos.css";
import WorkIcon from '@mui/icons-material/Work';
import DescriptionIcon from '@mui/icons-material/Description';
import axios from "axios";

function getJobMatchingHref() {
  const storedUser = sessionStorage.getItem('user');
  if (storedUser) {
    const userObject = JSON.parse(storedUser);
    return userObject.userId ? '/jobmatching' : '/login';
  }
  return '/login'; // Default to /login if no user is stored
}
const handleLogout = () => {
  sessionStorage.removeItem('user');
  console.log("User logged out successfully");
  window.location.href = '/';
};
const Login = () => {
  const [fileContent, setFileContent] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const [isJobDescriptionEmpty, setIsJobDescriptionEmpty] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const[cvFile,setFile] = useState(null);
  const canvasContainerRef = useRef();

  const [open,setOpen] = useState(false);
  const [href, setHref] = useState('/login'); // Add state for href
  const [cvUrl,setCvUrl] = useState(null);

  useEffect(() => {
    const result = getJobMatchingHref();
    setHref(result);
  }, []);
  useEffect(() => {
    AOS.init({ duration: 800 });
    //  pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.mjs'
    // pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.mjs";
    // pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.mjs";
    pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.mjs';
    const getResume = async ()=>{

      
  
      
      let id = sessionStorage.getItem("user");
    id = JSON.parse(id).userId;
    // check if there's a pdf stroed agains the current user if yes then call the renderPdf functiona and pass that url
    const docSnap = await getDoc(doc(db,"userResumes",id));
    
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());

      renderPDFToCanvas(docSnap.data().cv);
      setIsFileUploaded(true);
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  }

   getResume();



  }, []);

  const postResume = async (file)=>{

    setIsLoading(true);
    try{
      let id = sessionStorage.getItem("user");
      id = JSON.parse(id).userId;
        console.log("ID: "+id);
      if(!file){
        alert("PLease upload your resume");
        return;
      }
      
      setFile(file);
      
      
      const formData = new FormData();
      formData.append('file', file);
      formData.append('id', id);
      
      let res = await fetch("/api/resume",{
      method:"POST",
      body: formData
    })
    res = await res.json();
    console.log(res);
    
  }
  catch(e){
    console.log(e);
  }
  finally{
    setOpen(true);
    setIsLoading(false);

  }
    
  
    
  }
  
  const genResult = async (jd,resume)=>{
    const res = await axios.post("/api/matcher",{
        jd,resume
      }
    );
    // console.log("Matcher response: ",res.data);
    return res.data;
  }

  const saveResume = async (file)=>{
    if (!file) return;

    let id = sessionStorage.getItem("user").userId;
    const storageRef = ref(storage, `files/${id}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on("state_changed",
      (snapshot) => {
        const progress =
          Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        // setProgresspercent(progress);
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          console.log(downloadURL)
          setCvUrl(downloadURL);

          const docRef = await doc(db, 'cvResumes', id); // 'cvResumes' is the collection name
    
    // Add data to the document with the custom ID
    await setDoc(docRef, data);
    

        });
      }
    );
  }


  const sendToLLM = async(jd,resumeContent)=>{
    console.log("parameter of resumeCOntent "+resumeContent)
    const res = await axios.post("/api/summarize",{
      jd,
      resumeContent
    }, {
      headers: {
        "Content-Type": "application/json"
      }})
  
  // console.log(res.data.data.resume,"Summarization response");
  return res.data.data;
    }

  const postJd = async (jd)=>{
    try{
      setIsLoading(true);
      // const segments = jd.split('\n\n');
      let id = sessionStorage.getItem("user");
      id = JSON.parse(id).userId
      const dt = await axios.post("/api/job-desc",{
        jd,
        id
      }, {
        headers: {
          "Content-Type": "application/json"
        }})
        
        console.log(dt.data.data,"POST JS RESPONSE");
        // alert("postJd successful");

        console.log(dt.data )
        if(dt.data.status=="Error"){
          alert("Please go to job matching page and upload your resume first")
          return
        }

        let cvContent = dt.data.data;

        let summarizedVersion = await sendToLLM(jobDescription,cvContent);

        console.log(summarizedVersion,"Summarized version of JD and Resume");

        const finalRes = await genResult(summarizedVersion.jd,summarizedVersion.resume)


        const encodedData = encodeURIComponent(JSON.stringify(finalRes));

// Redirect to the ResultsPage with the encoded query parameter
// window.location.href = `/ResultsPage?response=${encodedData}`;
window.location.href = `/ResultsPage?response=${encodedData}`;

      // setResumeContent(dt.data.data)
      
    //   let res = await fetch("/api/job-desc",{
    //     method:"POST",
    //     headers: {
      //       "Content-Type": "application/json", // Ensure content type is set if sending JSON
    //   },
    //   body: jd
    // })
    
    // console.log(res+"aaaaa");
    
    // res = await res.json();
    
    // alert(res.status)
    // console.log(res+"aaaaa"); 
  }catch(e){
    console.log(e)
  }
  finally{
    setIsLoading(false);
  }
    
  }
  
  
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    console.log("file uploaded")
    setIsFileUploaded(true);
    if (!jobDescription) {
      setSnackbarOpen(true);
    }
  
    if (file.type === "application/pdf") {
      // renderPDFToCanvas(file);
      renderPDFToCanvas(file);
      await postResume(file);
    } else if (
      file.type ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      await readDOCX(file);
    } else {
      setFileContent(
        "Unsupported file type. Please upload a PDF or DOCX file."
      );
    }
  };
  

  const renderPDFToCanvas = async (fileOrUrl) => {
    try {
      let typedArray;

      console.log("rendering pdf " +fileOrUrl)
  
      // Check if input is a file or URL
      if (typeof fileOrUrl === 'string') {
        // Fetch PDF from URL
        let response = await axios.get(fileOrUrl, {
          responseType: 'blob', // Important to set this to 'blob' to handle binary data
        });
    
        console.log(response);
        response = response.data;
        const arrayBuffer = await response.arrayBuffer();
        typedArray = new Uint8Array(arrayBuffer);
      } else {
        // Handle file input
        const reader = new FileReader();
        await new Promise((resolve, reject) => {
          reader.onload = (e) => {
            typedArray = new Uint8Array(e.target.result);
            resolve();
          };
          reader.onerror = reject;
          reader.readAsArrayBuffer(fileOrUrl);
        });
      }
  
      // Load the PDF document using pdf.js
      const pdf = await pdfjsLib.getDocument({ data: typedArray }).promise;
      canvasContainerRef.current.innerHTML = "";
  
      const scale = 0.9;
  
      // Render each page of the PDF to the canvas
      for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        const page = await pdf.getPage(pageNum);
        const viewport = page.getViewport({ scale });
  
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        canvas.height = viewport.height;
        canvas.width = viewport.width;
  
        const renderContext = {
          canvasContext: context,
          viewport: viewport,
        };
        await page.render(renderContext).promise;
  
        canvas.style.marginBottom = "2px";
        canvasContainerRef.current.appendChild(canvas);
        console.log("rendering done")
      }
    } catch (error) {
      setFileContent(`Error reading file: ${error.message}`);
    }
  };
  

  const readDOCX = async (file) => {
    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const arrayBuffer = e.target.result;
        try {
          const result = await mammoth.extractRawText({
            arrayBuffer: arrayBuffer,
          });
          setFileContent(result.value);
        } catch (error) {
          setFileContent(`Error reading DOCX: ${error.message}`);
        }
      };
      reader.readAsArrayBuffer(file);
    } catch (error) {
      setFileContent(`Error reading file: ${error.message}`);
    }
  };

  const handleJobDescriptionChange = (event) => {
    setJobDescription(event.target.value);
    setIsJobDescriptionEmpty(false);
  };

  const handleSubmit = async () => {
    try{

      if (!jobDescription) {
        setIsJobDescriptionEmpty(true);
        setSnackbarOpen(true);
        return;
      }
      
      setIsLoading(true);
      

      //on Page load automatically check if the resume is already there in the db their if yes then load that pdf into renderPDFToCanvas and pass the uid id to the job-desc api which will be used by the pc.query function as the namespace
      // if the resume is not there in the db then let the user will upload the db and then show a popup asking him to save this resume for future use if he/she says yes then call the saveResume and proceed otherwise proceed directly





    await postJd(jobDescription);
    
    // setTimeout(() => {
      //   setIsLoading(false);
      //   console.log("File Content:", fileContent);
      //   console.log("Job Description:", jobDescription);
      // }, 2000);
    }
    catch(e){
      console.log(e)
    }
    finally{
      setIsLoading(false);

    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  function getCoverLetterHref() {

    if(!sessionStorage)
        {
          return '/login';
        }
    const storedUser = sessionStorage.getItem('user');
  
    if (storedUser) {
      const userObject = JSON.parse(storedUser);
      return userObject.userId ? '/coverletter' : '/login';
    }

    return '/login'; // Default to /login if no user is stored
  }

  return (
    <div
      style={{
        backgroundColor: "#f4f4f4",
        minHeight: "100vh",
        padding: 0,
        margin: 0,
        top: 0,
        position: "absolute",
        width: '100%',
      }}
    >

         
<Modal open={open} onClose={()=>setOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: "8px",
            color:'black'
          }}
        >
          <Typography variant="h6" gutterBottom>
            Do you want to save your resume for future use.
            Previous resume (if any) will be overwritten
          </Typography>

          <div style={{"display":"flex","justifyContent":"space-between"}}>

          
          <Button
            variant="contained"
            sx={{ backgroundColor: "#FFB100", color: "#004d40", fontWeight: "bold" }}
            onClick={()=>{
              saveResume(cvFile)
              setOpen(false);
            }}
            >
            Yes
          </Button>
          <Button
            variant="contained"
            sx={{ backgroundColor: "#FFB100", color: "#004d40", fontWeight: "bold" }}
            onClick={()=>{

              saveResume(cvFile);
              setOpen(false);
            }}
            >
            No
          </Button>
            </div>
        </Box>
      </Modal>
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          height: '100%',
          width: '60px',
          backgroundColor: '#004d40',
          borderRadius: '0 8px 8px 0',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          paddingTop: '12px',
          justifyContent: 'space-between', 
        }}
      >
        <img
          src="https://app.tealhq.com/content/images/teal_logo_small.svg"
          alt="Teal Logo"
          style={{ marginBottom: '24px', height: '32px' }}
        />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '70px', 
            marginTop: 'auto',
            marginBottom: 'auto',
          }}
        >
          <Tooltip title="Home" placement="right">
            <Link href="/" passHref>
              <IconButton sx={{ color: 'white' }} component="a">
                <Home />
              </IconButton>
            </Link>
          </Tooltip>
          <Tooltip title="Job Matching" placement="right">
      <Link href={getJobMatchingHref()} passHref>
        <IconButton sx={{ color: 'white' }} component="a">
          <WorkIcon />
        </IconButton>
      </Link>
    </Tooltip>
          <Tooltip title="Cover Letter Generator" placement="right">
            <Link href={getCoverLetterHref()} passHref>
              <IconButton sx={{ color: 'white' }} component="a">
                <DescriptionIcon />
              </IconButton>
            </Link>
          </Tooltip>
        </Box>
        <Tooltip title="Logout" placement="right">
          <IconButton sx={{ color: 'white', marginBottom: '15px' }} onClick={handleLogout}>
            <Logout />
          </IconButton>
        </Tooltip>
        
      </Box>

      <Container maxWidth="lg" sx={{ mt: 2 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mt: 2,
            mb: 2,
            justifyContent: "center",
            width: "100%",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              color: "#004d40",
              fontWeight: "bold",
              textAlign: "center",
              padding: "20px 0",
              marginBottom: "20px",
              fontSize: "3rem"
            }}
          >
            Job Matching
          </Typography>
        </Box>
        <Grid container spacing={4} justifyContent="center">
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              margin: "0 auto",
              transition: "transform 0.5s ease-in-out",
              marginBottom: "40px",
              transform: isFileUploaded ? "translateX(-5%)" : "none",
            }}
          >
            <Paper
              elevation={6}
              sx={{
                p: 3,
                backgroundColor: "#fdfdfd",
                borderRadius: "12px",
                borderLeft: "10px solid #004d40",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  fontWeight: "750",
                  fontSize: "1.6rem",
                  mb: 2,
                  fontFamily: "komika axis",
                }}
              >
                Upload resume
              </Typography>
              <Button
                variant="contained"
                component="label"
                startIcon={<UploadIcon />}
                sx={{
                  backgroundColor: "#FFB100",
                  color: "#fff",
                  borderRadius: "20px",
                  padding: "10px 20px",
                  fontWeight: "bold",
                  "&:hover": {
                    backgroundColor: "#FFA000",
                  },
                }}
              >
                Upload File
                <input type="file" hidden onChange={handleFileUpload} />
              </Button>
              <Box
                ref={canvasContainerRef}
                sx={{
                  overflowY: "auto",
                  height: "calc(100vh - 180px)",
                  p: 2,
                  mt: 2,
                  borderRadius: "8px",
                  backgroundColor: "#fafafa",
                  boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.1)",
                }}
              >
              </Box>
            </Paper>
          </Grid>

          {isFileUploaded && (
            <Grid
              item
              xs={12}
              md={6}
              data-aos="fade-left"
            >
              <Paper
                elevation={6}
                sx={{
                  p: 3,
                  backgroundColor: "#fdfdfd",
                  borderRadius: "12px",
                  borderRight: "10px solid #004d40",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                }}
              >
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{
                    fontWeight: "750",
                    fontSize: "1.6rem",
                    mb: 1,
                    fontFamily: "komika axis",
                  }}
                >
                  Job Description
                </Typography>
                <TextField
                  multiline
                  minRows={20}
                  maxRows={40}
                  variant="outlined"
                  fullWidth
                  value={jobDescription}
                  onChange={handleJobDescriptionChange}
                  sx={{
                    fontFamily: "Arial",
                    fontSize: "0.875rem",
                    lineHeight: "1.5",
                    backgroundColor: "#fafafa",
                    borderRadius: "12px",
                    padding: "10px",
                    boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.1)",
                  }}
                />
              </Paper>
              <Box
                sx={{
                  mt: 4,
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    backgroundColor: "#FFB100",
                    color: "#fff",
                    padding: "15px 30px",
                    borderRadius: "30px",
                    fontSize: "1rem",
                    fontWeight: "bold",
                    boxShadow: "0 6px 10px rgba(0, 0, 0, 0.15)",
                    "&:hover": {
                      backgroundColor: "#FFA000",
                    },
                    width: "200px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "30px",
                  }}
                  onClick={handleSubmit}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    "Match Jobs"
                  )}
                </Button>
              </Box>
            </Grid>
          )}
        </Grid>

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={handleSnackbarClose}
          message="Enter a job description"
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        />
      </Container>
    </div>
  );
};

export default Login;