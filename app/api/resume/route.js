import { embedResume } from "@/utils/embedResume";
import { NextResponse } from "next/server";



const pdf = require('pdf-parse');


export async function POST(req){
    
    try{
        
        const formData = await req.formData();
        const file = formData.get('file');
    
        const buffer = Buffer.from(await file.arrayBuffer());
        let res = await pdf(buffer)
        
        let arr = res.text.split("\n");

        let refinedArr=[]
        refinedArr.push(arr[0]);
        let currInd =0;

        arr.forEach(text=>{
            text= text.trim();
            if( (text.includes("\n\n")|| text.includes("Skills")||text.includes("SKILLS") || text.includes("Education") || text.includes("EDUCATION") || text.includes("Qualification") || text.includes("QUALIFICATION")|| text.includes("Experience")||text.includes("EXPERIENCE") || text.includes("Certifications") || text.includes("CERTIFICATIONS") || text.includes("SOFTWARES") || text.includes("Softwares") || text.includes("Tools") || text.includes("TOOLS") || text.includes("Software") || text.includes("Softwares") || text.includes("Projects") || text.includes("PROJECTS") || text.includes("Contact") || text.includes("CONTACT") || text.includes("\n")) && refinedArr[currInd].length>25 ){
                currInd++;
                refinedArr[currInd]=text;
            }else{
                refinedArr[currInd]+=` ${text}`;
            }
        })

        // console.log(refinedArr)

       await embedResume(refinedArr,"Abc123")

      
        return NextResponse.json({status:"Succes",message:"Resume uploaded successfully",data:""});
    }
    catch(e){
        console.log(e)
        return NextResponse.json({status:"Error",message:"Couldnot upload resume due to some unknown error"});

    }


}