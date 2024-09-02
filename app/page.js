'use client';
import Head from 'next/head';
import Link from 'next/link';
import { AppBar, Toolbar, Typography, Button, Container, Box, Grid } from '@mui/material';
import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import HomeIcon from '@mui/icons-material/Home';
import WorkIcon from '@mui/icons-material/Work';
import DescriptionIcon from '@mui/icons-material/Description';

export default function Home() {
    useEffect(() => {
      AOS.init({ duration: 1000 });
    }, []);
    const steps = [
      {
        number: 1,
        title: "Import Your Existing Resume into the Resume Builder",
        descriptionPart1: "If you don't have an existing resume, you can import your LinkedIn profile, or create a resume from scratch in minutes.",
        descriptionPart2: "The more details you provide in your resume, the better your comparison will be.", 
        additionalImgSrc: "/Screenshot 2024-09-01 011153.png",
        imgSrc: "https://cdn.prod.website-files.com/627c8700df0be67c4b1d533c/652dbc4a562548aff2f22e60_Add_Your_Resume-p-800.png",
      },
      {
        number: 2,
        title: "Select a Job to Match with Your Resume",
        descriptionPart1: "Next, choose a specific job description that you want to attach to your resume. This should be a position that you're looking to apply for.",
        descriptionPart2: "You can either use the dropdown menu to select a job directly from your Job Tracker, or you can create a new job here to use for the comparison.",
        additionalImgSrc: "/Screenshot 2024-09-01 010445.png",
        imgSrc: "https://cdn.prod.website-files.com/627c8700df0be67c4b1d533c/652dbc510f87bd24668c76a1_Add_the_Description-p-800.png",
      },
      {
        number: 3,
        title: "Compare Your Resume to the Job Description",
        descriptionPart1: "Simply click “Analyze & Compare” and wait for your match score results to display.",
        descriptionPart2: "",
        additionalImgSrc: "/Screenshot 2024-09-01 010551.png",
        imgSrc: "https://cdn.prod.website-files.com/627c8700df0be67c4b1d533c/652dbe1b5b40e6da9f1e5d83_Job_Match_Score-p-800.png",
      },
      {
        number: 4,
        title: "Review Your Match Score Results",
        descriptionPart1: " Your Match Score will represent how closely your existing resume aligns with the job description you compared it to.",
        descriptionPart2: "A good match score is 80% or higher.",
        additionalImgSrc: "/Screenshot 2024-09-01 010626.png",
        imgSrc: "https://cdn.prod.website-files.com/627c8700df0be67c4b1d533c/652dbeca9cb0d9da95bec672_Job_Match_Score_80-p-800.png",
      },
    ];
  return (
    <div style={{ backgroundColor: '#fff', minHeight: '100vh',width: '100vw', }}>
      <Head>
        <title>Teal HQ Clone</title>
      </Head>

      
      
    <AppBar 
      position="sticky" 
      color="transparent" 
      elevation={0}
      sx={{
        top: 0,
        backgroundColor: '#fff',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        zIndex: 1000,
        minHeight: '60px', // Adjust height for better alignment
        padding: '4px 0',
      }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <img 
          src="https://cdn.prod.website-files.com/62775a91cc3db44c787149de/62775d8abf9f57629c567a0a_Group%201148.svg" 
          alt="Teal Logo" 
          style={{ height: '32px', marginLeft: '12px' }} 
        />
        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
          <Link href="/" passHref>
            <Button 
              color="inherit" 
              sx={{ 
                color: '#000', 
                mx: 3, 
                fontWeight: 'bold', 
                textTransform: 'none', 
                fontSize: '16px',
                borderRadius: '12px',
                padding: '8px 16px',
                transition: 'background-color 0.3s ease, transform 0.3s ease',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.1)',
                  textDecoration: 'underline',
                  transform: 'scale(1.05)', 
                },
              }}
            >
              <HomeIcon sx={{ mr: 1 }} /> Home
            </Button>
          </Link>
          <Link href="/jobmatching" passHref>
            <Button 
              color="inherit" 
              sx={{ 
                color: '#000', 
                mx: 3, 
                fontWeight: 'bold', 
                textTransform: 'none', 
                fontSize: '16px',
                borderRadius: '12px',
                padding: '8px 16px',
                transition: 'background-color 0.3s ease, transform 0.3s ease',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.1)',
                  textDecoration: 'underline',
                  transform: 'scale(1.05)',
                },
              }}
            >
              <WorkIcon sx={{ mr: 1 }} /> Job Matching
            </Button>
          </Link>
          <Link href="/coverletter" passHref>
            <Button 
              color="inherit" 
              sx={{ 
                color: '#000', 
                mx: 3, 
                fontWeight: 'bold', 
                textTransform: 'none', 
                fontSize: '16px',
                borderRadius: '12px',
                padding: '8px 16px',
                transition: 'background-color 0.3s ease, transform 0.3s ease',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.1)',
                  textDecoration: 'underline',
                  transform: 'scale(1.05)',
                },
              }}
            >
              <DescriptionIcon sx={{ mr: 1 }} /> Cover Letter
            </Button>
          </Link>
        </Box>

        <Box>
          <Link href="/signup" passHref>
            <Button 
              variant="contained" 
              sx={{
                backgroundColor: '#FFB100',
                color: '#000',
                borderRadius: '20px',
                fontWeight: 'bold',
                padding: '10px 20px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                marginLeft: '10px',
                '&:hover': {
                  backgroundColor: '#e0a800',
                },
              }}
            >
              Sign up
            </Button>
          </Link>

          <Link href="/login" passHref>
            <Button 
              variant="outlined" 
              sx={{
                borderColor: '#000000',
                color: '#000000',
                borderRadius: '20px',
                fontWeight: 'bold',
                padding: '10px 20px',
                marginLeft: '10px',
                '&:hover': {
                  borderColor: '#333',
                  color: '#333',
                },
              }}
            >
              Log in
            </Button>
          </Link>
        </Box>
      </Toolbar>
    </AppBar>
      <Container>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={10}>
        <Box maxWidth="600px" sx={{ ml: '-30px', mr: '40px' }}>
          <Typography 
            variant="h3" 
            gutterBottom 
            sx={{ 
              color: 'grey.800', 
              fontWeight: 'bold', 
              marginTop:'80px'
            }} 
          >
            Compare Your Resume to a Job Description
          </Typography>

          <Typography 
            variant="body1" 
            paragraph 
            sx={{ color: 'grey.800' }} 
          >
            The Resume Job Description Match tool allows you to quickly compare your existing resume
            to the job description of any role. Get an instant match score with a breakdown of how well
            your resume aligns with the language, keywords, and skills from the job. See how your resume
            stacks up to any job.
          </Typography>
          <Link href="/jobmatching" passHref>
            <Button 
              variant="contained" 
              size="large" 
              style={{
                backgroundColor: '#FFB100',
                color: '#000',
                borderRadius: '50px',
                fontWeight: 'bold',
                padding: '10px 20px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                marginTop:'20px'
              }}
            >
              Compare Your Resume to a Job
            </Button>
          </Link>
        </Box>
        <Box
          sx={{
            backgroundColor: '#f0f5f7',
            borderRadius: '12px',
            padding: '24px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            marginTop:'50px'
          }}
        >
          <img 
            src="https://cdn.prod.website-files.com/627c8700df0be67c4b1d533c/653160804efedd9911371dfb_Hero_JDMatch-p-500.png" 
            alt="Example" 
            style={{ width: '500px', height: 'auto', borderRadius: '8px' }} 
          />
        </Box>
      </Box>

      {/* Section 1.1 */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box
          sx={{
            backgroundColor: '#f0f5f7',
            borderRadius: '12px',
            padding: '24px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          
          }}
        >
          <img 
            src="https://cdn.prod.website-files.com/627c8700df0be67c4b1d533c/653160804efedd9911371dfb_Hero_JDMatch-p-500.png" 
            alt="Example" 
            style={{ width: '500px', height: 'auto', borderRadius: '8px' }} 
          />
        </Box>
        <Box maxWidth="600px" sx={{ ml: '40px' }}>
          <Typography 
            variant="h3" 
            gutterBottom 
            sx={{ 
              color: 'grey.800', 
              fontWeight: 'bold' ,
              marginTop:'30px'
            }} 
          >
            Compare Your Resume to a Job Description
          </Typography>

          <Typography 
            variant="body1" 
            paragraph 
            sx={{ color: 'grey.800' }} 
          >
            The Resume Job Description Match tool allows you to quickly compare your existing resume
            to the job description of any role. Get an instant match score with a breakdown of how well
            your resume aligns with the language, keywords, and skills from the job. See how your resume
            stacks up to any job.
          </Typography>
          <Link href="/coverletter" passHref>
            <Button 
              variant="contained" 
              size="large" 
              style={{
                backgroundColor: '#FFB100',
                color: '#000',
                borderRadius: '50px',
                fontWeight: 'bold',
                padding: '10px 20px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                marginTop:'20px'
              }}
            >
              Compare Your Resume to a Job
            </Button>
          </Link>
        </Box>
      </Box>
        <Box my={15} textAlign="center" >
          <Typography 
            variant="h4" 
            gutterBottom
            sx={{ 
              color: 'grey.800', 
              fontWeight: '680',
              fontSize: '2.4rem',
              mb: 8,
            }} 
          >
            Start Tailoring Your Resumes to Specific Jobs
          </Typography>

          <Grid container spacing={4} justifyContent="center" sx={{ mt: 6 }}>
            <Grid item xs={12} sm={4}>
              <img 
                src="https://cdn.prod.website-files.com/627c8700df0be67c4b1d533c/652db856592a53000902364f_Increase_Your_Match_Score-p-500.png" 
                alt="Match Score" 
                style={{ 
                  width: '100%', 
                  borderRadius: '16px', 
                  border: '1px solid #ddd', 
                  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' 
                }} 
              />
              <Typography variant="h6" gutterBottom sx={{ mt: 2, color: 'black', fontWeight: 'bold' ,textAlign: 'left',}}>
                Compare Your Resume to Any Job in Seconds
              </Typography>
              <Typography 
                variant="body2" 
                sx={{ 
                  color: 'grey.700', 
                  fontFamily: 'Roboto, sans-serif' ,
                  textAlign: 'left',
                  fontSize:'1rem'
                }}
              >
                The Resume Job Description Match tool is designed for speed, convenience, and accuracy, to help enhance your job application process.
              </Typography>
              <Typography 
                variant="body2" 
                sx={{ 
                  color: 'grey.700', 
                  fontFamily: 'Roboto, sans-serif', 
                  mt: 2, 
                  textAlign: 'left',
                  fontSize:'1rem'
                }}
              >
                Compare your resume to a job in seconds and get meaningful insights about how you can better tailor your resume to the individual position.
              </Typography>
            </Grid>
            
            <Grid item xs={12} sm={4}>
              <img 
                src="https://cdn.prod.website-files.com/627c8700df0be67c4b1d533c/652db88f562548aff2ee628a_Hard_Skills-p-500.png" 
                alt="Identify Words" 
                style={{ 
                  width: '100%', 
                  borderRadius: '16px', 
                  border: '1px solid #ddd', 
                  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' ,
                  
                }} 
              />
              <Typography variant="h6" gutterBottom sx={{ mt: 2, color: 'black', fontWeight: 'bold' ,textAlign: 'left'}}>
                Identify Important Words & Skills that Matter to the Position
              </Typography>
              <Typography variant="body2" sx={{ color: 'grey.700' ,textAlign: 'left',fontSize:'1rem' }}>
                A key part of tailoring your resume to a particular job is mirroring the language from the job description to position yourself as a strong fit.
              </Typography>
              <Typography 
                variant="body2" 
                sx={{ 
                  color: 'grey.700', 
                  fontFamily: 'Roboto, sans-serif', 
                  mt: 2 ,
                  textAlign: 'left',
                  fontSize:'1rem',
                }}
              >
                Quickly uncover which words and skills are prioritized in the job description to guide the next steps you take with your resume.
              </Typography>
            </Grid>
            
            <Grid item xs={12} sm={4}>
              <img 
                src="https://cdn.prod.website-files.com/627c8700df0be67c4b1d533c/652db895a443aeb4f951ef36_Job_Description_Keywords-p-500.png" 
                alt="Job Description" 
                style={{ 
                  width: '100%', 
                  borderRadius: '16px', 
                  border: '1px solid #ddd', 
                  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' 
                }} 
              />
              <Typography variant="h6" gutterBottom sx={{ mt: 2, color: 'black', fontWeight: 'bold' ,textAlign: 'left'}}>
                Remove the Guesswork and Tailor Your Resume with Purpose
              </Typography>
              <Typography variant="body2" sx={{ color: 'grey.700',textAlign: 'left',fontSize:'1rem',}}>
                Maximize your chances of landing an interview by tailoring your resumes to individual job opportunities.
              </Typography>
              <Typography 
                variant="body2" 
                sx={{ 
                  color: 'grey.700', 
                  fontFamily: 'Roboto, sans-serif', 
                  fontSize:'1rem',
                  mt: 2, 
                  textAlign: 'left'
                }}
              >
                Let the Resume Job Description Match tool help you focus your efforts and submit stronger job applications.
              </Typography>
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ py: 6 }}>
  <Grid container justifyContent="center" sx={{ mt: -4, mb: 1 }}> 
  <Link href="/jobmatching" passHref>
  <Button
      variant="contained"
      color="primary"
      sx={{
        backgroundColor: '#FFB100',
        color: '#000',
        borderRadius: '50px',
        fontSize: '16px',
        fontWeight: 'bold',
        padding: '12px 24px',
        transition: 'all 0.3s ease',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        marginTop: '-60px', 
        '&:hover': {
          backgroundColor: '#FF9A00',
          boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.9)',
          transform: 'translateY(-10px)', 
        },
      }}
    >
      Start Job Matching for Free
    </Button>
  </Link>
    
  </Grid>
