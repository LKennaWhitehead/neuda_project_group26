import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';

function LoginPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
      <form style={{ display: 'flex', flexDirection: 'column', width: '300px', gap: '15px' }}>
        <label>
          Name
          <input type="text" name="name" placeholder="Name" style={{ padding: '10px', fontSize: '16px' }} />
        </label>
        <label>
          Email
          <input type="email" name="email" placeholder="Email" style={{ padding: '10px', fontSize: '16px' }} />
        </label>
        <label>
          Description
          <textarea name="description" placeholder="Description" style={{ padding: '10px', fontSize: '16px' }} />
        </label>
        <button type="submit" style={{ padding: '10px', fontSize: '16px', backgroundColor: '#007BFF', color: 'white', border: 'none', cursor: 'pointer' }}>Submit</button>
      </form>
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
