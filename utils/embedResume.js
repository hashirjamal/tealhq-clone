import { Pinecone } from '@pinecone-database/pinecone'
import { metadata } from '@/app/layout';
import { HfInference } from '@huggingface/inference'
import {v4 as uuidv4  } from "uuid"

export const embedResume = async (textArr,uid)=>{
    
    const hf = new HfInference(process.env.HF_KEY);

    let vectorArr =[]
    console.log(textArr.length)

    for (const text of textArr) {
        try {
            
          let vector = await hf.featureExtraction({
            model: "sentence-transformers/all-MiniLM-L6-v2",
            inputs: text,
          });
          vectorArr.push({
            id: uuidv4(),
            values: vector,
            metadata: {
                
                meta:text},
          });
        } catch (error) {
          console.error("Error in feature extraction:", error);
        }
      }

    vectorArr.forEach(t=>{
        console.log(t.metadata)
        console.log("\n")
    })


const pc = new Pinecone({
  apiKey: `${process.env.PC_KEY}`
});

const index = pc.index("teal-hq-resume-store");

// await index.namespace(`user ${uuidv4()}`).upsert(
//     vectorArr
// )

}