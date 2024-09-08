import { NextResponse } from "next/server";
import { Pinecone } from '@pinecone-database/pinecone'
import { HfInference } from "@huggingface/inference";

export async function POST(req,res){

    // this api end point takes the job description in the req.body and perfroms query search after converting it into embeddings then returns the top 3 or 4 similar chunks to as a response which are then given to the LLM
try{

    let body = await req.json();

    // console.log(body)

    const {jd} = body;
    const {id} = body;

    let hf = new HfInference(process.env.HF_KEY)


    let vecArr=[]

 
    
    let vector = await hf.featureExtraction({
        model: "sentence-transformers/all-MiniLM-L6-v2",
        inputs: jd, 
    });
    vecArr = (vector)


    const pc = new Pinecone({
        apiKey: `${process.env.PC_KEY}`
    });
    const index = pc.index("teal-hq-resume-store");




const getUser = await index.namespace(`user ${id}`).listPaginated();
// const getUser = await index.namespace(`user ${id}removeMe`).listPaginated();
console.log("Namespace values in pinecone",getUser);

if(getUser.vectors.length==0){
    let resObj = {
        status:"Error",
        message:"Please upload your resume first"
    }
    
    return NextResponse.json(resObj);
}
    
    
    let result = await index.namespace(`user ${id}`).query({
        topK: 3,
        vector: vecArr,
        includeMetadata: true
    });
    
    let finalRes =``
    for(const res of result.matches){
        finalRes+=`${res.metadata.meta} \n`        
    }
    
    // console.log(finalRes+"POST JS RESPONSE");


    return NextResponse.json({status:"Succes",message:"Resume uploaded successfully",data:finalRes});

}
catch(e){
    console.log(e)
    return NextResponse.json({status:"Error",message:"Couldnot upload resume due to some unknown error"});


}


}