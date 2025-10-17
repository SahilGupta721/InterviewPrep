import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

import '../css/interview.css';
import interview_video from "../videos/interview.mp4";

const Interview = () => {
  const [videoFile, setVideoFile] = useState(null);
  const [resumeFile, setResumeFile] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle video file selection
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

  // Handle resume file selection
  const handleResumeChange = (e) => {
    const file = e.target.files[0];
    if (file) setResumeFile(file);
  };

  const handleSubmit = async () => {
    if (!videoFile) {
      alert('Please upload a video before submitting.');
      return;
    }

    // Get job questions from localStorage
    const storedQuestions = localStorage.getItem('generatedQuestions');
    let questionsArray = [];

    if (storedQuestions) {
      questionsArray = JSON.parse(storedQuestions);
      if (!Array.isArray(questionsArray) || questionsArray.length === 0) {
        alert('Job questions are missing or invalid.');
        return;
      }
    } else {
      alert('Job questions are missing.');
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('file', videoFile);
      if (resumeFile) formData.append('resume', resumeFile);

      // Eden AI expects questions as JSON array in "text" field
      formData.append('text', JSON.stringify(questionsArray));
      formData.append('providers', 'google');

      const response = await axios.post(
        'https://api.edenai.run/v2/video/question_answer',
        formData,
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_EDEN_TOKEN}`,
          },
        }
      );

      // Google provider result
      const googleAnswer = response.data?.google?.answer;
      if (googleAnswer) {
        setFeedback(googleAnswer);
      } else {
        console.log(response.data); // log full response for debugging
        setFeedback('No feedback available. Check console for API response.');
      }
    } catch (error) {
      console.error('Error uploading video:', error);
      setFeedback(error.response?.data?.message || error.message || 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div id="top">
        <div className="interview_video_container">
          <div id="interview_video">
            <video src={interview_video} autoPlay loop muted />
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

              <input type="file" accept="video/*" onChange={handleFileChange} disabled={loading} />
              <input type="file" accept=".pdf,.doc,.docx" onChange={handleResumeChange} disabled={loading} />

              <button onClick={handleSubmit} disabled={loading || !videoFile}>
                {loading ? 'Submitting...' : 'Submit Video'}
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
