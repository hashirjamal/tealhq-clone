"use client"


import React from 'react'
import { useState } from 'react'
import axios from 'axios';
import { storage } from "@/firebase.config";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";




const page = () => {
  const [file,setFile ] = useState(null);
  const [jd,setJd ] = useState("");
  const [imgUrl, setImgUrl] = useState(null);
  const [progresspercent, setProgresspercent] = useState(0);


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


  const saveResume = async ()=>{
    if (!file) return;
    const storageRef = ref(storage, `files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on("state_changed",
      (snapshot) => {
        const progress =
          Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setProgresspercent(progress);
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImgUrl(downloadURL)
        });
      }
    );
  }

  


  const postResume = async (file)=>{
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

      <iframe
          src="https://firebasestorage.googleapis.com/v0/b/teal-hq-clone.appspot.com/o/Hashir%20Jamal%20Khan%20CV.pdf?alt=media&token=56b025fe-430d-470e-8b9a-3b960472c93c"
          width="100%"
          height="600px"
          style={{ border: "none" }}
          title="PDF Viewer"
        ></iframe>
      

    </div>
  )
}

export default page