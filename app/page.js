"use client"


import React from 'react'
import { useState } from 'react'
import axios from 'axios';

const page = () => {
  const [file,setFile ] = useState(null);
  const [jd,setJd ] = useState("");

  const[resumeContent,setResumeContent] = useState("");
  


  console.log("Hello")

  const postJd = async ()=>{
    try{

      // const segments = jd.split('\n\n');
     const dt = await axios.post("/api/job-desc",{
        jd
      }, {
        headers: {
          "Content-Type": "application/json"
        }})

      console.log(dt.data.data);
      setResumeContent(dt.data.data)
      
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
    
  }


  const postResume = async ()=>{
    if(!file){
      alert("PLease upload your resume");
      return;
    }
    const formData = new FormData();
    formData.append('file', file);

    let res = await fetch("/api/resume",{
      method:"POST",
      body: formData
    })
    res = await res.json();
    console.log(res);


  }


  const sendToLLM = async()=>{
    const res = await axios.post("/api/summarize",{
      jd,
      resumeContent
    }, {
      headers: {
        "Content-Type": "application/json"
      }})
  
  console.log(res.data.data.resume);
    }

  return (
    <div>
<input type='file' onChange={(e)=>{
  setFile(e.target.files[0])
}}/>

      <button onClick={postResume}>Embed Resume</button>
      <input type='text' value={jd} onChange={(e)=>setJd(e.target.value)} />
      <button onClick={postJd}>Embed JD</button>

      <button onClick={sendToLLM}>Summarize JD</button>
      

    </div>
  )
}

export default page