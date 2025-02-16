import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import JobDescription from './pages/jobDescription';
import Interview from './pages/interview';
import FeedbackPage from './pages/feedback';
import Home from './pages/homepage';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* Route for Home Page */}
          <Route path="/" element={<Home />} />
          {/* Route for Job Description */}
          <Route path="/jobDescription" element={<JobDescription />} />
          {/* Route for Interview */}
          <Route path="/interview" element={<Interview />} />
          {/* Route for Feedback */}
          <Route path="/feedback" element={<FeedbackPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
