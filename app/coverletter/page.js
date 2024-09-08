"use client";
import React, { useState, useEffect } from "react";
import { Pinecone } from '@pinecone-database/pinecone';
import { Button, Box, Typography, Modal,IconButton,TextareaAutosize,Tooltip, TextField, Paper } from "@mui/material";
import { jsPDF } from "jspdf";
import { Home, Description, Drafts, Logout } from '@mui/icons-material';
import Link from 'next/link'; 
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
  window.location.href = '/';
};


const CoverLetterPage = () => {
  
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [company, setCompany] = useState("");
  const [open, setOpen] = useState(true);
  const [coverLetter, setCoverLetter] = useState("");
  const [resumeMissing, setResumeMissing] = useState(false);


  const [userInfo, setUserInfo] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
  });

  const postJd = async (jd)=>{
    try{
      let user = sessionStorage.getItem("user");
      
      let id = sessionStorage.getItem("user");
    id = JSON.parse(id).userId;
      console.log("Calling cover letter");
      // setIsLoading(true);
      // const segments = jd.split('\n\n');
      const dt = await axios.post("/api/job-desc",{
        jd:jobDescription,
        id
      }, {
        headers: {
          "Content-Type": "application/json"
        }})
        
        console.log(dt.data.data,"POST JS RESPONSE");
        console.log(dt.data.status);
        // alert("postJd successful");
        if(dt.data.status=="Error"){

          console.log("finally");
          console.log(dt.data)
          setResumeMissing(true);
          // showResumeMissingModal(resumeMissing, setResumeMissing, getJobMatchingHref);
          // alert("Please go to job matching page and upload your resume first")
          return
        }


        let cvContent = dt.data.data;

        let summarizedVersion = await sendToLLM(jobDescription,cvContent);

        // console.log(summarizedVersion,"Summarized version of JD and Resume");

        const finalRes = await genResult(summarizedVersion.jd,summarizedVersion.resume,true)
        console.log("Cover letter call finished")
        return finalRes;

  }
  catch(e){
    console.log(e);
  }
}
  
const sendToLLM = async(jd,resumeContent,isCoverLetter)=>{
  const res = await axios.post("/api/summarize",{
    jd,
    resumeContent,
    isCoverLetter
  }, {
    headers: {
      "Content-Type": "application/json"
    }})

// console.log(res.data.data.resume,"Summarization response");
return res.data.data;
  }


