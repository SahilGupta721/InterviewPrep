import ReactDOM from 'react-dom/client';
import './index.css';
import './css/Home.css';
import Home from './pages/Home';
import Interview from './pages/interview';
import About from './pages/About'
import reportWebVitals from './reportWebVitals';
import JobDescription from './pages/jobDescription';
import { BrowserRouter, Routes, Route } from "react-router-dom";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<Home />}>  </Route>
    </Routes>
    <Routes>
      <Route exact path="/about" element={<About />}>  </Route>
    </Routes>
    <Routes>
      <Route exact path="/interview" element={<Interview />}>  </Route>
    </Routes>
    <Routes>
      <Route exact path="/jobDescription" element={<JobDescription />}>  </Route>
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