</Box>

        {/*   third section  */}
        <Box
  sx={{
    backgroundColor: '#004940',
    py: 12,
    mt: 4,
    width: '100vw',
    mx: 'auto',
    position: 'relative',
    left: '50%',
    right: '50%',
    transform: 'translateX(-50%)',
  }}
>
  <Container maxWidth="lg">
    <Box
      sx={{
        backgroundColor: 'white',
        borderRadius: '16px',
        padding: '40px',
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
      }}
    >
     <Typography
  variant="h3"
  gutterBottom
  sx={{
    color: '#2D3748',
    fontWeight: 600,
    mb: 6,
    fontSize: '2.125rem',
  }}
>
  A Smarter Way to Compare & Analyze Your <br /> Resume
</Typography>

      <Grid container spacing={6} alignItems="center">
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              backgroundColor: '#E0F2F1', 
              padding: '40px',
              borderRadius: '16px',
            }}
          >
            <img
              src="https://cdn.prod.website-files.com/627c8700df0be67c4b1d533c/65319a443be0526fd5b55406_A_Smarter_Way_insights-p-500.png"
              alt="Optimize Resume"
              style={{
                width: '100%',
                borderRadius: '16px',
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
              }}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>

  <Typography
    variant="body1"
    sx={{
      color: '#2D3748', 
      fontFamily: 'Roobert, sans-serif', 
      letterSpacing: '0', 
      fontSize: '1rem', 
      fontWeight: 400, 
      lineHeight: '130%', 
      mb: 3, 
      textAlign: 'left'
    }}
  >
    When updating and optimizing your resume, it’s best to have some clear direction so that you aren’t working blind.
  </Typography>

  <Typography
    variant="body1"
    sx={{
      color: '#2D3748',
      fontFamily: 'Roobert, sans-serif', 
      letterSpacing: '0', 
      fontSize: '1rem', 
      fontWeight: 400, 
      lineHeight: '150%', 
      mb: 3, 
      textAlign: 'left'
    }}
  >
    To run a successful job search, you can’t use the same resume over and over for every job you apply to. Positions are different, they contain different requirements and nuances that ultimately matter to the employer.
  </Typography>
  <Typography
    variant="body1"
    sx={{
      color: '#2D3748', 
      fontFamily: 'Roobert, sans-serif', 
      letterSpacing: '0', 
      fontSize: '1rem',
      fontWeight: 700,
      lineHeight: '150%', 
      mt: 3,
      textAlign: 'left'
    }}
  >
    Your resume should be customized for the specific job you’re applying to.
  </Typography>

  <Typography
    variant="body1"
    sx={{
      color: '#2D3748', 
      fontFamily: 'Roobert, sans-serif',
      letterSpacing: '0', 
      fontSize: '1rem', 
      fontWeight: 400,
      lineHeight: '150%',
      mb: 3, 
      textAlign: 'left'
    }}
  >
    Our Resume Job Description Match is designed to help facilitate the process of tailoring a resume to a specific job. It compares your skills, experiences, and overall language to the content from the job description to uncover patterns, insights that can add clarity to your process.
  </Typography>
