// to run this page, link:
// http://localhost:3000/ResultsPage?response=%7B%0A++%22job_description%22%3A+%7B%0A++++%22title%22%3A+%22Data+Analyst%22%2C%0A++++%22company_name%22%3A+null%2C%0A++++%22location%22%3A+null%2C%0A++++%22role%22%3A+null%2C%0A++++%22skills_required%22%3A+%5B%0A++++++%22Strong+foundation+in+statistics+and+practical+experience+with+statistical+software+%28e.g.%2C+Excel%2C+SPSS%2C+SAS%29%22%2C%0A++++++%22Mastery+in+data+analysis+languages+including+SQL%2C+Python%2C+and+R%22%2C%0A++++++%22Exceptional+analytical+abilities+to+compile%2C+structure%2C+examine%2C+and+present+substantial+data+sets+with+precision%22%2C%0A++++++%22Ability+to+critically+evaluate+data+to+derive+meaningful%2C+actionable+insights%22%2C%0A++++++%22Superior+communication+and+presentation+skills%2C+with+the+ability+to+simplify+complex+data+insights+for+non-technical+audiences%22%2C%0A++++++%22Bachelor%E2%80%99s+degree+in+Computer+Science%2C+Information+Management%2C+Statistics%2C+or+a+related+discipline%22%0A++++%5D%0A++%7D%2C%0A++%22match%22%3A+%7B%0A++++%22overall_score%22%3A+0.44%2C%0A++++%22structure_score%22%3A+0.5%2C%0A++++%22results_score%22%3A+0.45%2C%0A++++%22keyword_score%22%3A+0.39%0A++%7D%2C%0A++%22hard_skills%22%3A+%7B%0A++++%22available%22%3A+%5B%0A++++++%22Programming+languages+such+as+Python%2C+JavaScript%2C+and+Java%22%2C%0A++++++%22Next.js+and+React.js%22%2C%0A++++++%22Node.js%2C+Express.js%2C+and+databases%22%2C%0A++++++%22SQL%22%0A++++%5D%2C%0A++++%22lacking%22%3A+%5B%0A++++++%22Statistics+and+practical+experience+with+statistical+software+%28e.g.%2C+Excel%2C+SPSS%2C+SAS%29%22%2C%0A++++++%22Mastery+in+data+analysis+languages+including+SQL%2C+Python%2C+and+R%22%2C%0A++++++%22Data+analysis+experience%22%0A++++%5D%0A++%7D%2C%0A++%22soft_skills%22%3A+%7B%0A++++%22available%22%3A+%5B%0A++++++%22Communication+and+presentation+skills%22%2C%0A++++++%22Analytical+abilities%22%0A++++%5D%2C%0A++++%22lacking%22%3A+%5B%0A++++++%22Superior+communication+and+presentation+skills%2C+with+the+ability+to+simplify+complex+data+insights+for+non-technical+audiences%22%2C%0A++++++%22Exceptional+analytical+abilities%22%0A++++%5D%0A++%7D%2C%0A++%22work_experience%22%3A+%7B%0A++++%22relevant%22%3A+%5B%0A++++++%7B%0A++++++++%22title%22%3A+%22Software+Engineering+Fellow%22%2C%0A++++++++%22company_name%22%3A+%22Headstarter+Al%22%2C%0A++++++++%22location%22%3A+%22USA%22%2C%0A++++++++%22role%22%3A+%22Software+Engineering+Fellow%22%2C%0A++++++++%22skills%22%3A+%5B%0A++++++++++%22ReactJS%22%2C%0A++++++++++%22NextJS%22%2C%0A++++++++++%22Ollama+Al%22%2C%0A++++++++++%22ChatGPT+Al+API%22%2C%0A++++++++++%22ML%22%0A++++++++%5D%0A++++++%7D%2C%0A++++++%7B%0A++++++++%22title%22%3A+%22Machine+Learning+Intern%22%2C%0A++++++++%22company_name%22%3A+%22Jinnah+Lincoln+Foundation%22%2C%0A++++++++%22location%22%3A+%22USA%22%2C%0A++++++++%22role%22%3A+%22Machine+Learning+Intern%22%2C%0A++++++++%22skills%22%3A+%5B%0A++++++++++%22Machine+learning%22%2C%0A++++++++++%22Data+science%22%0A++++++++%5D%0A++++++%7D%2C%0A++++++%7B%0A++++++++%22title%22%3A+%22Java+Springboot+Intern%22%2C%0A++++++++%22company_name%22%3A+%22EvantageSoft+Private+limited%22%2C%0A++++++++%22location%22%3A+%22Khi%2C+Pakistan%22%2C%0A++++++++%22role%22%3A+%22Java+Springboot+Intern%22%2C%0A++++++++%22skills%22%3A+%5B%0A++++++++++%22Java+development%22%2C%0A++++++++++%22APIs+using+Spring+Boot%22%0A++++++++%5D%0A++++++%7D%0A++++%5D%0A++%7D%2C%0A++%22resume_improvements%22%3A+%5B%0A++++%22Include+statistics+and+practical+experience+with+statistical+software+%28e.g.%2C+Excel%2C+SPSS%2C+SAS%29%22%2C%0A++++%22Highlight+mastery+in+data+analysis+languages+including+SQL%2C+Python%2C+and+R%22%2C%0A++++%22Emphasize+exceptional+analytical+abilities+and+ability+to+critically+evaluate+data%22%2C%0A++++%22Mention+experience+with+data+analysis+and+presentation%22%0A++%5D%0A%7D#


