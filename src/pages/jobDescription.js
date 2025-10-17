import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleGenerativeAI } from '@google/generative-ai';
import '../css/jobdescription.css';
import job_des_video from '../videos/interview.mp4'
import { NavLink } from "react-router-dom";

const JobDescription = () => {
  const [jobDescription, setJobDescription] = useState('');
  const [generatedQuestions, setGeneratedQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const apiKey = process.env.REACT_APP_GEMINI_KEY;

  const getResponseForGivenPrompt = async () => {
    if (!jobDescription.trim()) {
      alert('Please enter a job description.');
      return;
    }

    setLoading(true);

    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
      const result = await model.generateContent(
        `Generate 5 interview questions based on the following job description:\n\n${jobDescription}`
      );

      const text = result.response.text();
      const extractedQuestions = text
        .split('\n')
        .filter((line) => line.trim().match(/^\d+\./)) // 
        .map((line) => line.replace(/^\d+\.\s*/, '').trim()); 

      if (extractedQuestions.length === 5) {
        setGeneratedQuestions(extractedQuestions);
      } else {
        alert('Unexpected format for generated questions. Check the returned value in the console.');
        
      }
    } catch (error) {
      console.error('Error fetching Gemini response:', error);
      alert(`Error fetching Gemini response: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleStartInterview = () => {
    if (generatedQuestions.length === 0) {
      alert('Please generate questions first.');
      return;
    }

    localStorage.setItem('jobDescription', jobDescription);
    localStorage.setItem('generatedQuestions', JSON.stringify(generatedQuestions));
    navigate('/interview');
  };

  return (
    <>
    <div id="video_container">
                <video src={job_des_video} autoPlay loop muted>
                </video>
    </div>
            <section id="home_nav">
                <nav className='home_navbar'>
                    <ul>
                        <li className='home_list'><NavLink to='/'>Home</NavLink></li>
                        <li className='home_list'><NavLink to='/about'>About</NavLink></li>
                        <li className='home_list'><NavLink to='/jobDescription'>Interview</NavLink></li>
                      
                    </ul>
                    
                </nav>
                
            </section>

    <div id="job_full_content">
      
      <div id="job-description-container">

        <div id="job_des_elements">
        <h1 id="job-description-heading">Job Description</h1>
        <textarea
          value={jobDescription} 
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Enter the job description here"
        />
        <div className='job_des_buttons'>
          {/* first button */}
          <button onClick={getResponseForGivenPrompt} disabled={loading}>
            {loading ? 'Generating Questions...' : 'Generate Questions'}
          </button>
          {/* second button */}
          <button onClick={handleStartInterview} disabled={loading || generatedQuestions.length === 0}>
            Start Interview
          </button>
        </div>
      </div>
        
          
          

        </div>
        <section>
          {generatedQuestions.length > 0 && (
            <div id="job_ques">
              <div id="question_bank">
              <h2>Generated Questions:</h2>
              <ul>
                {generatedQuestions.map((question, index) => (
                  <li key={index}>{question.replace(/[*]/g, '')}</li> 
                ))}
              </ul>
              </div>

            </div>

          )}
        </section>

      </div>
    </>
  );
};

export default JobDescription;
