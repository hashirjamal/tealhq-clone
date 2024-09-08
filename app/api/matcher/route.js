import { NextResponse } from "next/server";

export async function POST(req){
  
    try{
        const {jd, resume, isCoverLetter} = await req.json()
        var content = '';

        console.log("Body of matcher API:"+isCoverLetter)

        const resumematch = `Match the resume with the given job description in JSON format when the relevant parts of the resume are provided by the user. The job description is as follows: ${jd}. Don't include any introduction or conclusion with the response, just return the JSON object strictly. Calculate the score out of 1 and not out of 100. Don't include how or why the score was calculated, just return the JSON in the following structure: 
        {
            "job_description": {
                "title": "TITLE",
                "company_name": "COMPANY_NAME",
                "location": "LOCATION",
                "role": "ROLE",
                "skills_required": ["SKILL_1", "SKILL_2", "SKILL_3"]
            },
            "match": {
                "overall_score": OVERALL_SCORE,
                "structure_score": STRUCTURE_SCORE,
                "results_score": RESULTS_SCORE,
                "keyword_score": KEYWORD_SCORE
            },
            "roadmap": 
                  {
                    "step 1": [
                      "STEP_1_TASK_1",
                      "STEP_1_TASK_2",
                      "STEP_1_TASK_3"
                    ],
                    "step 2": [
                      "STEP_2_TASK_1",
                      "STEP_2_TASK_2",
                      "STEP_2_TASK_3"
                    ],
                    "step 3": [
                      "STEP_3_TASK_1",
                      "STEP_3_TASK_2",
                      "STEP_3_TASK_3"
                    ],
                    "step 4": [
                      "STEP_4_TASK1",
                      "STEP_4_TASK_2",
                      "STEP_4_TASK_3"
                    ]
                  }
            ,
            "resume_improvements": [
                "IMPROVEMENT_1",
                "IMPROVEMENT_2"
            ]
        }`;

        
        const coverletter = `You need to generate a cover letter for the resume provided by the user and the job        description is as follows: ${jd}. Don't include any introduction or conclusion like here is the JSON, just return the JSON object strictly. Donot add any new line characters. Donot include Dear hiring manager in the start of the cover letter, or any thankyou with the name of the candidate at the end of the cover letter. Return the JSON in the following structure:
          {
              name: "NAME_OF_CANDIDATE",
              address: "ADDRESS_OF_CANDIDATE",
              phone: "PHONE_NUMBER_OF_CANDIDATE",
              email: "EMAIL_OF_CANDIDATE",
              jobTitle: "JOB_TITLE",
              coverLetter: "COVER_LETTER"
          } `;

        if(isCoverLetter)
        {
          content = coverletter;
        }
        else{
          content = resumematch;
        }

        // console.log(req.body,jd,resume)

        const resumescore = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
              "Authorization": `Bearer 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`,
             
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              "model": "meta-llama/llama-3.1-8b-instruct:free",
              "messages": [
                {"role": "user", "content": resume},
                {"role": "system", "content": content},
              ],
            })
          });
          
          const resumeresponse = await resumescore.json();

          // console.log("\n\n",resumeresponse,"Resume Response");
        return NextResponse.json(resumeresponse.choices[0].message.content);
    }
    catch(e){
        return NextResponse.json({error:e.message,status:500});

    }
}