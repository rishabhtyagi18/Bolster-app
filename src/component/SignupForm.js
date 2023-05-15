import React, { useState } from 'react';
import './Css/SignupForm.css';

const SignupForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('firstName', firstName);
    localStorage.setItem('lastName', lastName);
    localStorage.setItem('email', email);

    // Reset form fields after submission
    setFirstName('');
    setLastName('');
    setEmail('');
  };

  return (
    <div className="main">
        <form onSubmit={handleSubmit}>
        <label for="chk" aria-hidden="true">Sign up</label>
            <input
            type="text"
            value={firstName}
            placeholder="First Name" 
            onChange={(e) => setFirstName(e.target.value)}
            required
            />
            <input
            type="text"
            value={lastName}
            placeholder="Last Name"
            onChange={(e) => setLastName(e.target.value)}
            required
            />
            <input
            type="email"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
            />
        <br />
        <button className="signup-btn" type="submit">Submit</button>
        </form>
    </div>
  );
};

export default SignupForm;
