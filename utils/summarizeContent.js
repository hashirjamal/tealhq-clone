import { HfInference } from "@huggingface/inference";
const hf = new HfInference(`${process.env.HF_KEY}`);

export const summarizeContent = async (inp,min,max)=>{

    
    const res = await hf.summarization({
        model: 'google/pegasus-cnn_dailymail',
        inputs:
        inp,
        parameters: {
            max_length: max || 200,
            min_length: min || 100,
        }
    })
    
    
    return res
}