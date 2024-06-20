import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';

import AApp from './App';

function LoginPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    description: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    setSubmitted(true);
  };

  const handleNewTicket = () => {
    setFormData({ name: '', email: '', description: '' });
    setSubmitted(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
      <button
        style={{
          alignSelf: 'flex-end',
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: '#007BFF',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
          marginBottom: '20px'
        }}
        onClick={() => {
          // Add your navigation logic here
          window.location.href = '/AdminButton'; 
          // Replace '/admin' with the actual admin page URL
        }}
      >
        Access Admin
      </button>

      {submitted ? (
        <div>
          <p>Support ticket successfully submitted!</p>
          <button onClick={handleNewTicket} style={{ padding: '10px', fontSize: '16px', backgroundColor: '#007BFF', color: 'white', border: 'none', cursor: 'pointer' }}>
            Create New Support Ticket
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', width: '300px', gap: '15px' }}>
          <label>
            Name
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              style={{ padding: '10px', fontSize: '16px' }}
            />
          </label>
          <label>
            Email
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              style={{ padding: '10px', fontSize: '16px' }}
            />
          </label>
          <label>
            Description
            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              style={{ padding: '10px', fontSize: '16px' }}
            />
          </label>
          <button type="submit" style={{ padding: '10px', fontSize: '16px', backgroundColor: '#007BFF', color: 'white', border: 'none', cursor: 'pointer' }}>
            Submit
          </button>
        </form>
      )}
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <LoginPage />
  </React.StrictMode>
);

reportWebVitals();