from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import google.generativeai as genai
import os
import re
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("GEMINI_KEY")
if not API_KEY:
    raise RuntimeError("GEMINI_KEY not found in .env")

genai.configure(api_key=API_KEY)

app = FastAPI()

# CORS (allow frontend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://interview-prep-dusky.vercel.app/"],  # later restrict to your Vercel domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class JobRequest(BaseModel):
    job_description: str


@app.post("/generate-questions")
async def generate_questions(req: JobRequest):
    try:
        model = genai.GenerativeModel("gemini-2.5-flash")

        prompt = f"""
Generate exactly 5 interview questions.
Number them from 1 to 5.

Job Description:
{req.job_description}
"""

        response = model.generate_content(prompt)
        text = response.text

        questions = [
            re.sub(r"^\d+\.\s*", "", line).strip()
            for line in text.split("\n")
            if re.match(r"^\d+\.", line.strip())
        ]

        if len(questions) != 5:
            raise ValueError("Model did not return exactly 5 questions")

        return {"questions": questions}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