</Grid>
      </Grid>
      
    </Box>
    <Button
  variant="contained"
  sx={{
    mt: 9,
    mx: 'auto', 
    display: 'block', 
    backgroundColor: '#FFB100',
        color: '#000',
        borderRadius: '50px',
        fontSize: '16px',
        fontWeight: 'bold',
        padding: '12px 24px',
        transition: 'all 0.3s ease',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    '&:hover': {
          backgroundColor: '#FF9A00',
          boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.9)',
          transform: 'translateY(-10px)', 
        },
  }}
>
  Match Your Resume to a Specific Job
</Button>

  </Container>
</Box>
{/* section 4 */}
<Box
  sx={{
    py: 12,
    textAlign: 'center',
    backgroundColor: '#fff',
  }}
>
  <Container maxWidth="lg">
    <Typography
      variant="h4"
      gutterBottom
      sx={{
        color: '#2D3748',
        fontWeight: 'bold',
        mb: 12,
        fontSize: '2.5rem',
      }}
    >
      How to Match Your Resume to a Job
    </Typography>

    {steps.map((step, index) => (
      <Grid container spacing={6} alignItems="center" key={step.number} sx={{ mb: 6 }}>
        <Grid item xs={12} md={6} order={{ xs: 1, md: index % 2 === 0 ? 1 : 2 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'flex-start',
            }}
          >
          <Box
>
    <img
              src={step.additionalImgSrc}
              alt={step.title}
              style={{
                width: '200px',
                height: '140px',
                display: 'flex',
                marginTop: '-20px'
              }}
            />
</Box>
            <Box>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 'bold',
                  color: '#000000',
                  textAlign: 'left',
                  fontFamily:'Roobert,sans-serif'
                }}
              >
                {step.title}
              </Typography>
              <Typography variant="body1" sx={{ color: '#000000', mt: 1, textAlign: 'left', fontSize: '1.125rem',lineHeight:'1.5rem',fontFamily:'Roobert,sans-serif' }}>
                {step.descriptionPart1}
              </Typography>
              <Typography variant="body1" sx={{ color: '#000000', mt: 2, textAlign: 'left', fontSize: '1.125rem',lineHeight:'1.5rem',fontFamily:'Roobert,sans-serif'}}>
                {step.descriptionPart2}
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={6} order={{ xs: 2, md: index % 2 === 0 ? 2 : 1 }}>
          <Box
            data-aos="fade-left"
            sx={{
              backgroundColor: '#f9f9f9',
              borderRadius: '12px',
              padding: '24px',
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
              textAlign: 'left',
            }}
          >
            <img
              src={step.imgSrc}
              alt={step.title}
              style={{
                width: '100%',
                borderRadius: '8px',
              }}
            />
          </Box>
        </Grid>
      </Grid>
    ))}
     <Link href="/jobmatching" passHref>
     <Button
  variant="contained"
  sx={{
    mt: 9,
    mx: 'auto', 
    display: 'block', 
    backgroundColor: '#FFB100',
        color: '#000',
        borderRadius: '50px',
        fontSize: '16px',
        fontWeight: 'bold',
        padding: '12px 24px',
        transition: 'all 0.3s ease',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    '&:hover': {
          backgroundColor: '#FF9A00',
          boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.9)',
          transform: 'translateY(-10px)', 
        },
  }}
