import { NextResponse } from "next/server";
import { HfInference } from "@huggingface/inference";
import { summarizeContent } from "@/utils/summarizeContent";
export async function POST(req){

    try{
        console.log("summarization called")
        const body = await req.json();

        const {jd} = body;
        const {resumeContent} = body;
        const{isCoverLetter}=  body;

        const hf = new HfInference(`${process.env.HF_KEY}`);

        
        let res= jd;
        if(jd.length>500){
            res = await summarizeContent(jd,100,350)
        }
        
        let res2 = resumeContent;

        if(resumeContent.length>750){
            res2 = await summarizeContent(resumeContent,200,500)
        }

        // console.log(res,res2)
        return NextResponse.json({status:"Success",message:"",data:{jd:res.summary_text,resume:res2.summary_text}})
    }
    catch(e){
        console.log(e)
        return NextResponse.json({status:"Error",message:"Something went wrong in summarization",data:e})

    }

}