const genResult = async (jd,resume,isCoverLetter)=>{
  const res = await axios.post("/api/matcher",{
      jd,resume,isCoverLetter
    }
  );
  // console.log("Matcher response: ",res.data);
  return res.data;
}




  const fetchData = async () => {
    // const response = await fetch('/api/your-endpoint');
    // const data = await response.json();

//     try {
//       const res = await fetch('/api', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ jd: prompt, resume:resume , isCoverLetter: true}),
//       });

//       if (!res.ok) {
//         throw new Error('Failed to fetch data from the API');
//       }

//       const data = await res.json();
//       console.log(data)

//     } catch (error: any) {
//       setError(error.message);
//     } finally {
//       setLoading(false);
//     }
    let data = {
          "name": "",
          "address": "",
          "phone": "",
          "email": "",
          "jobTitle": "",
          "coverLetter": "."
      };

  return data;
};

  useEffect(() => {
    const loadData = async () => {
      // call the api here and load the entire response in fetchData() response after converting to JSON format.
      const data = await fetchData();
      setJobTitle(data.jobTitle);
      setCompany(data.address); 
      setUserInfo(data)
      // setUserInfo(prevInfo => ({
      //   ...prevInfo,
      //   name: data.name || prevInfo.name,
      //   address: data.address || prevInfo.address,
      //   phone: data.phone || prevInfo.phone,
      //   email: data.email || prevInfo.email
      // }));
      setCoverLetter(`Dear Hiring Manager, 
      ${data.coverLetter}
      // Sincerely,
      // ${data.name}`); 
    };
    loadData();
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleGenerate = async () => {


    




    let llmRes = await postJd();
    
    console.log(llmRes)
    if(!llmRes){
       return}
    llmRes = JSON.parse(llmRes)

    // setUserInfo(prevInfo => ({
    
    //   name: llmRes.name!=""? llmRes.name : prevInfo.name,
    //   address: "",
    //   phone: llmRes.phone!=""? llmRes.phone : prevInfo.phone,
    //   email: llmRes.email!=""? llmRes.email : prevInfo.email,
   
    // }));

    setJobTitle(llmRes.jobTitle)


    setCoverLetter(
      `${llmRes.coverLetter}`
    ); // call the api here again
    handleClose();
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(22);
    doc.setTextColor(0, 77, 64); 
    doc.text(`${jobTitle} Cover Letter`, 105, 30, null, null, "center");

    doc.setDrawColor(0, 77, 64); 
    doc.setLineWidth(1);
    doc.rect(10, 40, 190, 250); 
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    // doc.text(`${userInfo.name}`, 15, 60);
    // doc.text(`${userInfo.address}`, 15, 68);
    // doc.text(`${userInfo.phone} • ${userInfo.email}`, 15, 76);

    doc.setFontSize(12);
    doc.text(coverLetter, 15, 50, { maxWidth: 180 }); 
    doc.save(`${jobTitle} - ${company} Cover Letter.pdf`);
  };

  // function getJobMatchingHref() {
  //   const storedUser = sessionStorage.getItem('user');
  
  //   if (storedUser) {
  //     const userObject = JSON.parse(storedUser);
  //     return userObject.userId ? '/jobmatching' : '/login';
  //   }
    
  //   return '/login'; // Default to /login if no user is stored
  // }
  // console.log(getJobMatchingHref());
  // function getJobMatchingHref() {
  //   const storedUser = sessionStorage.getItem('user');
  
  //   if (storedUser) {
  //     const userObject = JSON.parse(storedUser);
  //     return userObject.userId ? '/jobmatching' : '/login';
  //   }
  
  //   return '/login'; // Default to /login if no user is stored
  // }
  
    const [href, setHref] = useState('/login');
  
    useEffect(() => {
      const result = getJobMatchingHref();
      console.log('Generated href:', result);
      setHref(result);
    }, []);
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh", backgroundColor: "#f4f4f4" }}>
      
      ;

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
      <IconButton
        sx={{ color: 'white' }}
        component={Link}
        href="/"
      >
        <Home />
      </IconButton>
    </Tooltip>
    <Tooltip title="Job Matching" placement="right">
      <IconButton
        sx={{ color: 'white' }}
        component={Link}
        href={href}
      >
        <WorkIcon />
      </IconButton>
    </Tooltip>
    <Tooltip title="Cover Letter Generator" placement="right">
      <IconButton
        sx={{ color: 'white' }}
        component={Link}
        href="/coverletter"
      >
        <DescriptionIcon />
      </IconButton>
    </Tooltip>
  </Box>
  <Tooltip title="Logout" placement="right">
    <IconButton
      sx={{ color: 'white', marginBottom: '15px' }}
      onClick={handleLogout}
    >
      <Logout />
    </IconButton>
  </Tooltip>
</Box>

      <Box sx={{ display: "flex", flexDirection: "column", marginLeft: "70px", minHeight: "100vh", backgroundColor: "#f4f4f4" }}>
        <Typography
          variant="h4"
          sx={{
            color: "#004d40",
            fontWeight: "bold",
            textAlign: "center",
            padding: "20px 0",
            borderBottom: "2px solid #004d40",
            marginBottom: "20px",
            fontSize:"3rem"
          }}
        >
          Cover Letter Generator
          
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "space-around", flexGrow: 1 }}>
          <Paper
            elevation={6}
            sx={{
              p: 3,
              backgroundColor: "#fdfdfd",
              borderRadius: "12px",
              borderLeft: "10px solid #004d40",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              width: "45%",
              overflow: "hidden", 
              marginBottom:'40px'
            }}
          >
            <Typography variant="h6" gutterBottom sx={{ color: "#004d40", fontWeight: "bold", marginBottom: "10px",fontSize:'1.4rem'}}>
              {jobTitle} - {company}
            </Typography>
            <Button variant="contained" sx={{ backgroundColor: "#FFB100", mb: 3 }} onClick={handleOpen}>
              Switch Job
            </Button>
            <Typography variant="h6" gutterBottom sx={{ color: "#004d40" }}>
              Cover Letter
            </Typography>
            <TextareaAutosize
              minRows={15}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
                borderColor: "#c5bebe",
                backgroundColor: "#ece5e5",
                fontFamily: "Arial, sans-serif",
                fontSize: "16px",
                overflow: "auto", 
                resize: "none", 
              }}
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
            />
          </Paper>
          <Paper
            elevation={6}
            sx={{
              p: 3,
              backgroundColor: "#fdfdfd",
              borderRadius: "12px",
              borderLeft: "10px solid #004d40",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              width: "45%",
              overflow: "hidden", 
              marginBottom:'40px'
            }}
          >
            <Typography variant="h5" gutterBottom sx={{ color: "#004d40", fontWeight: "bold", marginBottom: "10px" }}>
              Preview
            </Typography>
            <Box
              sx={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "10px",
                minHeight: "200px",
                backgroundColor: "#ffffff",
                color: "#000",
                fontFamily: "Arial, sans-serif",
                fontSize: "16px",
                overflow: "auto", 
                wordBreak: "break-word", 
              }}
            >
              {/* <Typography variant="h6" sx={{ fontWeight: "bold", color: "#004d40" }}>
                {userInfo.name} */}
              {/* </Typography> */}
              {/* <Typography sx={{ marginBottom: "10px" }}>
                {userInfo.address} • {userInfo.phone} • {userInfo.email}
              </Typography> */}
              {coverLetter}
            </Box>
            <Button
              variant="contained"
              sx={{ mt: 2, backgroundColor: "#FFB100", color: "#004d40", fontWeight: "bold" }}
              onClick={handleExportPDF}
            >
              Download PDF
            </Button>
          </Paper>
        </Box>
      </Box>
      <Modal open={open} onClose={handleClose}>
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
          }}
        >
          <Typography variant="h6" gutterBottom>
            Enter Job Details
          </Typography>
          <TextField
            fullWidth
            label="job description"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Button
            variant="contained"
            sx={{ backgroundColor: "#FFB100", color: "#004d40", fontWeight: "bold" }}
            onClick={handleGenerate}
          >
            Generate
          </Button>
        </Box>
      </Modal>
    

      <Modal open={resumeMissing} onClose={() => 
      {
        setResumeMissing(false)
        window.location.href = '/jobmatching'
      }
      }>
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
          textAlign: "center",
        }}
      >
        <Typography variant="h6" gutterBottom>
          Resume not found! Please upload your resume to continue.
        </Typography>
        <Button
          variant="contained"
          sx={{ backgroundColor: "#FFB100", color: "#004d40", fontWeight: "bold" }}
          onClick={() => {
            window.location.href = getJobMatchingHref();
          }}
          >
          OK
        </Button>
      </Box>
      </Modal>
    </Box>
  );
};

export default CoverLetterPage;