>
  Sign Up  & Start Job Matching
</Button>
     </Link>
  </Container>
</Box>
{/* section 5  */}
<Box
  sx={{
    py: 12,
    backgroundColor: '#E0F2F1', 
    textAlign: 'center',
    width: '100vw',
    mx: 'auto',
    position: 'relative',
    left: '50%',
    right: '50%',
    transform: 'translateX(-50%)',
  }}
>
  <Container maxWidth="lg">
    <Typography
      variant="h4"
      gutterBottom
      sx={{
        color: '#004940', 
        fontWeight: 'bold',
        mb: 6,
        fontSize: '3rem',
      }}
    >
      What's Free & What's <span style={{ color: '#004940' }}>+</span>
    </Typography>

    <Grid container spacing={6} justifyContent="center">
      <Grid item xs={12} md={5}>
        <Box
          sx={{
            backgroundColor: '#fff', 
            borderRadius: '16px',
            padding: '40px',
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
            textAlign: 'left',
          }}
        >
          <Typography
  variant="h5"
  gutterBottom
  sx={{
    fontWeight: 'bold',
    color: '#000000',
    mb: 1,
    fontFamily: 'komika axis', 
    textTransform: 'lowercase',          
    fontSize: '4rem',                    
    letterSpacing: '-0.05em',            
  }}
