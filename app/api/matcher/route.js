import { NextResponse } from "next/server";

export async function POST(req){

    try{
        const {jd, resume} = await req.json()

        console.log(req.body,jd,resume)

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
                {"role": "system", "content": `Match the resume with the given job description in JSON format when the relevant parts of the resume are provided by the user. The job description is as follows: ${jd}. Don't include any intro or conclusion, just return the JSON object strictly. Don't include how or why the score was calculated, just return the JSON in the following structure: 
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
                            "hard_skills": {
                                "available": ["HARD_SKILL_1", "HARD_SKILL_2"],
                                "lacking": ["LACKING_HARD_SKILL_1", "LACKING_HARD_SKILL_2"]
                            },
                            "soft_skills": {
                                "available": ["SOFT_SKILL_1", "SOFT_SKILL_2"],
                                "lacking": ["LACKING_SOFT_SKILL_1", "LACKING_SOFT_SKILL_2"]
                            },
                            "work_experience": {
                                "relevant": ["WORK_EXPERIENCE_1" :
                                {
                                  "title": "TITLE",
                                  "company_name": "COMPANY_NAME",
                                  "location": "LOCATION",
                                  "role": "ROLE",
                                  "skills": ["SKILL_1", "SKILL_2", "SKILL_3"]
                                }
                                , "WORK_EXPERIENCE_2":
                                 {
                                  "title": "TITLE",
                                  "company_name": "COMPANY_NAME",
                                  "location": "LOCATION",
                                  "role": "ROLE",
                                  "skills": ["SKILL_1", "SKILL_2", "SKILL_3"]
                                }
                                  ]
                            },
                            "resume_improvements": [
                                "IMPROVEMENT_1",
                                "IMPROVEMENT_2"
                            ]
                        }`},
              ],
            })
          });
          
          const resumeresponse = await resumescore.json();

          console.log("\n\n",resumeresponse,"Resume Response");
        return NextResponse.json(resumeresponse.choices[0].message.content);
    }
    catch(e){
        return NextResponse.json({error:e.message,status:500});

    }
}