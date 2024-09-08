"use client";
import React, { useState, useEffect } from "react";
import { Button, Box, Typography, Modal,IconButton,TextareaAutosize,Tooltip, TextField, Paper } from "@mui/material";
import { jsPDF } from "jspdf";
import { Home, Description, Drafts, Logout } from '@mui/icons-material';
import Link from 'next/link'; 
import WorkIcon from '@mui/icons-material/Work';
import DescriptionIcon from '@mui/icons-material/Description';

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


const CoverLetterPage = () => {
  
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [resume, setResume] = useState("");
  const [company, setCompany] = useState("");
  const [open, setOpen] = useState(false);
  const [coverLetter, setCoverLetter] = useState("");

  const [userInfo, setUserInfo] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
  });

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
    const data = {
          "name": "Eraj Tanweer",
          "address": "Karachi, Pakistan",
          "phone": "0333-2162005",
          "email": "tanweer4503065@cloud.neduet.edu.pk",
          "jobTitle": "Data Analyst",
          "coverLetter": "I am writing to express my interest in the Data Analyst position at your esteemed organization. As a detail-oriented and analytical individual with a strong foundation in programming languages such as Python, JavaScript, and Java, I am confident that I would be an excellent fit for this role. With a proven track record of delivering high-quality results in a timely manner, I am well-equipped to transform raw data into structured information and drive strategic decision-making. My experience in working with Node.js, Express.js, and databases has also honed my skills in data analysis and interpretation. Furthermore, my participation in the NFL Big Data Bowl 2024 has given me hands-on experience in analyzing complex datasets and producing actionable business insights. I am particularly drawn to this role because of the opportunity to apply my analytical skills to drive business growth and improvement. In my previous roles, I have consistently demonstrated my ability to work under pressure, meet tight deadlines, and communicate complex data insights to non-technical audiences. I am excited about the prospect of joining your team and contributing my skills and expertise to drive success. I am confident that my unique blend of technical skills, analytical abilities, and passion for data analysis make me an ideal candidate for this position."
      };
      // check the format it is being recieved in.
    return data;
  };

  useEffect(() => {
    const loadData = async () => {
      // call the api here and load the entire response in fetchData() response after converting to JSON format.
      const data = await fetchData();
      setJobTitle(data.jobTitle);
      setCompany(data.address); 
      
      setUserInfo(prevInfo => ({
        ...prevInfo,
        name: data.name || prevInfo.name,
        address: data.address || prevInfo.address,
        phone: data.phone || prevInfo.phone,
        email: data.email || prevInfo.email
      }));
      setCoverLetter(`Dear Hiring Manager, 
      ${data.coverLetter}
      Sincerely,
      ${data.name}`); 
    };
    loadData();
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleGenerate = () => {
    setCoverLetter(
      ``
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
    doc.text(`${userInfo.name}`, 15, 60);
    doc.text(`${userInfo.address}`, 15, 68);
    doc.text(`${userInfo.phone} • ${userInfo.email}`, 15, 76);

    doc.setFontSize(12);
    doc.text(coverLetter, 15, 90, { maxWidth: 180 }); 
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
      <Link href="/" passHref> 
        <IconButton sx={{ color: 'white' }} component="a">
          <Home />
        </IconButton>
      </Link>
    </Tooltip>
    <Tooltip title="Job Matching" placement="right">
      <Link href={href} passHref>
        <IconButton sx={{ color: 'white' }} component="a">
          <WorkIcon />
        </IconButton>
      </Link>
    </Tooltip>
    <Tooltip title="Cover Letter Generator" placement="right">
      <Link href="/coverletter" passHref> 
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
              <Typography variant="h6" sx={{ fontWeight: "bold", color: "#004d40" }}>
                {userInfo.name}
              </Typography>
              <Typography sx={{ marginBottom: "10px" }}>
                {userInfo.address} • {userInfo.phone} • {userInfo.email}
              </Typography>
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
    </Box>
  );
};

export default CoverLetterPage;