'use client';

import { useEffect, useRef, useState } from 'react';
import { Box, Stack, Paper, Tabs, Tab, Link, Typography, IconButton, Tooltip} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import { Home, Description, Drafts, Logout } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import { Chart } from 'chart.js/auto';
import WorkIcon from '@mui/icons-material/Work';
import DescriptionIcon from '@mui/icons-material/Description';


export default function ResultsPage() {
    const [scores, setScores] = useState({
        structure_score: 0,
        results_score: 0,
        keyword_score: 0
    });
    const [score, setScore] = useState(0); // Default score, will be updated from URL
    const [RoleName, setRoleName] = useState(''); // State to hold Role name
    const [companyName, setCompanyName] = useState('');
    const [tabValue, setTabValue] = useState(0); // State to handle tabs
    const [jobDescription, setJobDescription] = useState(null);
    const [roadmap, setRoadMap] = useState([]);
    const [resumeImprovements, setResumeImprovements] = useState([]);


    const chartRef1 = useRef(null);
    const chartRef2 = useRef(null);

    const handleChange = (event, newValue) => {
        setTabValue(newValue);
    };

    useEffect(() => {
        // Extract the query parameter from the URL
        const queryParams = new URLSearchParams(window.location.search);
        const responseParam = queryParams.get('response');
        
        if (responseParam) {
            try {
                const parsedResponse = decodeURIComponent(responseParam);
                console.log("response is:")
                console.log(parsedResponse)
                let parsedResponseClean = parsedResponse.replace(/[\r\n]+/g, '').trim();
                parsedResponseClean = parsedResponseClean.replace(/`/g, '').trim();
                parsedResponseClean = parsedResponseClean.replace(/\\n/g, '').replace(/\\"/g, '').trim();
                // console.log(parsedResponseClean);
                const parsedData = JSON.parse(parsedResponseClean);
                console.log("response is as follows: ")
                console.log(parsedData);
                
                // Extract and set data
                setJobDescription(parsedData["job_description"]);
                setRoadMap(parsedData["roadmap"]);
                setResumeImprovements(parsedData["resume_improvements"]);

                const Role = parsedData["job_description"]?.title || 'No Job Title';
                setRoleName(Role);

                const company = parsedData["job_description"]?.companyName || '';
                setCompanyName(company);

                const responseScore = parsedData["match"]["overall_score"];
                
                if (!isNaN(responseScore)) {
                    setScore(parseInt(responseScore * 100));
                }
                setScores({
                    structure_score: parsedData["match"].structure_score * 100,
                    results_score: parsedData["match"].results_score * 100,
                    keyword_score: parsedData["match"].keyword_score * 100,
                });
            } catch (error) {
                console.error('Error parsing response parameter:', error);
            }
        }

        const canvas1 = document.getElementById('chartJSContainer');
        const canvas2 = document.getElementById('secondContainer');

        const ctx1 = canvas1.getContext('2d');
        const ctx2 = canvas2.getContext('2d');

        if (ctx1) {
            if (chartRef1.current) {
                chartRef1.current.destroy();
            }
            chartRef1.current = new Chart(ctx1, {
                type: 'doughnut',
                data: {
                    labels: ['Red', 'Orange', 'Green'],
                    datasets: [{
                        label: '# of Votes',
                        data: [33, 33, 33],
                        backgroundColor: [
                            'rgba(231, 76, 60, 1)',
                            'rgba(255, 164, 46, 1)',
                            'rgba(46, 204, 113, 1)'
                        ],
                        borderColor: [
                            'rgba(255, 255, 255 ,1)',
                            'rgba(255, 255, 255 ,1)',
                            'rgba(255, 255, 255 ,1)'
                        ],
                        borderWidth: 0,
                        circumference: 180,
                        rotation: 270
                    }]
                },
                options: {
                    rotation: Math.PI,
                    circumference: Math.PI,
                    plugins: {
                        legend: {
                            display: false
                        },
                        tooltip: {
                            enabled: false
                        }
                    },
                    cutout: '95%'
                }
            });
        }

        if (ctx2) {
            if (chartRef2.current) {
                chartRef2.current.destroy();
            }
            chartRef2.current = new Chart(ctx2, {
                type: 'doughnut',
                data: {
                    datasets: [{
                        data: [score - 0.5, 1, 100 - score - 1.5],
                        backgroundColor: [
                            "rgba(0,0,0,0)",
                            "rgba(255,255,255,1)",
                            "rgba(0,0,0,0)"
                        ],
                        borderColor: [
                            'rgba(0, 0, 0 ,0)',
                            'rgba(46, 204, 113, 1)',
                            'rgba(0, 0, 0 ,0)'
                        ],
                        borderWidth: 2,
                        circumference: 180,
                        rotation: 270
                    }]
                },
                options: {
                    cutout: '95%',
                    rotation: 0,
                    circumference: Math.PI * 2,
                    plugins: {
                        legend: {
                            display: false
                        },
                        tooltip: {
                            enabled: false
                        }
                    }
                }
            });
        }

        // Cleanup function to destroy chart instances
        return () => {
            if (chartRef1.current) {
                chartRef1.current.destroy();
            }
            if (chartRef2.current) {
                chartRef2.current.destroy();
            }
        };
    }, [score]);

    const getResultMessage = (score) => {
        if (score < 30) return "Bad Overall Score";
        if (score >= 30 && score <= 70) return "Average Overall Score";
        return "Good Overall Score";
    };

    const renderJobDescriptionTab = () => (
        <Box sx={{
            p: 3,
            backgroundColor: '#fdfdfd',
            borderRadius: '12px',
            borderLeft: '10px solid #004d40',
            borderRight: '10px solid #004d40',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            width: '90%',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
            marginBottom: '40px',
            position: 'relative',
            maxWidth: '1000px',
            mx: 'auto',  // Horizontally center
            mt: 'auto',  // Vertically center
        }}>
            <Typography variant="h6" sx={{
                fontWeight: 'bold',
                fontSize: '1.5rem',
                color: '#004d40',
                mb: 2,
                textAlign: 'center',
            }}>
                {jobDescription?.title || 'Job Title not specified'}
            </Typography>
            <Typography variant="h6" sx={{
                fontWeight: 'bold',
                fontSize: '1.25rem',
                color: '#004d40',
                mb: 1,
            }}>
                Company
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
                {jobDescription?.company_name || 'No company specified'}
            </Typography>
            <Typography variant="h6" sx={{
                fontWeight: 'bold',
                fontSize: '1.25rem',
                color: '#004d40',
                mb: 1,
            }}>
                Location
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
                {jobDescription?.location || 'Location not specified'}
            </Typography>
            <Typography variant="h6" sx={{
                fontWeight: 'bold',
                fontSize: '1.25rem',
                color: '#004d40',
                mb: 1,
            }}>
                Role
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
                {jobDescription?.role || 'Role not specified'}
            </Typography>
            <Typography variant="h6" sx={{
                fontWeight: 'bold',
                fontSize: '1.25rem',
                color: '#004d40',
                mb: 1,
            }}>
                Skills Required
            </Typography>
            <Typography variant="body1">
                {jobDescription?.skills_required.join(', ') || 'Skills not specified'}
            </Typography>
        </Box>
    );


    const renderImprovementsTab = () => (
        <Box sx={{
            p: 3,
            backgroundColor: '#fdfdfd',
            borderRadius: '12px',
            borderLeft: '10px solid #004d40',
            borderRight: '10px solid #004d40',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            width: '90%',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
            marginBottom: '40px',
            position: 'relative',
            maxWidth: '1000px',
            mx: 'auto',  // Horizontally center
            mt: 'auto',  // Vertically center
        }}>
            <Typography variant="h6" sx={{
                fontWeight: 'bold',
                fontSize: '1.5rem', // Adjust as needed
                color: '#004d40',
                mb: 2, // Add margin-bottom for spacing
                textAlign: 'center', // Center align the heading
            }}>
                Resume Improvements
            </Typography>
            <ul>
                {resumeImprovements.map((improvement, index) => (
                    <li key={index}>
                        <Typography variant="body1" sx={{
                            position: 'relative',
                            paddingLeft: '20px',
                            '&::before': {
                                content: '"\u25CF"', // You can change this to any symbol or even an image
                                color: '#004d40', // Custom color for the bullet point
                                fontSize: '1.2rem', // Adjust size as needed
                                position: 'absolute',
                                left: 0,
                                top: '50%',
                                transform: 'translateY(-50%)',
                            },
                            }}>
                                {improvement}
                            </Typography>
                    </li>
                ))}
            </ul>
        </Box>
    );

    const renderRoadMapCard = (stepTitle, tasks) => (
        <Box sx={{
            p: 3,
            backgroundColor: '#fdfdfd',
            borderRadius: '12px',
            borderLeft: '10px solid #004d40',
            borderRight: '10px solid #004d40',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            width: '100%',
            maxWidth: '400px', // Adjust width as needed
            overflow: 'hidden',
            mb: 2, // Margin bottom for spacing between rows
            mx: 'auto', // Horizontally center
            mt: 'auto', // Vertically center
        }}>
            <Typography variant="h6" sx={{
                fontWeight: 'bold',
                fontSize: '1.25rem',
                color: '#004d40',
                mb: 1,
            }}>
                {stepTitle}
            </Typography>
            {tasks.length > 0 && (
                <Box sx={{ mt: 1 }}>
                    <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
                        {tasks.map((task, index) => (
                            <li key={index}>
                                <Typography variant="body2">{task}</Typography>
                            </li>
                        ))}
                    </ul>
                </Box>
            )}
        </Box>
    );
    
    // Function to render the roadmap tab
    const renderRoadMapTab = () => {
    
        return (
            <Box sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 4, // Gap between cards
                justifyContent: 'center',
            }}>
                {Object.keys(roadmap).map((stepTitle, index) => (
                    <Box key={index} sx={{ flex: '1 1 300px' }}>
                        {renderRoadMapCard(stepTitle, roadmap[stepTitle])}
                    </Box>
                ))}
            </Box>
        );
    };

    function getJobMatchingHref() {
        // if(!sessionStorage)
        //     {
        //       return '/login';
        //     }
        // const storedUser = sessionStorage.getItem('user');
      
        // if (storedUser) {
        //   const userObject = JSON.parse(storedUser);
        //   return userObject.userId ? '/jobmatching' : '/login';
        // }

        return '/jobmatching'; // Default to /login if no user is stored
      }

    function getCoverLetterHref() {

        // if(!sessionStorage)
        //     {
        //       return '/login';
        //     }
        // const storedUser = sessionStorage.getItem('user');
      
        // if (storedUser) {
        //   const userObject = JSON.parse(storedUser);
        //   return userObject.userId ? '/coverletter' : '/login';
        // }
    
        return '/coverletter'; // Default to /login if no user is stored
      }

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
          <IconButton sx={{ color: 'white' }} >
            <Home />
          </IconButton>
        </Link>
      </Tooltip>
      <Tooltip title="Job Matching" placement="right">
        <Link href={getJobMatchingHref()} passHref> 
          <IconButton sx={{ color: 'white' }} >
            <WorkIcon />
          </IconButton>
        </Link>
      </Tooltip>
      <Tooltip title="Cover Letter Generator" placement="right">
        <Link href={getCoverLetterHref()} passHref> 
          <IconButton sx={{ color: 'white' }} >
            <DescriptionIcon />
          </IconButton>
        </Link>
      </Tooltip>
    </Box>
  
    <Tooltip title="Logout" placement="right">
    <Link href="/login" passHref> 
          <IconButton sx={{ color: 'white',marginBottom:'15px' }} >
            <Logout />
          </IconButton>
          </Link>
    </Tooltip>
  </Box>


        <Box
        sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            backgroundColor: '#f4f4f4', 
            padding: '20px',
            marginRight: '0px',
            marginLeft: '0px',
            width:'100%',
            display: "flex", flexDirection: "column", minHeight: "100vh", backgroundColor: "#f4f4f4"
            

        }}
        >
             <Box
                sx={{
                    p: 3,
                    backgroundColor: '#fdfdfd',
                    borderRadius: '12px',
                    borderLeft: '10px solid #004d40',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    width: '100%',
                    overflow: 'hidden',
                    marginBottom: '40px',
                    position: 'relative',
                    maxWidth: '1000px',
                }}
            >
            {/* Container wrapping the entire content */}
            <Box sx={{ display: 'flex', flexDirection: 'row', position: 'relative', width: '100%', height: 'auto', p: 2 }}>
                {/* Wrap the first box and second stack into a box */}
                <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%' , height: '40vh' }}>
                    {/* New Box on the left taking 55% */}
                    <Box sx={{ width: '45%', p: 2 }}>
                        <Typography variant="h6" fontSize={'45px' } sx = {{ fontWeight: 'bold', textTransform: 'uppercase'}}>
                            {RoleName}
                        </Typography>
                        <Typography variant="h6" fontSize={'30px'}  sx = {{ fontWeight: 'bold', textTransform: 'uppercase'}}>
                            {companyName}
                        </Typography>
                    </Box>

                    {/* Existing content on the right taking 45% */}
                    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', minHeight: '100%', p: 2, width: '35%' }}>
                        <Box sx={{ position: 'relative', width: 250, height: 250, mr: 4 }}>
                            <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
                                <canvas id="chartJSContainer" width="250" height="250"></canvas>
                                <Typography variant="h1" sx={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', fontSize: '50px', color: '#000' }}>
                                    {score}%
                                </Typography>
                                <Typography variant="h6" sx={{ position: 'absolute', left: '50%', top: '65%', transform: 'translate(-50%, -50%)', fontSize: '12px', color: '#000' }}>
                                    {getResultMessage(score)}
                                </Typography>
                            </Box>
                            <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
                                <canvas id="secondContainer" width="250" height="250"></canvas>
                            </Box>
                        </Box>
                        <Stack spacing={2} sx={{ width: 350, minWidth: 200, position: 'relative', top: 0, right: 0 }}>
                            <ScoreLine score={scores.structure_score} label="Resume Structure Match" color="red" />
                            <ScoreLine score={scores.results_score} label="Reasonable Results" color="orange" />
                            <ScoreLine score={scores.keyword_score} label="Keyword Usage" color="green" />
                        </Stack>
                    </Box>
                </Box>
            </Box>

            {/* Tabs below the container */}
            <Box sx={{ mt: 3 }}>
                <Tabs value={tabValue} onChange={handleChange} centered>
                    <Tab label={<Link href="#" underline="none" sx={{ color: '#004d40', fontWeight: 'bold' }}>Job Description</Link>} />
                    <Tab label={<Link href="#" underline="none" sx={{ color: '#004d40', fontWeight: 'bold' }}>Road Map</Link>} />
                    <Tab label={<Link href="#" underline="none" sx={{ color: '#004d40', fontWeight: 'bold' }}>Improvements</Link>} />
                </Tabs>
                <Box sx={{ p: 2 }}>
                    {tabValue === 0 && renderJobDescriptionTab()}
                    {tabValue === 1 && renderRoadMapTab()}
                    {tabValue === 2 && renderImprovementsTab()}
                </Box>
            </Box>
            </Box>
        </Box>
        </Box>
    );
}

function ScoreLine({ score, label, color }) {
    return (
        <Paper elevation={2} sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '100%' }}>
            <Typography variant="body2" sx={{ mb: 1 }}>
                {label}: {score}%
            </Typography>
            <Box sx={{ position: 'relative', width: '100%', height: '10px', borderRadius: 1, bgcolor: 'grey.300' }}>
                <Box 
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        height: '100%',
                        width: `${score}%`,
                        bgcolor: color,
                        borderRadius: 1
                    }} 
                />
            </Box>
        </Paper>
    );
}