>
  teal
</Typography>
          {['Top 5 Keywords', '1 Email Template Per Job Stage', 'Limited AI Usage', 'Basic Analysis in Resume Builder', 'Basic Resume Keyword Matching'].map((item, index) => (
            <Typography key={index} variant="body1" sx={{ mb: 2, color: '#2D3748' }}>
              ✔ {item}
            </Typography>
          ))}
          <Typography variant="h4" sx={{ color: '#2D3748', fontWeight: 'bold', mt: 4 }}>
            Free
          </Typography>
          <Typography variant="body2" sx={{ color: '#2D3748' }}>
            Forever
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12} md={5}>
        <Box
          sx={{
            backgroundColor: '#004940', 
            borderRadius: '16px',
            padding: '40px',
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
            textAlign: 'left',
          }}
        >
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              fontWeight: 'bold',
              color: '#fff', 
              mb: 1,
              fontFamily: 'komika axis', 
    textTransform: 'lowercase',          
    fontSize: '4rem',                    
    letterSpacing: '-0.05em'
            }}
          >
            teal +
          </Typography>
          {['Unlimited AI Usage for Resume Bullets', 'Unlimited Keywords', 'Unlimited Email Templates', 'No Ads Across Platform', '24/7 Email Support'].map((item, index) => (
            <Typography key={index} variant="body1" sx={{ mb: 2, color: '#fff' }}>
              ✔ {item}
            </Typography>
          ))}
          <Typography variant="h4" sx={{ color: '#fff', fontWeight: 'bold', mt: 4 }}>
            $9 / Week
          </Typography>
          <Typography variant="body2" sx={{ color: '#fff' }}>
            Billed every week, month, or 3 months
          </Typography>
        </Box>
      </Grid>
    </Grid>
  </Container>

  <Box sx={{ mt: 8, display: 'flex', justifyContent: 'center' }}>
  <Button
    variant="contained"
    color="warning"
    sx={{
      backgroundColor: '#FFC107',
      borderRadius: '40px',
      padding: '12px 24px',
      fontSize: '1.4rem',
      fontWeight: 'bold',
      textTransform: 'none',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      lineHeight: 1.2,
      color: 'black', 
      boxShadow: 'none',
      '&:hover': {
        backgroundColor: '#FFB300', 
      },
    }}
  >
    Get Started for Free
    <Typography
      variant="body2"
      component="span"
      sx={{
        color: 'black', 
        fontSize: '0.9rem',
        fontWeight: 'normal',
      }}
    >
      No credit card required, ever.
    </Typography>
  </Button>
</Box>

</Box>
      </Container>
    </div>
  );
}
