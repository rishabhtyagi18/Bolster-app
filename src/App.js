import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Quiz from "./component/Quiz";
import SignupForm from './component/SignupForm';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        
      <Router className="App">
      <Routes>
        <Route path="/" element={<Quiz />} />
        <Route path="signup" element={<SignupForm />} />
      </Routes>
    </Router>
      </header>
    </div>
  );
}

export default App;