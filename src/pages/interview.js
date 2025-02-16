import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { NavLink } from 'react-router-dom'

import '../css/interview.css';
import interview_video from "../videos/interview.mp4";

const Interview = () => {
  const [videoFile, setVideoFile] = useState(null);
  const [resumeFile, setResumeFile] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) {
      alert('No file selected.');
      return;
    }

    if (!file.type.startsWith('video/')) {
      alert('Please upload a valid video file.');
      return;
    }

    setVideoFile(file);
  };

  const handleResumeChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setResumeFile(file);
    }
  };

  const handleSubmit = async () => {
    if (!videoFile) {
      alert('Please upload a video before submitting.');
      return;
    }
//getting job description from localstorage
    const jobDescription = localStorage.getItem('jobDescription');
    if (!jobDescription) {
      alert('Job description is missing.');
      return;
    }

    setLoading(true);
    //getting question from localstorage
    const question = localStorage.getItem('generatedQuestions');
if (!question) {
  alert('Job question is missing.');
} else {
  console.log(question);
}
    
//below sending job questions to eden api to check if user answered all questions
    const formData = new FormData();
    formData.append('file', videoFile);
    if (resumeFile) formData.append('resume', resumeFile);
    formData.append(
      'text',
      `Analyze the following job questions and evaluate the interviewee's answer. Also, provide feedback on presentation skills like pacing and clarity. Did the interviewee mention skills in the job posting? Keep it concise. Job description: ${question} `
    );
    formData.append('providers', 'google');

    try {
      const response = await axios.post('https://api.edenai.run/v2/video/question_answer', formData, {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_EDEN_TOKEN}`,
        },
      });

      if (response.data?.google?.answer) {
        setFeedback(response.data.google.answer);
      } else {
        setFeedback('No feedback available.');
      }
    } catch (error) {
      console.error('Error uploading video:', error);
      if (error.response) {
        setFeedback(`API Error: ${error.response.data.message || 'Permission error. Check your API key and permissions.'}`);
      } else if (error.request) {
        setFeedback('No response from the server. Please check network connection.');
      } else {
        setFeedback(`Error: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <div id="top">
      <div className="interview_video_container">
        <div id="interview_video">
          <video src={interview_video} autoPlay loop muted>
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

        <div id="dropbox_feedback">

          <div id="feedback_content">
            <h1 className="header">Interview Analysis</h1>

            <input type="file" accept="video/mp4" onChange={handleFileChange} disabled={loading} />

            <button onClick={handleSubmit} disabled={loading || !videoFile}>
              Submit Video
            </button>


          </div>

        </div>



      </div>
      <div id="feedback">
        {loading && <p>Loading...</p>}

        {feedback && (
          <div className="feedback-container">
            <h3>Feedback:</h3>
            <p>{feedback}</p>

          </div>
        )}
      </div>

     </div>
    </>
  );

};


export default Interview;
