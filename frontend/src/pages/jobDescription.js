import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/jobdescription.css';
import job_des_video from '../videos/interview.mp4'
import { NavLink } from "react-router-dom";

const JobDescription = () => {
  const [jobDescription, setJobDescription] = useState('');
  const [generatedQuestions, setGeneratedQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const getResponseForGivenPrompt = async () => {
    if (!jobDescription.trim()) {
      alert('Please enter a job description.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `${API_BASE_URL}/generate-questions`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            job_description: jobDescription,
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to generate questions');
      }

      const data = await response.json();

      // backend already guarantees exactly 5 questions
      setGeneratedQuestions(data.questions);

    } catch (error) {
      console.error('Error:', error);
      alert('Error generating questions');
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