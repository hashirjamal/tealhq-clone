"use client";
import React, { useState } from "react";
import { Button, Box, Typography, Modal,IconButton,TextareaAutosize,Tooltip, TextField, Paper } from "@mui/material";
import { jsPDF } from "jspdf";
import { Home, Description, Drafts, Logout } from '@mui/icons-material';
import Link from 'next/link'; 
import WorkIcon from '@mui/icons-material/Work';
import DescriptionIcon from '@mui/icons-material/Description';

const CoverLetterPage = () => {
  
  const [jobTitle, setJobTitle] = useState("Operations Manager");
  const [company, setCompany] = useState("Acme Corp");
  const [open, setOpen] = useState(false);
  const [coverLetter, setCoverLetter] = useState(
    "Dear Hiring Manager, I am writing to express my interest in the Operations Manager position at Acme Corp..."
  );

  const userInfo = {
    name: "Tazeen Amir",
    address: "xyz",
    phone: "02234-3344",
    email: "tazeen75@icloud.com",
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleGenerate = () => {
    setCoverLetter(
      `Dear Hiring Manager,

I am writing to express my interest in the ${jobTitle} position at ${company}. With my background as a Web Developer at CODSOFT and OCTANET, I have honed my skills in ensuring operations are carried out in an appropriate and cost-effective manner...

Sincerely,
${userInfo.name}`
    );
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
      <Link href="/jobmatching" passHref> 
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
  <Link href="/login" passHref> 
        <IconButton sx={{ color: 'white',marginBottom:'15px' }} component="a">
          <Logout />
        </IconButton>
        </Link>
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
            label="Job Title"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
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

