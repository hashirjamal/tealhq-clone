"use client";
import React, { useState, useEffect, useRef } from "react";
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
import AOS from "aos";
import "aos/dist/aos.css";
import WorkIcon from '@mui/icons-material/Work';
import DescriptionIcon from '@mui/icons-material/Description';

const Login = () => {
  const [fileContent, setFileContent] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const [isJobDescriptionEmpty, setIsJobDescriptionEmpty] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const canvasContainerRef = useRef();

  useEffect(() => {
    AOS.init({ duration: 800 });
    pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
  }, []);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    setIsFileUploaded(true);
    if (!jobDescription) {
      setSnackbarOpen(true);
    }
  
    if (file.type === "application/pdf") {
      await renderPDFToCanvas(file);
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
  

  const renderPDFToCanvas = async (file) => {
    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const typedArray = new Uint8Array(e.target.result);
        const pdf = await pdfjsLib.getDocument({ data: typedArray }).promise;

        canvasContainerRef.current.innerHTML = "";

        const scale = 0.9;

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
        }
      };
      reader.readAsArrayBuffer(file);
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

  const handleSubmit = () => {
    if (!jobDescription) {
      setIsJobDescriptionEmpty(true);
      setSnackbarOpen(true);
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      console.log("File Content:", fileContent);
      console.log("Job Description:", jobDescription);
    }, 2000);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

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
              <IconButton sx={{ color: 'white',marginBottom:'15px'}} component="a">
                <Logout />
              </IconButton>
            </Link>
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